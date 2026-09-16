/**
 * lib/twelveStages.ts
 * ------------------------------------------------------------------
 * Two classical BaZi (사주) cycles layered on top of the existing
 * manseryeok engine, added 2026-09-16 to close the content-depth gap
 * against competitor apps (see 포스텔러's "일간 운세" for the reference
 * this is modeled on): 십이운성(十二長生, Twelve Life Stages) and
 * 십이신살(十二神殺, Twelve Sinsal). Both are real, deterministic
 * classical calculations — not AI-generated — matching this app's
 * "실제 만세력 엔진" positioning.
 * ------------------------------------------------------------------
 */

import { BRANCHES, isYangStem, type Branch, type Stem } from "./manseryeok";

export const LIFE_STAGE_ORDER = ["장생", "목욕", "관대", "건록", "제왕", "쇠", "병", "사", "묘", "절", "태", "양"] as const;
export type LifeStageName = (typeof LIFE_STAGE_ORDER)[number];

// 십이운성 장생(長生) 배치표 — 화토동궁(火土同宮) 기준의 표준/현대 관용 배치.
const LIFE_STAGE_START: Record<Stem, Branch> = {
  갑: "해",
  을: "오",
  병: "인",
  정: "유",
  무: "인",
  기: "유",
  경: "사",
  신: "자",
  임: "신",
  계: "묘",
};

/** 십이운성 — 일간이 특정 지지를 만났을 때 어느 생애주기 단계에 있는지.
 * 양간(갑병무경임)은 지지를 순행으로, 음간(을정기신계)은 역행으로 돈다.
 * 반환값은 LIFE_STAGE_ORDER의 인덱스(0-11). */
export function lifeStageIndex(dayStem: Stem, targetBranch: Branch): number {
  const yang = isYangStem(dayStem);
  const startIdx = BRANCHES.indexOf(LIFE_STAGE_START[dayStem]);
  const targetIdx = BRANCHES.indexOf(targetBranch);
  return yang ? (targetIdx - startIdx + 12) % 12 : (startIdx - targetIdx + 12) % 12;
}

export const SINSAL_ORDER = [
  "겁살",
  "재살",
  "천살",
  "지살",
  "년살",
  "월살",
  "망신살",
  "장성살",
  "반안살",
  "역마살",
  "육해살",
  "화개살",
] as const;
export type SinsalName = (typeof SINSAL_ORDER)[number];

// 삼합(三合) 네 그룹 — 각 그룹의 생지(生支, 첫 원소)를 기준으로 겁살 위치를 구한다.
const TRINE_GROUPS: readonly Branch[][] = [
  ["인", "오", "술"],
  ["신", "자", "진"],
  ["사", "유", "축"],
  ["해", "묘", "미"],
];

function trineStartBranch(branch: Branch): Branch {
  const group = TRINE_GROUPS.find((g) => g.includes(branch));
  if (!group) throw new Error(`unreachable: "${branch}" is not in any of the four trine groups`);
  return group[0];
}

/** 십이신살 — 기준 지지(보통 본인의 일지)가 속한 삼합 그룹을 기준으로,
 * 대상 지지(오늘의 일지)가 그 순환에서 어떤 신살에 해당하는지.
 * 반환값은 SINSAL_ORDER의 인덱스(0-11). */
export function sinsalIndex(referenceBranch: Branch, targetBranch: Branch): number {
  const startIdx = BRANCHES.indexOf(trineStartBranch(referenceBranch));
  const geopsalIdx = (startIdx - 3 + 12) % 12; // 겁살은 그룹 생지의 -3 위치에서 시작
  const targetIdx = BRANCHES.indexOf(targetBranch);
  return (targetIdx - geopsalIdx + 12) % 12;
}
