import type { SajuType } from "./sajuType";

// One shape for saju data regardless of which onboarding path produced it — CityScreen's
// /api/saju call (camelCase) or VerifyCodeScreen's /api/verification-code redemption (the
// raw `saju_results` DB row, snake_case: see app/api/verification-code/route.ts). Screens
// downstream (QAScreen, and eventually chat/report) only ever see this shape.
export type NormalizedSajuResult = {
  elements: Record<string, number>;
  dominantElement: string | null;
  fourPillars?: unknown;
  decadeFortune?: unknown;
  summary?: unknown;
  sajuType?: SajuType | null;
  /** 만 나이, "지금" 기준 — 대운(decadeFortune) 중 어느 시기가 이미 지났고 어느 시기가
   *  다가오는지 가리는 데 씀 (리포트의 "다가오는 시기" 섹션). CityScreen 경로는 /api/saju가
   *  직접 계산해서 내려주고, 인증코드 복원 경로는 저장된 생년월일로 여기서 같은 방식으로
   *  다시 계산 — 인증코드 발급 시점이 아니라 "지금 열어보는 시점" 기준이어야 정확하므로
   *  DB에 저장해두지 않고 매번 새로 계산한다. */
  currentAge?: number;
  /** 다음 대운 전환일을 정확히 계산하기 위한 원본 생년월일 (lib/decadeTransition.ts) —
   *  currentAge(만 나이, 소수점 버림)만으로는 최대 1년 가까이 어긋날 수 있어서 필요. */
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
};

// DB row shape from GET /api/verification-code's sajuResult.
type VerifyCodeSajuRow = {
  elements?: Record<string, number>;
  four_pillars?: unknown;
  decade_fortune?: unknown;
  summary?: unknown;
  saju_type?: SajuType | null;
  birth_year?: number;
  birth_month?: number;
  birth_day?: number;
} | null;

function computeCurrentAge(birthYear?: number, birthMonth?: number, birthDay?: number): number | undefined {
  if (!birthYear || !birthMonth || !birthDay) return undefined;
  const birth = new Date(Date.UTC(birthYear, birthMonth - 1, birthDay));
  return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
}

export function normalizeVerifyCodeSajuResult(row: VerifyCodeSajuRow, dominantElement: string | null): NormalizedSajuResult {
  return {
    elements: row?.elements ?? {},
    dominantElement,
    fourPillars: row?.four_pillars,
    decadeFortune: row?.decade_fortune,
    summary: row?.summary,
    sajuType: row?.saju_type ?? null,
    currentAge: computeCurrentAge(row?.birth_year, row?.birth_month, row?.birth_day),
    birthYear: row?.birth_year,
    birthMonth: row?.birth_month,
    birthDay: row?.birth_day,
  };
}
