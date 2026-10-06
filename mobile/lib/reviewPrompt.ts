import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import { Platform } from "react-native";
import { track } from "./analytics";

// The system "rate this app" sheet (TODO 12, 2026-10-06). Asked only at two good moments —
// reaching the closing page of a report (ReportPager) and right after a successful purchase
// (purchases.ts) — never after something went wrong. The OS caps how often the sheet really
// shows (iOS: 3 times a year) and may show nothing; on top of that we ask at most once every
// 60 days, and never within 10 minutes of a cancelled or failed purchase.

export type ReviewTrigger = "report_end" | "purchase";

const LAST_ASKED_KEY = "fatesaid_review_last_asked";
const MIN_GAP_MS = 60 * 24 * 60 * 60 * 1000;
const NEGATIVE_QUIET_MS = 10 * 60 * 1000;
// Let the purchase sheet / page turn settle so the review sheet isn't stacked on top of it.
const SHOW_DELAY_MS = 1500;

let lastNegativeAt = 0;
let pending = false;

/** A cancelled or failed purchase — keeps the review sheet away for a while. */
export function markNegativeMoment(): void {
  lastNegativeAt = Date.now();
}

export async function maybeRequestReview(trigger: ReviewTrigger): Promise<void> {
  if (Platform.OS !== "ios" && Platform.OS !== "android") return;
  if (pending || Date.now() - lastNegativeAt < NEGATIVE_QUIET_MS) return;
  pending = true;
  try {
    const last = Number((await AsyncStorage.getItem(LAST_ASKED_KEY)) ?? 0);
    if (Date.now() - last < MIN_GAP_MS) return;
    if (!(await StoreReview.isAvailableAsync())) return;
    await new Promise((resolve) => setTimeout(resolve, SHOW_DELAY_MS));
    if (Date.now() - lastNegativeAt < NEGATIVE_QUIET_MS) return;
    await AsyncStorage.setItem(LAST_ASKED_KEY, String(Date.now()));
    track("review_prompt", { kind: trigger });
    await StoreReview.requestReview();
  } catch {
    // best-effort — a review sheet that doesn't show is fine
  } finally {
    pending = false;
  }
}
