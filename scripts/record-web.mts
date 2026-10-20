/**
 * Records a short-form video of the web landing's saju type card (B/C-form in
 * marketing/video-kit.md): types a birth date, shows the card, and burns the voiceover
 * script in as timed captions. No ffmpeg text filters needed: captions are an HTML
 * overlay in the page, ffmpeg only muxes the TTS audio.
 *
 * Usage (dev server on :3000, `npm run dev`):
 *   node --import tsx scripts/record-web.mts B1 1990-05-17
 *   (script key from marketing/tts-samples/scripts.json, mp3 from generate.py)
 * Output: marketing/video/<KEY>.mp4 (git-ignored). Record against localhost only: the web
 * analytics mark localhost traffic as dev, so real visit metrics are not polluted.
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const [key, date = "1990-05-17"] = process.argv.slice(2);
if (!key) throw new Error("usage: record-web.mts <scriptKey> [YYYY-MM-DD]");
const base = process.env.BASE_URL ?? "http://localhost:3000";
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
const typeIdx = Math.max(0, sentences.findIndex((s) => /^Type/.test(s)));
const submitIdx = Math.max(typeIdx + 1, sentences.findIndex((s) => /^The card/.test(s)));
const ctaIdx = sentences.length - 1;

const [y, m, d] = date.split("-");
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
cdp.on("Page.screencastFrame", (f: { data: string; sessionId: number }) => {
  const file = path.join(tmp, `f${String(frames.length).padStart(5, "0")}.jpg`);
  writeFileSync(file, Buffer.from(f.data, "base64"));
  frames.push({ file, at: Date.now() });
  void cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});
await page.goto(`${base}/?lang=en`, { waitUntil: "networkidle" });
await page.addStyleTag({
  content: `
  @font-face { font-family: "PJS"; src: url(data:font/ttf;base64,${fontB64}); font-weight: 700; }
  .tc-celeb { display: none !important; }
  html { scroll-behavior: smooth; }
  #rec-cap { position: fixed; left: 24px; right: 24px; top: 56%; z-index: 99999; text-align: center;
    font: 700 26px/1.3 "PJS", system-ui, sans-serif; color: #F3EBD6; background: rgba(15,26,21,.88);
    border-radius: 14px; padding: 12px 16px; transition: opacity .15s; }`,
});
await page.evaluate(() => {
  // hide the sticky bottom CTA bar and any other fixed chrome
  for (const el of document.querySelectorAll<HTMLElement>("body *")) if (getComputedStyle(el).position === "fixed") el.style.display = "none";
  const cap = document.createElement("div");
  cap.id = "rec-cap";
  document.body.appendChild(cap);
  document.querySelector(".tc-wrap")?.scrollIntoView({ block: "start" });
});
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
const t0 = Date.now();
const at = async (sec: number) => {
  const wait = sec * 1000 - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
};
const caption = (s: string) => page.evaluate((v) => { const c = document.getElementById("rec-cap")!; c.textContent = v; }, s);

const inputs = page.locator(".qb-input");
let typed = false, submitted = false, scrolled = 0;
for (let i = 0; i < sentences.length; i++) {
  await at(starts[i]);
  await caption(sentences[i]);
  if (i === typeIdx && !typed) {
    typed = true;
    void (async () => {
      await inputs.first().click();
      await page.keyboard.type(m, { delay: 110 });
      await page.keyboard.type(d, { delay: 110 });
      await page.keyboard.type(y, { delay: 110 });
    })();
  }
  if (i === submitIdx && !submitted) {
    submitted = true;
    await page.locator(".qb-submit").first().click();
    await page.waitForSelector(".tc-card, .tc-name, [class*='tc-type']", { timeout: 8000 }).catch(() => {});
  }
  if (submitted && i > submitIdx && i < ctaIdx && scrolled < 2) {
    scrolled++;
    await page.evaluate((n) => window.scrollBy({ top: 260 * n, behavior: "smooth" }), 1);
  }
}
await at(duration + 0.6);
await cdp.send("Page.stopScreencast");
const tEnd = Date.now();
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
