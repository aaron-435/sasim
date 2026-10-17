import { NextResponse, type NextRequest } from "next/server";
import { LANDING_HEADER, LOCALE_COOKIE, LOCALE_HEADER, resolveLocale } from "@/lib/i18n/serverLocale";

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
  const path = request.nextUrl.pathname;
  // Every page route (landing, day-master, calculator, legal, unknown URLs -> 404) resolves the language
  // the same way, once, here: ?lang= -> cookie -> Accept-Language -> en. app/layout.tsx reads the header for
  // <html lang>; pages resolve again for their body with the same helper, so the two always agree.
  if (!path.startsWith("/api/")) {
    const locale = resolveLocale({
      lang: request.nextUrl.searchParams.get("lang"),
      cookie: request.cookies.get(LOCALE_COOKIE)?.value,
      acceptLanguage: request.headers.get("accept-language"),
    });
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, locale);
    if (path === "/") requestHeaders.set(LANDING_HEADER, "1");
    // No Vary here: Next overwrites it, and the page is sent "private, no-store" (it reads
    // headers/cookies), so shared caches never keep one language's HTML for another visitor.
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

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
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
