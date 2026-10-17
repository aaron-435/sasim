/**
 * lib/landingBirth.ts
 * ------------------------------------------------------------------
 * Hands the birth date typed on the landing's type card (LandingTypeCard)
 * to the onboarding wizard so it doesn't ask again (W3, 2026-10-17).
 * sessionStorage only: it dies with the tab and is never put in a URL or
 * sent anywhere. Every access is wrapped because storage can throw (private
 * windows, blocked site data) and the flow must work without it.
 * ------------------------------------------------------------------
 */

const KEY = "fatesaid_landing_dob";

export type LandingBirth = { year: number; month: number; day: number };

export function saveLandingBirth(b: LandingBirth): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(b));
  } catch {
    /* storage unavailable: onboarding simply asks for the date */
  }
}

export function clearLandingBirth(): void {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function loadLandingBirth(): LandingBirth | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    const { year, month, day } = v ?? {};
    if (![year, month, day].every(Number.isInteger)) return null;
    if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) return null;
    return { year, month, day };
  } catch {
    return null;
  }
}
