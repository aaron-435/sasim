/**
 * F4 "before/after" short-form renderer: a fresh user on the mobile-web build
 * (Expo web, :8082) finishes one psych test on camera through to its result card
 * ("before"), then a jump cut shows the same person's saju type card ("after"),
 * with the config's hook as a top overlay, before/after badges, the voiceover
 * script as timed captions, and a closing "Link in bio" card. Same pipeline as
 * render-f1.mts (CDP screencast at 1080x1920, ffmpeg mux); the config schema and
 * the copy rules come from check-copy.mts, the shared pieces from common.mts.
 * All on-screen wording comes from the config file.
 *
 * Usage (mobile-web running: `cd mobile && npx expo start --web --port 8082`):
 *   node --import tsx scripts/shortform/render-f4.mts <key> [--no-tts]
 * <key> is marketing/shortform/produce/<key>.json (format "F4"). Output:
 * marketing/video/<key>.mp4 (git-ignored). --no-tts skips OpenAI (silent track,
 * sentence lengths from character counts) — use it for every check run. The real
 * voice needs OPENAI_API_KEY in the environment (e.g. node --env-file=.env.local
 * --import tsx ...) and is cached under marketing/video/.tts/ so a re-render
 * costs nothing.
 * This is the web rendering of the RN app, not the native build: check it against
 * the iOS simulator before using a shot in an ad. Localhost only. The recording
 * drives the production API for the calculation but strips sessionId/nickname (no
 * stored reading) and blocks /api/events, so no prod data or analytics is written;
 * any other non-GET request to fatesaidapp.com fails the render.
 */
import type { Browser } from "playwright";
import { rmSync } from "node:fs";
import path from "node:path";
import { MODULES, moduleDisplayTitle } from "../../mobile/lib/quiz/modules.ts";
import {
  addCta,
  baseUrl,
  celebrityAboveMask,
  COLORS,
  CTA_CSS,
  FONT_CSS,
  guardProd,
  launch,
  loadForFormat,
  makeTmp,
  maskCelebrities,
  onboardOffCamera,
  OUT_DIR,
  recorder,
  sentenceStarts,
  showCta,
  voiceAudio,
} from "./common.mts";

const { key, noTts, config } = loadForFormat("F4", "render-f4.mts");
if (!config.birth || !config.birth.time) throw new Error(`${key}: birth date, time, and city are required for F4`);
if (!config.aiVoice) throw new Error(`${key}: aiVoice must be true for F4`);
const sentences = config.script;
if (sentences.length < 4 || sentences.length > 6) throw new Error(`${key}: F4 needs 4-6 script sentences`);
// onScreen is exactly [test, before badge, after badge].
if (config.onScreen.length !== 3) throw new Error("F4 needs onScreen [test, beforeLabel, afterLabel]");
const [test, beforeLabel, afterLabel] = config.onScreen;
// Test names as the app's test list shows them (en display titles, no "Module N").
const TESTS = new Set(MODULES.map((m) => moduleDisplayTitle(m.title.en)));
if (!TESTS.has(test)) throw new Error(`${key}: unknown test "${test}"`);
const birth = config.birth;

const tmp = makeTmp(key);
const { audio, af, duration } = await voiceAudio(key, sentences, noTts, tmp);
const starts = sentenceStarts(sentences, duration);
const lastStart = starts[starts.length - 1];
if (duration + 0.6 > 35) throw new Error(`audio ${duration.toFixed(1)}s already over 35s — shorten the script`);

// Hook/caption boxes match render-f1.mts; the badge matches record-app-ab.mts.
const OVERLAY_CSS = `
  ${FONT_CSS}
  ${CTA_CSS}
  #rec-hook { position: fixed; left: 24px; right: 24px; top: 26%; z-index: 99999; text-align: center;
    font: 700 40px/1.25 "PJS", system-ui, sans-serif; color: ${COLORS.headline}; background: rgba(15,26,21,.85);
    border-radius: 16px; padding: 14px 18px; pointer-events: none; }
  #rec-cap { position: fixed; left: 24px; right: 24px; top: 70%; z-index: 99999; text-align: center;
    font: 700 26px/1.3 "PJS", system-ui, sans-serif; color: #F3EBD6; background: rgba(15,26,21,.88);
    border-radius: 14px; padding: 12px 16px; pointer-events: none; }
  #rec-badge { position: fixed; left: 50%; top: 53%; transform: translateX(-50%); z-index: 99999; pointer-events: none;
    font: 700 20px/1 "PJS", system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase; color: #0F1A15;
    background: #9ADBB8; border-radius: 999px; padding: 11px 20px; white-space: nowrap; }`;

let browser: Browser | null = null;
const fail = async (err: unknown): Promise<never> => {
  console.error(err instanceof Error ? err.message : err);
  await browser?.close().catch(() => {});
  rmSync(tmp, { recursive: true, force: true });
  process.exit(1);
};
process.on("unhandledRejection", fail);

try {
  const launched = await launch();
  browser = launched.browser;
  const { ctx, page } = launched;
  await guardProd(page);
  // Extra prod-data guard: anything but a read (or the guarded calc/analytics
  // endpoints) heading for the production host fails the render immediately.
  page.on("request", (req) => {
    const url = req.url();
    if (!url.includes("fatesaidapp.com")) return;
    if (req.method() === "GET") return;
    if (url.includes("/api/saju") || url.includes("/api/events")) return;
    void fail(new Error(`blocked prod write: ${req.method()} ${url}`));
  });

  // Pre-roll (off-camera): onboard with the config's birth, then open the test
  // list so the first filmed frame is already app UI. No ?qa= — a fresh user.
  await onboardOffCamera(page, birth);
  await page.getByRole("button", { name: "Go home" }).click();
  await page.getByText("Choose a test").click();
  await page.getByText("Which psych test would you like to take?").waitFor();
  // Tests outside the recommended picks sit behind the "All tests · N more" toggle.
  if (!(await page.getByText(test, { exact: true }).count())) await page.getByText(/^All tests/).first().click();
  const tile = page.getByText(test, { exact: true }).first();
  try {
    await tile.waitFor({ timeout: 5000 });
  } catch {
    throw new Error(`${key}: unknown test "${test}"`);
  }
  await tile.scrollIntoViewIfNeeded();

  await page.addStyleTag({ content: OVERLAY_CSS });
  await page.evaluate(([hook, first]: [string, string]) => {
    const h = document.createElement("div");
    h.id = "rec-hook";
    h.textContent = hook;
    document.body.appendChild(h);
    const c = document.createElement("div");
    c.id = "rec-cap";
    c.textContent = first;
    document.body.appendChild(c);
    const b = document.createElement("div");
    b.id = "rec-badge";
    b.style.display = "none";
    document.body.appendChild(b);
  }, [config.hook, sentences[0]] as [string, string]);
  await addCta(page);

  // Each item leans high or low from the birth date digits, so every video's
  // result card actually differs (SPEC rules: no two renders alike).
  const digitSum = [...birth.date].filter((c) => c >= "0" && c <= "9").map(Number).reduce((a, n) => a + n, 0);
  // Same answering as record-app-ab.mts: sliders get an end tap + Next, choice
  // questions get the first/last option.
  async function answer(i: number, pause: number, retry = true): Promise<void> {
    await page.getByText(new RegExp(`^${i} / 30$`)).waitFor({ timeout: 5000 });
    const hi = (digitSum + i) % 2 === 0;
    const slider = page.locator('[role="slider"]');
    if (await slider.count()) {
      const bx = (await slider.boundingBox())!;
      await page.mouse.click(hi ? bx.x + bx.width - 6 : bx.x + 6, bx.y + bx.height / 2);
      if (pause) await page.waitForTimeout(pause);
      await page.getByText("Next", { exact: true }).click();
    } else {
      const opts = page.locator('button:not([aria-label="Back"])').filter({ hasNotText: /^Next$/ });
      await opts.nth(hi ? (await opts.count()) - 1 : 0).click();
      await page.waitForTimeout(Math.max(pause, 150));
      // Some option screens advance on their own; a blind "Next" click during that
      // transition lands on the following question and skips it.
      const stillHere = await page.getByText(new RegExp(`^${i} / 30$`)).count();
      const next = page.getByText("Next", { exact: true });
      if (stillHere && (await next.count())) await next.click().catch(() => {});
    }
    if (i === 30) return;
    try {
      await page.getByText(new RegExp(`^${i + 1} / 30$`)).waitFor({ timeout: 2500 });
    } catch (err) {
      // Rarely a click lands mid-transition and doesn't register; answer once more.
      if (!retry || !(await page.getByText(new RegExp(`^${i} / 30$`)).count())) throw err;
      await answer(i, pause, false);
    }
  }

  const rec = await recorder(ctx, page, tmp);
  await rec.start();
  // Captions follow the narration on their own timer (video time), whatever the
  // page is doing. Paused across cuts: the video clock freezes but wall time
  // doesn't, so a running timer would jump ahead off-camera.
  const idxAt = (t: number): number => {
    let idx = 0;
    for (let i = 0; i < starts.length; i++) if (starts[i] <= t) idx = i;
    return idx;
  };
  let capIdx = -1;
  let capTimer: ReturnType<typeof setInterval> | null = null;
  const tick = (): void => {
    const idx = idxAt(rec.elapsed());
    if (idx === capIdx) return;
    capIdx = idx;
    void page.evaluate(([cap]: [string]) => {
      document.getElementById("rec-cap")!.textContent = cap;
    }, [sentences[idx]] as [string]).catch(() => {});
  };
  const stopCaps = (): void => {
    if (capTimer) clearInterval(capTimer);
    capTimer = null;
  };
  const startCaps = (): void => {
    stopCaps();
    tick();
    capTimer = setInterval(tick, 40);
  };
  startCaps();

  // Beats from the end of the script: result card on the third-from-last sentence,
  // type card on the second-from-last, CTA on the last. The quiz opens after a short
  // hook beat (1.2s) and the hook goes away so it doesn't cover the questions.
  const n = sentences.length;
  const resultBeat = starts[Math.max(0, n - 3)];
  const typeBeat = starts[Math.max(0, n - 2)];
  // S1: the test tile, then two items on camera.
  await rec.at(1.2);
  await page.evaluate(() => { document.getElementById("rec-hook")!.style.display = "none"; });
  await tile.click();
  await page.getByText(/^1 \/ 30$/).waitFor();
  await answer(1, 280);
  await answer(2, 280);

  // The result lands near the third sentence: hold the quiz until just before
  // it, answer the rest off-camera, and resume on the settled result card.
  await rec.at(Math.max(0, resultBeat - 0.6));
  stopCaps();
  rec.cut();
  for (let i = 3; i <= 30; i++) await answer(i, 0);
  await page.getByText("Your first blueprint is ready").waitFor({ timeout: 8000 });
  await page.waitForTimeout(600); // let the result animation settle before filming
  await rec.resume();
  startCaps();

  // S2: the result card with the "before" badge; the hook would sit on its title.
  const resultAt = rec.elapsed();
  await page.evaluate(([label]: [string]) => {
    document.getElementById("rec-hook")!.style.display = "none";
    const b = document.getElementById("rec-badge")!;
    b.textContent = label;
    b.style.display = "block";
  }, [beforeLabel] as [string]);

  // S3: jump cut to the same person's saju type card. The result card stays up
  // at least 2.5s first (it is half the payoff), even past the narration beat.
  await rec.at(Math.max(0, typeBeat - 0.6, resultAt + 2.5));
  const s3cutAt = rec.elapsed();
  stopCaps();
  rec.cut();
  await page.goto(`${baseUrl()}/`, { waitUntil: "networkidle" });
  // Saved state opens Home; its type tile is labelled with the type name ("Dew · Order").
  await page.getByRole("button", { name: / · / }).first().click();
  await page.getByRole("button", { name: "Back", exact: true }).first().waitFor();
  await page.waitForTimeout(1200); // let the type card settle before filming
  // Fresh page means an empty DOM: overlays back on, with the "after" badge.
  await page.addStyleTag({ content: OVERLAY_CSS });
  await page.evaluate(([cap, label]: [string, string]) => {
    const h = document.createElement("div");
    h.id = "rec-hook";
    h.style.display = "none";
    document.body.appendChild(h);
    const c = document.createElement("div");
    c.id = "rec-cap";
    c.textContent = cap;
    document.body.appendChild(c);
    const b = document.createElement("div");
    b.id = "rec-badge";
    b.textContent = label;
    document.body.appendChild(b);
  }, [sentences[idxAt(s3cutAt)], afterLabel] as [string, string]);
  await addCta(page);
  capIdx = idxAt(s3cutAt);
  // The type screen lists famous people who share the type below the first
  // viewport (~1290px down), so the mask is only a bottom strip here; if the
  // layout ever moves that label on screen, fail loudly instead of filming it.
  const maskTop = await maskCelebrities(page);
  const typeShot = path.join(OUT_DIR, `.type-${key}.png`);
  if (await celebrityAboveMask(page, maskTop, typeShot)) {
    throw new Error(`celebrity section is on screen at the type card — layout changed, fix the framing (see ${typeShot})`);
  }
  // Same 35px display line render-f1.mts reads off the reveal card.
  const typeName = (await page.evaluate(() => {
    const el = [...document.querySelectorAll("div")]
      .find((e) => getComputedStyle(e).fontSize === "35px" && (e.textContent ?? "").trim().length > 0);
    return (el?.textContent ?? "").trim() || null;
  })) ?? "?";
  await rec.resume();
  startCaps();
  const typeAt = rec.elapsed();

  // Last sentence: full-screen card for the final ~1.5s over the spoken CTA. The
  // type card stays up at least 2.5s first (it is the payoff), even past the voice.
  await rec.at(lastStart);
  const ctaAt = Math.max(lastStart + 0.5, duration + 0.6 - 1.75, typeAt + 2.5, rec.elapsed());
  await rec.at(ctaAt);
  await showCta(page);
  await rec.at(Math.max(duration + 0.6, ctaAt + 1.5));
  stopCaps();
  const out = path.join(OUT_DIR, `${key}.mp4`);
  const videoDur = await rec.finish(out, { audio, af, duration }, 35);
  await browser?.close().catch(() => {});
  browser = null;
  rmSync(tmp, { recursive: true, force: true });
  console.log(`ok ${out} ${videoDur.toFixed(1)}s, ${sentences.length} captions, test=${test}, type=${typeName}`);
} catch (err) {
  await fail(err);
}
