/**
 * lib/revenuecat.ts
 * ------------------------------------------------------------------
 * Server-side purchase check against RevenueCat's REST API, for content that must not be
 * handed out to non-buyers. The app gates paid screens on the client only
 * (RevenueCat SDK), which is fine for content that ships inside the app but NOT for
 * anything the server generates on demand. Used by /api/yearReport, /api/compatReport/paid (by transaction) and /api/report-pdf (refuse
 * unless purchased) and by /api/report + /api/report/unlock (the deep report's paid half is
 * withheld / sealed until this check passes — see lib/reportLock.ts).
 *
 * Needs REVENUECAT_SECRET_KEY — a *secret* API key (RevenueCat dashboard → Project settings
 * → API keys → "Secret API key", read access to customer info is enough). NEVER the public
 * SDK keys in mobile/config.ts. Without it every check returns "unconfigured" and the paid
 * endpoint refuses to generate (fail closed).
 * ------------------------------------------------------------------
 */

export type EntitlementCheck = "active" | "inactive" | "unconfigured" | "error";

interface RcEntitlement {
  expires_date?: string | null;
}

export async function checkEntitlement(appUserId: string, entitlementId: string): Promise<EntitlementCheck> {
  const secret = process.env.REVENUECAT_SECRET_KEY;
  if (!secret) return "unconfigured";
  // RevenueCat app user ids look like "$RCAnonymousID:<hex>" or a custom id — reject
  // anything with characters that have no business being in one.
  if (!appUserId || appUserId.length > 200 || /[\s/\\?#]/.test(appUserId)) return "inactive";

  try {
    // REVENUECAT_API_BASE exists only so the check can be exercised against a local stand-in
    // (tests / staging); production leaves it unset and talks to RevenueCat.
    const base = process.env.REVENUECAT_API_BASE || "https://api.revenuecat.com";
    const res = await fetch(`${base}/v1/subscribers/${encodeURIComponent(appUserId)}`, {
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return "error";
    const json = (await res.json()) as { subscriber?: { entitlements?: Record<string, RcEntitlement> } };
    const entitlement = json.subscriber?.entitlements?.[entitlementId];
    if (!entitlement) return "inactive";
    // No expiry = a lifetime / non-consumable purchase.
    if (!entitlement.expires_date) return "active";
    return Date.parse(entitlement.expires_date) > Date.now() ? "active" : "inactive";
  } catch (err) {
    console.error("[revenuecat] entitlement check failed", err);
    return "error";
  }
}

interface RcNonSubscription {
  id?: string;
  store_transaction_id?: string;
}

/** One-time consumable purchases (the compatibility report) grant no entitlement, so they are
 * checked by transaction instead: is `transactionId` one of this user's purchases of any of
 * `productIds`? Matches RevenueCat's own id or the store's transaction id, since the SDK hands
 * the app one or the other depending on the platform. Same fail-closed results as above; when found,
 * `purchaseId` is RevenueCat's own id for the purchase, so either spelling maps to one record. */
export async function checkConsumablePurchase(
  appUserId: string,
  productIds: readonly string[],
  transactionId: string
): Promise<{ status: EntitlementCheck; purchaseId?: string }> {
  const secret = process.env.REVENUECAT_SECRET_KEY;
  if (!secret) return { status: "unconfigured" };
  if (!appUserId || appUserId.length > 200 || /[\s/\\?#]/.test(appUserId)) return { status: "inactive" };
  if (!transactionId || transactionId.length > 200) return { status: "inactive" };

  try {
    const base = process.env.REVENUECAT_API_BASE || "https://api.revenuecat.com";
    const res = await fetch(`${base}/v1/subscribers/${encodeURIComponent(appUserId)}`, {
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return { status: "error" };
    const json = (await res.json()) as { subscriber?: { non_subscriptions?: Record<string, RcNonSubscription[]> } };
    const purchases = json.subscriber?.non_subscriptions ?? {};
    const found = productIds.flatMap((product) => purchases[product] ?? []).find((p) => p.id === transactionId || p.store_transaction_id === transactionId);
    return found ? { status: "active", purchaseId: found.id || found.store_transaction_id || transactionId } : { status: "inactive" };
  } catch (err) {
    console.error("[revenuecat] purchase check failed", err);
    return { status: "error" };
  }
}

export function yearReportEntitlementId(year: number): string {
  return `year_report_${year}`;
}
