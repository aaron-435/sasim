/**
 * lib/sajuType.ts
 * ------------------------------------------------------------------
 * 사주 유형 라벨 — 일간 10 아키타입 × 십신 편중 5 모드 = 50 유형.
 *
 * 왜 이 두 축인가:
 *  - 1축(일간)은 명리에서 "나" 그 자체라 정체성 라벨의 축으로 가장 정확하고,
 *    10천간에는 이미 자연물 이미지(태양/바다/보석…)가 붙어 있어서 사주를 모르는
 *    해외 사용자에게도 번역 없이 그대로 읽힌다.
 *  - 2축은 사주에서 가장 두꺼운 오행이 일간과 맺는 관계(십신)를 5개로 압축한 것.
 *    "타고난 나"에 "무엇에 끌려 사는가"를 얹는 구조.
 *
 * 반환값은 로케일 중립 코드다. 표시 문구(이름/설명)는 각 클라이언트의 i18n이
 * 맡는다 — API가 특정 언어 문자열을 굳혀서 내보내면 EN/ES 클라이언트가 다시
 * 번역해야 하므로.
 * ------------------------------------------------------------------
 */

export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

export type ArchetypeKey =
  | "oak" | "vine" | "sun" | "flame" | "mountain"
  | "field" | "steel" | "gem" | "ocean" | "dew";

/** 십신을 5개로 압축한 편중 모드. 비겁/식상/재성/관성/인성 순. */
export type ModeKey = "rooted" | "voice" | "harvest" | "order" | "well";

export interface SajuType {
  archetype: ArchetypeKey;
  mode: ModeKey;
  /** 공유용 짧은 토큰 (예: "OCN-V"). 로케일 무관. */
  code: string;
  /** 이 유형을 만든 근거 — 화면에서 "왜 이 유형인지" 설명할 때 사용. */
  dayMasterElement: ElementKey;
  dominantElement: ElementKey;
}

/** 일간(천간) → 아키타입. 엔진이 쓰는 한글 천간 표기를 그대로 키로 삼는다. */
const STEM_ARCHETYPE: Record<string, ArchetypeKey> = {
  갑: "oak", 을: "vine",
  병: "sun", 정: "flame",
  무: "mountain", 기: "field",
  경: "steel", 신: "gem",
  임: "ocean", 계: "dew",
};

export const STEM_ELEMENT: Record<string, ElementKey> = {
  갑: "wood", 을: "wood",
  병: "fire", 정: "fire",
  무: "earth", 기: "earth",
  경: "metal", 신: "metal",
  임: "water", 계: "water",
};

/** 상생(生): 내가 생하는 오행. lib/compatibility.ts도 같은 표를 쓴다. */
export const GENERATES: Record<ElementKey, ElementKey> = {
  wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood",
};

/** 상극(剋): 내가 극하는 오행. lib/compatibility.ts도 같은 표를 쓴다. */
export const CONTROLS: Record<ElementKey, ElementKey> = {
  wood: "earth", earth: "water", water: "fire", fire: "metal", metal: "wood",
};

const ARCHETYPE_CODE: Record<ArchetypeKey, string> = {
  oak: "OAK", vine: "VIN", sun: "SUN", flame: "FLM", mountain: "MTN",
  field: "FLD", steel: "STL", gem: "GEM", ocean: "OCN", dew: "DEW",
};

const MODE_CODE: Record<ModeKey, string> = {
  rooted: "R", voice: "V", harvest: "H", order: "O", well: "W",
};

/** 동점일 때의 최종 순서 — 완전한 결정성 확보용(같은 사주는 항상 같은 유형). */
const ELEMENT_ORDER: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

/**
 * 가장 두꺼운 오행. 입력은 lib/sazu.ts의 NormalizedSajuResult.elements와 동일한
 * 형태(오행별 0-100 퍼센트) — 자체 엔진/SAZU 폴백 두 경로 모두 이 형태로 수렴하는
 * 값이라 API 응답 계약과 그대로 맞물린다. 동점이면 ELEMENT_ORDER로 결정성만 보장.
 */
function pickDominant(elements: Record<ElementKey, number>): ElementKey {
  return [...ELEMENT_ORDER].sort((a, b) => {
    const byValue = elements[b] - elements[a];
    if (byValue !== 0) return byValue;
    return ELEMENT_ORDER.indexOf(a) - ELEMENT_ORDER.indexOf(b);
  })[0];
}

function resolveMode(dayElement: ElementKey, dominant: ElementKey): ModeKey {
  if (dominant === dayElement) return "rooted";
  if (GENERATES[dayElement] === dominant) return "voice";
  if (CONTROLS[dayElement] === dominant) return "harvest";
  if (CONTROLS[dominant] === dayElement) return "order";
  return "well"; // 남는 경우는 GENERATES[dominant] === dayElement 뿐
}

/**
 * 사주 유형 판정. dayMasterChar는 엔진 summary.dayMaster.char("임" 같은 한글 천간).
 * 알 수 없는 천간이 오면 null — 호출부가 유형 UI를 통째로 숨길 수 있게 한다.
 */
export function classifySajuType(
  dayMasterChar: string,
  elements: Record<ElementKey, number>
): SajuType | null {
  const archetype = STEM_ARCHETYPE[dayMasterChar];
  const dayMasterElement = STEM_ELEMENT[dayMasterChar];
  if (!archetype || !dayMasterElement) return null;

  const dominantElement = pickDominant(elements);
  const mode = resolveMode(dayMasterElement, dominantElement);

  return {
    archetype,
    mode,
    code: `${ARCHETYPE_CODE[archetype]}-${MODE_CODE[mode]}`,
    dayMasterElement,
    dominantElement,
  };
}
