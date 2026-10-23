import type { Metadata } from "next";
import SajuCalculator from "@/components/SajuCalculator";
import { requestLocale } from "@/lib/seoArticles/requestLocale";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/paths";

// Free "Saju / Four Pillars calculator" tool page (SPEC 2026-10-05 §2). Search visitors are
// mostly English-speaking, so a visit without `?lang=` follows cookie / Accept-Language (English fallback); `?lang=ko|es` serve the
// other two (same query convention as the legal pages, which also live outside AppFlow).

type Props = { searchParams?: { lang?: string } };

// Body language: ?lang= -> cookie -> Accept-Language -> en. Canonical follows ?lang= only (bare = English).
function pickLocale(lang: string | undefined): Locale {
  return requestLocale(lang);
}
function canonicalLocale(lang: string | undefined): Locale {
  return (LOCALES as string[]).includes(lang ?? "") ? (lang as Locale) : "en";
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const locale = pickLocale(searchParams?.lang);
  const c = getDictionary(locale).calculator;
  const canon = canonicalLocale(searchParams?.lang);
  const path = localizedPath("/saju-calculator", canon);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: path,
      languages: { en: localizedPath("/saju-calculator", "en"), ko: localizedPath("/saju-calculator", "ko"), es: localizedPath("/saju-calculator", "es"), "x-default": localizedPath("/saju-calculator", "en") },
    },
    // A page-level openGraph replaces the root one, so the shared preview image is named again here.
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: path, type: "website", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription, images: ["/opengraph-image"] },
  };
}

export default function SajuCalculatorPage({ searchParams }: Props) {
  return <SajuCalculator locale={pickLocale(searchParams?.lang)} />;
}
