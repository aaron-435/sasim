/**
 * F6 "one-line quote card" short-form renderer: a still page built with
 * page.setContent — the slowly spinning ElementMap art behind the type's own
 * tagline line, the type name, and the account handle — recorded to a 7-12s
 * silent 1080x1920 clip. The music is picked on the platform at posting time,
 * so the track is silence. The art comes from mobile-web's ElementMap
 * (common.mts elementMap runs an off-camera onboarding for the config's birth
 * and captures the app's own SVG), shared with F3 through art-layer.mts.
 * All on-screen wording comes from the config file, except @fatesaidapp.
 *
 * Usage (mobile-web running: `cd mobile && npx expo start --web --port 8082`):
 *   node --import tsx scripts/shortform/render-f6.mts <key> [--no-tts]
 * <key> is marketing/shortform/produce/<key>.json (format "F6"). Output:
 * marketing/video/<key>.mp4 (git-ignored). --no-tts is accepted and ignored
 * (there is no voice track). Length comes from F6_SECONDS (default 9, 7-12).
 * This is the web rendering of the RN app's drawing, not the native build.
 * Localhost only. elementMap strips sessionId/nickname and blocks /api/events,
 * so no prod data or analytics is written.
 */
import type { Browser } from "playwright";
import { rmSync } from "node:fs";
import path from "node:path";
import { SAJU_TYPE_CONTENT } from "../../mobile/lib/sajuTypeContent.ts";
import { artLayerHtml } from "./art-layer.mts";
import { COLORS, elementMap, FONT_CSS, launch, loadForFormat, makeTmp, OUT_DIR, recorder, silentAudio } from "./common.mts";

const { key, config } = loadForFormat("F6", "render-f6.mts");
if (!config.birth) throw new Error(`${key}: birth is required for F6`);
if (config.script.length > 0) throw new Error(`${key}: script must be empty for F6`);
if (config.aiVoice) throw new Error(`${key}: aiVoice must be false for F6`);
if (config.onScreen.length < 1 || config.onScreen.length > 2) throw new Error(`${key}: onScreen wants 1-2 lines for F6`);
const birth = config.birth;

// Silent by design: the poster picks the platform track, so the clip only needs a
// mute track of the same length. F6_SECONDS outside 7-12 is a config error.
const seconds = Number(process.env.F6_SECONDS ?? 9);
if (!Number.isFinite(seconds) || seconds < 7 || seconds > 12) throw new Error(`F6_SECONDS ${process.env.F6_SECONDS ?? 9} out of 7-12`);

const tmp = makeTmp(key);
let browser: Browser | null = null;
const fail = async (err: unknown): Promise<never> => {
  console.error(err instanceof Error ? err.message : err);
  await browser?.close().catch(() => {});
  rmSync(tmp, { recursive: true, force: true });
  process.exit(1);
};
process.on("unhandledRejection", fail);

try {
  // The art and the type name are the app's own, drawn for this birth off-camera.
  const { svg, typeName } = await elementMap(birth);
  // onScreen[0] must be the archetype's tagline verbatim — the first word of the
  // type name ("Dew · Order" → Dew) names the archetype.
  const archName = typeName.split(" ")[0];
  const arch = Object.values(SAJU_TYPE_CONTENT.en.archetypes).find((a) => a.name === archName);
  if (!arch || config.onScreen[0] !== arch.tagline) throw new Error(`onScreen[0]: not the <${archName}> tagline`);
  if (config.onScreen[1] !== undefined && config.onScreen[1] !== typeName) {
    throw new Error(`onScreen[1]: not the type name "${typeName}"`);
  }

  const esc = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const art = artLayerHtml(svg, { dim: 0.45 });
  const [tagline, name] = config.onScreen;
  const launched = await launch();
  browser = launched.browser;
  const { ctx, page } = launched;
  // Hook up top, the tagline low over the dimmed art (max-height keeps it inside
  // 62-78% so the clipping check below has something to catch), the type name
  // under it, the handle at the bottom. Only the tagline moves besides the art.
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_CSS}
${art.css}
  #rec-hook { position: fixed; left: 32px; right: 32px; top: 14%; z-index: 2; text-align: center;
    font: 700 18px/1.4 "PJS", system-ui, sans-serif; letter-spacing: .14em; color: ${COLORS.gold}; }
  #rec-main { position: fixed; left: 32px; right: 32px; top: 62%; z-index: 2; text-align: center; }
  #rec-tag { font: italic 500 40px/1.3 "NR", Georgia, serif; color: ${COLORS.headline};
    max-height: 3.9em; overflow: hidden; /* three lines */ animation: tagfade .6s ease-out .4s both; }
  #rec-name { margin-top: 14px; font: 500 20px/1.4 "PJS", system-ui, sans-serif; color: ${COLORS.subheadline}; }
  #rec-foot { position: fixed; left: 0; right: 0; top: 90%; z-index: 2; text-align: center;
    font: 700 16px/1 "PJS", system-ui, sans-serif; color: ${COLORS.footer}; }
  @keyframes tagfade { from { opacity: 0; } to { opacity: 1; } }
</style></head><body>
${art.html}
<div id="rec-hook">${esc(config.hook)}</div>
<div id="rec-main"><div id="rec-tag">${esc(tagline)}</div>${name !== undefined ? `<div id="rec-name">${esc(name)}</div>` : ""}</div>
<div id="rec-foot">@fatesaidapp</div>
</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  const clipped = await page.evaluate(() => {
    const el = document.getElementById("rec-tag")!;
    return el.scrollHeight > el.clientHeight;
  });
  if (clipped) throw new Error("tagline is clipped — shorten onScreen[0]");

  const rec = await recorder(ctx, page, tmp);
  await rec.start();
  await rec.at(seconds);
  const out = path.join(OUT_DIR, `${key}.mp4`);
  const videoDur = await rec.finish(out, silentAudio(tmp, seconds), 12.5);
  await ctx.close();
  await browser.close();
  rmSync(tmp, { recursive: true, force: true });
  console.log(`ok ${out} ${videoDur.toFixed(1)}s, type=${typeName}`);
} catch (err) {
  await fail(err);
}
