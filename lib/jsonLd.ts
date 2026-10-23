/**
 * lib/jsonLd.ts
 * ------------------------------------------------------------------
 * schema.org JSON-LD builders for the public SEO pages (SPEC 2026-10-23, TODO 4). Plain objects only;
 * `components/JsonLd.tsx` renders them. URLs go through `localizedPath` so they match canonical/hreflang.
 * ------------------------------------------------------------------
 */

import { SITE_ORIGIN } from "@/lib/seoArticles";

export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.fatesaid.app";

type Node = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
}

export function organizationLd(): Node {
  return { "@context": "https://schema.org", "@type": "Organization", name: "Fatesaid", url: SITE_ORIGIN };
}

export function webSiteLd(locale: string): Node {
  return { "@context": "https://schema.org", "@type": "WebSite", name: "Fatesaid", url: SITE_ORIGIN, inLanguage: locale };
}

/** The app is on Google Play only for now; add iOS to `operatingSystem` once the App Store listing is live. */
export function mobileApplicationLd(args: { description: string; locale: string }): Node {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Fatesaid",
    description: args.description,
    inLanguage: args.locale,
    operatingSystem: "Android",
    applicationCategory: "LifestyleApplication",
    installUrl: PLAY_STORE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function webApplicationLd(args: { name: string; description: string; path: string; locale: string }): Node {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path),
    inLanguage: args.locale,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Fatesaid", url: SITE_ORIGIN },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

/** Only for a FAQ that is visible on the page. */
export function faqLd(items: { q: string; a: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
}

export function itemListLd(items: { name: string; path: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}
