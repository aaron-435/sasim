// Shortform config (.json) schema + copy-rule checker, one file per video.
// npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { pathToFileURL } from "node:url";
import { SAJU_TYPE_CELEBRITIES } from "../../lib/sajuTypeCelebrities.ts";
import { COMPATIBILITY_CONTENT } from "../../mobile/lib/compatibilityContent.ts";
import { SAJU_TYPE_CONTENT } from "../../mobile/lib/sajuTypeContent.ts";

export type Format = "F1" | "F2" | "F3" | "F4" | "F6";
export type Platform = "tiktok" | "instagram" | "youtube";

export interface Birth {
  date: string;
  time: string | null;
  city: string;
}

export interface ShortformConfig {
  key: string;
  format: Format;
  hook: string;
  script: string[];
  onScreen: string[];
  birth: Birth | null;
  caption: string;
  hashtags: string[];
  utmPlatform: Platform;
  aiVoice: boolean;
}

export interface Violation {
  field: string;
  rule: string;
  match: string;
}

// Unicode-aware word edges (\b is ASCII-only). w() = full word, pre() = prefix "…" rule.
const LB = "(?<![\\p{L}\\p{N}])";
const RB = "(?![\\p{L}\\p{N}])";
const w = (inner: string): RegExp => new RegExp(`${LB}(?:${inner})${RB}`, "iu");
const pre = (inner: string): RegExp => new RegExp(`${LB}(?:${inner})`, "iu");

const COMMENT_VERB = "(?:comment|drop|leave|tell\\s+me|type\\s+in|write|send)";
const BIRTH_WORD = `(?:birth\\w*|bday${RB}|b-day${RB}|dob${RB})`;

const RULES: [string, RegExp[]][] = [
  ["accuracy", [pre("accura"), w("exact"), w("exactly"), w("proven"), pre("scientific"), pre("guarantee")]],
  ["prediction", [pre("predict"), pre("prophe"), pre("forecast"), pre("fortune"), w("destiny"), w("destined"), w("will"), w("fate"), w("fated")]],
  ["misfortune", [w("lucky"), w("unlucky"), w("bad\\s+luck"), pre("misfortune"), pre("doom"), pre("curse"), pre("disaster"), w("death"), w("die"), w("dies"), w("dying"), pre("illness"), pre("sick"), pre("accident"), w("bad\\s+year")]],
  ["bad-match", [w("worst"), pre("bad\\s+match"), w("toxic"), pre("incompatib"), pre("red\\s+flag"), w("never\\s+date"), w("stay\\s+away")]],
  ["percent", [/\d\s*%/iu, pre("percent")]],
  ["money", [w("money"), pre("bank"), w("pay"), w("paid"), pre("wallet"), pre("invest"), pre("wealth"), w("rich"), w("riches"), w("income"), pre("crypto"), pre("stock")]],
  ["pressure", [pre("countdown"), w("last\\s+chance"), w("hurry"), w("limited"), w("only\\s+today"), w("ends\\s+soon"), w("ends\\s+tonight"), pre("price"), w("sale"), pre("discount"), /\$/u]],
  ["diagnosis", [pre("diagnos"), pre("disorder"), pre("therap"), pre("treat"), w("cure"), w("cures"), pre("heal")]],
  ["comment-birth", [
    new RegExp(`${LB}${COMMENT_VERB}${RB}[^.!?\\n]{0,30}?${LB}${BIRTH_WORD}`, "iu"),
    new RegExp(`${LB}birth\\w*[^.!?\\n]{0,20}?${LB}(?:in|below)${RB}\\s+(?:the\\s+)?comments?${RB}`, "iu"),
  ]],
  ["fake-review", [
    new RegExp(`${LB}I${RB}\\s+(?:tried|downloaded|used|bought|paid)${RB}`, "iu"),
    w("changed\\s+my\\s+life"),
    w("literally\\s+me"),
    new RegExp(`${LB}my${RB}\\s+${LB}(?:friend|mom|dad|bf|gf|boyfriend|girlfriend|wife|husband|sister|brother)${RB}`, "iu"),
    new RegExp(`${LB}(?:5|five)${RB}[- ]stars?${RB}`, "iu"),
    pre("review"),
    pre("testimonial"),
  ]],
];

const ASSUME_LOOSE = [w("you['’]re"), w("youre"), w("you\\s+are")];
const ASSUME_STRICT = [w("you"), w("your"), w("yours")];

export const EXTRA_CELEBRITIES = [
  "Taylor Swift", "Beyoncé", "Beyonce", "Rihanna", "Ariana Grande", "Selena Gomez",
  "Zendaya", "Harry Styles", "Bad Bunny", "Shakira", "Kim Kardashian", "Kanye West",
  "BTS", "BLACKPINK", "Jungkook", "Jimin", "Jennie", "Jisoo", "Rosé", "NewJeans", "Stray Kids",
];

const escRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const celebNames = [...new Set([
  ...Object.values(SAJU_TYPE_CELEBRITIES).flatMap((list) =>
    list.flatMap((c) => (c.nameKo ? [c.name, c.nameKo] : [c.name]))),
  ...EXTRA_CELEBRITIES,
])].sort((a, b) => b.length - a.length);
const CELEB_RE = new RegExp(`${LB}(?:${celebNames.map(escRe).join("|")})${RB}`, "iu");

export function checkText(field: string, text: string, strict: boolean): Violation[] {
  const out: Violation[] = [];
  const fire = (rule: string, res: RegExp[]): void => {
    for (const re of res) {
      const m = re.exec(text);
      if (m) {
        out.push({ field, rule, match: m[0] });
        return;
      }
    }
  };
  for (const [rule, res] of RULES) fire(rule, res);
  fire("assume-viewer", strict ? [...ASSUME_LOOSE, ...ASSUME_STRICT] : ASSUME_LOOSE);
  fire("celebrity", [CELEB_RE]);
  return out;
}

const FORMATS = ["F1", "F2", "F3", "F4", "F6"];
const PLATFORMS = ["tiktok", "instagram", "youtube"];
const TOP_KEYS = ["key", "format", "hook", "script", "onScreen", "birth", "caption", "hashtags", "utmPlatform", "aiVoice"];
const KEY_RE = /^[A-Z0-9][A-Za-z0-9-]*$/;
const TAG_RE = /^#[a-z0-9]+$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

function validDate(s: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return false;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (y < 1900 || y > 2015 || mo < 1 || mo > 12 || d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d;
}

export function parseConfig(raw: unknown, fileKey?: string): { config: ShortformConfig | null; errors: Violation[] } {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { config: null, errors: [{ field: "config", rule: "schema", match: "must be an object" }] };
  }
  const errors: Violation[] = [];
  const err = (field: string, match: string): void => {
    errors.push({ field, rule: "schema", match });
  };
  const obj = raw as Record<string, unknown>;
  for (const k of Object.keys(obj)) {
    if (!TOP_KEYS.includes(k)) err(k, "unknown key");
  }
  if (!("key" in obj)) err("key", "missing");
  else if (typeof obj.key !== "string" || !KEY_RE.test(obj.key)) err("key", "must match ^[A-Z0-9][A-Za-z0-9-]*$");
  else if (fileKey !== undefined && obj.key !== fileKey) err("key", "must match file name");
  const format = obj.format;
  const formatOk = typeof format === "string" && FORMATS.includes(format);
  if (!("format" in obj)) err("format", "missing");
  else if (!formatOk) err("format", "must be F1, F2, F3, F4, or F6");
  if (!("hook" in obj)) err("hook", "missing");
  else if (typeof obj.hook !== "string") err("hook", "must be a string");
  else if ([...obj.hook].length < 1 || [...obj.hook].length > 120) err("hook", "must be 1-120 chars");
  if (!("script" in obj)) err("script", "missing");
  else if (!Array.isArray(obj.script)) err("script", "must be an array");
  else {
    obj.script.forEach((s, i) => {
      if (typeof s !== "string") err(`script[${i}]`, "must be a string");
    });
    if (formatOk && (format === "F1" || format === "F4") && obj.script.length < 1) err("script", "must not be empty"); // F2/F6 are silent, F3 may be
  }
  if (!("onScreen" in obj)) err("onScreen", "missing");
  else if (!Array.isArray(obj.onScreen)) err("onScreen", "must be an array");
  else {
    obj.onScreen.forEach((s, i) => {
      if (typeof s !== "string") err(`onScreen[${i}]`, "must be a string");
    });
  }
  if (!("birth" in obj)) err("birth", "missing");
  else if (obj.birth === null) {
    if (formatOk && (format === "F1" || format === "F4")) err("birth", "required for this format");
  } else if (typeof obj.birth !== "object" || Array.isArray(obj.birth)) {
    err("birth", "must be an object or null");
  } else {
    const b = obj.birth as Record<string, unknown>;
    for (const k of Object.keys(b)) {
      if (!["date", "time", "city"].includes(k)) err("birth", `unknown key "${k}"`);
    }
    if (typeof b.date !== "string" || !validDate(b.date)) err("birth", "bad date, want real YYYY-MM-DD 1900-2015");
    if (!(b.time === null || (typeof b.time === "string" && TIME_RE.test(b.time)))) err("birth", "bad time, want HH:MM or null");
    if (typeof b.city !== "string" || b.city.trim().length === 0) err("birth", "bad city, want a name");
  }
  if (!("caption" in obj)) err("caption", "missing");
  else if (typeof obj.caption !== "string") err("caption", "must be a string");
  if (!("hashtags" in obj)) err("hashtags", "missing");
  else if (!Array.isArray(obj.hashtags)) err("hashtags", "must be an array");
  else {
    if (obj.hashtags.length < 3 || obj.hashtags.length > 5) err("hashtags", "must be 3-5 items");
    obj.hashtags.forEach((h, i) => {
      if (typeof h !== "string" || !TAG_RE.test(h)) err(`hashtags[${i}]`, "must match ^#[a-z0-9]+$");
    });
  }
  if (!("utmPlatform" in obj)) err("utmPlatform", "missing");
  else if (typeof obj.utmPlatform !== "string" || !PLATFORMS.includes(obj.utmPlatform)) {
    err("utmPlatform", "must be tiktok, instagram, or youtube");
  }
  if (!("aiVoice" in obj)) err("aiVoice", "missing");
  else if (typeof obj.aiVoice !== "boolean") err("aiVoice", "must be a boolean");
  if (errors.length > 0) return { config: null, errors };
  return { config: obj as unknown as ShortformConfig, errors };
}

// Verbatim English app copy (relation headline/body/goodPoint, type name/tagline/body) that
// F2/F6 cards quote. That copy is second person by design ("You're the one who pushes") and
// says "the exact same point", so an exact match skips assume-viewer and accuracy; every
// other rule still applies. Anything reworded is new copy and gets the full check.
export const APP_COPY_EN: ReadonlySet<string> = new Set([
  ...Object.values(COMPATIBILITY_CONTENT.en.relations).flatMap((r) => [r.headline, r.body, r.goodPoint]),
  ...[...Object.values(SAJU_TYPE_CONTENT.en.archetypes), ...Object.values(SAJU_TYPE_CONTENT.en.modes)]
    .flatMap((p) => [p.name, p.tagline, p.body]),
]);
const APP_COPY_EXEMPT = ["assume-viewer", "accuracy"];
const checkLine = (field: string, text: string, strict: boolean): Violation[] => {
  const vs = checkText(field, text, strict);
  return APP_COPY_EN.has(text) ? vs.filter((v) => !APP_COPY_EXEMPT.includes(v.rule)) : vs;
};

export function checkConfig(config: ShortformConfig): Violation[] {
  const out: Violation[] = [
    ...checkText("hook", config.hook, true),
    ...config.script.flatMap((s, i) => checkLine(`script[${i}]`, s, false)),
    ...config.onScreen.flatMap((s, i) => checkLine(`onScreen[${i}]`, s, true)),
    ...checkText("caption", config.caption, false),
    ...config.hashtags.flatMap((h, i) => checkText(`hashtags[${i}]`, h, false)),
  ];
  if (!/link in bio/iu.test(config.caption)) out.push({ field: "caption", rule: "caption-cta", match: "missing" });
  if (config.aiVoice && !config.caption.includes("Voiceover is AI-generated.")) {
    out.push({ field: "caption", rule: "ai-voice-label", match: "missing" });
  }
  return out;
}

export function loadConfigFile(path: string): ShortformConfig {
  const raw = JSON.parse(readFileSync(path, "utf8")) as unknown;
  const { config, errors } = parseConfig(raw, basename(path, ".json"));
  if (!config) {
    throw new Error(`${path}: ${errors.map((e) => `${e.field}: ${e.rule} "${e.match}"`).join("; ")}`);
  }
  return config;
}

export function checkFiles(paths: string[]): { results: { path: string; violations: Violation[] }[]; crossFile: Violation[] } {
  const keys = new Map<string, string[]>();
  const births = new Map<string, string[]>();
  const results = paths.map((path) => {
    let violations: Violation[];
    try {
      const raw = JSON.parse(readFileSync(path, "utf8")) as unknown;
      const parsed = parseConfig(raw, basename(path, ".json"));
      if (!parsed.config) {
        violations = parsed.errors;
      } else {
        violations = checkConfig(parsed.config);
        const seen = keys.get(parsed.config.key) ?? [];
        seen.push(path);
        keys.set(parsed.config.key, seen);
        if (parsed.config.birth) {
          const files = births.get(parsed.config.birth.date) ?? [];
          files.push(path);
          births.set(parsed.config.birth.date, files);
        }
      }
    } catch {
      violations = [{ field: "file", rule: "schema", match: "invalid JSON" }];
    }
    return { path, violations };
  });
  const crossFile: Violation[] = [];
  for (const [key, files] of keys) {
    if (files.length > 1) crossFile.push({ field: "key", rule: "duplicate-key", match: `${key} in ${files.join(", ")}` });
  }
  for (const [date, files] of births) {
    if (files.length > 1) crossFile.push({ field: "birth", rule: "duplicate-birth", match: `${date} in ${files.join(", ")}` });
  }
  return { results, crossFile };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json");
    process.exit(2);
  }
  const { results, crossFile } = checkFiles(args);
  let failed = 0;
  for (const r of results) {
    if (r.violations.length === 0) {
      console.log(`ok  ${r.path}`);
    } else {
      failed++;
      console.log(`FAIL ${r.path}`);
      for (const v of r.violations) console.log(`  ${v.field}: ${v.rule} "${v.match}"`);
    }
  }
  if (crossFile.length > 0) {
    failed++;
    console.log("FAIL cross-file");
    for (const v of crossFile) console.log(`  ${v.field}: ${v.rule} "${v.match}"`);
  }
  console.log(`${results.length} files, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}
