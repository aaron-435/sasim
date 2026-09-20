// Report purchase state — real RevenueCat-backed check, added 2026-09-16 once the
// "reports" offering existed (see lib/purchases.ts's header comment for the product/
// entitlement layout: one "report_<moduleId>" entitlement per quiz module, granted by
// either that module's own product or the all-11 bundle product).
import { qaHasAllPurchases } from "../dev/qaMode";
import { getCustomerInfo } from "./purchases";
import { MODULES } from "./quiz/modules";

function entitlementIdFor(moduleId: string): string {
  return `report_${moduleId}`;
}

export async function isReportUnlocked(moduleId: string): Promise<boolean> {
  if (qaHasAllPurchases()) return true; // persona test mode (dev web only)
  const info = await getCustomerInfo();
  return !!info?.entitlements.active[entitlementIdFor(moduleId)];
}

export async function ownedReportCount(): Promise<number> {
  if (qaHasAllPurchases()) return MODULES.length; // persona test mode (dev web only)
  const info = await getCustomerInfo();
  if (!info) return 0;
  return MODULES.filter((m) => !!info.entitlements.active[entitlementIdFor(m.id)]).length;
}
