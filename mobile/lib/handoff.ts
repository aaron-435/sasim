// The app half of the web→app handoff (server: lib/handoff.ts, GET /api/handoff).
// A visitor who tapped "Continue in the app" on the website arrives either through the
// fatesaid://handoff?t=<token> link or by typing the 6-digit code on VerifyCodeScreen.
// Both are one GET. A code may also be an older Q&A code; the server then answers in the
// old shape under kind "session" (the full reading, restored as before).
//
// A "handoff" carries only what that web page had asked for — a type card has just the
// date — so onboarding fills those steps in and asks the rest (planHandoff below).

import { API_BASE_URL } from "../config";
import { calculateAge, MIN_AGE } from "./age";
import type { OnboardingStepId } from "./onboardingSteps";
import type { Track } from "./userConcern";

export type HandoffData = {
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  /** null = the visitor chose "I don't know the time"; missing = never asked. */
  birthHour?: number | null;
  birthMinute?: number;
  isFemale?: boolean;
  birthCity?: string;
  birthCityId?: string;
  nickname?: string;
  track?: Track;
};

export type LegacySessionData = { nickname: string; track: string; sajuResult: unknown };

export type HandoffErrorCode = "bad_request" | "not_found" | "expired" | "update_app" | "unavailable" | "too_many" | "network";

export type HandoffRedeemResult =
  | { ok: true; kind: "handoff"; data: HandoffData; source: HandoffSource | null }
  | { ok: true; kind: "session"; session: LegacySessionData }
  | { ok: false; error: HandoffErrorCode };

/** The web entry points (lib/handoff.ts HANDOFF_SOURCES at the repo root). */
export const HANDOFF_SOURCES = ["type_card", "calculator", "day_master", "invite", "qa"] as const;
export type HandoffSource = (typeof HANDOFF_SOURCES)[number];

const ERROR_CODES: readonly HandoffErrorCode[] = ["bad_request", "not_found", "expired", "update_app", "unavailable"];

export async function redeemHandoff(query: { t: string } | { code: string }): Promise<HandoffRedeemResult> {
  const qs = "t" in query ? `t=${encodeURIComponent(query.t)}` : `code=${encodeURIComponent(query.code)}`;
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}/api/handoff?${qs}`);
  } catch {
    return { ok: false, error: "network" };
  }
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    if (res.status === 429) return { ok: false, error: "too_many" };
    const code = json.code as HandoffErrorCode;
    return { ok: false, error: ERROR_CODES.includes(code) ? code : res.status >= 500 ? "unavailable" : "not_found" };
  }
  if (json.kind === "handoff") {
    const source = HANDOFF_SOURCES.find((s) => s === json.source) ?? null;
    return { ok: true, kind: "handoff", data: (json.data ?? {}) as HandoffData, source };
  }
  if (json.kind === "session") return { ok: true, kind: "session", session: json as unknown as LegacySessionData };
  return { ok: false, error: "unavailable" };
}

/** The values the onboarding screens hold, as App.tsx keeps them (strings, 12-hour clock). */
export type HandoffPrefill = {
  nickname?: string;
  isFemale?: boolean;
  dob?: { year: string; month: string; day: string };
  tob?: { hour: string; minute: string; period: "AM" | "PM" } | "unknown";
  city?: { id: string; cityDisplay: string };
  track?: Track;
};

export type HandoffPlan = { prefill: HandoffPrefill; known: ReadonlySet<OnboardingStepId> };

const isInt = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v);
const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * Which onboarding steps the handoff already answers. A date under the app's minimum age is
 * filled in but not counted as answered, so the date step (and its age notice) still shows.
 */
export function planHandoff(data: HandoffData): HandoffPlan {
  const prefill: HandoffPrefill = {};
  const known = new Set<OnboardingStepId>();

  const nickname = typeof data.nickname === "string" ? data.nickname.trim() : "";
  if (nickname) {
    prefill.nickname = nickname;
    known.add("nickname");
  }
  if (typeof data.isFemale === "boolean") {
    prefill.isFemale = data.isFemale;
    known.add("gender");
  }
  const { birthYear: y, birthMonth: m, birthDay: d } = data;
  if (isInt(y) && isInt(m) && isInt(d)) {
    prefill.dob = { year: String(y), month: pad2(m), day: pad2(d) };
    const age = calculateAge(`${y}-${pad2(m)}-${pad2(d)}`);
    if (age !== null && age >= MIN_AGE) known.add("dob");

    if (data.birthHour === null) {
      prefill.tob = "unknown";
      known.add("tob");
    } else if (isInt(data.birthHour) && data.birthHour >= 0 && data.birthHour <= 23) {
      const h = data.birthHour;
      const minute = isInt(data.birthMinute) ? data.birthMinute : 0;
      prefill.tob = { hour: String(h % 12 === 0 ? 12 : h % 12), minute: pad2(minute), period: h >= 12 ? "PM" : "AM" };
      known.add("tob");
    }
  }
  // The city step also runs the calculation, so it always shows; a known city is just preselected.
  if (typeof data.birthCityId === "string" && typeof data.birthCity === "string") {
    prefill.city = { id: data.birthCityId, cityDisplay: data.birthCity };
  }
  // A track from the web would answer the concern step, but no web surface asks for one today
  // (the Q&A flow's track is a fixed default), so it is preselected and the step still shows.
  if (data.track === "romance" || data.track === "career") prefill.track = data.track;
  return { prefill, known };
}

/** The onboarding step after `from` that the handoff has not answered ("city" and "concern" are never answered). */
export function nextUnanswered(from: OnboardingStepId | null, known: ReadonlySet<OnboardingStepId>, order: readonly OnboardingStepId[]): OnboardingStepId | null {
  const start = from === null ? 0 : order.indexOf(from) + 1;
  for (let i = start; i < order.length; i++) if (!known.has(order[i])) return order[i];
  return null;
}
