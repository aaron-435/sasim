import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticlePage } from "@/components/GuidePage";
import { LOCALES, type Locale } from "@/lib/i18n";
import { GUIDES, getGuide, guideLocales, guidePath } from "@/lib/seoGuides";

// One guide, one language per page, prerendered. A guide missing in a language is 404 there.

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => GUIDES.filter((g) => g.content[locale]).map((g) => ({ locale, slug: g.slug })));
}

type Props = { params: { locale: Locale; slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const { locale, slug } = params;
  const guide = getGuide(slug, locale);
  if (!guide) return {};
  const path = guidePath(slug, locale);
  const languages: Record<string, string> = Object.fromEntries(guideLocales(slug).map((l) => [l, guidePath(slug, l)]));
  languages["x-default"] = guidePath(slug, "en");
  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: { canonical: path, languages },
    openGraph: { title: guide.metaTitle, description: guide.description, url: path, type: "article", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: guide.metaTitle, description: guide.description, images: ["/opengraph-image"] },
  };
}

export default function GuidePage({ params }: Props) {
  if (!getGuide(params.slug, params.locale)) notFound();
  return <GuideArticlePage slug={params.slug} locale={params.locale} />;
}
