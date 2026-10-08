import type { Locale } from "@/lib/i18n/types";
import { LOCALES } from "@/lib/i18n/types";
import { SAJU_TYPE_CONTENT } from "@/lib/sajuTypeContent";
import type { ArchetypeKey } from "@/lib/sajuType";
import type { ArticleSet, DayMasterArticle } from "./types";
import oak from "./oak";

export const SITE_ORIGIN = "https://www.fatesaidapp.com";

/** The ten Day Masters in stem order (갑 … 계). `slug` is the URL segment and the app's archetype key. */
export const DAY_MASTERS: {
  slug: ArchetypeKey;
  /** Korean stem reading, hanja, polarity and element — used in titles and the list. */
  stem: string;
  hanja: string;
  yang: boolean;
  element: "wood" | "fire" | "earth" | "metal" | "water";
}[] = [
  { slug: "oak", stem: "갑", hanja: "甲", yang: true, element: "wood" },
  { slug: "vine", stem: "을", hanja: "乙", yang: false, element: "wood" },
  { slug: "sun", stem: "병", hanja: "丙", yang: true, element: "fire" },
  { slug: "flame", stem: "정", hanja: "丁", yang: false, element: "fire" },
  { slug: "mountain", stem: "무", hanja: "戊", yang: true, element: "earth" },
  { slug: "field", stem: "기", hanja: "己", yang: false, element: "earth" },
  { slug: "steel", stem: "경", hanja: "庚", yang: true, element: "metal" },
  { slug: "gem", stem: "신", hanja: "辛", yang: false, element: "metal" },
  { slug: "ocean", stem: "임", hanja: "壬", yang: true, element: "water" },
  { slug: "dew", stem: "계", hanja: "癸", yang: false, element: "water" },
];

const ELEMENT_NAMES: Record<Locale, Record<string, string>> = {
  ko: { wood: "나무", fire: "불", earth: "흙", metal: "쇠", water: "물" },
  en: { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" },
  es: { wood: "Madera", fire: "Fuego", earth: "Tierra", metal: "Metal", water: "Agua" },
};
const POLARITY: Record<Locale, { yang: string; yin: string }> = {
  ko: { yang: "양", yin: "음" },
  en: { yang: "Yang", yin: "Yin" },
  es: { yang: "yang", yin: "yin" },
};

export type DayMasterInfo = (typeof DAY_MASTERS)[number];

export function findDayMaster(slug: string): DayMasterInfo | undefined {
  return DAY_MASTERS.find((d) => d.slug === slug);
}

/** The archetype's name in the reader's language ("Oak", "거목", "El roble"). */
export function archetypeName(slug: ArchetypeKey, locale: Locale): string {
  return SAJU_TYPE_CONTENT[locale].archetypes[slug].name;
}

/** "Yang Wood (甲)" / "양목(甲)" / "Madera yang (甲)" — a short label for lists and links. */
export function dayMasterLabel(d: DayMasterInfo, locale: Locale): string {
  const polarity = d.yang ? POLARITY[locale].yang : POLARITY[locale].yin;
  const element = ELEMENT_NAMES[locale][d.element];
  if (locale === "ko") return `${polarity} ${element} ${d.stem}(${d.hanja})`;
  if (locale === "es") return `${element} ${polarity} (${d.hanja})`;
  return `${polarity} ${element} (${d.hanja})`;
}

// Articles land one file at a time (TODO 11 sample, 12–15 the rest). A type with no file yet is
// simply not published: no page, no sitemap entry, no link.
const ARTICLES: Partial<Record<ArchetypeKey, ArticleSet>> = { oak };

export function getArticle(slug: string, locale: Locale): DayMasterArticle | undefined {
  return ARTICLES[slug as ArchetypeKey]?.[locale];
}

export function publishedDayMasters(): DayMasterInfo[] {
  return DAY_MASTERS.filter((d) => ARTICLES[d.slug]);
}

export function articlePath(slug: string, locale: Locale): string {
  return locale === "en" ? `/day-master/${slug}` : `/day-master/${slug}?lang=${locale}`;
}

export function listPath(locale: Locale): string {
  return locale === "en" ? "/day-master" : `/day-master?lang=${locale}`;
}

export { LOCALES };
