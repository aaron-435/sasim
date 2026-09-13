import type { Locale } from "./i18n/types";

/**
 * data/questionBank.json stores each translatable string as sibling
 * `_ko`/`_en`/`_es` fields (matching the JSON's own existing `_ko` naming
 * convention) rather than a nested `{ko,en,es}` object. Falls back to
 * Korean if a locale's field is missing (e.g. content not yet translated).
 */
export function localizedText(ko: string, en: string | undefined, es: string | undefined, locale: Locale): string {
  if (locale === "en" && en) return en;
  if (locale === "es" && es) return es;
  return ko;
}
