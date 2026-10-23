import type { Locale } from "@/lib/i18n/types";
import type { ArchetypeKey } from "@/lib/sajuType";
import type { DayMasterArticle } from "@/lib/seoArticles/types";

/** A guide reuses the Day Master article shape (title, lead, sections, "one thing to try"). */
export type Guide = DayMasterArticle;

/** Guides are written en/es first; a language with no entry has no page, no sitemap URL and no hreflang. */
export type GuideSet = Partial<Record<Locale, Guide>>;

export type GuideDef = {
  slug: string;
  /** Day Master articles to link under the guide. */
  related: ArchetypeKey[];
  content: GuideSet;
};
