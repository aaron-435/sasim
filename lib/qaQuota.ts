/**
 * lib/qaQuota.ts
 * ------------------------------------------------------------------
 * Server-side enforcement of the Q&A free-question cap, added
 * 2026-09-13 — until now the limit only existed client-side
 * (components/QAChat.jsx's FREE_QUESTIONS, mobile/lib/qaQuota.ts's
 * FREE_DAILY_LIMIT), so calling /api/qa-answer directly (skipping the
 * UI) got unlimited free answers. See app/api/qa-answer/route.ts for
 * where this is enforced.
 *
 * No new table/column: counts rows in llm_usage_log (endpoint "qa"),
 * which lib/qaChat.ts already writes on every successful answer — the
 * actual source of truth for "how many answers has this session
 * gotten", with no separate counter to keep in sync.
 *
 * Two different policies because the two surfaces sell this
 * differently (see project memory on the monetization model):
 *   - web:    2 free questions ever, then push to install the app —
 *             a one-time lead-gen hook, not a recurring quota.
 *   - mobile: 1 free question per day (10/day if subscribed, but no
 *             server-side subscription truth exists yet, so the paid
 *             tier isn't enforced here — same limitation the client
 *             placeholder already documents).
 * An unrecognized/missing platform value gets the stricter (web)
 * policy, so a client can't raise its own limit just by omitting the
 * field.
 *
 * "Daily" is a UTC calendar day, not the requester's local day — a
 * deliberate simplification (mobile's own client-side AsyncStorage
 * version resets on local midnight instead). The mismatch only matters
 * within a couple hours of midnight in the user's timezone; closing
 * the "wide open" gap matters far more than exact timezone parity.
 *
 * Fails OPEN on any Supabase error (missing env vars, network issue) —
 * same resilience convention as lib/rateLimit.ts and lib/llmUsage.ts:
 * an infra hiccup must never block a real user from a free answer they
 * were entitled to.
 * ------------------------------------------------------------------
 */

import { getSupabaseAdmin } from "./supabase";

export type QaPlatform = "web" | "mobile";

const WEB_LIFETIME_LIMIT = 2; // keep in sync with components/QAChat.jsx's FREE_QUESTIONS
const MOBILE_DAILY_LIMIT = 1; // keep in sync with mobile/lib/qaQuota.ts's FREE_DAILY_LIMIT

export async function isQaQuotaExceeded(sessionId: string, platform: QaPlatform): Promise<boolean> {
  try {
    const supabase = getSupabaseAdmin();
    let query = supabase
      .from("llm_usage_log")
      .select("id", { count: "exact", head: true })
      .eq("session_id", sessionId)
      .eq("endpoint", "qa");

    if (platform === "mobile") {
      const todayStart = new Date();
      todayStart.setUTCHours(0, 0, 0, 0);
      query = query.gte("created_at", todayStart.toISOString());
    }

    const { count, error } = await query;
    if (error) throw error;

    const limit = platform === "mobile" ? MOBILE_DAILY_LIMIT : WEB_LIFETIME_LIMIT;
    return (count ?? 0) >= limit;
  } catch (err) {
    console.error("[qaQuota] failed to check usage (failing open)", err);
    return false;
  }
}
