// Report paywall pricing — 2026-09-11 decision: $14.99 per individual module report.
//
// 2026-09-16: real IAP wired (see lib/purchases.ts's "reports" offering). The original
// design here priced a dynamic "whatever's left, bundled" discount, but neither store
// supports charging a price that depends on which products a customer already owns —
// an IAP product's price is fixed in the dashboard, full stop. So the bundle is now a
// single fixed-price product (report_bundle_all) covering all 11, only ever offered
// before the user owns any of them individually (see ReportScreen.tsx's PaywallPage).
export const REPORT_PRICE = 14.99;
export const TOTAL_MODULES = 11;

/** Must match the report_bundle_all product's real price in App Store Connect / Play
 * Console — this constant only drives the marketing copy (savings %, "buy all" label),
 * it doesn't set the actual charge. */
export const BUNDLE_PRICE = 119.99;

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** What all 11 reports would cost bought one at a time, no discount. */
export function fullIndividualTotal(): number {
  return round2(REPORT_PRICE * TOTAL_MODULES);
}

/** Bundle's savings vs. buying all 11 individually, derived from BUNDLE_PRICE so the
 * displayed percentage can't drift out of sync with the actual bundle price. */
export function bundleDiscountPercent(): number {
  return Math.round((1 - BUNDLE_PRICE / fullIndividualTotal()) * 100);
}

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
