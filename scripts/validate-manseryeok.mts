/**
 * scripts/validate-manseryeok.mts
 * ------------------------------------------------------------------
 * Regression check for the self-hosted saju engine (lib/manseryeok.ts).
 * Diffs its output against lib/__fixtures__/sazu-golden-samples.json —
 * a snapshot of SAZU's real API responses for its 5 documented Free-tier
 * sandbox profiles (strong-male/weak-female/unknown-hour/balanced/
 * rich-sinsal), captured 2026-09-01 before switching the app over to
 * the self-hosted engine.
 *
 * Run whenever lib/manseryeok.ts, lib/solarTerms.ts, or lib/kasi.ts
 * change:
 *
 *   npx tsx scripts/validate-manseryeok.mts
 *
 * Needs KASI_API_KEY in .env.local (loaded automatically below).
 * Exits non-zero if any profile's pillars or elements drift from the
 * golden values.
 * ------------------------------------------------------------------
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { calculateManseryeok } from "../lib/manseryeok";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const envPath = path.join(root, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

interface GoldenSample {
  input: { birthYear: number; birthMonth: number; birthDay: number; birthHour: number | null; isFemale: boolean };
  expected: {
    fourPillars: { year: string; month: string; day: string; hour: string | null };
    elements: Record<"wood" | "fire" | "earth" | "metal" | "water", number>;
    decadeFortuneDirection: "순행" | "역행";
  };
}

const fixturesPath = path.join(root, "lib", "__fixtures__", "sazu-golden-samples.json");
const golden: Record<string, GoldenSample> = JSON.parse(fs.readFileSync(fixturesPath, "utf-8"));

let failures = 0;

for (const [name, sample] of Object.entries(golden)) {
  const result = await calculateManseryeok(sample.input);
  const checks: [string, string | number, string | number][] = [
    ["year", result.fourPillars.year.full, sample.expected.fourPillars.year],
    ["month", result.fourPillars.month.full, sample.expected.fourPillars.month],
    ["day", result.fourPillars.day.full, sample.expected.fourPillars.day],
    ["hour", result.fourPillars.hour?.full ?? "(null)", sample.expected.fourPillars.hour ?? "(null)"],
    ["decadeFortune.direction", result.decadeFortune.direction, sample.expected.decadeFortuneDirection],
  ];
  for (const key of ["wood", "fire", "earth", "metal", "water"] as const) {
    checks.push([`elements.${key}`, result.elements[key].total.percentage, sample.expected.elements[key]]);
  }

  let sampleFailed = false;
  for (const [label, actual, expected] of checks) {
    const mismatch =
      typeof actual === "number" && typeof expected === "number"
        ? Math.abs(actual - expected) > 0.5
        : actual !== expected;
    if (mismatch) {
      sampleFailed = true;
      failures++;
      console.error(`FAIL [${name}] ${label}: got ${actual}, expected ${expected}`);
    }
  }
  console.log(`${sampleFailed ? "FAIL" : "PASS"} ${name}`);
}

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
} else {
  console.log("\nAll golden samples match.");
}
