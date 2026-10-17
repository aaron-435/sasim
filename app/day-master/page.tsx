import type { Metadata } from "next";
import { DayMasterListPage } from "@/components/DayMasterPage";
import { explicitLocale, requestLocale } from "@/lib/seoArticles/requestLocale";
import { ARTICLE_UI } from "@/lib/seoArticles/ui";
import { listPath } from "@/lib/seoArticles";

// Index of the Day Master articles (SPEC C1). Language: ?lang= → cookie → Accept-Language → en.

type Props = { searchParams?: { lang?: string } };

export function generateMetadata({ searchParams }: Props): Metadata {
  const locale = requestLocale(searchParams?.lang);
  const ui = ARTICLE_UI[locale];
  // Canonical follows the URL's own ?lang= (bare path = English), the same rule the sitemap uses, even
  // when a cookie/Accept-Language makes the body Korean or Spanish; otherwise "/day-master" would
  // canonicalize to "/day-master?lang=ko" while the sitemap lists "/day-master" as the English page.
  const canonicalLocale = explicitLocale(searchParams?.lang);
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

export default function DayMasterIndex({ searchParams }: Props) {
  return <DayMasterListPage locale={requestLocale(searchParams?.lang)} />;
}
