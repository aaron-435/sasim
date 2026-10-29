/**
 * Shared pieces for the short-form renderers (render-f2/f3/f4/f6): config loading + copy
 * check, the TTS track (or a silent one), CDP screencast recording at 1080x1920 with
 * off-camera cuts, the ffmpeg mux, the production-data guard, an off-camera onboarding run
 * on mobile-web and the celebrity-section mask. Lifted from render-f1.mts, which keeps its
 * own copy (it was verified frame by frame before this file existed).
 * Recording is against mobile-web (Expo web, :8082) only: web rendering of the RN app, not
 * the native build.
 */
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { COLORS } from "../../mobile/theme/colors.ts";
import { checkConfig, loadConfigFile, type Birth, type Format, type ShortformConfig } from "./check-copy.mts";

export const ROOT = path.resolve(import.meta.dirname, "..", "..");
export const OUT_DIR = path.join(ROOT, "marketing/video");
export { COLORS };

/** argv → config for one format. Copy violations print and exit 1 before anything renders. */
export function loadForFormat(format: Format, script: string): { key: string; noTts: boolean; config: ShortformConfig } {
  const [keyArg, ...rest] = process.argv.slice(2);
  const noTts = rest.includes("--no-tts");
  const unknown = rest.filter((a) => a !== "--no-tts");
  if (!keyArg || unknown.length > 0) throw new Error(`usage: ${script} <key> [--no-tts]`);
  const config = loadConfigFile(path.join(ROOT, "marketing/shortform/produce", `${keyArg}.json`));
  if (config.format !== format) throw new Error(`${keyArg}: format is ${config.format}, want ${format}`);
  const violations = checkConfig(config);
  if (violations.length > 0) {
    for (const v of violations) console.log(`  ${v.field}: ${v.rule} "${v.match}"`);
    process.exit(1);
  }
  return { key: keyArg, noTts, config };
}

export function baseUrl(): string {
  const base = process.env.BASE_URL ?? "http://localhost:8082";
  if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(base)) throw new Error("record against localhost only");
  return base;
}

/** Fresh marketing/video/.tmp-<key>; callers remove it on success and failure. */
export function makeTmp(key: string): string {
  mkdirSync(OUT_DIR, { recursive: true });
  const tmp = path.join(OUT_DIR, `.tmp-${key}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  return tmp;
}

const fontFile = (rel: string): string => readFileSync(path.join(ROOT, "mobile/node_modules/@expo-google-fonts", rel)).toString("base64");
/** Same faces as FONTS in mobile/theme/fonts.ts: Plus Jakarta Sans for UI, Newsreader for display. */
export const FONT_CSS = `
  @font-face { font-family: "PJS"; src: url(data:font/ttf;base64,${fontFile("plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf")}); font-weight: 700; }
  @font-face { font-family: "PJS"; src: url(data:font/ttf;base64,${fontFile("plus-jakarta-sans/500Medium/PlusJakartaSans_500Medium.ttf")}); font-weight: 500; }
  @font-face { font-family: "NR"; src: url(data:font/ttf;base64,${fontFile("newsreader/500Medium/Newsreader_500Medium.ttf")}); font-weight: 500; }
  @font-face { font-family: "NR"; src: url(data:font/ttf;base64,${fontFile("newsreader/500Medium_Italic/Newsreader_500Medium_Italic.ttf")}); font-weight: 500; font-style: italic; }`;

export const TEMPO = Number(process.env.TEMPO ?? 1.12);
// Same model/voice/direction as marketing/tts-samples/generate.py and render-f1.mts.
const TTS_INSTRUCTIONS = "Upbeat, brisk narrator for a short social video. Speak noticeably fast, no long pauses between sentences, clear articulation, not salesy.";

export interface Audio {
  audio: string;
  af: string; // ffmpeg -af for the mux
  duration: number; // seconds, after TEMPO
}

/** A silent track of the given length (formats without a voice, or --no-tts). */
export function silentAudio(tmp: string, seconds: number): Audio {
  const audio = path.join(tmp, "silence.mp3");
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
    "-t", String(seconds), audio], { stdio: "inherit" });
  return { audio, af: "apad", duration: seconds };
}

/**
 * Voice track for the script sentences, cached under marketing/video/.tts/<key>-<sha1>.mp3
 * so re-renders cost nothing. --no-tts: silent track sized from character counts.
 */
export async function voiceAudio(key: string, sentences: string[], noTts: boolean, tmp: string): Promise<Audio> {
  if (noTts) return silentAudio(tmp, sentences.reduce((n, s) => n + Math.max(s.length * 0.065, 1.6), 0));
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY 없음, --no-tts로 실행하거나 --env-file=.env.local");
  const text = sentences.join(" ");
  const hash = createHash("sha1").update(text).digest("hex").slice(0, 10);
  const ttsDir = path.join(OUT_DIR, ".tts");
  mkdirSync(ttsDir, { recursive: true });
  const audio = path.join(ttsDir, `${key}-${hash}.mp3`);
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
  const duration = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio]).toString()) / TEMPO;
  // apad + -shortest: the track never truncates the picture when the actions run long.
  return { audio, af: `atempo=${TEMPO},apad`, duration };
}

/** Sentence start times, proportional to character count over the audio length (approximate). */
export function sentenceStarts(sentences: string[], duration: number): number[] {
  const total = sentences.reduce((n, s) => n + s.length, 0);
  let acc = 0;
  return sentences.map((s) => {
    const t = total === 0 ? 0 : (acc / total) * duration;
    acc += s.length;
    return t;
  });
}

const chromeExe = process.env.CHROME_PATH ??
  path.join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell");

/**
 * 540x960 @2x, en-US: the same phone frame as the record-*.mts scripts. The window flags
 * matter with a full Chrome (CHROME_PATH): its headless window is not the viewport, so the
 * screencast otherwise comes back 540x873 at 1x and the mux stretches it to 1080x1920.
 */
export async function launch(): Promise<{ browser: Browser; ctx: BrowserContext; page: Page }> {
  const browser = await chromium.launch({ executablePath: chromeExe, args: ["--window-size=540,960", "--force-device-scale-factor=2"] });
  const ctx = await browser.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, locale: "en-US" });
  const page = await ctx.newPage();
  return { browser, ctx, page };
}

/**
 * Prod-data guard (the app always calls https://www.fatesaidapp.com): the calc still runs on
 * the production engine, but without sessionId /api/saju stores nothing (see
 * app/api/saju/route.ts), and analytics batches never leave the browser.
 */
export async function guardProd(page: Page): Promise<void> {
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
}

export interface Recorder {
  /** Starts filming; the video clock starts here. */
  start(): Promise<void>;
  /** Stops filming; the video clock stops too (jump cut). */
  cut(): void;
  /** Films again from where the clock stopped. */
  resume(): Promise<void>;
  /** Video time in seconds. */
  elapsed(): number;
  /** Waits until video time `sec` (no-op if already past). */
  at(sec: number): Promise<void>;
  /** Stops the screencast and writes marketing/video/<key>.mp4 with the given audio. Returns the video length. */
  finish(out: string, audio: Audio, maxSec: number): Promise<number>;
}

/**
 * CDP screencast at full 1080x1920 (Playwright's recordVideo ignores deviceScaleFactor).
 * The screencast only emits frames when the page changes, so resume() forces a tiny
 * repaint or the first filmed frame after a cut would be the stale one.
 */
export async function recorder(ctx: BrowserContext, page: Page, tmp: string): Promise<Recorder> {
  const cdp = await ctx.newCDPSession(page);
  const frames: { file: string; at: number }[] = [];
  let capturing = false;
  let pausedTotal = 0; // ms spent off-camera; frame times are shifted so cuts are seamless
  let pauseStart = 0;
  let t0 = 0;
  let sizeError: Error | null = null;
  cdp.on("Page.screencastFrame", (f: { data: string; sessionId: number; metadata: { deviceWidth: number; deviceHeight: number } }) => {
    void cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
    if (!capturing) return;
    try {
      checkSize(f.metadata);
    } catch (e) {
      sizeError = e as Error;
    }
    const file = path.join(tmp, `f${String(frames.length).padStart(5, "0")}.jpg`);
    writeFileSync(file, Buffer.from(f.data, "base64"));
    frames.push({ file, at: Date.now() - pausedTotal });
  });
  // The mux scales whatever comes in to 1080x1920; catch a wrong frame size here instead.
  const checkSize = (meta: { deviceWidth: number; deviceHeight: number }) => {
    if (meta.deviceWidth !== 540 || meta.deviceHeight !== 960) throw new Error(`screencast is ${meta.deviceWidth}x${meta.deviceHeight}, want 540x960 — browser window size`);
  };
  const repaint = () =>
    page.evaluate(() => new Promise<void>((r) => {
      const e = document.createElement("div");
      e.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;background:rgba(0,0,0,.01);z-index:2147483647;pointer-events:none";
      document.body.appendChild(e);
      requestAnimationFrame(() => requestAnimationFrame(() => { e.remove(); r(); }));
    }));
  const elapsed = () => (Date.now() - t0 - pausedTotal) / 1000;
  return {
    async start() {
      await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
      await page.waitForTimeout(300);
      capturing = true;
      t0 = Date.now();
      await repaint();
    },
    cut() {
      capturing = false;
      pauseStart = Date.now();
    },
    async resume() {
      pausedTotal += Date.now() - pauseStart;
      capturing = true;
      await repaint();
    },
    elapsed,
    async at(sec: number) {
      const wait = (sec - elapsed()) * 1000;
      if (wait > 0) await page.waitForTimeout(wait);
    },
    async finish(out: string, audio: Audio, maxSec: number) {
      await cdp.send("Page.stopScreencast");
      capturing = false;
      const tEnd = Date.now() - pausedTotal;
      if (sizeError) throw sizeError;
      const kept = frames.filter((f) => f.at >= t0 - pausedTotal - 50);
      if (kept.length < 2) throw new Error("no frames captured");
      const videoDur = (tEnd - t0) / 1000;
      if (videoDur > maxSec) throw new Error(`video ${videoDur.toFixed(1)}s over ${maxSec}s — shorten the script`);
      const list = kept.map((f, i) => `file '${f.file}'\nduration ${(((kept[i + 1]?.at ?? tEnd) - f.at) / 1000).toFixed(4)}`).join("\n") + `\nfile '${kept[kept.length - 1].file}'\n`;
      const listFile = path.join(tmp, "list.txt");
      writeFileSync(listFile, list);
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-i", audio.audio, "-map", "0:v", "-map", "1:a",
        "-vf", "fps=30,scale=1080:1920:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
        "-af", audio.af, "-c:a", "aac", "-b:a", "160k", "-t", videoDur.toFixed(3), out], { stdio: "inherit" });
      // -t: the trailing concat entry (needed so the last frame gets its duration) would otherwise add a still.
      return videoDur;
    },
  };
}

/**
 * Whole new-user onboarding, off camera, with the config's birth data, ending on the type
 * reveal ("Here's your saju type"). Same selectors as render-f1.mts. Call guardProd first.
 */
export async function onboardOffCamera(page: Page, birth: Birth): Promise<void> {
  const next = async () => {
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await page.waitForTimeout(300);
  };
  const fill = (label: string, value: string) => page.getByLabel(label, { exact: true }).fill(value);
  await page.goto(`${baseUrl()}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "English" }).click();
  await page.getByRole("button", { name: "Get started" }).click();
  await fill("What should we call you?", "Alex");
  await next();
  await page.getByRole("radio", { name: "Male", exact: true }).click();
  await next();
  const [year, month, day] = birth.date.split("-");
  await fill("Birth month", month);
  await fill("Birth day", day);
  await fill("Birth year", year);
  await next();
  await page.getByLabel("Hour", { exact: true }).waitFor();
  if (birth.time === null) {
    await page.getByRole("checkbox", { name: "I don't know my birth time" }).click();
  } else {
    const h24 = Number(birth.time.split(":")[0]);
    await fill("Hour", String(h24 % 12 === 0 ? 12 : h24 % 12).padStart(2, "0"));
    await fill("Minute", birth.time.split(":")[1]);
    await page.getByRole("radio", { name: h24 < 12 ? "AM" : "PM", exact: true }).click();
  }
  await next();
  const city = page.getByLabel("Birth city (searchable worldwide)", { exact: true });
  await city.waitFor();
  await city.click();
  await page.keyboard.type(birth.city, { delay: 30 });
  const escRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = page.getByRole("button", { name: new RegExp(`^${escRe(birth.city)}\\s*,`, "i") });
  try {
    await match.first().waitFor({ timeout: 15000 });
  } catch {
    throw new Error(`no city result matching "${birth.city}"`);
  }
  await match.first().click();
  await next();
  const concern = page.getByRole("radio", { name: /^Relationships/ });
  await concern.waitFor({ timeout: 30000 });
  await concern.click();
  await next();
  try {
    await page.getByText("Here's your saju type").waitFor({ timeout: 10000 });
  } catch {
    throw new Error("type reveal never appeared (no sajuType in the calc response?)");
  }
}

const CELEB_LABEL = "People who share this type";

/**
 * Short-form videos must not show celebrity names (SPEC rules). On a screen that lists people
 * who share the type, a background-colored mask covers from that label down (the label is laid
 * out, at opacity 0, as soon as the screen mounts). Throws if the section starts too high to
 * mask without hiding the card. Returns the mask top (CSS px).
 */
export async function maskCelebrities(page: Page, minTop = 960 * 0.6): Promise<number> {
  const top = await page.evaluate(([bg, label]: [string, string]) => {
    const tops = [...document.querySelectorAll("div")]
      .filter((e) => e.children.length === 0 && e.textContent?.trim() === label)
      .map((e) => e.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.left < window.innerWidth && r.right > 0)
      .map((r) => r.top);
    const t = Math.max(0, Math.min(window.innerHeight, ...tops) - 22); // reveal offset settles ~12px up
    document.getElementById("rec-mask")?.remove();
    const m = document.createElement("div");
    m.id = "rec-mask";
    m.style.cssText = `position:fixed;left:0;right:0;bottom:0;top:${t}px;background:${bg};z-index:99998;pointer-events:none`;
    document.body.appendChild(m);
    return t;
  }, [COLORS.background, CELEB_LABEL] as [string, string]);
  if (top < minTop) throw new Error(`celebrity section starts at ${top}px — too high to mask, fix the framing`);
  return top;
}

/** True if any copy of the celebrity label sits above the mask (layout changed). Screenshot to shotPath if so. */
export async function celebrityAboveMask(page: Page, maskTop: number, shotPath: string): Promise<boolean> {
  const visible = await page.evaluate(([top, label]: [number, string]) =>
    [...document.querySelectorAll("div")]
      .filter((e) => e.children.length === 0 && e.textContent?.trim() === label)
      .some((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.top < top && r.bottom > 0 && r.left < window.innerWidth && r.right > 0;
      }), [maskTop, CELEB_LABEL] as [number, string]);
  if (visible) await page.screenshot({ path: shotPath });
  return visible;
}

/** Closing card markup + CSS ("Link in bio" / "Fatesaid"), hidden until showCta(). */
export const CTA_CSS = `
  #rec-cta { position: fixed; inset: 0; z-index: 100000; background: ${COLORS.ctaText}; display: none;
    flex-direction: column; align-items: center; justify-content: center; gap: 14px; }
  #rec-cta .big { font: 700 46px/1.2 "PJS", system-ui, sans-serif; color: ${COLORS.headline}; text-align: center; }
  #rec-cta .small { font: 700 20px/1 "PJS", system-ui, sans-serif; letter-spacing: .08em; color: ${COLORS.gold}; }`;
export const addCta = (page: Page) => page.evaluate(() => {
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
});
export const showCta = (page: Page) => page.evaluate(() => { document.getElementById("rec-cta")!.style.display = "flex"; });

/**
 * The user's generative "element map" (mobile/components/art/ElementMap.tsx: five petals
 * sized by the chart's element shares, rings seeded by the day master) as the app draws it
 * on Home for this birth, captured as SVG markup, plus the type name the app shows for the
 * same reading ("Dew · Order"). Runs its own off-camera onboarding; cached under
 * marketing/video/.art/<sha1 of date|time|city>.json. The markup is the app's own drawing
 * (react-native-svg renders a real <svg> on web), so a renderer can scale it to any size
 * without re-implementing it.
 */
export async function elementMap(birth: Birth): Promise<{ svg: string; typeName: string }> {
  const id = createHash("sha1").update(`${birth.date}|${birth.time ?? ""}|${birth.city}`).digest("hex").slice(0, 10);
  const dir = path.join(OUT_DIR, ".art");
  const file = path.join(dir, `${id}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8")) as { svg: string; typeName: string };
  const { browser, page } = await launch();
  try {
    await guardProd(page);
    await onboardOffCamera(page, birth);
    await page.getByRole("button", { name: "Go home" }).click();
    const el = page.locator('svg[viewBox="-100 -100 200 200"]').first();
    await el.waitFor({ timeout: 15000 });
    await page.waitForTimeout(1200); // mount animation (petals scale in over 900ms)
    // Drop the live size/rotation attributes so the capture is upright and scalable.
    const svg = await el.evaluate((node) => {
      const c = node.cloneNode(true) as SVGElement;
      for (const a of ["style", "class", "width", "height"]) c.removeAttribute(a);
      c.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      return c.outerHTML;
    });
    // Home's type tile is a button labelled with the type name ("Dew · Order").
    const typeName = (await page.getByRole("button", { name: / · / }).first().getAttribute("aria-label")) ?? "";
    if (!typeName) throw new Error("type name not found on Home");
    mkdirSync(dir, { recursive: true });
    writeFileSync(file, JSON.stringify({ svg, typeName }));
    return { svg, typeName };
  } finally {
    await browser.close();
  }
}
