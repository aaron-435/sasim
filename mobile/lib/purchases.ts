import { Platform } from "react-native";
import Purchases, {
  LOG_LEVEL,
  PURCHASES_ERROR_CODE,
  type CustomerInfo,
  type PurchasesError,
  type PurchasesPackage,
} from "react-native-purchases";
import { REVENUECAT_API_KEY_ANDROID, REVENUECAT_API_KEY_IOS } from "../config";
import { qaHasAllPurchases, qaHasSubscription } from "../dev/qaMode";

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
 *
 * 2026-09-16: report-unlock purchases added (purchaseReportModule,
 * purchaseReportBundle) — these are non-subscription ("lifetime")
 * products, not the "default" offering, so they live behind a separate
 * "reports" offering: 11 packages identified by quiz module id
 * ("module1".."module11", one per lib/quiz/modules.ts entry) plus
 * REPORT_BUNDLE_PACKAGE_ID for the all-11 bundle. Each per-module
 * product is attached (in the RevenueCat dashboard) to its own
 * "report_<moduleId>" entitlement; the bundle product is attached to
 * all 11 of those entitlements at once, so buying it unlocks everything
 * in a single purchase. See lib/reportEntitlement.ts for the read side.
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
  if (qaHasSubscription()) return true; // persona test mode (dev web only, see dev/qaMode.ts)
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

async function purchasePackage(pkg: PurchasesPackage): Promise<PurchaseOutcome> {
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

export async function purchaseQaPro(): Promise<PurchaseOutcome> {
  const pkg = await getMonthlyPackage();
  if (!pkg) return { status: "error", message: "no offering available" };
  return purchasePackage(pkg);
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

export type ReportPackageMap = Record<string, PurchasesPackage>;

/** Purchasing this package's product unlocks all 11 report entitlements at once —
 * see the header comment above for how that's wired in the RevenueCat dashboard. */
export const REPORT_BUNDLE_PACKAGE_ID = "report_bundle_all";

/** The "reports" offering's packages, keyed by RevenueCat package identifier (a quiz
 * module id, or REPORT_BUNDLE_PACKAGE_ID) — null if unavailable (offline, the dashboard
 * offering not configured yet, or a platform with no store product attached). */
export async function getReportPackages(): Promise<ReportPackageMap | null> {
  if (!isSupportedPlatform()) return null;
  try {
    const offerings = await Purchases.getOfferings();
    const offering = offerings.all["reports"];
    if (!offering) {
      lastOfferingsIssue = `offering "reports" not found (found: ${Object.keys(offerings.all).join(", ") || "none"})`;
      return null;
    }
    const map: ReportPackageMap = {};
    for (const pkg of offering.availablePackages) map[pkg.identifier] = pkg;
    lastOfferingsIssue = Object.keys(map).length ? null : 'offering "reports" has no purchasable packages';
    return map;
  } catch (err) {
    const e = err as PurchasesError & { underlyingErrorMessage?: string };
    lastOfferingsIssue = `${e?.code ?? "?"} ${e?.message ?? ""} ${e?.underlyingErrorMessage ?? ""}`.trim().slice(0, 220);
    console.error("[purchases] failed to fetch report offerings", err);
    return null;
  }
}

/** Why the last offerings/package lookup failed — shown (small) under the "can't buy right now"
 * message so a failing store setup can be diagnosed from a screenshot of a TestFlight build. */
let lastOfferingsIssue: string | null = null;
function unavailable(detail?: string): PurchaseOutcome {
  const why = detail ?? lastOfferingsIssue;
  return { status: "error", message: `no offering available${why ? ` | ${why}` : ""}` };
}
/** The diagnostic part of an "unavailable" message ("" when there is none). */
export function purchaseIssueDetail(message: string): string {
  const i = message.indexOf(" | ");
  return i >= 0 ? message.slice(i + 3) : "";
}
export function isUnavailableMessage(message: string): boolean {
  return message.startsWith("no offering available");
}

export async function purchaseReportModule(moduleId: string): Promise<PurchaseOutcome> {
  const packages = await getReportPackages();
  const pkg = packages?.[moduleId];
  if (!pkg) return unavailable(packages ? `package "${moduleId}" not in offering (has: ${Object.keys(packages).join(", ")})` : undefined);
  return purchasePackage(pkg);
}

// ---- Year-ahead report (one-time purchase, one product per year) --------------------
// Package id and entitlement id are both `year_report_<year>` — the "reports" offering
// gets one more package per year, and the server (lib/revenuecat.ts) checks the same
// entitlement id before it generates the report.
export function yearReportId(year: number): string {
  return `year_report_${year}`;
}

export async function hasYearReportEntitlement(year: number): Promise<boolean> {
  if (qaHasAllPurchases()) return true; // persona test mode (dev web only)
  const info = await getCustomerInfo();
  return !!info?.entitlements.active[yearReportId(year)];
}

export async function getYearReportPackage(year: number): Promise<PurchasesPackage | null> {
  const packages = await getReportPackages();
  return packages?.[yearReportId(year)] ?? null;
}

export async function purchaseYearReport(year: number): Promise<PurchaseOutcome> {
  const packages = await getReportPackages();
  const pkg = packages?.[yearReportId(year)];
  if (!pkg) return unavailable(packages ? `package "${yearReportId(year)}" not in offering (has: ${Object.keys(packages).join(", ")})` : undefined);
  return purchasePackage(pkg);
}

/** RevenueCat's id for this install — sent to the server so it can verify a purchase. */
export async function getRevenueCatUserId(): Promise<string | null> {
  if (!isSupportedPlatform()) return null;
  try {
    return await Purchases.getAppUserID();
  } catch {
    return null;
  }
}

export async function purchaseReportBundle(): Promise<PurchaseOutcome> {
  const packages = await getReportPackages();
  const pkg = packages?.[REPORT_BUNDLE_PACKAGE_ID];
  if (!pkg) return unavailable(packages ? `package "${REPORT_BUNDLE_PACKAGE_ID}" not in offering (has: ${Object.keys(packages).join(", ")})` : undefined);
  return purchasePackage(pkg);
}

/** Reports have no single entitlement to check post-restore (unlike restoreQaPro's
 * qa_premium) — the caller re-reads isReportUnlocked()/ownedReportCount() itself after
 * this resolves, since "what got restored" depends on which module the caller cares
 * about right now. */
export async function restoreReports(): Promise<boolean> {
  if (!isSupportedPlatform()) return false;
  try {
    await Purchases.restorePurchases();
    return true;
  } catch (err) {
    console.error("[purchases] restore failed", err);
    return false;
  }
}
