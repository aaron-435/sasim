/**
 * lib/i18n/index.ts
 * ------------------------------------------------------------------
 * Entry point every component imports from: `import { useStrings } from
 * "@/lib/i18n"`. See lib/i18n/README.md for what's covered and how to
 * extend a locale, and lib/i18n/LocaleContext.tsx for how real locale
 * switching works (added 2026-09-13, replacing the old DEFAULT_LOCALE-
 * only placeholder).
 * ------------------------------------------------------------------
 */

export { dictionaries, getDictionary, type Dictionary } from "./dictionaries";
export { LocaleProvider, useLocale, useStrings } from "./LocaleContext";
export { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";
