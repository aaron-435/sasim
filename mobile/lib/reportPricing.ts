// Report paywall pricing — 2026-09-11 decision: $14.99 per individual module report,
// with a bundle-upsell discount once the user already owns at least one: the REMAINING
// (not-yet-owned) reports, bundled, at 25% off their individual total.
//
// Payment itself is NOT wired here on purpose — the user explicitly said to hold off on
// real IAP integration until IAP gets connected to the app generally (see
// [[project-fatesaid-native-app-progress]]). This file is pure pricing math, ready to
// slot in once real purchase/entitlement state exists — see reportEntitlement.ts for the
// (currently always-false) placeholder that'll be swapped for real data then.
export const REPORT_PRICE = 14.99;
export const TOTAL_MODULES = 11;
export const BUNDLE_DISCOUNT = 0.25;

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** What all 11 reports would cost bought one at a time, no discount. */
export function fullIndividualTotal(): number {
  return round2(REPORT_PRICE * TOTAL_MODULES);
}

/** Bundle price for whatever's left, once `alreadyOwnedCount` reports are already owned. */
export function remainingBundlePrice(alreadyOwnedCount: number): number {
  const remaining = Math.max(0, TOTAL_MODULES - alreadyOwnedCount);
  return round2(remaining * REPORT_PRICE * (1 - BUNDLE_DISCOUNT));
}

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
