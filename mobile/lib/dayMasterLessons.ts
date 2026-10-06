// "Your Day Master in 10 days" (일간 10일 레슨, 2026-10-06): ten short lessons per Day Master,
// one opened per day, entered from SajuLearnScreen. Every Day Master follows the same ten-step
// curriculum (LESSON_TOPICS) so the lessons line up across the ten archetypes and three
// languages; the copy lives in one file per archetype under ./dayMasterLessons/.
// Progress is kept on the device (lessonProgress.ts).
import type { ArchetypeKey } from "./sajuType";
import type { Locale } from "./i18n/types";
import oak from "./dayMasterLessons/oak";
import vine from "./dayMasterLessons/vine";
import sun from "./dayMasterLessons/sun";
import flame from "./dayMasterLessons/flame";
import mountain from "./dayMasterLessons/mountain";
import field from "./dayMasterLessons/field";
import steel from "./dayMasterLessons/steel";
import gem from "./dayMasterLessons/gem";
import ocean from "./dayMasterLessons/ocean";
import dew from "./dayMasterLessons/dew";

export interface Lesson {
  title: string;
  /** 3–5 sentences, paragraphs split by "\n\n". */
  body: string;
  /** One small, optional thing to notice or try today. */
  tryToday: string;
}

/** Ten lessons per language, in LESSON_TOPICS order. */
export type DayMasterLessons = Record<Locale, Lesson[]>;

/** The fixed curriculum every archetype follows (index = lesson number - 1). */
export const LESSON_TOPICS = [
  "image", // the nature picture behind the Day Master
  "yinYang", // how this element moves: the yang/yin pair (e.g. Oak and Vine)
  "strengths", // natural strengths
  "resource", // the element that feeds you
  "output", // the element you put out: expression
  "wealth", // the element you shape: work, money, results
  "structure", // the element that shapes you: rules, pressure, growth
  "peers", // the same element: friends, rivals, teamwork
  "season", // when your element is strongest in the year
  "together", // your whole chart is more than the Day Master
] as const;

export const LESSON_COUNT = LESSON_TOPICS.length;

export const DAY_MASTER_LESSONS: Record<ArchetypeKey, DayMasterLessons> = {
  oak,
  vine,
  sun,
  flame,
  mountain,
  field,
  steel,
  gem,
  ocean,
  dew,
};

export function getLessons(archetype: ArchetypeKey, locale: Locale): Lesson[] {
  const set = DAY_MASTER_LESSONS[archetype];
  return set ? set[locale] ?? set.en : [];
}
