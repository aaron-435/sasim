// Offline: npx tsx scripts/quiz-type-names.test.mts
// Every 2+ dimension combo, in every key order, must resolve to a module's defined
// title — never the generic "<dim>+<dim> Combined Type" fallback. Covers the app
// (mobile/lib/quiz, all locales), the web quiz (lib/), and reopening a report that was
// saved with the old fallback title.
import assert from "node:assert/strict";
import { ALL_MODULES, repairSavedTypeInfo } from "../mobile/lib/quiz/modules.ts";
import { resolveTypeName, type ProfileClassification } from "../mobile/lib/quiz/quizProfile.ts";
import { MODULES as WEB_MODULES } from "../lib/modules.ts";
import { resolveTypeName as webResolveTypeName } from "../lib/quizProfile.ts";

type Names = Record<string, { title: string; hook: string }>;
const FALLBACK = { title: "__fallback__", hook: "" };

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items];
  return items.flatMap((x, i) => permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((p) => [x, ...p]));
}

function subsets<T>(items: T[], min: number): T[][] {
  const out: T[][] = [];
  for (let mask = 1; mask < 1 << items.length; mask++) {
    const s = items.filter((_, i) => mask & (1 << i));
    if (s.length >= min) out.push(s);
  }
  return out;
}

const combined = (dims: string[]): ProfileClassification => ({ activeDimensions: dims, kind: "combined", typeKey: dims.join("+") });

let checks = 0;
const misses: string[] = [];

function checkAll(label: string, dims: string[], names: Names, resolve: typeof resolveTypeName) {
  for (const set of subsets(dims, 2)) {
    for (const order of permutations(set)) {
      const got = resolve(combined(order), names, () => FALLBACK);
      checks++;
      if (got === FALLBACK) misses.push(`${label} ${order.join("+")}`);
    }
  }
}

for (const m of ALL_MODULES) {
  const dims = Object.keys(m.dimensionItemCounts);
  for (const [locale, names] of Object.entries(m.typeNames)) checkAll(`app ${m.id} ${locale}`, dims, names, resolveTypeName);
}
for (const m of WEB_MODULES) {
  checkAll(`web ${m.id}`, Object.keys(m.dimensionItemCounts), m.typeNames, webResolveTypeName);
}

// Single and baseline keep their exact-key behavior.
const m2 = ALL_MODULES.find((m) => m.id === "module2")!;
assert.equal(resolveTypeName({ activeDimensions: ["scarcity"], kind: "single", typeKey: "scarcity" }, m2.typeNames.en, () => FALLBACK).title, "Scarcity-Fear Type");
assert.equal(resolveTypeName({ activeDimensions: [], kind: "baseline", typeKey: "baseline" }, m2.typeNames.en, () => FALLBACK).title, "Balanced");
checks += 2;

// A report saved with the old fallback title (score order "avoidance+scarcity") reopens
// with the defined name, in the locale it was written in.
const stale = combined(["avoidance", "scarcity"]);
for (const [locale, suffix] of [["en", "Combined Type"], ["ko", "복합형"], ["es", "· tipo combinado"]] as const) {
  const short = m2.dimensionShortNames[locale];
  const staleTitle = `${short.avoidance}+${short.scarcity} ${suffix}`;
  const repaired = repairSavedTypeInfo("module2", stale, { title: staleTitle, hook: "x" });
  assert.equal(repaired?.title, m2.typeNames[locale]["scarcity+avoidance"].title, `repair ${locale}`);
  checks++;
}
// Already-correct titles and non-combined results are left alone.
const good = m2.typeNames.en["scarcity+avoidance"];
assert.equal(repairSavedTypeInfo("module2", stale, good), good);
const single = { title: "Scarcity-Fear Type", hook: "x" };
assert.equal(repairSavedTypeInfo("module2", { activeDimensions: ["scarcity"], kind: "single", typeKey: "scarcity" }, single), single);
assert.equal(repairSavedTypeInfo("nope", stale, single), single);
checks += 3;

if (misses.length) {
  console.error(`fallback titles: ${misses.length}\n` + misses.slice(0, 40).join("\n"));
  process.exit(1);
}
console.log(`quiz type name tests: ${checks} passed, fallback titles: 0 (offline)`);
