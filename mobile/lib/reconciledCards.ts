import type { CompatibilityResult } from "./compatibility";
import type { Locale } from "./i18n/types";

// Today's screen stacks three independently chosen cards: the overview (one of five "relations"),
// the energy cycle (12 stages) and today's influence (12 sinsal). Left alone they sometimes point
// opposite ways — an overview that says "flowing" above a card that says "stuck". When the day's
// direction and a card's tone clash, the card keeps its name but its body is swapped for one written
// to agree with the day: a cautionary card on a supportive day is softened to a small thing to watch,
// an upbeat card on a pressure day is turned into energy worth spending calmly.
//
// Tones are only assigned to the cards that can clash; unlisted cards never get swapped. Texts were
// drafted with GPT (scripts/gen-reconciled.mts) and reviewed by hand — edit them here.

type Tone = "up" | "down";

/** 12 stages by index (see twelveStagesContent): 2 Momentum, 3 Peak Effort, 4 Full Power are upbeat;
 * 5 Easing Off, 6 Winding Down, 7 A Pause to Tidy Up are cautionary. */
const STAGE_TONE: Record<number, Tone> = { 2: "up", 3: "up", 4: "up", 5: "down", 6: "down", 7: "down" };
/** 12 sinsal by index: 4 Magnetism, 7 Command, 8 Advancement are upbeat; 0 Unexpected Turns,
 * 1 Friction, 2 Wildcard, 5 Waiting Time, 6 Misread Moments, 10 Small Hiccups are cautionary. */
const SINSAL_TONE: Record<number, Tone> = { 4: "up", 7: "up", 8: "up", 0: "down", 1: "down", 2: "down", 5: "down", 6: "down", 10: "down" };

/** The day's direction from its overview relation: support arriving ("up") or a day to pace
 * yourself ("down"); every other relation is neutral and never triggers a swap. */
function dayTone(relation: CompatibilityResult["relation"]): Tone | null {
  if (relation === "otherNurturesSelf") return "up";
  if (relation === "otherChallengesSelf") return "down";
  return null;
}

const RECONCILED: Record<Locale, Record<string, string>> = {
  ko: {
    "stage.5": "흐름이 받쳐 주는 날이라, 한 박자 천천히 가도 괜찮아요. 큰 결정은 잠깐 미뤄두고, 오늘은 이미 해둔 일을 가볍게 다듬는 데 집중해보세요.",
    "stage.6": "컨디션이 예민하게 느껴질 수 있지만, 주변의 도움을 받으면 훨씬 편해지는 날이에요. 무리한 일정만 살짝 조절하고, 쉬어가는 틈을 넉넉히 두면 좋아요.",
    "stage.7": "새로 벌이기보다 잠시 멈춰서 정리하면 흐름을 더 잘 탈 수 있는 날이에요. 조용히 마무리하고 되짚어보는 시간이 다음 단계로 이어지는 데 도움이 돼요.",
    "stage.2": "자신감과 추진력이 자연스럽게 살아나는 하루예요. 그 기세를 차분하게 옮기면, 망설였던 일도 한 걸음 내딛기 좋아요.",
    "stage.3": "노력한 만큼 흐름이 받쳐 주는 날이에요. 일이나 커리어 쪽에서 준비해둔 제안이나 도전을 차분히 꺼내보면 좋아요.",
    "stage.4": "오늘은 기운이 강하게 살아 있는 날이라, 페이스를 잘 맞추면 더 좋게 쓸 수 있어요. 주도권은 자연스럽게 잡되, 주변 반응도 함께 살피면 관계가 더 편안해져요.",
    "sinsal.0": "작은 부분에서 기운이 새지 않도록 한 번 더 살피면 좋은 날이에요. 큰돈이 오가는 일이나 중요한 물건 관리는 평소보다 꼼꼼히 확인해두면 더 편해요.",
    "sinsal.1": "의견이 엇갈릴 수 있지만, 한발 물러서서 조율하면 오히려 흐름이 부드러워져요. 옳고 그름을 급하게 가르기보다 여유 있게 맞춰보는 쪽이 좋아요.",
    "sinsal.2": "예상 밖의 변수가 끼어들 수 있지만, 그만큼 유연하게 대응하면 흐름을 잘 이어갈 수 있어요. 계획을 너무 딱 맞추기보다 여지를 두고 움직여보세요.",
    "sinsal.5": "조금 답답하게 느껴질 수 있어도, 속도를 낮추고 숨을 고르면 흐름이 정리돼요. 억지로 밀기보다 잠시 기다리며 여유를 두는 편이 좋아요.",
    "sinsal.6": "말이나 행동이 생각과 다르게 전달될 수 있어, 중요한 자리에서는 한 번 더 살피면 좋아요. 감정이 올라와도 잠깐 두었다가 전하면 더 편안해요.",
    "sinsal.10": "크지는 않지만 자잘하게 신경 쓸 일이 겹칠 수 있는 날이에요. 몸 상태나 일정만 조금 더 챙기면 무난하게 흐름을 이어갈 수 있어요.",
    "sinsal.4": "평소보다 매력이 도드라져 시선이 자연스럽게 모이는 하루예요. 새로운 인연이나 설레는 만남의 기운도 있어서, 편하게 자신을 드러내보면 좋아요.",
    "sinsal.7": "주도권을 차분하게 쥐고 사람들을 이끌기 좋은 기운이에요. 결단력 있는 모습이 신뢰로 이어지니, 무리하지 않는 선에서 앞장서보세요.",
    "sinsal.8": "그동안의 노력이 눈에 띄는 자리로 이어질 수 있는 날이에요. 승진이나 좋은 제안처럼 한 단계 올라서는 흐름이 보이면 자연스럽게 받아보세요.",
  },
  en: {
    "stage.5": "Today's flow is supportive, so you can ease the pace and let things settle naturally. Keep an eye on the details already in motion, and save bigger decisions for a clearer moment.",
    "stage.6": "With the day on your side, it's fine to move gently and let others lend a hand. A little extra care with your energy and schedule is enough to keep the day comfortable.",
    "stage.7": "Since today favors you, a quiet pause and a bit of tidying can work in your favor. Taking time to reflect now helps set up your next step with more ease.",
    "stage.2": "Today asks you to pace yourself, and that makes your steady confidence especially useful. If you've been waiting to act, this is a good time to turn that energy into one calm, practical move.",
    "stage.3": "Today asks you to keep your pace measured, and your effort can still show clearly. It's a solid day to bring up work or career matters with calm confidence and let your preparation speak for you.",
    "stage.4": "Today's energy is strong, so it's best used with a steady hand and good awareness. You can take the lead and move things forward while still making room for the people around you.",
    "sinsal.0": "Today runs in your favor, so just give money matters and valuables a quick extra check. A little care before you move ahead helps everything stay smooth and settled.",
    "sinsal.1": "The day is helping you along, so if tension shows up, a softer response will serve you well. You don't need to prove your point right away; a little distance can keep the day balanced.",
    "sinsal.2": "Today's flow is supportive, so an unexpected change is more of a small detour than a setback. Stay flexible, and you'll likely find an easier path through it.",
    "sinsal.5": "With the day on your side, a brief pause can be the most useful move. Let things breathe for a moment, and the timing may feel clearer on its own.",
    "sinsal.6": "Since today favors you, a little extra care with your words goes a long way. Double-check important details and give yourself a moment before reacting, and things should stay clear.",
    "sinsal.10": "Today runs in your favor, so small annoyances are easier to handle with a bit of attention. Keeping your schedule and daily routines lightly organized helps the day stay manageable.",
    "sinsal.4": "On a day that calls for pacing yourself, your natural presence can still shine through. It's a nice day to welcome a new connection or let yourself be noticed without forcing it.",
    "sinsal.7": "With a steady pace as today's theme, your leadership can work best in a calm, steady way. When you step forward with clear judgment, people are more likely to trust your direction.",
    "sinsal.8": "Today asks you to keep your pace measured, and any recognition that comes your way can be handled with quiet confidence. If a step up appears, receive it thoughtfully and let your preparation carry you forward.",
  },
  es: {
    "stage.5": "El flujo de hoy te favorece, así que puedes bajar el ritmo y dejar que las cosas se asienten de forma natural. Mantén la atención en los detalles que ya están en marcha y guarda las decisiones grandes para un momento más claro.",
    "stage.6": "Con el día a tu favor, está bien avanzar con suavidad y dejar que otras personas te echen una mano. Un poco más de cuidado con tu energía y tu agenda basta para que el día siga siendo cómodo.",
    "stage.7": "Hoy el ambiente te acompaña, así que una pausa tranquila y un poco de orden pueden jugar a tu favor. Tomarte un tiempo para reflexionar ahora ayuda a preparar tu siguiente paso con más facilidad.",
    "stage.2": "Hoy te pide marcar tu propio ritmo, y esa confianza constante te resulta especialmente útil. Si estabas esperando para actuar, este es un buen momento para convertir esa energía en un movimiento tranquilo y práctico.",
    "stage.3": "Hoy te pide mantener un ritmo medido, y tu esfuerzo puede seguir viéndose con claridad. Es un buen día para plantear temas de trabajo o carrera con calma y confianza, y dejar que tu preparación hable por ti.",
    "stage.4": "La energía de hoy es fuerte, así que conviene usarla con mano firme y buena atención. Puedes tomar la iniciativa y hacer avanzar las cosas sin dejar de dar espacio a las personas que te rodean.",
    "sinsal.0": "El día juega a tu favor, así que basta con revisar un poco más el dinero y los objetos de valor. Un poco de cuidado antes de seguir adelante ayuda a que todo se mantenga fluido y en calma.",
    "sinsal.1": "Como hoy todo te apoya, si aparece tensión, una respuesta más suave te vendrá bien. No necesitas demostrar tu punto de inmediato; un poco de distancia puede mantener el día en equilibrio.",
    "sinsal.2": "El flujo de hoy te favorece, así que un cambio inesperado es más un desvío pequeño que un contratiempo. Mantente flexible y es probable que encuentres un camino más fácil para atravesarlo.",
    "sinsal.5": "Con el día a tu favor, una pausa breve puede ser el movimiento más útil. Deja que las cosas respiren un momento y quizá el momento adecuado se aclare por sí solo.",
    "sinsal.6": "Hoy el ambiente te acompaña, así que un poco más de cuidado con tus palabras te ayudará mucho. Revisa los detalles importantes y date un momento antes de reaccionar, y las cosas deberían seguir claras.",
    "sinsal.10": "El día juega a tu favor, así que las pequeñas molestias se manejan mejor con un poco de atención. Mantener tu agenda y tus rutinas diarias ligeramente organizadas ayuda a que el día siga siendo llevadero.",
    "sinsal.4": "En un día que pide ir con calma, tu presencia natural puede seguir destacando. Es un buen día para dar la bienvenida a un nuevo vínculo o dejar que te noten sin forzarlo.",
    "sinsal.7": "Con un ritmo constante como tema del día, tu liderazgo puede funcionar mejor de forma tranquila y constante. Cuando avanzas con criterio claro, es más probable que las personas confíen en tu dirección.",
    "sinsal.8": "Hoy te pide mantener un ritmo medido, y cualquier reconocimiento que llegue a tu camino puedes recibirlo con calma y confianza. Si aparece un ascenso, acógelo con atención y deja que tu preparación te impulse hacia adelante.",
  },
};

/** A body written to agree with the day's overview, or null when the card already agrees (or is neutral). */
export function reconciledBody(locale: Locale, kind: "stage" | "sinsal", index: number | null | undefined, relation: CompatibilityResult["relation"] | undefined): string | null {
  if (index == null || !relation) return null;
  const card = (kind === "stage" ? STAGE_TONE : SINSAL_TONE)[index];
  const day = dayTone(relation);
  if (!card || !day || card === day) return null;
  return RECONCILED[locale]?.[`${kind}.${index}`] ?? null;
}
