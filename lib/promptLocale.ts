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
import type { ElementKey } from "./sajuScore";

/** Used anywhere a prompt says "write field X in <language>". */
export const FIELD_LANGUAGE_NAME: Record<Locale, string> = {
  ko: "한국어",
  en: "영어(English)",
  es: "스페인어(español)",
};

/**
 * 2026-09-13 fix — chatPrompts.ts and reportPrompts.ts used to hand the
 * model only the Korean+hanja element name ("금(金)") regardless of locale,
 * meaning an EN/ES generation had to re-derive its own translation from
 * scratch every single call — with no guarantee it picked the same word
 * twice in one report, let alone the same word the UI's own element bars
 * already show (mobile/lib/i18n/{en,es}.ts's common.elementLabels). A real
 * user with zero saju background has no way to tell "Metal" and "Gold"
 * apart as the same concept if the AI prose uses one and the bar chart
 * above it uses the other. This map is the EXACT wording from those UI
 * dictionaries, so prompt data and rendered UI always agree — ko keeps the
 * hanja notation since mobile's own ko.ts dictionary does too.
 */
export const ELEMENT_LABEL: Record<Locale, Record<ElementKey, string>> = {
  ko: { wood: "목(木)", fire: "화(火)", earth: "토(土)", metal: "금(金)", water: "수(水)" },
  en: { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" },
  es: { wood: "Madera", fire: "Fuego", earth: "Tierra", metal: "Metal", water: "Agua" },
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
 * Per-locale writing rules, appended to EVERY generation prompt through outputLanguageDirective.
 * Mirrors mobile/lib/i18n/STYLE_GUIDE.md (the source of truth for UI strings and static content) —
 * when you add a language, add its entry here AND its section there. Written in the target
 * language's own terms so the model applies them to its own output.
 */
export const LOCALE_STYLE: Record<Exclude<Locale, "ko">, string> = {
  en: [
    "Address the reader as \"you\"; warm counselor voice, contractions are fine.",
    "Headings in sentence case, not Title Case.",
    "Never mention or hint at missing data, instructions, fields or the prompt itself in the output.",
    "Saju terms: \"Day Master\", \"Five Elements\", \"10-year cycle\" (never the Korean words \"대운\", \"일간\", \"오행\" or hanja). Explain a term in the same sentence the first time it appears.",
  ].join(" "),
  es: [
    "Trata al lector siempre de \"tú\" (nunca \"usted\", \"vos\" ni \"vosotros\"), con voz de orientador cercano y sereno.",
    "No conoces el género del lector: no uses adjetivos ni participios que lo marquen (evita \"agotada/o\", \"cansada/o\", \"atrapada/o\", \"sola/o\", \"yo mismo/a\"; el apodo del lector no indica su género aunque termine en -a); reformula con sustantivos o verbos (\"te quedas sin energía\", \"por tu cuenta\").",
    "Español neutro, natural en toda América Latina y en España: nada de regionalismos ni jerga (\"coger\", \"ahorita\", \"chévere\", \"regañar\", \"guay\", \"vale\", \"plata\", \"pasta\"; di \"dinero\").",
    "Escribe como escribiría un hablante nativo, no como traducción: nada de calcos del coreano o del inglés, ni de expresiones inventadas (\"cómo huelo el dinero\", \"un ritmo de guiar\", \"punto muerto\").",
    "Títulos y encabezados solo con la primera palabra en mayúscula (\"Un año para avanzar\"), nunca en Title Case inglés.",
    "Nada de lenguaje inclusivo con -x ni -e (\"activx\", \"cansade\"): reformula con sustantivos o verbos (\"con mucha energía\"). No uses \"cargarse\" (en España es matar o romper), \"descolocar\", \"disparar\" como calco de \"trigger\" (di \"alterar\" o \"activar\"), ni pretérito perfecto para lo ya pasado (di \"dejaste\", \"perdí\", no \"has dejado\", \"me he perdido\"); en la escala de respuestas usa \"logro\", no \"consigo\". El sistema tiene solo cinco elementos (madera, fuego, tierra, metal y agua): no inventes otros como \"aire\". Los nombres de los elementos (fuego, agua, madera, tierra, metal) van en minúscula dentro de una frase y solo con mayúscula como etiqueta o encabezado; \"los cinco elementos\" en minúscula. Nada de \"portátil\", \"ordenador\", \"jornada\", \"cartera\", \"reacomodar\", \"parado/a\" (para \"en una posición\"): di \"computadora o equipo\", \"día\", \"reorganizar\", \"en mejor posición\". Evita palabras con otro sentido muy común: \"citas\" (di \"frases\" o \"citas textuales\"), \"consejería\" (di \"acompañamiento\"), \"ejecución\" (di \"constancia\" o \"llevar a cabo\").",
    "Términos del saju, siempre iguales: \"Maestro del Día\", \"Cinco Elementos\", \"ciclo de diez años\", \"tronco celeste\" y \"rama terrestre\" (nunca las palabras coreanas \"대운\", \"일간\" ni hanja; nada de \"tallo\" ni \"rama terrenal\"). Para el conjunto de los cuatro pilares di \"tus Cuatro Pilares\" o \"tu mapa\", nunca \"carta\" (en español eso es un naipe, un menú o una misiva). Explica el término en la misma frase la primera vez que aparece.",
    "Porcentajes como \"13%\" (sin espacio); fechas en el orden día/mes/año; usa \"y\", nunca \"&\". Nunca menciones ni insinúes datos que faltan, instrucciones, campos ni el propio prompt.",
  ].join(" "),
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
  return `${directive[locale]}\n\n## ${locale === "en" ? "Style rules for this language" : "Reglas de estilo para este idioma"}\n${LOCALE_STYLE[locale]}`;
}
