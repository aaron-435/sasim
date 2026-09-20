/**
 * lib/module4Mask.ts
 * ------------------------------------------------------------------
 * Module 4 — 가면(가제) 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈4_가면_30문항_전문가검토용.xlsx). 3차원: 이미지관리(IM1-IM10) /
 * 은폐(AS1-AS10) / 관계피로(SE1-SE10).
 *
 * Two new item formats first appear in this module (see lib/quizProfile.ts):
 *   - "극단형(0/3)" items (IM3, IM6, AS2, AS7, SE2, SE7) have only two options
 *     (0점/3점, no middle) — encoded here as a 2-option "choice" question,
 *     which QuizScreen renders the same way as a 4-option one.
 *   - AS5 is a REVERSED slider ("역환산"): 1 = "아무도 모른다" (high concealment,
 *     3점), 10 = "누군가는 완전히 안다" (low concealment, 0점) — format
 *     "slider-reverse", scored via scoreSliderValue() in lib/quizProfile.ts.
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE4_QUESTIONS: ModuleQuestion[] = [
  // ---- 이미지관리 (Image Management) — IM1-IM10 ----
  { id: "IM1", dimension: "imageManagement", format: "slider", prompt: "상황·상대에 따라 나를 다르게 보여주는 정도는?", options: { minLabel: "어디서나 똑같음", maxLabel: "상대마다 완전히 다른 사람처럼" } },
  { id: "IM2", dimension: "imageManagement", format: "choice", prompt: "처음 만난 사람 앞에서 나는?", options: [
    { label: "있는 그대로 행동한다", score: 0 }, { label: "약간 조심하는 정도", score: 1 },
    { label: "상대가 좋아할 만한 모습을 보여준다", score: 2 }, { label: "거의 다른 사람처럼 연기한다", score: 3 } ] },
  { id: "IM3", dimension: "imageManagement", format: "choice", prompt: "나는 완전히 다른 두 개의 성격을 상황에 따라 스위치처럼 바꿔 쓴다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "IM4", dimension: "imageManagement", format: "choice", prompt: "모임 자리에서 분위기가 처지면?", options: [
    { label: "굳이 나서지 않는다", score: 0 }, { label: "적당히 맞춰준다", score: 1 },
    { label: "분위기 메이커 역할을 자처한다", score: 2 }, { label: "억지로라도 밝은 캐릭터를 연기한다", score: 3 } ] },
  { id: "IM5", dimension: "imageManagement", format: "choice", prompt: "상사/윗사람 앞에서의 나와 친구들 앞에서의 나는?", options: [
    { label: "거의 비슷하다", score: 0 }, { label: "조금 다르다", score: 1 },
    { label: "꽤 다르다", score: 2 }, { label: "완전히 다른 사람 같다", score: 3 } ] },
  { id: "IM6", dimension: "imageManagement", format: "choice", prompt: "사람들이 좋아하는 '나'는, 사실 진짜 내가 아니라 내가 만든 캐릭터에 가깝다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "IM7", dimension: "imageManagement", format: "choice", prompt: "대화 중 상대의 반응을 보면서?", options: [
    { label: "별로 신경 안 쓴다", score: 0 }, { label: "가볍게 참고한다", score: 1 },
    { label: "실시간으로 내 태도를 조정한다", score: 2 }, { label: "상대 표정 하나하나에 맞춰 연기를 수정한다", score: 3 } ] },
  { id: "IM8", dimension: "imageManagement", format: "choice", prompt: "SNS에 올리는 나의 모습은?", options: [
    { label: "평소 모습 그대로다", score: 0 }, { label: "조금 더 나은 모습이다", score: 1 },
    { label: "꽤 편집된 모습이다", score: 2 }, { label: "실제와는 다른 캐릭터에 가깝다", score: 3 } ] },
  { id: "IM9", dimension: "imageManagement", format: "choice", prompt: "누군가 나를 좋아한다고 하면?", options: [
    { label: "있는 그대로 좋아해주는 거라 믿는다", score: 0 }, { label: "대체로 그렇다고 믿는다", score: 1 },
    { label: "내가 보여준 모습을 좋아하는 거란 생각이 든다", score: 2 }, { label: "진짜 나를 알면 안 좋아할 거라 생각한다", score: 3 } ] },
  { id: "IM10", dimension: "imageManagement", format: "choice", prompt: "여러 사람과의 관계에서 나는?", options: [
    { label: "일관된 한 사람이다", score: 0 }, { label: "약간씩 다르지만 비슷하다", score: 1 },
    { label: "관계마다 다른 역할을 맡는다", score: 2 }, { label: "관계 수만큼 다른 '나'가 존재하는 것 같다", score: 3 } ] },
  // ---- 은폐 (Concealment) — AS1-AS10 ----
  { id: "AS1", dimension: "concealment", format: "choice", prompt: "속마음과 다른 말을 해야 할 때?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "거의 매번 그렇다", score: 3 } ] },
  { id: "AS2", dimension: "concealment", format: "choice", prompt: "나에게는 가장 친한 사람에게조차 절대 말 못 할 진짜 속마음이 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "AS3", dimension: "concealment", format: "choice", prompt: "화가 나거나 서운해도?", options: [
    { label: "바로 표현한다", score: 0 }, { label: "적당히 표현한다", score: 1 },
    { label: "웃으면서 넘긴다", score: 2 }, { label: "티도 안 나게 완전히 숨긴다", score: 3 } ] },
  { id: "AS4", dimension: "concealment", format: "choice", prompt: "내 진짜 취향이나 생각을 말했을 때 사람들이 이상하게 볼까 봐?", options: [
    { label: "그런 걱정은 안 한다", score: 0 }, { label: "가끔 걱정된다", score: 1 },
    { label: "그래서 적당히 숨기고 말한다", score: 2 }, { label: "아예 말을 안 하게 된다", score: 3 } ] },
  { id: "AS5", dimension: "concealment", format: "slider-reverse", prompt: "지금 이 순간, '가면을 완전히 벗은 나'를 아는 사람이 있다는 확신의 정도는?", options: { minLabel: "아무도 진짜 나를 모른다", maxLabel: "누군가는 완전히 안다" } },
  { id: "AS6", dimension: "concealment", format: "choice", prompt: "내가 힘들 때?", options: [
    { label: "주변에 바로 알린다", score: 0 }, { label: "가까운 사람에겐 알린다", score: 1 },
    { label: "괜찮은 척하는 게 편하다", score: 2 }, { label: "누구에게도 티 내지 않으려 한다", score: 3 } ] },
  { id: "AS7", dimension: "concealment", format: "choice", prompt: "사람들 앞에서 웃고 있어도, 속으로는 완전히 다른 감정일 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "AS8", dimension: "concealment", format: "choice", prompt: "다수의 의견과 내 생각이 다를 때?", options: [
    { label: "내 의견을 명확히 말한다", score: 0 }, { label: "조심스럽게 말한다", score: 1 },
    { label: "굳이 말 안 하고 넘어간다", score: 2 }, { label: "다수 의견에 맞춰 동조하는 척한다", score: 3 } ] },
  { id: "AS9", dimension: "concealment", format: "choice", prompt: "진짜 내 모습을 누군가 알게 된다면?", options: [
    { label: "편안할 것 같다", score: 0 }, { label: "조금 어색할 것 같다", score: 1 },
    { label: "부담스러울 것 같다", score: 2 }, { label: "그 관계가 깨질까 봐 두렵다", score: 3 } ] },
  { id: "AS10", dimension: "concealment", format: "choice", prompt: "하루를 마치고 혼자가 되면?", options: [
    { label: "특별한 감정 없이 편안하다", score: 0 }, { label: "적당히 홀가분하다", score: 1 },
    { label: "가면을 벗은 듯 안도감이 크다", score: 2 }, { label: "온종일 연기한 듯한 피로감이 몰려온다", score: 3 } ] },
  // ---- 관계피로 (Social Exhaustion) — SE1-SE10 ----
  { id: "SE1", dimension: "socialFatigue", format: "choice", prompt: "사람들과 즐겁게 어울리고 집에 오면?", options: [
    { label: "에너지가 채워진 느낌이다", score: 0 }, { label: "적당히 만족스럽다", score: 1 },
    { label: "묘하게 허탈하다", score: 2 }, { label: "혼자 있고 싶은 마음뿐이다", score: 3 } ] },
  { id: "SE2", dimension: "socialFatigue", format: "choice", prompt: "사람 많은 자리를 다녀오면, 즐거웠던 것과 별개로 몸과 마음이 완전히 방전된다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "SE3", dimension: "socialFatigue", format: "choice", prompt: "인간관계를 유지하는 것에 대해?", options: [
    { label: "자연스럽고 편하다", score: 0 }, { label: "노력이 좀 필요하다", score: 1 },
    { label: "꽤 힘이 든다", score: 2 }, { label: "버겁게 느껴질 때가 많다", score: 3 } ] },
  { id: "SE4", dimension: "socialFatigue", format: "choice", prompt: "사람들이 나를 인싸/사교적이라고 생각하는 것에 대해?", options: [
    { label: "그게 진짜 내 모습이다", score: 0 }, { label: "대체로 맞다", score: 1 },
    { label: "절반만 맞는 것 같다", score: 2 }, { label: "완전히 오해하고 있는 것 같다", score: 3 } ] },
  { id: "SE5", dimension: "socialFatigue", format: "slider", prompt: "사람 만나는 걸 좋아하지만 동시에 피곤한, 그 모순된 마음의 정도는?", options: { minLabel: "전혀 모순 없음", maxLabel: "매우 모순적으로 느낌" } },
  { id: "SE6", dimension: "socialFatigue", format: "choice", prompt: "여러 사람과 함께 있어도?", options: [
    { label: "충만하게 느껴진다", score: 0 }, { label: "대체로 괜찮다", score: 1 },
    { label: "가끔 외로움이 스친다", score: 2 }, { label: "군중 속에서도 혼자라는 느낌이 든다", score: 3 } ] },
  { id: "SE7", dimension: "socialFatigue", format: "choice", prompt: "나를 좋아하는 사람이 많아도, 정작 진짜 내 편은 아무도 없다고 느낄 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "SE8", dimension: "socialFatigue", format: "choice", prompt: "약속이 취소되면?", options: [
    { label: "아쉬운 마음이 크다", score: 0 }, { label: "그럭저럭 아쉽다", score: 1 },
    { label: "솔직히 좀 안도된다", score: 2 }, { label: "몰래 다행이라고 생각한다", score: 3 } ] },
  { id: "SE9", dimension: "socialFatigue", format: "choice", prompt: "관계를 유지하기 위해 하는 노력에 비해 돌아오는 감정적 만족은?", options: [
    { label: "충분하다", score: 0 }, { label: "그럭저럭 있다", score: 1 },
    { label: "부족하게 느껴질 때가 많다", score: 2 }, { label: "노력한 만큼 허무하게 느껴진다", score: 3 } ] },
  { id: "SE10", dimension: "socialFatigue", format: "choice", prompt: "가면을 벗고 완전히 쉴 수 있는 시간/사람이?", options: [
    { label: "충분히 있다", score: 0 }, { label: "어느 정도 있다", score: 1 },
    { label: "거의 없다", score: 2 }, { label: "전혀 없다고 느껴진다", score: 3 } ] },
];

// Display-text-only translations of MODULE4_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE4_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  IM1: { prompt: "How much do you change how you present yourself depending on the situation or person?", minLabel: "The same everywhere", maxLabel: "Like a completely different person for each" },
  IM2: { prompt: "In front of someone you just met, are you...?", optionLabels: ["I act just as I am", "A little more careful than usual", "I show a side I think they'll like", "I act almost like a different person"] },
  IM3: { prompt: "I switch between two completely different personalities depending on the situation, like flipping a switch.", optionLabels: ["Not at all true", "Very true"] },
  IM4: { prompt: "When the mood at a gathering starts to sag?", optionLabels: ["I don't feel the need to step in", "I go along with it reasonably", "I take it on myself to lighten the mood", "I force myself to play the upbeat character"] },
  IM5: { prompt: "How different are you in front of a boss or senior versus in front of friends?", optionLabels: ["Almost the same", "A little different", "Quite different", "Like a completely different person"] },
  IM6: { prompt: "The \"me\" that people like is closer to a character I created than my real self.", optionLabels: ["Not at all true", "Very true"] },
  IM7: { prompt: "While watching the other person's reaction during a conversation?", optionLabels: ["I barely pay attention to it", "I take it lightly into account", "I adjust my attitude in real time", "I adjust my performance to match their every expression"] },
  IM8: { prompt: "How does the you on social media compare to real life?", optionLabels: ["It's exactly how I normally am", "A slightly better version of me", "A pretty edited version", "Closer to a character than the real me"] },
  IM9: { prompt: "When someone says they like you?", optionLabels: ["I believe they like me for who I really am", "I mostly believe that", "I think they like the image I've shown them", "I think they wouldn't like the real me"] },
  IM10: { prompt: "Across your different relationships, are you...?", optionLabels: ["One consistent person", "Slightly different, but mostly similar", "Playing a different role in each relationship", "Like there's a different \"me\" for every relationship I have"] },
  AS1: { prompt: "How often do you have to say something different from what you really think?", optionLabels: ["Almost never", "Sometimes", "Often", "Almost every time"] },
  AS2: { prompt: "There's a real part of my inner self I could never tell even my closest person.", optionLabels: ["Not at all true", "Very true"] },
  AS3: { prompt: "Even when you're angry or hurt?", optionLabels: ["I express it right away", "I express it to a reasonable degree", "I laugh it off", "I hide it completely, without a trace"] },
  AS4: { prompt: "Are you afraid people will think you're strange if you share your real tastes or thoughts?", optionLabels: ["I don't worry about that", "I worry about it sometimes", "So I hold back and phrase things carefully", "I just don't bring it up at all"] },
  AS5: { prompt: "Right now, how confident are you that someone truly knows the \"you\" without the mask?", minLabel: "No one knows the real me", maxLabel: "Someone knows me completely" },
  AS6: { prompt: "When you're going through a hard time?", optionLabels: ["I let people around me know right away", "I let people close to me know", "It's easier to pretend I'm fine", "I try not to show it to anyone"] },
  AS7: { prompt: "Even while smiling in front of people, I sometimes feel a completely different emotion inside.", optionLabels: ["Not at all true", "Very true"] },
  AS8: { prompt: "When your opinion differs from the majority?", optionLabels: ["I clearly state my opinion", "I say it carefully", "I just let it go without saying anything", "I pretend to agree with the majority"] },
  AS9: { prompt: "If someone found out who you really are?", optionLabels: ["I think I'd feel comfortable", "I think it'd feel a little awkward", "I think it'd feel like a burden", "I'm afraid it would break the relationship"] },
  AS10: { prompt: "When you're finally alone at the end of the day?", optionLabels: ["I feel at ease, nothing in particular", "I feel reasonably relieved", "I feel a strong sense of relief, like taking off a mask", "I feel worn out, like I performed all day"] },
  SE1: { prompt: "After enjoying time with people and coming home?", optionLabels: ["I feel recharged", "I feel reasonably satisfied", "I feel strangely empty", "All I want is to be alone"] },
  SE2: { prompt: "After being in a crowded gathering, separate from whether it was fun, my body and mind feel completely drained.", optionLabels: ["Not at all true", "Very true"] },
  SE3: { prompt: "How do you feel about maintaining relationships?", optionLabels: ["It feels natural and easy", "It takes some effort", "It's pretty tiring", "It often feels like too much"] },
  SE4: { prompt: "How do you feel when people think you're outgoing or social?", optionLabels: ["That's genuinely who I am", "That's mostly right", "It feels only half right", "It feels like a complete misunderstanding"] },
  SE5: { prompt: "How contradictory does it feel to like being around people, yet also find it tiring?", minLabel: "Not contradictory at all", maxLabel: "Feels very contradictory" },
  SE6: { prompt: "Even when you're with a group of people?", optionLabels: ["I feel completely fulfilled", "I feel mostly fine", "A hint of loneliness slips through sometimes", "I feel alone even in a crowd"] },
  SE7: { prompt: "Even when a lot of people like me, there are times I feel like no one is truly on my side.", optionLabels: ["Not at all true", "Very true"] },
  SE8: { prompt: "When plans get canceled?", optionLabels: ["I feel quite disappointed", "I feel somewhat disappointed", "Honestly, I feel a bit relieved", "Secretly, I think 'thank goodness'"] },
  SE9: { prompt: "Compared to the effort you put into maintaining relationships, how much emotional satisfaction do you get back?", optionLabels: ["Plenty", "A reasonable amount", "It often feels lacking", "It feels hollow compared to the effort I put in"] },
  SE10: { prompt: "How much time or how many people do you have where you can fully take off the mask and rest?", optionLabels: ["Plenty", "Some", "Almost none", "It feels like I have none at all"] },
};

export const MODULE4_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  IM1: { prompt: "¿Cuánto cambias tu forma de mostrarte según la situación o la persona?", minLabel: "Igual en todas partes", maxLabel: "Como alguien distinto con cada persona" },
  IM2: { prompt: "Frente a alguien que acabas de conocer, ¿cómo eres?", optionLabels: ["Soy tal como soy", "Con un poco más de cuidado que de costumbre", "Muestro el lado que creo que le va a gustar", "Me comporto casi como otra persona"] },
  IM3: { prompt: "Cambio entre dos personalidades totalmente distintas según la situación, como si accionara un interruptor.", optionLabels: ["No me describe en absoluto", "Me describe totalmente"] },
  IM4: { prompt: "Cuando el ambiente de una reunión empieza a decaer, ¿qué haces?", optionLabels: ["No siento la necesidad de intervenir", "Sigo la corriente sin más", "Me encargo yo de animar el ambiente", "Me esfuerzo por hacer el papel de la persona alegre"] },
  IM5: { prompt: "¿Cuánto cambias ante un jefe o una persona de rango superior respecto a cuando estás con tus amistades?", optionLabels: ["Casi nada", "Un poco", "Bastante", "Parezco otra persona"] },
  IM6: { prompt: "El «yo» que le gusta a la gente se parece más a un personaje que creé que a quien soy en realidad.", optionLabels: ["No me describe en absoluto", "Me describe totalmente"] },
  IM7: { prompt: "Mientras observas la reacción de la otra persona en una conversación, ¿qué haces?", optionLabels: ["Casi no le presto atención", "La tengo un poco en cuenta", "Ajusto mi actitud en el momento", "Adapto mi actuación a cada gesto suyo"] },
  IM8: { prompt: "¿Cómo es tu «yo» de las redes sociales comparado con el de la vida real?", optionLabels: ["Es exactamente como soy normalmente", "Una versión un poco mejorada de mí", "Una versión bastante retocada", "Más cerca de un personaje que de mi yo real"] },
  IM9: { prompt: "Cuando alguien te dice que le gustas, ¿qué piensas?", optionLabels: ["Creo que le gusto tal como soy", "En general lo creo", "Pienso que le gusta la imagen que le he mostrado", "Pienso que no le gustaría mi yo real"] },
  IM10: { prompt: "En tus distintas relaciones, ¿cómo eres?", optionLabels: ["Una sola persona, siempre la misma", "Algo distinta, pero en esencia parecida", "Cumplo un papel diferente en cada relación", "Siento que hay un «yo» distinto para cada relación"] },
  AS1: { prompt: "¿Con qué frecuencia tienes que decir algo distinto de lo que piensas de verdad?", optionLabels: ["Casi nunca", "A veces", "A menudo", "Casi siempre"] },
  AS2: { prompt: "Hay una parte real de mi interior que no podría contarle jamás ni a la persona más cercana.", optionLabels: ["No me describe en absoluto", "Me describe totalmente"] },
  AS3: { prompt: "Cuando algo te enfurece o te hiere, ¿qué haces?", optionLabels: ["Lo expreso enseguida", "Lo expreso con moderación", "Lo dejo pasar con una risa", "Lo escondo por completo, sin que se note"] },
  AS4: { prompt: "Si compartes tus gustos o pensamientos de verdad, ¿te preocupa que la gente te vea como alguien raro?", optionLabels: ["No me preocupa eso", "A veces me preocupa", "Por eso me guardo cosas y elijo bien las palabras", "Directamente ni lo menciono"] },
  AS5: { prompt: "Ahora mismo, ¿con qué seguridad dirías que alguien conoce de verdad al «tú» sin máscara?", minLabel: "Nadie conoce mi yo real", maxLabel: "Alguien me conoce por completo" },
  AS6: { prompt: "Cuando estás pasando por un momento difícil, ¿qué haces?", optionLabels: ["Se lo cuento enseguida a quienes me rodean", "Se lo cuento a la gente cercana", "Me resulta más fácil fingir que estoy bien", "Intento no mostrárselo a nadie"] },
  AS7: { prompt: "Aun sonriendo delante de los demás, a veces siento por dentro algo totalmente distinto.", optionLabels: ["No me describe en absoluto", "Me describe totalmente"] },
  AS8: { prompt: "Cuando tu opinión difiere de la de la mayoría, ¿qué haces?", optionLabels: ["Digo mi opinión con claridad", "La digo con tacto", "Lo dejo pasar sin decir nada", "Finjo estar de acuerdo con la mayoría"] },
  AS9: { prompt: "Si alguien descubriera quién eres en realidad, ¿cómo lo sentirías?", optionLabels: ["Creo que me sentiría a gusto", "Creo que sería un poco incómodo", "Creo que sería una carga", "Me da miedo que eso rompiera la relación"] },
  AS10: { prompt: "Cuando por fin te quedas a solas al final del día, ¿cómo te sientes?", optionLabels: ["Con tranquilidad, sin nada en particular", "Con un alivio moderado", "Con un gran alivio, como quien se quita una máscara", "Con agotamiento, como si hubiera actuado todo el día"] },
  SE1: { prompt: "Después de pasar un buen rato con gente y volver a casa, ¿cómo te sientes?", optionLabels: ["Con la energía recargada", "Con una satisfacción razonable", "Con un vacío extraño", "Lo único que quiero es estar a solas"] },
  SE2: { prompt: "Después de una reunión con mucha gente, independientemente de si la disfruté, mi cuerpo y mi mente quedan completamente agotados.", optionLabels: ["No me describe en absoluto", "Me describe totalmente"] },
  SE3: { prompt: "¿Cómo te sientes al mantener tus relaciones?", optionLabels: ["Es natural y fácil", "Requiere algo de esfuerzo", "Es bastante agotador", "Muchas veces me resulta demasiado"] },
  SE4: { prompt: "Cuando la gente te ve como una persona extrovertida y sociable, ¿qué sientes?", optionLabels: ["Es justo quien soy", "En general es cierto", "Solo es cierto a medias", "Me parece un malentendido total"] },
  SE5: { prompt: "¿Cuán contradictorio te resulta que disfrutes estar con gente y que, a la vez, eso te agote?", minLabel: "Nada contradictorio", maxLabel: "Muy contradictorio" },
  SE6: { prompt: "Incluso estando con un grupo de gente, ¿cómo te sientes?", optionLabels: ["Siento plenitud", "En general me siento bien", "A veces se me cuela algo de soledad", "Siento soledad incluso en medio de la multitud"] },
  SE7: { prompt: "Aunque le caiga bien a mucha gente, a veces siento que nadie está realmente de mi lado.", optionLabels: ["No me describe en absoluto", "Me describe totalmente"] },
  SE8: { prompt: "Cuando se cancela un plan, ¿qué sientes?", optionLabels: ["Me da bastante pena", "Me da algo de pena", "La verdad, siento un poco de alivio", "En secreto pienso «menos mal»"] },
  SE9: { prompt: "En comparación con el esfuerzo que pones en mantener tus relaciones, ¿cuánta satisfacción emocional recibes a cambio?", optionLabels: ["Mucha", "Una cantidad razonable", "A menudo me parece poca", "Me parece muy poca frente al esfuerzo que pongo"] },
  SE10: { prompt: "¿Cuánto tiempo o cuántas personas tienes con quienes quitarte la máscara por completo y descansar?", optionLabels: ["De sobra", "Algo", "Casi nada", "Siento que no tengo nada de eso"] },
};

export const MODULE4_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  imageManagement: 10,
  concealment: 10,
  socialFatigue: 10,
};

export const MODULE4_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    imageManagement: { high: "이미지관리", low: "일관된 자기표현" },
    concealment: { high: "은폐", low: "솔직한 개방성" },
    socialFatigue: { high: "관계피로", low: "관계에서 얻는 충전감" },
  },
  en: {
    imageManagement: { high: "Image Management", low: "Consistent Self-Expression" },
    concealment: { high: "Concealment", low: "Honest Openness" },
    socialFatigue: { high: "Social Fatigue", low: "Feeling Recharged by Others" },
  },
  es: {
    imageManagement: { high: "Cuidado de la imagen", low: "Una forma de mostrarte coherente" },
    concealment: { high: "Ocultamiento", low: "Apertura sincera" },
    socialFatigue: { high: "Cansancio social", low: "Energía que te dan los demás" },
  },
};

export const MODULE4_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "일관된 자기형", hook: "상황에 따라 크게 다른 모습을 보이지 않는, 비교적 일관된 자기표현을 갖고 있습니다." },
    imageManagement: { title: "이미지관리형", hook: "상황과 상대에 맞춰 보여주는 모습을 세심하게 조정합니다." },
    concealment: { title: "은폐형", hook: "진짜 속마음은 가까운 사람에게도 잘 드러내지 않습니다." },
    socialFatigue: { title: "관계피로형", hook: "사람을 만나는 걸 좋아하면서도, 그만큼 크게 소진됩니다." },
    "imageManagement+concealment": { title: "가면형", hook: "보여주는 모습을 관리하는 동시에 진짜 속마음은 철저히 숨기는 패턴입니다." },
    "imageManagement+socialFatigue": { title: "연기하는 인싸형", hook: "밝은 모습을 보여주려 애쓰지만, 그만큼 관계에서 크게 지칩니다." },
    "concealment+socialFatigue": { title: "고립된 은폐형", hook: "속마음을 숨기다 보니 관계에서 진짜 충전을 얻지 못하고 있습니다." },
    "imageManagement+concealment+socialFatigue": { title: "완전 가면형", hook: "이미지관리, 은폐, 관계피로가 모두 뚜렷한, '가면'이 가장 무거운 패턴입니다." },
  },
  en: {
    baseline: { title: "Consistent Self", hook: "You don't change dramatically depending on the situation — your self-expression stays relatively consistent." },
    imageManagement: { title: "Image-Managed Type", hook: "You carefully adjust the face you show depending on the situation and the person." },
    concealment: { title: "Concealed Type", hook: "You rarely reveal your real feelings, even to people close to you." },
    socialFatigue: { title: "Socially Drained Type", hook: "You enjoy seeing people, but it wears you out just as much." },
    "imageManagement+concealment": { title: "Masked Type", hook: "Managing how you appear while thoroughly hiding how you really feel, at the same time." },
    "imageManagement+socialFatigue": { title: "Performing Extrovert", hook: "You work to project a bright image, but it drains you heavily in return." },
    "concealment+socialFatigue": { title: "Isolated and Concealed", hook: "Hiding your real feelings means you never actually get recharged by being with others." },
    "imageManagement+concealment+socialFatigue": { title: "Fully Masked", hook: "Image management, concealment, and social fatigue are all pronounced — the heaviest version of the 'mask.'" },
  },
  es: {
    "baseline": { title: "Coherencia contigo", hook: "No cambias mucho según la situación: tu forma de expresarte se mantiene bastante coherente." },
    "imageManagement": { title: "Cuidado de la imagen", hook: "Ajustas con esmero la cara que muestras según la situación y la persona." },
    "concealment": { title: "Ocultamiento", hook: "Rara vez muestras lo que sientes de verdad, incluso ante la gente cercana." },
    "socialFatigue": { title: "Cansancio social", hook: "Disfrutas estar con gente, pero también te desgasta mucho." },
    "imageManagement+concealment": { title: "La máscara", hook: "Cuidas la imagen que das y, al mismo tiempo, escondes por completo lo que sientes de verdad." },
    "imageManagement+socialFatigue": { title: "Sonrisa que cansa", hook: "Te esfuerzas por mostrar una imagen alegre, pero eso te desgasta mucho a cambio." },
    "concealment+socialFatigue": { title: "Reserva en soledad", hook: "Guardarte lo que sientes hace que nunca termines de recargar energía al estar con otros." },
    "imageManagement+concealment+socialFatigue": { title: "La máscara pesada", hook: "El cuidado de la imagen, el ocultamiento y el cansancio social están muy marcados: la versión más pesada de la «máscara»." },
  },
};
