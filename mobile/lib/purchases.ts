import { Platform } from "react-native";
import Purchases, {
  LOG_LEVEL,
  PURCHASES_ERROR_CODE,
  type CustomerInfo,
  type PurchasesError,
  type PurchasesPackage,
} from "react-native-purchases";
import { REVENUECAT_API_KEY_ANDROID, REVENUECAT_API_KEY_IOS } from "../config";

/**
 * lib/purchases.ts
 * ------------------------------------------------------------------
 * RevenueCat SDK wrapper, added 2026-09-13 once the RevenueCat project
 * ("fatesaid") and its first entitlement existed. Only the Q&A
 * subscription is wired here — QA_PRO_ENTITLEMENT_ID must match
 * whatever the RevenueCat dashboard's entitlement is actually named
 * (it's "qa_premium" there, not "qa_pro" — the dashboard's setup wizard
 * ended up naming it differently than intended; fixing the code to
 * match the dashboard rather than the other way around, since
 * entitlement identifiers aren't renameable after creation).
 *
 * Report unlocks (11 separate one-time-purchase products, one per
 * module) are NOT covered here — those products don't exist in
 * RevenueCat yet, so mobile/lib/reportEntitlement.ts stays a
 * placeholder (isReportUnlocked() always false) until they're added.
 *
 * 2026-09-14: a real purchase/restore path was added (purchaseQaPro,
 * restoreQaPro) once a real App Store subscription product existed
 * behind the "default" offering's Monthly package — see QAScreen.tsx
 * for where these are called from. Until this point only entitlement
 * CHECKING was real; now buying one through the app is too.
 * ------------------------------------------------------------------
 */

export const QA_PRO_ENTITLEMENT_ID = "qa_premium";

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
  const apiKey = Platform.OS === "ios" ? REVENUECAT_API_KEY_IOS : REVENUECAT_API_KEY_ANDROID;
  Purchases.configure({ apiKey });
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

/** The "default" offering's Monthly package — null if unavailable (offline, misconfigured
 * dashboard, or a platform with no store product attached yet, e.g. Android today). */
export async function getMonthlyPackage(): Promise<PurchasesPackage | null> {
  if (!isSupportedPlatform()) return null;
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.monthly ?? null;
  } catch (err) {
    console.error("[purchases] failed to fetch offerings", err);
    return null;
  }
}

export type PurchaseOutcome = { status: "success" } | { status: "cancelled" } | { status: "error"; message: string };

export async function purchaseQaPro(): Promise<PurchaseOutcome> {
  const pkg = await getMonthlyPackage();
  if (!pkg) return { status: "error", message: "no offering available" };
  try {
    await Purchases.purchasePackage(pkg);
    return { status: "success" };
  } catch (err) {
    const purchasesError = err as PurchasesError;
    if (purchasesError?.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      return { status: "cancelled" };
    }
    console.error("[purchases] purchase failed", err);
    return { status: "error", message: purchasesError?.message ?? "purchase failed" };
  }
}

export async function restoreQaPro(): Promise<boolean> {
  if (!isSupportedPlatform()) return false;
  try {
    const info = await Purchases.restorePurchases();
    return !!info.entitlements.active[QA_PRO_ENTITLEMENT_ID];
  } catch (err) {
    console.error("[purchases] restore failed", err);
    return false;
  }
}
