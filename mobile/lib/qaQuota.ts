import AsyncStorage from "@react-native-async-storage/async-storage";
import { hasQaProEntitlement } from "./purchases";

// Daily Q&A quota — 2026-09-11 decision: 1 free question/day, 10/day for a $19.99/month
// subscriber. The free side is fully real (tracked here).
//
// 2026-09-13/14: isSubscribed() checks a real RevenueCat entitlement (see lib/purchases.ts),
// and as of 2026-09-14 a real "구독하기" purchase button exists too (QAScreen.tsx, wired to
// purchaseQaPro()) backed by a real App Store subscription product — this is no longer a
// placeholder path, an actual subscription purchase here works.
//
// The free side is tracked client-side only (AsyncStorage), not server-side — same known
// limitation as web's QAChat FREE_QUESTIONS cap (see lib/rateLimit.ts's docstring):
// resets if the user clears app storage or reinstalls. Fine for now; move to a
// server-tracked count (keyed on sessionId, like the web rate limiter) if abuse ever
// becomes a real problem.
export const FREE_DAILY_LIMIT = 1;
export const PAID_DAILY_LIMIT = 10;
export const SUBSCRIPTION_PRICE_LABEL = "월 $19.99";

const STORAGE_PREFIX = "fatesaid_qa_usage_";

function todayKey(): string {
  const d = new Date();
  return `${STORAGE_PREFIX}${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function isSubscribed(): Promise<boolean> {
  return hasQaProEntitlement();
}

export async function getDailyLimit(): Promise<number> {
  return (await isSubscribed()) ? PAID_DAILY_LIMIT : FREE_DAILY_LIMIT;
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
