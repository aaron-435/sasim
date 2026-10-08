/**
 * lib/i18n/serverLocale.ts
 * ------------------------------------------------------------------
 * One place that decides which language the landing page ("/") is
 * rendered in, on the server (SPEC C0, 2026-10-08):
 *   ?lang=  ->  fatesaid_locale cookie  ->  Accept-Language  ->  en
 * `?lang=` always wins so a shared/canonical URL is pinned to its
 * language. Plain functions, no React/Next imports, so middleware,
 * layout and page can all use it.
 * ------------------------------------------------------------------
 */

import { LOCALES, type Locale } from "./types";

export const LOCALE_COOKIE = "fatesaid_locale";
/** Request header the middleware sets for "/" and /day-master… so layout.tsx can read the resolved language. */
export const LOCALE_HEADER = "x-fs-locale";
/** Set only for "/" so layout.tsx adds the landing canonical/hreflang there and nowhere else. */
export const LANDING_HEADER = "x-fs-landing";

function asLocale(value: string | null | undefined): Locale | null {
  return value && (LOCALES as string[]).includes(value) ? (value as Locale) : null;
}

/** First supported language in an Accept-Language header, by q-weight; null if none match. */
function fromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter((x) => x.tag && x.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (base === "ko" || base === "es" || base === "en") return base;
  }
  return null;
}

export function resolveLocale(input: {
  lang?: string | null;
  cookie?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  return asLocale(input.lang) ?? asLocale(input.cookie) ?? fromAcceptLanguage(input.acceptLanguage) ?? "en";
}
