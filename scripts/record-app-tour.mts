/**
 * Screen-tour shorts for the year report, Year Wrapped and share cards (video-kit.md 8장, hooks
 * 16–20, script keys Y16–Y20). Same pipeline as record-app-ab.mts: the mobile-web build (Expo
 * web, :8082) filmed through a CDP screencast at 1080x1920, the voiceover burned in as pop-in
 * captions and the TTS audio muxed. Each key's config opens a screen off-camera, then turns
 * pages / switches cards on the narration beats; jumps of several pages are jump cuts.
 *
 * Usage (mobile-web running: `cd mobile && npx expo start --web --port 8082`):
 *   node --import tsx scripts/record-app-tour.mts Y18
 * Output: marketing/video/<KEY>.mp4 (git-ignored). Localhost only, QA persona data (sample birth
 * details, the scripts say so). Year Wrapped is opened outside December–January with the dev-only
 * `?date=` override (mobile/dev/qaMode.ts); the "most-asked topic" card needs Q&A history, which
 * is seeded into this browser's storage (topic counts only) before the app loads.
 */
import { chromium, type Page } from "playwright";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

interface Ctl {
  page: Page;
  /** Turn pages on camera until the pager counter reads `n` (e.g. 3 → "03/13"). */
  turnTo: (n: number) => Promise<void>;
  /** Same, off-camera: the video cuts straight to page `n`. */
  cutTo: (n: number) => Promise<void>;
  /** Run `fn` off-camera (jump cut). */
  cut: (fn: () => Promise<void>) => Promise<void>;
}
interface Config {
  query: string; // QA mode query string
  storage?: Record<string, string>; // localStorage seeded before the app loads
  open: (page: Page) => Promise<void>; // off-camera pre-roll: the first filmed frame is this screen
  beats: Record<number, (c: Ctl) => Promise<void>>; // sentence index → action at that sentence
  highlight: string[];
}

const clickText = async (page: Page, re: RegExp) => {
  await page.getByText(re).first().waitFor();
  await page.getByText(re).first().click();
};
const openYearReport = async (page: Page) => {
  await page.getByText("Choose a test").waitFor();
  await clickText(page, /^2027 Year-Ahead Report$/);
  await page.getByText(/^01\/13$/).waitFor();
};
const openWrapped = async (page: Page) => {
  await page.getByText("Choose a test").waitFor();
  await clickText(page, /^Look back on 2026/);
  await page.getByText(/^01\/0\d$/).waitFor({ timeout: 10000 });
};
// Share cards: pick a card off-camera and scroll so the card (not the chip row) fills the frame.
const showShareCard = async (page: Page, chip: string) => {
  await page.getByText(chip, { exact: true }).first().click();
  await page.waitForTimeout(500);
  await page.mouse.move(270, 600);
  await page.mouse.wheel(0, -2000);
  await page.waitForTimeout(200);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(400);
};

const CONFIGS: Record<string, Config> = {
  // Year report, purchased view (qa=all). Page 3 is the wealth area: skipped on purpose (video-kit
  // rule: no finance words), the narration says "five areas" without naming them.
  Y16: {
    query: "qa=all&persona=jordan",
    open: openYearReport,
    beats: {
      2: async (c) => { await c.cutTo(4); await c.page.waitForTimeout(1400); await c.turnTo(5); },
      3: async (c) => { await c.cutTo(8); for (const n of [9, 10, 11]) { await c.page.waitForTimeout(1300); await c.turnTo(n); } },
      5: (c) => c.turnTo(12),
      7: (c) => c.turnTo(13),
    },
    highlight: ["twelve months", "Five life areas", "three at a time", "four-step action plan", "sample birth details"],
  },
  Y17: {
    query: "qa=all&persona=jordan",
    open: openYearReport,
    beats: {
      2: (c) => c.cutTo(4),
      4: (c) => c.turnTo(5),
      5: (c) => c.turnTo(6),
      6: (c) => c.turnTo(7),
      7: async (c) => { await c.cutTo(8); await c.page.waitForTimeout(1500); await c.cutTo(12); },
    },
    highlight: ["Five life areas", "twelve months", "one action plan", "Love and relationships", "Work and career", "Learning", "Body and mind care", "sample birth details"],
  },
  // Year Wrapped: five cards with the seeded topic history.
  Y18: {
    query: "qa=free&persona=jordan&date=2026-12-05",
    storage: { fatesaid_qa_topic_counts: JSON.stringify({ 2026: { self: 5, love: 3, timing: 1 } }) },
    open: openWrapped,
    beats: {
      2: (c) => c.turnTo(2),
      3: (c) => c.turnTo(3),
      4: (c) => c.turnTo(4),
      5: (c) => c.turnTo(5),
    },
    highlight: ["Year Wrapped", "five cards", "best-flowing month", "one sentence", "the year ahead", "sample birth details", "free"],
  },
  Y19: {
    query: "qa=free&persona=jordan&date=2026-12-05",
    open: openWrapped,
    beats: {
      4: (c) => c.cutTo(4),
    },
    highlight: ["an element and an animal", "Year of the Fire Horse", "Year of the Fire Goat", "start of spring", "sample birth details", "free"],
  },
  // Share cards, persona mia: her "bright spot" card is learning; the money card is never shown.
  Y20: {
    query: "qa=all&persona=mia",
    open: async (page) => {
      await page.getByText("Choose a test").waitFor();
      await clickText(page, /^My saju cards$/);
      await page.getByText("What sets my heart racing", { exact: true }).first().waitFor();
      await showShareCard(page, "What sets my heart racing");
    },
    beats: {
      4: (c) => c.cut(() => showShareCard(c.page, "My bright spot this year")),
      5: async (c) => { await c.page.mouse.wheel(0, 260); },
    },
    highlight: ["made to share", "heart racing", "small hint", "bright spot", "as an image", "sample birth details"],
  },
};

const [key] = process.argv.slice(2);
if (!key) throw new Error("usage: record-app-tour.mts <scriptKey>");
const cfg = CONFIGS[key];
if (!cfg) throw new Error(`no config for ${key} (add it to CONFIGS)`);
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
for (const i of Object.keys(cfg.beats).map(Number)) if (i >= sentences.length) throw new Error(`beat ${i} past the last sentence`);

const fontB64 = readFileSync(path.join(root, "mobile/node_modules/@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf")).toString("base64");
const outDir = path.join(root, "marketing/video");
const tmp = path.join(outDir, `.tmp-${key}`);
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const chromeExe = process.env.CHROME_PATH ??
  path.join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const browser = await chromium.launch({ executablePath: chromeExe });
const ctx = await browser.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, locale: "en-US" });
if (cfg.storage) {
  await ctx.addInitScript((kv) => {
    for (const [k, v] of Object.entries(kv)) if (localStorage.getItem(k) === null) localStorage.setItem(k, v);
  }, cfg.storage);
}
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

await page.goto(`${base}/?${cfg.query}&lang=en`, { waitUntil: "networkidle" });
await cfg.open(page);
await page.waitForTimeout(600); // let the entry animation settle before filming
await page.addStyleTag({
  content: `
  @font-face { font-family: "PJS"; src: url(data:font/ttf;base64,${fontB64}); font-weight: 700; }
  @keyframes recpop { 0% { transform: scale(.92); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  #rec-cap { position: fixed; left: 22px; right: 22px; top: 66%; z-index: 99999; text-align: center;
    font: 700 28px/1.28 "PJS", system-ui, sans-serif; color: #F3EBD6; background: rgba(15,26,21,.9);
    border-radius: 16px; padding: 14px 18px; pointer-events: none; animation: recpop .18s ease-out; }
  #rec-cap b { color: #9ADBB8; }`,
});
await page.evaluate(() => {
  const d = document.createElement("div");
  d.id = "rec-cap";
  document.body.appendChild(d);
});

const escapeHtml = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
const caption = (s: string) => {
  let html = escapeHtml(s);
  for (const w of cfg.highlight) html = html.replace(new RegExp(w, "g"), `<b>${w}</b>`);
  return page.evaluate((h) => {
    const c = document.getElementById("rec-cap")!;
    c.style.animation = "none";
    void c.offsetWidth;
    c.style.animation = "";
    c.innerHTML = h;
  }, html);
};
// CDP screencast only emits frames when the page changes, so after an off-camera stretch a tiny
// visual change is needed or the first filmed frame would be the stale one.
const repaint = () =>
  page.evaluate(() => new Promise<void>((r) => {
    const e = document.getElementById("rec-cap")!;
    e.style.transform = "scale(1.002)";
    requestAnimationFrame(() => requestAnimationFrame(() => { e.style.transform = ""; r(); }));
  }));

// Pager counter "NN/MM" (ReportPager, WrappedScreen). Turning = tapping the right edge.
const pageNo = async () => {
  const t = await page.getByText(/^\d{2}\/\d{2}$/).first().textContent();
  return Number(t!.split("/")[0]);
};
const tapNext = async () => {
  const before = await pageNo();
  await page.mouse.click(525, 480);
  await page.getByText(new RegExp(`^${String(before + 1).padStart(2, "0")}/\\d{2}$`)).first().waitFor({ timeout: 4000 });
};
const turnTo = async (n: number) => {
  while ((await pageNo()) < n) await tapNext();
};
const cut = async (fn: () => Promise<void>) => {
  capturing = false;
  const ps = Date.now();
  await fn();
  await page.waitForTimeout(450); // page-turn animation settles off-camera
  pausedTotal += Date.now() - ps;
  capturing = true;
  await repaint();
};
const ctl: Ctl = { page, turnTo, cutTo: (n) => cut(() => turnTo(n)), cut };

await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
await page.waitForTimeout(300);
capturing = true;
const t0 = Date.now();
const elapsed = () => Date.now() - t0 - pausedTotal;
const at = async (sec: number) => {
  const wait = sec * 1000 - elapsed();
  if (wait > 0) await page.waitForTimeout(wait);
};

// Captions follow the narration on their own timer (video time), whatever the page is doing.
let capIdx = -1;
const capTimer = setInterval(() => {
  const t = elapsed() / 1000;
  let idx = 0;
  for (let i = 0; i < starts.length; i++) if (starts[i] <= t) idx = i;
  if (idx !== capIdx) {
    capIdx = idx;
    void caption(sentences[idx]).catch(() => {});
  }
}, 40);

for (const i of Object.keys(cfg.beats).map(Number).sort((a, b) => a - b)) {
  await at(starts[i]);
  await cfg.beats[i](ctl);
}
await at(duration + 0.6);
clearInterval(capTimer);
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
