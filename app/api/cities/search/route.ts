/**
 * app/api/cities/search/route.ts
 * ------------------------------------------------------------------
 * Backs the Skyscanner/Agoda-style city autocomplete in
 * OnboardingWizard.jsx. Keeps lib/worldCities.ts's ~4800-city
 * dataset server-side rather than shipping it to the client bundle —
 * the client only ever sees the handful of matches it needs to
 * render, and later submits back just the chosen `id` (see
 * /api/saju's birthCityId), which the server re-resolves to
 * lat/lng/timezone for the actual saju calculation.
 *
 * lat/lng ARE included in each result (added 2026-09-04) so the
 * onboarding city step can render a confirmation map pin right after
 * selection — city-level coordinates aren't sensitive on their own
 * (no different from cityDisplay/countryDisplay already being
 * public), unlike the precise birth data those coordinates get
 * combined with server-side.
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
    lat: c.lat,
    lng: c.lng,
  }));
  return NextResponse.json({ results });
}
