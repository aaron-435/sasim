/**
 * lib/elementColor.ts
 * ------------------------------------------------------------------
 * "오늘의 원소 컬러"(2026-10-06): 오늘 일진과 내 원국을 합쳐 봤을 때 가장
 * 비어 있는 오행 하나를 "오늘 나를 채우는 색"으로 고른다. 새 산식은 없다 —
 * 원국 오행 비율(저장된 사주 결과의 elements, %)에 오늘 일주의 천간·지지가
 * 한 글자씩(8글자 중 1글자 = 12.5%) 더해진다고 보고, 그 합에서 가장 낮은
 * 오행을 고른다. 동률이면 오늘 천간 오행이 생하는 오행부터 상생 순서로 본다
 * (같은 원국이라도 날마다 순서가 달라지게).
 *
 * 서버는 오행 키만 돌려준다. 색 이름·무드 문구는 앱(mobile/lib/elementColorContent.ts)이
 * 입힌다 — dailyFortune과 같은 분리. 부적·효험 같은 말은 문구 쪽에서도 쓰지 않는다.
 * ------------------------------------------------------------------
 */

import { BRANCH_ELEMENT, STEM_ELEMENT, type Branch, type Stem } from "./manseryeok";

export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

export const ELEMENT_ORDER: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

const GENERATES: Record<ElementKey, ElementKey> = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };

/** One pillar character's share of an 8-character chart. */
const CHAR_SHARE = 12.5;

export interface ElementColor {
  /** The element to bring in today (the emptiest after adding today's pillar). */
  element: ElementKey;
  /** Today's day-stem element, for the mood line. */
  todayElement: ElementKey;
}

/**
 * Parses the `elements` query value: five comma-separated percentages in ELEMENT_ORDER.
 * Returns null for anything malformed (the caller then just leaves the field out).
 */
export function parseElementsParam(raw: string | null): Record<ElementKey, number> | null {
  if (!raw || raw.length > 64) return null;
  const parts = raw.split(",");
  if (parts.length !== ELEMENT_ORDER.length) return null;
  const values = parts.map((p) => (/^\d{1,3}(\.\d{1,2})?$/.test(p.trim()) ? Number(p) : NaN));
  if (values.some((v) => !Number.isFinite(v) || v < 0 || v > 100)) return null;
  const sum = values.reduce((a, b) => a + b, 0);
  if (sum < 90 || sum > 110) return null;
  return Object.fromEntries(ELEMENT_ORDER.map((k, i) => [k, values[i]])) as Record<ElementKey, number>;
}

export function computeElementColor(elements: Record<ElementKey, number>, todayStem: string, todayBranch: string): ElementColor | null {
  const stemElement = STEM_ELEMENT[todayStem as Stem];
  const branchElement = BRANCH_ELEMENT[todayBranch as Branch];
  if (!stemElement || !branchElement) return null;

  const totals = { ...elements };
  totals[stemElement] += CHAR_SHARE;
  totals[branchElement] += CHAR_SHARE;

  // Tie order: start from what today's stem generates and walk the generating cycle.
  const order: ElementKey[] = [];
  let next = GENERATES[stemElement];
  for (let i = 0; i < ELEMENT_ORDER.length; i++) {
    order.push(next);
    next = GENERATES[next];
  }
  let best = order[0];
  for (const el of order) {
    if (totals[el] < totals[best] - 1e-9) best = el;
  }
  return { element: best, todayElement: stemElement };
}
