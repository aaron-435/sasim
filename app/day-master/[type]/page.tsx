import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DayMasterArticlePage } from "@/components/DayMasterPage";
import { requestLocale } from "@/lib/seoArticles/requestLocale";
import { articlePath, getArticle } from "@/lib/seoArticles";

// One Day Master, one language per page (SPEC C1). Unknown or unpublished slugs are 404.

type Props = { params: { type: string }; searchParams?: { lang?: string } };

export function generateMetadata({ params, searchParams }: Props): Metadata {
  const locale = requestLocale(searchParams?.lang);
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

export default function DayMasterArticle({ params, searchParams }: Props) {
  const locale = requestLocale(searchParams?.lang);
  if (!getArticle(params.type, locale)) notFound();
  return <DayMasterArticlePage slug={params.type} locale={locale} />;
}
