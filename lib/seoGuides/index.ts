import type { Locale } from "@/lib/i18n/types";
import { localizedPath } from "@/lib/i18n/paths";
import type { Guide, GuideDef } from "./types";
import fiveElementsCompatibility from "./fiveElementsCompatibility";
import sajuVsAstrology from "./sajuVsAstrology";
import howToReadFourPillars from "./howToReadFourPillars";

// Topic guides beyond the Day Master articles (SEO_CONTENT_PLAN.md). A guide is published in every
// language it has content for; a language with no entry has no page, sitemap URL or hreflang.
export const GUIDES: GuideDef[] = [
  { slug: "saju-compatibility-five-elements", related: ["oak", "field", "ocean", "flame"], content: fiveElementsCompatibility },
  { slug: "saju-vs-astrology", related: ["sun", "dew"], content: sajuVsAstrology },
  { slug: "how-to-read-saju-four-pillars", related: ["oak", "mountain", "gem"], content: howToReadFourPillars },
];

export function findGuide(slug: string): GuideDef | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuide(slug: string, locale: Locale): Guide | undefined {
  return findGuide(slug)?.content[locale];
}

/** Languages a guide is written in, for hreflang and the sitemap. */
export function guideLocales(slug: string): Locale[] {
  const g = findGuide(slug);
  return g ? (Object.keys(g.content) as Locale[]) : [];
}

/** Languages in which the guides index exists: any language that has at least one guide. */
export function guidesIndexLocales(): Locale[] {
  return (["en", "ko", "es"] as Locale[]).filter((l) => GUIDES.some((g) => g.content[l]));
}

export function guidePath(slug: string, locale: Locale): string {
  return localizedPath(`/guides/${slug}`, locale);
}

export function guidesListPath(locale: Locale): string {
  return localizedPath("/guides", locale);
}

export const GUIDES_UI: Partial<Record<Locale, { listMetaTitle: string; listMetaDescription: string; listTitle: string; listLead: string; backToList: string; relatedTitle: string }>> = {
  en: {
    listMetaTitle: "Saju Guides: Compatibility, Four Pillars and More | Fatesaid",
    listMetaDescription: "Plain-language guides to saju, the Korean Four Pillars: how to read your chart, how it compares with astrology, and how the Five Elements relate between people.",
    listTitle: "Saju guides",
    listLead: "Short, plain-language guides to saju, the Korean form of the Four Pillars. Start with how to read your chart, or jump to compatibility and how saju compares with astrology.",
    backToList: "All saju guides",
    relatedTitle: "Read about the Day Masters",
  },
  es: {
    listMetaTitle: "Guías de saju: compatibilidad, Cuatro Pilares y más | Fatesaid",
    listMetaDescription: "Guías claras sobre el saju, los Cuatro Pilares coreanos: cómo leer tu mapa, cómo se compara con la astrología y cómo se relacionan los cinco elementos entre personas.",
    listTitle: "Guías de saju",
    listLead: "Guías breves y claras sobre el saju, la versión coreana de los Cuatro Pilares. Empieza por cómo leer tu mapa o ve directo a la compatibilidad y a cómo se compara el saju con la astrología.",
    backToList: "Todas las guías de saju",
    relatedTitle: "Lee sobre los Maestros del Día",
  },
};
