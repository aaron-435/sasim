import { ko } from "./ko";
import { en } from "./en";
import { es } from "./es";
import { DEFAULT_LOCALE, type Locale } from "./types";

export type Dictionary = typeof ko;

export const dictionaries: Record<Locale, Dictionary> = { ko, en, es };

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
