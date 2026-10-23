import type { Metadata } from "next";
import SajuCalculator from "@/components/SajuCalculator";
import { getDictionary, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/paths";

// Free "Saju / Four Pillars calculator" tool page (SPEC 2026-10-05 §2). One prerendered page per language
// (/saju-calculator, /ko/..., /es/...); the language is the path segment.

type Props = { params: { locale: Locale } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = params.locale;
  const c = getDictionary(locale).calculator;
  const path = localizedPath("/saju-calculator", locale);
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

export default function SajuCalculatorPage({ params }: Props) {
  return <SajuCalculator locale={params.locale} />;
}
