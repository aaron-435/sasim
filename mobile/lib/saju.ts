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
};

// DB row shape from GET /api/verification-code's sajuResult.
type VerifyCodeSajuRow = {
  elements?: Record<string, number>;
  four_pillars?: unknown;
  decade_fortune?: unknown;
  summary?: unknown;
} | null;

export function normalizeVerifyCodeSajuResult(row: VerifyCodeSajuRow, dominantElement: string | null): NormalizedSajuResult {
  return {
    elements: row?.elements ?? {},
    dominantElement,
    fourPillars: row?.four_pillars,
    decadeFortune: row?.decade_fortune,
    summary: row?.summary,
  };
}
