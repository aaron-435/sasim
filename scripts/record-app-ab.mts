/**
 * "Experiment" hook for a test result (A-form, marketing/video-kit.md): the same burnout test
 * answered with the lowest option every time, then the highest, shown as two results and a
 * side-by-side comparison. Records the mobile-web build (Expo web, :8082) through a CDP
 * screencast at 1080x1920 (same approach as record-web.mts), burns the voiceover in as
 * highlighted, pop-in captions and muxes the TTS audio.
 *
 * Usage (mobile-web running: `cd mobile && npx expo start --web --port 8082`):
 *   node --import tsx scripts/record-app-ab.mts A3x [persona]
 * Output: marketing/video/<KEY>.mp4 (git-ignored). Localhost only; web rendering of the RN app,
 * not the native build. The answers are samples, say so on screen (the script's captions do).
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const [key, persona = "jordan"] = process.argv.slice(2);
if (!key) throw new Error("usage: record-app-ab.mts <scriptKey> [persona]");
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
// sentence indices of the story beats
const iTwo = sentences.findIndex((s) => /^Two different/.test(s));
const iCompare = sentences.findIndex((s) => /^One says/.test(s));
if (iTwo < 0 || iCompare < 0) throw new Error("script needs 'Two different...' and 'One says...' sentences");
const HIGHLIGHT = ["lowest", "highest", "Steady Pace", "Full Burnout", "Two different results"];

const fontB64 = readFileSync(path.join(root, "mobile/node_modules/@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf")).toString("base64");
const outDir = path.join(root, "marketing/video");
const tmp = path.join(outDir, `.tmp-${key}`);
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const chromeExe = process.env.CHROME_PATH ??
  path.join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const browser = await chromium.launch({ executablePath: chromeExe });
const ctx = await browser.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, locale: "en-US" });
const page = await ctx.newPage();
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

await page.goto(`${base}/?qa=free&persona=${persona}&lang=en`, { waitUntil: "networkidle" });
await page.getByText("Choose a test").waitFor();
await page.addStyleTag({
  content: `
  @font-face { font-family: "PJS"; src: url(data:font/ttf;base64,${fontB64}); font-weight: 700; }
  @keyframes recpop { 0% { transform: scale(.92); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  #rec-cap { position: fixed; left: 22px; right: 22px; top: 62%; z-index: 99999; text-align: center;
    font: 700 28px/1.28 "PJS", system-ui, sans-serif; color: #F3EBD6; background: rgba(15,26,21,.9);
    border-radius: 16px; padding: 14px 18px; pointer-events: none; animation: recpop .18s ease-out; }
  #rec-cap b { color: #9ADBB8; }
  #rec-badge { position: fixed; left: 50%; top: 53%; transform: translateX(-50%); z-index: 99999; pointer-events: none;
    font: 700 20px/1 "PJS", system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase; color: #0F1A15;
    background: #9ADBB8; border-radius: 999px; padding: 11px 20px; white-space: nowrap; }
  #rec-cmp { position: fixed; inset: 0; z-index: 99998; background: #0F1A15; display: flex; gap: 14px; justify-content: center;
    align-items: flex-start; padding-top: 17%; }
  #rec-cmp figure { margin: 0; width: 250px; }
  #rec-cmp figcaption { font: 700 18px/1 "PJS", system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase;
    color: #9ADBB8; text-align: center; margin-bottom: 12px; }
  #rec-cmp img { width: 250px; height: 330px; object-fit: cover; object-position: top; border-radius: 14px; border: 1px solid #26332B; }`,
});
await page.evaluate(() => {
  for (const id of ["rec-cap", "rec-badge"]) {
    const d = document.createElement("div");
    d.id = id;
    document.body.appendChild(d);
  }
  document.getElementById("rec-badge")!.style.display = "none";
});

const escapeHtml = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
const caption = (s: string) => {
  let html = escapeHtml(s);
  for (const w of HIGHLIGHT) html = html.replace(new RegExp(w, "g"), `<b>${w}</b>`);
  return page.evaluate((h) => {
    const c = document.getElementById("rec-cap")!;
    c.style.animation = "none";
    void c.offsetWidth;
    c.style.animation = "";
    c.innerHTML = h;
  }, html);
};
const badge = (s: string | null) =>
  page.evaluate((v) => { const b = document.getElementById("rec-badge")!; b.style.display = v ? "block" : "none"; b.textContent = v ?? ""; }, s);

// CDP screencast only emits frames when the page changes, so after resuming from an off-camera
// stretch a tiny visual change is needed or the first filmed frame would be the stale one.
const repaint = () =>
  page.evaluate(() => new Promise<void>((r) => {
    const e = document.getElementById("rec-badge")!;
    e.style.transform = "translateX(-50%) scale(1.002)";
    requestAnimationFrame(() => requestAnimationFrame(() => { e.style.transform = "translateX(-50%)"; r(); }));
  }));

type Mode = "low" | "high";
async function answer(i: number, mode: Mode, pause: number) {
  await page.getByText(new RegExp(`^${i} / 30$`)).waitFor({ timeout: 5000 });
  const slider = page.locator('[role="slider"]');
  if (await slider.count()) {
    const bx = (await slider.boundingBox())!;
    await page.mouse.click(mode === "low" ? bx.x + 6 : bx.x + bx.width - 6, bx.y + bx.height / 2);
    if (pause) await page.waitForTimeout(pause);
    await page.getByText("Next", { exact: true }).click();
  } else {
    const opts = page.locator('button:not([aria-label="Back"])').filter({ hasNotText: /^Next$/ });
    await opts.nth(mode === "low" ? 0 : (await opts.count()) - 1).click();
    if (pause) await page.waitForTimeout(pause);
    const next = page.getByText("Next", { exact: true });
    if (await next.count()) await next.click().catch(() => {});
  }
}

// Pre-roll (off-camera): open the burnout test so the first filmed frame is already a question.
await page.getByText("Choose a test").click();
await page.getByText("Burnout", { exact: true }).first().click();
await page.getByText(/^1 \/ 30$/).waitFor();
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
await page.waitForTimeout(300);
capturing = true;
const t0 = Date.now();
const elapsed = () => Date.now() - t0 - pausedTotal;
const at = async (sec: number) => {
  const wait = sec * 1000 - elapsed();
  if (wait > 0) await page.waitForTimeout(wait);
};

// One run: two questions on camera, then a jump cut (rest answered off-camera) to the result.
async function run(mode: Mode, label: string, qPause: number) {
  await badge(label);
  for (let i = 1; i <= 2; i++) await answer(i, mode, qPause);
  capturing = false;
  const pauseStart = Date.now();
  for (let i = 3; i <= 30; i++) await answer(i, mode, 0);
  await page.getByText("Your first blueprint is ready").waitFor({ timeout: 8000 });
  await page.waitForTimeout(600); // let the result animation settle before filming
  pausedTotal += Date.now() - pauseStart;
  capturing = true;
  await repaint();
}
// Screenshot with the caption/badge hidden, taken off-camera so the video does not flicker.
async function shot() {
  capturing = false;
  const ps = Date.now();
  await page.evaluate(() => { for (const id of ["rec-cap", "rec-badge"]) document.getElementById(id)!.style.visibility = "hidden"; });
  const img = `data:image/png;base64,${(await page.screenshot({ type: "png", scale: "css" })).toString("base64")}`;
  await page.evaluate(() => { for (const id of ["rec-cap", "rec-badge"]) document.getElementById(id)!.style.visibility = ""; });
  pausedTotal += Date.now() - ps;
  capturing = true;
  await repaint();
  return img;
}

const HOLD = 1100; // ms each result stays on screen
await caption(sentences[0]);
await run("low", "Lowest option every time", 300);
await page.waitForTimeout(HOLD);
const imgLow = await shot();
await page.getByText("Retake").click();
await page.getByText(/^1 \/ 30$/).waitFor();
await run("high", "Highest option every time", 300);
await page.waitForTimeout(HOLD);
const imgHigh = await shot();
await badge(null);
for (let i = 1; i < sentences.length; i++) {
  await at(starts[i]);
  await caption(sentences[i]);
  if (i === iCompare) {
    await page.evaluate(([a, b]) => {
      const el = document.createElement("div");
      el.id = "rec-cmp";
      el.innerHTML = `<figure><figcaption>Lowest</figcaption><img src="${a}"></figure><figure><figcaption>Highest</figcaption><img src="${b}"></figure>`;
      document.body.appendChild(el);
    }, [imgLow, imgHigh]);
  }
}
await at(duration + 0.6);
await cdp.send("Page.stopScreencast");
const tEnd = Date.now() - pausedTotal;
await ctx.close();
await browser.close();

const kept = frames.filter((f) => f.at >= t0 - pausedTotal - 50);
if (kept.length < 2) throw new Error("no frames captured");
const list = kept.map((f, i) => `file '${f.file}'\nduration ${(((kept[i + 1]?.at ?? tEnd) - f.at) / 1000).toFixed(4)}`).join("\n") + `\nfile '${kept[kept.length - 1].file}'\n`;
const listFile = path.join(tmp, "list.txt");
writeFileSync(listFile, list);
const out = path.join(outDir, `${key}.mp4`);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-i", audio, "-map", "0:v", "-map", "1:a",
  "-vf", "fps=30,scale=1080:1920:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
  "-af", `atempo=${TEMPO}`, "-c:a", "aac", "-b:a", "160k", "-shortest", out], { stdio: "inherit" });
rmSync(tmp, { recursive: true, force: true });
console.log("ok", out, `${duration.toFixed(1)}s audio, ${sentences.length} captions`);
