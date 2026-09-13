/**
 * lib/module3Burnout.ts
 * ------------------------------------------------------------------
 * Module 3 — 번아웃 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈3_번아웃_30문항_전문가검토용.xlsx). 3차원(MBI 기반): 소진(E1-E10) /
 * 냉소(C1-C10) / 효능감저하(F1-F10) — ReportScreen.jsx의 기존 정적
 * "MBI 기반" 목업(exhaustion/cynicism/efficacyLoss)과 동일한 축이다.
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE3_QUESTIONS: ModuleQuestion[] = [
  // ---- 소진 (Exhaustion) — E1-E10 ----
  { id: "E1", dimension: "exhaustion", format: "slider", prompt: "퇴근 후(혹은 일과 후) 피로감 정도는?", options: { minLabel: "전혀 피곤하지 않음", maxLabel: "완전히 탈진한 상태" } },
  { id: "E2", dimension: "exhaustion", format: "choice", prompt: "일주일 중 에너지가 남아있는 날은?", options: [
    { label: "거의 매일 괜찮다", score: 0 }, { label: "주말 정도면 회복된다", score: 1 },
    { label: "일주일 내내 방전 상태다", score: 2 }, { label: "언제 마지막으로 괜찮았는지 기억도 안 난다", score: 3 } ] },
  { id: "E3", dimension: "exhaustion", format: "choice", prompt: "아침에 눈을 뜨면?", options: [
    { label: "오늘 하루가 기대된다", score: 0 }, { label: "그럭저럭 몸을 일으킨다", score: 1 },
    { label: "일어나는 것 자체가 버겁다", score: 2 }, { label: "눈뜨자마자 이미 지쳐있다", score: 3 } ] },
  { id: "E4", dimension: "exhaustion", format: "choice", prompt: "간단한 일(메일 답장, 잡무 등)도?", options: [
    { label: "금방 처리한다", score: 0 }, { label: "조금 미루지만 결국 한다", score: 1 },
    { label: "손대기도 싫어서 계속 미룬다", score: 2 }, { label: "생각만 해도 진이 빠진다", score: 3 } ] },
  { id: "E5", dimension: "exhaustion", format: "choice", prompt: "주말이나 휴가가 끝나면?", options: [
    { label: "다시 에너지가 충전된 느낌이다", score: 0 }, { label: "어느 정도 회복된다", score: 1 },
    { label: "쉬어도 크게 달라지지 않는다", score: 2 }, { label: "쉬는 것조차 피곤하게 느껴진다", score: 3 } ] },
  { id: "E6", dimension: "exhaustion", format: "choice", prompt: "몸의 컨디션(두통, 소화불량, 근육긴장 등)은?", options: [
    { label: "특별한 이상이 없다", score: 0 }, { label: "가끔 뻐근하거나 피곤한 정도", score: 1 },
    { label: "만성적으로 뭔가 아프거나 불편하다", score: 2 }, { label: "여기저기 안 아픈 데가 없다", score: 3 } ] },
  { id: "E7", dimension: "exhaustion", format: "choice", prompt: "하루 일과를 마치고 나면 감정은?", options: [
    { label: "성취감이 느껴진다", score: 0 }, { label: "그냥 하루가 갔다는 느낌이다", score: 1 },
    { label: "탈진한 느낌이 든다", score: 2 }, { label: "더 이상 못 버틸 것 같은 느낌이다", score: 3 } ] },
  { id: "E8", dimension: "exhaustion", format: "choice", prompt: "잠들기 전 상태는?", options: [
    { label: "편안하게 잠든다", score: 0 }, { label: "약간 뒤척이다 잠든다", score: 1 },
    { label: "피곤한데도 쉽게 못 잔다", score: 2 }, { label: "몸은 지쳤는데 머리는 각성돼 있다", score: 3 } ] },
  { id: "E9", dimension: "exhaustion", format: "choice", prompt: "새로운 일이나 요청이 들어오면?", options: [
    { label: "기꺼이 받아들일 여력이 있다", score: 0 }, { label: "부담스럽지만 해낸다", score: 1 },
    { label: "감당이 안 될 것 같아 부담스럽다", score: 2 }, { label: "이미 한계라 거절하고 싶어진다", score: 3 } ] },
  { id: "E10", dimension: "exhaustion", format: "choice", prompt: "스스로 느끼는 전반적인 에너지 수준은?", options: [
    { label: "충분하다", score: 0 }, { label: "보통이다", score: 1 },
    { label: "바닥나 있다", score: 2 }, { label: "완전히 고갈됐다", score: 3 } ] },
  // ---- 냉소 (Cynicism) — C1-C10 ----
  { id: "C1", dimension: "cynicism", format: "slider", prompt: "일에 대해 무감각하거나 냉소적으로 느껴지는 정도는?", options: { minLabel: "전혀 그렇지 않음(여전히 애정 있음)", maxLabel: "완전히 무감각/냉소적" } },
  { id: "C2", dimension: "cynicism", format: "choice", prompt: "동료나 고객을 대할 때?", options: [
    { label: "예전처럼 마음 써서 대한다", score: 0 }, { label: "예전보다 조금 형식적으로 대한다", score: 1 },
    { label: "거리를 두고 사무적으로만 대한다", score: 2 }, { label: "냉소적인 생각이 자주 든다", score: 3 } ] },
  { id: "C3", dimension: "cynicism", format: "choice", prompt: "일의 결과물에 대한 관심은?", options: [
    { label: "여전히 진심으로 신경 쓴다", score: 0 }, { label: "적당히 신경 쓴다", score: 1 },
    { label: "그냥 끝내는 데만 의미를 둔다", score: 2 }, { label: "잘되든 말든 상관없다는 마음이 든다", score: 3 } ] },
  { id: "C4", dimension: "cynicism", format: "choice", prompt: "회사(혹은 조직)에 대한 감정은?", options: [
    { label: "애정이 있다", score: 0 }, { label: "무난한 정도다", score: 1 },
    { label: "거리감이 느껴진다", score: 2 }, { label: "냉소적이거나 회의적인 감정이 크다", score: 3 } ] },
  { id: "C5", dimension: "cynicism", format: "choice", prompt: "예전엔 열정적으로 했던 일을 지금은?", options: [
    { label: "여전히 그 열정이 남아있다", score: 0 }, { label: "예전만은 못하지만 있다", score: 1 },
    { label: "그때 감정이 잘 안 떠오른다", score: 2 }, { label: "왜 그렇게까지 했나 싶을 정도로 낯설다", score: 3 } ] },
  { id: "C6", dimension: "cynicism", format: "choice", prompt: "일하면서 드는 냉소적인 생각(예: 어차피 다 소용없다)은?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 스친다", score: 1 },
    { label: "자주 든다", score: 2 }, { label: "거의 매일 그런 생각을 한다", score: 3 } ] },
  { id: "C7", dimension: "cynicism", format: "choice", prompt: "함께 일하는 사람들에 대한 신뢰는?", options: [
    { label: "여전히 두텁다", score: 0 }, { label: "대체로 괜찮다", score: 1 },
    { label: "예전보다 의심이 늘었다", score: 2 }, { label: "누구도 잘 안 믿게 됐다", score: 3 } ] },
  { id: "C8", dimension: "cynicism", format: "choice", prompt: "일의 의미나 목적에 대해 생각하면?", options: [
    { label: "분명한 의미가 느껴진다", score: 0 }, { label: "그럭저럭 의미는 있다", score: 1 },
    { label: "의미를 잘 못 찾겠다", score: 2 }, { label: "다 무의미하게 느껴진다", score: 3 } ] },
  { id: "C9", dimension: "cynicism", format: "choice", prompt: "문제가 생겼을 때 반응은?", options: [
    { label: "적극적으로 해결하려 한다", score: 0 }, { label: "해결하려 노력하는 편이다", score: 1 },
    { label: "그러려니 하고 넘긴다", score: 2 }, { label: "어차피 안 바뀐다고 체념한다", score: 3 } ] },
  { id: "C10", dimension: "cynicism", format: "choice", prompt: "일에 대한 이야기를 할 때 스스로 느끼기에?", options: [
    { label: "긍정적으로 말한다", score: 0 }, { label: "무난하게 말한다", score: 1 },
    { label: "냉소적으로 말하게 된다", score: 2 }, { label: "비꼬거나 자조적으로 말하게 된다", score: 3 } ] },
  // ---- 효능감저하 (Efficacy Loss) — F1-F10 ----
  { id: "F1", dimension: "efficacyLoss", format: "slider", prompt: "스스로의 능력이나 성과를 의심하는 정도는?", options: { minLabel: "전혀 의심 안 함(확신 있음)", maxLabel: "극심하게 의심함" } },
  { id: "F2", dimension: "efficacyLoss", format: "choice", prompt: "스스로의 능력에 대한 확신은?", options: [
    { label: "내가 잘하는 걸 안다", score: 0 }, { label: "대체로 괜찮다고 느낀다", score: 1 },
    { label: "잘하고 있는 건지 자주 의심스럽다", score: 2 }, { label: "제대로 하는 게 하나도 없다고 느낀다", score: 3 } ] },
  { id: "F3", dimension: "efficacyLoss", format: "choice", prompt: "칭찬을 받으면?", options: [
    { label: "감사히 받아들인다", score: 0 }, { label: "기쁘지만 약간 어색하다", score: 1 },
    { label: "과분하다고 느낀다", score: 2 }, { label: "곧이곧대로 못 믿겠다", score: 3 } ] },
  { id: "F4", dimension: "efficacyLoss", format: "choice", prompt: "어려운 과제가 주어지면?", options: [
    { label: "해낼 수 있다는 자신감이 든다", score: 0 }, { label: "부담되지만 해본다", score: 1 },
    { label: "내가 감당할 수 있을지 의문이 든다", score: 2 }, { label: "시작하기도 전에 무력감이 든다", score: 3 } ] },
  { id: "F5", dimension: "efficacyLoss", format: "choice", prompt: "실수를 하면?", options: [
    { label: "그럴 수 있다고 넘긴다", score: 0 }, { label: "반성하고 다음에 신경 쓴다", score: 1 },
    { label: "역시 나는 안 되나 싶다", score: 2 }, { label: "내 무능함이 드러난 것 같아 괴롭다", score: 3 } ] },
  { id: "F6", dimension: "efficacyLoss", format: "choice", prompt: "다른 사람과 비교했을 때 나의 능력은?", options: [
    { label: "충분히 괜찮다고 느낀다", score: 0 }, { label: "비슷한 수준이라 느낀다", score: 1 },
    { label: "뒤처진다고 자주 느낀다", score: 2 }, { label: "늘 부족하다고 느낀다", score: 3 } ] },
  { id: "F7", dimension: "efficacyLoss", format: "choice", prompt: "중요한 결정을 내려야 할 때?", options: [
    { label: "내 판단을 믿는다", score: 0 }, { label: "고민은 하지만 결국 믿는다", score: 1 },
    { label: "내 판단이 맞는지 계속 의심한다", score: 2 }, { label: "결정을 내릴 자격이 없다고 느낀다", score: 3 } ] },
  { id: "F8", dimension: "efficacyLoss", format: "choice", prompt: "지금까지 이뤄온 것들을 돌아보면?", options: [
    { label: "스스로 뿌듯하다", score: 0 }, { label: "나쁘지 않다고 느낀다", score: 1 },
    { label: "운이나 남들 덕이라고 느낀다", score: 2 }, { label: "제대로 이룬 게 없다고 느낀다", score: 3 } ] },
  { id: "F9", dimension: "efficacyLoss", format: "choice", prompt: "새로운 역할이나 책임을 맡게 되면?", options: [
    { label: "기대되고 잘할 수 있을 것 같다", score: 0 }, { label: "부담되지만 해볼 만하다", score: 1 },
    { label: "내가 감당 못 할 것 같아 두렵다", score: 2 }, { label: "언젠가 무능함이 들통날 것 같다", score: 3 } ] },
  { id: "F10", dimension: "efficacyLoss", format: "choice", prompt: "스스로에게 하는 평가는?", options: [
    { label: "꽤 능력 있는 사람이라 생각한다", score: 0 }, { label: "평범한 수준이라 생각한다", score: 1 },
    { label: "자주 부족하다고 느낀다", score: 2 }, { label: "무능하다고 느낄 때가 많다", score: 3 } ] },
];

// Display-text-only translations of MODULE3_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE3_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  E1: { prompt: "How tired do you feel after work (or after your day is done)?", minLabel: "Not tired at all", maxLabel: "Completely drained" },
  E2: { prompt: "In a typical week, how many days do you still have energy left?", optionLabels: ["Almost every day is fine", "The weekend is enough to recover", "I'm drained the entire week", "I can't even remember the last time I felt okay"] },
  E3: { prompt: "When you open your eyes in the morning?", optionLabels: ["I look forward to the day", "I manage to drag myself up", "Just getting up feels like a lot", "I'm already exhausted the moment I wake up"] },
  E4: { prompt: "Even simple tasks (replying to emails, small chores)?", optionLabels: ["I handle them right away", "I put them off a bit, but get to them", "I keep putting them off because I don't even want to touch them", "Just thinking about them drains me"] },
  E5: { prompt: "After the weekend or a vacation ends?", optionLabels: ["I feel recharged again", "I recover to some extent", "Resting doesn't change much", "Even resting feels tiring"] },
  E6: { prompt: "How's your physical condition (headaches, indigestion, muscle tension, etc.)?", optionLabels: ["Nothing out of the ordinary", "Occasionally stiff or tired", "Something chronically hurts or feels off", "There's barely a part of me that doesn't hurt"] },
  E7: { prompt: "How do you feel after finishing your day?", optionLabels: ["A sense of accomplishment", "Just a feeling that the day passed", "A feeling of being drained", "A feeling like I can't keep going much longer"] },
  E8: { prompt: "What's your state right before falling asleep?", optionLabels: ["I fall asleep comfortably", "I toss a little before falling asleep", "I'm tired but can't fall asleep easily", "My body's exhausted but my mind is wired"] },
  E9: { prompt: "When a new task or request comes in?", optionLabels: ["I have the energy to take it on gladly", "It's a burden, but I get it done", "It feels like too much to handle", "I'm already at my limit and want to say no"] },
  E10: { prompt: "How would you describe your overall energy level right now?", optionLabels: ["Plenty", "Average", "Running on empty", "Completely depleted"] },
  C1: { prompt: "How numb or cynical do you feel about your work?", minLabel: "Not at all (I still care)", maxLabel: "Completely numb/cynical" },
  C2: { prompt: "When dealing with coworkers or clients?", optionLabels: ["I treat them with the same care as before", "I'm a bit more formal than before", "I keep my distance and stay purely businesslike", "Cynical thoughts come up often"] },
  C3: { prompt: "How much do you care about the outcome of your work?", optionLabels: ["I still genuinely care", "I care a reasonable amount", "I just care about getting it over with", "I feel like it doesn't matter whether it turns out well or not"] },
  C4: { prompt: "How do you feel about your company (or organization)?", optionLabels: ["I feel attached to it", "It's fine, nothing special", "I feel a sense of distance", "I feel strongly cynical or disillusioned"] },
  C5: { prompt: "Something you used to be passionate about — how does it feel now?", optionLabels: ["That passion is still there", "It's less than before, but it's there", "I can barely recall that feeling", "It feels so distant I wonder why I ever cared that much"] },
  C6: { prompt: "How often do cynical thoughts (like \"none of this matters anyway\") come up at work?", optionLabels: ["Almost never", "Occasionally", "Often", "Almost every day"] },
  C7: { prompt: "How much do you trust the people you work with?", optionLabels: ["Still a lot", "Generally fine", "I've gotten more suspicious than before", "I've stopped trusting almost everyone"] },
  C8: { prompt: "When you think about the meaning or purpose of your work?", optionLabels: ["I feel a clear sense of meaning", "There's some meaning, more or less", "I struggle to find meaning in it", "It all feels meaningless"] },
  C9: { prompt: "How do you react when a problem comes up?", optionLabels: ["I actively try to solve it", "I tend to make an effort to solve it", "I just let it slide", "I give up, figuring nothing will change anyway"] },
  C10: { prompt: "When you talk about your work, how do you sound to yourself?", optionLabels: ["Positive", "Pretty neutral", "I end up sounding cynical", "I end up sounding sarcastic or self-deprecating"] },
  F1: { prompt: "How much do you doubt your own ability or achievements?", minLabel: "No doubt at all (I feel confident)", maxLabel: "Extreme doubt" },
  F2: { prompt: "How confident do you feel in your own abilities?", optionLabels: ["I know what I'm good at", "I feel mostly fine about it", "I often doubt whether I'm doing well", "I feel like there's nothing I do properly"] },
  F3: { prompt: "When you receive a compliment?", optionLabels: ["I accept it gratefully", "I'm happy, but it feels a bit awkward", "I feel like I don't deserve it", "I can't quite bring myself to believe it"] },
  F4: { prompt: "When given a difficult task?", optionLabels: ["I feel confident I can pull it off", "It's a burden, but I give it a try", "I wonder if I can really handle it", "I feel helpless before I've even started"] },
  F5: { prompt: "When you make a mistake?", optionLabels: ["I let it go, these things happen", "I reflect on it and pay more attention next time", "I think, 'of course, I really can't do this'", "It's painful, like my incompetence has been exposed"] },
  F6: { prompt: "How do you rate your own ability compared to others?", optionLabels: ["I feel plenty good enough", "I feel about the same as everyone else", "I often feel like I'm falling behind", "I always feel like I'm not enough"] },
  F7: { prompt: "When you have to make an important decision?", optionLabels: ["I trust my own judgment", "I agonize over it, but end up trusting myself", "I keep doubting whether my judgment is right", "I feel like I'm not qualified to make the call"] },
  F8: { prompt: "When you look back on what you've achieved so far?", optionLabels: ["I feel proud of myself", "I feel it's not bad", "I feel it's mostly luck or other people's doing", "I feel like I haven't really achieved anything"] },
  F9: { prompt: "When you're given a new role or responsibility?", optionLabels: ["I'm excited and feel I can do well", "It's a burden, but it seems doable", "I'm afraid I won't be able to handle it", "I feel like my incompetence will eventually be exposed"] },
  F10: { prompt: "How would you rate yourself overall?", optionLabels: ["I think I'm quite capable", "I think I'm about average", "I often feel I fall short", "I often feel incompetent"] },
};

export const MODULE3_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  E1: { prompt: "¿Qué tan cansado/a te sientes después del trabajo (o al terminar tu día)?", minLabel: "Nada cansado/a", maxLabel: "Completamente agotado/a" },
  E2: { prompt: "En una semana típica, ¿cuántos días todavía tienes energía?", optionLabels: ["Casi todos los días estoy bien", "Con el fin de semana me recupero", "Estoy agotado/a toda la semana", "Ni siquiera recuerdo la última vez que estuve bien"] },
  E3: { prompt: "Cuando abres los ojos por la mañana?", optionLabels: ["Tengo ganas de empezar el día", "Me las arreglo para levantarme", "Solo levantarme ya se siente pesado", "Ya estoy agotado/a apenas despierto"] },
  E4: { prompt: "¿Incluso tareas simples (responder correos, pendientes pequeños)?", optionLabels: ["Las resuelvo enseguida", "Las pospongo un poco, pero las termino", "Las sigo postergando porque ni ganas tengo de tocarlas", "Solo de pensarlas me agoto"] },
  E5: { prompt: "Después de que termina el fin de semana o unas vacaciones?", optionLabels: ["Me siento recargado/a de nuevo", "Me recupero hasta cierto punto", "Descansar no cambia mucho", "Hasta descansar se siente cansado"] },
  E6: { prompt: "¿Cómo está tu condición física (dolores de cabeza, indigestión, tensión muscular, etc.)?", optionLabels: ["Nada fuera de lo normal", "A veces algo de rigidez o cansancio", "Algo me duele o me molesta de forma crónica", "Casi no hay parte de mí que no me duela"] },
  E7: { prompt: "¿Cómo te sientes al terminar tu día?", optionLabels: ["Con sensación de logro", "Solo con la sensación de que el día pasó", "Con sensación de agotamiento", "Con la sensación de que ya no puedo más"] },
  E8: { prompt: "¿Cómo estás justo antes de dormirte?", optionLabels: ["Me duermo cómodamente", "Doy vueltas un poco antes de dormirme", "Estoy cansado/a pero no logro dormirme fácil", "Mi cuerpo está agotado pero mi mente sigue activada"] },
  E9: { prompt: "Cuando llega una tarea o petición nueva?", optionLabels: ["Tengo energía para aceptarla con gusto", "Es una carga, pero la cumplo", "Se siente como demasiado para manejar", "Ya estoy en mi límite y quiero decir que no"] },
  E10: { prompt: "¿Cómo describirías tu nivel general de energía ahora mismo?", optionLabels: ["De sobra", "Normal", "Por el suelo", "Completamente agotada"] },
  C1: { prompt: "¿Qué tan indiferente o cínico/a te sientes respecto a tu trabajo?", minLabel: "Nada (todavía me importa)", maxLabel: "Completamente indiferente/cínico/a" },
  C2: { prompt: "Al tratar con compañeros o clientes?", optionLabels: ["Los trato con el mismo cuidado de antes", "Soy un poco más formal que antes", "Mantengo distancia y solo trato lo estrictamente laboral", "Me vienen pensamientos cínicos con frecuencia"] },
  C3: { prompt: "¿Cuánto te importa el resultado de tu trabajo?", optionLabels: ["Todavía me importa de verdad", "Me importa una cantidad razonable", "Solo me importa terminarlo", "Siento que da igual si sale bien o no"] },
  C4: { prompt: "¿Cómo te sientes respecto a tu empresa (u organización)?", optionLabels: ["Le tengo cariño", "Me es indiferente, nada especial", "Siento cierta distancia", "Siento un cinismo o desilusión fuerte"] },
  C5: { prompt: "Algo que antes te apasionaba, ¿cómo se siente ahora?", optionLabels: ["Esa pasión sigue ahí", "Es menos que antes, pero sigue estando", "Casi no logro recordar esa sensación", "Se siente tan lejano que me pregunto por qué me importaba tanto"] },
  C6: { prompt: "¿Con qué frecuencia te vienen pensamientos cínicos (como \"total, nada de esto sirve\") en el trabajo?", optionLabels: ["Casi nunca", "De vez en cuando", "Seguido", "Casi todos los días"] },
  C7: { prompt: "¿Cuánto confías en las personas con las que trabajas?", optionLabels: ["Todavía mucho", "En general está bien", "Me he vuelto más desconfiado/a que antes", "Dejé de confiar en casi todos"] },
  C8: { prompt: "Cuando piensas en el sentido o propósito de tu trabajo?", optionLabels: ["Siento un sentido claro", "Tiene algo de sentido, más o menos", "Me cuesta encontrarle sentido", "Todo se siente sin sentido"] },
  C9: { prompt: "¿Cómo reaccionas cuando surge un problema?", optionLabels: ["Trato de resolverlo activamente", "Tiendo a esforzarme por resolverlo", "Simplemente lo dejo pasar", "Me resigno pensando que nada va a cambiar"] },
  C10: { prompt: "Cuando hablas de tu trabajo, ¿cómo te escuchas a ti mismo/a?", optionLabels: ["Positivo/a", "Bastante neutral", "Termino sonando cínico/a", "Termino sonando sarcástico/a o autocrítico/a"] },
  F1: { prompt: "¿Cuánto dudas de tu propia capacidad o tus logros?", minLabel: "Nada de duda (me siento seguro/a)", maxLabel: "Duda extrema" },
  F2: { prompt: "¿Qué tan seguro/a te sientes de tus propias capacidades?", optionLabels: ["Sé en qué soy bueno/a", "En general me siento bien", "Seguido dudo si lo estoy haciendo bien", "Siento que no hay nada que haga bien"] },
  F3: { prompt: "Cuando recibes un cumplido?", optionLabels: ["Lo acepto con gratitud", "Me alegra, pero se siente algo incómodo", "Siento que no lo merezco", "No logro creérmelo del todo"] },
  F4: { prompt: "Cuando te dan una tarea difícil?", optionLabels: ["Me siento seguro/a de poder lograrlo", "Es una carga, pero lo intento", "Me pregunto si de verdad puedo con esto", "Me siento impotente antes de siquiera empezar"] },
  F5: { prompt: "Cuando cometes un error?", optionLabels: ["Lo dejo pasar, son cosas que pasan", "Reflexiono y pongo más atención la próxima vez", "Pienso: 'claro, si es que yo no sirvo para esto'", "Me duele, como si se hubiera expuesto mi incompetencia"] },
  F6: { prompt: "¿Cómo calificas tu propia capacidad comparada con la de otros?", optionLabels: ["Me siento bastante bien", "Me siento a un nivel similar", "Seguido siento que me quedo atrás", "Siempre siento que no soy suficiente"] },
  F7: { prompt: "Cuando tienes que tomar una decisión importante?", optionLabels: ["Confío en mi propio juicio", "Le doy vueltas, pero termino confiando en mí", "Sigo dudando si mi juicio es correcto", "Siento que no tengo la capacidad para decidir"] },
  F8: { prompt: "Cuando miras hacia atrás y ves lo que has logrado?", optionLabels: ["Me siento orgulloso/a de mí mismo/a", "Siento que no está mal", "Siento que fue por suerte o por otros", "Siento que no he logrado nada de verdad"] },
  F9: { prompt: "Cuando te asignan un rol o responsabilidad nuevos?", optionLabels: ["Me emociona y siento que puedo hacerlo bien", "Es una carga, pero parece manejable", "Me da miedo no poder con esto", "Siento que tarde o temprano se descubrirá mi incompetencia"] },
  F10: { prompt: "¿Cómo te calificarías a ti mismo/a en general?", optionLabels: ["Creo que soy bastante capaz", "Creo que estoy en un nivel promedio", "Seguido siento que me quedo corto/a", "Muchas veces me siento incompetente"] },
};

export const MODULE3_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  exhaustion: 10,
  cynicism: 10,
  efficacyLoss: 10,
};

export const MODULE3_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    exhaustion: { high: "소진", low: "회복된 에너지" },
    cynicism: { high: "냉소", low: "일에 대한 애정" },
    efficacyLoss: { high: "효능감저하", low: "자기효능감" },
  },
  en: {
    exhaustion: { high: "Exhaustion", low: "Restored Energy" },
    cynicism: { high: "Cynicism", low: "Care for the Work" },
    efficacyLoss: { high: "Reduced Efficacy", low: "Self-Efficacy" },
  },
  es: {
    exhaustion: { high: "Agotamiento", low: "Energía Recuperada" },
    cynicism: { high: "Cinismo", low: "Aprecio por el Trabajo" },
    efficacyLoss: { high: "Baja Eficacia", low: "Autoeficacia" },
  },
};

export const MODULE3_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "제 페이스 유지형", hook: "지금은 소진·냉소·효능감저하 어느 쪽도 뚜렷하지 않은, 비교적 안정된 상태입니다." },
    exhaustion: { title: "소진형", hook: "에너지가 바닥난 상태지만, 일에 대한 애정과 자기 확신은 아직 남아있습니다." },
    cynicism: { title: "냉소형", hook: "몸은 버틸 만하지만, 일과 조직에 대한 마음이 식어가고 있습니다." },
    efficacyLoss: { title: "효능감저하형", hook: "실제 성과와 무관하게, 스스로의 능력에 대한 확신이 흔들리고 있습니다." },
    "exhaustion+cynicism": { title: "탈진형", hook: "에너지도 바닥났고 일에 대한 애정도 식어가는, 번아웃이 상당히 진행된 상태입니다." },
    "exhaustion+efficacyLoss": { title: "소진된 확신 결여형", hook: "지쳐있는 동시에 스스로를 의심하게 되는, MBI에서 흔한 조합입니다." },
    "cynicism+efficacyLoss": { title: "회의적 무력형", hook: "일에 대한 의미도, 스스로에 대한 확신도 함께 옅어진 상태입니다." },
    "exhaustion+cynicism+efficacyLoss": { title: "완전 소진형", hook: "MBI가 정의하는 전형적인 '풀 번아웃 증후군' — 소진, 냉소, 효능감저하가 모두 뚜렷합니다." },
  },
  en: {
    baseline: { title: "Steady Pace", hook: "Right now, neither exhaustion, cynicism, nor reduced efficacy stands out clearly — a relatively stable state." },
    exhaustion: { title: "Exhausted Type", hook: "Your energy has run dry, but your care for the work and your self-belief are still intact." },
    cynicism: { title: "Cynical Type", hook: "Your body can still keep up, but your heart is cooling toward the work and the organization." },
    efficacyLoss: { title: "Reduced-Efficacy Type", hook: "Regardless of your actual performance, your confidence in your own ability is shaking." },
    "exhaustion+cynicism": { title: "Burned Out", hook: "Your energy is gone and your care for the work is fading too — burnout has progressed quite far." },
    "exhaustion+efficacyLoss": { title: "Exhausted and Self-Doubting", hook: "You're worn out and doubting yourself at the same time — a combination that shows up often in burnout research." },
    "cynicism+efficacyLoss": { title: "Disillusioned and Powerless", hook: "Both the meaning you find in the work and your confidence in yourself have faded together." },
    "exhaustion+cynicism+efficacyLoss": { title: "Full Burnout", hook: "The classic 'full burnout syndrome' — exhaustion, cynicism, and reduced efficacy are all clearly present." },
  },
  es: {
    baseline: { title: "Ritmo Sostenido", hook: "Por ahora, ni el agotamiento, ni el cinismo, ni la baja eficacia destacan con claridad — un estado relativamente estable." },
    exhaustion: { title: "Tipo Agotado", hook: "Tu energía está por el suelo, pero tu aprecio por el trabajo y tu confianza en ti mismo siguen intactos." },
    cynicism: { title: "Tipo Cínico", hook: "Tu cuerpo todavía aguanta, pero tu corazón se está enfriando hacia el trabajo y la organización." },
    efficacyLoss: { title: "Tipo Baja Eficacia", hook: "Sin importar tu desempeño real, tu confianza en tu propia capacidad se está tambaleando." },
    "exhaustion+cynicism": { title: "Quemado", hook: "Tu energía se acabó y tu aprecio por el trabajo también se está desvaneciendo — el burnout ha avanzado bastante." },
    "exhaustion+efficacyLoss": { title: "Agotado y Dudando de Ti Mismo", hook: "Estás exhausto y dudando de ti mismo al mismo tiempo, una combinación muy frecuente en el burnout." },
    "cynicism+efficacyLoss": { title: "Desilusionado y Sin Fuerzas", hook: "Tanto el sentido que le encuentras al trabajo como tu confianza en ti mismo se han desvanecido juntos." },
    "exhaustion+cynicism+efficacyLoss": { title: "Burnout Total", hook: "El clásico 'síndrome de burnout completo' — agotamiento, cinismo y baja eficacia están todos claramente presentes." },
  },
};
