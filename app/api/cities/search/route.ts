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
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { searchWorldCities } from "@/lib/worldCities";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const results = searchWorldCities(q, 8).map((c) => ({
    id: c.id,
    cityDisplay: c.cityDisplay,
    countryDisplay: c.countryDisplay,
  }));
  return NextResponse.json({ results });
}
