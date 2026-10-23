import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, LOCALE_HEADER, resolveLocale } from "@/lib/i18n/serverLocale";
import { isLocalizedSeoPath, localizedPath, splitLocalePath } from "@/lib/i18n/paths";
import { LOCALES } from "@/lib/i18n/types";

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
  // app/(legal)/layout.tsx reads the locale header for <html lang>; pages resolve again for their body.
  if (!path.startsWith("/api/")) {
    // Public SEO pages carry the language in the path (English at the root, /ko and /es prefixed). The
    // routes live under app/(site)/[locale] (prerendered), so every such URL is rewritten to /<locale>/<path>
    // internally (English too: / -> /en) and the URL is the single
    // source of truth: no cookie or Accept-Language guess here, so one URL is always one language.
    const split = splitLocalePath(path);
    if (isLocalizedSeoPath(split.path)) {
      const legacy = request.nextUrl.searchParams.get("lang");
      // /en/... duplicates the root URL; old ?lang= URLs move to the path form. Both keep other query params.
      if ((split.prefixed && split.locale === "en") || legacy !== null) {
        const target = request.nextUrl.clone();
        const wanted = legacy !== null && (LOCALES as string[]).includes(legacy) ? (legacy as (typeof LOCALES)[number]) : split.locale;
        target.pathname = localizedPath(split.path, wanted);
        target.searchParams.delete("lang");
        return NextResponse.redirect(target, 308);
      }
      const rewritten = request.nextUrl.clone();
      rewritten.pathname = split.path === "/" ? `/${split.locale}` : `/${split.locale}${split.path}`;
      // Only the 404 page reads this (an unknown slug renders inside the locale layout).
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(LOCALE_HEADER, split.locale);
      return NextResponse.rewrite(rewritten, { request: { headers: requestHeaders } });
    }
    // Everything else (legal pages, invite links, unknown URLs -> 404): ?lang= -> cookie -> Accept-Language -> en.
    // A /ko or /es prefix on a non-SEO path just picks the language of the 404 page.
    const locale = split.prefixed
      ? split.locale
      : resolveLocale({
          lang: request.nextUrl.searchParams.get("lang"),
          cookie: request.cookies.get(LOCALE_COOKIE)?.value,
          acceptLanguage: request.headers.get("accept-language"),
        });
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, locale);
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
