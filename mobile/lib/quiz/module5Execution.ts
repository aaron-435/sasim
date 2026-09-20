/**
 * lib/module5Execution.ts
 * ------------------------------------------------------------------
 * Module 5 — 실행력 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈5_실행력_30문항_전문가검토용.xlsx). 3차원: 완벽주의(P1-P10) /
 * 회피(T1-T10) / 선택마비(D1-D10). P4/T4/D4는 극단형(0/3) 문항.
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE5_QUESTIONS: ModuleQuestion[] = [
  // ---- 완벽주의 (Perfectionism) — P1-P10 ----
  { id: "P1", dimension: "perfectionism", format: "slider", prompt: "완벽하지 않을 것 같으면 시작 자체를 미루는 정도는?", options: { minLabel: "전혀 미루지 않음", maxLabel: "확신 없인 항상 미룸" } },
  { id: "P2", dimension: "perfectionism", format: "choice", prompt: "결과물에 대해 확신이 안 서면?", options: [
    { label: "일단 해보고 수정한다", score: 0 }, { label: "하면서 다듬어간다", score: 1 },
    { label: "완벽한 계획이 설 때까지 기다린다", score: 2 }, { label: "확신 없인 아예 시작을 못 한다", score: 3 } ] },
  { id: "P3", dimension: "perfectionism", format: "choice", prompt: "제출·발표 전 마지막까지?", options: [
    { label: "여유롭게 마무리한다", score: 0 }, { label: "막판에 조금 다듬는다", score: 1 },
    { label: "계속 고치느라 마감에 쫓긴다", score: 2 }, { label: "만족스럽지 않아 끝까지 손을 못 뗀다", score: 3 } ] },
  { id: "P4", dimension: "perfectionism", format: "choice", prompt: "완벽하게 할 자신이 없으면, 차라리 시작을 안 하는 쪽을 택한다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "P5", dimension: "perfectionism", format: "choice", prompt: "다른 사람에게 미완성 결과물을 보여줘야 할 때?", options: [
    { label: "편하게 보여준다", score: 0 }, { label: "약간 부담스럽지만 보여준다", score: 1 },
    { label: "부족한 부분이 계속 신경 쓰인다", score: 2 }, { label: "보여주느니 차라리 숨기고 싶다", score: 3 } ] },
  { id: "P6", dimension: "perfectionism", format: "choice", prompt: "계획을 세울 때?", options: [
    { label: "대략적으로 세우고 바로 움직인다", score: 0 }, { label: "적당히 구체적으로 세운다", score: 1 },
    { label: "모든 변수를 다 따지고서야 움직인다", score: 2 }, { label: "완벽한 계획이 아니면 아예 못 움직인다", score: 3 } ] },
  { id: "P7", dimension: "perfectionism", format: "choice", prompt: "실수할 가능성이 있는 일은?", options: [
    { label: "그냥 해본다", score: 0 }, { label: "조심하며 진행한다", score: 1 },
    { label: "여러 번 검토 후 진행한다", score: 2 }, { label: "실수 안 한다는 확신 없인 미룬다", score: 3 } ] },
  { id: "P8", dimension: "perfectionism", format: "choice", prompt: "마감이 다가오는데 결과물이 마음에 안 들면?", options: [
    { label: "일단 마감을 지킨다", score: 0 }, { label: "조금 더 다듬고 낸다", score: 1 },
    { label: "마감을 살짝 넘겨서라도 고친다", score: 2 }, { label: "늦더라도 끝까지 완벽하게 끝낸다", score: 3 } ] },
  { id: "P9", dimension: "perfectionism", format: "choice", prompt: "'이 정도면 됐다'는 기준은?", options: [
    { label: "비교적 쉽게 만족한다", score: 0 }, { label: "적당한 선에서 만족한다", score: 1 },
    { label: "좀처럼 만족하기 어렵다", score: 2 }, { label: "늘 부족하다고 느껴서 손을 못 뗀다", score: 3 } ] },
  { id: "P10", dimension: "perfectionism", format: "choice", prompt: "새로운 도전 앞에서?", options: [
    { label: "일단 부딪혀본다", score: 0 }, { label: "준비하고 시작한다", score: 1 },
    { label: "완벽히 준비될 때까지 미룬다", score: 2 }, { label: "실패할 바엔 안 하는 게 낫다고 생각한다", score: 3 } ] },
  // ---- 회피 (Avoidance) — T1-T10 ----
  { id: "T1", dimension: "avoidance", format: "choice", prompt: "하기 싫은 일이 생기면?", options: [
    { label: "바로 처리해버린다", score: 0 }, { label: "미루다가도 결국 한다", score: 1 },
    { label: "최대한 뒤로 미룬다", score: 2 }, { label: "닥칠 때까지 손도 안 댄다", score: 3 } ] },
  { id: "T2", dimension: "avoidance", format: "slider", prompt: "마감 직전에야 겨우 시작하는 빈도는?", options: { minLabel: "전혀 그렇지 않음(항상 일찍 시작)", maxLabel: "거의 항상 마감 직전에 시작" } },
  { id: "T3", dimension: "avoidance", format: "choice", prompt: "하기 싫은 일을 앞두면?", options: [
    { label: "빨리 끝내고 편해지고 싶다", score: 0 }, { label: "부담되지만 시작한다", score: 1 },
    { label: "다른 일부터 먼저 하게 된다", score: 2 }, { label: "청소·정리 등 딴짓부터 하게 된다", score: 3 } ] },
  { id: "T4", dimension: "avoidance", format: "choice", prompt: "하기 싫은 일은, 마감이 코앞에 닥쳐야만 겨우 손이 움직인다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "T5", dimension: "avoidance", format: "choice", prompt: "할 일 목록을 보면?", options: [
    { label: "우선순위대로 처리한다", score: 0 }, { label: "대체로 처리한다", score: 1 },
    { label: "쉬운 것부터 처리하고 어려운 건 미룬다", score: 2 }, { label: "보기만 해도 하기 싫어져서 덮어버린다", score: 3 } ] },
  { id: "T6", dimension: "avoidance", format: "choice", prompt: "미루고 있는 일이 생각나면?", options: [
    { label: "바로 처리하러 간다", score: 0 }, { label: "조금 있다 하자고 생각한다", score: 1 },
    { label: "애써 생각을 안 하려 한다", score: 2 }, { label: "불안한데도 계속 회피하게 된다", score: 3 } ] },
  { id: "T7", dimension: "avoidance", format: "choice", prompt: "반복적으로 미루는 일이?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "꽤 있다", score: 2 }, { label: "항상 같은 일들을 미루고 있다", score: 3 } ] },
  { id: "T8", dimension: "avoidance", format: "choice", prompt: "미루다가 마감에 쫓기면?", options: [
    { label: "미리 안 한 걸 후회하고 다음엔 안 그런다", score: 0 }, { label: "후회하지만 또 반복한다", score: 1 },
    { label: "이 패턴이 이미 익숙하다", score: 2 }, { label: "매번 이러면서도 못 고친다는 자괴감이 든다", score: 3 } ] },
  { id: "T9", dimension: "avoidance", format: "choice", prompt: "일을 시작하기 전 마음은?", options: [
    { label: "가벼운 마음으로 시작한다", score: 0 }, { label: "약간의 부담을 안고 시작한다", score: 1 },
    { label: "시작하는 것 자체가 큰 산처럼 느껴진다", score: 2 }, { label: "생각만 해도 피하고 싶어진다", score: 3 } ] },
  { id: "T10", dimension: "avoidance", format: "choice", prompt: "미뤄둔 일들이 쌓이면?", options: [
    { label: "차근차근 정리한다", score: 0 }, { label: "조급해지지만 처리한다", score: 1 },
    { label: "압도당해서 더 손을 놓게 된다", score: 2 }, { label: "아예 외면해버린다", score: 3 } ] },
  // ---- 선택마비 (Decision Paralysis) — D1-D10 ----
  { id: "D1", dimension: "decisionParalysis", format: "choice", prompt: "선택지가 여러 개일 때?", options: [
    { label: "빠르게 하나를 고른다", score: 0 }, { label: "조금 고민하고 고른다", score: 1 },
    { label: "한참을 비교하다 고른다", score: 2 }, { label: "끝까지 못 고르고 남에게 맡긴다", score: 3 } ] },
  { id: "D2", dimension: "decisionParalysis", format: "slider", prompt: "결정을 내려야 할 때 머릿속이 복잡해지는 정도는?", options: { minLabel: "전혀 복잡하지 않음", maxLabel: "매우 복잡해짐(생각이 뒤엉킴)" } },
  { id: "D3", dimension: "decisionParalysis", format: "choice", prompt: "메뉴판을 보면?", options: [
    { label: "바로 정한다", score: 0 }, { label: "조금 고민하고 정한다", score: 1 },
    { label: "한참을 들여다본다", score: 2 }, { label: "결국 옆 사람에게 골라달라고 한다", score: 3 } ] },
  { id: "D4", dimension: "decisionParalysis", format: "choice", prompt: "사소한 결정 하나에도, 머릿속으로 모든 경우의 수를 다 따져봐야 마음이 편하다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "D5", dimension: "decisionParalysis", format: "choice", prompt: "결정을 내린 후에는?", options: [
    { label: "더 이상 생각 안 한다", score: 0 }, { label: "가끔 돌아본다", score: 1 },
    { label: "다른 선택이 나았을까 자주 생각한다", score: 2 }, { label: "계속 후회하며 곱씹는다", score: 3 } ] },
  { id: "D6", dimension: "decisionParalysis", format: "choice", prompt: "중요한 결정 앞에서는?", options: [
    { label: "스스로 판단하고 결정한다", score: 0 }, { label: "주변에 물어보고 결정한다", score: 1 },
    { label: "결정을 남에게 미루고 싶어진다", score: 2 }, { label: "누군가 대신 정해주길 간절히 바란다", score: 3 } ] },
  { id: "D7", dimension: "decisionParalysis", format: "choice", prompt: "정보를 찾을 때?", options: [
    { label: "적당한 선에서 정리하고 결정한다", score: 0 }, { label: "조금 더 찾아보고 결정한다", score: 1 },
    { label: "끝없이 더 찾아보게 된다", score: 2 }, { label: "정보가 너무 많아 오히려 결정을 못 한다", score: 3 } ] },
  { id: "D8", dimension: "decisionParalysis", format: "choice", prompt: "결정을 미루면?", options: [
    { label: "여유가 생겨 좋다", score: 0 }, { label: "괜찮다", score: 1 },
    { label: "오히려 더 불안해진다", score: 2 }, { label: "선택지 자체가 스트레스가 된다", score: 3 } ] },
  { id: "D9", dimension: "decisionParalysis", format: "choice", prompt: "'잘못된 선택을 하면 어쩌지'라는 생각은?", options: [
    { label: "거의 안 든다", score: 0 }, { label: "가끔 든다", score: 1 },
    { label: "결정할 때마다 든다", score: 2 }, { label: "그 생각 때문에 아예 결정을 못 할 때가 있다", score: 3 } ] },
  { id: "D10", dimension: "decisionParalysis", format: "choice", prompt: "인생의 큰 결정(진로, 이사 등)을 앞두면?", options: [
    { label: "때가 되면 자연스럽게 정해질 거라 믿는다", score: 0 }, { label: "고민하며 차근차근 정한다", score: 1 },
    { label: "오랫동안 정하지 못하고 미룬다", score: 2 }, { label: "결정 자체가 두려워서 회피하게 된다", score: 3 } ] },
];

// Display-text-only translations of MODULE5_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE5_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  P1: { prompt: "How much do you put off even starting when you're not sure it'll be perfect?", minLabel: "I never put it off", maxLabel: "I always put it off without certainty" },
  P2: { prompt: "When you're not confident about the result?", optionLabels: ["I just try it and revise as I go", "I refine it along the way", "I wait until I have a perfect plan", "I can't even start without certainty"] },
  P3: { prompt: "Right up until you submit or present?", optionLabels: ["I wrap up with time to spare", "I polish it a bit at the last minute", "I keep fixing it and end up rushed by the deadline", "I can't let go of it until the very end because it's never good enough"] },
  P4: { prompt: "If I'm not confident I can do it perfectly, I'd rather not start at all.", optionLabels: ["Not at all true", "Very true"] },
  P5: { prompt: "When you have to show someone unfinished work?", optionLabels: ["I show it comfortably", "It's a bit uncomfortable, but I show it", "The weak spots keep bothering me", "I'd rather hide it than show it"] },
  P6: { prompt: "When making a plan?", optionLabels: ["I sketch it roughly and get moving right away", "I make it reasonably detailed", "I only move once I've considered every variable", "I can't move at all unless the plan is perfect"] },
  P7: { prompt: "For tasks where you might make a mistake?", optionLabels: ["I just go ahead and try", "I proceed carefully", "I review it several times before proceeding", "I put it off unless I'm certain I won't make a mistake"] },
  P8: { prompt: "If the deadline is approaching but you're not happy with the result?", optionLabels: ["I meet the deadline as is", "I polish it a little more before submitting", "I fix it even if it means slightly missing the deadline", "I finish it perfectly no matter how late it makes me"] },
  P9: { prompt: "How easily do you reach the point of \"this is good enough\"?", optionLabels: ["I'm satisfied fairly easily", "I'm satisfied at a reasonable point", "It's hard for me to feel satisfied", "I always feel it's lacking, so I can't let go"] },
  P10: { prompt: "When facing a new challenge?", optionLabels: ["I just dive in", "I prepare and then start", "I put it off until I'm perfectly prepared", "I think it's better not to do it than to fail"] },
  T1: { prompt: "When something you don't want to do comes up?", optionLabels: ["I take care of it right away", "I put it off, but eventually get to it", "I push it back as far as possible", "I don't touch it until it's unavoidable"] },
  T2: { prompt: "How often do you only get started right before the deadline?", minLabel: "Never (I always start early)", maxLabel: "Almost always start right before the deadline" },
  T3: { prompt: "Right before something you don't want to do?", optionLabels: ["I want to get it done quickly so I can relax", "It's a burden, but I start", "I end up doing other things first", "I end up doing distractions like cleaning or organizing first"] },
  T4: { prompt: "Something I don't want to do only gets my hands moving once the deadline is right on top of me.", optionLabels: ["Not at all true", "Very true"] },
  T5: { prompt: "When you look at your to-do list?", optionLabels: ["I handle it by priority", "I get through most of it", "I do the easy ones first and put off the hard ones", "Just looking at it makes me not want to do it, so I close it"] },
  T6: { prompt: "When something you've been putting off crosses your mind?", optionLabels: ["I go take care of it right away", "I think 'I'll do it in a bit'", "I try hard not to think about it", "I keep avoiding it even though it makes me anxious"] },
  T7: { prompt: "How much do you have things you repeatedly put off?", optionLabels: ["Almost none", "A few", "Quite a few", "I'm always putting off the same things"] },
  T8: { prompt: "When you're rushed by the deadline after procrastinating?", optionLabels: ["I regret not doing it earlier and make sure not to next time", "I regret it, but do it again anyway", "This pattern already feels familiar", "I feel bad about myself for doing this every time and never fixing it"] },
  T9: { prompt: "How do you feel right before starting a task?", optionLabels: ["I start with a light heart", "I start carrying some pressure", "Just starting feels like a huge mountain", "Just thinking about it makes me want to avoid it"] },
  T10: { prompt: "When the things you've put off start piling up?", optionLabels: ["I sort through them one by one", "I get anxious, but handle it", "I feel overwhelmed and end up doing even less", "I just ignore it completely"] },
  D1: { prompt: "When there are several options?", optionLabels: ["I quickly pick one", "I think it over a little, then pick", "I compare for a long while before picking", "I can't decide at all and leave it to someone else"] },
  D2: { prompt: "How tangled does your mind get when you have to make a decision?", minLabel: "Not tangled at all", maxLabel: "Extremely tangled (thoughts get all jumbled up)" },
  D3: { prompt: "When you look at a menu?", optionLabels: ["I decide right away", "I think a bit, then decide", "I stare at it for a long while", "I end up asking the person next to me to choose for me"] },
  D4: { prompt: "Even for a trivial decision, I only feel at ease once I've considered every possible outcome in my head.", optionLabels: ["Not at all true", "Very true"] },
  D5: { prompt: "After you've made a decision?", optionLabels: ["I don't think about it anymore", "I look back on it occasionally", "I often wonder if another choice would've been better", "I keep regretting it and dwelling on it"] },
  D6: { prompt: "When facing an important decision?", optionLabels: ["I judge and decide for myself", "I ask people around me and decide", "I want to push the decision onto someone else", "I desperately wish someone would just decide for me"] },
  D7: { prompt: "When looking things up?", optionLabels: ["I organize what I have and decide at a reasonable point", "I look a bit more before deciding", "I end up endlessly looking for more", "There's so much information that I can't decide at all"] },
  D8: { prompt: "When you put off a decision?", optionLabels: ["It's nice to have the breathing room", "It's fine", "It actually makes me more anxious", "The options themselves become a source of stress"] },
  D9: { prompt: "How often does the thought \"what if I make the wrong choice\" come up?", optionLabels: ["Almost never", "Sometimes", "Every time I have to decide", "Sometimes that thought stops me from deciding at all"] },
  D10: { prompt: "When facing a big life decision (career, moving, etc.)?", optionLabels: ["I trust it'll naturally sort itself out when the time comes", "I think it through carefully, step by step", "I put it off for a long time without deciding", "The decision itself scares me, so I avoid it"] },
};

export const MODULE5_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  P1: { prompt: "Cuando no tienes la certeza de que saldrá perfecto, ¿cuánto retrasas incluso el momento de empezar?", minLabel: "Nunca lo retraso", maxLabel: "Sin certeza, siempre lo retraso" },
  P2: { prompt: "Cuando dudas de cómo va a quedar el resultado, ¿qué haces?", optionLabels: ["Lo intento y lo corrijo sobre la marcha", "Lo voy puliendo mientras avanzo", "Espero a tener un plan perfecto", "Sin certeza, ni siquiera empiezo"] },
  P3: { prompt: "En los últimos momentos antes de entregar o presentar algo, ¿cómo lo vives?", optionLabels: ["Termino con tiempo de sobra", "Lo repaso un poco a última hora", "Sigo corrigiendo y la fecha de entrega me pisa los talones", "Como nunca me convence, no consigo soltarlo hasta el final"] },
  P4: { prompt: "Si no puedo hacerlo perfecto, prefiero no empezar.", optionLabels: ["Nada cierto", "Muy cierto"] },
  P5: { prompt: "Si tienes que enseñar a alguien algo que aún no está terminado, ¿qué sientes?", optionLabels: ["Lo enseño con naturalidad", "Me incomoda un poco, pero lo enseño", "No dejo de pensar en lo que le falta", "Preferiría esconderlo antes que enseñarlo"] },
  P6: { prompt: "Cuando haces un plan, ¿cómo lo haces?", optionLabels: ["Lo esbozo a grandes rasgos y me pongo en marcha enseguida", "Lo hago con un nivel de detalle razonable", "No me muevo hasta haber pensado en todas las variables", "Si el plan no es perfecto, no soy capaz de moverme"] },
  P7: { prompt: "Ante una tarea en la que podrías equivocarte, ¿qué haces?", optionLabels: ["Lo intento sin más", "Avanzo con cuidado", "Lo reviso varias veces antes de seguir", "Lo dejo para más adelante si no tengo la seguridad de no fallar"] },
  P8: { prompt: "Si se acerca la fecha de entrega y el resultado no te convence, ¿qué haces?", optionLabels: ["Entrego a tiempo tal como está", "Lo pulo un poco más y entrego", "Lo corrijo aunque me pase un poco de la fecha", "Lo dejo perfecto, tarde lo que tarde"] },
  P9: { prompt: "¿Con qué facilidad llegas a pensar «así está bien»?", optionLabels: ["Lo doy por bueno con bastante facilidad", "Llego a ese punto en un momento razonable", "Me cuesta darlo por bueno", "Siempre siento que falta algo, así que no lo suelto"] },
  P10: { prompt: "Ante un reto nuevo, ¿qué haces?", optionLabels: ["Me lanzo sin más", "Me preparo y luego empiezo", "Lo dejo para cuando tenga todo perfectamente preparado", "Creo que es mejor no hacerlo que fracasar"] },
  T1: { prompt: "Cuando aparece algo que no te apetece nada hacer, ¿qué haces?", optionLabels: ["Me pongo con ello enseguida", "Lo dejo para luego, pero acabo haciéndolo", "Lo aplazo todo lo que puedo", "No lo toco hasta que ya no hay más remedio"] },
  T2: { prompt: "¿Con qué frecuencia empiezas solo cuando la fecha límite ya está encima?", minLabel: "Nunca (siempre empiezo con tiempo)", maxLabel: "Casi siempre empiezo a última hora" },
  T3: { prompt: "Justo antes de ponerte con algo que no te apetece, ¿qué te pasa?", optionLabels: ["Quiero acabar cuanto antes para poder relajarme", "Me pesa, pero empiezo", "Acabo haciendo otras cosas antes", "Me pongo a limpiar, ordenar o hacer cualquier otra cosa antes"] },
  T4: { prompt: "Lo que no me apetece hacer solo lo empiezo cuando la fecha límite ya está encima.", optionLabels: ["Nada cierto", "Muy cierto"] },
  T5: { prompt: "Cuando miras tu lista de tareas pendientes, ¿qué haces?", optionLabels: ["Las hago por orden de prioridad", "Voy sacando la mayoría", "Hago primero las fáciles y dejo las difíciles", "Con solo verla se me quitan las ganas, así que la cierro"] },
  T6: { prompt: "Cuando te viene a la cabeza algo que llevas tiempo aplazando, ¿qué haces?", optionLabels: ["Me pongo con ello enseguida", "Pienso «lo hago dentro de un rato»", "Intento no pensar en ello", "Lo sigo evitando aunque me genere ansiedad"] },
  T7: { prompt: "¿Cuántas cosas dejas para más adelante una y otra vez?", optionLabels: ["Casi ninguna", "Unas pocas", "Bastantes", "Siempre estoy aplazando las mismas cosas"] },
  T8: { prompt: "Cuando la fecha límite te agobia después de haber aplazado algo, ¿cómo lo vives?", optionLabels: ["Me arrepiento de no haberlo hecho antes y me cuido de que no vuelva a pasar", "Me arrepiento, pero luego me pasa otra vez", "Es un patrón que ya me resulta familiar", "Me juzgo con dureza porque me pasa siempre y no consigo cambiarlo"] },
  T9: { prompt: "¿Cómo te sientes justo antes de empezar una tarea?", optionLabels: ["Empiezo con ánimo ligero", "Empiezo con algo de presión", "Solo empezar me parece una montaña enorme", "Solo de pensarlo ya quiero evitarlo"] },
  T10: { prompt: "Cuando lo que has ido aplazando empieza a acumularse, ¿qué haces?", optionLabels: ["Lo voy ordenando y resolviendo una cosa tras otra", "Me entra ansiedad, pero lo resuelvo", "Me supera y acabo haciendo todavía menos", "Lo ignoro por completo"] },
  D1: { prompt: "Cuando tienes varias opciones delante, ¿qué haces?", optionLabels: ["Elijo una rápidamente", "Lo pienso un poco y elijo", "Comparo durante un buen rato antes de elegir", "No consigo decidirme y dejo que otra persona elija"] },
  D2: { prompt: "Cuando tienes que tomar una decisión, ¿cuánto se te enreda la cabeza?", minLabel: "Nada", maxLabel: "Muchísimo (los pensamientos se me mezclan)" },
  D3: { prompt: "Cuando te dan la carta en un restaurante, ¿qué haces?", optionLabels: ["Decido enseguida", "Lo pienso un poco y decido", "Me quedo mirándola un buen rato", "Acabo pidiendo a quien tengo al lado que elija por mí"] },
  D4: { prompt: "Incluso ante una decisión sin importancia, solo consigo tranquilizarme cuando repaso mentalmente todos los resultados posibles.", optionLabels: ["Nada cierto", "Muy cierto"] },
  D5: { prompt: "Cuando ya has tomado una decisión, ¿qué pasa después?", optionLabels: ["No le doy más vueltas", "De vez en cuando la recuerdo", "Me pregunto a menudo si otra opción habría sido mejor", "Me sigo arrepintiendo y no dejo de darle vueltas"] },
  D6: { prompt: "Ante una decisión importante, ¿qué haces?", optionLabels: ["Lo valoro y decido por mi cuenta", "Consulto con la gente de mi entorno y luego decido", "Querría que otra persona cargara con la decisión", "Deseo con todas mis fuerzas que alguien decida por mí"] },
  D7: { prompt: "Cuando te informas antes de decidir, ¿cómo te sueles comportar?", optionLabels: ["Ordeno lo que tengo y decido cuando me parece razonable", "Busco un poco más antes de decidir", "Acabo buscando sin parar", "Hay tanta información que no consigo decidirme"] },
  D8: { prompt: "Cuando aplazas una decisión, ¿cómo te sientes?", optionLabels: ["Me viene bien tener ese respiro", "Me da igual", "En realidad me genera más ansiedad", "Las propias opciones se convierten en una fuente de estrés"] },
  D9: { prompt: "¿Con qué frecuencia te viene el pensamiento «¿y si elijo mal?»?", optionLabels: ["Casi nunca", "A veces", "Cada vez que tengo que decidir", "A veces ese pensamiento me impide decidir"] },
  D10: { prompt: "Ante una gran decisión de vida (trabajo, mudanza, etc.), ¿qué haces?", optionLabels: ["Confío en que se irá aclarando cuando llegue el momento", "Lo pienso con calma, paso a paso", "Lo dejo pasar mucho tiempo sin decidir", "La propia decisión me da miedo, así que la evito"] },
};

export const MODULE5_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  perfectionism: 10,
  avoidance: 10,
  decisionParalysis: 10,
};

export const MODULE5_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    perfectionism: { high: "완벽주의", low: "일단 시작하는 유연함" },
    avoidance: { high: "회피", low: "즉시 실행력" },
    decisionParalysis: { high: "선택마비", low: "결정의 명료함" },
  },
  en: {
    perfectionism: { high: "Perfectionism", low: "Flexibility to Just Start" },
    avoidance: { high: "Avoidance", low: "Immediate Action" },
    decisionParalysis: { high: "Decision Paralysis", low: "Clarity in Decisions" },
  },
  es: {
    perfectionism: { high: "Perfeccionismo", low: "Soltura para empezar" },
    avoidance: { high: "Evitación", low: "Acción inmediata" },
    decisionParalysis: { high: "Dificultad para decidir", low: "Claridad para decidir" },
  },
};

export const MODULE5_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "안정 실행형", hook: "완벽주의·회피·선택마비 어느 쪽도 뚜렷하지 않은, 비교적 실행이 원활한 상태입니다." },
    perfectionism: { title: "완벽주의형", hook: "확신이 서지 않으면 시작 자체를 미루는, 높은 기준이 발목을 잡는 패턴입니다." },
    avoidance: { title: "회피형", hook: "하기 싫은 일은 마감 직전까지 손을 대지 않는 패턴입니다." },
    decisionParalysis: { title: "선택마비형", hook: "선택지 앞에서 머릿속이 복잡해지고, 결정을 내리는 것 자체가 큰 부담입니다." },
    "perfectionism+avoidance": { title: "완벽주의적 회피형", hook: "완벽하지 않을 바엔 시작을 미루는, 회피와 완벽주의가 서로를 강화하는 패턴입니다." },
    "perfectionism+decisionParalysis": { title: "정지된 완벽주의형", hook: "완벽한 선택을 하려다 결정 자체를 내리지 못하는 패턴입니다." },
    "avoidance+decisionParalysis": { title: "미루는 우유부단형", hook: "결정도 실행도 뒤로 미루며, 둘 다 부담스럽게 느끼는 패턴입니다." },
    "perfectionism+avoidance+decisionParalysis": { title: "복합 정체형", hook: "완벽주의, 회피, 선택마비가 모두 강하게 얽혀 실행이 크게 막혀 있는 상태입니다." },
  },
  en: {
    baseline: { title: "Steady Executor", hook: "Neither perfectionism, avoidance, nor decision paralysis stands out clearly — you get things done relatively smoothly." },
    perfectionism: { title: "Perfectionist Type", hook: "If you're not sure it'll be good, you put off even starting — high standards that end up holding you back." },
    avoidance: { title: "Avoidant Type", hook: "You don't touch things you don't want to do until right before the deadline." },
    decisionParalysis: { title: "Decision-Paralyzed Type", hook: "Your mind gets tangled in front of options, and making a decision at all feels like a huge burden." },
    "perfectionism+avoidance": { title: "Perfectionist Avoider", hook: "Rather than do it imperfectly, you delay starting — avoidance and perfectionism reinforcing each other." },
    "perfectionism+decisionParalysis": { title: "Frozen Perfectionist", hook: "Trying to make the perfect choice leaves you unable to decide at all." },
    "avoidance+decisionParalysis": { title: "Procrastinating Indecisive", hook: "You push back both deciding and doing — both feel like a burden." },
    "perfectionism+avoidance+decisionParalysis": { title: "Compound Stuck Type", hook: "Perfectionism, avoidance, and decision paralysis are all strongly tangled together, leaving you quite stuck." },
  },
  es: {
    baseline: { title: "Constancia tranquila", hook: "Ni el perfeccionismo, ni la evitación, ni la dificultad para decidir destacan con claridad: llevas las cosas adelante con relativa fluidez." },
    perfectionism: { title: "Perfeccionismo que frena", hook: "Cuando no tienes la certeza de que saldrá bien, aplazas incluso el primer paso: unos estándares muy altos que acaban frenándote." },
    avoidance: { title: "Última hora", hook: "Lo que no te apetece hacer no lo tocas hasta que la fecha límite está encima." },
    decisionParalysis: { title: "Cabeza llena de opciones", hook: "Ante las opciones, tu mente se enreda y el simple hecho de decidir pesa mucho." },
    "perfectionism+avoidance": { title: "Perfección que se aplaza", hook: "Si no puede salir perfecto, prefieres retrasar el comienzo: perfeccionismo y evitación se refuerzan entre sí." },
    "perfectionism+decisionParalysis": { title: "Perfección en pausa", hook: "Buscar la decisión perfecta te deja sin poder decidir nada." },
    "avoidance+decisionParalysis": { title: "Decisiones en la sala de espera", hook: "Aplazas tanto el decidir como el hacer, y las dos cosas te pesan." },
    "perfectionism+avoidance+decisionParalysis": { title: "Atasco de tres frentes", hook: "Perfeccionismo, evitación y dificultad para decidir se entrelazan con fuerza, y te cuesta mucho ponerte en marcha." },
  },
};
