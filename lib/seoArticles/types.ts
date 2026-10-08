import type { Locale } from "@/lib/i18n/types";

/** One web article about one Day Master (SPEC C1). Plain data; the page component owns the layout. */
export type ArticleSection = {
  heading: string;
  /** Paragraphs, rendered in order. */
  body: string[];
};

export type DayMasterArticle = {
  /** <title> and Open Graph title. Names the search term ("Yang Wood (甲) Day Master"). */
  metaTitle: string;
  /** Meta description, one or two sentences. */
  description: string;
  /** The page's h1. */
  h1: string;
  /** Opening paragraph under the h1; says what a Day Master is. */
  lead: string;
  sections: ArticleSection[];
  /** "One thing to try" at the end of the article. */
  tryThis: string;
};

export type ArticleSet = Record<Locale, DayMasterArticle>;
