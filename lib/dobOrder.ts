import type { Locale } from "./i18n/types";

export type DobField = "year" | "month" | "day";

// A wrong order is not a cosmetic slip here: 03/04 typed as March 4 instead of April 3 is a
// different birth date and therefore a different saju chart. So the order follows the person's
// own region, not just the app language:
//   - ko: year / month / day
//   - en, es: whatever order the device's region uses for numeric dates — month/day/year in the
//     US (also for Spanish speakers there), day/month/year in the UK, Spain, Mexico and most of
//     Latin America. When the device region is year-first (or unknown), fall back to the
//     language's usual convention: en → month/day/year, es → day/month/year.
// State and submitted values stay year/month/day (ISO) regardless.
export function dobFieldOrder(locale: Locale): DobField[] {
  if (locale === "ko") return ["year", "month", "day"];
  try {
    const parts = new Intl.DateTimeFormat(undefined).formatToParts(new Date(2000, 10, 25));
    const order = parts
      .map((p) => p.type)
      .filter((t): t is DobField => t === "year" || t === "month" || t === "day");
    if (order.length === 3 && order[0] !== "year") return order;
  } catch {
    // Intl unavailable — use the language default below.
  }
  return locale === "es" ? ["day", "month", "year"] : ["month", "day", "year"];
}

export function dobSeparator(locale: Locale): string {
  return locale === "ko" ? "." : "/";
}
