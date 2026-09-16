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

import { monthPillarsForSajuYear, yearPillarForSajuYear } from "./manseryeok";
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

export interface MonthFortune {
  monthIndex: number; // 0-11, saju order (인월=0 ... 축월=11) — NOT calendar order
  calendarYear: number;
  calendarMonth: number; // 1-12
  monthMaster: { char: string; element: string; branch: string };
  compatibility: CompatibilityResult | null;
  lifeStageIndex: number;
  sinsalIndex: number | null;
  branchRelation: "hap" | "chung" | "none";
}

// 인월(termIndex 0)부터 시작해 어느 캘린더월에 대략 해당하는지 — 축월(index 11)만
// 다음 캘린더 연도로 넘어간다(정확한 절입 시각과는 하루이틀 어긋날 수 있지만, "몇 월"
// 표시 목적으로는 충분하다).
const MONTH_CALENDAR = [
  { month: 2, yearOffset: 0 },
  { month: 3, yearOffset: 0 },
  { month: 4, yearOffset: 0 },
  { month: 5, yearOffset: 0 },
  { month: 6, yearOffset: 0 },
  { month: 7, yearOffset: 0 },
  { month: 8, yearOffset: 0 },
  { month: 9, yearOffset: 0 },
  { month: 10, yearOffset: 0 },
  { month: 11, yearOffset: 0 },
  { month: 12, yearOffset: 0 },
  { month: 1, yearOffset: 1 },
];

/** Phase 2 — the same year's 12 saju-months, each read the same way the year itself
 * is (일간 vs 그 달의 천간, twelveStages 적용, 육합/충 판정). No new content needed:
 * mobile reuses yearFortuneContent.ts's same 5-relation copy per month. */
export function getMonthlyFortune(selfDayMasterChar: string, selfDayBranch: string | null, sajuYear: number): MonthFortune[] {
  return monthPillarsForSajuYear(sajuYear).map((pillar, monthIndex) => ({
    monthIndex,
    calendarYear: sajuYear + MONTH_CALENDAR[monthIndex].yearOffset,
    calendarMonth: MONTH_CALENDAR[monthIndex].month,
    monthMaster: { char: pillar.sky, element: pillar.skyElement, branch: pillar.earth },
    compatibility: calculateCompatibility(selfDayMasterChar, pillar.sky),
    lifeStageIndex: lifeStageIndex(selfDayMasterChar as Stem, pillar.earth),
    sinsalIndex: selfDayBranch ? sinsalIndex(selfDayBranch as Branch, pillar.earth) : null,
    branchRelation: selfDayBranch ? branchRelation(selfDayBranch as Branch, pillar.earth) : "none",
  }));
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
