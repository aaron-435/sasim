/**
 * F1 "find your saju type" short-form renderer: drives a fresh onboarding on the
 * mobile-web build (Expo web, :8082) — birth date, birth time, a worldwide city search —
 * through to the type reveal, with the config's hook as a top overlay, the voiceover
 * script as timed captions, and a closing "Link in bio" card. Same pipeline as
 * record-app.mts (CDP screencast at 1080x1920, ffmpeg mux); the config schema and the
 * copy rules come from check-copy.mts. All on-screen wording comes from the config file.
 *
 * Usage (mobile-web running: `cd mobile && npx expo start --web --port 8082`):
 *   node --import tsx scripts/shortform/render-f1.mts <key> [--no-tts]
 * <key> is marketing/shortform/produce/<key>.json (format "F1"). Output:
 * marketing/video/<key>.mp4 (git-ignored). --no-tts skips OpenAI (silent track, sentence
 * lengths from character counts) — use it for every check run. The real voice needs
 * OPENAI_API_KEY in the environment (e.g. node --env-file=.env.local --import tsx ...)
 * and is cached under marketing/video/.tts/ so a re-render costs nothing.
 * This is the web rendering of the RN app, not the native build: check it against the iOS
 * simulator before using a shot in an ad. Localhost only. The recording drives the
 * production API for the calculation but strips sessionId/nickname (no stored reading)
 * and blocks /api/events, so no prod data or analytics is written.
 */
import { chromium, type Browser } from "playwright";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { COLORS } from "../../mobile/theme/colors.ts";
import { checkConfig, loadConfigFile } from "./check-copy.mts";

const [keyArg, ...rest] = process.argv.slice(2);
const noTts = rest.includes("--no-tts");
const unknown = rest.filter((a) => a !== "--no-tts");
if (!keyArg || unknown.length > 0) throw new Error("usage: render-f1.mts <key> [--no-tts]");
const key = keyArg;
const base = process.env.BASE_URL ?? "http://localhost:8082";
if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(base)) throw new Error("record against localhost only");

const root = path.resolve(import.meta.dirname, "..", "..");
const config = loadConfigFile(path.join(root, "marketing/shortform/produce", `${key}.json`));
if (config.format !== "F1") throw new Error(`${key}: format is ${config.format}, want F1`);
const violations = checkConfig(config);
if (violations.length > 0) {
  for (const v of violations) console.log(`  ${v.field}: ${v.rule} "${v.match}"`);
  process.exit(1);
}
if (!config.birth) throw new Error(`${key}: birth is required for F1`);
const birth = config.birth;

const sentences = config.script;
const outDir = path.join(root, "marketing/video");
mkdirSync(outDir, { recursive: true });
const tmp = path.join(outDir, `.tmp-${key}`);
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

// Voice: same model/voice/direction as marketing/tts-samples/generate.py (INSTRUCTIONS
// copied from there). Sped up with TEMPO at mux; captions follow the sped-up length.
const TEMPO = Number(process.env.TEMPO ?? 1.12);
const TTS_INSTRUCTIONS = "Upbeat, brisk narrator for a short social video. Speak noticeably fast, no long pauses between sentences, clear articulation, not salesy.";
let audio: string;
let af: string;
let duration: number;
if (noTts) {
  duration = sentences.reduce((n, s) => n + Math.max(s.length * 0.065, 1.6), 0);
  audio = path.join(tmp, "silence.mp3");
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
    "-t", String(duration), audio], { stdio: "inherit" });
  af = "apad";
} else {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY 없음, --no-tts로 실행하거나 --env-file=.env.local");
  const text = sentences.join(" ");
  const hash = createHash("sha1").update(text).digest("hex").slice(0, 10);
  const ttsDir = path.join(outDir, ".tts");
  mkdirSync(ttsDir, { recursive: true });
  audio = path.join(ttsDir, `${key}-${hash}.mp3`);
  if (!existsSync(audio)) {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini-tts", voice: "marin", input: text, instructions: TTS_INSTRUCTIONS, response_format: "mp3" }),
    });
    if (!res.ok) throw new Error(`tts failed: ${res.status}`);
    writeFileSync(audio, Buffer.from(await res.arrayBuffer()));
    console.log(`tts ${text.length} chars`);
  }
  duration = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio]).toString()) / TEMPO;
  af = `atempo=${TEMPO},apad`;
}
// apad + -shortest: the track never truncates the picture when the actions run long.

// Sentence timing: proportional to character count over the audio length (approximate).
const total = sentences.reduce((n, s) => n + s.length, 0);
let acc = 0;
const starts = sentences.map((s) => {
  const t = (acc / total) * duration;
  acc += s.length;
  return t;
});
// The reveal click is timed so the ceremony has settled near the third sentence.
const revealIdx = Math.min(2, sentences.length - 1);
const lastStart = starts[starts.length - 1];
if (duration + 0.6 > 35) throw new Error(`audio ${duration.toFixed(1)}s already over 35s — shorten the script`);

const fontB64 = readFileSync(path.join(root, "mobile/node_modules/@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf")).toString("base64");

const chromeExe = process.env.CHROME_PATH ??
  path.join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell");
let browser: Browser | null = null;
const fail = async (err: unknown): Promise<never> => {
  console.error(err instanceof Error ? err.message : err);
  await browser?.close().catch(() => {});
  rmSync(tmp, { recursive: true, force: true });
  process.exit(1);
};
process.on("unhandledRejection", fail);

try {
  browser = await chromium.launch({ executablePath: chromeExe });
  const ctx = await browser.newContext({
    viewport: { width: 540, height: 960 },
    deviceScaleFactor: 2,
    locale: "en-US",
  });
  const page = await ctx.newPage();
  // Prod-data guard: the calc still runs on the production engine, but without
  // sessionId /api/saju stores nothing (see app/api/saju/route.ts), and analytics
  // batches never leave the browser. Reads (/api/cities/search) pass through.
  await page.route("**/api/saju", async (route) => {
    const req = route.request();
    if (req.method() !== "POST") {
      await route.continue();
      return;
    }
    try {
      const body = req.postDataJSON() as Record<string, unknown>;
      delete body.sessionId;
      delete body.nickname;
      await route.continue({ postData: JSON.stringify(body) });
    } catch {
      await route.continue();
    }
  });
  await page.route("**/api/events", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
  // Playwright's recordVideo does not honor deviceScaleFactor (frames land in a corner of the
  // canvas), so frames are captured through CDP screencast at full 1080x1920 instead.
  const cdp = await ctx.newCDPSession(page);
  const frames: { file: string; at: number }[] = [];
  let capturing = false;
  let pausedTotal = 0; // ms spent off-camera; frame times are shifted so cuts are seamless
  cdp.on("Page.screencastFrame", (f: { data: string; sessionId: number }) => {
    void cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
    if (!capturing) return;
    const file = path.join(tmp, `f${String(frames.length).padStart(5, "0")}.jpg`);
    writeFileSync(file, Buffer.from(f.data, "base64"));
    frames.push({ file, at: Date.now() - pausedTotal });
  });

  const next = async () => {
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await page.waitForTimeout(300); // let the screen transition start before marker waits
  };
  const gap = () => page.waitForTimeout(450); // readable beat between inputs (0.3-0.6s)
  const typeField = async (label: string, value: string) => {
    await page.getByLabel(label, { exact: true }).click();
    await page.keyboard.type(value, { delay: 130 });
  };

  // Pre-roll (off-camera): a fresh context starts at the language picker; the date
  // screen is where the camera joins. No ?qa= — QA personas are already onboarded.
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "English" }).click();
  await page.getByRole("button", { name: "Get started" }).click();
  await page.getByLabel("What should we call you?", { exact: true }).fill("Alex");
  await next();
  await page.getByRole("radio", { name: "Male", exact: true }).click();
  await next();
  await page.getByLabel("Birth month", { exact: true }).waitFor();

  await page.addStyleTag({
    content: `
  @font-face { font-family: "PJS"; src: url(data:font/ttf;base64,${fontB64}); font-weight: 700; }
  @keyframes recfade { 0% { opacity: 0; } 100% { opacity: 1; } }
  #rec-hook { position: fixed; left: 24px; right: 24px; top: 26%; z-index: 99999; text-align: center;
    font: 700 40px/1.25 "PJS", system-ui, sans-serif; color: ${COLORS.headline}; background: rgba(15,26,21,.85);
    border-radius: 16px; padding: 14px 18px; pointer-events: none; }
  #rec-cap { position: fixed; left: 24px; right: 24px; top: 70%; z-index: 99999; text-align: center;
    font: 700 26px/1.3 "PJS", system-ui, sans-serif; color: #F3EBD6; background: rgba(15,26,21,.88);
    border-radius: 14px; padding: 12px 16px; pointer-events: none; }
  #rec-cta { position: fixed; inset: 0; z-index: 100000; background: ${COLORS.ctaText}; display: none;
    flex-direction: column; align-items: center; justify-content: center; gap: 14px; animation: recfade .15s ease-out; }
  #rec-cta .big { font: 700 46px/1.2 "PJS", system-ui, sans-serif; color: ${COLORS.headline}; text-align: center; }
  #rec-cta .small { font: 700 20px/1 "PJS", system-ui, sans-serif; letter-spacing: .08em; color: ${COLORS.gold}; }`,
  });
  await page.evaluate(([hook, first]: [string, string]) => {
    const h = document.createElement("div");
    h.id = "rec-hook";
    h.textContent = hook;
    document.body.appendChild(h);
    const c = document.createElement("div");
    c.id = "rec-cap";
    c.textContent = first;
    document.body.appendChild(c);
    const cta = document.createElement("div");
    cta.id = "rec-cta";
    const big = document.createElement("div");
    big.className = "big";
    big.textContent = "Link in bio";
    const small = document.createElement("div");
    small.className = "small";
    small.textContent = "Fatesaid";
    cta.append(big, small);
    document.body.appendChild(cta);
  }, [config.hook, sentences[0]] as [string, string]);

  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
  await page.waitForTimeout(300);
  capturing = true;
  const t0 = Date.now();
  const elapsed = () => Date.now() - t0 - pausedTotal;
  const at = async (sec: number) => {
    const wait = sec * 1000 - elapsed();
    if (wait > 0) await page.waitForTimeout(wait);
  };
  const overlayFor = (idx: number): string =>
    idx === 0 || config.onScreen.length === 0 ? config.hook : config.onScreen[Math.min(idx - 1, config.onScreen.length - 1)];

  // Captions follow the narration on their own timer (video time), whatever the page is doing.
  let capIdx = -1;
  const capTimer = setInterval(() => {
    const t = elapsed() / 1000;
    let idx = 0;
    for (let i = 0; i < starts.length; i++) if (starts[i] <= t) idx = i;
    if (idx !== capIdx) {
      capIdx = idx;
      void page.evaluate(([cap, hook]: [string, string]) => {
        document.getElementById("rec-cap")!.textContent = cap;
        document.getElementById("rec-hook")!.textContent = hook;
      }, [sentences[idx], overlayFor(idx)] as [string, string]).catch(() => {});
    }
  }, 40);
  // CDP screencast only emits frames when the page changes, so after resuming from an
  // off-camera stretch a tiny visual change is needed or the first filmed frame is stale.
  const repaint = () =>
    page.evaluate(() => new Promise<void>((r) => {
      const e = document.getElementById("rec-hook")!;
      e.style.transform = "scale(1.002)";
      requestAnimationFrame(() => requestAnimationFrame(() => { e.style.transform = ""; r(); }));
    }));

  // S1: birth date on camera at a readable pace.
  const [year, month, day] = birth.date.split("-");
  await typeField("Birth month", month);
  await gap();
  await typeField("Birth day", day);
  await gap();
  await typeField("Birth year", year);
  await gap();
  await next();
  await page.getByLabel("Hour", { exact: true }).waitFor();

  // S2a: birth time on camera (12-hour clock + AM/PM, or the "don't know" toggle).
  if (birth.time === null) {
    await page.getByRole("checkbox", { name: "I don't know my birth time" }).click();
  } else {
    const h24 = Number(birth.time.split(":")[0]);
    const period = h24 < 12 ? "AM" : "PM";
    const h12 = String(h24 % 12 === 0 ? 12 : h24 % 12).padStart(2, "0");
    await typeField("Hour", h12);
    await gap();
    await typeField("Minute", birth.time.split(":")[1]);
    await gap();
    await page.getByRole("radio", { name: period, exact: true }).click();
    await gap();
  }
  await next();
  await page.getByLabel("Birth city (searchable worldwide)", { exact: true }).waitFor();

  // S2b: city search on camera — pick the first result whose name matches the config.
  await page.getByLabel("Birth city (searchable worldwide)", { exact: true }).click();
  await page.keyboard.type(birth.city, { delay: 90 });
  const escRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const cityMatch = page.getByRole("button", { name: new RegExp(`^${escRe(birth.city)}\\s*,`, "i") });
  try {
    await cityMatch.first().waitFor({ timeout: 15000 });
  } catch {
    throw new Error(`no city result matching "${birth.city}"`);
  }
  await cityMatch.first().click();
  await page.waitForTimeout(450); // selection visible before the cut
  // Jump cut: submit, the calc wait, and the concern step happen off-camera, and the
  // video clock stops for them (pausedTotal), so the reveal follows the city pick directly.
  // If the inputs ran ahead of the narration, the city screen holds until shortly
  // before the third sentence instead.
  await at(Math.max(0, starts[revealIdx] - 0.6));
  capturing = false;
  const pauseStart = Date.now();
  await next();
  const concernOpt = page.getByRole("radio", { name: /^Relationships/ });
  await concernOpt.waitFor({ timeout: 30000 });
  await concernOpt.click();
  pausedTotal += Date.now() - pauseStart;
  await next();
  // The type card carries the reveal on its own; the top overlay would sit on its name.
  await page.evaluate(() => { document.getElementById("rec-hook")!.style.display = "none"; });
  capturing = true;
  await repaint();
  try {
    await page.getByText("Here's your saju type").waitFor({ timeout: 10000 });
  } catch {
    throw new Error("type reveal never appeared (no sajuType in the calc response?)");
  }
  // Below the card the screen lists famous people who share the type (it fades in on a
  // stagger, inside the first viewport), and short-form videos must not show celebrity
  // names (SPEC rules). A background-colored mask covers from that label down before it
  // fades in, and the caption moves onto the mask so it doesn't sit on the card copy.
  // The label is laid out (at opacity 0) as soon as the screen mounts.
  const maskTop = await page.evaluate((bg: string) => {
    const tops = [...document.querySelectorAll("div")]
      .filter((e) => e.children.length === 0 && e.textContent?.trim() === "People who share this type")
      .map((e) => e.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.left < window.innerWidth && r.right > 0)
      .map((r) => r.top);
    const top = Math.max(0, Math.min(window.innerHeight, ...tops) - 22); // reveal offset settles ~12px up
    const m = document.createElement("div");
    m.id = "rec-mask";
    m.style.cssText = `position:fixed;left:0;right:0;bottom:0;top:${top}px;background:${bg};z-index:99998;pointer-events:none`;
    document.body.appendChild(m);
    const cap = document.getElementById("rec-cap")!;
    cap.style.top = `${Math.min(top + 18, window.innerHeight - 110)}px`;
    return top;
  }, COLORS.background);
  if (maskTop < 960 * 0.6) throw new Error(`celebrity section starts at ${maskTop}px — too high to mask, fix the framing`);

  // The reveal ceremony (RevealCard, ~1.1s) settles into the type card; read the name
  // off the card itself (35px display line — nothing else on the screen sets that size).
  const revealAt = elapsed() / 1000;
  await at(Math.max(starts[revealIdx] + 0.8, revealAt + 1.4));
  const typeName = (await page.evaluate(() => {
    const el = [...document.querySelectorAll("div")]
      .find((e) => getComputedStyle(e).fontSize === "35px" && (e.textContent ?? "").trim().length > 0);
    return (el?.textContent ?? "").trim() || null;
  })) ?? "?";
  // No scroll (it would bring the celebrity cards up past the mask). Re-check once the
  // stagger has played: no copy of the label (section + share-image preview) above the mask.
  const celebVisible = await page.evaluate((top: number) => {
    return [...document.querySelectorAll("div")]
      .filter((e) => e.children.length === 0 && e.textContent?.trim() === "People who share this type")
      .some((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.top < top && r.bottom > 0 && r.left < window.innerWidth && r.right > 0;
      });
  }, maskTop);
  if (celebVisible) {
    const shot = path.join(outDir, `.reveal-${key}.png`);
    await page.screenshot({ path: shot });
    throw new Error(`celebrity section is on screen at the reveal — layout changed, fix the framing (see ${shot})`);
  }

  // Last sentence: full-screen card for the final ~1.5s over the spoken CTA. The settled
  // type card stays up at least 2.5s first (it is the payoff), even if that runs past the voice.
  await at(lastStart);
  const ctaAt = Math.max(lastStart + 0.5, duration + 0.6 - 1.75, revealAt + 1.1 + 2.5, elapsed() / 1000);
  await at(ctaAt);
  await page.evaluate(() => { document.getElementById("rec-cta")!.style.display = "flex"; });
  await at(Math.max(duration + 0.6, ctaAt + 1.5));
  clearInterval(capTimer);
  await cdp.send("Page.stopScreencast");
  const tEnd = Date.now() - pausedTotal;
  await ctx.close();
  await browser.close();

  const kept = frames.filter((f) => f.at >= t0 - pausedTotal - 50);
  if (kept.length < 2) throw new Error("no frames captured");
  const videoDur = (tEnd - t0) / 1000;
  if (videoDur > 35) throw new Error(`video ${videoDur.toFixed(1)}s over 35s — shorten the script`);
  const list = kept.map((f, i) => `file '${f.file}'\nduration ${(((kept[i + 1]?.at ?? tEnd) - f.at) / 1000).toFixed(4)}`).join("\n") + `\nfile '${kept[kept.length - 1].file}'\n`;
  const listFile = path.join(tmp, "list.txt");
  writeFileSync(listFile, list);
  const out = path.join(outDir, `${key}.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-i", audio, "-map", "0:v", "-map", "1:a",
    "-vf", "fps=30,scale=1080:1920:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
    "-af", af, "-c:a", "aac", "-b:a", "160k", "-shortest", out], { stdio: "inherit" });
  rmSync(tmp, { recursive: true, force: true });
  console.log(`ok ${out} ${videoDur.toFixed(1)}s, ${sentences.length} captions, city=${birth.city}, type=${typeName}`);
} catch (err) {
  await fail(err);
}
