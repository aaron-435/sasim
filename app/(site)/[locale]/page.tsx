import type { Metadata } from "next";
import AppFlow from "@/components/AppFlow";
import JsonLd from "@/components/JsonLd";
import { faqLd, mobileApplicationLd, organizationLd, webSiteLd } from "@/lib/jsonLd";
import { getDictionary, LOCALES, LocaleProvider, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/paths";

// Landing, one prerendered page per language (/, /ko, /es). The language is the path segment, so there is
// no cookie / Accept-Language guess and nothing here makes the page dynamic.

type Props = { params: { locale: Locale } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = params.locale;
  const meta = getDictionary(locale).meta;
  const path = localizedPath("/", locale);
  return {
    title: meta.landingTitle,
    description: meta.siteDescription,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [l, localizedPath("/", l)])), "x-default": localizedPath("/", "en") },
    },
    openGraph: { title: meta.landingTitle, description: meta.siteDescription, url: path, type: "website", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: meta.landingTitle, description: meta.siteDescription, images: ["/opengraph-image"] },
  };
}

export default function Home({ params }: Props) {
  const dict = getDictionary(params.locale);
  return (
    <LocaleProvider initialLocale={params.locale}>
      <JsonLd data={[organizationLd(), webSiteLd(params.locale), mobileApplicationLd({ description: dict.meta.siteDescription, locale: params.locale }), faqLd(dict.landing.faq)]} />
      <AppFlow />
    </LocaleProvider>
  );
}
