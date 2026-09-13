import { Platform } from "react-native";
import Purchases, { LOG_LEVEL, type CustomerInfo } from "react-native-purchases";
import { REVENUECAT_API_KEY } from "../config";

/**
 * lib/purchases.ts
 * ------------------------------------------------------------------
 * RevenueCat SDK wrapper, added 2026-09-13 once the RevenueCat project
 * ("fatesaid") and its first entitlement existed. Only the Q&A
 * subscription is wired here — QA_PRO_ENTITLEMENT_ID must match
 * whatever the RevenueCat dashboard's entitlement is actually named.
 *
 * Report unlocks (11 separate one-time-purchase products, one per
 * module) are NOT covered here — those products don't exist in
 * RevenueCat yet, so mobile/lib/reportEntitlement.ts stays a
 * placeholder (isReportUnlocked() always false) until they're added.
 *
 * There is still no purchase button anywhere in the app — this module
 * only lets the app CHECK entitlement status (real, live check against
 * RevenueCat), not buy one. A real subscription only exists today if
 * granted manually from the RevenueCat dashboard (for testing) or
 * through a sandbox purchase made outside this app. Wiring an actual
 * "Subscribe" CTA to Purchases.purchasePackage() is a separate,
 * later step — building one now would repeat the exact dead-affordance
 * bug already fixed once on web's QAChat install button.
 * ------------------------------------------------------------------
 */

export const QA_PRO_ENTITLEMENT_ID = "qa_pro";

let configured = false;

// RevenueCat's RN SDK is native-only (iOS/Android) — no web build exists, and this app's
// `expo start --web` preview target would otherwise crash on the native module lookup.
function isSupportedPlatform(): boolean {
  return Platform.OS === "ios" || Platform.OS === "android";
}

export function configurePurchases(): void {
  if (configured || !isSupportedPlatform()) return;
  configured = true;
  if (__DEV__) Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  Purchases.configure({ apiKey: REVENUECAT_API_KEY });
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!isSupportedPlatform()) return null;
  try {
    return await Purchases.getCustomerInfo();
  } catch (err) {
    console.error("[purchases] failed to get customer info (treating as not entitled)", err);
    return null;
  }
}

export async function hasQaProEntitlement(): Promise<boolean> {
  const info = await getCustomerInfo();
  return !!info?.entitlements.active[QA_PRO_ENTITLEMENT_ID];
}
