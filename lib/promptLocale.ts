/**
 * lib/promptLocale.ts
 * ------------------------------------------------------------------
 * Shared locale-awareness building blocks for the three GPT prompt
 * builders (chatPrompts.ts, reportPrompts.ts, qaPrompts.ts). Kept in one
 * place so all three agree on the same language names and the same
 * crisis-resource wording, instead of each prompt file drifting on its
 * own copy.
 *
 * Design principle applied in all three prompt builders: the bulk of
 * each prompt (the instructions TO the model — tone rules, schema
 * descriptions, etc.) stays Korean regardless of locale, since LLMs
 * follow instructions written in one language while generating output in
 * another just fine, and retranslating hundreds of lines of carefully-
 * tuned prompt engineering would risk losing nuance for no behavioral
 * upside. Only two things are actually locale-specific:
 *   1. An explicit "write your output in <language>" directive (below).
 *   2. Crisis/safety-hotline text, which is NOT a translation problem —
 *      the Korean hotlines are meaningless (or actively unhelpful) to a
 *      user outside Korea, so each locale gets genuinely different,
 *      locale-appropriate resources, not a translated version of 1393.
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";

/** Used anywhere a prompt says "write field X in <language>". */
export const FIELD_LANGUAGE_NAME: Record<Locale, string> = {
  ko: "한국어",
  en: "영어(English)",
  es: "스페인어(español)",
};

/**
 * A locale-only signal is NOT a country signal (an "en" user could be
 * anywhere), so ko is the only locale where we assume a country and give
 * its real crisis hotlines. en/es instead point to the one number that
 * already offers service in that language (988, US) plus a locale-agnostic
 * directory — never fabricate a country-specific number we can't verify
 * applies to this user.
 */
export const CRISIS_RESOURCES: Record<Locale, string> = {
  ko: `"자살예방상담전화 1393(24시간, 전국 어디서나 국번없이)"과 "정신건강위기상담전화 1577-0199(24시간)"`,
  en: `"In the US, call or text 988 (Suicide & Crisis Lifeline, 24/7)." and "Outside the US, you can find a local crisis line at findahelpline.com."`,
  es: `"En Estados Unidos, llama o envía un mensaje de texto al 988 (Línea de Prevención del Suicidio y Crisis, con atención en español, 24/7)." y "Fuera de Estados Unidos, puedes encontrar una línea de crisis local en findahelpline.com."`,
};

/**
 * Appended at the end of a prompt as the final, most-recent instruction
 * (recency helps instruction-following). Written directly IN the target
 * language rather than as a translated Korean sentence, since it's the one
 * piece of the prompt where demonstrating the target language IS the point.
 * `outputDescription` names whatever the model is producing, already phrased
 * in English/Spanish. The `es` string must be a BARE masculine noun phrase
 * with no leading article (e.g. `'array "lines"'`, not `'el array "lines"'`)
 * — the Spanish template below supplies "del" itself (a contraction of
 * "de"+"el" that only works when the following noun takes "el").
 */
export function outputLanguageDirective(locale: Locale, outputDescription: { en: string; es: string }): string {
  if (locale === "ko") return "";
  const directive: Record<"en" | "es", string> = {
    en: `\n\n## Output language (overrides nothing above, applies on top of it)\nEven though the instructions above are written in Korean, every string inside ${outputDescription.en} you output MUST be written entirely in natural, fluent English. Do not include any Korean words or characters.`,
    es: `\n\n## Idioma de salida (no anula nada de lo anterior, se aplica además de eso)\nAunque las instrucciones anteriores están escritas en coreano, cada cadena dentro del ${outputDescription.es} debe estar escrita completamente en español natural y fluido. No incluyas palabras ni caracteres en coreano.`,
  };
  return directive[locale];
}
