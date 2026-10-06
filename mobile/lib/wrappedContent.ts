import type { CompatRelation } from "./compatibility";
import type { Locale } from "./i18n/types";
import type { QaTopicGroupId } from "./qaTopicGroups";

// Year Wrapped card copy (2026-10-06). Every line is keyed by something the engine computed
// (the year's or a month's relation to the reader's Day Master) or by a counted Q&A topic, so
// nothing here is written by an LLM or claims more than the calculation says. Looking back,
// it stays in the past tense; the coming year (card 5) uses the existing year-fortune
// headline only. Pressure rule: no "bad year/month", no warnings above the year-report link.

export interface WrappedContent {
  /** Card 1: the year's energy, looking back. */
  yearLines: Record<CompatRelation, string>;
  /** Card 2: why the best month was the best. */
  monthLines: Record<CompatRelation, string>;
  /** Card 4: "the year in one sentence", first person so it reads as the reader's own line when shared. */
  mottos: Record<CompatRelation, string>;
  /** Card 3: the most-asked Q&A topic. */
  topicLines: Record<QaTopicGroupId, string>;
  /** Cards 1 and 5: the year's name from its pillar, e.g. 2026 병오 → "Year of the Fire Horse". */
  yearName: (element: string, branch: string) => string;
}

// Earthly branch (the engine's Korean char) → zodiac animal, in branch order.
const BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const animal = (names: string[], branch: string) => names[BRANCHES.indexOf(branch)] ?? "";

const KO_ANIMALS = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];
// The traditional color of each element, as in "붉은 말의 해".
const KO_COLORS: Record<string, string> = { wood: "푸른", fire: "붉은", earth: "노란", metal: "흰", water: "검은" };
const EN_ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
const EN_ELEMENTS: Record<string, string> = { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" };
const ES_ANIMALS = ["de la Rata", "del Buey", "del Tigre", "del Conejo", "del Dragón", "de la Serpiente", "del Caballo", "de la Cabra", "del Mono", "del Gallo", "del Perro", "del Cerdo"];
const ES_ELEMENTS: Record<string, string> = { wood: "Madera", fire: "Fuego", earth: "Tierra", metal: "Metal", water: "Agua" };

const ko: WrappedContent = {
  yearLines: {
    mirror: "나와 닮은 기운이 한 해 내내 곁에 흐른 해였어요. 익숙한 방식을 더 깊게 다지기 좋은 시간이었어요.",
    selfNurturesOther: "내 안의 것을 밖으로 꺼내 놓는 기운이 흐른 해였어요. 표현하고 만들어 낸 것들에 당신의 흔적이 남았어요.",
    otherNurturesSelf: "주변의 기운이 당신을 채워 주는 해였어요. 받은 도움과 배움이 단단한 바탕이 되었어요.",
    selfChallengesOther: "당신이 앞에서 흐름을 이끄는 기운이 흐른 해였어요. 직접 움직여 모양을 잡아 가기 좋은 시간이었어요.",
    otherChallengesSelf: "맡는 몫이 늘면서 한 단계 단단해지는 해였어요. 지나온 시간이 다음 해의 바탕이 돼요.",
  },
  monthLines: {
    mirror: "나다운 리듬이 가장 자연스럽게 맞아떨어진 달이었어요.",
    selfNurturesOther: "표현하고 만들어 내는 힘이 가장 잘 흐른 달이었어요.",
    otherNurturesSelf: "주변의 기운이 당신을 가장 많이 채워 준 달이었어요.",
    selfChallengesOther: "앞에서 이끄는 힘이 가장 잘 실린 달이었어요.",
    otherChallengesSelf: "속도를 고르며 단단해지기 좋은 달이었어요.",
  },
  mottos: {
    mirror: "익숙한 길 위에서 더 깊어졌다.",
    selfNurturesOther: "내 안의 것을 세상에 꺼내 놓았다.",
    otherNurturesSelf: "받은 것들이 나를 자라게 했다.",
    selfChallengesOther: "내 걸음으로 길을 냈다.",
    otherChallengesSelf: "무게를 지나오며 단단해졌다.",
  },
  topicLines: {
    love: "올해 질문이 가장 자주 향한 곳은 사람과 관계였어요.",
    person: "올해는 한 사람에 대해 가장 많이 궁금해했어요.",
    work: "올해는 일과 돈의 흐름을 가장 많이 물었어요.",
    self: "올해는 나 자신과 마음의 상태를 가장 많이 들여다봤어요.",
    timing: "올해는 때와 변화를 가장 많이 물었어요.",
    today: "올해는 하루하루의 흐름을 가장 자주 확인했어요.",
  },
  yearName: (element, branch) => `${KO_COLORS[element] ?? ""} ${animal(KO_ANIMALS, branch)}의 해`.trim(),
};

const en: WrappedContent = {
  yearLines: {
    mirror: "All year, an energy much like your own flowed close by. It was a good stretch for going deeper into what already works for you.",
    selfNurturesOther: "This was a year of pouring yourself outward. What you expressed and made is where it left its mark.",
    otherNurturesSelf: "This was a year when the energy around you filled you up. The help and learning that came your way became solid ground.",
    selfChallengesOther: "This was a year with you out in front, setting the pace and shaping things with your own hands.",
    otherChallengesSelf: "As more landed on your plate, this was a year of growing sturdier. The ground you covered becomes footing for what's next.",
  },
  monthLines: {
    mirror: "The month your own rhythm fit most naturally.",
    selfNurturesOther: "The month your power to express and make flowed most freely.",
    otherNurturesSelf: "The month the energy around you filled you up the most.",
    selfChallengesOther: "The month your drive to lead had the most behind it.",
    otherChallengesSelf: "A month of steady pacing that left you sturdier.",
  },
  mottos: {
    mirror: "I went deeper on familiar ground.",
    selfNurturesOther: "I let what was inside me out into the world.",
    otherNurturesSelf: "What I was given helped me grow.",
    selfChallengesOther: "I made the path with my own steps.",
    otherChallengesSelf: "I carried the weight and grew stronger.",
  },
  topicLines: {
    love: "This year your questions turned most often to people and relationships.",
    person: "This year you wondered most about one particular person.",
    work: "This year you asked most about work and money.",
    self: "This year you looked inward most, at yourself and how you're doing.",
    timing: "This year you asked most about timing and change.",
    today: "This year you checked in most on the flow of each day.",
  },
  yearName: (element, branch) => `Year of the ${EN_ELEMENTS[element] ?? ""} ${animal(EN_ANIMALS, branch)}`.replace(/\s+/g, " ").trim(),
};

const es: WrappedContent = {
  yearLines: {
    mirror: "Todo el año te acompañó una energía muy parecida a la tuya. Fue un buen tiempo para profundizar en lo que ya te funciona.",
    selfNurturesOther: "Fue un año para volcarte hacia afuera. Lo que expresaste y creaste es donde quedó tu huella.",
    otherNurturesSelf: "Fue un año en que la energía a tu alrededor te llenó. La ayuda y lo aprendido se volvieron terreno firme.",
    selfChallengesOther: "Fue un año en que tú marcaste el paso y diste forma a las cosas con tus propias manos.",
    otherChallengesSelf: "Con más cosas a tu cargo, fue un año para ganar firmeza. El camino recorrido será la base de lo que viene.",
  },
  monthLines: {
    mirror: "El mes en que tu propio ritmo encajó con más naturalidad.",
    selfNurturesOther: "El mes en que tu fuerza para expresar y crear fluyó con más libertad.",
    otherNurturesSelf: "El mes en que la energía a tu alrededor más te llenó.",
    selfChallengesOther: "El mes en que tu impulso para guiar tuvo más fuerza.",
    otherChallengesSelf: "Un mes para ir a tu ritmo que te dejó más firmeza.",
  },
  mottos: {
    mirror: "Profundicé en terreno conocido.",
    selfNurturesOther: "Saqué al mundo lo que llevaba dentro.",
    otherNurturesSelf: "Lo que recibí me ayudó a crecer.",
    selfChallengesOther: "Abrí camino con mis propios pasos.",
    otherChallengesSelf: "Sostuve el peso y gané firmeza.",
  },
  topicLines: {
    love: "Este año tus preguntas fueron sobre todo hacia las personas y los vínculos.",
    person: "Este año lo que más te intrigó fue una persona en particular.",
    work: "Este año preguntaste sobre todo por el trabajo y el dinero.",
    self: "Este año miraste sobre todo hacia dentro: a ti y a cómo estás.",
    timing: "Este año preguntaste sobre todo por los tiempos y los cambios.",
    today: "Este año consultaste sobre todo el ritmo de cada día.",
  },
  yearName: (element, branch) => `Año ${animal(ES_ANIMALS, branch)} de ${ES_ELEMENTS[element] ?? ""}`.replace(/\s+/g, " ").trim(),
};

export const WRAPPED_CONTENT: Record<Locale, WrappedContent> = { ko, en, es };
