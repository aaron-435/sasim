/**
 * lib/module2Money.ts
 * ------------------------------------------------------------------
 * Module 2 — 돈 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈2_돈_30문항_전문가검토용.xlsx). 3차원: 결핍공포(S1-S10) /
 * 과시욕(G1-G10) / 회피(M1-M10).
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE2_QUESTIONS: ModuleQuestion[] = [
  // ---- 결핍공포 (Scarcity Fear) — S1-S10 ----
  { id: "S1", dimension: "scarcity", format: "slider", prompt: "통장 잔고를 확인할 때 불안한 정도는?", options: { minLabel: "전혀 불안하지 않음", maxLabel: "매우 불안함" } },
  { id: "S2", dimension: "scarcity", format: "choice", prompt: "필요한 만큼 돈이 있어도?", options: [
    { label: "여유롭게 느낀다", score: 0 }, { label: "그럭저럭 안심된다", score: 1 },
    { label: "그래도 부족할까 걱정된다", score: 2 }, { label: "항상 모자란 것 같아 불안하다", score: 3 } ] },
  { id: "S3", dimension: "scarcity", format: "choice", prompt: "돈을 쓸 때 드는 생각은?", options: [
    { label: "필요하면 쓰는 거다", score: 0 }, { label: "적당히 고민하고 쓴다", score: 1 },
    { label: "쓸 때마다 아깝다는 생각이 든다", score: 2 }, { label: "쓰고 나면 죄책감이나 불안이 든다", score: 3 } ] },
  { id: "S4", dimension: "scarcity", format: "choice", prompt: "미래의 경제적 상황을 생각하면?", options: [
    { label: "크게 걱정 안 한다", score: 0 }, { label: "가끔 걱정된다", score: 1 },
    { label: "자주 불안해진다", score: 2 }, { label: "노후·미래 걱정에 잠 못 들 때도 있다", score: 3 } ] },
  { id: "S5", dimension: "scarcity", format: "choice", prompt: "돈이 생기면(보너스, 용돈 등)?", options: [
    { label: "쓰고 싶은 데 편하게 쓴다", score: 0 }, { label: "어느 정도 쓰고 저축한다", score: 1 },
    { label: "거의 다 모아둔다", score: 2 }, { label: "써야 할 곳에도 못 쓰고 쌓아만 둔다", score: 3 } ] },
  { id: "S6", dimension: "scarcity", format: "choice", prompt: "다른 사람이 돈 얘기(연봉, 지출 등)를 하면?", options: [
    { label: "편하게 듣는다", score: 0 }, { label: "약간 신경 쓰인다", score: 1 },
    { label: "내 상황과 비교하며 불안해진다", score: 2 }, { label: "괜히 초조해지고 위축된다", score: 3 } ] },
  { id: "S7", dimension: "scarcity", format: "choice", prompt: "급하게 큰돈이 필요한 상황을 상상하면?", options: [
    { label: "어떻게든 될 거라 생각한다", score: 0 }, { label: "약간 걱정되지만 괜찮다", score: 1 },
    { label: "매우 불안해진다", score: 2 }, { label: "최악의 상황까지 상상하게 된다", score: 3 } ] },
  { id: "S8", dimension: "scarcity", format: "choice", prompt: "물건을 살 때(꼭 필요한 것이라도)?", options: [
    { label: "필요하면 산다", score: 0 }, { label: "가격을 한 번 정도 비교해본다", score: 1 },
    { label: "여러 번 고민하다 산다", score: 2 }, { label: "싸다고 확신이 들어야 겨우 산다", score: 3 } ] },
  { id: "S9", dimension: "scarcity", format: "choice", prompt: "돈에 대한 꿈이나 상상을 하면?", options: [
    { label: "여유로운 상상을 한다", score: 0 }, { label: "별생각 없다", score: 1 },
    { label: "돈이 없어지는 상상을 할 때가 있다", score: 2 }, { label: "파산하거나 빈털터리가 되는 상상을 할 때가 있다", score: 3 } ] },
  { id: "S10", dimension: "scarcity", format: "choice", prompt: "저축이나 잔고가 줄어들면?", options: [
    { label: "자연스러운 일이라 여긴다", score: 0 }, { label: "조금 신경 쓰인다", score: 1 },
    { label: "바로 다시 채우고 싶어진다", score: 2 }, { label: "극도로 초조해진다", score: 3 } ] },
  // ---- 과시욕 (Ostentation) — G1-G10 ----
  { id: "G1", dimension: "ostentation", format: "choice", prompt: "물건을 살 때 브랜드/가격대가?", options: [
    { label: "크게 중요하지 않다", score: 0 }, { label: "약간 고려한다", score: 1 },
    { label: "남들에게 보이는 게 신경 쓰인다", score: 2 }, { label: "브랜드가 곧 나를 증명한다고 느낀다", score: 3 } ] },
  { id: "G2", dimension: "ostentation", format: "choice", prompt: "SNS에 소비(여행, 물건 등)를 올릴 때?", options: [
    { label: "그냥 기록용이다", score: 0 }, { label: "약간 보여주고 싶은 마음도 있다", score: 1 },
    { label: "반응이 신경 쓰인다", score: 2 }, { label: "인정받는 느낌이 꼭 필요하다", score: 3 } ] },
  { id: "G3", dimension: "ostentation", format: "choice", prompt: "남들보다 못 사는 것 같으면?", options: [
    { label: "별 상관 없다", score: 0 }, { label: "살짝 신경 쓰인다", score: 1 },
    { label: "자존심이 상한다", score: 2 }, { label: "어떻게든 따라잡아야 할 것 같다", score: 3 } ] },
  { id: "G4", dimension: "ostentation", format: "choice", prompt: "돈을 쓸 때 나의 가치가?", options: [
    { label: "돈과 무관하다고 느낀다", score: 0 }, { label: "약간 관련 있다고 느낀다", score: 1 },
    { label: "어느 정도 증명되는 것 같다", score: 2 }, { label: "돈 쓰는 만큼 내 가치가 결정된다고 느낀다", score: 3 } ] },
  { id: "G5", dimension: "ostentation", format: "slider", prompt: "남들에게 잘살아 보이고 싶은 마음의 정도는?", options: { minLabel: "전혀 없음", maxLabel: "매우 강함" } },
  { id: "G6", dimension: "ostentation", format: "choice", prompt: "무리해서라도 좋은 걸 사야 할 때?", options: [
    { label: "예산 안에서만 산다", score: 0 }, { label: "가끔 무리한다", score: 1 },
    { label: "자주 무리해서 산다", score: 2 }, { label: "할부나 빚을 내서라도 산다", score: 3 } ] },
  { id: "G7", dimension: "ostentation", format: "choice", prompt: "선물이나 한턱을 낼 때?", options: [
    { label: "부담 없는 선에서 한다", score: 0 }, { label: "기분 낼 정도로 한다", score: 1 },
    { label: "능력 이상으로 하게 된다", score: 2 }, { label: "과하게 써서 있어 보이고 싶어진다", score: 3 } ] },
  { id: "G8", dimension: "ostentation", format: "choice", prompt: "재테크나 투자 얘기가 나오면?", options: [
    { label: "담담하게 듣는다", score: 0 }, { label: "관심은 있다", score: 1 },
    { label: "남들보다 뒤처질까 조급해진다", score: 2 }, { label: "자랑할 만한 성과가 있어야 할 것 같다", score: 3 } ] },
  { id: "G9", dimension: "ostentation", format: "choice", prompt: "소비 후 만족감은?", options: [
    { label: "물건 자체로 만족한다", score: 0 }, { label: "대체로 만족한다", score: 1 },
    { label: "남들 반응이 있어야 진짜 만족된다", score: 2 }, { label: "과시가 안 되면 허무하다", score: 3 } ] },
  { id: "G10", dimension: "ostentation", format: "choice", prompt: "돈을 많이 벌고 싶은 이유는?", options: [
    { label: "내가 원하는 삶을 위해서다", score: 0 }, { label: "안정과 자유를 위해서다", score: 1 },
    { label: "남들에게 인정받고 싶은 마음도 있다", score: 2 }, { label: "무시당하지 않기 위해서다", score: 3 } ] },
  // ---- 회피 (Avoidance) — M1-M10 ----
  { id: "M1", dimension: "avoidance", format: "choice", prompt: "통장 정리나 지출 내역 확인은?", options: [
    { label: "정기적으로 한다", score: 0 }, { label: "가끔 한다", score: 1 },
    { label: "거의 안 본다", score: 2 }, { label: "보는 것 자체가 두렵다", score: 3 } ] },
  { id: "M2", dimension: "avoidance", format: "choice", prompt: "연봉 협상이나 돈 얘기를 해야 할 때?", options: [
    { label: "편하게 이야기한다", score: 0 }, { label: "약간 어색하지만 한다", score: 1 },
    { label: "최대한 피하고 싶다", score: 2 }, { label: "입도 뻥끗 못 한다", score: 3 } ] },
  { id: "M3", dimension: "avoidance", format: "choice", prompt: "돈 관련 서류(세금, 계약서 등)를 처리할 때?", options: [
    { label: "바로바로 처리한다", score: 0 }, { label: "미루다가 결국 한다", score: 1 },
    { label: "최대한 미룬다", score: 2 }, { label: "누군가 대신해주길 바란다", score: 3 } ] },
  { id: "M4", dimension: "avoidance", format: "choice", prompt: "내가 돈을 많이 벌게 된다면?", options: [
    { label: "당연히 좋은 일이라 느낀다", score: 0 }, { label: "좋지만 약간 낯설다", score: 1 },
    { label: "괜히 부담스럽다", score: 2 }, { label: "죄책감이나 불편함이 든다", score: 3 } ] },
  { id: "M5", dimension: "avoidance", format: "choice", prompt: "돈 관리(가계부, 예산 등)에 대해?", options: [
    { label: "체계적으로 관리한다", score: 0 }, { label: "대략적으로 안다", score: 1 },
    { label: "거의 파악을 안 한다", score: 2 }, { label: "의도적으로 안 보려고 한다", score: 3 } ] },
  { id: "M6", dimension: "avoidance", format: "choice", prompt: "주변에서 돈을 빌려달라 하거나 나눠 쓰자고 하면?", options: [
    { label: "상황 봐서 정한다", score: 0 }, { label: "부담되지만 도와준다", score: 1 },
    { label: "거절을 잘 못 해서 손해를 본다", score: 2 }, { label: "내가 손해 보더라도 맞춰준다", score: 3 } ] },
  { id: "M7", dimension: "avoidance", format: "choice", prompt: "투자나 재테크를 시작하려 하면?", options: [
    { label: "적극적으로 알아본다", score: 0 }, { label: "관심 있게 알아본다", score: 1 },
    { label: "복잡해서 계속 미룬다", score: 2 }, { label: "아예 손도 못 대고 있다", score: 3 } ] },
  { id: "M8", dimension: "avoidance", format: "slider", prompt: "돈 문제를 마주하는 게 부담스러운 정도는?", options: { minLabel: "전혀 부담 없음", maxLabel: "매우 부담스러움" } },
  { id: "M9", dimension: "avoidance", format: "choice", prompt: "내가 성공해서 돈을 많이 벌면 주변 사람들이?", options: [
    { label: "함께 기뻐해줄 거라 믿는다", score: 0 }, { label: "대체로 좋아할 거라 생각한다", score: 1 },
    { label: "질투하거나 멀어질까 걱정된다", score: 2 }, { label: "관계가 불편해질까 봐 성공을 주저하게 된다", score: 3 } ] },
  { id: "M10", dimension: "avoidance", format: "choice", prompt: "스스로 돈을 벌고 다루는 능력에 대해?", options: [
    { label: "충분히 잘 해낼 수 있다고 믿는다", score: 0 }, { label: "어느 정도 자신 있다", score: 1 },
    { label: "잘 모르겠고 자신 없다", score: 2 }, { label: "나는 돈 관리에 소질이 없다고 느낀다", score: 3 } ] },
];

// Display-text-only translations of MODULE2_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE2_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  S1: { prompt: "How anxious do you feel when checking your bank balance?", minLabel: "Not anxious at all", maxLabel: "Very anxious" },
  S2: { prompt: "Even when you have as much money as you need?", optionLabels: ["I feel comfortable and at ease", "I feel reasonably reassured", "I still worry it might not be enough", "It always feels like it's not enough, and that makes me anxious"] },
  S3: { prompt: "What goes through your mind when you spend money?", optionLabels: ["If I need it, I spend it", "I think it over a bit before spending", "Every time I spend, I feel like it's a waste", "After spending, I feel guilty or anxious"] },
  S4: { prompt: "When you think about your financial future?", optionLabels: ["I don't worry about it much", "I worry about it sometimes", "I get anxious about it often", "Worrying about retirement or the future sometimes keeps me up at night"] },
  S5: { prompt: "When you come into some money (a bonus, allowance, etc.)?", optionLabels: ["I spend it comfortably on what I want", "I spend some and save the rest", "I save almost all of it", "It just piles up, even when there's something I actually need to spend it on"] },
  S6: { prompt: "When someone else talks about money (salary, spending, etc.)?", optionLabels: ["I listen comfortably", "It bothers me a little", "I compare it to my own situation and get anxious", "I feel needlessly on edge and small"] },
  S7: { prompt: "When you imagine suddenly needing a large amount of money?", optionLabels: ["I figure I'll manage somehow", "I feel a bit worried, but it's fine", "I get very anxious", "I start imagining the worst-case scenario"] },
  S8: { prompt: "When buying something, even something you truly need?", optionLabels: ["If I need it, I buy it", "I compare prices once", "I mull it over several times before buying", "I can only bring myself to buy it once I'm sure it's cheap"] },
  S9: { prompt: "When you daydream or imagine things about money?", optionLabels: ["I imagine having plenty, comfortably", "I don't really think about it", "Sometimes I imagine running out of money", "Sometimes I imagine going bankrupt or ending up penniless"] },
  S10: { prompt: "When your savings or balance goes down?", optionLabels: ["I see it as a natural part of life", "It bothers me a little", "I immediately want to build it back up", "I get extremely on edge"] },
  G1: { prompt: "When buying things, does the brand or price tier matter to you?", optionLabels: ["Not really", "I consider it a little", "I care about how it looks to other people", "I feel like the brand proves who I am"] },
  G2: { prompt: "When posting about spending (a trip, an item, etc.) on social media?", optionLabels: ["It's just to keep a record", "There's a part of me that wants to show it off, too", "I care about people's reactions", "I really need to feel recognized for it"] },
  G3: { prompt: "If it seems like you're not doing as well as others?", optionLabels: ["It doesn't really matter to me", "It bothers me a little", "It hurts my pride", "I feel like I have to catch up somehow"] },
  G4: { prompt: "When you spend money, does your sense of self-worth change?", optionLabels: ["I feel it has nothing to do with money", "I feel it's related, a little", "I feel like it proves something, to some extent", "I feel my worth is decided by how much I spend"] },
  G5: { prompt: "How strong is your desire to look well-off to others?", minLabel: "Not at all", maxLabel: "Very strong" },
  G6: { prompt: "When you feel you have to buy something nice, even beyond your means?", optionLabels: ["I only buy within my budget", "I overspend once in a while", "I overspend often", "I'll buy it on installments or even go into debt for it"] },
  G7: { prompt: "When giving a gift or treating someone?", optionLabels: ["I keep it within a comfortable range", "I spend enough to make it feel special", "I end up spending beyond what I can really afford", "I overspend because I want to look good"] },
  G8: { prompt: "When the topic of investing or growing your money comes up?", optionLabels: ["I listen calmly", "I'm interested", "I get anxious about falling behind others", "I feel like I need results worth bragging about"] },
  G9: { prompt: "How satisfied do you feel after spending money?", optionLabels: ["The item itself is satisfying enough", "I'm generally satisfied", "I only feel truly satisfied once others react to it", "If I can't show it off, it feels empty"] },
  G10: { prompt: "Why do you want to make a lot of money?", optionLabels: ["To live the life I want", "For stability and freedom", "Partly because I want to be recognized by others", "So I won't be looked down on"] },
  M1: { prompt: "How often do you check your bank statement or spending history?", optionLabels: ["Regularly", "Sometimes", "Almost never", "Even looking at it feels frightening"] },
  M2: { prompt: "When you have to negotiate a salary or talk about money?", optionLabels: ["I talk about it comfortably", "It's a bit awkward, but I do it", "I want to avoid it as much as possible", "I can't even bring myself to say a word"] },
  M3: { prompt: "When dealing with money-related paperwork (taxes, contracts, etc.)?", optionLabels: ["I take care of it right away", "I put it off, but eventually get it done", "I put it off for as long as possible", "I hope someone else will just do it for me"] },
  M4: { prompt: "If you ended up making a lot of money?", optionLabels: ["I'd feel it's obviously a good thing", "It's good, but it would feel a bit unfamiliar", "It would feel strangely like a burden", "I'd feel some guilt or discomfort"] },
  M5: { prompt: "When it comes to managing your money (budgeting, tracking spending, etc.)?", optionLabels: ["I manage it systematically", "I have a rough idea", "I barely keep track", "I deliberately avoid looking at it"] },
  M6: { prompt: "When someone around you asks to borrow money or split a cost?", optionLabels: ["I decide based on the situation", "It's a burden, but I help out", "I'm bad at saying no, so I end up losing out", "I go along with it even if it costs me"] },
  M7: { prompt: "When you try to start investing or growing your money?", optionLabels: ["I actively look into it", "I look into it with interest", "It feels too complicated, so I keep putting it off", "I haven't been able to touch it at all"] },
  M8: { prompt: "How much pressure do you feel about facing money issues?", minLabel: "No pressure at all", maxLabel: "Extremely pressuring" },
  M9: { prompt: "If you became successful and made a lot of money, how would people around you react?", optionLabels: ["I trust they'd be genuinely happy for me", "I think they'd mostly be glad for me", "I worry they might get jealous or grow distant", "I hold back from succeeding because I worry it'll strain the relationship"] },
  M10: { prompt: "How do you feel about your own ability to earn and manage money?", optionLabels: ["I believe I can handle it just fine", "I feel reasonably confident", "I'm not sure, and I don't feel confident", "I feel like I just don't have a knack for managing money"] },
};

export const MODULE2_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  S1: { prompt: "¿Cuánta ansiedad sientes al revisar el saldo de tu cuenta?", minLabel: "Ninguna", maxLabel: "Muchísima" },
  S2: { prompt: "Aunque tengas todo el dinero que necesitas, ¿cómo te sientes?", optionLabels: ["Me siento a gusto, con margen de sobra", "Me siento razonablemente en calma", "Aun así me preocupa que no alcance", "Siento que siempre falta, y eso me genera ansiedad"] },
  S3: { prompt: "¿Qué piensas cuando gastas dinero?", optionLabels: ["Si lo necesito, lo gasto", "Lo pienso un poco antes de gastar", "Cada vez que gasto, siento que es dinero perdido", "Después de gastar, siento culpa o ansiedad"] },
  S4: { prompt: "Cuando piensas en tu futuro económico, ¿qué sientes?", optionLabels: ["No me preocupa mucho", "A veces me preocupa", "Me genera ansiedad a menudo", "A veces la preocupación por el futuro o por la jubilación me quita el sueño"] },
  S5: { prompt: "Cuando te llega dinero extra (un bono, una paga, etc.), ¿qué haces?", optionLabels: ["Lo gasto sin culpa en lo que quiero", "Gasto una parte y ahorro el resto", "Ahorro casi todo", "Se va acumulando, incluso cuando hay algo que de verdad necesito"] },
  S6: { prompt: "Cuando alguien habla de dinero (sueldo, gastos, etc.), ¿cómo reaccionas?", optionLabels: ["Lo escucho con tranquilidad", "Me incomoda un poco", "Lo comparo con mi situación y me da ansiedad", "Me entra nerviosismo y me siento en desventaja sin motivo"] },
  S7: { prompt: "Cuando imaginas que de repente necesitas una gran cantidad de dinero, ¿qué sientes?", optionLabels: ["Pienso que de algún modo saldré adelante", "Me preocupa un poco, pero estoy bien", "Me genera mucha ansiedad", "Empiezo a imaginar el peor escenario"] },
  S8: { prompt: "Al comprar algo, incluso algo que de verdad necesitas, ¿qué haces?", optionLabels: ["Si lo necesito, lo compro", "Comparo el precio una vez", "Lo pienso varias veces antes de comprarlo", "Solo lo compro cuando tengo la certeza de que es barato"] },
  S9: { prompt: "Cuando fantaseas o imaginas escenas sobre el dinero, ¿cómo son?", optionLabels: ["Imagino tener de sobra, con tranquilidad", "No le doy muchas vueltas", "A veces imagino que se me acaba el dinero", "A veces imagino que me arruino o me quedo sin nada"] },
  S10: { prompt: "Cuando tus ahorros o tu saldo bajan, ¿qué haces?", optionLabels: ["Lo veo como algo natural", "Me molesta un poco", "Quiero recuperarlo de inmediato", "Me genera una tensión enorme"] },
  G1: { prompt: "Al comprar cosas, ¿te importa la marca o el nivel de precio?", optionLabels: ["No mucho", "Lo tengo un poco en cuenta", "Me importa cómo se ve ante los demás", "Siento que la marca dice quién soy"] },
  G2: { prompt: "Cuando publicas un gasto (un viaje, una compra, etc.) en redes sociales, ¿qué buscas?", optionLabels: ["Es solo para guardar un registro", "También tengo ganas de mostrarlo un poco", "Me importan las reacciones", "Necesito sentir que me lo reconocen"] },
  G3: { prompt: "Si sientes que te va peor que a los demás, ¿cómo reaccionas?", optionLabels: ["No me importa mucho", "Me molesta un poco", "Me hiere el orgullo", "Siento que tengo que alcanzarlos como sea"] },
  G4: { prompt: "Cuando gastas dinero, ¿cambia tu sensación de valía personal?", optionLabels: ["Siento que no tiene nada que ver con el dinero", "Siento que tiene algo de relación", "Siento que demuestra algo, hasta cierto punto", "Siento que mi valor depende de cuánto gasto"] },
  G5: { prompt: "¿Qué tan fuerte es tu deseo de que los demás te vean con una buena situación económica?", minLabel: "Ninguno", maxLabel: "Muy fuerte" },
  G6: { prompt: "Cuando sientes que tienes que comprar algo de calidad, aunque no te alcance, ¿qué haces?", optionLabels: ["Solo compro dentro de mi presupuesto", "Me paso de vez en cuando", "Me paso con frecuencia", "Lo compro a cuotas o hasta me endeudo por ello"] },
  G7: { prompt: "Al hacer un regalo o invitar a alguien, ¿cómo gastas?", optionLabels: ["Me mantengo en un rango cómodo", "Gasto lo suficiente para que resulte especial", "Termino gastando más de lo que puedo permitirme", "Gasto de más para quedar bien"] },
  G8: { prompt: "Cuando sale el tema de invertir o hacer crecer tu dinero, ¿qué sientes?", optionLabels: ["Lo escucho con calma", "Me interesa", "Me da ansiedad quedarme atrás de los demás", "Siento que necesito resultados de los que poder presumir"] },
  G9: { prompt: "¿Cómo te sientes después de gastar dinero?", optionLabels: ["Con el objeto en sí ya me basta", "En general me siento conforme", "Solo me siento realmente bien cuando otros reaccionan", "Si no puedo lucirlo, se siente vacío"] },
  G10: { prompt: "¿Por qué quieres ganar mucho dinero?", optionLabels: ["Para vivir la vida que quiero", "Por estabilidad y libertad", "También en parte para que me reconozcan", "Para que no me menosprecien"] },
  M1: { prompt: "¿Con qué frecuencia revisas tu cuenta o tus gastos?", optionLabels: ["Con regularidad", "De vez en cuando", "Casi nunca", "Hasta mirarlo me da miedo"] },
  M2: { prompt: "Cuando tienes que negociar tu sueldo o hablar de dinero, ¿qué haces?", optionLabels: ["Lo hablo con tranquilidad", "Se me hace algo incómodo, pero lo hago", "Quiero evitarlo todo lo posible", "Ni siquiera logro abrir la boca"] },
  M3: { prompt: "Con los trámites relacionados con el dinero (impuestos, contratos, etc.), ¿qué haces?", optionLabels: ["Los resuelvo de inmediato", "Los dejo para después, pero al final los hago", "Los aplazo todo lo que puedo", "Espero que otra persona los haga por mí"] },
  M4: { prompt: "Si llegaras a ganar mucho dinero, ¿qué sentirías?", optionLabels: ["Sentiría que es algo bueno, sin más", "Sería bueno, pero me resultaría algo extraño", "Sentiría una carga difícil de explicar", "Sentiría culpa o incomodidad"] },
  M5: { prompt: "¿Cómo manejas tu dinero (presupuesto, control de gastos, etc.)?", optionLabels: ["De forma organizada", "Tengo una idea general", "Casi no lo controlo", "Evito mirarlo a propósito"] },
  M6: { prompt: "Cuando alguien cercano te pide dinero prestado o que se reparta un gasto, ¿qué haces?", optionLabels: ["Decido según la situación", "Me pesa, pero ayudo", "Me cuesta decir que no y termino perdiendo", "Acepto aunque me perjudique"] },
  M7: { prompt: "Cuando intentas empezar a invertir o hacer crecer tu dinero, ¿qué haces?", optionLabels: ["Me informo activamente", "Me informo con interés", "Me parece complicado y lo voy dejando", "Ni siquiera he podido empezar"] },
  M8: { prompt: "¿Cuánto peso sientes al enfrentarte a los temas de dinero?", minLabel: "Ninguno", maxLabel: "Muchísimo" },
  M9: { prompt: "Si tuvieras éxito y ganaras mucho dinero, ¿cómo crees que reaccionaría la gente a tu alrededor?", optionLabels: ["Confío en que se alegrarían de verdad por mí", "Creo que, en general, se alegrarían", "Me preocupa que sientan envidia o se alejen", "Dudo en tener éxito por miedo a que la relación se vuelva incómoda"] },
  M10: { prompt: "¿Qué piensas de tu capacidad para ganar y manejar dinero?", optionLabels: ["Creo que puedo hacerlo muy bien", "Tengo una confianza razonable en mí", "No lo tengo claro y me falta confianza", "Siento que el dinero simplemente no se me da"] },
};

export const MODULE2_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  scarcity: 10,
  ostentation: 10,
  avoidance: 10,
};

export const MODULE2_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    scarcity: { high: "결핍공포", low: "경제적 안정감" },
    ostentation: { high: "과시욕", low: "내적 기준" },
    avoidance: { high: "회피", low: "돈 문제 직면 능력" },
  },
  en: {
    scarcity: { high: "Scarcity Fear", low: "Financial Security" },
    ostentation: { high: "Ostentation", low: "Internal Standards" },
    avoidance: { high: "Avoidance", low: "Facing Money Head-On" },
  },
  es: {
    scarcity: { high: "Miedo a la escasez", low: "Seguridad económica" },
    ostentation: { high: "Afán de aparentar", low: "Criterio propio" },
    avoidance: { high: "Evitación", low: "Capacidad de afrontar el dinero" },
  },
};

export const MODULE2_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "균형형", hook: "돈에 대해 비교적 안정적이고 균형 잡힌 태도를 갖고 있습니다." },
    scarcity: { title: "결핍공포형", hook: "충분히 있어도 늘 부족하다고 느끼며, 돈이 사라질 것에 대한 불안이 큽니다." },
    ostentation: { title: "과시형", hook: "돈을 자기 가치를 증명하는 수단으로 여기고, 남에게 보이는 모습에 민감합니다." },
    avoidance: { title: "회피형", hook: "돈 문제를 마주하는 것 자체가 부담스러워 확인과 처리를 계속 미룹니다." },
    "scarcity+ostentation": { title: "불안한 과시형", hook: "부족함에 대한 불안을 과시적 소비로 덮으려는 패턴입니다." },
    "scarcity+avoidance": { title: "불안 회피형", hook: "돈에 대한 불안이 크지만, 그 불안을 마주하기보다 회피하는 쪽을 택합니다." },
    "ostentation+avoidance": { title: "겉과 속이 다른 형", hook: "보여지는 모습에는 신경 쓰지만, 실제 재정 관리는 회피하는 패턴입니다." },
    "scarcity+ostentation+avoidance": { title: "복합형", hook: "결핍에 대한 불안, 과시 욕구, 회피가 모두 강하게 얽혀 있는 패턴입니다." },
  },
  en: {
    baseline: { title: "Balanced", hook: "You have a relatively stable, balanced attitude toward money." },
    scarcity: { title: "Scarcity-Fear Type", hook: "No matter how much you have, it never feels like enough — you carry real anxiety about money disappearing." },
    ostentation: { title: "Ostentatious Type", hook: "You treat money as proof of your worth, and you're sensitive to how you look to others." },
    avoidance: { title: "Avoidant Type", hook: "Facing money matters head-on feels like too much, so you keep putting off checking and dealing with them." },
    "scarcity+ostentation": { title: "Anxious Show-Off", hook: "A pattern of covering anxiety about not having enough with showy spending." },
    "scarcity+avoidance": { title: "Anxious Avoidant", hook: "Your anxiety about money runs deep, but you'd rather avoid it than face it." },
    "ostentation+avoidance": { title: "All Show, No Substance", hook: "You care about how things look, but you avoid actually managing your finances." },
    "scarcity+ostentation+avoidance": { title: "Compound Type", hook: "Fear of scarcity, the urge to show off, and avoidance are all tangled together strongly." },
  },
  es: {
    "baseline": { title: "Relación equilibrada", hook: "Tienes una actitud bastante estable y equilibrada hacia el dinero." },
    "scarcity": { title: "Miedo a la escasez", hook: "Aunque tengas suficiente, sientes que siempre falta, y te acompaña una ansiedad real por que el dinero se acabe." },
    "ostentation": { title: "Afán de aparentar", hook: "Ves el dinero como una prueba de tu valor y eres sensible a la imagen que das a los demás." },
    "avoidance": { title: "Evitación del dinero", hook: "Enfrentarte a los temas de dinero se te hace pesado, así que vas aplazando revisarlos y resolverlos." },
    "scarcity+ostentation": { title: "Aparentar por miedo", hook: "Un patrón en el que la ansiedad por no tener suficiente se tapa con gastos llamativos." },
    "scarcity+avoidance": { title: "Ansiedad que se esquiva", hook: "Tu ansiedad por el dinero es grande, pero tiendes a esquivarla en vez de mirarla de frente." },
    "ostentation+avoidance": { title: "La fachada y las cuentas", hook: "Cuidas mucho la imagen que das, pero evitas ocuparte de tus finanzas reales." },
    "scarcity+ostentation+avoidance": { title: "Perfil combinado", hook: "El miedo a la escasez, las ganas de aparentar y la evitación se entrelazan con fuerza." },
  },
};
