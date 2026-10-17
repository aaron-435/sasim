/**
 * lib/legalMeta.ts
 * ------------------------------------------------------------------
 * Shared metadata + language rule for /privacy, /terms and /data-deletion
 * (W2, 2026-10-17). These pages render outside AppFlow, so the language is
 * only `?lang=` and a visit without it is Korean (the pre-existing default).
 * Canonical therefore omits the param for ko and spells it for en/es; every
 * language is listed as an alternate, x-default is the bare path. The body
 * text (lib/legalContent.ts) is untouched.
 * ------------------------------------------------------------------
 */

import type { Metadata } from "next";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";

export type LegalPath = "/privacy" | "/terms" | "/data-deletion";

export function legalLocale(lang: string | undefined): Locale {
  return (LOCALES as string[]).includes(lang ?? "") ? (lang as Locale) : "ko";
}

export function legalUrl(path: LegalPath, locale: Locale): string {
  return locale === "ko" ? path : `${path}?lang=${locale}`;
}

export function legalMetadata(path: LegalPath, lang: string | undefined): Metadata {
  const locale = legalLocale(lang);
  const m = getDictionary(locale).meta;
  const title = path === "/privacy" ? m.privacyPageTitle : path === "/terms" ? m.termsPageTitle : m.dataDeletionPageTitle;
  const description =
    path === "/privacy" ? m.privacyPageDescription : path === "/terms" ? m.termsPageDescription : m.dataDeletionPageDescription;
  return {
    title,
    description,
    alternates: {
      canonical: legalUrl(path, locale),
      languages: { ko: legalUrl(path, "ko"), en: legalUrl(path, "en"), es: legalUrl(path, "es"), "x-default": path },
    },
    openGraph: { title, description, url: legalUrl(path, locale), type: "website", images: ["/opengraph-image"] },
  };
}
