// Report paywall pricing — 2026-09-11 decision: $14.99 per individual module report.
//
// 2026-09-16: real IAP wired (see lib/purchases.ts's "reports" offering). The original
// design here priced a dynamic "whatever's left, bundled" discount, but neither store
// supports charging a price that depends on which products a customer already owns —
// an IAP product's price is fixed in the dashboard, full stop. So the bundle is now a
// single fixed-price product (report_bundle_all) covering every module, only ever offered
// before the user owns all of them (see ReportScreen.tsx's PaywallPage).
//
// 2026-10-06 (TODO 12): module12 joined the list, so the count comes from MODULES, and the
// paywall reads prices from the store packages (reportPriceLabels). The USD constants below
// are only the fallback for mobile-web / an offering that didn't load.
import type { ReportPackageMap } from "./purchases";
import { REPORT_BUNDLE_PACKAGE_ID } from "./purchases";
import { MODULES } from "./quiz/modules";

export const REPORT_PRICE = 14.99;
export const TOTAL_MODULES = MODULES.length;

/** Fallback only — must match the report_bundle_all product's real price in App Store
 * Connect / Play Console. The paywall prefers the store's own price (reportPriceLabels). */
export const BUNDLE_PRICE = 119.99;

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** What every report would cost bought one at a time, no discount. */
export function fullIndividualTotal(): number {
  return round2(REPORT_PRICE * TOTAL_MODULES);
}

/** Bundle's savings vs. buying every report individually, derived from BUNDLE_PRICE so the
 * displayed percentage can't drift out of sync with the actual bundle price. */
export function bundleDiscountPercent(): number {
  return Math.round((1 - BUNDLE_PRICE / fullIndividualTotal()) * 100);
}

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export interface ReportPriceLabels {
  module: string;
  bundle: string;
  /** Every report bought one at a time. */
  fullTotal: string;
  discountPercent: number;
}

function formatMoney(amount: number, currencyCode: string, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
}

/** Paywall prices from the "reports" offering (localized `priceString`, STYLE_GUIDE rule).
 * The "if bought separately" total and the % come from the two packages' numeric prices in
 * the store currency. Falls back to the USD constants per price that isn't available. */
export function reportPriceLabels(packages: ReportPackageMap | null, moduleId: string, locale: string): ReportPriceLabels {
  const modulePkg = packages?.[moduleId]?.product;
  const bundlePkg = packages?.[REPORT_BUNDLE_PACKAGE_ID]?.product;
  const fallback: ReportPriceLabels = {
    module: modulePkg?.priceString ?? formatUsd(REPORT_PRICE),
    bundle: bundlePkg?.priceString ?? formatUsd(BUNDLE_PRICE),
    fullTotal: formatUsd(fullIndividualTotal()),
    discountPercent: bundleDiscountPercent(),
  };
  if (!modulePkg || !bundlePkg || modulePkg.currencyCode !== bundlePkg.currencyCode || modulePkg.price <= 0) return fallback;
  const total = round2(modulePkg.price * TOTAL_MODULES);
  return {
    module: modulePkg.priceString,
    bundle: bundlePkg.priceString,
    fullTotal: formatMoney(total, modulePkg.currencyCode, locale),
    discountPercent: Math.max(0, Math.round((1 - bundlePkg.price / total) * 100)),
  };
}
