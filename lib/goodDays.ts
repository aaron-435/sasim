/**
 * lib/goodDays.ts
 * ------------------------------------------------------------------
 * "좋은 날 찾기" (subscriber feature, 2026-10-05). Picks 3-5 days in the next 30 whose
 * flow suits one purpose (interview, first meeting, moving, contract, fresh start).
 *
 * No new saju math: every day is the same getDailyFortune() reading the fortune tabs
 * already show (day-master relation + 12 life stages + 12 sinsal), scored with a small
 * per-purpose weight table. Copy is not written here — the app renders the reason line
 * from (purpose, relation) in mobile/lib/goodDaysContent.ts, the same split as
 * dailyFortune.ts / dailyFortuneContent.ts.
 *
 * Pressure rule (CLAUDE.md, 2026-09-19): there is no "days to avoid". A pace-yourself day
 * (otherChallengesSelf) is never picked, and days that aren't picked are simply not
 * returned — the screen shows only the good ones.
 * ------------------------------------------------------------------
 */

import type { CompatRelation } from "./compatibility";
import { getDailyFortune, type DayFortune } from "./dailyFortune";

export const GOOD_DAY_PURPOSES = ["interview", "firstMeeting", "move", "contract", "newStart"] as const;
export type GoodDayPurpose = (typeof GOOD_DAY_PURPOSES)[number];

export function isGoodDayPurpose(value: unknown): value is GoodDayPurpose {
  return typeof value === "string" && (GOOD_DAY_PURPOSES as readonly string[]).includes(value);
}

export const GOOD_DAYS_RANGE = 30;
const MAX_PICKS = 5;
const MIN_PICKS = 3;
const MAX_PER_RELATION = 2; // keeps the list from being one rhythm repeated (and the reason lines from repeating)

type PickableRelation = Exclude<CompatRelation, "otherChallengesSelf">;

// How well each day rhythm suits the purpose (3 = best fit). otherChallengesSelf is left
// out on purpose: it's the "pacing" day, and it never becomes a recommendation.
const RELATION_WEIGHT: Record<GoodDayPurpose, Record<PickableRelation, number>> = {
  // being backed (receiving) and expressing yourself (giving) both help in front of an interviewer
  interview: { otherNurturesSelf: 3, selfNurturesOther: 3, mirror: 2, selfChallengesOther: 1 },
  // warmth and expression first
  firstMeeting: { selfNurturesOther: 3, mirror: 2, otherNurturesSelf: 2, selfChallengesOther: 1 },
  // support and steadiness
  move: { otherNurturesSelf: 3, mirror: 2, selfChallengesOther: 2, selfNurturesOther: 1 },
  // handling things decisively (leading) and being backed
  contract: { selfChallengesOther: 3, otherNurturesSelf: 3, mirror: 1, selfNurturesOther: 1 },
  // your own drive and creative output
  newStart: { mirror: 3, selfNurturesOther: 3, otherNurturesSelf: 2, selfChallengesOther: 1 },
};

// lib/twelveStages.ts LIFE_STAGE_ORDER indexes: 0 장생, 1 목욕, 2 관대, 3 건록, 4 제왕,
// 5 쇠, 6 병, 7 사, 8 묘, 9 절, 10 태, 11 양.
const STAGE_BONUS: Record<GoodDayPurpose, number[]> = {
  interview: [2, 3, 4],
  firstMeeting: [0, 1, 2],
  move: [0, 2, 3],
  contract: [2, 3, 4],
  newStart: [0, 3, 10, 11],
};
const LOW_STAGES = [6, 7, 8, 9];

// lib/twelveStages.ts SINSAL_ORDER indexes: 3 지살, 4 년살(도화), 7 장성살, 8 반안살, 9 역마살.
const SINSAL_BONUS: Record<GoodDayPurpose, number[]> = {
  interview: [7],
  firstMeeting: [4],
  move: [3, 9],
  contract: [8],
  newStart: [3],
};

// 천간합 (stem bond with the day) reads as "a meeting that clicks".
const BOND_BONUS: Record<GoodDayPurpose, number> = { interview: 0, firstMeeting: 1, move: 0, contract: 1, newStart: 0 };

export interface GoodDay {
  date: string;
  relation: PickableRelation;
  pillarIndex: number;
  lifeStageIndex: number;
  sinsalIndex: number | null;
}

export function scoreDay(day: DayFortune, purpose: GoodDayPurpose): number | null {
  const relation = day.compatibility?.relation;
  if (!relation || relation === "otherChallengesSelf") return null;
  let score = RELATION_WEIGHT[purpose][relation];
  if (STAGE_BONUS[purpose].includes(day.lifeStageIndex)) score += 1;
  if (LOW_STAGES.includes(day.lifeStageIndex)) score -= 1;
  if (day.sinsalIndex !== null && SINSAL_BONUS[purpose].includes(day.sinsalIndex)) score += 1;
  if (day.compatibility?.stemBond) score += BOND_BONUS[purpose];
  return score;
}

/** Pure selection — exported so a scratch script can check it without the network. */
export function pickGoodDays(days: DayFortune[], purpose: GoodDayPurpose): GoodDay[] {
  const scored = days
    .map((day) => ({ day, score: scoreDay(day, purpose) }))
    .filter((d): d is { day: DayFortune; score: number } => d.score !== null)
    // best first; on a tie the sooner day wins
    .sort((a, b) => b.score - a.score || a.day.date.localeCompare(b.day.date));

  const pickWith = (minScore: number) => {
    const picks: typeof scored = [];
    const perRelation = new Map<string, number>();
    for (const item of scored) {
      if (picks.length >= MAX_PICKS || item.score < minScore) break;
      const relation = item.day.compatibility!.relation;
      const count = perRelation.get(relation) ?? 0;
      if (count >= MAX_PER_RELATION) continue;
      perRelation.set(relation, count + 1);
      picks.push(item);
    }
    return picks;
  };

  // A strong fit first; if fewer than three days clear it, relax one step so there is always a short list.
  let picks = pickWith(3);
  if (picks.length < MIN_PICKS) picks = pickWith(2);
  if (picks.length < MIN_PICKS) picks = pickWith(Number.NEGATIVE_INFINITY);

  return picks
    .map(({ day }) => ({
      date: day.date,
      relation: day.compatibility!.relation as PickableRelation,
      pillarIndex: day.dayMaster.pillarIndex,
      lifeStageIndex: day.lifeStageIndex,
      sinsalIndex: day.sinsalIndex,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Today through the next 29 days (KST, same calendar as the fortune tabs). A day whose
 * lookup fails is skipped rather than failing the whole list (see getWeeklyFortune). */
export async function getGoodDays(selfDayMasterChar: string, selfDayBranch: string | null, purpose: GoodDayPurpose): Promise<GoodDay[]> {
  const settled = await Promise.allSettled(
    Array.from({ length: GOOD_DAYS_RANGE }, (_, offset) => getDailyFortune(selfDayMasterChar, selfDayBranch, offset)),
  );
  const days = settled.filter((r): r is PromiseFulfilledResult<DayFortune> => r.status === "fulfilled").map((r) => r.value);
  return pickGoodDays(days, purpose);
}
