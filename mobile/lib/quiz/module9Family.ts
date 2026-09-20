/**
 * lib/module9Family.ts
 * ------------------------------------------------------------------
 * Module 9 — 가족/원가족 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈9_원가족_30문항_전문가검토용.xlsx). 3차원(Bowen 가족체계이론 기반):
 * 정서적얽힘(EM1-EM10) / 정서적단절(CO1-CO10) / 역할부담(PA1-PA10).
 * 트라우마나 구체적 사건을 직접 묻는 문항은 의도적으로 배제되어 있다.
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE9_QUESTIONS: ModuleQuestion[] = [
  // ---- 정서적얽힘 (Enmeshment) — EM1-EM10 ----
  { id: "EM1", dimension: "enmeshment", format: "slider", prompt: "가족 중 누군가의 기분이 안 좋으면 내 기분도 같이 가라앉는 정도는?", options: { minLabel: "전혀 영향 없음", maxLabel: "거의 그대로 전이됨" } },
  { id: "EM2", dimension: "enmeshment", format: "choice", prompt: "부모님이 힘들어하시면?", options: [
    { label: "내 일과 구분해서 생각한다", score: 0 }, { label: "마음이 쓰이지만 내 생활은 유지한다", score: 1 },
    { label: "내 기분도 크게 영향받는다", score: 2 }, { label: "내가 해결해줘야 할 것 같은 책임감이 든다", score: 3 } ] },
  { id: "EM3", dimension: "enmeshment", format: "choice", prompt: "가족과의 갈등이 있으면?", options: [
    { label: "각자의 문제로 넘긴다", score: 0 }, { label: "신경 쓰이지만 지나간다", score: 1 },
    { label: "오랫동안 마음에 남는다", score: 2 }, { label: "내 잘못처럼 느껴진다", score: 3 } ] },
  { id: "EM4", dimension: "enmeshment", format: "choice", prompt: "부모님의 기대나 바람은?", options: [
    { label: "참고만 한다", score: 0 }, { label: "어느 정도 고려한다", score: 1 },
    { label: "내 선택에 큰 영향을 준다", score: 2 }, { label: "내 인생의 기준이 되다시피 한다", score: 3 } ] },
  { id: "EM5", dimension: "enmeshment", format: "choice", prompt: "가족 모임이나 통화 후?", options: [
    { label: "가볍게 마무리된다", score: 0 }, { label: "별다른 여운 없다", score: 1 },
    { label: "기분이 한동안 영향받는다", score: 2 }, { label: "감정을 추스르는 데 시간이 필요하다", score: 3 } ] },
  { id: "EM6", dimension: "enmeshment", format: "choice", prompt: "나의 성취나 실패가 가족에게?", options: [
    { label: "내 개인적인 일이라 느낀다", score: 0 }, { label: "어느 정도 영향이 있다고 느낀다", score: 1 },
    { label: "가족 전체의 일처럼 느껴진다", score: 2 }, { label: "가족을 실망시킬까 봐 늘 신경 쓰인다", score: 3 } ] },
  { id: "EM7", dimension: "enmeshment", format: "choice", prompt: "독립적인 결정(진로, 연애 등)을 내릴 때?", options: [
    { label: "온전히 내 의지로 정한다", score: 0 }, { label: "참고는 하되 내가 정한다", score: 1 },
    { label: "가족의 반응을 먼저 생각한다", score: 2 }, { label: "가족이 반대하면 포기하게 된다", score: 3 } ] },
  { id: "EM8", dimension: "enmeshment", format: "choice", prompt: "부모님과 나의 감정 상태가?", options: [
    { label: "서로 별개로 흘러간다", score: 0 }, { label: "어느 정도 영향을 주고받는다", score: 1 },
    { label: "자주 같이 오르내린다", score: 2 }, { label: "거의 같은 리듬으로 움직인다", score: 3 } ] },
  { id: "EM9", dimension: "enmeshment", format: "choice", prompt: "가족에게 서운한 게 있어도?", options: [
    { label: "편하게 말한다", score: 0 }, { label: "적당히 말한다", score: 1 },
    { label: "괜히 미안해서 말을 아낀다", score: 2 }, { label: "내가 예민한 건가 싶어 참는다", score: 3 } ] },
  { id: "EM10", dimension: "enmeshment", format: "choice", prompt: "'나'와 '가족'을 분리해서 생각하면?", options: [
    { label: "쉽게 구분된다", score: 0 }, { label: "대체로 구분된다", score: 1 },
    { label: "가끔 헷갈린다", score: 2 }, { label: "어디까지가 나고 어디부터가 가족인지 모호하다", score: 3 } ] },
  // ---- 정서적단절 (Cutoff) — CO1-CO10 ----
  { id: "CO1", dimension: "cutoff", format: "slider", prompt: "가족과 깊은 이야기를 나누는 것이 어려운 정도는?", options: { minLabel: "전혀 어렵지 않음", maxLabel: "매우 어려움" } },
  { id: "CO2", dimension: "cutoff", format: "choice", prompt: "가족에게 요즘 근황을 말할 때?", options: [
    { label: "솔직하게 다 말한다", score: 0 }, { label: "대체로 말한다", score: 1 },
    { label: "필요한 것만 간단히 말한다", score: 2 }, { label: "거의 표면적인 얘기만 한다", score: 3 } ] },
  { id: "CO3", dimension: "cutoff", format: "choice", prompt: "가족 행사나 모임에?", options: [
    { label: "적극적으로 참여한다", score: 0 }, { label: "참여는 한다", score: 1 },
    { label: "가급적 줄이려 한다", score: 2 }, { label: "핑계를 대서라도 피하고 싶다", score: 3 } ] },
  { id: "CO4", dimension: "cutoff", format: "choice", prompt: "힘든 일이 있을 때 가족에게?", options: [
    { label: "가장 먼저 말한다", score: 0 }, { label: "어느 정도 말한다", score: 1 },
    { label: "거의 말하지 않는다", score: 2 }, { label: "가족은 마지막까지 모르게 한다", score: 3 } ] },
  { id: "CO5", dimension: "cutoff", format: "choice", prompt: "부모님과의 대화 주제는?", options: [
    { label: "다양하고 깊다", score: 0 }, { label: "일상적인 이야기가 많다", score: 1 },
    { label: "안부 정도로 제한적이다", score: 2 }, { label: "거의 형식적인 대화뿐이다", score: 3 } ] },
  { id: "CO6", dimension: "cutoff", format: "choice", prompt: "가족과 물리적으로 멀어진 것에 대해?", options: [
    { label: "해당 없음 또는 가깝게 지낸다", score: 0 }, { label: "자연스러운 변화라 생각한다", score: 1 },
    { label: "오히려 마음이 편하다", score: 2 }, { label: "의도적으로 거리를 두게 됐다", score: 3 } ] },
  { id: "CO7", dimension: "cutoff", format: "choice", prompt: "가족이 나에 대해 얼마나 알고 있다고 느끼는가?", options: [
    { label: "잘 알고 있다", score: 0 }, { label: "어느 정도 안다", score: 1 },
    { label: "겉모습 정도만 안다", score: 2 }, { label: "진짜 나에 대해선 거의 모른다", score: 3 } ] },
  { id: "CO8", dimension: "cutoff", format: "choice", prompt: "명절이나 가족 연락을 앞두면?", options: [
    { label: "반갑고 기대된다", score: 0 }, { label: "무난하게 받아들인다", score: 1 },
    { label: "약간의 부담이 있다", score: 2 }, { label: "피하고 싶은 마음이 크다", score: 3 } ] },
  { id: "CO9", dimension: "cutoff", format: "choice", prompt: "가족에 대한 감정을 한마디로 하면?", options: [
    { label: "따뜻함", score: 0 }, { label: "무난함", score: 1 },
    { label: "거리감", score: 2 }, { label: "의무감", score: 3 } ] },
  { id: "CO10", dimension: "cutoff", format: "choice", prompt: "성인이 된 후 가족과의 관계는?", options: [
    { label: "더 가까워졌다", score: 0 }, { label: "비슷하게 유지된다", score: 1 },
    { label: "점점 멀어졌다", score: 2 }, { label: "최소한의 연락만 하는 사이가 됐다", score: 3 } ] },
  // ---- 역할부담 (Parentification) — PA1-PA10 ----
  { id: "PA1", dimension: "parentification", format: "slider", prompt: "어릴 때부터 집안일이나 형제자매를 챙기는 역할을 했던 정도는?", options: { minLabel: "전혀 그런 역할 없었음", maxLabel: "항상 그런 역할을 맡음" } },
  { id: "PA2", dimension: "parentification", format: "choice", prompt: "어릴 때 나는?", options: [
    { label: "또래처럼 마음껏 어렸다", score: 0 }, { label: "또래와 비슷했다", score: 1 },
    { label: "또래보다 철이 일찍 들었다", score: 2 }, { label: "어린 시절부터 어른 노릇을 해야 했다", score: 3 } ] },
  { id: "PA3", dimension: "parentification", format: "choice", prompt: "가족 안에서 나의 역할은 주로?", options: [
    { label: "보살핌을 받는 쪽이었다", score: 0 }, { label: "자연스럽게 나눠졌다", score: 1 },
    { label: "챙기는 역할을 자주 맡았다", score: 2 }, { label: "내가 가족을 이끌어야 했다", score: 3 } ] },
  { id: "PA4", dimension: "parentification", format: "choice", prompt: "부모님의 감정(걱정, 스트레스 등)을?", options: [
    { label: "몰랐거나 상관없었다", score: 0 }, { label: "어느 정도 느꼈다", score: 1 },
    { label: "자주 살펴야 했다", score: 2 }, { label: "내가 달래드려야 할 때가 많았다", score: 3 } ] },
  { id: "PA5", dimension: "parentification", format: "choice", prompt: "지금도 가족 문제가 생기면?", options: [
    { label: "각자 알아서 해결한다", score: 0 }, { label: "필요하면 돕는다", score: 1 },
    { label: "내가 나서서 해결해야 할 것 같다", score: 2 }, { label: "항상 내가 책임져야 한다는 부담이 있다", score: 3 } ] },
  { id: "PA6", dimension: "parentification", format: "choice", prompt: "어린 시절, 내 감정보다 우선했던 것은?", options: [
    { label: "딱히 없었다", score: 0 }, { label: "가끔 그랬다", score: 1 },
    { label: "가족 분위기가 먼저였다", score: 2 }, { label: "내 감정은 뒷전이었다", score: 3 } ] },
  { id: "PA7", dimension: "parentification", format: "choice", prompt: "지금 관계(연애, 친구 등)에서 나는?", options: [
    { label: "적당히 서로 챙긴다", score: 0 }, { label: "비슷하게 주고받는다", score: 1 },
    { label: "내가 더 많이 챙기는 편이다", score: 2 }, { label: "늘 내가 상대를 돌봐야 할 것 같다", score: 3 } ] },
  { id: "PA8", dimension: "parentification", format: "choice", prompt: "스스로 쉬어도 될 때조차?", options: [
    { label: "편하게 쉰다", score: 0 }, { label: "어느 정도 쉰다", score: 1 },
    { label: "뭔가 해야 할 것 같은 불안이 있다", score: 2 }, { label: "쉬는 것에 죄책감을 느낀다", score: 3 } ] },
  { id: "PA9", dimension: "parentification", format: "choice", prompt: "'내가 없으면 안 될 것 같다'는 느낌은?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "관계나 일에서 늘 그렇게 느낀다", score: 3 } ] },
  { id: "PA10", dimension: "parentification", format: "choice", prompt: "어릴 때를 돌아보면?", options: [
    { label: "충분히 아이답게 지냈다고 느낀다", score: 0 }, { label: "대체로 그랬다고 느낀다", score: 1 },
    { label: "조금 일찍 철이 든 것 같다", score: 2 }, { label: "아이였던 시간이 짧았다고 느낀다", score: 3 } ] },
];

// Display-text-only translations of MODULE9_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE9_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  EM1: { prompt: "How much does your mood sink when someone in your family is in a bad mood?", minLabel: "No effect at all", maxLabel: "It transfers almost exactly" },
  EM2: { prompt: "When your parents are struggling?", optionLabels: ["I keep it separate from my own life", "It concerns me, but I keep living my life", "My own mood gets strongly affected too", "I feel a responsibility to fix it for them"] },
  EM3: { prompt: "When there's a conflict with family?", optionLabels: ["I let each person deal with their own part", "It bothers me, but it passes", "It stays on my mind for a long time", "It feels like it's my fault"] },
  EM4: { prompt: "How much do your parents' expectations or wishes matter to you?", optionLabels: ["I just take note of them", "I consider them to some degree", "They heavily influence my choices", "They've become almost the standard I live by"] },
  EM5: { prompt: "After a family gathering or phone call?", optionLabels: ["It wraps up lightly", "No lingering effect", "My mood is affected for a while", "I need time to settle my emotions"] },
  EM6: { prompt: "How do you feel your successes or failures affect your family?", optionLabels: ["I feel they're my own personal matter", "I feel there's some effect on them", "It feels like the whole family's business", "I'm always anxious about disappointing my family"] },
  EM7: { prompt: "When making an independent decision (career, dating, etc.)?", optionLabels: ["I decide entirely by my own will", "I take it into account, but decide for myself", "I think about my family's reaction first", "I give up on it if my family objects"] },
  EM8: { prompt: "How do your emotional state and your parents' emotional state relate?", optionLabels: ["They flow independently of each other", "They influence each other to some degree", "They often rise and fall together", "They move in almost the same rhythm"] },
  EM9: { prompt: "Even when you feel hurt by family?", optionLabels: ["I say so comfortably", "I say so to a reasonable degree", "I hold back because I feel guilty for no reason", "I hold it in, wondering if I'm just being too sensitive"] },
  EM10: { prompt: "How easily can you think of \"me\" and \"my family\" as separate?", optionLabels: ["Easily separated", "Mostly separated", "Sometimes it gets confusing", "It's unclear where I end and my family begins"] },
  CO1: { prompt: "How hard is it for you to have deep conversations with your family?", minLabel: "Not hard at all", maxLabel: "Very hard" },
  CO2: { prompt: "When telling your family how you've been lately?", optionLabels: ["I tell them everything honestly", "I tell them most of it", "I only briefly mention what's necessary", "It's almost all surface-level talk"] },
  CO3: { prompt: "When it comes to family events or gatherings?", optionLabels: ["I take part actively", "I do take part", "I try to cut back when I can", "I want to avoid it even if I have to make excuses"] },
  CO4: { prompt: "When something's hard, do you tell your family?", optionLabels: ["They're the first ones I tell", "I tell them to some degree", "I hardly tell them", "I keep my family from finding out until the very end"] },
  CO5: { prompt: "What do you usually talk about with your parents?", optionLabels: ["A wide range of deep topics", "Mostly everyday things", "Limited to checking in", "Almost just formal conversation"] },
  CO6: { prompt: "How do you feel about being physically distant from your family?", optionLabels: ["Not applicable, or I stay close with them", "I think it's a natural change", "It actually feels like a relief", "I've deliberately kept some distance"] },
  CO7: { prompt: "How much do you feel your family really knows about you?", optionLabels: ["They know me well", "They know me to some degree", "They only know the surface", "They barely know the real me"] },
  CO8: { prompt: "Right before a holiday or contact with family?", optionLabels: ["I feel glad and look forward to it", "I take it in stride", "There's a bit of pressure", "I strongly want to avoid it"] },
  CO9: { prompt: "In one word, how do you feel about your family?", optionLabels: ["Warmth", "Neutral", "Distance", "Obligation"] },
  CO10: { prompt: "How has your relationship with family changed since becoming an adult?", optionLabels: ["It's gotten closer", "It's stayed about the same", "It's gradually grown more distant", "It's become a relationship with only minimal contact"] },
  PA1: { prompt: "How much did you take on chores or looking after siblings from a young age?", minLabel: "Never had that kind of role", maxLabel: "Always had that kind of role" },
  PA2: { prompt: "As a child, were you...?", optionLabels: ["As carefree as any other kid", "Similar to other kids", "More mature than my peers, early on", "Having to act like an adult from a young age"] },
  PA3: { prompt: "What was your role in the family, mainly?", optionLabels: ["The one being taken care of", "It was naturally shared", "I often took on the caretaking role", "I had to be the one leading the family"] },
  PA4: { prompt: "How aware were you of your parents' emotions (worry, stress, etc.)?", optionLabels: ["Unaware or indifferent", "Aware to some degree", "I often had to keep an eye on it", "I often had to be the one to soothe them"] },
  PA5: { prompt: "Even now, when a family problem comes up?", optionLabels: ["Everyone handles their own part", "I help if it's needed", "It feels like I have to step in and solve it", "I always feel the burden that I have to take responsibility"] },
  PA6: { prompt: "As a child, what took priority over your own feelings?", optionLabels: ["Nothing in particular", "Sometimes, something did", "The family's mood came first", "My feelings were always secondary"] },
  PA7: { prompt: "In your current relationships (dating, friendships, etc.), are you...?", optionLabels: ["We take care of each other about equally", "We give and take about the same", "I tend to take care of them more", "I always feel like I have to be the one looking after them"] },
  PA8: { prompt: "Even when it's okay for you to rest?", optionLabels: ["I rest comfortably", "I rest to some degree", "There's an anxious feeling that I should be doing something", "I feel guilty for resting"] },
  PA9: { prompt: "How often do you feel \"things won't work without me\"?", optionLabels: ["Almost never", "Occasionally", "Often", "I always feel this way in relationships or work"] },
  PA10: { prompt: "Looking back on your childhood?", optionLabels: ["I feel I got to be a kid fully", "I feel that was mostly true", "I feel I grew up a bit too fast", "I feel my time being a child was short"] },
};

export const MODULE9_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  EM1: { prompt: "Cuando alguien de tu familia está de mal humor, ¿cuánto se te hunde el ánimo a ti?", minLabel: "Nada", maxLabel: "Se me contagia casi por completo" },
  EM2: { prompt: "Cuando tus padres están pasando por un mal momento, ¿qué te ocurre?", optionLabels: ["Lo mantengo aparte de mi propia vida", "Me preocupa, pero sigo con mi vida", "Mi propio ánimo también se resiente mucho", "Siento la responsabilidad de arreglarlo por ellos"] },
  EM3: { prompt: "Cuando hay un conflicto en la familia, ¿qué te ocurre?", optionLabels: ["Dejo que cada cual se ocupe de lo suyo", "Me molesta, pero se me pasa", "Se me queda en la cabeza mucho tiempo", "Siento que es culpa mía"] },
  EM4: { prompt: "¿Cuánto pesan en ti las expectativas o los deseos de tus padres?", optionLabels: ["Solo los tengo en cuenta", "Los tengo en cuenta hasta cierto punto", "Influyen mucho en mis decisiones", "Se han convertido casi en la vara con la que mido mi vida"] },
  EM5: { prompt: "Después de una reunión familiar o de una llamada, ¿cómo te quedas?", optionLabels: ["Sin ninguna carga", "Sin que me deje huella", "Con el ánimo afectado durante un rato", "Necesito tiempo para asentar mis emociones"] },
  EM6: { prompt: "¿Cómo sientes que afectan tus éxitos o tus fracasos a tu familia?", optionLabels: ["Los siento como algo personal mío", "Siento que les afectan en cierta medida", "Me parecen un asunto de toda la familia", "Siempre me inquieta la idea de decepcionar a mi familia"] },
  EM7: { prompt: "Cuando tomas una decisión propia (trabajo, pareja, etc.), ¿cómo lo haces?", optionLabels: ["Decido solo según mi voluntad", "Lo tengo en cuenta, pero decido yo", "Pienso primero en cómo reaccionará mi familia", "Renuncio si mi familia se opone"] },
  EM8: { prompt: "¿Cómo se relacionan tu estado emocional y el de tus padres?", optionLabels: ["Van cada uno por su lado", "Se influyen mutuamente hasta cierto punto", "A menudo suben y bajan a la vez", "Se mueven casi al mismo ritmo"] },
  EM9: { prompt: "Cuando algo de tu familia te hiere, ¿qué haces?", optionLabels: ["Lo digo con naturalidad", "Lo digo de forma razonable", "Me contengo porque me siento culpable sin motivo", "Me lo callo, preguntándome si seré demasiado sensible"] },
  EM10: { prompt: "¿Con qué facilidad puedes pensar en «yo» y en «mi familia» como cosas separadas?", optionLabels: ["Se separan con facilidad", "Por lo general se separan", "A veces se me confunden", "No tengo claro dónde termino yo y dónde empieza mi familia"] },
  CO1: { prompt: "¿Cuánto te cuesta mantener conversaciones profundas con tu familia?", minLabel: "Nada", maxLabel: "Muchísimo" },
  CO2: { prompt: "Cuando cuentas a tu familia cómo te va últimamente, ¿qué haces?", optionLabels: ["Se lo cuento todo con sinceridad", "Les cuento la mayor parte", "Solo les menciono brevemente lo necesario", "Casi todo es conversación superficial"] },
  CO3: { prompt: "¿Cuánto participas en los eventos o reuniones de la familia?", optionLabels: ["Participo activamente", "Participo", "Intento reducirlo cuando puedo", "Quiero evitarlo, aunque tenga que poner excusas"] },
  CO4: { prompt: "Cuando estás pasando un mal momento, ¿se lo cuentas a tu familia?", optionLabels: ["Son las primeras personas a quienes se lo cuento", "Se lo cuento hasta cierto punto", "Casi no se lo cuento", "Hago lo posible para que mi familia no se entere"] },
  CO5: { prompt: "¿De qué sueles hablar con tus padres?", optionLabels: ["De temas muy variados y profundos", "Sobre todo de cosas cotidianas", "Solo de cómo estamos", "Casi solo conversación de cortesía"] },
  CO6: { prompt: "¿Qué sientes al estar lejos de tu familia físicamente?", optionLabels: ["No es mi caso, o sigo cerca de ellos", "Me parece un cambio natural", "En realidad, lo siento como un alivio", "He mantenido cierta distancia a propósito"] },
  CO7: { prompt: "¿Cuánto sientes que tu familia te conoce de verdad?", optionLabels: ["Me conocen bien", "Me conocen hasta cierto punto", "Solo conocen lo superficial", "Apenas conocen cómo soy en realidad"] },
  CO8: { prompt: "Justo antes de una fiesta señalada o de tener contacto con tu familia, ¿qué sientes?", optionLabels: ["Alegría e ilusión", "Lo llevo con tranquilidad", "Cierta presión", "Unas ganas enormes de evitarlo"] },
  CO9: { prompt: "Si tuvieras que resumirlo en una palabra, ¿qué sientes por tu familia?", optionLabels: ["Calidez", "Neutralidad", "Distancia", "Obligación"] },
  CO10: { prompt: "¿Cómo ha cambiado tu relación con tu familia en tu vida adulta?", optionLabels: ["Se ha vuelto más cercana", "Se ha mantenido más o menos igual", "Se ha ido distanciando poco a poco", "Ha quedado en un contacto mínimo"] },
  PA1: { prompt: "Desde tu infancia, ¿en qué medida te tocó encargarte de las tareas de casa o de cuidar a tus hermanos?", minLabel: "Nunca tuve ese papel", maxLabel: "Siempre tuve ese papel" },
  PA2: { prompt: "En tu infancia, ¿cómo eras?", optionLabels: ["Con la misma despreocupación que cualquier otro niño", "Parecido a los demás niños", "Con más madurez que la gente de mi edad, desde muy pronto", "Tenía que comportarme como una persona adulta desde muy temprano"] },
  PA3: { prompt: "¿Cuál era, sobre todo, tu papel en la familia?", optionLabels: ["Quien recibía los cuidados", "Se repartía de forma natural", "Con frecuencia me tocaba cuidar de los demás", "Me tocaba ser quien llevara las riendas de la familia"] },
  PA4: { prompt: "¿Cuánto estabas pendiente de las emociones de tus padres (preocupación, estrés, etc.)?", optionLabels: ["No me daba cuenta o no me afectaba", "Lo notaba hasta cierto punto", "A menudo tenía que estar pendiente", "Muchas veces me tocaba ser quien los consolara"] },
  PA5: { prompt: "Aún hoy, cuando surge un problema en la familia, ¿qué haces?", optionLabels: ["Cada cual se ocupa de lo suyo", "Ayudo si hace falta", "Siento que me toca intervenir y resolverlo", "Siempre siento el peso de tener que hacerme cargo"] },
  PA6: { prompt: "En tu infancia, ¿qué pasaba por delante de lo que tú sentías?", optionLabels: ["Nada en particular", "A veces, alguna cosa", "El ambiente de la familia iba primero", "Lo que yo sentía siempre quedaba en segundo plano"] },
  PA7: { prompt: "En tus relaciones actuales (pareja, amistades, etc.), ¿cómo se reparten los cuidados?", optionLabels: ["Nos cuidamos mutuamente por igual", "Damos y recibimos más o menos lo mismo", "Suelo cuidar yo un poco más", "Siempre siento que me toca cuidar de la otra persona"] },
  PA8: { prompt: "Aunque puedas descansar tranquilamente, ¿qué te pasa?", optionLabels: ["Descanso a gusto", "Descanso hasta cierto punto", "Me inquieta la sensación de que debería estar haciendo algo", "Me siento culpable por descansar"] },
  PA9: { prompt: "¿Con qué frecuencia sientes que «sin mí las cosas no funcionarán»?", optionLabels: ["Casi nunca", "De vez en cuando", "A menudo", "Siempre lo siento en mis relaciones o en el trabajo"] },
  PA10: { prompt: "Cuando miras atrás, a tu infancia, ¿qué sientes?", optionLabels: ["Que pude vivir la infancia por completo", "Que, en general, fue así", "Que crecí un poco demasiado deprisa", "Que mi tiempo de infancia fue corto"] },
};

export const MODULE9_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  enmeshment: 10,
  cutoff: 10,
  parentification: 10,
};

export const MODULE9_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    enmeshment: { high: "정서적얽힘", low: "건강한 분리" },
    cutoff: { high: "정서적단절", low: "열린 소통" },
    parentification: { high: "역할부담", low: "가벼운 책임감" },
  },
  en: {
    enmeshment: { high: "Emotional Entanglement", low: "Healthy Separation" },
    cutoff: { high: "Emotional Distance", low: "Open Communication" },
    parentification: { high: "Grown-Up Roles Early", low: "Light Sense of Responsibility" },
  },
  es: {
    enmeshment: { high: "Fusión emocional", low: "Distancia sana" },
    cutoff: { high: "Corte emocional", low: "Comunicación abierta" },
    parentification: { high: "Carga de roles", low: "Responsabilidad llevadera" },
  },
};

export const MODULE9_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "균형잡힌 가족거리형", hook: "가족과 정서적으로 지나치게 얽혀 있지도, 단절되어 있지도 않은 균형 잡힌 상태입니다." },
    enmeshment: { title: "정서적 얽힘형", hook: "가족의 감정이 나도 모르게 크게 전이되고, 그 영향에서 벗어나기 어렵습니다." },
    cutoff: { title: "정서적 단절형", hook: "가족과 깊은 이야기를 나누기 어렵고, 의식적이든 아니든 거리를 두고 있습니다." },
    parentification: { title: "조숙한 돌봄형", hook: "어릴 때부터 어른 역할을 떠맡아온 패턴이 지금의 관계에도 이어지고 있습니다." },
    "enmeshment+cutoff": { title: "거리를 둔 채 끌려가는형", hook: "표면적으론 거리를 두면서도, 마음은 여전히 가족의 감정에 크게 끌려가는 모순적인 패턴입니다." },
    "enmeshment+parentification": { title: "책임과 얽힘형", hook: "가족의 감정도 떠안고, 돌봄의 책임까지 함께 짊어진 상태입니다." },
    "cutoff+parentification": { title: "거리를 둔 채 짊어진형", hook: "정서적으로는 멀어졌지만, 여전히 역할과 책임감만은 남아있는 상태입니다." },
    "enmeshment+cutoff+parentification": { title: "원가족 부담 총체형", hook: "얽힘, 단절, 역할부담이 모두 뚜렷하게 나타나는, 원가족의 영향이 여러 방향에서 무겁게 걸려있는 상태입니다." },
  },
  en: {
    baseline: { title: "Balanced Family Distance", hook: "You're neither overly entangled with your family's emotions nor cut off from them — a balanced state." },
    enmeshment: { title: "Emotionally Enmeshed Type", hook: "Your family's emotions bleed into you more than you realize, and it's hard to step outside their pull." },
    cutoff: { title: "Emotionally Cut-Off Type", hook: "It's hard to have deep conversations with your family, and you keep some distance, whether on purpose or not." },
    parentification: { title: "Precocious Caretaker Type", hook: "A pattern of taking on an adult role from a young age that still carries into your relationships now." },
    "enmeshment+cutoff": { title: "Distant Yet Pulled In", hook: "A contradictory pattern — keeping your distance on the surface while your heart still gets pulled strongly by the family's emotions." },
    "enmeshment+parentification": { title: "Entangled and Burdened", hook: "Carrying both your family's emotions and the weight of caretaking responsibility." },
    "cutoff+parentification": { title: "Distant Yet Burdened", hook: "You've pulled away emotionally, but the role and the responsibility have stuck around." },
    "enmeshment+cutoff+parentification": { title: "Full Family-Burden Type", hook: "Enmeshment, cutoff, and parentification are all clearly present — your family of origin's influence is weighing heavily from several directions." },
  },
  es: {
    baseline: { title: "Distancia familiar equilibrada", hook: "Tu vínculo con las emociones de tu familia no es ni demasiado estrecho ni demasiado distante: un estado equilibrado." },
    enmeshment: { title: "Fusión emocional", hook: "Las emociones de tu familia se te contagian más de lo que crees, y cuesta salir de su influencia." },
    cutoff: { title: "Corte emocional", hook: "Te cuesta mantener conversaciones profundas con tu familia y guardas cierta distancia, con o sin intención." },
    parentification: { title: "Cuidar antes de tiempo", hook: "Asumiste un papel de persona adulta desde muy temprano, y ese patrón sigue presente en tus relaciones de hoy." },
    "enmeshment+cutoff": { title: "Lejos por fuera, cerca por dentro", hook: "Un patrón contradictorio: por fuera mantienes la distancia, mientras que por dentro las emociones de la familia siguen tirando de ti con fuerza." },
    "enmeshment+parentification": { title: "Enredo y responsabilidad", hook: "Cargas con las emociones de tu familia y, además, con el peso de cuidar." },
    "cutoff+parentification": { title: "Lejos, pero con la carga", hook: "Te has alejado emocionalmente, pero el papel y la responsabilidad se han quedado contigo." },
    "enmeshment+cutoff+parentification": { title: "Mucho peso de la familia de origen", hook: "La fusión emocional, el corte emocional y la carga de roles aparecen con claridad: la influencia de tu familia de origen pesa desde varios frentes." },
  },
};
