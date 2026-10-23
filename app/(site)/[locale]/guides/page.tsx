import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { GuidesListPage } from "@/components/GuidePage";
import { getDictionary, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/paths";
import { breadcrumbLd, itemListLd } from "@/lib/jsonLd";
import { GUIDES, GUIDES_UI, guidePath, guidesIndexLocales, guidesListPath } from "@/lib/seoGuides";

// Index of the topic guides. Only languages that have guides exist; others are 404.

export const dynamicParams = false;

type Props = { params: { locale: Locale } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = params.locale;
  const ui = GUIDES_UI[locale];
  if (!ui) return {};
  const languages: Record<string, string> = Object.fromEntries(guidesIndexLocales().map((l) => [l, guidesListPath(l)]));
  languages["x-default"] = guidesListPath("en");
  return {
    title: ui.listMetaTitle,
    description: ui.listMetaDescription,
    alternates: { canonical: guidesListPath(locale), languages },
    openGraph: { title: ui.listMetaTitle, description: ui.listMetaDescription, url: guidesListPath(locale), type: "website", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: ui.listMetaTitle, description: ui.listMetaDescription, images: ["/opengraph-image"] },
  };
}

export default function GuidesIndex({ params }: Props) {
  const locale = params.locale;
  const ui = GUIDES_UI[locale];
  if (!ui) notFound();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: getDictionary(locale).common.brand, path: localizedPath("/", locale) }, { name: ui.listTitle, path: guidesListPath(locale) }]),
          itemListLd(GUIDES.filter((g) => g.content[locale]).map((g) => ({ name: g.content[locale]!.h1, path: guidePath(g.slug, locale) }))),
        ]}
      />
      <GuidesListPage locale={locale} />
    </>
  );
}
