import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import AppFlow from "@/components/AppFlow";
import { getDictionary, LocaleProvider, type Locale } from "@/lib/i18n";
import { LOCALE_COOKIE, resolveLocale } from "@/lib/i18n/serverLocale";

// Landing is rendered in the visitor's language on the server (SPEC C0): ?lang= -> cookie ->
// Accept-Language -> en. Canonical/hreflang follow the same URLs as /saju-calculator's rule.

type Props = { searchParams?: { lang?: string } };

function pickLocale(searchParams: Props["searchParams"]): Locale {
  return resolveLocale({
    lang: searchParams?.lang,
    cookie: cookies().get(LOCALE_COOKIE)?.value,
    acceptLanguage: headers().get("accept-language"),
  });
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const locale = pickLocale(searchParams);
  const meta = getDictionary(locale).meta;
  // canonical/hreflang for "/" are emitted by app/layout.tsx: Next drops the query of "/?lang="
  // when it resolves metadata alternates for the root path.
  return {
    title: meta.siteTitle,
    description: meta.siteDescription,
    openGraph: { title: meta.siteTitle, description: meta.siteDescription, type: "website", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: meta.siteTitle, description: meta.siteDescription, images: ["/opengraph-image"] },
  };
}

export default function Home({ searchParams }: Props) {
  return (
    <LocaleProvider initialLocale={pickLocale(searchParams)}>
      <AppFlow />
    </LocaleProvider>
  );
}
