/**
 * F1 "find your saju type" short-form renderer: drives a fresh onboarding on the
 * mobile-web build (Expo web, :8082) — birth date, birth time, a worldwide city search —
 * through to the type reveal, with the config's hook as a top overlay, the voiceover
 * script as timed captions, and a closing "Link in bio" card. Recording, voice, the
 * prod-data guard and the celebrity mask come from common.mts (shared with F2-F6); the
 * config schema and the copy rules from check-copy.mts. All on-screen wording comes from the config file.
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
import { type Browser } from "playwright";
import { rmSync } from "node:fs";
import path from "node:path";
import {
  COLORS, CTA_CSS, FONT_CSS, OUT_DIR, addCta, baseUrl, celebrityAboveMask, guardProd, launch, loadForFormat, makeTmp,
  maskCelebrities, recorder, sentenceStarts, showCta, voiceAudio,
} from "./common.mts";

const { key, noTts, config } = loadForFormat("F1", "render-f1.mts");
if (!config.birth) throw new Error(`${key}: birth is required for F1`);
const birth = config.birth;
const sentences = config.script;
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
  const audio = await voiceAudio(key, sentences, noTts, tmp);
  const duration = audio.duration;
  const starts = sentenceStarts(sentences, duration);
  // The reveal click is timed so the ceremony has settled near the third sentence.
  const revealIdx = Math.min(2, sentences.length - 1);
  const lastStart = starts[starts.length - 1];
  if (duration + 0.6 > 35) throw new Error(`audio ${duration.toFixed(1)}s already over 35s — shorten the script`);

  const launched = await launch();
  browser = launched.browser;
  const { ctx, page } = launched;
  await guardProd(page);

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
  await page.goto(`${baseUrl()}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "English" }).click();
  await page.getByRole("button", { name: "Get started" }).click();
  await page.getByLabel("What should we call you?", { exact: true }).fill("Alex");
  await next();
  await page.getByRole("radio", { name: "Male", exact: true }).click();
  await next();
  await page.getByLabel("Birth month", { exact: true }).waitFor();

  await page.addStyleTag({
    content: `${FONT_CSS}${CTA_CSS}
  #rec-hook { position: fixed; left: 24px; right: 24px; top: 26%; z-index: 99999; text-align: center;
    font: 700 40px/1.25 "PJS", system-ui, sans-serif; color: ${COLORS.headline}; background: rgba(15,26,21,.85);
    border-radius: 16px; padding: 14px 18px; pointer-events: none; }
  #rec-cap { position: fixed; left: 24px; right: 24px; top: 70%; z-index: 99999; text-align: center;
    font: 700 26px/1.3 "PJS", system-ui, sans-serif; color: #F3EBD6; background: rgba(15,26,21,.88);
    border-radius: 14px; padding: 12px 16px; pointer-events: none; }`,
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
  }, [config.hook, sentences[0]] as [string, string]);
  await addCta(page);

  const rec = await recorder(ctx, page, tmp);
  await rec.start();
  const overlayFor = (idx: number): string =>
    idx === 0 || config.onScreen.length === 0 ? config.hook : config.onScreen[Math.min(idx - 1, config.onScreen.length - 1)];

  // Captions follow the narration on their own timer (video time), whatever the page is doing.
  let capIdx = -1;
  const capTimer = setInterval(() => {
    const t = rec.elapsed();
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
  // video clock stops for them, so the reveal follows the city pick directly.
  // If the inputs ran ahead of the narration, the city screen holds until shortly
  // before the third sentence instead.
  await rec.at(Math.max(0, starts[revealIdx] - 0.6));
  rec.cut();
  await next();
  const concernOpt = page.getByRole("radio", { name: /^Relationships/ });
  await concernOpt.waitFor({ timeout: 30000 });
  await concernOpt.click();
  await next();
  // The type card carries the reveal on its own; the top overlay would sit on its name.
  await page.evaluate(() => { document.getElementById("rec-hook")!.style.display = "none"; });
  await rec.resume();
  try {
    await page.getByText("Here's your saju type").waitFor({ timeout: 10000 });
  } catch {
    throw new Error("type reveal never appeared (no sajuType in the calc response?)");
  }
  // Below the card the screen lists famous people who share the type (it fades in on a
  // stagger, inside the first viewport), and short-form videos must not show celebrity
  // names (SPEC rules): mask from that label down, and put the caption onto the mask so
  // it doesn't sit on the card copy.
  const maskTop = await maskCelebrities(page);
  await page.evaluate((top: number) => {
    document.getElementById("rec-cap")!.style.top = `${Math.min(top + 18, window.innerHeight - 110)}px`;
  }, maskTop);

  // The reveal ceremony (RevealCard, ~1.1s) settles into the type card; read the name
  // off the card itself (35px display line — nothing else on the screen sets that size).
  const revealAt = rec.elapsed();
  await rec.at(Math.max(starts[revealIdx] + 0.8, revealAt + 1.4));
  const typeName = (await page.evaluate(() => {
    const el = [...document.querySelectorAll("div")]
      .find((e) => getComputedStyle(e).fontSize === "35px" && (e.textContent ?? "").trim().length > 0);
    return (el?.textContent ?? "").trim() || null;
  })) ?? "?";
  // No scroll (it would bring the celebrity cards up past the mask). Re-check once the
  // stagger has played: no copy of the label (section + share-image preview) above the mask.
  const shot = path.join(OUT_DIR, `.reveal-${key}.png`);
  if (await celebrityAboveMask(page, maskTop, shot)) {
    throw new Error(`celebrity section is on screen at the reveal — layout changed, fix the framing (see ${shot})`);
  }

  // Last sentence: full-screen card for the final ~1.5s over the spoken CTA. The settled
  // type card stays up at least 2.5s first (it is the payoff), even if that runs past the voice.
  await rec.at(lastStart);
  const ctaAt = Math.max(lastStart + 0.5, duration + 0.6 - 1.75, revealAt + 1.1 + 2.5, rec.elapsed());
  await rec.at(ctaAt);
  await showCta(page);
  await rec.at(Math.max(duration + 0.6, ctaAt + 1.5));
  clearInterval(capTimer);
  const out = path.join(OUT_DIR, `${key}.mp4`);
  const videoDur = await rec.finish(out, audio, 35);
  await browser.close();
  browser = null;
  rmSync(tmp, { recursive: true, force: true });
  console.log(`ok ${out} ${videoDur.toFixed(1)}s, ${sentences.length} captions, city=${birth.city}, type=${typeName}`);
} catch (err) {
  await fail(err);
}
