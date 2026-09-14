import { NextResponse, type NextRequest } from "next/server";

/**
 * Adds a permissive CORS header to every /api/* response and answers the
 * preflight OPTIONS request browsers send before certain cross-origin
 * calls (e.g. a POST with a JSON body, like /api/saju).
 *
 * All of these routes are already public/unauthenticated (no cookies or
 * bearer tokens read here) and the ones that accept writes are already
 * rate-limited (see lib/rateLimit.ts) — CORS only gates whether a
 * browser page on another origin may read the response, not whether a
 * request can be made at all, so this doesn't open any access that
 * curl/the native app didn't already have. Added specifically so the
 * mobile app's `expo start --web` preview (a different origin,
 * localhost:8082) can exercise the real onboarding flow instead of only
 * the actual native builds, where CORS (a browser-only mechanism) never
 * applied in the first place.
 */
export function middleware(request: NextRequest) {
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
