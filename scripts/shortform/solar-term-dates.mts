/**
 * F3 date table: pulls the Nov 2026 – Feb 2027 solar-term crossings out of the
 * engine (lib/solarTerms.ts) and writes them as marketing/shortform/dates.md —
 * KST, UTC and US Eastern readings plus the two fixed dates (Year Wrapped, New
 * Year). render-f3.mts imports solarTermDates() from here to check the dates its
 * cards print. Engine output: never edit the .md by hand, re-run this instead.
 *
 * Usage:
 *   npx tsx scripts/shortform/solar-term-dates.mts
 * Rewrites marketing/shortform/dates.md and prints the table to the console.
 * Exit 1 when the lidong/dongzhi cross-check disagrees with the table.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { findSolarLongitudeCrossing, upcomingSolarTerms } from "../../lib/solarTerms.ts";
import { SOLAR_TERM_NAMES } from "../../mobile/lib/elementColorContent.ts";

/** Table window: Nov 1 00:00 UTC through the end of Feb 28 in KST. */
export const DATES_FROM_ISO = "2026-11-01T00:00:00.000Z";
export const DATES_TO_ISO = "2027-02-28T15:00:00.000Z"; // Mar 1 00:00 KST

export interface SolarTermDateRow {
  key: string;
  en: string;
  ko: string;
  /** Exact crossing, ISO UTC. */
  at: string;
  /** "YYYY-MM-DD HH:mm" in KST. */
  kst: string;
  /** "YYYY-MM-DD HH:mm" in UTC. */
  utc: string;
  /** "YYYY-MM-DD" in KST. */
  kstDate: string;
  /** "YYYY-MM-DD" in America/New_York. */
  etDate: string;
  opensMonth: boolean;
  seasonElement: string;
}

// All zone math through Intl — never a hand-rolled +9.
function zoneParts(tz: string, d: Date): Record<string, string> {
  const out: Record<string, string> = {};
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  });
  for (const p of fmt.formatToParts(d)) {
    if (p.type !== "literal") out[p.type] = p.value;
  }
  return out;
}

function stamp(tz: string, d: Date): string {
  const p = zoneParts(tz, d);
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
}

function day(tz: string, d: Date): string {
  const p = zoneParts(tz, d);
  return `${p.year}-${p.month}-${p.day}`;
}

/** Solar-term rows with KST/UTC/ET readings for [fromIso, toIso). */
export function solarTermDates(fromIso: string, toIso: string): SolarTermDateRow[] {
  const from = new Date(fromIso);
  const to = new Date(toIso);
  const days = Math.ceil((to.getTime() - from.getTime()) / 86400000) + 1;
  return upcomingSolarTerms(from, days)
    .filter((e) => new Date(e.at).getTime() < to.getTime())
    .map((e) => {
      const at = new Date(e.at);
      return {
        key: e.key,
        en: SOLAR_TERM_NAMES.en[e.key] ?? e.key,
        ko: SOLAR_TERM_NAMES.ko[e.key] ?? e.key,
        at: e.at,
        kst: stamp("Asia/Seoul", at),
        utc: stamp("UTC", at),
        kstDate: day("Asia/Seoul", at),
        etDate: day("America/New_York", at),
        opensMonth: e.opensMonth,
        seasonElement: e.seasonElement,
      };
    });
}

function main(): void {
  if (process.argv.length > 2) throw new Error("usage: npx tsx scripts/shortform/solar-term-dates.mts");
  const rows = solarTermDates(DATES_FROM_ISO, DATES_TO_ISO);
  const table = [
    "| English | Korean | KST | UTC | US Eastern | Opens month | Season element |",
    "|---|---|---|---|---|---|---|",
    ...rows.map((r) =>
      `| ${r.en} | ${r.ko} | ${r.kst} KST | ${r.utc} UTC | ${r.etDate} | ${r.opensMonth ? "yes" : "no"} | ${r.seasonElement} |`),
  ];
  // Independent pass: the same crossings straight from the finder, compared at
  // minute precision (the table's resolution).
  const direct = (lon: number, guessIso: string): string =>
    findSolarLongitudeCrossing(lon, new Date(guessIso)).toISOString().slice(0, 16);
  const byKey = new Map(rows.map((r) => [r.key, r.at.slice(0, 16)]));
  const lidongOk = byKey.get("lidong") === direct(225, "2026-11-07T00:00:00.000Z");
  const dongzhiOk = byKey.get("dongzhi") === direct(270, "2026-12-21T00:00:00.000Z");
  const check = `check: lidong ${lidongOk ? "ok" : "MISMATCH"}, dongzhi ${dongzhiOk ? "ok" : "MISMATCH"}`;
  const md = `# Short-form dates (F3)

Built with \`npx tsx scripts/shortform/solar-term-dates.mts\` at ${new Date().toISOString()}.
Engine output from lib/solarTerms.ts — do not edit by hand.
When picking a publish date, North American viewers see the US Eastern date.

${table.join("\n")}

Fixed dates (not solar terms):

- 2026-12-01: Year Wrapped release (app feature)
- 2027-01-01: New Year

${check}
`;
  const out = path.resolve(import.meta.dirname, "..", "..", "marketing/shortform/dates.md");
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, md);
  console.log(md.trimEnd());
  if (!lidongOk || !dongzhiOk) {
    console.error("cross-check failed");
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
