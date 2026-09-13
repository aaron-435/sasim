/**
 * mobile/lib/sajuTypeContent.ts
 * ------------------------------------------------------------------
 * Mobile-side port of web's lib/sajuTypeContent.ts — same copy, kept in
 * sync manually (this repo's existing convention for display-layer
 * content mobile can't cross-import from web, see lib/zodiac.ts's
 * header). Classification itself runs once, server-side, in /api/saju;
 * this file only supplies the localized name/tagline/body for whatever
 * archetype+mode the API already returned.
 *
 * 카피 원칙: 단정("당신은 ~이다")이 아니라 경향으로 쓴다. 오락·자기이해
 * 목적의 제품이고, 특히 궁합처럼 남과 엮이는 화면에서 판정문처럼 읽히면
 * 실제 관계에 해가 된다.
 * ------------------------------------------------------------------
 */

import type { ArchetypeKey, ModeKey, SajuType } from "./sajuType";
import type { Locale } from "./i18n/types";

export interface TypePiece {
  name: string;
  tagline: string;
  body: string;
}

export interface SajuTypeContent {
  archetypes: Record<ArchetypeKey, TypePiece>;
  modes: Record<ModeKey, TypePiece>;
}

const ko: SajuTypeContent = {
  archetypes: {
    oak: {
      name: "거목",
      tagline: "곧게 위로 자라는 큰 나무",
      body: "방향을 정하면 뒤돌아보지 않고 밀고 올라가는 힘이 있습니다. 대신 한번 뻗은 줄기를 굽히는 걸 어려워해서, 꺾여야 할 자리에서도 버티다 지치는 편입니다.",
    },
    vine: {
      name: "덩굴",
      tagline: "감고 올라가 끝내 닿는 풀",
      body: "정면으로 부딪치는 대신 길을 찾아 돌아가는 유연함이 강점입니다. 부드러워 보여도 목표를 놓지 않아서, 오래 지켜본 사람일수록 이 끈질김에 놀랍니다.",
    },
    sun: {
      name: "태양",
      tagline: "가리지 않고 사방을 비추는 빛",
      body: "감정과 의도가 밖으로 그대로 드러나서 사람들이 편하게 읽습니다. 숨기지 못하는 만큼 오해도 적지만, 스스로 어두워질 때 그늘까지 다 보인다는 게 부담이 됩니다.",
    },
    flame: {
      name: "등불",
      tagline: "어둠 속 한 점을 밝히는 불",
      body: "넓게 퍼지기보다 가까운 몇 사람을 깊이 데우는 쪽입니다. 섬세하게 알아차리는 힘이 있지만, 그만큼 주변 공기에 쉽게 흔들립니다.",
    },
    mountain: {
      name: "산",
      tagline: "움직이지 않아서 기준이 되는 무게",
      body: "서두르지 않고 자리를 지켜서, 사람들이 기대고 방향을 가늠하는 기준이 됩니다. 다만 한번 자리 잡은 생각을 옮기는 데 남들보다 시간이 훨씬 오래 걸립니다.",
    },
    field: {
      name: "밭",
      tagline: "무언가를 길러내는 흙",
      body: "자기 것을 세우기보다 남이 자랄 자리를 만들어주는 데 능합니다. 실용적이고 잘 받아주지만, 계속 내주기만 하다 정작 자기 밭이 비는 걸 놓치기 쉽습니다.",
    },
    steel: {
      name: "원석",
      tagline: "아직 다듬지 않은 단단한 쇠",
      body: "군더더기 없이 끊고 정하는 결단력이 있습니다. 직선적이라 신뢰를 얻지만, 부드럽게 돌려 말해야 할 자리에서 상대가 베였다고 느낄 수 있습니다.",
    },
    gem: {
      name: "보석",
      tagline: "깎아낸 만큼 빛나는 금속",
      body: "감각이 예민해서 남들이 못 보는 차이를 잡아냅니다. 그 기준을 자기에게도 들이대기 때문에, 이미 충분한 결과 앞에서도 잘 만족하지 못합니다.",
    },
    ocean: {
      name: "바다",
      tagline: "다 받아들이고 크게 흐르는 물",
      body: "품이 넓어 웬만한 건 다 받아내고, 생각의 스케일이 큽니다. 대신 속을 알기 어렵고 흐름이 바뀔 때 주변이 예측하기 힘들어합니다.",
    },
    dew: {
      name: "이슬",
      tagline: "소리 없이 스며드는 물",
      body: "조용히 관찰하다 핵심을 짚는 침투력이 있습니다. 요란하지 않아 눈에 늦게 띄지만, 한번 스며든 자리는 오래 남습니다.",
    },
  },
  modes: {
    rooted: {
      name: "결집",
      tagline: "나와 같은 기운이 두텁다",
      body: "자기 색이 진하고 남의 기준에 잘 맞추지 않습니다. 혼자 설 힘이 강한 대신, 함께 가야 할 때 부딪히는 지점이 생깁니다.",
    },
    voice: {
      name: "표현",
      tagline: "밖으로 내보내는 기운이 두텁다",
      body: "안에 있는 걸 말·글·작업으로 꺼내야 풀리는 사람입니다. 재능이 드러나기 쉬운 대신, 표현이 막힌 환경에서 유독 빨리 지칩니다.",
    },
    harvest: {
      name: "성취",
      tagline: "내가 다루고 얻는 기운이 두텁다",
      body: "현실 감각이 좋고 결과로 증명하는 쪽이 편합니다. 실행이 빠른 대신, 손에 잡히지 않는 가치는 뒤로 미루기 쉽습니다.",
    },
    order: {
      name: "규율",
      tagline: "나를 누르는 기운이 두텁다",
      body: "책임과 역할이 주어질 때 오히려 단단해집니다. 압박을 견디는 힘이 강한 대신, 쉬어도 될 자리에서까지 자기를 몰아붙입니다.",
    },
    well: {
      name: "통찰",
      tagline: "나를 살리는 기운이 두텁다",
      body: "배우고 곱씹어 깊이를 만드는 데 강합니다. 이해가 깊은 대신, 충분히 알고 나서도 움직이기까지가 남들보다 깁니다.",
    },
  },
};

const en: SajuTypeContent = {
  archetypes: {
    oak: {
      name: "Oak",
      tagline: "The tall tree that only grows upward",
      body: "Once you pick a direction, you push without looking back. The same trunk that carries you struggles to bend, so you tend to hold a position long past the point where letting go would cost less.",
    },
    vine: {
      name: "Vine",
      tagline: "The climber that gets there by going around",
      body: "Instead of hitting an obstacle head-on, you find the way around it. You look soft, but you never actually release the goal — people who watch you long enough are surprised by the persistence.",
    },
    sun: {
      name: "Sun",
      tagline: "Light that falls on everything without choosing",
      body: "What you feel shows plainly, so people read you easily and rarely misjudge you. The cost is that when you dim, everyone sees that too.",
    },
    flame: {
      name: "Flame",
      tagline: "A single point of light in the dark",
      body: "You warm a few people deeply rather than a crowd faintly. That sensitivity catches what others miss, and it also means the mood around you moves you more than you'd like.",
    },
    mountain: {
      name: "Mountain",
      tagline: "Weight that becomes a landmark by not moving",
      body: "You hold your place without rushing, and people orient themselves by you. The flip side is that moving a settled opinion takes you far longer than it takes most.",
    },
    field: {
      name: "Field",
      tagline: "Soil that exists to grow something",
      body: "You are better at making room for others to grow than at staking out your own. Practical and receptive — but you can keep giving ground until you notice your own field has gone bare.",
    },
    steel: {
      name: "Steel",
      tagline: "Hard metal, not yet polished",
      body: "You cut to the decision without padding, and people trust that. In rooms that need the soft version first, the same directness can land as a cut.",
    },
    gem: {
      name: "Gem",
      tagline: "Metal that shines in proportion to what was cut away",
      body: "Your eye catches differences other people can't see. You hold yourself to that same standard, which is why work that is already good enough rarely feels finished.",
    },
    ocean: {
      name: "Ocean",
      tagline: "Water wide enough to take it all in",
      body: "You absorb a lot without flinching and you think at scale. The trade is that you're hard to read, and when your current shifts the people around you don't see it coming.",
    },
    dew: {
      name: "Dew",
      tagline: "Water that soaks in without a sound",
      body: "You watch quietly and then name the thing at the center. You get noticed late because you don't announce yourself, but what you soak into stays changed.",
    },
  },
  modes: {
    rooted: {
      name: "Rooted",
      tagline: "The chart leans toward your own element",
      body: "Your own color runs strong and you don't bend easily to someone else's standard. Great for standing alone; friction shows up when the task requires moving as one.",
    },
    voice: {
      name: "Voice",
      tagline: "The chart leans toward what you put out",
      body: "You only settle once what's inside gets out — as talk, writing, or made things. Talent surfaces easily, and an environment that blocks expression drains you unusually fast.",
    },
    harvest: {
      name: "Harvest",
      tagline: "The chart leans toward what you take hold of",
      body: "You have a sure grip on the practical and prefer to prove things with results. You move fast, and what can't be measured tends to get postponed.",
    },
    order: {
      name: "Order",
      tagline: "The chart leans toward what presses on you",
      body: "Responsibility and a defined role make you steadier, not weaker. You carry pressure well — and you keep driving yourself in the moments where resting would be allowed.",
    },
    well: {
      name: "Well",
      tagline: "The chart leans toward what feeds you",
      body: "You build depth by learning and turning things over. The understanding runs deep; the gap between knowing enough and actually moving runs longer than it does for others.",
    },
  },
};

const es: SajuTypeContent = {
  archetypes: {
    oak: {
      name: "Roble",
      tagline: "El árbol alto que solo crece hacia arriba",
      body: "Cuando eliges una dirección, avanzas sin mirar atrás. Ese mismo tronco que te sostiene no sabe doblarse, así que sueles mantener una posición mucho después de que soltarla saldría más barato.",
    },
    vine: {
      name: "Enredadera",
      tagline: "La trepadora que llega rodeando",
      body: "En vez de chocar de frente con el obstáculo, encuentras la vuelta. Pareces blanda, pero nunca sueltas el objetivo: quien te observa un tiempo se sorprende de esa constancia.",
    },
    sun: {
      name: "Sol",
      tagline: "Luz que cae sobre todo sin elegir",
      body: "Lo que sientes se nota, así que la gente te lee con facilidad y rara vez te malinterpreta. El precio es que, cuando te apagas, también se ve.",
    },
    flame: {
      name: "Llama",
      tagline: "Un punto de luz en la oscuridad",
      body: "Calientas de verdad a unas pocas personas en lugar de apenas a una multitud. Esa sensibilidad capta lo que otros no ven, y también hace que el ánimo de alrededor te mueva más de lo que querrías.",
    },
    mountain: {
      name: "Montaña",
      tagline: "Peso que se vuelve referencia por no moverse",
      body: "Sostienes tu lugar sin prisa y los demás se orientan contigo. La otra cara es que mover una idea ya asentada te lleva mucho más tiempo que a la mayoría.",
    },
    field: {
      name: "Campo",
      tagline: "Tierra que existe para hacer crecer algo",
      body: "Se te da mejor abrir espacio para que otros crezcan que reclamar el tuyo. Práctica y receptiva, pero puedes ceder terreno hasta que tu propio campo queda vacío.",
    },
    steel: {
      name: "Acero",
      tagline: "Metal duro, todavía sin pulir",
      body: "Vas directo a la decisión, sin relleno, y eso genera confianza. En salas que necesitan primero la versión suave, esa misma franqueza puede cortar.",
    },
    gem: {
      name: "Gema",
      tagline: "Metal que brilla según lo que se le quitó",
      body: "Tu ojo capta diferencias que otros no ven. Te aplicas ese mismo estándar, y por eso un trabajo que ya está bien rara vez te parece terminado.",
    },
    ocean: {
      name: "Océano",
      tagline: "Agua lo bastante amplia para recibirlo todo",
      body: "Absorbes mucho sin inmutarte y piensas en grande. A cambio, cuesta leerte, y cuando tu corriente cambia los demás no lo ven venir.",
    },
    dew: {
      name: "Rocío",
      tagline: "Agua que penetra sin hacer ruido",
      body: "Observas en silencio y luego nombras lo que está en el centro. Tardan en notarte porque no te anuncias, pero aquello en lo que calas queda cambiado.",
    },
  },
  modes: {
    rooted: {
      name: "Raíz",
      tagline: "La carta se inclina hacia tu propio elemento",
      body: "Tu color propio es intenso y no te ajustas fácilmente al criterio ajeno. Excelente para sostenerte sola; la fricción aparece cuando hay que avanzar como uno solo.",
    },
    voice: {
      name: "Voz",
      tagline: "La carta se inclina hacia lo que emites",
      body: "Solo te calmas cuando lo de dentro sale: hablado, escrito o hecho. El talento aflora con facilidad, y un entorno que bloquea la expresión te agota rapidísimo.",
    },
    harvest: {
      name: "Cosecha",
      tagline: "La carta se inclina hacia lo que tomas",
      body: "Tienes buen agarre de lo práctico y prefieres demostrar con resultados. Te mueves rápido, y lo que no se puede medir se queda para después.",
    },
    order: {
      name: "Orden",
      tagline: "La carta se inclina hacia lo que te presiona",
      body: "La responsabilidad y un rol definido te vuelven más firme, no más frágil. Sostienes bien la presión, y sigues exigiéndote incluso cuando descansar estaría permitido.",
    },
    well: {
      name: "Pozo",
      tagline: "La carta se inclina hacia lo que te nutre",
      body: "Construyes profundidad aprendiendo y dándole vueltas a las cosas. La comprensión es honda; el tramo entre saber lo suficiente y moverte es más largo que para otros.",
    },
  },
};

export const SAJU_TYPE_CONTENT: Record<Locale, SajuTypeContent> = { ko, en, es };

/** 유형 표시 이름 — "바다 · 표현" / "Ocean · Voice". */
export function formatSajuTypeName(locale: Locale, type: SajuType): string {
  const c = SAJU_TYPE_CONTENT[locale] ?? SAJU_TYPE_CONTENT.ko;
  return `${c.archetypes[type.archetype].name} · ${c.modes[type.mode].name}`;
}

export function getTypePieces(locale: Locale, type: SajuType): { archetype: TypePiece; mode: TypePiece } {
  const c = SAJU_TYPE_CONTENT[locale] ?? SAJU_TYPE_CONTENT.ko;
  return { archetype: c.archetypes[type.archetype], mode: c.modes[type.mode] };
}
