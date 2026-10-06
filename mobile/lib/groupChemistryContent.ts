import type { Locale } from "./i18n/types";

// Copy for the group chemistry map. The server (lib/groupChemistry.ts at the repo root) only
// returns element keys; the words live here, per locale. Every line names something a person
// brings or something the group can add — never a weakness, a clash or a warning (PRODUCT.md:
// there is no bad match, and that holds for groups too).

type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

export interface GroupChemistryContent {
  roles: Record<ElementKey, { name: string; line: string }>;
  leading: Record<ElementKey, { headline: string; line: string }>;
  toAdd: Record<ElementKey, string>;
  balanced: string;
}

export const GROUP_CHEMISTRY_CONTENT: Record<Locale, GroupChemistryContent> = {
  ko: {
    roles: {
      wood: { name: "길을 여는 사람", line: "새로운 걸 먼저 꺼내고 모두를 앞으로 움직여요." },
      fire: { name: "불을 붙이는 사람", line: "분위기를 띄우고 모두의 열기를 끌어올려요." },
      earth: { name: "균형을 잡는 사람", line: "모두가 기대는 중심이 되어 무리를 하나로 묶어요." },
      metal: { name: "매듭을 짓는 사람", line: "흩어진 의견을 정리하고 결정을 끝까지 맺어요." },
      water: { name: "흐름을 읽는 사람", line: "말로 나오지 않은 분위기를 살피고 사람 사이를 이어 줘요." },
    },
    leading: {
      wood: { headline: "자라나는 무리", line: "함께 있으면 새로운 계획이 자꾸 생겨나요." },
      fire: { headline: "뜨거운 무리", line: "모이면 금세 웃음과 열기가 번져요." },
      earth: { headline: "든든한 무리", line: "오래 봐도 편안하고, 서로를 믿고 기대요." },
      metal: { headline: "단단한 무리", line: "말한 건 해내고, 약속을 소중히 여겨요." },
      water: { headline: "깊은 무리", line: "긴 대화가 잘 통하고, 서로의 속마음을 잘 알아봐요." },
    },
    toAdd: {
      wood: "가끔은 새로운 곳이나 처음 해 보는 일을 함께 시도해 보세요.",
      fire: "작은 축하나 깜짝 계획이 무리에 온기를 더해 줘요.",
      earth: "정해 둔 모임 날처럼 꾸준한 약속이 무리를 더 든든하게 해요.",
      metal: "무언가를 계획할 때 누가 언제까지 할지 한 줄로 적어 보세요.",
      water: "서두르지 않는 긴 대화 시간을 가끔 만들어 보세요.",
    },
    balanced: "다섯 기운이 모두 모여 있어요. 서로 다른 역할이 잘 맞물리는 무리예요.",
  },
  en: {
    roles: {
      wood: { name: "The one who opens the way", line: "Brings up the new idea first and gets everyone moving." },
      fire: { name: "The one who lights the spark", line: "Lifts the mood and warms everyone up." },
      earth: { name: "The one who keeps the balance", line: "The steady center everyone leans on, holding the group together." },
      metal: { name: "The one who ties things up", line: "Sorts out the scattered ideas and sees decisions through." },
      water: { name: "The one who reads the room", line: "Notices what goes unsaid and connects people." },
    },
    leading: {
      wood: { headline: "A growing crew", line: "New plans keep sprouting when you're together." },
      fire: { headline: "A warm, lively crew", line: "Laughter and energy spread fast when you meet." },
      earth: { headline: "A steady crew", line: "Easy to be around for years; you trust and lean on each other." },
      metal: { headline: "A solid crew", line: "What gets said gets done, and promises matter here." },
      water: { headline: "A deep crew", line: "Long talks flow easily, and you pick up on how each other feels." },
    },
    toAdd: {
      wood: "Now and then, try a new place or a first-time activity together.",
      fire: "A small celebration or a surprise plan adds warmth.",
      earth: "A regular meetup day keeps the group steady.",
      metal: "When you plan something, write down who does what, and by when.",
      water: "Once in a while, make time for a long, unhurried conversation.",
    },
    balanced: "All five elements are here: different roles that fit together well.",
  },
  es: {
    roles: {
      wood: { name: "Quien abre el camino", line: "Propone lo nuevo primero y pone al grupo en marcha." },
      fire: { name: "Quien enciende la chispa", line: "Anima el ambiente y contagia entusiasmo." },
      earth: { name: "Quien mantiene el equilibrio", line: "Es el centro firme en el que todos se apoyan y mantiene unido al grupo." },
      metal: { name: "Quien cierra los temas", line: "Ordena las ideas sueltas y lleva las decisiones hasta el final." },
      water: { name: "Quien lee el ambiente", line: "Percibe lo que no se dice y une a las personas." },
    },
    leading: {
      wood: { headline: "Un grupo que crece", line: "Cuando el grupo se junta, no dejan de surgir planes nuevos." },
      fire: { headline: "Un grupo con chispa", line: "Al reunirse, la risa y la energía se contagian rápido." },
      earth: { headline: "Un grupo firme", line: "Con los años sigue siendo un lugar cómodo, con confianza y apoyo mutuo." },
      metal: { headline: "Un grupo sólido", line: "Lo que se dice se cumple, y aquí las promesas importan." },
      water: { headline: "Un grupo profundo", line: "Las charlas largas fluyen y cada quien percibe lo que sienten los demás." },
    },
    toAdd: {
      wood: "De vez en cuando, probar en grupo un lugar nuevo o una actividad diferente.",
      fire: "Una pequeña celebración o un plan sorpresa le da calidez al grupo.",
      earth: "Un día fijo para reunirse ayuda a que el grupo se mantenga firme.",
      metal: "Al planear algo, anotar en una línea quién hace qué y para cuándo.",
      water: "De vez en cuando, darse tiempo para una charla larga y sin prisas.",
    },
    balanced: "Los cinco elementos están presentes: papeles distintos que encajan bien.",
  },
};
