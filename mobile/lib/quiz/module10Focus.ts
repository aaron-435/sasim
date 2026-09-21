/**
 * lib/module10Focus.ts
 * ------------------------------------------------------------------
 * Module 10 — 몰입/산만함 패턴 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈10_몰입_30문항_전문가검토용.xlsx). 3차원(주의 조절 스펙트럼, 임상 진단
 * 목적 아님): 산만함(D1-D10) / 과집중(H1-H10) / 충동성(I1-I10). 모든 문항이
 * 4지선다 또는 극단형(0/3)이며, 슬라이더 문항은 없다.
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE10_QUESTIONS: ModuleQuestion[] = [
  // ---- 산만함 (Distractibility) — D1-D10 ----
  { id: "D1", dimension: "distractibility", format: "choice", prompt: "일하다가?", options: [
    { label: "끝까지 집중해서 마친다", score: 0 }, { label: "가끔 딴생각이 든다", score: 1 },
    { label: "자주 다른 일이 눈에 들어온다", score: 2 }, { label: "금방 다른 걸 하고 있다", score: 3 } ] },
  { id: "D2", dimension: "distractibility", format: "choice", prompt: "한 가지 일을 하다가도, 눈에 보이는 다른 자극(알림, 소리 등)에 바로 정신이 팔린다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "D3", dimension: "distractibility", format: "choice", prompt: "대화 중에?", options: [
    { label: "끝까지 집중해서 듣는다", score: 0 }, { label: "대체로 집중한다", score: 1 },
    { label: "중간에 딴생각이 든다", score: 2 }, { label: "놓친 부분을 다시 물어볼 때가 많다", score: 3 } ] },
  { id: "D4", dimension: "distractibility", format: "choice", prompt: "책상이나 작업 공간이?", options: [
    { label: "정리된 상태를 유지한다", score: 0 }, { label: "적당히 정리한다", score: 1 },
    { label: "금방 어질러진다", score: 2 }, { label: "여러 일을 벌여놓고 못 치운다", score: 3 } ] },
  { id: "D5", dimension: "distractibility", format: "choice", prompt: "하나의 일을 끝내기 전에, 다른 흥미로운 일이 생기면 바로 그쪽으로 넘어가 버린다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "D6", dimension: "distractibility", format: "choice", prompt: "지루한 일을 할 때?", options: [
    { label: "꾹 참고 끝낸다", score: 0 }, { label: "버티면서 한다", score: 1 },
    { label: "자꾸 다른 생각이 든다", score: 2 }, { label: "도저히 집중이 안 된다", score: 3 } ] },
  { id: "D7", dimension: "distractibility", format: "choice", prompt: "물건(열쇠, 지갑 등)을 어디 뒀는지?", options: [
    { label: "거의 안 잊는다", score: 0 }, { label: "가끔 헷갈린다", score: 1 },
    { label: "자주 못 찾는다", score: 2 }, { label: "매번 찾아 헤맨다", score: 3 } ] },
  { id: "D8", dimension: "distractibility", format: "choice", prompt: "여러 창을 켜놓고 이것저것 왔다갔다 하다 보면, 원래 뭘 하려고 했는지 잊어버릴 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "D9", dimension: "distractibility", format: "choice", prompt: "계획을 세워도?", options: [
    { label: "그대로 실행한다", score: 0 }, { label: "대체로 따른다", score: 1 },
    { label: "금방 흐트러진다", score: 2 }, { label: "계획 자체를 까먹을 때가 많다", score: 3 } ] },
  { id: "D10", dimension: "distractibility", format: "choice", prompt: "지금 하는 일과 관련 없는 생각이?", options: [
    { label: "거의 안 든다", score: 0 }, { label: "가끔 든다", score: 1 },
    { label: "자주 끼어든다", score: 2 }, { label: "끊임없이 떠올라 방해된다", score: 3 } ] },
  // ---- 과집중 (Hyperfocus) — H1-H10 ----
  { id: "H1", dimension: "hyperfocus", format: "choice", prompt: "관심 있는 일을 하면?", options: [
    { label: "적당히 몰입한다", score: 0 }, { label: "꽤 집중한다", score: 1 },
    { label: "시간 가는 줄 모른다", score: 2 }, { label: "주변이 하나도 안 들릴 정도로 빠져든다", score: 3 } ] },
  { id: "H2", dimension: "hyperfocus", format: "choice", prompt: "좋아하는 일에 빠지면, 밥 먹는 것도 잊을 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "H3", dimension: "hyperfocus", format: "choice", prompt: "몰입했다가 빠져나오면?", options: [
    { label: "자연스럽게 전환된다", score: 0 }, { label: "약간 시간이 걸린다", score: 1 },
    { label: "현실 감각을 되찾는 데 시간이 걸린다", score: 2 }, { label: "누가 불러야 겨우 정신을 차린다", score: 3 } ] },
  { id: "H4", dimension: "hyperfocus", format: "choice", prompt: "흥미로운 주제를 파고들 때?", options: [
    { label: "적당한 선에서 멈춘다", score: 0 }, { label: "꽤 깊이 알아본다", score: 1 },
    { label: "밤새 파고들 때가 있다", score: 2 }, { label: "다른 할 일을 잊을 정도로 몰두한다", score: 3 } ] },
  { id: "H5", dimension: "hyperfocus", format: "choice", prompt: "하나에 꽂히면, 다른 중요한 일들을 완전히 뒷전으로 미루게 된다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "H6", dimension: "hyperfocus", format: "choice", prompt: "몰입 중에 누가 말을 걸면?", options: [
    { label: "바로 반응한다", score: 0 }, { label: "조금 늦게 반응한다", score: 1 },
    { label: "못 들을 때가 많다", score: 2 }, { label: "완전히 못 듣는다", score: 3 } ] },
  { id: "H7", dimension: "hyperfocus", format: "choice", prompt: "시간 관리 앱이나 알람이 없다면?", options: [
    { label: "스스로 시간을 잘 지킨다", score: 0 }, { label: "대체로 지킨다", score: 1 },
    { label: "몰입하면 시간을 놓친다", score: 2 }, { label: "몇 시간이 훌쩍 지나있다", score: 3 } ] },
  { id: "H8", dimension: "hyperfocus", format: "choice", prompt: "몰입했던 일을 끝내고 나면?", options: [
    { label: "다른 일로 무난히 전환한다", score: 0 }, { label: "약간의 여운이 있다", score: 1 },
    { label: "한동안 멍하다", score: 2 }, { label: "완전히 방전된 느낌이다", score: 3 } ] },
  { id: "H9", dimension: "hyperfocus", format: "choice", prompt: "흥미가 떨어진 일은?", options: [
    { label: "그래도 마무리한다", score: 0 }, { label: "어느 정도 마무리한다", score: 1 },
    { label: "손이 잘 안 간다", score: 2 }, { label: "거의 손을 놓아버린다", score: 3 } ] },
  { id: "H10", dimension: "hyperfocus", format: "choice", prompt: "몰입할 때와 안 할 때의 나는?", options: [
    { label: "큰 차이가 없다", score: 0 }, { label: "약간 다르다", score: 1 },
    { label: "꽤 다른 사람 같다", score: 2 }, { label: "극과 극으로 다르다", score: 3 } ] },
  // ---- 충동성 (Impulsivity) — I1-I10 ----
  { id: "I1", dimension: "impulsivity", format: "choice", prompt: "하고 싶은 게 생기면?", options: [
    { label: "계획부터 세운다", score: 0 }, { label: "잠깐 고민하고 시작한다", score: 1 },
    { label: "바로 시작한다", score: 2 }, { label: "생각과 동시에 행동한다", score: 3 } ] },
  { id: "I2", dimension: "impulsivity", format: "choice", prompt: "말하기 전에 생각하기보다, 일단 말부터 튀어나올 때가 많다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "I3", dimension: "impulsivity", format: "choice", prompt: "벌여놓은 일(취미, 프로젝트 등)이?", options: [
    { label: "거의 없다", score: 0 }, { label: "한두 개 있다", score: 1 },
    { label: "꽤 여러 개 있다", score: 2 }, { label: "시작만 하고 끝낸 게 거의 없다", score: 3 } ] },
  { id: "I4", dimension: "impulsivity", format: "choice", prompt: "충동구매는?", options: [
    { label: "거의 안 한다", score: 0 }, { label: "가끔 한다", score: 1 },
    { label: "자주 한다", score: 2 }, { label: "나중에 후회할 때가 많다", score: 3 } ] },
  { id: "I5", dimension: "impulsivity", format: "choice", prompt: "줄을 서거나 기다려야 하는 상황이 유독 견디기 힘들다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "I6", dimension: "impulsivity", format: "choice", prompt: "규칙적인 루틴(운동, 습관 등)을?", options: [
    { label: "꾸준히 지킨다", score: 0 }, { label: "대체로 지킨다", score: 1 },
    { label: "금방 흐지부지된다", score: 2 }, { label: "며칠 못 가서 그만둔다", score: 3 } ] },
  { id: "I7", dimension: "impulsivity", format: "choice", prompt: "대화 중 끼어들고 싶은 충동은?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "참기 어려워서 자주 끼어든다", score: 3 } ] },
  { id: "I8", dimension: "impulsivity", format: "choice", prompt: "결과를 예상하지 못한 행동을 한 뒤?", options: [
    { label: "거의 그런 적 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "종종 있다", score: 2 }, { label: "자주 있어서 스스로도 놀란다", score: 3 } ] },
  { id: "I9", dimension: "impulsivity", format: "choice", prompt: "하나를 진득하게 끝내기보다, 새로운 걸 벌이는 게 더 끌린다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "I10", dimension: "impulsivity", format: "choice", prompt: "감정이 확 올라오면 행동은?", options: [
    { label: "한 박자 쉬고 행동한다", score: 0 }, { label: "조금 자제한다", score: 1 },
    { label: "거의 바로 행동으로 나온다", score: 2 }, { label: "생각할 틈도 없이 행동한다", score: 3 } ] },
];

// Display-text-only translations of MODULE10_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE10_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  D1: { prompt: "While working on something?", optionLabels: ["I stay focused and finish it", "I get a stray thought occasionally", "Other things often catch my eye", "I'm quickly doing something else"] },
  D2: { prompt: "Even in the middle of one task, another visible stimulus (a notification, a sound, etc.) instantly grabs my attention.", optionLabels: ["Not at all true", "Very true"] },
  D3: { prompt: "During a conversation?", optionLabels: ["I listen with full focus throughout", "I stay mostly focused", "My mind wanders partway through", "I often have to ask again about parts I missed"] },
  D4: { prompt: "How does your desk or workspace stay?", optionLabels: ["It stays organized", "I tidy it up reasonably", "It gets messy quickly", "I leave several things out and can't clean up"] },
  D5: { prompt: "Before finishing one task, if something else interesting comes up, I immediately switch over to it.", optionLabels: ["Not at all true", "Very true"] },
  D6: { prompt: "When doing something boring?", optionLabels: ["I push through and finish it", "I get through it by enduring it", "My mind keeps wandering", "I just can't focus at all"] },
  D7: { prompt: "How well do you remember where you put things (keys, your wallet, etc.)?", optionLabels: ["I almost never forget", "I get confused sometimes", "I often can't find them", "I'm searching for them every time"] },
  D8: { prompt: "When I have several windows open and keep switching between them, there are times I forget what I was originally trying to do.", optionLabels: ["Not at all true", "Very true"] },
  D9: { prompt: "Even when you make a plan?", optionLabels: ["I follow through with it exactly", "I mostly follow it", "It falls apart quickly", "I often forget the plan itself"] },
  D10: { prompt: "How often do thoughts unrelated to what you're doing pop up?", optionLabels: ["Almost never", "Occasionally", "They often intrude", "They keep coming up nonstop and get in the way"] },
  H1: { prompt: "When doing something you're interested in?", optionLabels: ["I get reasonably absorbed", "I focus quite a bit", "I lose track of time", "I get so absorbed I don't notice anything around me"] },
  H2: { prompt: "When I get absorbed in something I love, there are times I forget to eat.", optionLabels: ["Not at all true", "Very true"] },
  H3: { prompt: "When you come out of a state of deep focus?", optionLabels: ["The transition feels natural", "It takes a bit of time", "It takes time to get my bearings back", "Someone has to call my name for me to snap out of it"] },
  H4: { prompt: "When digging into a topic you find interesting?", optionLabels: ["I stop at a reasonable point", "I look into it fairly deeply", "There are times I stay up all night on it", "I get so absorbed I forget other things I need to do"] },
  H5: { prompt: "Once something hooks me, I completely put other important things on the back burner.", optionLabels: ["Not at all true", "Very true"] },
  H6: { prompt: "When someone talks to you while you're deeply focused?", optionLabels: ["I respond right away", "I respond a bit late", "I often don't hear it", "I completely don't hear it"] },
  H7: { prompt: "Without a time-management app or alarm?", optionLabels: ["I keep good track of time on my own", "I mostly keep track", "I lose track of time when I'm absorbed", "Hours slip by before I notice"] },
  H8: { prompt: "After finishing something you were deeply absorbed in?", optionLabels: ["I switch to something else without trouble", "There's a bit of a lingering feeling", "I feel dazed for a while", "I feel completely drained"] },
  H9: { prompt: "For tasks you've lost interest in?", optionLabels: ["I still finish them", "I finish them to some degree", "I have trouble getting to them", "I pretty much abandon them"] },
  H10: { prompt: "How different are you when absorbed versus not absorbed?", optionLabels: ["Not much different", "A bit different", "Like a fairly different person", "Like two completely opposite extremes"] },
  I1: { prompt: "When you feel like doing something?", optionLabels: ["I make a plan first", "I think it over briefly, then start", "I start right away", "I act the moment I think of it"] },
  I2: { prompt: "Rather than thinking before I speak, the words often come out first.", optionLabels: ["Not at all true", "Very true"] },
  I3: { prompt: "How many things have you started (hobbies, projects, etc.) but not finished?", optionLabels: ["Almost none", "One or two", "Quite a few", "I've barely finished anything I started"] },
  I4: { prompt: "How often do you make impulse purchases?", optionLabels: ["Almost never", "Occasionally", "Often", "I often regret it later"] },
  I5: { prompt: "Having to wait in line or wait for something is unusually hard for me to bear.", optionLabels: ["Not at all true", "Very true"] },
  I6: { prompt: "How well do you keep a regular routine (exercise, habits, etc.)?", optionLabels: ["I keep it up consistently", "I mostly keep it up", "It quickly fizzles out", "I give up on it within days"] },
  I7: { prompt: "How strong is your urge to interrupt during a conversation?", optionLabels: ["Almost none", "Occasionally", "Often", "I often interrupt because it's hard to resist"] },
  I8: { prompt: "How often do you act without anticipating the consequences?", optionLabels: ["Almost never", "Occasionally", "Fairly often", "Often enough that it surprises even me"] },
  I9: { prompt: "Starting something new appeals to me more than sticking with one thing until it's done.", optionLabels: ["Not at all true", "Very true"] },
  I10: { prompt: "When a strong emotion suddenly hits, how do you act?", optionLabels: ["I pause a beat before acting", "I hold back a little", "It almost immediately turns into action", "I act without even a moment to think"] },
};

export const MODULE10_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  D1: { prompt: "Cuando estás trabajando en algo, ¿qué te pasa?", optionLabels: ["Mantengo la concentración hasta terminarlo", "De vez en cuando se me va el pensamiento", "A menudo otras cosas me llaman la atención", "Enseguida estoy haciendo otra cosa"] },
  D2: { prompt: "Aunque esté en plena tarea, otro estímulo visible (una notificación, un sonido, etc.) me distrae al instante.", optionLabels: ["No me describe", "Me describe mucho"] },
  D3: { prompt: "Durante una conversación, ¿qué te pasa?", optionLabels: ["Escucho con toda mi atención de principio a fin", "Sigo la conversación casi todo el tiempo", "Se me va la cabeza a mitad de conversación", "A menudo tengo que preguntar de nuevo lo que me perdí"] },
  D4: { prompt: "¿Cómo se mantiene tu escritorio o tu espacio de trabajo?", optionLabels: ["Ordenado", "Lo ordeno con cierta regularidad", "Se desordena enseguida", "Dejo varias cosas fuera de lugar y no logro ordenarlo"] },
  D5: { prompt: "Antes de terminar una tarea, si aparece algo más interesante, cambio a eso al instante.", optionLabels: ["No me describe", "Me describe mucho"] },
  D6: { prompt: "Cuando haces algo aburrido, ¿qué te pasa?", optionLabels: ["Aguanto y lo termino", "Lo saco adelante a base de paciencia", "Se me va la cabeza una y otra vez", "Simplemente no logro concentrarme"] },
  D7: { prompt: "¿Qué tan bien recuerdas dónde dejaste las cosas (las llaves, tus documentos, etc.)?", optionLabels: ["Casi nunca se me olvida", "A veces me confundo", "A menudo no las encuentro", "Las busco cada vez"] },
  D8: { prompt: "Cuando tengo varias ventanas abiertas y voy saltando de una a otra, a veces olvido lo que quería hacer al principio.", optionLabels: ["No me describe", "Me describe mucho"] },
  D9: { prompt: "Incluso cuando haces un plan, ¿qué pasa?", optionLabels: ["Lo sigo tal como lo hice", "Lo sigo en su mayor parte", "Se desmorona enseguida", "Muchas veces olvido el plan mismo"] },
  D10: { prompt: "¿Con qué frecuencia te vienen pensamientos que nada tienen que ver con lo que estás haciendo?", optionLabels: ["Casi nunca", "De vez en cuando", "Se cuelan a menudo", "Aparecen sin parar y me estorban"] },
  H1: { prompt: "Cuando haces algo que te interesa, ¿qué te pasa?", optionLabels: ["Me meto en ello con normalidad", "Me concentro bastante", "Pierdo la noción del tiempo", "Me absorbo tanto que no noto nada de lo que pasa a mi alrededor"] },
  H2: { prompt: "Cuando me sumerjo en algo que me encanta, a veces me olvido de comer.", optionLabels: ["No me describe", "Me describe mucho"] },
  H3: { prompt: "Cuando sales de un estado de concentración profunda, ¿cómo es la vuelta?", optionLabels: ["La transición me resulta natural", "Lleva un poco de tiempo", "Me cuesta un rato volver a situarme", "Alguien tiene que llamarme para que reaccione"] },
  H4: { prompt: "Cuando profundizas en un tema que te interesa, ¿hasta dónde llegas?", optionLabels: ["Me detengo en un punto razonable", "Investigo bastante a fondo", "A veces me quedo toda la noche con ello", "Me absorbo tanto que olvido otras cosas que tengo que hacer"] },
  H5: { prompt: "Cuando algo me atrapa, dejo otras cosas importantes completamente en segundo plano.", optionLabels: ["No me describe", "Me describe mucho"] },
  H6: { prompt: "Cuando alguien te habla mientras estás en plena concentración, ¿qué pasa?", optionLabels: ["Respondo enseguida", "Respondo con un poco de retraso", "Muchas veces no lo oigo", "No lo oigo en absoluto"] },
  H7: { prompt: "Sin un temporizador ni una alarma, ¿cómo llevas el control del tiempo?", optionLabels: ["Lo controlo bien por mi cuenta", "Por lo general lo controlo", "Pierdo la noción del tiempo cuando me absorbo", "Pasan horas sin que me dé cuenta"] },
  H8: { prompt: "Cuando terminas algo que te había absorbido por completo, ¿qué te pasa?", optionLabels: ["Paso a otra cosa sin problema", "Me queda una pequeña sensación residual", "Me queda un rato la sensación de aturdimiento", "Me quedo sin energía"] },
  H9: { prompt: "Con las tareas que han dejado de interesarte, ¿qué haces?", optionLabels: ["Las termino igualmente", "Las termino hasta cierto punto", "Me cuesta ponerme con ellas", "Prácticamente las abandono"] },
  H10: { prompt: "¿Cuánto cambias entre los momentos en que te sumerges en algo y los demás?", optionLabels: ["Casi nada", "Un poco", "Parezco una persona bastante distinta", "Parecen dos extremos completamente opuestos"] },
  I1: { prompt: "Cuando te apetece hacer algo, ¿qué haces?", optionLabels: ["Primero hago un plan", "Lo pienso un momento y empiezo", "Empiezo enseguida", "Actúo en cuanto se me ocurre"] },
  I2: { prompt: "En lugar de pensar antes de hablar, muchas veces las palabras me salen primero.", optionLabels: ["No me describe", "Me describe mucho"] },
  I3: { prompt: "¿Cuántas cosas has empezado (aficiones, proyectos, etc.) y no has terminado?", optionLabels: ["Casi ninguna", "Una o dos", "Bastantes", "Casi nada de lo que empecé llegó a terminarse"] },
  I4: { prompt: "¿Con qué frecuencia haces compras por impulso?", optionLabels: ["Casi nunca", "De vez en cuando", "A menudo", "Muchas veces me arrepiento después"] },
  I5: { prompt: "Tener que esperar mi turno o esperar a que algo suceda me resulta especialmente difícil de soportar.", optionLabels: ["No me describe", "Me describe mucho"] },
  I6: { prompt: "¿Qué tan bien mantienes una rutina regular (ejercicio, hábitos, etc.)?", optionLabels: ["La mantengo con constancia", "La mantengo casi siempre", "Se me apaga enseguida", "La abandono a los pocos días"] },
  I7: { prompt: "¿Cuánta necesidad sientes de interrumpir durante una conversación?", optionLabels: ["Casi ninguna", "De vez en cuando", "A menudo", "Interrumpo a menudo porque me cuesta resistirme"] },
  I8: { prompt: "¿Con qué frecuencia actúas sin prever las consecuencias?", optionLabels: ["Casi nunca", "De vez en cuando", "Bastante a menudo", "Tan a menudo que hasta a mí me sorprende"] },
  I9: { prompt: "Empezar algo nuevo me atrae más que seguir con una sola cosa hasta terminarla.", optionLabels: ["No me describe", "Me describe mucho"] },
  I10: { prompt: "Cuando una emoción fuerte te sacude de repente, ¿cómo actúas?", optionLabels: ["Espero un momento antes de actuar", "Me contengo un poco", "Casi de inmediato se convierte en acción", "Actúo sin tener ni un instante para pensar"] },
};

export const MODULE10_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  distractibility: 10,
  hyperfocus: 10,
  impulsivity: 10,
};

export const MODULE10_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    distractibility: { high: "산만함", low: "안정적인 집중" },
    hyperfocus: { high: "과집중", low: "유연한 전환" },
    impulsivity: { high: "충동성", low: "신중한 판단" },
  },
  en: {
    distractibility: { high: "Distractibility", low: "Stable Focus" },
    hyperfocus: { high: "Hyperfocus", low: "Flexible Switching" },
    impulsivity: { high: "Impulsivity", low: "Careful Judgment" },
  },
  es: {
    distractibility: { high: "Distracción", low: "Concentración estable" },
    hyperfocus: { high: "Hiperfoco", low: "Cambio flexible" },
    impulsivity: { high: "Impulsividad", low: "Decisiones meditadas" },
  },
};

export const MODULE10_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "균형잡힌 주의형", hook: "주의가 쉽게 흩어지지도, 과하게 몰입하지도 않는 균형 잡힌 상태입니다." },
    distractibility: { title: "산만형", hook: "여러 자극이 눈에 들어오면 쉽게 그쪽으로 정신이 팔리는 편입니다." },
    hyperfocus: { title: "과몰입형", hook: "한번 꽂히면 주변이 안 보일 정도로 깊이 빠져드는 편입니다." },
    impulsivity: { title: "충동형", hook: "생각보다 행동이 먼저 나가는 편으로, 즉흥적인 결정이 많습니다." },
    "distractibility+hyperfocus": { title: "극과 극 주의형", hook: "평소엔 쉽게 산만해지다가도, 흥미가 생기면 과할 정도로 몰입하는 양극단을 오갑니다." },
    "distractibility+impulsivity": { title: "즉흥 산만형", hook: "주의가 쉽게 흩어지는 동시에, 행동도 계획 없이 충동적으로 나가는 편입니다." },
    "hyperfocus+impulsivity": { title: "몰아치는 몰입형", hook: "꽂히면 앞뒤 재지 않고 곧장 파고드는, 강렬하고 즉각적인 몰입 패턴입니다." },
    "distractibility+hyperfocus+impulsivity": { title: "주의 조절 과부하형", hook: "산만함, 과몰입, 충동성이 모두 뚜렷하게 나타나는, 주의 조절의 진폭이 큰 상태입니다." },
  },
  en: {
    baseline: { title: "Balanced Attention", hook: "Your attention neither scatters easily nor locks in excessively — a balanced state." },
    distractibility: { title: "Distractible Type", hook: "When several things catch your eye, your attention easily drifts toward them." },
    hyperfocus: { title: "Hyperfocused Type", hook: "Once something grabs you, you sink into it so deeply you lose sight of everything around you." },
    impulsivity: { title: "Impulsive Type", hook: "Action tends to come before thought, so you make a lot of spur-of-the-moment decisions." },
    "distractibility+hyperfocus": { title: "Two Extremes of Attention", hook: "You swing between getting easily distracted and, once interested, diving in to an almost excessive degree." },
    "distractibility+impulsivity": { title: "Scattered and Impulsive", hook: "Your attention scatters easily, and your actions also tend to jump ahead of any plan." },
    "hyperfocus+impulsivity": { title: "All-In Focus", hook: "Once something hooks you, you dive straight in without weighing the consequences — an intense, immediate kind of focus." },
    "distractibility+hyperfocus+impulsivity": { title: "Attention-Regulation Overload", hook: "Distractibility, hyperfocus, and impulsivity are all clearly present — your attention swings across a wide range." },
  },
  es: {
    baseline: { title: "Atención equilibrada", hook: "Tu atención ni se dispersa con facilidad ni se fija en exceso: es un estado equilibrado." },
    distractibility: { title: "Atención dispersa", hook: "Cuando varias cosas te llaman la atención, es fácil que te vayas detrás de ellas." },
    hyperfocus: { title: "Inmersión profunda", hook: "Cuando algo te atrapa, te sumerges tan hondo que pierdes de vista todo lo demás." },
    impulsivity: { title: "Primero la acción", hook: "La acción suele adelantarse al pensamiento, así que tomas muchas decisiones sobre la marcha." },
    "distractibility+hyperfocus": { title: "Entre la dispersión y la inmersión", hook: "Oscilas entre dispersarte con facilidad y, cuando algo te interesa, sumergirte en ello casi en exceso." },
    "distractibility+impulsivity": { title: "Dispersión e impulso", hook: "Tu atención se dispersa con facilidad, y tus acciones también suelen adelantarse a cualquier plan." },
    "hyperfocus+impulsivity": { title: "Inmersión arrolladora", hook: "Cuando algo te atrapa, te lanzas de lleno sin medir las consecuencias: una concentración intensa e inmediata." },
    "distractibility+hyperfocus+impulsivity": { title: "Atención de altibajos", hook: "La distracción, el hiperfoco y la impulsividad aparecen con claridad: tu atención oscila en un rango muy amplio." },
  },
};
