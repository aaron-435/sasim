// Length/forbidden-phrase check for lib/seoArticles (SPEC C1). Usage: npx tsx scripts/check-seo-articles.mts
import { readdirSync } from "node:fs";

const RANGE = { en: [600, 900, "words"], es: [600, 950, "words"], ko: [1500, 2200, "chars"] } as const;
const FORBIDDEN = /반드시 망|불길|재앙|사고|죽|파산|will lose|disaster|doom|scientifically proven|과학적으로 증명|garantiz|desastre|ruina/i;

let bad = 0;
for (const file of readdirSync("lib/seoArticles").filter((f) => !["index.ts", "types.ts"].includes(f))) {
  const set = (await import(`../lib/seoArticles/${file}`)).default;
  for (const l of ["en", "ko", "es"] as const) {
    const a = set[l];
    const text = [a.lead, ...a.sections.flatMap((s: any) => [s.heading, ...s.body]), a.tryThis].join(" ");
    const [min, max, unit] = RANGE[l];
    const n = unit === "words" ? text.split(/\s+/).length : text.length;
    const hit = text.match(FORBIDDEN)?.[0];
    const ok = n >= min && n <= max && !hit && a.metaTitle.length <= 70 && a.description.length <= 170;
    if (!ok) bad++;
    console.log(`${ok ? "ok " : "BAD"} ${file} ${l} ${n} ${unit} title=${a.metaTitle.length} desc=${a.description.length}${hit ? " forbidden=" + hit : ""}`);
  }
}
process.exit(bad ? 1 : 0);
