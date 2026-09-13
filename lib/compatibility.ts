/**
 * lib/compatibility.ts
 * ------------------------------------------------------------------
 * 두 사람의 사주 궁합 v1. 명리의 궁합 판단 전체(십신 대조/지지 육합·삼합·
 * 충형파해 전부)를 다 구현하지 않고, 의도적으로 두 축만 쓴다:
 *
 *  1. 일간(day master) 오행 관계 — 두 사람의 "타고난 나"가 상생/상극/동일
 *     중 무엇인지. 궁합에서 가장 굵은 축이고, 이미 lib/sajuType.ts에 있는
 *     GENERATES/CONTROLS 표를 그대로 재사용한다(단일 출처 유지).
 *  2. 천간합(오합) — 갑기/을경/병신/정임/무계, 5쌍의 특별한 결합. 맞으면
 *     관계 서사에 보너스 문단 + 점수 가산을 준다.
 *
 * 지지 관계(육합/삼합/충)는 branch 12개 × 12개 조합표가 필요해 콘텐츠
 * 볼륨이 급격히 커진다 — v1에서는 스코프 밖으로 남기고, 필요해지면 이
 * 파일에 세 번째 축으로 추가한다(그 전까지는 없는 걸 있는 척하지 않음).
 *
 * 점수는 "결과"가 아니라 "느낌"이다 — 명리에 나쁜 궁합은 없고 다른 역학만
 * 있다는 원칙(lib/sajuTypeContent.ts 헤더 참고)을 그대로 따른다. relation이
 * "challenge" 계열이어도 카피는 판정문이 아니라 서로 다른 리듬 설명으로
 * 쓴다.
 * ------------------------------------------------------------------
 */

import { CONTROLS, GENERATES, STEM_ELEMENT, type ElementKey } from "./sajuType";

export type CompatRelation = "mirror" | "selfNurturesOther" | "otherNurturesSelf" | "selfChallengesOther" | "otherChallengesSelf";

/** 오합(五合) — 두 일간이 이 쌍이면 특별한 결합으로 본다. 순서 무관. */
const STEM_BOND_PAIRS: [string, string][] = [
  ["갑", "기"], ["을", "경"], ["병", "신"], ["정", "임"], ["무", "계"],
];

export interface CompatibilityResult {
  relation: CompatRelation;
  /** 오합이 맞았을 때만 값을 가짐(두 일간 문자, 표시용) */
  stemBond: { self: string; other: string } | null;
  /** 58-95 사이. 관계 유형(RELATION_BASE_SCORE)이 바닥을, 95캡이 천장을 막아서
   *  어느 조합도 극단으로 가지 않는다 — 궁합엔 나쁜 조합이 없다는 원칙(파일 헤더 참고). */
  score: number;
  selfDayMasterElement: ElementKey;
  otherDayMasterElement: ElementKey;
}

function resolveRelation(selfElement: ElementKey, otherElement: ElementKey): CompatRelation {
  if (selfElement === otherElement) return "mirror";
  if (GENERATES[selfElement] === otherElement) return "selfNurturesOther";
  if (GENERATES[otherElement] === selfElement) return "otherNurturesSelf";
  if (CONTROLS[selfElement] === otherElement) return "selfChallengesOther";
  return "otherChallengesSelf"; // 남는 경우는 CONTROLS[otherElement] === selfElement 뿐
}

const RELATION_BASE_SCORE: Record<CompatRelation, number> = {
  mirror: 68,
  selfNurturesOther: 82,
  otherNurturesSelf: 82,
  selfChallengesOther: 58,
  otherChallengesSelf: 58,
};

function findStemBond(selfChar: string, otherChar: string): boolean {
  return STEM_BOND_PAIRS.some(([a, b]) => (selfChar === a && otherChar === b) || (selfChar === b && otherChar === a));
}

/**
 * dayMasterChar는 양쪽 다 엔진 summary.dayMaster.char("갑" 같은 한글 천간).
 * 둘 중 하나라도 인식 못 하는 문자면 null — 호출부가 결과 UI를 숨길 수 있게.
 */
export function calculateCompatibility(selfDayMasterChar: string, otherDayMasterChar: string): CompatibilityResult | null {
  const selfElement = STEM_ELEMENT[selfDayMasterChar];
  const otherElement = STEM_ELEMENT[otherDayMasterChar];
  if (!selfElement || !otherElement) return null;

  const relation = resolveRelation(selfElement, otherElement);
  const hasBond = findStemBond(selfDayMasterChar, otherDayMasterChar);

  const score = Math.min(95, RELATION_BASE_SCORE[relation] + (hasBond ? 12 : 0));

  return {
    relation,
    stemBond: hasBond ? { self: selfDayMasterChar, other: otherDayMasterChar } : null,
    score,
    selfDayMasterElement: selfElement,
    otherDayMasterElement: otherElement,
  };
}
