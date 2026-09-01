/**
 * lib/i18n/types.ts
 * ------------------------------------------------------------------
 * The `Dictionary` shape is derived from ko.ts (the only fully-populated
 * locale) via `typeof`, so every other locale file is TYPE-CHECKED
 * against it — add a key to ko.ts and TypeScript will flag every other
 * locale file as missing it. See lib/i18n/README.md for how to add a
 * new locale.
 * ------------------------------------------------------------------
 */

export type Locale = "ko" | "en" | "es";

export const LOCALES: Locale[] = ["ko", "en", "es"];

export const DEFAULT_LOCALE: Locale = "ko";
