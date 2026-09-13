import type { Locale } from "./i18n/types";

/**
 * lib/qaBankLocale.ts
 * ------------------------------------------------------------------
 * lib/questionBank.json's categories/subcategories/questions each carry
 * a Korean name/text plus _en/_es siblings (added when the bank was
 * translated for the native app). Mirrors mobile/lib/qaBankLocale.ts
 * exactly — same helper, same fallback-to-Korean behavior — so a
 * missing translation never renders blank on either surface.
 * ------------------------------------------------------------------
 */
export function localizedText(ko: string, en: string | undefined, es: string | undefined, locale: Locale): string {
  if (locale === "en") return en || ko;
  if (locale === "es") return es || ko;
  return ko;
}
