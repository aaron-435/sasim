import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DayMasterArticlePage } from "@/components/DayMasterPage";
import type { Locale } from "@/lib/i18n";
import { articlePath, getArticle, publishedDayMasters } from "@/lib/seoArticles";

// One Day Master, one language per page (SPEC C1), prerendered. Unknown or unpublished slugs are 404.

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedDayMasters().map((d) => ({ type: d.slug }));
}

type Props = { params: { locale: Locale; type: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = params.locale;
  const article = getArticle(params.type, locale);
  if (!article) return {};
  const path = articlePath(params.type, locale);
  return {
    title: article.metaTitle,
    description: article.description,
    alternates: {
      canonical: path,
      languages: {
        en: articlePath(params.type, "en"),
        ko: articlePath(params.type, "ko"),
        es: articlePath(params.type, "es"),
        "x-default": articlePath(params.type, "en"),
      },
    },
    openGraph: { title: article.metaTitle, description: article.description, url: path, type: "article", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: article.metaTitle, description: article.description, images: ["/opengraph-image"] },
  };
}

export default function DayMasterArticle({ params }: Props) {
  const locale = params.locale;
  if (!getArticle(params.type, locale)) notFound();
  return <DayMasterArticlePage slug={params.type} locale={locale} />;
}
