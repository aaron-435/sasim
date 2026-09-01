/**
 * lib/i18n/index.ts
 * ------------------------------------------------------------------
 * Entry point every component imports from: `import { useStrings } from
 * "@/lib/i18n"`. See lib/i18n/README.md for the full picture (what's
 * covered, what's deliberately excluded, how to add a translated
 * locale, how to wire up real locale switching later).
 *
 * No locale-switching mechanism exists yet on purpose — `useStrings()`
 * always returns DEFAULT_LOCALE's dictionary today. When real switching
 * is needed (URL-based routing, a manual toggle, browser-locale
 * detection — a separate decision not made yet), only THIS function
 * needs to change; every component already reads text through it.
 * ------------------------------------------------------------------
 */

import { ko } from "./ko";
import { en } from "./en";
import { es } from "./es";
import { type Locale, DEFAULT_LOCALE, LOCALES } from "./types";

export type { Locale };
export { DEFAULT_LOCALE, LOCALES };

export type Dictionary = typeof ko;

export const dictionaries: Record<Locale, Dictionary> = { ko, en, es };

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

/** Client-component hook. Always DEFAULT_LOCALE for now — see header comment. */
export function useStrings(): Dictionary {
  return getDictionary(DEFAULT_LOCALE);
}
