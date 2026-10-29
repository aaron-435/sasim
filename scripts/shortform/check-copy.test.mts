// Shortform copy checker, offline: npx tsx scripts/shortform/check-copy.test.mts
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { checkConfig, checkFiles, checkText, loadConfigFile, parseConfig } from "./check-copy.mts";
import type { ShortformConfig, Violation } from "./check-copy.mts";

let n = 0;
const check = (cond: unknown, msg: string) => {
  assert.ok(cond, msg);
  n++;
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const sample = join(root, "marketing", "shortform", "produce", "F1-sample.json");
const script = join(root, "scripts", "shortform", "check-copy.mts");

const hasRule = (vs: Violation[], rule: string): boolean => vs.some((v) => v.rule === rule);
const fires = (text: string, rule: string, field = "caption", strict = false): void => {
  const vs = checkText(field, text, strict);
  check(vs.some((v) => v.rule === rule && v.field === field), `${rule} fires on ${JSON.stringify(text)}`);
};
const quiet = (text: string, rule: string, field = "caption", strict = false): void => {
  check(!hasRule(checkText(field, text, strict), rule), `${rule} quiet on ${JSON.stringify(text)}`);
};

// Passing sample.
const cfg = loadConfigFile(sample);
check(checkConfig(cfg).length === 0, "sample passes checkConfig");
const one = checkFiles([sample]);
check(one.results.length === 1 && one.results[0].violations.length === 0, "sample passes checkFiles");
check(one.crossFile.length === 0, "single file has no cross-file violations");

// Every rule fires.
fires("This is so accurate", "accuracy");
fires("What 2027 will bring", "prediction");
fires("fortune-telling", "prediction");
fires("Your unlucky day", "misfortune");
fires("The worst match for Fire", "bad-match");
fires("92% compatible", "percent");
fires("Money luck this week", "money");
fires("Only today, 50% off", "pressure");
fires("A therapy-style test", "diagnosis");
fires("Comment your birthday below", "comment-birth");
fires("Drop your birth date", "comment-birth");
fires("Birthdays in the comments", "comment-birth");
fires("I tried this app and wow", "fake-review");
fires("You're an anxious type", "assume-viewer");
fires("Elon Musk has this type", "celebrity");
fires("Taylor Swift's chart", "celebrity");

// One violation per rule per field, other rules still fire separately.
const multi = checkText("caption", "accurate and proven, guaranteed science", false);
check(multi.filter((v) => v.rule === "accuracy").length === 1, "first accuracy match only");
check(hasRule(checkText("caption", "Only today, 50% off", false), "percent"), "percent fires alongside pressure");

// Boundary cases that must not fire.
quiet("A saju type card from a birth date", "comment-birth");
check(checkText("caption", "Fatesaid", false).length === 0, "Fatesaid is not fate");
quiet("display the card", "money");
quiet("Payment", "money");
check(checkText("caption", "a bright chart", false).length === 0, "bright chart is clean");
quiet("three birthdays, three cards", "comment-birth");
quiet("I typed three birthdays into a Korean saju app.", "fake-review");
quiet("I typed three birthdays into a Korean saju app.", "comment-birth");
check(checkText("caption", "Which element is biggest in your chart?", false).length === 0, "your passes non-strict");
fires("Which element is biggest in your chart?", "assume-viewer", "hook", true);
quiet("See the card", "assume-viewer", "caption", false);

// Structure rules on a valid config.
const noLabel = { ...cfg, caption: cfg.caption.replace("\nVoiceover is AI-generated.", "") };
check(hasRule(checkConfig(noLabel as ShortformConfig), "ai-voice-label"), "missing AI label flagged");
const noCta = { ...cfg, caption: cfg.caption.replace("link in bio", "the homepage") };
check(hasRule(checkConfig(noCta as ShortformConfig), "caption-cta"), "missing link-in-bio flagged");
const hookBad = { ...cfg, hook: "What 2027 will bring" };
check(
  checkConfig(hookBad as ShortformConfig).some((v) => v.rule === "prediction" && v.field === "hook"),
  "checkConfig marks hook field",
);

// Schema errors.
const raw = JSON.parse(readFileSync(sample, "utf8")) as Record<string, unknown>;
const clone = (): Record<string, unknown> => JSON.parse(JSON.stringify(raw)) as Record<string, unknown>;
const schemaFails = (mut: (o: Record<string, unknown>) => void, msg: string): void => {
  const o = clone();
  mut(o);
  const r = parseConfig(o, "F1-sample");
  check(r.config === null && hasRule(r.errors, "schema"), msg);
};
const parsed = parseConfig(clone(), "F1-sample");
check(parsed.config !== null && parsed.errors.length === 0, "sample parses clean");
schemaFails((o) => { o.format = "F5"; }, "F5 rejected");
schemaFails((o) => { o.birth = null; }, "F1 with null birth rejected");
schemaFails((o) => { (o.birth as Record<string, unknown>).date = "1994-02-30"; }, "Feb 30 rejected");
schemaFails((o) => { o.hashtags = ["#saju", "#koreansaju"]; }, "2 hashtags rejected");
schemaFails((o) => { o.extra = 1; }, "unknown key rejected");
check(parseConfig(clone(), "other").config === null, "key/file-name mismatch rejected");

// Cross-file rules in a temp dir, removed at the end.
const tmp = mkdtempSync(join(tmpdir(), "shortform-"));
try {
  const pa = join(tmp, "T1-a.json");
  const pb = join(tmp, "T1-b.json");
  writeFileSync(pa, `${JSON.stringify({ ...clone(), key: "T1-a" }, null, 2)}\n`);
  writeFileSync(pb, `${JSON.stringify({ ...clone(), key: "T1-b" }, null, 2)}\n`);
  const two = checkFiles([pa, pb]);
  check(two.results.every((r) => r.violations.length === 0), "temp pair parses clean");
  check(two.crossFile.length === 1 && two.crossFile[0].rule === "duplicate-birth", "same birth.date flagged");
  const dup = checkFiles([sample, sample]);
  check(hasRule(dup.crossFile, "duplicate-key"), "same path twice flags duplicate-key");
  check(hasRule(dup.crossFile, "duplicate-birth"), "same path twice also flags duplicate-birth");

  // CLI.
  const okRun = spawnSync(process.execPath, ["--import", "tsx", script, sample], { cwd: root, encoding: "utf8" });
  check(okRun.status === 0 && okRun.stdout.includes("ok"), "CLI exit 0 with ok on sample");
  check(okRun.stdout.includes("1 files, 0 failed"), "CLI summary line");
  const noArgs = spawnSync(process.execPath, ["--import", "tsx", script], { cwd: root, encoding: "utf8" });
  check(noArgs.status === 2, "CLI exit 2 without args");
  const pBad = join(tmp, "T9-bad.json");
  writeFileSync(pBad, `${JSON.stringify({ ...clone(), key: "T9-bad", hook: "What 2027 will bring" }, null, 2)}\n`);
  const badRun = spawnSync(process.execPath, ["--import", "tsx", script, pBad], { cwd: root, encoding: "utf8" });
  check(badRun.status === 1 && badRun.stdout.includes("FAIL"), "CLI exit 1 with FAIL on violation");
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log(`ok ${n} checks`);
