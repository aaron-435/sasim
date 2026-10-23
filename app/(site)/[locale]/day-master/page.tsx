import type { Metadata } from "next";
import { DayMasterListPage } from "@/components/DayMasterPage";
import type { Locale } from "@/lib/i18n";
import { ARTICLE_UI } from "@/lib/seoArticles/ui";
import { listPath } from "@/lib/seoArticles";

// Index of the Day Master articles (SPEC C1). One prerendered page per language; the language is the path segment.

type Props = { params: { locale: Locale } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = params.locale;
  const ui = ARTICLE_UI[locale];
  const canonicalLocale = locale;
  return {
    title: ui.listMetaTitle,
    description: ui.listMetaDescription,
    alternates: {
      canonical: listPath(canonicalLocale),
      languages: { en: listPath("en"), ko: listPath("ko"), es: listPath("es"), "x-default": listPath("en") },
    },
    openGraph: { title: ui.listMetaTitle, description: ui.listMetaDescription, url: listPath(canonicalLocale), type: "website", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: ui.listMetaTitle, description: ui.listMetaDescription, images: ["/opengraph-image"] },
  };
}

export default function DayMasterIndex({ params }: Props) {
  return <DayMasterListPage locale={params.locale} />;
}
