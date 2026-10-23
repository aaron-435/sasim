/**
 * lib/i18n/paths.ts
 * ------------------------------------------------------------------
 * Language-in-the-path rule for the public SEO pages (SPEC 2026-10-23):
 * English stays at the root (`/day-master/oak`), Korean and Spanish get a
 * prefix (`/ko/day-master/oak`, `/es`). One helper so sitemap, canonical,
 * hreflang, links and middleware cannot drift. Plain functions only.
 * The legal pages and invite links keep `?lang=` (not indexed, and the
 * mobile app links to them that way).
 * ------------------------------------------------------------------
 */

import { LOCALES, type Locale } from "./types";

/** Unprefixed paths that live under the language prefix. */
export function isLocalizedSeoPath(path: string): boolean {
  return path === "/" || path === "/saju-calculator" || path === "/day-master" || path.startsWith("/day-master/") || path === "/guides" || path.startsWith("/guides/");
}

/** `localizedPath("/day-master", "es")` -> `/es/day-master`; the landing is `/es`; English is unchanged. */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Splits a request path into its language prefix (en when absent) and the unprefixed path. */
export function splitLocalePath(pathname: string): { locale: Locale; prefixed: boolean; path: string } {
  const [, first = "", ...rest] = pathname.split("/");
  if ((LOCALES as string[]).includes(first)) {
    return { locale: first as Locale, prefixed: true, path: rest.length ? `/${rest.join("/")}` : "/" };
  }
  return { locale: "en", prefixed: false, path: pathname };
}
