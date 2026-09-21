/**
 * lib/module11Instinct.ts
 * ------------------------------------------------------------------
 * Module 11 — 섹슈얼리티/본능 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈11_본능_30문항_전문가검토용.xlsx). 3차원(자기표현 억제 개념 기반, 성적
 * 욕구/행동을 묻는 문항은 의도적으로 배제): 표현억제(E1-E10) / 즉흥성억제
 * (V1-V10) / 확신부족(S1-S10).
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE11_QUESTIONS: ModuleQuestion[] = [
  // ---- 표현억제 (Expression Suppression) — E1-E10 ----
  { id: "E1", dimension: "expressionSuppression", format: "slider", prompt: "사람들 앞에서 나를 자유롭게 표현하는 게 어려운 정도는?", options: { minLabel: "전혀 어렵지 않음", maxLabel: "매우 어려움" } },
  { id: "E2", dimension: "expressionSuppression", format: "choice", prompt: "매력적이라는 칭찬을 들으면?", options: [
    { label: "자연스럽게 받아들인다", score: 0 }, { label: "기분 좋게 받아들인다", score: 1 },
    { label: "어색해서 넘긴다", score: 2 }, { label: "부정하거나 회피하게 된다", score: 3 } ] },
  { id: "E3", dimension: "expressionSuppression", format: "choice", prompt: "사람들의 시선을 받으면?", options: [
    { label: "즐긴다", score: 0 }, { label: "크게 신경 안 쓴다", score: 1 },
    { label: "의식하게 된다", score: 2 }, { label: "불편해서 위축된다", score: 3 } ] },
  { id: "E4", dimension: "expressionSuppression", format: "choice", prompt: "춤을 추거나 몸을 자유롭게 움직여야 하는 자리에서?", options: [
    { label: "신나게 즐긴다", score: 0 }, { label: "적당히 즐긴다", score: 1 },
    { label: "눈치 보며 조심스럽다", score: 2 }, { label: "최대한 피하고 싶다", score: 3 } ] },
  { id: "E5", dimension: "expressionSuppression", format: "choice", prompt: "좋아하는 사람에게 호감을 표현할 때?", options: [
    { label: "자연스럽게 표현한다", score: 0 }, { label: "조심스럽게 표현한다", score: 1 },
    { label: "표현하기가 꽤 어렵다", score: 2 }, { label: "거의 숨기게 된다", score: 3 } ] },
  { id: "E6", dimension: "expressionSuppression", format: "choice", prompt: "자신 있는 옷차림이나 스타일을?", options: [
    { label: "자유롭게 시도한다", score: 0 }, { label: "어느 정도 시도한다", score: 1 },
    { label: "눈치를 보게 된다", score: 2 }, { label: "남들 시선이 무서워 못 한다", score: 3 } ] },
  { id: "E7", dimension: "expressionSuppression", format: "choice", prompt: "즉흥적으로 웃거나 소리 내는 것에?", options: [
    { label: "거리낌이 없다", score: 0 }, { label: "대체로 편하다", score: 1 },
    { label: "의식하게 된다", score: 2 }, { label: "최대한 절제하려 한다", score: 3 } ] },
  { id: "E8", dimension: "expressionSuppression", format: "choice", prompt: "매력을 발산하는 상상을 하면?", options: [
    { label: "자연스럽게 상상한다", score: 0 }, { label: "가끔 상상한다", score: 1 },
    { label: "어색하고 낯설다", score: 2 }, { label: "상상만 해도 민망하다", score: 3 } ] },
  { id: "E9", dimension: "expressionSuppression", format: "choice", prompt: "새로운 사람 앞에서의 첫인상은?", options: [
    { label: "있는 그대로 보여준다", score: 0 }, { label: "조금 조심스럽게 보여준다", score: 1 },
    { label: "많이 절제된 모습을 보여준다", score: 2 }, { label: "최대한 무난하게만 보이려 한다", score: 3 } ] },
  { id: "E10", dimension: "expressionSuppression", format: "choice", prompt: "나의 매력 포인트에 대해?", options: [
    { label: "잘 알고 자신 있다", score: 0 }, { label: "어느 정도 안다", score: 1 },
    { label: "잘 모르겠다", score: 2 }, { label: "매력이랄 게 있을까 싶다", score: 3 } ] },
  // ---- 즉흥성억제 (Spontaneity Suppression) — V1-V10 ----
  { id: "V1", dimension: "spontaneitySuppression", format: "slider", prompt: "몸으로 감정을 자유롭게 표현하는 게(웃음, 몸짓 등) 억제되는 정도는?", options: { minLabel: "전혀 억제되지 않음(자유롭게 표현)", maxLabel: "매우 억제됨" } },
  { id: "V2", dimension: "spontaneitySuppression", format: "choice", prompt: "신나는 음악이 나오면?", options: [
    { label: "몸이 저절로 움직인다", score: 0 }, { label: "리듬을 타는 편이다", score: 1 },
    { label: "속으로만 즐긴다", score: 2 }, { label: "가만히 있게 된다", score: 3 } ] },
  { id: "V3", dimension: "spontaneitySuppression", format: "choice", prompt: "즉흥적인 제안(갑자기 놀러가기 등)을 받으면?", options: [
    { label: "바로 좋다고 한다", score: 0 }, { label: "고민 후 따라간다", score: 1 },
    { label: "계획이 없으면 부담스럽다", score: 2 }, { label: "즉흥적인 건 거의 피한다", score: 3 } ] },
  { id: "V4", dimension: "spontaneitySuppression", format: "choice", prompt: "감정이 크게 벅차오르면?", options: [
    { label: "몸으로 자연스럽게 표현된다", score: 0 }, { label: "어느 정도 드러난다", score: 1 },
    { label: "애써 눌러 담는다", score: 2 }, { label: "티 안 나게 억누른다", score: 3 } ] },
  { id: "V5", dimension: "spontaneitySuppression", format: "choice", prompt: "나의 웃음소리나 표현 방식은?", options: [
    { label: "크고 자유롭다", score: 0 }, { label: "적당히 자연스럽다", score: 1 },
    { label: "조심스러운 편이다", score: 2 }, { label: "많이 절제돼 있다", score: 3 } ] },
  { id: "V6", dimension: "spontaneitySuppression", format: "choice", prompt: "낯선 활동(즉흥 여행, 새로운 취미 등)에?", options: [
    { label: "적극적으로 뛰어든다", score: 0 }, { label: "관심 있으면 해본다", score: 1 },
    { label: "익숙해질 시간이 필요하다", score: 2 }, { label: "익숙한 것만 고수한다", score: 3 } ] },
  { id: "V7", dimension: "spontaneitySuppression", format: "choice", prompt: "몸을 움직이는 활동(운동, 춤 등)에서 느끼는 해방감은?", options: [
    { label: "크게 느낀다", score: 0 }, { label: "어느 정도 느낀다", score: 1 },
    { label: "잘 못 느낀다", score: 2 }, { label: "오히려 긴장된다", score: 3 } ] },
  { id: "V8", dimension: "spontaneitySuppression", format: "choice", prompt: "즉흥적으로 떠오른 생각을 바로 말하거나 행동으로 옮기는 것에?", options: [
    { label: "거리낌이 없다", score: 0 }, { label: "대체로 편하다", score: 1 },
    { label: "주저하게 된다", score: 2 }, { label: "거의 못 한다", score: 3 } ] },
  { id: "V9", dimension: "spontaneitySuppression", format: "choice", prompt: "나의 에너지 상태를 표현하면?", options: [
    { label: "생동감 넘친다", score: 0 }, { label: "활기 있는 편이다", score: 1 },
    { label: "차분한 편이다", score: 2 }, { label: "에너지를 잘 안 드러낸다", score: 3 } ] },
  { id: "V10", dimension: "spontaneitySuppression", format: "choice", prompt: "하루 중 온전히 '나답게' 자유로운 순간이?", options: [
    { label: "많다", score: 0 }, { label: "어느 정도 있다", score: 1 },
    { label: "드물다", score: 2 }, { label: "거의 없다고 느낀다", score: 3 } ] },
  // ---- 확신부족 (Confidence Lack) — S1-S10 ----
  { id: "S1", dimension: "confidenceLack", format: "slider", prompt: "스스로의 매력에 대한 확신이 부족하다고 느끼는 정도는?", options: { minLabel: "전혀 부족하지 않음(확신 있음)", maxLabel: "매우 부족함" } },
  { id: "S2", dimension: "confidenceLack", format: "choice", prompt: "거울 속 내 모습을 보면?", options: [
    { label: "만족스럽다", score: 0 }, { label: "대체로 괜찮다", score: 1 },
    { label: "아쉬운 점이 먼저 보인다", score: 2 }, { label: "자신감이 잘 안 생긴다", score: 3 } ] },
  { id: "S3", dimension: "confidenceLack", format: "choice", prompt: "다른 사람의 반응(호감, 관심 등)이 없으면?", options: [
    { label: "내 매력과 무관하다고 느낀다", score: 0 }, { label: "크게 신경 안 쓴다", score: 1 },
    { label: "스스로를 의심하게 된다", score: 2 }, { label: "내가 매력 없나 싶어진다", score: 3 } ] },
  { id: "S4", dimension: "confidenceLack", format: "choice", prompt: "매력적인 사람을 보면?", options: [
    { label: "자극이 되고 좋다", score: 0 }, { label: "멋있다고 생각한다", score: 1 },
    { label: "나와 비교하게 된다", score: 2 }, { label: "위축되고 작아지는 느낌이다", score: 3 } ] },
  { id: "S5", dimension: "confidenceLack", format: "choice", prompt: "누군가 나에게 호감을 보이면?", options: [
    { label: "자연스럽게 받아들인다", score: 0 }, { label: "기분 좋게 받아들인다", score: 1 },
    { label: "의심하거나 의아해한다", score: 2 }, { label: "믿기지 않아 부정하게 된다", score: 3 } ] },
  { id: "S6", dimension: "confidenceLack", format: "choice", prompt: "나의 매력을 스스로 표현해야 한다면?", options: [
    { label: "쉽게 말할 수 있다", score: 0 }, { label: "어느 정도 말할 수 있다", score: 1 },
    { label: "쑥스럽고 어렵다", score: 2 }, { label: "거의 못 하겠다", score: 3 } ] },
  { id: "S7", dimension: "confidenceLack", format: "choice", prompt: "연애나 관계에서 나의 매력에 대한 확신은?", options: [
    { label: "확고하다", score: 0 }, { label: "어느 정도 있다", score: 1 },
    { label: "자주 흔들린다", score: 2 }, { label: "거의 없다", score: 3 } ] },
  { id: "S8", dimension: "confidenceLack", format: "choice", prompt: "셀카나 내 모습이 담긴 사진을 보면?", options: [
    { label: "만족스럽게 본다", score: 0 }, { label: "무난하게 본다", score: 1 },
    { label: "부족한 점부터 찾는다", score: 2 }, { label: "잘 못 본다", score: 3 } ] },
  { id: "S9", dimension: "confidenceLack", format: "choice", prompt: "매력적이라는 말을 들으면 속으로?", options: [
    { label: "그렇게 느낀다", score: 0 }, { label: "고맙지만 그런가 싶다", score: 1 },
    { label: "믿기지 않는다", score: 2 }, { label: "빈말이라고 생각한다", score: 3 } ] },
  { id: "S10", dimension: "confidenceLack", format: "choice", prompt: "있는 그대로의 나에 대해?", options: [
    { label: "매력 있다고 느낀다", score: 0 }, { label: "괜찮다고 느낀다", score: 1 },
    { label: "부족하다고 느낄 때가 많다", score: 2 }, { label: "매력을 잘 못 느낀다", score: 3 } ] },
];

// Display-text-only translations of MODULE11_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE11_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  E1: { prompt: "How hard is it for you to express yourself freely in front of people?", minLabel: "Not hard at all", maxLabel: "Very hard" },
  E2: { prompt: "When someone compliments you as attractive?", optionLabels: ["I take it in naturally", "I take it in happily", "It's awkward, so I brush it off", "I deny it or dodge it"] },
  E3: { prompt: "When you're the center of attention?", optionLabels: ["I enjoy it", "I don't think much of it", "I become self-conscious", "It's uncomfortable and I shrink back"] },
  E4: { prompt: "In a setting where you're expected to dance or move freely?", optionLabels: ["I have a great time with it", "I enjoy it reasonably", "I'm cautious and watch how others react", "I want to avoid it as much as possible"] },
  E5: { prompt: "When expressing interest in someone you like?", optionLabels: ["I express it naturally", "I express it carefully", "It's quite hard to express", "I mostly end up hiding it"] },
  E6: { prompt: "When it comes to trying a bold outfit or style?", optionLabels: ["I try it freely", "I try it to some degree", "I end up worrying what others think", "I can't do it because I'm afraid of others' eyes"] },
  E7: { prompt: "How comfortable are you laughing or making sounds spontaneously?", optionLabels: ["Completely uninhibited", "Mostly comfortable", "I become self-conscious", "I try to hold it back as much as possible"] },
  E8: { prompt: "When you imagine yourself radiating charm?", optionLabels: ["I imagine it naturally", "I imagine it occasionally", "It feels awkward and unfamiliar", "Even imagining it is embarrassing"] },
  E9: { prompt: "What's your first impression like in front of someone new?", optionLabels: ["I show myself exactly as I am", "I show myself a bit cautiously", "I show a heavily restrained version of myself", "I try my best to just seem inoffensive"] },
  E10: { prompt: "How do you feel about your own charm points?", optionLabels: ["I know them well and feel confident", "I know them to some degree", "I'm not really sure", "I wonder if I even have any"] },
  V1: { prompt: "How suppressed is your ability to freely express emotion through your body (laughter, gestures, etc.)?", minLabel: "Not suppressed at all (I express freely)", maxLabel: "Very suppressed" },
  V2: { prompt: "When exciting music comes on?", optionLabels: ["My body moves on its own", "I tend to get into the rhythm", "I enjoy it only internally", "I end up staying still"] },
  V3: { prompt: "When you get a spontaneous invitation (a sudden trip out, etc.)?", optionLabels: ["I say yes right away", "I go along after thinking it over", "It feels like a burden without a plan", "I mostly avoid spontaneous things"] },
  V4: { prompt: "When an emotion overwhelms you?", optionLabels: ["It comes out naturally through my body", "It shows to some degree", "I make an effort to hold it in", "I suppress it without a trace"] },
  V5: { prompt: "What's your laugh or way of expressing yourself like?", optionLabels: ["Big and free", "Reasonably natural", "On the cautious side", "Heavily restrained"] },
  V6: { prompt: "How do you approach unfamiliar activities (a spontaneous trip, a new hobby, etc.)?", optionLabels: ["I dive in actively", "I try it if I'm interested", "I need time to get used to it", "I only stick to what I'm familiar with"] },
  V7: { prompt: "How much freedom do you feel through physical activities (exercise, dance, etc.)?", optionLabels: ["A lot", "Some", "Not much", "I actually feel more tense"] },
  V8: { prompt: "How comfortable are you saying or acting on a sudden thought right away?", optionLabels: ["Completely uninhibited", "Mostly comfortable", "I end up hesitating", "I almost can't do it"] },
  V9: { prompt: "How would you describe your energy level?", optionLabels: ["Overflowing with liveliness", "Fairly energetic", "On the calm side", "I don't show my energy much"] },
  V10: { prompt: "How many moments in your day do you feel fully, freely \"yourself\"?", optionLabels: ["Many", "Some", "Rare", "I feel like I have almost none"] },
  S1: { prompt: "How much do you feel you lack confidence in your own appeal?", minLabel: "Not lacking at all (I feel confident)", maxLabel: "Severely lacking" },
  S2: { prompt: "When you see yourself in the mirror?", optionLabels: ["I'm satisfied", "Generally fine", "I notice the flaws first", "I have trouble feeling confident"] },
  S3: { prompt: "When you don't get a reaction from others (interest, attraction, etc.)?", optionLabels: ["I feel it has nothing to do with my appeal", "I don't think much of it", "I start to doubt myself", "I start to wonder if I'm just not attractive"] },
  S4: { prompt: "When you see an attractive person?", optionLabels: ["It's inspiring, and I feel good about it", "I think they look great", "I end up comparing myself to them", "I feel small and withdrawn"] },
  S5: { prompt: "When someone shows interest in you?", optionLabels: ["I accept it naturally", "I accept it happily", "I doubt it or find it puzzling", "I can't believe it and end up denying it"] },
  S6: { prompt: "If you had to describe your own appeal?", optionLabels: ["I can say it easily", "I can say it to some degree", "It's embarrassing and hard", "I almost can't do it"] },
  S7: { prompt: "How confident are you in your appeal within dating or relationships?", optionLabels: ["Very solid", "Fairly confident", "It often wavers", "Almost no confidence"] },
  S8: { prompt: "When you look at a selfie or a photo of yourself?", optionLabels: ["I'm satisfied with it", "I take it in stride", "I look for flaws first", "I have trouble looking at it"] },
  S9: { prompt: "When someone calls you attractive, what do you think inside?", optionLabels: ["I feel that it's true", "I'm grateful, but wonder if it's really so", "I can't quite believe it", "I think they're just being polite"] },
  S10: { prompt: "How do you feel about yourself just as you are?", optionLabels: ["I feel I have real appeal", "I feel fine about myself", "I often feel I'm lacking", "I struggle to feel any appeal in myself"] },
};

export const MODULE11_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  E1: { prompt: "¿Cuánto te cuesta expresarte con libertad delante de los demás?", minLabel: "Nada", maxLabel: "Muchísimo" },
  E2: { prompt: "Cuando alguien te hace un cumplido sobre tu atractivo, ¿cómo reaccionas?", optionLabels: ["Lo recibo con naturalidad", "Lo recibo con alegría", "Me incomoda, así que lo dejo pasar", "Lo niego o lo esquivo"] },
  E3: { prompt: "Cuando eres el centro de atención, ¿qué sientes?", optionLabels: ["Lo disfruto", "No le doy mayor importancia", "Me vuelvo muy consciente de cómo me ven", "Me incomoda y me encojo"] },
  E4: { prompt: "En una situación en la que se espera que bailes o te muevas con libertad, ¿qué haces?", optionLabels: ["Lo disfruto muchísimo", "Lo disfruto bastante", "Voy con cautela y observo cómo reaccionan los demás", "Quiero evitarlo en la medida de lo posible"] },
  E5: { prompt: "Cuando le muestras interés a alguien que te gusta, ¿cómo lo haces?", optionLabels: ["Lo expreso con naturalidad", "Lo expreso con cautela", "Me cuesta bastante expresarlo", "Casi siempre acabo ocultándolo"] },
  E6: { prompt: "¿Con cuánta libertad te atreves a probar un estilo o un atuendo atrevido?", optionLabels: ["Lo pruebo con libertad", "Lo pruebo hasta cierto punto", "Acabo preocupándome por lo que pensarán los demás", "No puedo hacerlo por miedo a las miradas ajenas"] },
  E7: { prompt: "¿Con cuánta naturalidad te ríes o haces ruidos de forma espontánea?", optionLabels: ["Sin ninguna inhibición", "Por lo general, con bastante naturalidad", "Me vuelvo muy consciente de mí", "Intento contenerme todo lo posible"] },
  E8: { prompt: "Cuando te imaginas irradiando encanto, ¿qué sientes?", optionLabels: ["Lo imagino con naturalidad", "Lo imagino de vez en cuando", "Me resulta raro y poco familiar", "Hasta imaginarlo me da vergüenza"] },
  E9: { prompt: "¿Cómo es tu primera impresión ante alguien nuevo?", optionLabels: ["Me muestro tal como soy", "Me muestro con algo de cautela", "Muestro una versión muy contenida de mí", "Intento, sobre todo, no llamar la atención"] },
  E10: { prompt: "¿Qué piensas de tus propios puntos fuertes de atractivo?", optionLabels: ["Los conozco bien y me dan seguridad", "Los conozco hasta cierto punto", "La verdad es que no lo tengo claro", "Me pregunto si tengo alguno"] },
  V1: { prompt: "¿Cuánto te cuesta expresar emociones libremente con el cuerpo (risas, gestos, etc.)?", minLabel: "Nada (me expreso con libertad)", maxLabel: "Muchísimo" },
  V2: { prompt: "Cuando suena una música animada, ¿qué haces?", optionLabels: ["Mi cuerpo se mueve solo", "Tiendo a seguir el ritmo", "Lo disfruto solo por dentro", "Acabo sin moverme"] },
  V3: { prompt: "Cuando recibes una invitación improvisada (una salida repentina, etc.), ¿qué haces?", optionLabels: ["Digo que sí enseguida", "Voy después de pensármelo", "Sin un plan, se me hace pesado", "Casi siempre evito lo improvisado"] },
  V4: { prompt: "Cuando una emoción te desborda, ¿qué pasa?", optionLabels: ["Sale con naturalidad a través del cuerpo", "Se nota hasta cierto punto", "Me esfuerzo por contenerla", "La reprimo sin que se note"] },
  V5: { prompt: "¿Cómo es tu risa o tu forma de expresarte?", optionLabels: ["Amplia y libre", "Bastante natural", "Más bien cautelosa", "Muy contenida"] },
  V6: { prompt: "¿Cómo te acercas a las actividades poco familiares (un viaje improvisado, una afición nueva, etc.)?", optionLabels: ["Me lanzo con ganas", "Lo intento si me interesa", "Necesito tiempo para acostumbrarme", "Me quedo solo con lo que ya conozco"] },
  V7: { prompt: "¿Cuánta libertad sientes con la actividad física (deporte, baile, etc.)?", optionLabels: ["Mucha", "Algo", "No mucha", "En realidad me genera más tensión"] },
  V8: { prompt: "¿Con cuánta naturalidad dices o haces algo en cuanto se te ocurre?", optionLabels: ["Sin ninguna inhibición", "Por lo general, con bastante naturalidad", "Acabo dudando", "Casi no soy capaz"] },
  V9: { prompt: "¿Cómo describirías tu nivel de energía?", optionLabels: ["Desbordante de vitalidad", "Con bastante energía", "De ritmo más bien tranquilo", "No suelo mostrar mi energía"] },
  V10: { prompt: "¿En cuántos momentos de tu día sientes que eres plena y libremente «tú»?", optionLabels: ["En muchos", "En algunos", "En pocos", "Siento que casi en ninguno"] },
  S1: { prompt: "¿Cuánta falta de confianza sientes en tu propio atractivo?", minLabel: "Ninguna (siento seguridad)", maxLabel: "Muchísima" },
  S2: { prompt: "Cuando te ves en el espejo, ¿qué piensas?", optionLabels: ["Me gusta lo que veo", "En general, bien", "Me fijo primero en los defectos", "Me cuesta sentir seguridad"] },
  S3: { prompt: "Cuando los demás no reaccionan (con interés, atracción, etc.), ¿qué piensas?", optionLabels: ["Siento que no tiene nada que ver con mi atractivo", "No le doy mayor importancia", "Empiezo a dudar de mí", "Empiezo a preguntarme si simplemente no tengo atractivo"] },
  S4: { prompt: "Cuando ves a una persona atractiva, ¿qué sientes?", optionLabels: ["Me inspira y me siento bien", "Pienso que se ve genial", "Acabo comparándome con ella", "Siento que me achico por dentro"] },
  S5: { prompt: "Cuando alguien muestra interés por ti, ¿qué haces?", optionLabels: ["Lo acepto con naturalidad", "Lo acepto con alegría", "Lo dudo o me resulta extraño", "No puedo creerlo y acabo negándolo"] },
  S6: { prompt: "Si tuvieras que describir tu propio atractivo, ¿cómo te resultaría?", optionLabels: ["Puedo hacerlo con facilidad", "Puedo hacerlo hasta cierto punto", "Me da vergüenza y me cuesta", "Casi no soy capaz"] },
  S7: { prompt: "¿Cuánta seguridad tienes en tu atractivo dentro del amor o de las relaciones?", optionLabels: ["Muy firme", "Bastante", "A menudo se tambalea", "Casi ninguna"] },
  S8: { prompt: "Cuando ves un selfi o una foto tuya, ¿qué sientes?", optionLabels: ["Me gusta cómo salgo", "La miro con tranquilidad", "Busco primero los defectos", "Me cuesta mirarla"] },
  S9: { prompt: "Cuando alguien te dice que tienes atractivo, ¿qué piensas por dentro?", optionLabels: ["Siento que es verdad", "Lo agradezco, pero me pregunto si será cierto", "No logro creérmelo", "Pienso que lo dice por cortesía"] },
  S10: { prompt: "¿Qué sientes hacia ti tal como eres?", optionLabels: ["Siento que tengo un atractivo real", "Me siento bien conmigo", "Muchas veces siento que me falta algo", "Me cuesta sentir algún atractivo en mí"] },
};

export const MODULE11_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  expressionSuppression: 10,
  spontaneitySuppression: 10,
  confidenceLack: 10,
};

export const MODULE11_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    expressionSuppression: { high: "표현억제", low: "자연스러운 표현" },
    spontaneitySuppression: { high: "즉흥성억제", low: "자유로운 생동감" },
    confidenceLack: { high: "확신부족", low: "매력에 대한 확신" },
  },
  en: {
    expressionSuppression: { high: "Expression Suppression", low: "Natural Expression" },
    spontaneitySuppression: { high: "Suppressed Spontaneity", low: "Free-Flowing Liveliness" },
    confidenceLack: { high: "Lack of Confidence", low: "Confidence in Your Appeal" },
  },
  es: {
    expressionSuppression: { high: "Expresión contenida", low: "Expresión natural" },
    spontaneitySuppression: { high: "Espontaneidad frenada", low: "Vitalidad libre" },
    confidenceLack: { high: "Poca seguridad", low: "Seguridad en tu atractivo" },
  },
};

export const MODULE11_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "자연스러운 표현형", hook: "나를 드러내는 데 있어 억제도, 확신 부족도 뚜렷하지 않은 비교적 자유로운 상태입니다." },
    expressionSuppression: { title: "표현억제형", hook: "사람들 앞에서 나를 자유롭게 드러내는 게 유독 어렵게 느껴집니다." },
    spontaneitySuppression: { title: "즉흥성억제형", hook: "몸으로 감정을 표현하거나 즉흥적으로 움직이는 게 많이 억제되어 있습니다." },
    confidenceLack: { title: "확신부족형", hook: "스스로의 매력에 대한 확신이 부족해, 좋은 반응을 받아도 잘 믿지 못합니다." },
    "expressionSuppression+spontaneitySuppression": { title: "억눌린 생동감형", hook: "표현도 즉흥성도 함께 억제되어 있어, 자기다운 생동감을 드러낼 틈이 적습니다." },
    "expressionSuppression+confidenceLack": { title: "위축된 자기표현형", hook: "나를 드러내는 것도 어렵고, 스스로에 대한 확신도 부족해 이중으로 위축되어 있습니다." },
    "spontaneitySuppression+confidenceLack": { title: "조심스러운 확신부족형", hook: "즉흥적인 생동감은 억눌려 있고, 스스로의 매력에 대한 믿음도 흔들립니다." },
    "expressionSuppression+spontaneitySuppression+confidenceLack": { title: "억눌린 본능형", hook: "표현, 즉흥성, 자기확신 세 가지 모두가 억제된, 나다움을 드러내기 어려운 상태입니다." },
  },
  en: {
    baseline: { title: "Naturally Expressive", hook: "Neither suppression nor a lack of confidence stands out clearly when it comes to showing who you are — a relatively free state." },
    expressionSuppression: { title: "Expression-Suppressed Type", hook: "Showing yourself freely in front of others feels especially hard." },
    spontaneitySuppression: { title: "Spontaneity-Suppressed Type", hook: "Expressing emotion through your body or moving on impulse is strongly held back." },
    confidenceLack: { title: "Confidence-Lacking Type", hook: "You lack confidence in your own appeal, so even good reactions are hard to fully believe." },
    "expressionSuppression+spontaneitySuppression": { title: "Stifled Liveliness", hook: "Both expression and spontaneity are suppressed together, leaving little room for your natural liveliness to show." },
    "expressionSuppression+confidenceLack": { title: "Withdrawn Self-Expression", hook: "Showing yourself is hard, and you lack confidence in yourself too — doubly withdrawn." },
    "spontaneitySuppression+confidenceLack": { title: "Cautious and Unsure", hook: "Your spontaneous liveliness is held back, and your belief in your own appeal wavers too." },
    "expressionSuppression+spontaneitySuppression+confidenceLack": { title: "Suppressed Instinct", hook: "Expression, spontaneity, and self-confidence are all suppressed — a state where it's hard to show who you really are." },
  },
  es: {
    baseline: { title: "Expresión natural", hook: "A la hora de mostrar quién eres, ni la contención ni la falta de confianza destacan con claridad: te mueves con relativa libertad." },
    expressionSuppression: { title: "Expresión contenida", hook: "Mostrarte con libertad delante de los demás te resulta especialmente difícil." },
    spontaneitySuppression: { title: "Espontaneidad frenada", hook: "Expresar emociones con el cuerpo o moverte por impulso es algo que te cuesta mucho." },
    confidenceLack: { title: "Poca seguridad en tu atractivo", hook: "Te falta confianza en tu propio atractivo, así que incluso las buenas reacciones cuesta creérselas del todo." },
    "expressionSuppression+spontaneitySuppression": { title: "Vitalidad contenida", hook: "La expresión y la espontaneidad están frenadas a la vez, y queda poco espacio para que se vea tu vitalidad natural." },
    "expressionSuppression+confidenceLack": { title: "Autoexpresión encogida", hook: "Mostrarte es difícil y, además, te falta confianza en ti: es un doble encogimiento." },
    "spontaneitySuppression+confidenceLack": { title: "Cautela e inseguridad", hook: "Tu vitalidad espontánea está frenada y tu confianza en tu propio atractivo también se tambalea." },
    "expressionSuppression+spontaneitySuppression+confidenceLack": { title: "Instinto contenido", hook: "La expresión, la espontaneidad y la seguridad en ti están frenadas las tres: te cuesta mostrar cómo eres en realidad." },
  },
};
