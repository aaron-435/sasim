// art-inbox/<키>.(png|jpg|jpeg|webp) → 규격 맞춤 → WebP(품질 80) → blurhash → manifest.ts 갱신.
// 작은 묶음(오행·12지·빈 화면·질감)은 mobile/assets/art/, 큰 묶음(일간·모듈 표지·절기)은 public/art/.
// 실행: npm run art:process

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { encode } from "blurhash";

const ROOT = path.resolve(import.meta.dirname, "..");
const INBOX = path.join(ROOT, "art-inbox");
const BUNDLE_DIR = path.join(ROOT, "mobile/assets/art");
const SERVER_DIR = path.join(ROOT, "public/art");
const MANIFEST = path.join(ROOT, "mobile/data/art/manifest.ts");
const SERVER_BASE = "https://www.fatesaidapp.com/art";
const BUNDLE_LIMIT = 3 * 1024 * 1024;
const EXTS = [".png", ".jpg", ".jpeg", ".webp"];

type Group = { where: "bundle" | "server"; width: number; height: number };

// IMAGE_PROMPTS_2026-10-14.md "규격" 절 기준. 앱 화면에서 쓰는 크기에 맞춰 번들은 작게 줄인다.
function groupOf(key: string): Group | null {
  if (key.startsWith("daymaster-")) return { where: "server", width: 1024, height: 1024 };
  if (key.startsWith("element-")) return { where: "bundle", width: 512, height: 512 };
  if (key.startsWith("zodiac-")) return { where: "bundle", width: 512, height: 512 };
  if (/^module\d+-/.test(key)) return { where: "server", width: 1024, height: 1280 };
  if (key.startsWith("term-")) return { where: "server", width: 1536, height: 1024 };
  if (/^(empty|error|loading)-/.test(key)) return { where: "bundle", width: 512, height: 512 };
  if (key.startsWith("texture-")) return { where: "bundle", width: 1024, height: 1024 };
  return null;
}

function readKeys(src: string): string[] {
  const block = src.match(/export const ART_KEYS = \[([\s\S]*?)\] as const;/);
  if (!block) throw new Error("manifest.ts에서 ART_KEYS를 찾지 못했다");
  return [...block[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
}

type Entry = { source: string; width: number; height: number; blurhash?: string };

function readEntries(src: string): Map<string, Entry> {
  const out = new Map<string, Entry>();
  const block = src.match(/\/\/ ENTRIES-START([\s\S]*?)\/\/ ENTRIES-END/);
  if (!block) throw new Error("manifest.ts에서 ENTRIES 블록을 찾지 못했다");
  const re = /^\s*"([a-z0-9-]+)": \{ source: (.+?), width: (\d+), height: (\d+)(?:, blurhash: "([^"]+)")? \},$/gm;
  for (const m of block[1].matchAll(re)) {
    out.set(m[1], { source: m[2], width: +m[3], height: +m[4], blurhash: m[5] });
  }
  return out;
}

function writeManifest(src: string, keys: string[], entries: Map<string, Entry>) {
  const lines = keys
    .filter((k) => entries.has(k))
    .map((k) => {
      const e = entries.get(k)!;
      const hash = e.blurhash ? `, blurhash: "${e.blurhash}"` : "";
      return `  "${k}": { source: ${e.source}, width: ${e.width}, height: ${e.height}${hash} },`;
    });
  const body = lines.length
    ? `export const ART_MANIFEST: Partial<Record<ArtKey, ArtEntry>> = {\n${lines.join("\n")}\n};`
    : `export const ART_MANIFEST: Partial<Record<ArtKey, ArtEntry>> = {};`;
  const next = src.replace(
    /\/\/ ENTRIES-START[\s\S]*?\/\/ ENTRIES-END/,
    `// ENTRIES-START\n${body}\n// ENTRIES-END`,
  );
  fs.writeFileSync(MANIFEST, next);
}

async function blurhashOf(file: string): Promise<string> {
  const { data, info } = await sharp(file)
    .resize(32, 32, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
}

async function main() {
  const manifestSrc = fs.readFileSync(MANIFEST, "utf8");
  const keys = readKeys(manifestSrc);
  const entries = readEntries(manifestSrc);

  if (!fs.existsSync(INBOX)) {
    console.log("art-inbox/ 폴더가 없다. 만들고 그림을 넣은 뒤 다시 실행한다.");
    return;
  }

  const files = fs.readdirSync(INBOX).filter((f) => EXTS.includes(path.extname(f).toLowerCase()));
  let done = 0;
  let warnings = 0;

  for (const file of files) {
    const key = path.basename(file, path.extname(file));
    const group = keys.includes(key) ? groupOf(key) : null;
    if (!group) {
      console.warn(`경고: 모르는 파일 이름이라 건너뜀 → ${file}`);
      warnings++;
      continue;
    }
    const dir = group.where === "bundle" ? BUNDLE_DIR : SERVER_DIR;
    fs.mkdirSync(dir, { recursive: true });
    const outFile = path.join(dir, `${key}.webp`);

    // 투명 배경 유지, 비율은 자르지 않고 안에 맞춘다(규격 비율이면 딱 맞음).
    await sharp(path.join(INBOX, file))
      .resize(group.width, group.height, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(outFile);

    const meta = await sharp(outFile).metadata();
    const source =
      group.where === "bundle"
        ? `require("../../assets/art/${key}.webp")`
        : `{ uri: "${SERVER_BASE}/${key}.webp" }`;
    entries.set(key, {
      source,
      width: meta.width ?? group.width,
      height: meta.height ?? group.height,
      blurhash: await blurhashOf(outFile),
    });
    console.log(`${key}: ${group.where === "bundle" ? "mobile/assets/art" : "public/art"} (${meta.width}×${meta.height})`);
    done++;
  }

  writeManifest(manifestSrc, keys, entries);

  if (fs.existsSync(BUNDLE_DIR)) {
    const total = fs
      .readdirSync(BUNDLE_DIR)
      .filter((f) => f.endsWith(".webp"))
      .reduce((sum, f) => sum + fs.statSync(path.join(BUNDLE_DIR, f)).size, 0);
    console.log(`번들 그림 합계: ${(total / 1024 / 1024).toFixed(2)}MB`);
    if (total > BUNDLE_LIMIT) {
      console.warn("경고: 번들 그림 합계가 3MB를 넘었다. 작은 묶음의 크기·품질을 줄인다.");
      warnings++;
    }
  }
  console.log(`처리 ${done}장, 경고 ${warnings}건`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
