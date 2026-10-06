// Copy for "오늘의 원소 컬러" and the 24-solar-term notifications (2026-10-06).
// The server only returns element keys (lib/elementColor.ts, lib/solarTerms.ts at the repo
// root); the words live here, like dailyFortuneContent.ts. Colors are a mood pick, never a
// charm: no "lucky", "protects", "attracts" wording anywhere in this file.
import type { Locale } from "./i18n/types";
import type { ElementKey } from "./sajuType";

export type ElementColor = { element: ElementKey; todayElement: ElementKey };

/** The query value /api/dailyFortune takes: five percentages, wood → water. */
export function elementsParam(elements: Record<string, number> | null | undefined): string | null {
  if (!elements) return null;
  const order: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];
  const values = order.map((k) => elements[k]);
  if (values.some((v) => typeof v !== "number" || !Number.isFinite(v))) return null;
  return values.map((v) => String(Math.round(v * 100) / 100)).join(",");
}

type ColorCopy = {
  /** The color's name, used as the card's big line. */
  colorName: Record<ElementKey, string>;
  /** First sentence: how today's energy feels (keyed by today's stem element). */
  todayLine: Record<ElementKey, string>;
  /** Second sentence: what the balancing color adds (keyed by the balancing element). */
  addLine: Record<ElementKey, string>;
};

export const ELEMENT_COLOR_CONTENT: Record<Locale, ColorCopy> = {
  ko: {
    colorName: { wood: "숲의 초록", fire: "따뜻한 빨강", earth: "황토색", metal: "은빛 흰색", water: "깊은 파랑" },
    todayLine: {
      wood: "오늘은 자라고 새로 시작하려는 기운이 흘러요.",
      fire: "오늘은 따뜻하고 밝고 빠른 기운이 흘러요.",
      earth: "오늘은 묵직하고 차분한 기운이 흘러요.",
      metal: "오늘은 맑고 또렷하게 정리하는 기운이 흘러요.",
      water: "오늘은 조용히 깊어지는 기운이 흘러요.",
    },
    addLine: {
      wood: "초록을 조금 곁에 두면 뻗어 나가는 여유로운 느낌이 더해져요.",
      fire: "따뜻한 빨강을 조금 더하면 작은 불씨 같은 온기가 더해져요.",
      earth: "황토색을 조금 더하면 묵직한 안정감이 더해져요.",
      metal: "은빛 흰색을 조금 더하면 또렷하고 정돈된 느낌이 더해져요.",
      water: "깊은 파랑을 조금 더하면 차분하게 숨 고를 여유가 더해져요.",
    },
  },
  en: {
    colorName: { wood: "Forest green", fire: "Warm red", earth: "Ochre", metal: "Silver white", water: "Deep blue" },
    todayLine: {
      wood: "Today leans toward growth and new starts.",
      fire: "Today runs warm, bright and quick.",
      earth: "Today moves at a steady, grounded pace.",
      metal: "Today feels clear, crisp and decisive.",
      water: "Today moves quietly and runs deep.",
    },
    addLine: {
      wood: "A touch of green adds a sense of room to grow.",
      fire: "A touch of warm red adds a small spark of warmth.",
      earth: "A touch of ochre adds weight and steadiness.",
      metal: "A touch of silver white adds a clear, tidy feel.",
      water: "A touch of deep blue adds calm and room to breathe.",
    },
  },
  es: {
    colorName: { wood: "Verde bosque", fire: "Rojo cálido", earth: "Ocre", metal: "Blanco plateado", water: "Azul profundo" },
    todayLine: {
      wood: "Hoy la energía empuja hacia crecer y empezar algo nuevo.",
      fire: "Hoy la energía va cálida, luminosa y rápida.",
      earth: "Hoy el ritmo es estable y con los pies en la tierra.",
      metal: "Hoy la energía se siente clara, nítida y decidida.",
      water: "Hoy la energía se mueve en calma y en profundidad.",
    },
    addLine: {
      wood: "Un toque de verde suma una sensación de espacio para crecer.",
      fire: "Un toque de rojo cálido suma una pequeña chispa de calidez.",
      earth: "Un toque de ocre suma peso y estabilidad.",
      metal: "Un toque de blanco plateado suma una sensación clara y ordenada.",
      water: "Un toque de azul profundo suma calma y espacio para respirar.",
    },
  },
};

export function elementColorMood(locale: Locale, color: ElementColor): string {
  const c = ELEMENT_COLOR_CONTENT[locale] ?? ELEMENT_COLOR_CONTENT.en;
  return `${c.todayLine[color.todayElement]} ${c.addLine[color.element]}`;
}

// ---------------------------------------------------------------------------
// 24 solar terms (절기). Keys match the server's SOLAR_TERM_KEYS.

export const SOLAR_TERM_NAMES: Record<Locale, Record<string, string>> = {
  ko: {
    lichun: "입춘", yushui: "우수", jingzhe: "경칩", chunfen: "춘분", qingming: "청명", guyu: "곡우",
    lixia: "입하", xiaoman: "소만", mangzhong: "망종", xiazhi: "하지", xiaoshu: "소서", dashu: "대서",
    liqiu: "입추", chushu: "처서", bailu: "백로", qiufen: "추분", hanlu: "한로", shuangjiang: "상강",
    lidong: "입동", xiaoxue: "소설", daxue: "대설", dongzhi: "동지", xiaohan: "소한", dahan: "대한",
  },
  en: {
    lichun: "Start of Spring", yushui: "Rain Water", jingzhe: "Awakening of Insects", chunfen: "Spring Equinox",
    qingming: "Clear and Bright", guyu: "Grain Rain", lixia: "Start of Summer", xiaoman: "Grain Buds",
    mangzhong: "Grain in Ear", xiazhi: "Summer Solstice", xiaoshu: "Minor Heat", dashu: "Major Heat",
    liqiu: "Start of Autumn", chushu: "End of Heat", bailu: "White Dew", qiufen: "Autumn Equinox",
    hanlu: "Cold Dew", shuangjiang: "Frost's Descent", lidong: "Start of Winter", xiaoxue: "Minor Snow",
    daxue: "Major Snow", dongzhi: "Winter Solstice", xiaohan: "Minor Cold", dahan: "Major Cold",
  },
  es: {
    lichun: "Inicio de la primavera", yushui: "Agua de lluvia", jingzhe: "Despertar de los insectos",
    chunfen: "Equinoccio de primavera", qingming: "Claridad pura", guyu: "Lluvia del grano",
    lixia: "Inicio del verano", xiaoman: "Grano lleno", mangzhong: "Grano en espiga", xiazhi: "Solsticio de verano",
    xiaoshu: "Calor menor", dashu: "Calor mayor", liqiu: "Inicio del otoño", chushu: "Fin del calor",
    bailu: "Rocío blanco", qiufen: "Equinoccio de otoño", hanlu: "Rocío frío", shuangjiang: "Descenso de la escarcha",
    lidong: "Inicio del invierno", xiaoxue: "Nieve menor", daxue: "Nieve mayor", dongzhi: "Solsticio de invierno",
    xiaohan: "Frío menor", dahan: "Frío mayor",
  },
};

/** How the season's element meets the reader's Day Master element. */
export type SeasonRelation = "same" | "feedsMe" | "drawsOut" | "withinReach" | "asksStructure";

const GENERATES: Record<ElementKey, ElementKey> = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
const CONTROLS: Record<ElementKey, ElementKey> = { wood: "earth", earth: "water", water: "fire", fire: "metal", metal: "wood" };

export function seasonRelation(season: ElementKey, me: ElementKey): SeasonRelation {
  if (season === me) return "same";
  if (GENERATES[season] === me) return "feedsMe";
  if (GENERATES[me] === season) return "drawsOut";
  if (CONTROLS[me] === season) return "withinReach";
  return "asksStructure";
}

export const SOLAR_TERM_COPY: Record<Locale, { title: (name: string) => string; body: Record<SeasonRelation, string> }> = {
  ko: {
    title: (name) => `${name} · 계절의 기운이 바뀌어요`,
    body: {
      same: "이번 절기는 나와 같은 기운이라, 원래 잘하는 것에 기대기 좋은 때예요.",
      feedsMe: "이번 절기의 기운이 나를 채워 줘요. 배우고 쉬고 도움을 받기 좋은 때예요.",
      drawsOut: "이번 절기는 내 기운을 밖으로 끌어내요. 나누고 만들고 생각을 말하기 좋은 때예요.",
      withinReach: "이번 절기에는 손에 잡히는 일이 많아요. 일과 계획을 한 걸음 옮기기 좋은 때예요.",
      asksStructure: "이번 절기는 조금 더 짜임새를 바라요. 꾸준한 생활 리듬을 세우기 좋은 때예요.",
    },
  },
  en: {
    title: (name) => `${name} · the season's energy shifts`,
    body: {
      same: "This season shares your element — a good stretch to lean on what comes naturally.",
      feedsMe: "This season's energy feeds yours — good for learning, resting and taking in support.",
      drawsOut: "This season draws your energy outward — good for sharing, making and saying what you think.",
      withinReach: "This season puts things within reach — good for practical steps on work and plans.",
      asksStructure: "This season asks for a bit more structure — a good time to set a steady routine.",
    },
  },
  es: {
    title: (name) => `${name} · cambia la energía de la estación`,
    body: {
      same: "Esta estación comparte tu elemento: un buen tramo para apoyarte en lo que te sale natural.",
      feedsMe: "La energía de esta estación alimenta la tuya: buen momento para aprender, descansar y recibir apoyo.",
      drawsOut: "Esta estación saca tu energía hacia fuera: buen momento para compartir, crear y decir lo que piensas.",
      withinReach: "Esta estación pone las cosas a tu alcance: buen momento para dar pasos prácticos en el trabajo y tus planes.",
      asksStructure: "Esta estación pide un poco más de estructura: buen momento para una rutina estable.",
    },
  },
};
