/**
 * lib/sazu.ts
 * ------------------------------------------------------------------
 * Saju calculation entry point. As of 2026-09 SAZU raised Free-tier
 * pricing sharply, so the primary path is now our own self-hosted
 * engine (lib/manseryeok.ts, built on KASI's free government Open API
 * + an in-house solar-term calculation) — see that file's header for
 * validation notes. SAZU is kept ONLY as an automatic fallback for
 * when the self-hosted path throws (KASI outage, unsupported lunar
 * input, unexpected bug) so this endpoint never goes fully dark.
 *
 * calculateSaju() tries calculateViaManseryeok() first; any error
 * (caught broadly, on purpose) falls through to calculateViaSazuApi(),
 * the original @sazuapp/client-based implementation. Callers
 * (app/api/saju/route.ts) are unaffected either way — same return
 * shape, same SazuApiError class on failure.
 *
 * Bonus: the self-hosted engine has no "5 sample profiles only" sandbox
 * restriction, so real birthdates that used to hit SAMPLE_PROFILE_REQUIRED
 * on the Free SAZU tier now just work.
 *
 * Known gaps in the self-hosted path (falls back to SAZU when hit):
 *   - isLunar input (음력 생일) — not implemented yet, see manseryeok.ts.
 * ------------------------------------------------------------------
 */

import { SazuClient, SazuApiError as SdkSazuApiError } from "@sazuapp/client";
import { calculateManseryeok } from "./manseryeok";

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
  if (!input.isLunar) {
    try {
      return await calculateViaManseryeok(input);
    } catch (err) {
      console.error("[sazu] self-hosted manseryeok engine failed, falling back to SAZU API:", err);
      // fall through to the SAZU-backed path below
    }
  }
  return calculateViaSazuApi(input);
}

async function calculateViaManseryeok(input: SazuCalculateInput): Promise<NormalizedSajuResult> {
  const result = await calculateManseryeok({
    birthYear: input.birthYear,
    birthMonth: input.birthMonth,
    birthDay: input.birthDay,
    birthHour: input.birthHour,
    isFemale: input.isFemale,
  });

  const elements: Record<ElementKey, number> = {
    wood: result.elements.wood.total.percentage,
    fire: result.elements.fire.total.percentage,
    earth: result.elements.earth.total.percentage,
    metal: result.elements.metal.total.percentage,
    water: result.elements.water.total.percentage,
  };

  return {
    raw: result,
    elements,
    dominantElement: result.dominantElement,
    fourPillars: result.fourPillars,
    decadeFortune: result.decadeFortune,
    summary: result.summary,
    timezoneNote: null,
    isSandboxSample: false, // self-hosted engine has no sandbox restriction
  };
}

async function calculateViaSazuApi(input: SazuCalculateInput): Promise<NormalizedSajuResult> {
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
