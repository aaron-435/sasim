/**
 * lib/yearFortune.ts
 * ------------------------------------------------------------------
 * "신년운세" (Year Fortune) — Phase 1 MVP. Same reuse principle as
 * lib/dailyFortune.ts: no new saju math beyond what's needed, everything
 * else borrowed from already-verified pieces.
 *
 *   1. manseryeok's yearPillarForSajuYear — a pure 60갑자 formula, no
 *      KASI round trip needed (unlike day/month pillars). This makes the
 *      whole function synchronous, unlike getDailyFortune.
 *   2. lib/compatibility.ts's relation engine — "내 일간 vs 연운의 천간"
 *      is the same상생상극 problem as "내 일간 vs 상대 일간".
 *   3. lib/twelveStages.ts's lifeStageIndex/sinsalIndex/branchRelation —
 *      applied to the year's branch instead of today's.
 * ------------------------------------------------------------------
 */

import { yearPillarForSajuYear } from "./manseryeok";
import { calculateCompatibility, type CompatibilityResult } from "./compatibility";
import { branchRelation, lifeStageIndex, sinsalIndex } from "./twelveStages";
import type { Branch, Stem } from "./manseryeok";

export interface YearFortune {
  year: number;
  yearMaster: { char: string; element: string; branch: string };
  compatibility: CompatibilityResult | null;
  lifeStageIndex: number;
  sinsalIndex: number | null;
  branchRelation: "hap" | "chung" | "none";
}

/** selfDayBranch is optional for the same backward-compat reason as
 * dailyFortune.ts's — sinsalIndex/branchRelation just come back null/"none"
 * without it, rather than failing the whole request. */
export function getYearFortune(selfDayMasterChar: string, selfDayBranch: string | null, year: number): YearFortune {
  const pillar = yearPillarForSajuYear(year);
  return {
    year,
    yearMaster: { char: pillar.sky, element: pillar.skyElement, branch: pillar.earth },
    compatibility: calculateCompatibility(selfDayMasterChar, pillar.sky),
    lifeStageIndex: lifeStageIndex(selfDayMasterChar as Stem, pillar.earth),
    sinsalIndex: selfDayBranch ? sinsalIndex(selfDayBranch as Branch, pillar.earth) : null,
    branchRelation: selfDayBranch ? branchRelation(selfDayBranch as Branch, pillar.earth) : "none",
  };
}

/** The saju-year currently "in progress" as of KST now — the saju calendar switches
 * on 입춘 (~Feb 4), not Jan 1, but a rough Feb 4 cutoff is more than precise enough
 * for "which year should the app default to showing" (unlike birth-date pillar math,
 * nothing here depends on the exact hour). */
export function currentSajuYear(): number {
  const kstNow = new Date(Date.now() + 9 * 3600 * 1000);
  const year = kstNow.getUTCFullYear();
  const month = kstNow.getUTCMonth() + 1;
  const day = kstNow.getUTCDate();
  return month < 2 || (month === 2 && day < 4) ? year - 1 : year;
}
