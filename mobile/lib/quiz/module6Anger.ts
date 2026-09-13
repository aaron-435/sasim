/**
 * lib/module6Anger.ts
 * ------------------------------------------------------------------
 * Module 6 — 분노 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈6_분노_30문항_전문가검토용.xlsx). 3차원(STAXI 기반): 억압(S1-S10) /
 * 폭발(E1-E10) / 반추(R1-R10). 억압+폭발이 함께 높은 경우가 원 기획의
 * "참다가 터짐" 패턴과 대응한다 (모듈 설계 근거 문서 참고).
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE6_QUESTIONS: ModuleQuestion[] = [
  // ---- 억압 (Suppression) — S1-S10 ----
  { id: "S1", dimension: "suppression", format: "slider", prompt: "화가 나도 겉으로 티 내지 않는 정도는?", options: { minLabel: "항상 티가 남", maxLabel: "전혀 티 안 남(완벽하게 숨김)" } },
  { id: "S2", dimension: "suppression", format: "choice", prompt: "화가 나면?", options: [
    { label: "바로 표현한다", score: 0 }, { label: "조금 참았다가 표현한다", score: 1 },
    { label: "웃으면서 넘긴다", score: 2 }, { label: "티 하나 안 내고 삼킨다", score: 3 } ] },
  { id: "S3", dimension: "suppression", format: "choice", prompt: "화가 나도, 상대는 내가 화났다는 걸 절대 눈치채지 못한다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "S4", dimension: "suppression", format: "choice", prompt: "억울한 상황에서도?", options: [
    { label: "바로 항의한다", score: 0 }, { label: "적당히 표현한다", score: 1 },
    { label: "속으로만 삭인다", score: 2 }, { label: "오히려 사과하게 된다", score: 3 } ] },
  { id: "S5", dimension: "suppression", format: "choice", prompt: "화를 참고 나면?", options: [
    { label: "금방 풀린다", score: 0 }, { label: "시간이 지나면 풀린다", score: 1 },
    { label: "응어리가 남는다", score: 2 }, { label: "두고두고 곱씹는다", score: 3 } ] },
  { id: "S6", dimension: "suppression", format: "choice", prompt: "가까운 사람에게 서운해도?", options: [
    { label: "바로 말한다", score: 0 }, { label: "때를 봐서 말한다", score: 1 },
    { label: "말 안 하고 넘어간다", score: 2 }, { label: "괜찮은 척하다가 나중에 폭발한다", score: 3 } ] },
  { id: "S7", dimension: "suppression", format: "choice", prompt: "화를 내는 것에 대해?", options: [
    { label: "자연스러운 감정이라 생각한다", score: 0 }, { label: "필요할 땐 낸다", score: 1 },
    { label: "화내는 내 모습이 싫다", score: 2 }, { label: "화내면 안 될 것 같은 죄책감이 든다", score: 3 } ] },
  { id: "S8", dimension: "suppression", format: "choice", prompt: "갈등 상황을 피하려고?", options: [
    { label: "그렇지 않다", score: 0 }, { label: "약간 그런 편이다", score: 1 },
    { label: "어지간하면 참고 넘어간다", score: 2 }, { label: "내가 손해 봐도 그냥 참는다", score: 3 } ] },
  { id: "S9", dimension: "suppression", format: "choice", prompt: "화가 쌓이면 몸으로는?", options: [
    { label: "특별한 증상 없다", score: 0 }, { label: "가끔 긴장된다", score: 1 },
    { label: "두통이나 소화불량이 온다", score: 2 }, { label: "몸이 아플 때까지 참는다", score: 3 } ] },
  { id: "S10", dimension: "suppression", format: "choice", prompt: "화났던 일을 나중에 떠올리면?", options: [
    { label: "이미 잊었다", score: 0 }, { label: "가볍게 기억난다", score: 1 },
    { label: "그때 표현 못 한 게 아쉽다", score: 2 }, { label: "왜 그때 말 못 했나 자책한다", score: 3 } ] },
  // ---- 폭발 (Explosion) — E1-E10 ----
  { id: "E1", dimension: "explosion", format: "choice", prompt: "화가 치밀어 오르면?", options: [
    { label: "차분히 가라앉힌다", score: 0 }, { label: "잠깐 참았다가 말한다", score: 1 },
    { label: "바로 언성이 높아진다", score: 2 }, { label: "순간적으로 확 터진다", score: 3 } ] },
  { id: "E2", dimension: "explosion", format: "slider", prompt: "화가 나면 감정이 확 튀어오르는 정도는?", options: { minLabel: "전혀 그렇지 않음(항상 차분함 유지)", maxLabel: "순식간에 폭발함" } },
  { id: "E3", dimension: "explosion", format: "choice", prompt: "화가 나면, 나조차 통제 못 할 정도로 순간적으로 폭발할 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "E4", dimension: "explosion", format: "choice", prompt: "운전 중 다른 차가 끼어들면?", options: [
    { label: "대수롭지 않게 넘긴다", score: 0 }, { label: "살짝 짜증 난다", score: 1 },
    { label: "욕이 튀어나온다", score: 2 }, { label: "경적을 울리거나 항의하게 된다", score: 3 } ] },
  { id: "E5", dimension: "explosion", format: "choice", prompt: "화가 났을 때 말투는?", options: [
    { label: "평소와 비슷하다", score: 0 }, { label: "조금 날카로워진다", score: 1 },
    { label: "목소리가 커진다", score: 2 }, { label: "나도 모르게 심한 말이 나간다", score: 3 } ] },
  { id: "E6", dimension: "explosion", format: "choice", prompt: "화난 후 물건을 다룰 때?", options: [
    { label: "평소와 같다", score: 0 }, { label: "조금 거칠어진다", score: 1 },
    { label: "문을 세게 닫거나 물건을 세게 놓는다", score: 2 }, { label: "물건을 던지거나 부순 적이 있다", score: 3 } ] },
  { id: "E7", dimension: "explosion", format: "choice", prompt: "누군가 나를 화나게 하면?", options: [
    { label: "차분히 대화로 푼다", score: 0 }, { label: "조금 날 서게 반응한다", score: 1 },
    { label: "바로 맞받아친다", score: 2 }, { label: "감정적으로 강하게 쏘아붙인다", score: 3 } ] },
  { id: "E8", dimension: "explosion", format: "choice", prompt: "화가 난 뒤 후회하는 일이?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "매번 있어서 스스로에게 실망한다", score: 3 } ] },
  { id: "E9", dimension: "explosion", format: "choice", prompt: "화를 참다가 터지면?", options: [
    { label: "적당한 선에서 멈춘다", score: 0 }, { label: "어느 정도 조절한다", score: 1 },
    { label: "멈추기가 어렵다", score: 2 }, { label: "한번 터지면 걷잡을 수 없다", score: 3 } ] },
  { id: "E10", dimension: "explosion", format: "choice", prompt: "주변 사람들은 내 화에 대해?", options: [
    { label: "감정 기복이 적다고 한다", score: 0 }, { label: "보통이라고 한다", score: 1 },
    { label: "욱하는 편이라고 한다", score: 2 }, { label: "화나면 무섭다고 말한다", score: 3 } ] },
  // ---- 반추 (Rumination) — R1-R10 ----
  { id: "R1", dimension: "rumination", format: "choice", prompt: "화났던 일이 지나간 후에도?", options: [
    { label: "금방 잊는다", score: 0 }, { label: "조금 남아있다가 사라진다", score: 1 },
    { label: "계속 생각난다", score: 2 }, { label: "며칠씩 곱씹는다", score: 3 } ] },
  { id: "R2", dimension: "rumination", format: "slider", prompt: "화가 가라앉는 데 걸리는 시간은?", options: { minLabel: "매우 짧음(금방 풀림)", maxLabel: "매우 긺(며칠씩 감)" } },
  { id: "R3", dimension: "rumination", format: "choice", prompt: "화나게 한 사람을 다시 보면?", options: [
    { label: "아무렇지 않다", score: 0 }, { label: "약간 어색하다", score: 1 },
    { label: "그 일이 다시 떠오른다", score: 2 }, { label: "또 화가 치밀어 오른다", score: 3 } ] },
  { id: "R4", dimension: "rumination", format: "choice", prompt: "이미 지나간 일인데도, 자기 전에 그 상황을 계속 재생하며 화를 낸다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "R5", dimension: "rumination", format: "choice", prompt: "화를 가라앉히려고 할 때?", options: [
    { label: "쉽게 진정된다", score: 0 }, { label: "시간이 좀 걸리지만 된다", score: 1 },
    { label: "쉽게 진정이 안 된다", score: 2 }, { label: "생각할수록 오히려 더 화가 난다", score: 3 } ] },
  { id: "R6", dimension: "rumination", format: "choice", prompt: "사소한 일로 화가 나면 다른 일에도?", options: [
    { label: "영향이 없다", score: 0 }, { label: "약간 영향이 있다", score: 1 },
    { label: "기분이 계속 안 좋다", score: 2 }, { label: "다른 일에도 짜증을 옮긴다", score: 3 } ] },
  { id: "R7", dimension: "rumination", format: "choice", prompt: "화났던 상황을 다른 사람에게 얘기할 때?", options: [
    { label: "담담하게 얘기한다", score: 0 }, { label: "조금 감정이 실린다", score: 1 },
    { label: "다시 화가 나며 얘기한다", score: 2 }, { label: "말하다가 그때보다 더 흥분한다", score: 3 } ] },
  { id: "R8", dimension: "rumination", format: "choice", prompt: "상대가 사과해도?", options: [
    { label: "바로 풀린다", score: 0 }, { label: "어느 정도 풀린다", score: 1 },
    { label: "쉽게 안 풀린다", score: 2 }, { label: "이미 마음이 돌아서서 소용없다", score: 3 } ] },
  { id: "R9", dimension: "rumination", format: "choice", prompt: "화가 난 상태에서 중요한 결정을 내려야 하면?", options: [
    { label: "감정과 별개로 판단한다", score: 0 }, { label: "조금 영향은 받지만 판단한다", score: 1 },
    { label: "판단력이 흐려진다", score: 2 }, { label: "화난 채로 후회할 결정을 한 적 있다", score: 3 } ] },
  { id: "R10", dimension: "rumination", format: "choice", prompt: "스스로 화를 다스리는 능력에 대해?", options: [
    { label: "잘 다스린다고 느낀다", score: 0 }, { label: "어느 정도 다스린다", score: 1 },
    { label: "잘 안 되는 편이다", score: 2 }, { label: "화가 나를 지배하는 것 같다", score: 3 } ] },
];

// Display-text-only translations of MODULE6_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE6_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  S1: { prompt: "How much do you keep it from showing when you're angry?", minLabel: "It always shows", maxLabel: "It never shows at all (perfectly hidden)" },
  S2: { prompt: "When you get angry?", optionLabels: ["I express it right away", "I hold it in a bit, then express it", "I laugh it off", "I swallow it without a trace"] },
  S3: { prompt: "Even when I'm angry, the other person never notices I'm angry at all.", optionLabels: ["Not at all true", "Very true"] },
  S4: { prompt: "Even in an unfair situation?", optionLabels: ["I object right away", "I express it to a reasonable degree", "I only stew about it inside", "I end up apologizing instead"] },
  S5: { prompt: "After holding your anger in?", optionLabels: ["It goes away quickly", "It goes away with time", "A lump stays behind", "I dwell on it for a long time"] },
  S6: { prompt: "Even when someone close to you hurts your feelings?", optionLabels: ["I say something right away", "I say something when the timing is right", "I let it pass without saying anything", "I act fine, then explode later"] },
  S7: { prompt: "How do you feel about expressing anger?", optionLabels: ["I think it's a natural emotion", "I express it when needed", "I dislike how I look when I'm angry", "I feel guilty, like I shouldn't be angry"] },
  S8: { prompt: "Do you avoid conflict?", optionLabels: ["Not really", "A bit", "I put up with it and let it go if I can", "I just put up with it even if it costs me"] },
  S9: { prompt: "When anger builds up, how does your body react?", optionLabels: ["No particular symptoms", "I feel tense sometimes", "I get headaches or indigestion", "I keep holding it in until my body gets sick"] },
  S10: { prompt: "When you look back on something that made you angry?", optionLabels: ["I've already forgotten it", "I remember it lightly", "I regret not expressing it at the time", "I blame myself for not speaking up then"] },
  E1: { prompt: "When anger surges up in you?", optionLabels: ["I calm it down", "I hold it for a moment, then speak", "My voice rises right away", "It bursts out of me in an instant"] },
  E2: { prompt: "How much does your anger surge up suddenly when you get mad?", minLabel: "Not at all (I always stay calm)", maxLabel: "It explodes in an instant" },
  E3: { prompt: "When I get angry, there are times I burst out so suddenly that even I can't control it.", optionLabels: ["Not at all true", "Very true"] },
  E4: { prompt: "When another car cuts you off while driving?", optionLabels: ["I brush it off, no big deal", "I feel slightly annoyed", "A curse slips out", "I honk the horn or react angrily"] },
  E5: { prompt: "How does your tone change when you're angry?", optionLabels: ["About the same as usual", "A bit sharper", "My voice gets louder", "Harsh words come out before I realize it"] },
  E6: { prompt: "How do you handle objects after getting angry?", optionLabels: ["The same as usual", "A bit rougher", "I slam doors or put things down hard", "I've thrown or broken things"] },
  E7: { prompt: "When someone makes you angry?", optionLabels: ["I resolve it calmly through conversation", "I react a bit sharply", "I snap back right away", "I lash out strongly and emotionally"] },
  E8: { prompt: "How often do you regret something after getting angry?", optionLabels: ["Almost never", "Sometimes", "Often", "Every time, and it disappoints me in myself"] },
  E9: { prompt: "When you've been holding your anger in and it finally bursts?", optionLabels: ["I stop at a reasonable point", "I manage to control it to some degree", "It's hard to stop", "Once it bursts, there's no holding it back"] },
  E10: { prompt: "What do people around you say about your anger?", optionLabels: ["That I have few mood swings", "That it's about average", "That I have a short fuse", "That I'm scary when I'm angry"] },
  R1: { prompt: "Even after something that made you angry has passed?", optionLabels: ["I forget about it quickly", "It lingers a bit, then fades", "I keep thinking about it", "I dwell on it for days"] },
  R2: { prompt: "How long does it take for your anger to settle down?", minLabel: "Very short (it goes away quickly)", maxLabel: "Very long (it lasts for days)" },
  R3: { prompt: "When you see the person who made you angry again?", optionLabels: ["I feel nothing about it", "It's a bit awkward", "That incident comes back to mind", "The anger surges up again"] },
  R4: { prompt: "Even though it's already over, I keep replaying the situation before bed and getting angry again.", optionLabels: ["Not at all true", "Very true"] },
  R5: { prompt: "When you try to calm your anger down?", optionLabels: ["I calm down easily", "It takes a while, but I manage", "I have trouble calming down", "The more I think about it, the angrier I get"] },
  R6: { prompt: "When something small makes you angry, does it affect other things?", optionLabels: ["No effect", "A slight effect", "My mood stays bad", "I take my irritation out on other things too"] },
  R7: { prompt: "When you tell someone about a situation that made you angry?", optionLabels: ["I talk about it calmly", "A bit of emotion comes through", "I get angry all over again while talking about it", "I end up more worked up than I was at the time"] },
  R8: { prompt: "Even after the other person apologizes?", optionLabels: ["I get over it right away", "I get over it to some degree", "It's hard for me to let it go", "My feelings have already turned, so it doesn't help"] },
  R9: { prompt: "When you have to make an important decision while angry?", optionLabels: ["I judge it separately from my emotions", "I'm affected a little, but I still judge it fairly", "My judgment gets clouded", "I've made a decision while angry that I later regretted"] },
  R10: { prompt: "How do you feel about your own ability to manage anger?", optionLabels: ["I feel I manage it well", "I manage it to some degree", "I'm not very good at it", "It feels like anger controls me"] },
};

export const MODULE6_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  S1: { prompt: "¿Cuánto evitas que se note cuando estás enojado/a?", minLabel: "Siempre se nota", maxLabel: "Nunca se nota en absoluto (perfectamente oculto)" },
  S2: { prompt: "Cuando te enojas?", optionLabels: ["Lo expreso de inmediato", "Lo aguanto un poco y luego lo expreso", "Lo dejo pasar riéndome", "Me lo trago sin que se note"] },
  S3: { prompt: "Incluso cuando estoy enojado/a, la otra persona nunca se da cuenta de que lo estoy.", optionLabels: ["Para nada cierto", "Totalmente cierto"] },
  S4: { prompt: "¿Incluso en una situación injusta?", optionLabels: ["Protesto de inmediato", "Lo expreso de forma razonable", "Solo me lo trago por dentro", "Termino disculpándome yo"] },
  S5: { prompt: "Después de aguantarte el enojo?", optionLabels: ["Se me pasa rápido", "Se me pasa con el tiempo", "Queda un nudo por dentro", "Le doy vueltas por mucho tiempo"] },
  S6: { prompt: "¿Incluso cuando alguien cercano te lastima?", optionLabels: ["Se lo digo de inmediato", "Se lo digo cuando encuentro el momento", "Lo dejo pasar sin decir nada", "Finjo que estoy bien y después exploto"] },
  S7: { prompt: "¿Cómo te sientes respecto a expresar el enojo?", optionLabels: ["Creo que es una emoción natural", "Lo expreso cuando es necesario", "No me gusta cómo me veo cuando me enojo", "Siento culpa, como si no debiera enojarme"] },
  S8: { prompt: "¿Evitas los conflictos?", optionLabels: ["No mucho", "Un poco", "Me aguanto y lo dejo pasar si puedo", "Solo me aguanto aunque me perjudique"] },
  S9: { prompt: "Cuando se te acumula el enojo, ¿cómo reacciona tu cuerpo?", optionLabels: ["Sin síntomas particulares", "A veces me siento tenso/a", "Me dan dolores de cabeza o indigestión", "Sigo aguantando hasta que me enfermo"] },
  S10: { prompt: "Cuando recuerdas algo que te hizo enojar?", optionLabels: ["Ya lo olvidé", "Lo recuerdo levemente", "Me arrepiento de no haberlo expresado en su momento", "Me reprocho no haber hablado en ese momento"] },
  E1: { prompt: "Cuando el enojo empieza a subir dentro de ti?", optionLabels: ["Lo calmo", "Lo aguanto un momento y luego hablo", "Se me sube el tono de voz de inmediato", "Explota de repente"] },
  E2: { prompt: "¿Cuánto se te dispara el enojo de golpe cuando te enfadas?", minLabel: "Nada (siempre me mantengo tranquilo/a)", maxLabel: "Explota en un instante" },
  E3: { prompt: "Cuando me enojo, a veces exploto tan de repente que ni yo mismo/a puedo controlarlo.", optionLabels: ["Para nada cierto", "Totalmente cierto"] },
  E4: { prompt: "Cuando otro auto se te cierra mientras manejas?", optionLabels: ["Lo dejo pasar, no es gran cosa", "Me molesta un poco", "Se me escapa una grosería", "Toco la bocina o reacciono con enojo"] },
  E5: { prompt: "¿Cómo cambia tu tono cuando estás enojado/a?", optionLabels: ["Más o menos igual que siempre", "Un poco más cortante", "Se me sube la voz", "Se me escapan palabras duras sin darme cuenta"] },
  E6: { prompt: "¿Cómo tratas los objetos después de enojarte?", optionLabels: ["Igual que siempre", "Un poco más brusco/a", "Cierro puertas de golpe o pongo las cosas con fuerza", "He llegado a lanzar o romper cosas"] },
  E7: { prompt: "Cuando alguien te hace enojar?", optionLabels: ["Lo resuelvo con calma, hablando", "Reacciono con algo de dureza", "Respondo de inmediato", "Reacciono con fuerza y de forma muy emocional"] },
  E8: { prompt: "¿Con qué frecuencia te arrepientes de algo después de enojarte?", optionLabels: ["Casi nunca", "A veces", "Seguido", "Cada vez, y me decepciona de mí mismo/a"] },
  E9: { prompt: "Cuando has estado aguantando el enojo y finalmente explota?", optionLabels: ["Me detengo en un punto razonable", "Logro controlarlo hasta cierto punto", "Me cuesta parar", "Una vez que explota, no hay forma de contenerlo"] },
  E10: { prompt: "¿Qué dice la gente a tu alrededor sobre tu enojo?", optionLabels: ["Que tengo pocos cambios de humor", "Que es normal", "Que me enojo fácil", "Que doy miedo cuando me enojo"] },
  R1: { prompt: "¿Incluso después de que algo que te hizo enojar ya pasó?", optionLabels: ["Lo olvido rápido", "Queda un poco y luego desaparece", "Sigo pensando en eso", "Le doy vueltas durante días"] },
  R2: { prompt: "¿Cuánto tiempo te toma que se te pase el enojo?", minLabel: "Muy poco (se me pasa rápido)", maxLabel: "Mucho tiempo (dura días)" },
  R3: { prompt: "Cuando vuelves a ver a la persona que te hizo enojar?", optionLabels: ["No siento nada", "Se siente algo incómodo", "Ese momento vuelve a mi mente", "El enojo vuelve a subir"] },
  R4: { prompt: "Aunque ya haya pasado, sigo repitiendo la situación antes de dormir y me vuelvo a enojar.", optionLabels: ["Para nada cierto", "Totalmente cierto"] },
  R5: { prompt: "Cuando intentas calmar tu enojo?", optionLabels: ["Me calmo con facilidad", "Toma tiempo, pero lo logro", "Me cuesta calmarme", "Mientras más lo pienso, más me enojo"] },
  R6: { prompt: "Cuando algo pequeño te hace enojar, ¿afecta otras cosas?", optionLabels: ["No afecta en nada", "Afecta un poco", "Mi ánimo se queda mal por un rato", "Termino desquitándome con otras cosas también"] },
  R7: { prompt: "Cuando le cuentas a alguien sobre una situación que te hizo enojar?", optionLabels: ["Lo cuento con calma", "Se me nota algo de emoción", "Me vuelvo a enojar mientras lo cuento", "Termino más alterado/a que en el momento mismo"] },
  R8: { prompt: "¿Incluso después de que la otra persona se disculpa?", optionLabels: ["Se me pasa de inmediato", "Se me pasa hasta cierto punto", "Me cuesta que se me pase", "Ya cambié de parecer, así que no sirve de nada"] },
  R9: { prompt: "Cuando tienes que tomar una decisión importante estando enojado/a?", optionLabels: ["Juzgo por separado de mis emociones", "Me afecta un poco, pero igual juzgo con justicia", "Mi juicio se nubla", "He tomado una decisión enojado/a de la que después me arrepentí"] },
  R10: { prompt: "¿Cómo te sientes respecto a tu propia capacidad de manejar el enojo?", optionLabels: ["Siento que lo manejo bien", "Lo manejo hasta cierto punto", "No se me da muy bien", "Siento que el enojo me controla a mí"] },
};

export const MODULE6_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  suppression: 10,
  explosion: 10,
  rumination: 10,
};

export const MODULE6_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    suppression: { high: "억압", low: "자연스러운 표현" },
    explosion: { high: "폭발", low: "차분한 절제" },
    rumination: { high: "반추", low: "빠른 회복" },
  },
  en: {
    suppression: { high: "Suppression", low: "Natural Expression" },
    explosion: { high: "Explosion", low: "Calm Restraint" },
    rumination: { high: "Rumination", low: "Quick Recovery" },
  },
  es: {
    suppression: { high: "Supresión", low: "Expresión Natural" },
    explosion: { high: "Explosión", low: "Calma y Control" },
    rumination: { high: "Rumiación", low: "Recuperación Rápida" },
  },
};

export const MODULE6_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "감정 유연형", hook: "화를 억누르지도, 터뜨리지도, 오래 곱씹지도 않는 비교적 안정된 분노 조절 상태입니다." },
    suppression: { title: "억압형", hook: "화가 나도 겉으로 잘 드러내지 않고 삼키는 데 익숙하지만, 그만큼 안에는 쌓여갑니다." },
    explosion: { title: "폭발형", hook: "화가 나면 순간적으로 통제가 어려울 만큼 확 터지는 편입니다." },
    rumination: { title: "반추형", hook: "화는 크게 표출되지 않지만, 지나간 뒤에도 오래도록 곱씹으며 놓지 못합니다." },
    "suppression+explosion": { title: "참다가 터짐형", hook: "평소엔 웬만하면 삼키다가, 어느 순간 쌓인 게 걷잡을 수 없이 한꺼번에 터지는 패턴입니다." },
    "suppression+rumination": { title: "억눌린 채 곱씹는형", hook: "겉으로 표현은 안 하지만, 마음속에서는 그 감정을 계속 재생하고 있습니다." },
    "explosion+rumination": { title: "폭발 후 자책형", hook: "순간적으로 강하게 터진 후에도 그 여운과 후회가 오래 남습니다." },
    "suppression+explosion+rumination": { title: "감정 과부하형", hook: "억누르다 터지고, 터진 뒤로도 오래 곱씹는 — 분노 조절의 세 축이 모두 무겁게 걸려있는 상태입니다." },
  },
  en: {
    baseline: { title: "Emotionally Flexible", hook: "You neither bottle up anger, nor let it burst out, nor dwell on it for long — a relatively stable pattern of anger regulation." },
    suppression: { title: "Suppressed Type", hook: "Even when you're angry, you're used to swallowing it rather than showing it — but it keeps building up underneath." },
    explosion: { title: "Explosive Type", hook: "When anger hits, it tends to burst out fast enough that it's hard to control in the moment." },
    rumination: { title: "Ruminating Type", hook: "Your anger doesn't show much on the outside, but you keep replaying it long after, unable to let it go." },
    "suppression+explosion": { title: "Bottle-Then-Burst", hook: "You usually swallow it down, until at some point it all spills out at once, hard to contain." },
    "suppression+rumination": { title: "Suppressed and Stewing", hook: "You don't show it outwardly, but inside you keep replaying the feeling over and over." },
    "explosion+rumination": { title: "Explode-Then-Regret", hook: "Even after a strong outburst, the aftershock and regret linger for a long time." },
    "suppression+explosion+rumination": { title: "Emotional Overload", hook: "Bottling up, bursting out, and dwelling on it afterward — all three axes of anger regulation are weighing on you heavily." },
  },
  es: {
    baseline: { title: "Flexible Emocionalmente", hook: "No te guardas la rabia, no la dejas estallar, ni te quedas mucho tiempo rumiándola — un patrón relativamente estable de manejo de la ira." },
    suppression: { title: "Tipo Supresor", hook: "Incluso cuando te enojas, sueles tragártelo en vez de mostrarlo — pero se va acumulando por debajo." },
    explosion: { title: "Tipo Explosivo", hook: "Cuando llega la ira, tiende a estallar tan rápido que es difícil controlarla en el momento." },
    rumination: { title: "Tipo Rumiante", hook: "Tu enojo no se ve mucho por fuera, pero lo sigues repasando mucho después, sin poder soltarlo." },
    "suppression+explosion": { title: "Se Guarda y Luego Estalla", hook: "Normalmente te lo tragas, hasta que en algún momento todo sale de golpe, difícil de contener." },
    "suppression+rumination": { title: "Suprimido y Rumiando", hook: "No lo muestras hacia fuera, pero por dentro sigues repitiendo ese sentimiento una y otra vez." },
    "explosion+rumination": { title: "Estalla y Luego se Arrepiente", hook: "Incluso después de un arranque fuerte, el eco y el arrepentimiento se quedan mucho tiempo." },
    "suppression+explosion+rumination": { title: "Sobrecarga Emocional", hook: "Guardarlo, que estalle y seguir rumiándolo después — los tres ejes del manejo de la ira te están pesando con fuerza." },
  },
};
