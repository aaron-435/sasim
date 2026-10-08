import type { Locale } from "@/lib/i18n/types";

/** Chrome text shared by the article pages (the article bodies live in <type>.ts). */
export const ARTICLE_UI: Record<
  Locale,
  {
    listMetaTitle: string;
    listMetaDescription: string;
    listTitle: string;
    listLead: string;
    breadcrumbList: string;
    otherTitle: string;
    readLanguages: string;
    calcTitle: string;
    calcBody: string;
    calcCta: string;
    backToList: string;
  }
> = {
  en: {
    listMetaTitle: "The 10 Day Masters in Saju: Wood, Fire, Earth, Metal, Water | Fatesaid",
    listMetaDescription: "Meet the ten Day Masters of saju, from the Oak to the Dew: what each tends to look like, and how to find yours with a free calculator.",
    listTitle: "The ten Day Masters",
    listLead: "In saju, your Day Master is the Heavenly Stem of the day you were born, and it stands for you in your chart. Each of the ten has its own image, from a tall Oak to quiet Dew. Pick one to read about, or find yours with the free calculator.",
    breadcrumbList: "All Day Masters",
    otherTitle: "Other Day Masters",
    readLanguages: "Read this in",
    calcTitle: "Find your own Day Master",
    calcBody: "The free saju calculator shows your Four Pillars, your Day Master and your Five Elements balance from a birth date.",
    calcCta: "Open the saju calculator",
    backToList: "All ten Day Masters",
  },
  ko: {
    listMetaTitle: "사주 일간 10가지: 갑목부터 계수까지 | Fatesaid",
    listMetaDescription: "사주의 열 가지 일간을 거목부터 이슬까지 살펴보세요. 각 일간의 모습과, 무료 계산기로 내 일간을 찾는 방법을 알려 드려요.",
    listTitle: "열 가지 일간",
    listLead: "사주에서 일간은 내가 태어난 날의 천간이고, 사주 안에서 나 자신을 뜻해요. 열 가지는 저마다 우뚝 선 거목부터 조용한 이슬까지 고유한 모습이 있어요. 궁금한 일간을 골라 읽거나, 무료 계산기로 내 일간을 찾아보세요.",
    breadcrumbList: "전체 일간",
    otherTitle: "다른 일간도 읽어 보세요",
    readLanguages: "다른 언어로 읽기",
    calcTitle: "내 일간 알아보기",
    calcBody: "무료 사주 계산기에서 생년월일로 사주 네 기둥, 일간, 오행의 균형을 확인할 수 있어요.",
    calcCta: "사주 계산기 열기",
    backToList: "열 가지 일간 전체",
  },
  es: {
    listMetaTitle: "Los 10 Maestros del Día del saju: Madera, Fuego, Tierra, Metal, Agua | Fatesaid",
    listMetaDescription: "Conoce los diez Maestros del Día del saju, del roble al rocío: cómo suele ser cada uno y cómo hallar el tuyo con una calculadora gratuita.",
    listTitle: "Los diez Maestros del Día",
    listLead: "En el saju, tu Maestro del Día es el Tronco Celestial del día en que naciste y te representa dentro de tu carta. Cada uno de los diez tiene su propia imagen, del roble alto al rocío tranquilo. Elige uno para leer o descubre el tuyo con la calculadora gratuita.",
    breadcrumbList: "Todos los Maestros del Día",
    otherTitle: "Otros Maestros del Día",
    readLanguages: "Leer en",
    calcTitle: "Descubre tu Maestro del Día",
    calcBody: "La calculadora de saju gratuita muestra tus Cuatro Pilares, tu Maestro del Día y el equilibrio de tus Cinco Elementos a partir de una fecha de nacimiento.",
    calcCta: "Abrir la calculadora de saju",
    backToList: "Los diez Maestros del Día",
  },
};

export const LOCALE_LABELS: Record<Locale, string> = { ko: "한국어", en: "English", es: "Español" };

export function calculatorPath(locale: Locale): string {
  return locale === "en" ? "/saju-calculator" : `/saju-calculator?lang=${locale}`;
}
