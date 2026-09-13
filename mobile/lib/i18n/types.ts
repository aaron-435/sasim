export type Locale = "ko" | "en" | "es";

export const LOCALES: Locale[] = ["ko", "en", "es"];

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  es: "Español",
};

// Only a fallback for code paths that render before the picker has run (or if
// storage is unavailable) — the app always shows LanguageScreen first, so in
// practice every real user has an explicit choice recorded before any other
// screen reads useStrings().
export const DEFAULT_LOCALE: Locale = "ko";
