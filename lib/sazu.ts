/**
 * lib/sazu.ts
 * ------------------------------------------------------------------
 * Server-side wrapper around the SAZU 사주 API, via the official
 * @sazuapp/client SDK. NEVER import this in a client component — it
 * reads process.env.SAZU_API_KEY. Call it only from Route Handlers /
 * Server Actions.
 *
 * Adapted to the installed @sazuapp/client@0.4.0 SDK shape:
 *   - `client.calculate(input)` is a direct method (not client.sazu.calculate).
 *   - It resolves with the CalculateResult directly (no {success,data} envelope)
 *     and THROWS the SDK's own SazuApiError on failure instead of returning
 *     {success:false}. calculateSaju() below catches that and rethrows the
 *     local SazuApiError class (below) so callers (app/api/saju/route.ts)
 *     keep the same catch-shape regardless of SDK internals.
 *   - modules.elements shape (per SAZU docs): keys are lowercase English
 *     (wood/fire/earth/metal/water), each with total.percentage (0-100).
 *
 * NOT CURRENTLY EXPOSED by this SDK version: a sandbox/sample-data flag on
 * the calculate() response. `isSandboxSample` below is left `false` until
 * the SDK surfaces one — if you need to distinguish sandbox vs. real data,
 * check `client.me().tier === 'free'` separately.
 *
 * STILL OPEN — Free sandbox only accepts the 5 documented sample inputs (birthCity
 * always "서울" in all 5), so non-Seoul birthCity strings are UNVERIFIED until you
 * test against Pro. Do not assume other city names work in this exact format yet —
 * confirm with a Pro key before wiring the onboarding city field through untested.
 * ------------------------------------------------------------------
 */

import { SazuClient, SazuApiError as SdkSazuApiError } from "@sazuapp/client";

const client = new SazuClient({
  apiKey: process.env.SAZU_API_KEY!, // set in .env.local, never exposed to client
});

export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

export interface SazuCalculateInput {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour?: number | null; // null/undefined if user chose "don't know my birth time"
  birthMinute?: number;
  isFemale: boolean;
  /** Korean city string, e.g. "서울". Only "서울" is confirmed working so far. */
  birthCity?: string;
  isLunar?: boolean;
  /** Which modules to request. Keep this list minimal to control Pro usage cost. */
  modules?: string[];
}

export interface NormalizedSajuResult {
  raw: unknown; // keep the untouched API response for debugging / future modules
  elements: Record<ElementKey, number>; // percentage 0-100, sums to ~100
  dominantElement: ElementKey | null;
  fourPillars: unknown; // pass through modules.fourPillars as-is for the 4-pillar cards
  decadeFortune: unknown; // pass through modules.decadeFortune as-is
  summary: unknown; // pass through modules.summary (dayMaster, elementBalance, harmony/conflict, fortunePhase — FREE tier)
  timezoneNote: unknown; // data.timezone (진태양시 보정 정보)
  isSandboxSample: boolean; // true when meta.sample === true (Free tier fixed profile)
}

function normalizeElements(
  elementsModule: Record<string, { total?: { percentage?: number } }> | undefined
): Record<ElementKey, number> {
  const keys: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];
  const base = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 } as Record<ElementKey, number>;
  if (!elementsModule) return base;
  for (const key of keys) {
    const pct = elementsModule[key]?.total?.percentage;
    base[key] = typeof pct === "number" ? pct : 0;
  }
  return base;
}

export async function calculateSaju(input: SazuCalculateInput): Promise<NormalizedSajuResult> {
  let response;
  try {
    response = await client.calculate({
      birthYear: input.birthYear,
      birthMonth: input.birthMonth,
      birthDay: input.birthDay,
      birthHour: input.birthHour ?? null, // API expects explicit null for "unknown", not omitted
      birthMinute: input.birthMinute ?? 0,
      isFemale: input.isFemale,
      birthCity: input.birthCity ?? "서울",
      isLunar: input.isLunar ?? false,
      modules: input.modules ?? ["fourPillars", "decadeFortune", "elements", "summary"],
    });
  } catch (err) {
    // Covers VALIDATION_ERROR, SAMPLE_PROFILE_REQUIRED (Free sandbox mismatch),
    // RATE_LIMIT_EXCEEDED, etc. — see docs error table. Rethrow as the local
    // SazuApiError so callers don't need to know about the SDK's own class.
    if (err instanceof SdkSazuApiError) {
      throw new SazuApiError(err.code ?? "UNKNOWN", err.message);
    }
    throw err;
  }

  const elements = normalizeElements(
    response.modules?.elements as Record<string, { total?: { percentage?: number } }> | undefined
  );
  const dominantEntry = Object.entries(elements).sort((a, b) => b[1] - a[1])[0];
  const dominantElement = dominantEntry && dominantEntry[1] > 0 ? (dominantEntry[0] as ElementKey) : null;

  return {
    raw: response,
    elements,
    dominantElement,
    fourPillars: response.modules?.fourPillars,
    decadeFortune: response.modules?.decadeFortune,
    summary: response.modules?.summary,
    timezoneNote: response.timezone,
    isSandboxSample: false, // SDK doesn't currently expose a sandbox/sample flag — see header comment
  };
}

export class SazuApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "SazuApiError";
  }

  /** 401 계열 — 키 누락/오류/폐기/만료 */
  get isAuthError() {
    return ["MISSING_API_KEY", "INVALID_API_KEY", "KEY_REVOKED", "KEY_EXPIRED"].includes(this.code);
  }
  /** 429 계열 — 호출량 한도 초과 */
  get isRateLimited() {
    return ["RATE_LIMIT_EXCEEDED", "MONTHLY_QUOTA_EXCEEDED"].includes(this.code);
  }
  /** 503 계열 — 일시적 장애, 재시도하면 나아질 수 있음 */
  get isTransient() {
    return ["AUTH_UNAVAILABLE", "QUOTA_UNAVAILABLE"].includes(this.code);
  }
  /** Free 샌드박스에 5종 샘플 외 입력을 보냈을 때 */
  get isSandboxMismatch() {
    return this.code === "SAMPLE_PROFILE_REQUIRED";
  }
}
