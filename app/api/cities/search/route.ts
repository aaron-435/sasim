/**
 * app/api/cities/search/route.ts
 * ------------------------------------------------------------------
 * Backs the Skyscanner/Agoda-style city autocomplete in
 * OnboardingWizard.jsx. Keeps lib/worldCities.ts's ~4800-city
 * dataset server-side rather than shipping it to the client bundle —
 * the client only ever sees {id, cityDisplay, countryDisplay} for the
 * handful of matches it needs to render, and later submits back just
 * the chosen `id` (see /api/saju's birthCityId), which the server
 * re-resolves to lat/lng/timezone for the actual saju calculation.
 *
 * (2026-09-04: briefly returned lat/lng too, for an OpenStreetMap
 * confirmation pin on the city step — that map was tried and then
 * dropped, so this went back to the original minimal shape.)
 *
 * (2026-09-13: added an optional `locale` param — cityDisplay/countryDisplay
 * default to Korean names, which looked broken for the native app's new
 * EN/ES modes, e.g. "New York" showing as "뉴욕 · 미국" in an English UI.
 * Any locale other than "ko" gets the English name instead (cityEn/countryEn,
 * already computed by lib/worldCities.ts) — there's no Spanish city/country
 * name map yet, so `es` falls back to English rather than incorrect Korean.
 * Defaults to "ko" when the param is absent, so the web app's existing
 * behavior is unchanged.)
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { searchWorldCities } from "@/lib/worldCities";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const locale = req.nextUrl.searchParams.get("locale") ?? "ko";
  const results = searchWorldCities(q, 8).map((c) => ({
    id: c.id,
    cityDisplay: locale === "ko" ? c.cityDisplay : c.cityEn,
    countryDisplay: locale === "ko" ? c.countryDisplay : c.countryEn,
  }));
  return NextResponse.json({ results });
}
