import AsyncStorage from "@react-native-async-storage/async-storage";

// Daily Q&A quota — 2026-09-11 decision: 1 free question/day, 10/day for a $19/month
// subscriber. The free side is fully real (tracked here). The paid side is NOT wired to
// anything yet — there's no IAP/RevenueCat/subscription state in this app at all (see
// [[project-fatesaid-native-framework-decision]] and the launch roadmap's Phase 3), so
// PAID_DAILY_LIMIT exists only to document the target and to size the "upgrade" message
// QAScreen shows once the free limit is hit. isSubscribed always resolves to false until
// real purchase state exists — don't wire a "구독하기" button to this without a real
// payment flow behind it; that's exactly the fake-affordance bug already fixed once on
// web's QAChat (see lib/i18n/ko.ts's qa.appComingSoonLabel).
//
// Tracked client-side only (AsyncStorage), not server-side — same known limitation as
// web's QAChat FREE_QUESTIONS cap (see lib/rateLimit.ts's docstring): resets if the user
// clears app storage or reinstalls. Fine for now; move to a server-tracked count (keyed
// on sessionId, like the web rate limiter) if abuse ever becomes a real problem.
export const FREE_DAILY_LIMIT = 1;
export const PAID_DAILY_LIMIT = 10;
export const SUBSCRIPTION_PRICE_LABEL = "월 $19";

const STORAGE_PREFIX = "fatesaid_qa_usage_";

function todayKey(): string {
  const d = new Date();
  return `${STORAGE_PREFIX}${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Always false until real subscription/IAP state exists.
export function isSubscribed(): boolean {
  return false;
}

export function getDailyLimit(): number {
  return isSubscribed() ? PAID_DAILY_LIMIT : FREE_DAILY_LIMIT;
}

export async function getUsageToday(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(todayKey());
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0; // storage unavailable — don't block the user over it
  }
}

export async function incrementUsageToday(): Promise<number> {
  const current = await getUsageToday();
  const next = current + 1;
  try {
    await AsyncStorage.setItem(todayKey(), String(next));
  } catch {
    // best-effort — if this fails, the user just gets one extra question today
  }
  return next;
}
