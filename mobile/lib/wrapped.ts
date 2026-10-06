import { qaDateOverride } from "../dev/qaMode";

// Year Wrapped (연말 회고, 2026-10-06): Home shows the entry from December 1 to January 31 by
// the device's own date. December looks back on the year now ending; January on the one that
// just ended. The persona test mode can fake the date with `?date=` (dev web only).

export function wrappedYearFor(date: Date): number | null {
  const month = date.getMonth() + 1;
  if (month === 12) return date.getFullYear();
  if (month === 1) return date.getFullYear() - 1;
  return null;
}

/** The year to look back on today, or null outside the December–January window. */
export function currentWrappedYear(): number | null {
  return wrappedYearFor(qaDateOverride() ?? new Date());
}
