/**
 * F3 "date card" short-form renderer: a still page built with page.setContent —
 * the config's hook as a big display line, then its 3-4 onScreen sentences as
 * text cards one at a time over the slowly spinning ElementMap art, with the
 * voiceover optional (aiVoice) and a closing "Link in bio" card. No separate
 * subtitles: the card copy doubles as the caption track. The art comes from
 * mobile-web's ElementMap (common.mts elementMap captures the app's own SVG
 * off-camera for the config's birth), shared with F6 through art-layer.mts.
 * All on-screen wording comes from the config file, except @fatesaidapp.
 *
 * Usage (mobile-web running the first time, for the art capture cache:
 * `cd mobile && npx expo start --web --port 8082`):
 *   node --import tsx scripts/shortform/render-f3.mts <key> [--no-tts]
 * <key> is marketing/shortform/produce/<key>.json (format "F3"). Output:
 * marketing/video/<key>.mp4 (git-ignored). --no-tts skips OpenAI (silent track,
 * sentence lengths from character counts) — use it for every check run. The
 * real voice needs OPENAI_API_KEY in the environment (e.g. node
 * --env-file=.env.local --import tsx ...) and is cached under
 * marketing/video/.tts/ so a re-render costs nothing. This is the web
 * rendering of the RN app's drawing, not the native build. Localhost only.
 * elementMap strips sessionId/nickname and blocks /api/events, so no prod data
 * or analytics is written.
 */
import type { Browser } from "playwright";
import { rmSync } from "node:fs";
import path from "node:path";
import { SOLAR_TERM_NAMES } from "../../mobile/lib/elementColorContent.ts";
import { artLayerHtml } from "./art-layer.mts";
import {
  addCta, COLORS, CTA_CSS, elementMap, FONT_CSS, launch, loadForFormat, makeTmp,
  OUT_DIR, recorder, sentenceStarts, showCta, silentAudio, voiceAudio,
} from "./common.mts";
import { DATES_FROM_ISO, DATES_TO_ISO, solarTermDates } from "./solar-term-dates.mts";

const { key, noTts, config } = loadForFormat("F3", "render-f3.mts");
if (!config.birth) throw new Error(`${key}: birth is required for F3`);
const birth = config.birth;
const cards = config.onScreen;
if (cards.length < 3 || cards.length > 4) throw new Error(`${key}: onScreen wants 3-4 cards for F3`);
if (config.aiVoice) {
  if (config.script.length !== cards.length + 1) {
    throw new Error(`${key}: script wants ${cards.length + 1} sentences for ${cards.length} cards (one for the hook, one per card)`);
  }
} else if (config.script.length !== 0) {
  throw new Error(`${key}: script must be empty when aiVoice is false`);
}

// A card that names a solar term next to a "Mon D" date must carry the term's
// real date — the KST or the US Eastern reading, each honest for its audience.
const MON_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monNum = (abbr: string): number => MON_ABBR.findIndex((m) => m.toLowerCase() === abbr.toLowerCase()) + 1;
const monDay = (isoDate: string): string => `${MON_ABBR[Number(isoDate.slice(5, 7)) - 1]} ${Number(isoDate.slice(8, 10))}`;
const DATE_RE = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.? (\d{1,2})\b/gi;
const termRows = solarTermDates(DATES_FROM_ISO, DATES_TO_ISO);
for (const [i, card] of cards.entries()) {
  const dates = [...card.matchAll(DATE_RE)].map((m) => ({ m: monNum(m[1]), d: Number(m[2]), text: `${MON_ABBR[monNum(m[1]) - 1]} ${Number(m[2])}` }));
  const lower = card.toLowerCase();
  for (const [termKey, en] of Object.entries(SOLAR_TERM_NAMES.en)) {
    if (!lower.includes(en.toLowerCase()) || dates.length === 0) continue;
    const row = termRows.find((r) => r.key === termKey);
    if (!row) continue; // outside the Nov–Feb table; nothing to check against
    const [km, kd] = row.kstDate.slice(5).split("-").map(Number);
    const [em, ed] = row.etDate.slice(5).split("-").map(Number);
    for (const w of dates) {
      const ok = (w.m === km && w.d === kd) || (w.m === em && w.d === ed);
      if (!ok) throw new Error(`onScreen[${i}]: ${en} is ${monDay(row.kstDate)}/${monDay(row.etDate)}, not ${w.text}`);
    }
  }
  // The Wrapped card carries the fixed Dec 1 release date.
  if (/wrapped/i.test(card)) {
    for (const w of dates) {
      if (w.m !== 12 || w.d !== 1) throw new Error(`onScreen[${i}]: Wrapped is Dec 1, not ${w.text}`);
    }
  }
}

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
  const { svg } = await elementMap(birth);
  const art = artLayerHtml(svg, { dim: 0.45 });
  // Voice: sentence 0 under the hook, sentence i+1 under card i, the CTA inside
  // the last sentence. Silent: hook 3s, each card 3s, then the 1.5s CTA.
  const sentences = config.script;
  const audio = config.aiVoice ? await voiceAudio(key, sentences, noTts, tmp) : silentAudio(tmp, 3 * (cards.length + 1) + 1.5);
  if (config.aiVoice && audio.duration + 0.6 > 35) throw new Error(`audio ${audio.duration.toFixed(1)}s already over 35s — shorten the script`);
  const starts = config.aiVoice ? sentenceStarts(sentences, audio.duration) : [];
  const cardAt = (i: number): number => (config.aiVoice ? starts[i + 1] : 3 * (i + 1));
  const ctaAt = config.aiVoice ? Math.max(starts[starts.length - 1], audio.duration + 0.6 - 1.5) : 3 * (cards.length + 1);
  const endAt = ctaAt + 1.5;

  const esc = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const launched = await launch();
  browser = launched.browser;
  const { ctx, page } = launched;
  // Hook first, centered; then one card at a time in the same spot (opacity
  // cross-fade, .25s). No date label over the cards — the copy carries the date.
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_CSS}
${art.css}
${CTA_CSS}
  #rec-hook { position: fixed; left: 32px; right: 32px; top: 50%; z-index: 2; text-align: center;
    transform: translateY(-50%); font: 500 38px/1.3 "NR", Georgia, serif; color: ${COLORS.headline};
    background: rgba(18,32,25,.85); border: 1px solid ${COLORS.border}; border-radius: 18px; padding: 22px 24px;
    transition: opacity .25s; }
  #rec-hook.off { opacity: 0; }
  .rec-card { position: fixed; left: 40px; right: 40px; top: 50%; z-index: 2; text-align: center;
    transform: translateY(-50%); font: 500 27px/1.45 "PJS", system-ui, sans-serif; color: ${COLORS.headline};
    background: rgba(18,32,25,.85); border: 1px solid ${COLORS.border}; border-radius: 18px;
    padding: 22px 24px; max-height: 480px; overflow: hidden; opacity: 0; transition: opacity .25s; }
  .rec-card.on { opacity: 1; }
  #rec-foot { position: fixed; left: 0; right: 0; top: 90%; z-index: 2; text-align: center;
    font: 700 16px/1 "PJS", system-ui, sans-serif; color: ${COLORS.footer}; }
</style></head><body>
${art.html}
<div id="rec-hook">${esc(config.hook)}</div>
${cards.map((c) => `<div class="rec-card">${esc(c)}</div>`).join("\n")}
<div id="rec-foot">@fatesaidapp</div>
</body></html>`);
  await addCta(page);
  await page.evaluate(() => document.fonts.ready);
  const clipped = await page.evaluate(() => {
    const els = [...document.querySelectorAll(".rec-card")];
    return els.findIndex((el) => el.scrollHeight > el.clientHeight);
  });
  if (clipped >= 0) throw new Error(`onScreen[${clipped}] is clipped — shorten the card`);

  const rec = await recorder(ctx, page, tmp);
  await rec.start();
  for (let i = 0; i < cards.length; i++) {
    await rec.at(cardAt(i));
    await page.evaluate((idx: number) => {
      document.getElementById("rec-hook")!.classList.add("off");
      document.querySelectorAll(".rec-card").forEach((el, j) => el.classList.toggle("on", j === idx));
    }, i);
  }
  await rec.at(ctaAt);
  await showCta(page);
  await rec.at(endAt);
  const out = path.join(OUT_DIR, `${key}.mp4`);
  const videoDur = await rec.finish(out, audio, 35);
  await ctx.close();
  await browser.close();
  rmSync(tmp, { recursive: true, force: true });
  console.log(`ok ${out} ${videoDur.toFixed(1)}s, ${cards.length} cards, voice=${config.aiVoice && !noTts ? "yes" : "no"}`);
} catch (err) {
  await fail(err);
}
