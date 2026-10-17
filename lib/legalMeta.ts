/**
 * lib/legalMeta.ts
 * ------------------------------------------------------------------
 * Shared metadata + language rule for /privacy, /terms and /data-deletion
 * (W2, 2026-10-17). These pages render outside AppFlow, so the language is
 * resolved like the other public pages (?lang= -> cookie -> Accept-Language -> en).
 * Canonical omits the param for en and spells it for ko/es; every
 * language is listed as an alternate, x-default is the bare path. The body
 * text (lib/legalContent.ts) is untouched.
 * ------------------------------------------------------------------
 */

import type { Metadata } from "next";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { requestLocale } from "@/lib/seoArticles/requestLocale";

export type LegalPath = "/privacy" | "/terms" | "/data-deletion";

/** Body language: ?lang= -> cookie -> Accept-Language -> en (same as every other public page). */
export function legalLocale(lang: string | undefined): Locale {
  return requestLocale(lang);
}

/** Canonical language: only what the URL itself names; a bare URL is the English one (same as the calculator). */
function canonicalLocale(lang: string | undefined): Locale {
  return (LOCALES as string[]).includes(lang ?? "") ? (lang as Locale) : "en";
}

export function legalUrl(path: LegalPath, locale: Locale): string {
  return locale === "en" ? path : `${path}?lang=${locale}`;
}

export function legalMetadata(path: LegalPath, lang: string | undefined): Metadata {
  const locale = legalLocale(lang);
  const canon = canonicalLocale(lang);
  const m = getDictionary(locale).meta;
  const title = path === "/privacy" ? m.privacyPageTitle : path === "/terms" ? m.termsPageTitle : m.dataDeletionPageTitle;
  const description =
    path === "/privacy" ? m.privacyPageDescription : path === "/terms" ? m.termsPageDescription : m.dataDeletionPageDescription;
  return {
    title,
    description,
    alternates: {
      canonical: legalUrl(path, canon),
      languages: { ko: legalUrl(path, "ko"), en: legalUrl(path, "en"), es: legalUrl(path, "es"), "x-default": path },
    },
    openGraph: { title, description, url: legalUrl(path, canon), type: "website", images: ["/opengraph-image"] },
  };
}
