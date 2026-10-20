/**
 * Records a short-form video of the native app's UI through the mobile-web build (Expo web,
 * port 8082) for the A-form hooks in marketing/video-kit.md: opens the QA persona home, picks a
 * test, fast-forwards the 30 questions, and shows the result screen, with the voiceover script
 * burned in as timed captions. Same pipeline as record-web.mts (CDP screencast at 1080x1920,
 * ffmpeg mux), see that file for the rationale.
 *
 * Usage (mobile-web running: `cd mobile && npx expo start --web --port 8082`):
 *   node --import tsx scripts/record-app.mts A3 [persona]
 * This is the web rendering of the RN app, not the native build: check it against the iOS
 * simulator before using a shot in an ad. Localhost only (QA persona data, no real traffic).
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const [key, persona = "jordan"] = process.argv.slice(2);
if (!key) throw new Error("usage: record-app.mts <scriptKey> [persona]");
const base = process.env.BASE_URL ?? "http://localhost:8082";
if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(base)) throw new Error("record against localhost only");

const root = path.resolve(import.meta.dirname, "..");
const tts = path.join(root, "marketing/tts-samples");
const scripts = JSON.parse(readFileSync(path.join(tts, "scripts.json"), "utf8")) as Record<string, string>;
const text = scripts[key];
if (!text) throw new Error(`no script ${key}`);
const mp3 = readdirSync(tts).find((f) => f.startsWith(`${key}_`) && f.endsWith(".mp3"));
if (!mp3) throw new Error(`no mp3 for ${key}; run marketing/tts-samples/generate.py ${key}`);
const audio = path.join(tts, mp3);
// Voiceover is sped up a bit more in the mux step (short-form pacing); captions follow the sped-up length.
const TEMPO = Number(process.env.TEMPO ?? 1.12);
const duration = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio]).toString()) / TEMPO;

// Sentence timing: proportional to character count over the audio length (approximate).
const sentences = text.split(/(?<=[.?!])\s+/);
const total = sentences.reduce((n, s) => n + s.length, 0);
let acc = 0;
const starts = sentences.map((s) => {
  const t = (acc / total) * duration;
  acc += s.length;
  return t;
});

const fontB64 = readFileSync(path.join(root, "mobile/node_modules/@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf")).toString("base64");

const outDir = path.join(root, "marketing/video");
const tmp = path.join(outDir, `.tmp-${key}`);
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const chromeExe = process.env.CHROME_PATH ??
  path.join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const browser = await chromium.launch({ executablePath: chromeExe });
const ctx = await browser.newContext({
  viewport: { width: 540, height: 960 },
  deviceScaleFactor: 2,
  locale: "en-US",
});
const page = await ctx.newPage();
// Playwright's recordVideo does not honor deviceScaleFactor (frames land in a corner of the
// canvas), so frames are captured through CDP screencast at full 1080x1920 instead.
const cdp = await ctx.newCDPSession(page);
const frames: { file: string; at: number }[] = [];
let capturing = true;
let pausedTotal = 0; // ms spent off-camera; frame times are shifted so the cut is seamless
cdp.on("Page.screencastFrame", (f: { data: string; sessionId: number }) => {
  void cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  if (!capturing) return;
  const file = path.join(tmp, `f${String(frames.length).padStart(5, "0")}.jpg`);
  writeFileSync(file, Buffer.from(f.data, "base64"));
  frames.push({ file, at: Date.now() - pausedTotal });
});
await page.goto(`${base}/?qa=free&persona=${persona}&lang=en`, { waitUntil: "networkidle" });
await page.getByText("Choose a test").waitFor();
await page.addStyleTag({
  content: `
  @font-face { font-family: "PJS"; src: url(data:font/ttf;base64,${fontB64}); font-weight: 700; }
  #rec-cap { position: fixed; left: 24px; right: 24px; top: 58%; z-index: 99999; text-align: center;
    font: 700 26px/1.3 "PJS", system-ui, sans-serif; color: #F3EBD6; background: rgba(15,26,21,.88);
    border-radius: 14px; padding: 12px 16px; pointer-events: none; }`,
});
await page.evaluate(() => {
  const cap = document.createElement("div");
  cap.id = "rec-cap";
  document.body.appendChild(cap);
});
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
const t0 = Date.now();
const elapsed = () => Date.now() - t0 - pausedTotal;
const at = async (sec: number) => {
  const wait = sec * 1000 - elapsed();
  if (wait > 0) await page.waitForTimeout(wait);
};
const caption = (s: string) => page.evaluate((v) => { const c = document.getElementById("rec-cap")!; c.textContent = v; }, s);

// Answers one question: slider (click on the track) or a choice button, then Next if present.
async function answer(i: number, pause: number) {
  await page.getByText(new RegExp(`^${i} / 30$`)).waitFor({ timeout: 5000 });
  const slider = page.locator('[role="slider"]');
  if (await slider.count()) {
    const bx = (await slider.boundingBox())!;
    const frac = [0.7, 0.35, 0.55, 0.8, 0.45][i % 5];
    await page.mouse.click(bx.x + bx.width * frac, bx.y + bx.height / 2);
    if (pause) await page.waitForTimeout(pause);
    await page.getByText("Next", { exact: true }).click();
  } else {
    const opts = page.locator('button:not([aria-label="Back"])').filter({ hasNotText: /^Next$/ });
    await opts.nth(i % 4).click();
    if (pause) await page.waitForTimeout(pause);
    const next = page.getByText("Next", { exact: true });
    if (await next.count()) await next.click().catch(() => {});
  }
}

// S1 hook on the home screen, then open the test list and the burnout test.
await caption(sentences[0]);
await at(starts[1] * 0.45);
await page.getByText("Choose a test").click();
await at(starts[1] * 0.8);
await page.getByText("Burnout", { exact: true }).first().click();
// S2: first questions at a readable pace, then a fast-forward through the rest.
await at(starts[1]);
await caption(sentences[1]);
// The three on-camera questions fill the second sentence so the result lands with the third.
const qPause = Math.max(0, ((starts[2] - starts[1]) * 1000) / 3 - 350);
for (let i = 1; i <= 3; i++) await answer(i, qPause);
// Jump cut: the other 27 answers happen off-camera, the video resumes on the result screen.
capturing = false;
const pauseStart = Date.now();
for (let i = 4; i <= 30; i++) await answer(i, 0);
await page.getByText("Your first blueprint is ready").waitFor({ timeout: 8000 });
await page.waitForTimeout(700); // let the result animation settle before filming
pausedTotal += Date.now() - pauseStart;
capturing = true;
// S3+ : result screen, captions follow the narration.
for (let i = 2; i < sentences.length; i++) {
  await at(Math.max(starts[i], elapsed() / 1000));
  await caption(sentences[i]);
}
await at(duration + 0.6);
await cdp.send("Page.stopScreencast");
const tEnd = Date.now() - pausedTotal;
await ctx.close();
await browser.close();

const kept = frames.filter((f) => f.at >= t0 - 50);
if (kept.length < 2) throw new Error("no frames captured");
const list = kept.map((f, i) => `file '${f.file}'\nduration ${(((kept[i + 1]?.at ?? tEnd) - f.at) / 1000).toFixed(4)}`).join("\n") + `\nfile '${kept[kept.length - 1].file}'\n`;
const listFile = path.join(tmp, "list.txt");
writeFileSync(listFile, list);
const out = path.join(outDir, `${key}.mp4`);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-i", audio, "-map", "0:v", "-map", "1:a",
  "-vf", "fps=30,scale=1080:1920:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
  "-af", `atempo=${TEMPO}`, "-c:a", "aac", "-b:a", "160k", "-shortest", out], { stdio: "inherit" });
renameSync(out, out);
rmSync(tmp, { recursive: true, force: true });
console.log("ok", out, `${duration.toFixed(1)}s audio, ${sentences.length} captions`);
