/**
 * F2 "type x relationship card" short-form renderer: one config file
 * (marketing/shortform/produce/<key>.json, format "F2") becomes an Instagram
 * carousel (1080x1350 PNGs), a TikTok photo post (1080x1920 PNGs) and a silent
 * slide video for YouTube Shorts (3s per card). Cards are plain HTML shot with
 * Playwright — no mobile-web needed. Every card sentence must match the app's
 * English copy for that pair verbatim: the relation's headline/body/goodPoint
 * (mobile/lib/compatibilityContent.ts) or either type's tagline
 * (mobile/lib/sajuTypeContent.ts); anything else exits 1 before rendering.
 *
 * Usage:
 *   node --import tsx scripts/shortform/render-f2.mts <key> [--check]
 * <key> is looked up in marketing/shortform/produce/ first, then in
 * marketing/video/.tmp-f2check/ (throwaway negative checks; the file name must
 * still equal the key). --check skips the browser: it only runs the
 * config/copy/relation checks and prints the card list. Output:
 * marketing/video/<key>/ig-01.png …, marketing/video/<key>/tt-01.png …,
 * marketing/video/<key>.mp4 (git-ignored).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { calculateCompatibility, type CompatRelation } from "../../lib/compatibility.ts";
import { classifySajuType } from "../../lib/sajuType.ts";
import { COMPATIBILITY_CONTENT } from "../../mobile/lib/compatibilityContent.ts";
import { SAJU_TYPE_CONTENT } from "../../mobile/lib/sajuTypeContent.ts";
import { COLORS, FONT_CSS, launch, makeTmp, OUT_DIR, ROOT, silentAudio } from "./common.mts";
import { checkConfig, loadConfigFile } from "./check-copy.mts";

type ArchKey = keyof typeof SAJU_TYPE_CONTENT.en.archetypes;

// Archetype -> day stem (lib/sajuType.ts order), verified against the engine below.
const ARCH_STEM: Record<ArchKey, string> = {
  oak: "갑", vine: "을", sun: "병", flame: "정", mountain: "무",
  field: "기", steel: "경", gem: "신", ocean: "임", dew: "계",
};
const EVEN = { wood: 1, fire: 1, earth: 1, metal: 1, water: 1 };
for (const [arch, stem] of Object.entries(ARCH_STEM) as [ArchKey, string][]) {
  if (classifySajuType(stem, EVEN)?.archetype !== arch) throw new Error(`stem table drift: ${stem} is not ${arch}`);
}

// Stem -> daymaster art file (public/art/daymaster-<roman>.webp).
const STEM_ROMAN: Record<string, string> = {
  "갑": "gap", "을": "eul", "병": "byeong", "정": "jeong", "무": "mu",
  "기": "gi", "경": "gyeong", "신": "sin", "임": "im", "계": "gye",
};

const fail = (msg: string): never => {
  console.error(msg);
  process.exit(1);
};

// --check is stripped before parsing (loadForFormat would reject it as unknown).
const checkOnly = process.argv.slice(2).includes("--check");
const [keyArg, ...rest] = process.argv.slice(2).filter((a) => a !== "--check");
if (!keyArg || rest.length > 0) fail("usage: render-f2.mts <key> [--check]");
const key = keyArg;

const configPath = [path.join(ROOT, "marketing/shortform/produce", `${key}.json`),
  path.join(ROOT, "marketing/video/.tmp-f2check", `${key}.json`)].find((p) => existsSync(p));
if (!configPath) fail(`${key}: no such config (marketing/shortform/produce/${key}.json)`);
let config;
try {
  config = loadConfigFile(configPath);
} catch (e) {
  fail(e instanceof Error ? e.message : String(e));
}
if (config.format !== "F2") fail(`${key}: format is ${config.format}, want F2`);
const violations = checkConfig(config);
if (violations.length > 0) {
  for (const v of violations) console.log(`  ${v.field}: ${v.rule} "${v.match}"`);
  process.exit(1);
}
// F2 is a silent card stack: no birth input, no voiceover, no AI voice label.
if (config.birth !== null) fail(`${key}: birth must be null for F2`);
if (config.script.length > 0) fail(`${key}: script must be [] for F2`);
if (config.aiVoice) fail(`${key}: aiVoice must be false for F2`);

// onScreen[0] names the pair ("Oak × Field"); A is self, B is the other.
const nameToArch = new Map<string, ArchKey>(
  (Object.entries(SAJU_TYPE_CONTENT.en.archetypes) as [ArchKey, { name: string }][]).map(([k, v]) => [v.name, k]));
const pairLine = config.onScreen[0] ?? "";
const pairParts = pairLine.split("×").map((s) => s.trim());
if (pairParts.length !== 2 || !nameToArch.has(pairParts[0]) || !nameToArch.has(pairParts[1])) {
  fail(`onScreen[0]: want "<A> × <B>" with English archetype names, got "${pairLine}"`);
}
const archA = nameToArch.get(pairParts[0]) as ArchKey;
const archB = nameToArch.get(pairParts[1]) as ArchKey;
const compat = calculateCompatibility(ARCH_STEM[archA], ARCH_STEM[archB]);
if (!compat) fail(`${key}: unknown stems for ${pairLine}`);
const relation: CompatRelation = compat.relation;

// Each card sentence must be this pair's relation copy or either type's tagline.
// caution/bondNote are never cards, and the % score is never shown.
const rel = COMPATIBILITY_CONTENT.en.relations[relation];
const tagA = SAJU_TYPE_CONTENT.en.archetypes[archA].tagline;
const tagB = SAJU_TYPE_CONTENT.en.archetypes[archB].tagline;
const sentences = config.onScreen.slice(1);
if (sentences.length < 2 || sentences.length > 6) {
  fail(`${key}: onScreen needs 2-6 card sentences, got ${sentences.length}`);
}
const allowed = new Set([rel.headline, rel.body, rel.goodPoint, tagA, tagB]);
sentences.forEach((s, j) => {
  if (!allowed.has(s)) fail(`onScreen[${j + 1}]: not app copy for ${pairLine} (${relation})`);
});

type Card =
  | { kind: "cover" }
  | { kind: "headline"; text: string }
  | { kind: "tagline"; text: string; arch: ArchKey }
  | { kind: "prose"; text: string }
  | { kind: "end" };
const cards: Card[] = [
  { kind: "cover" },
  ...sentences.map((text): Card =>
    text === rel.headline ? { kind: "headline", text }
    : text === tagA ? { kind: "tagline", text, arch: archA }
    : text === tagB ? { kind: "tagline", text, arch: archB }
    : { kind: "prose", text }),
  { kind: "end" },
];

if (checkOnly) {
  console.log(`${key}: ${relation}, ${cards.length} cards`);
  cards.forEach((c, i) => {
    const n = `card ${i + 1}`;
    if (c.kind === "cover") console.log(`${n} (cover): ${pairLine} / ${config.hook}`);
    else if (c.kind === "end") console.log(`${n} (end): Link in bio / Fatesaid`);
    else console.log(`${n} (${c.kind}): ${c.text}`);
  });
  process.exit(0);
}

const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
const artFor = (arch: ArchKey): string => {
  const file = path.join(ROOT, "public/art", `daymaster-${STEM_ROMAN[ARCH_STEM[arch]]}.webp`);
  return `data:image/webp;base64,${readFileSync(file).toString("base64")}`;
};
const artA = artFor(archA);
const artB = artFor(archB);

// Same card HTML at both heights (540 CSS px wide, vertically centered); only the
// viewport height changes. .body carries everything so the overflow check below
// sees clipped text as scrollHeight > clientHeight.
const css = `${FONT_CSS}
  html, body { margin: 0; padding: 0; }
  .card { width: 100vw; height: 100vh; box-sizing: border-box; display: flex; padding: 0 44px; background: ${COLORS.background}; }
  .card.end { background: ${COLORS.ctaText}; }
  .body { margin: auto; max-height: 100%; overflow: hidden; width: 100%; text-align: center; }
  .pair { display: flex; gap: 20px; justify-content: center; margin-bottom: 36px; }
  .pair img { width: 190px; height: 190px; object-fit: cover; border-radius: 24px; border: 1px solid ${COLORS.border}; }
  .pairname { font: 500 46px/1.2 "NR", Georgia, serif; color: ${COLORS.headline}; margin-bottom: 20px; }
  .hook { font: 500 28px/1.4 "PJS", system-ui, sans-serif; color: ${COLORS.footer}; overflow-wrap: break-word; }
  .ctx { font: 700 17px/1.3 "PJS", system-ui, sans-serif; letter-spacing: .1em; color: ${COLORS.gold}; margin-bottom: 28px; }
  .headline { font: 500 44px/1.3 "NR", Georgia, serif; color: ${COLORS.headline}; overflow-wrap: break-word; }
  .prose { font: 500 30px/1.5 "PJS", system-ui, sans-serif; color: ${COLORS.headline}; overflow-wrap: break-word; }
  .tagimg { width: 150px; height: 150px; object-fit: cover; border-radius: 20px; border: 1px solid ${COLORS.border}; margin-bottom: 28px; }
  .endbig { font: 700 46px/1.2 "PJS", system-ui, sans-serif; color: ${COLORS.headline}; }
  .endsmall { font: 700 20px/1.3 "PJS", system-ui, sans-serif; letter-spacing: .08em; color: ${COLORS.gold}; margin-top: 14px; }`;
const cardHtml = (card: Card): string => {
  const inner =
    card.kind === "cover"
      ? `<div class="pair"><img src="${artA}" alt=""><img src="${artB}" alt=""></div><div class="pairname">${esc(pairLine)}</div><div class="hook">${esc(config.hook)}</div>`
    : card.kind === "end"
      ? `<div class="endbig">Link in bio</div><div class="endsmall">Fatesaid</div>`
    : card.kind === "headline"
      ? `<div class="ctx">${esc(pairLine)}</div><div class="headline">${esc(card.text)}</div>`
    : card.kind === "tagline"
      ? `<div class="ctx">${esc(pairLine)}</div><img class="tagimg" src="${card.arch === archA ? artA : artB}" alt=""><div class="prose">${esc(card.text)}</div>`
    : `<div class="ctx">${esc(pairLine)}</div><div class="prose">${esc(card.text)}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="card${card.kind === "end" ? " end" : ""}"><div class="body">${inner}</div></div></body></html>`;
};

// PNG dimensions straight from the IHDR chunk (no ffprobe needed per shot).
const pngSize = (file: string): [number, number] => {
  const b = readFileSync(file);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
};

const tmp = makeTmp(key);
const failRender = async (browser: { close(): Promise<unknown> } | null, err: unknown): Promise<never> => {
  console.error(err instanceof Error ? err.message : err);
  await browser?.close().catch(() => {});
  rmSync(tmp, { recursive: true, force: true });
  process.exit(1);
};
process.on("unhandledRejection", (e) => void failRender(null, e));

try {
  const outSub = path.join(OUT_DIR, key);
  mkdirSync(outSub, { recursive: true });
  const { browser, page } = await launch();
  try {
    // 540 CSS px @2x both times: 540x960 for TikTok, 540x675 for Instagram.
    const sizes = [
      { prefix: "tt", width: 540, height: 960, want: [1080, 1920] as [number, number] },
      { prefix: "ig", width: 540, height: 675, want: [1080, 1350] as [number, number] },
    ];
    for (const { prefix, width, height, want } of sizes) {
      await page.setViewportSize({ width, height });
      for (let i = 0; i < cards.length; i++) {
        await page.setContent(cardHtml(cards[i]), { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready.then(() => {}));
        const clipped = await page.evaluate(() => {
          const el = document.querySelector(".body") as HTMLElement;
          return el.scrollHeight > el.clientHeight + 1; // 1px: subpixel rounding on the auto-height box
        });
        if (clipped) throw new Error(`${prefix}-${String(i + 1).padStart(2, "0")}: text clipped, shorten the copy`);
        const shot = path.join(outSub, `${prefix}-${String(i + 1).padStart(2, "0")}.png`);
        await page.screenshot({ path: shot });
        const [w, h] = pngSize(shot);
        if (w !== want[0] || h !== want[1]) throw new Error(`${shot}: ${w}x${h}, want ${want[0]}x${want[1]}`);
      }
    }
    await browser.close();
  } catch (e) {
    await failRender(browser, e);
  }

  // Slideshow: the TikTok PNGs at 3s each, silent track, same encode as F1.
  const seconds = cards.length * 3;
  if (seconds > 35) fail(`${key}: video ${seconds}s over 35s — fewer cards`);
  const ttFiles = cards.map((_, i) => path.join(outSub, `tt-${String(i + 1).padStart(2, "0")}.png`));
  const list = ttFiles.map((f) => `file '${f}'\nduration 3`).join("\n") + `\nfile '${ttFiles[ttFiles.length - 1]}'\n`;
  const listFile = path.join(tmp, "list.txt");
  writeFileSync(listFile, list);
  const audio = silentAudio(tmp, seconds);
  const out = path.join(OUT_DIR, `${key}.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-i", audio.audio,
    "-map", "0:v", "-map", "1:a", "-vf", "fps=30,scale=1080:1920:flags=lanczos,format=yuv420p",
    "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-af", audio.af, "-c:a", "aac", "-b:a", "160k",
    "-t", String(seconds), out], { stdio: "inherit" }); // -t: the trailing concat entry would otherwise add a still
  rmSync(tmp, { recursive: true, force: true });
  console.log(`ok ${key} ${relation} ${cards.length} cards, ig+tt png, ${seconds}s`);
} catch (err) {
  await failRender(null, err);
}
