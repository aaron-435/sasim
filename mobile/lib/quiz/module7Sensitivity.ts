/**
 * lib/module7Sensitivity.ts
 * ------------------------------------------------------------------
 * Module 7 — 예민함/기질 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈7_예민함_30문항_전문가검토용.xlsx). 3차원(HSP 척도 기반): 자극과부하
 * (X1-X10) / 심미적민감성(A1-A10) / 낮은감각역치(L1-L10). 셋 다 높은 경우가
 * 학계 정립된 고감각민감성(HSP) 3요인 구조와 대응한다.
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE7_QUESTIONS: ModuleQuestion[] = [
  // ---- 자극과부하 (Overstimulation) — X1-X10 ----
  { id: "X1", dimension: "overstimulation", format: "slider", prompt: "한 번에 여러 가지가 몰리면 압도되는 정도는?", options: { minLabel: "전혀 압도되지 않음", maxLabel: "완전히 압도됨" } },
  { id: "X2", dimension: "overstimulation", format: "choice", prompt: "해야 할 일이 동시에 여러 개 생기면?", options: [
    { label: "차근차근 처리한다", score: 0 }, { label: "약간 정신없지만 해낸다", score: 1 },
    { label: "머릿속이 금방 복잡해진다", score: 2 }, { label: "압도돼서 아무것도 손에 안 잡힌다", score: 3 } ] },
  { id: "X3", dimension: "overstimulation", format: "choice", prompt: "시끄럽고 붐비는 장소에 오래 있으면?", options: [
    { label: "괜찮은 편이다", score: 0 }, { label: "조금 피곤해진다", score: 1 },
    { label: "빨리 지친다", score: 2 }, { label: "빨리 나가고 싶어진다", score: 3 } ] },
  { id: "X4", dimension: "overstimulation", format: "choice", prompt: "마감이나 시간 압박이 있으면?", options: [
    { label: "집중력이 오히려 올라간다", score: 0 }, { label: "적당히 긴장된다", score: 1 },
    { label: "쉽게 초조해진다", score: 2 }, { label: "머릿속이 하얘질 때가 있다", score: 3 } ] },
  { id: "X5", dimension: "overstimulation", format: "choice", prompt: "갑작스러운 일정 변경이 생기면?", options: [
    { label: "유연하게 받아들인다", score: 0 }, { label: "약간 당황하지만 적응한다", score: 1 },
    { label: "적응하는 데 시간이 걸린다", score: 2 }, { label: "하루 전체 리듬이 흔들린다", score: 3 } ] },
  { id: "X6", dimension: "overstimulation", format: "choice", prompt: "누군가 나를 지켜보면서 일을 시키면?", options: [
    { label: "평소와 다르지 않다", score: 0 }, { label: "약간 신경 쓰인다", score: 1 },
    { label: "긴장돼서 실수가 잦아진다", score: 2 }, { label: "평소 실력이 잘 안 나온다", score: 3 } ] },
  { id: "X7", dimension: "overstimulation", format: "choice", prompt: "하루 동안 사람을 많이 만나고 나면?", options: [
    { label: "에너지가 남아있다", score: 0 }, { label: "적당히 피곤하다", score: 1 },
    { label: "혼자만의 시간이 꼭 필요하다", score: 2 }, { label: "완전히 소진된 느낌이다", score: 3 } ] },
  { id: "X8", dimension: "overstimulation", format: "choice", prompt: "새로운 환경(이사, 이직 등)에 적응하는 속도는?", options: [
    { label: "빠르게 적응한다", score: 0 }, { label: "무난하게 적응한다", score: 1 },
    { label: "시간이 꽤 걸린다", score: 2 }, { label: "적응하는 동안 스트레스가 크다", score: 3 } ] },
  { id: "X9", dimension: "overstimulation", format: "choice", prompt: "자극이 많은 하루(시험, 발표, 여행 등)를 보내면?", options: [
    { label: "다음 날도 괜찮다", score: 0 }, { label: "하루 정도 쉬면 회복된다", score: 1 },
    { label: "며칠은 여운이 남는다", score: 2 }, { label: "회복하는 데 꽤 오래 걸린다", score: 3 } ] },
  { id: "X10", dimension: "overstimulation", format: "choice", prompt: "여러 사람이 동시에 말을 걸면?", options: [
    { label: "무리 없이 대응한다", score: 0 }, { label: "조금 버겁다", score: 1 },
    { label: "누구 말부터 들어야 할지 혼란스럽다", score: 2 }, { label: "머리가 멍해지며 아무 반응을 못 한다", score: 3 } ] },
  // ---- 심미적민감성 (Aesthetic Sensitivity) — A1-A10 ----
  { id: "A1", dimension: "aestheticSensitivity", format: "slider", prompt: "음악·영화·풍경 등에서 감정이 깊이 움직이는 정도는?", options: { minLabel: "거의 움직이지 않음", maxLabel: "매우 깊이 움직임(벅차오름)" } },
  { id: "A2", dimension: "aestheticSensitivity", format: "choice", prompt: "좋아하는 음악을 들으면?", options: [
    { label: "그냥 편안하게 듣는다", score: 0 }, { label: "기분이 좋아진다", score: 1 },
    { label: "감정이 꽤 크게 움직인다", score: 2 }, { label: "소름 돋거나 눈물이 날 때가 있다", score: 3 } ] },
  { id: "A3", dimension: "aestheticSensitivity", format: "choice", prompt: "미술관이나 전시를 보면?", options: [
    { label: "적당히 감상하고 지나간다", score: 0 }, { label: "인상 깊은 작품 몇 개는 오래 본다", score: 1 },
    { label: "작품 앞에서 한참 머무를 때가 많다", score: 2 }, { label: "압도되는 느낌을 자주 받는다", score: 3 } ] },
  { id: "A4", dimension: "aestheticSensitivity", format: "choice", prompt: "자연의 풍경(노을, 바다 등)을 보면?", options: [
    { label: "예쁘다고 생각하고 넘어간다", score: 0 }, { label: "잠시 감상한다", score: 1 },
    { label: "마음이 깊이 움직인다", score: 2 }, { label: "벅차오르거나 눈물이 날 때가 있다", score: 3 } ] },
  { id: "A5", dimension: "aestheticSensitivity", format: "choice", prompt: "다른 사람의 예술적 표현(글, 그림 등)에?", options: [
    { label: "무난하게 반응한다", score: 0 }, { label: "좋으면 칭찬한다", score: 1 },
    { label: "섬세한 부분까지 알아챈다", score: 2 }, { label: "작은 디테일에도 깊이 감동한다", score: 3 } ] },
  { id: "A6", dimension: "aestheticSensitivity", format: "choice", prompt: "영화나 드라마를 볼 때?", options: [
    { label: "재미 위주로 본다", score: 0 }, { label: "몰입해서 본다", score: 1 },
    { label: "감정이 크게 이입된다", score: 2 }, { label: "며칠씩 여운이 남는다", score: 3 } ] },
  { id: "A7", dimension: "aestheticSensitivity", format: "choice", prompt: "미세한 색감이나 질감의 차이를?", options: [
    { label: "잘 구분하지 못한다", score: 0 }, { label: "가끔 알아챈다", score: 1 },
    { label: "곧잘 알아챈다", score: 2 }, { label: "남들이 못 느끼는 차이까지 알아챈다", score: 3 } ] },
  { id: "A8", dimension: "aestheticSensitivity", format: "choice", prompt: "공간의 분위기(조명, 인테리어 등)가?", options: [
    { label: "크게 신경 안 쓰인다", score: 0 }, { label: "어느 정도 신경 쓰인다", score: 1 },
    { label: "기분에 꽤 영향을 준다", score: 2 }, { label: "분위기에 따라 컨디션이 완전히 달라진다", score: 3 } ] },
  { id: "A9", dimension: "aestheticSensitivity", format: "choice", prompt: "좋아하는 것(향, 음식, 소리 등)을 접하면?", options: [
    { label: "무난하게 즐긴다", score: 0 }, { label: "기분 좋게 즐긴다", score: 1 },
    { label: "온전히 몰입해서 즐긴다", score: 2 }, { label: "행복감이 벅차오를 정도로 즐긴다", score: 3 } ] },
  { id: "A10", dimension: "aestheticSensitivity", format: "choice", prompt: "슬픈 이야기(책, 뉴스 등)를 접하면?", options: [
    { label: "담담하게 받아들인다", score: 0 }, { label: "안타까움을 느낀다", score: 1 },
    { label: "마음이 무거워진다", score: 2 }, { label: "며칠간 계속 생각나고 마음이 아프다", score: 3 } ] },
  // ---- 낮은감각역치 (Low Sensory Threshold) — L1-L10 ----
  { id: "L1", dimension: "lowSensoryThreshold", format: "slider", prompt: "밝은 빛·큰 소리·강한 냄새 등에 불편함을 느끼는 정도는?", options: { minLabel: "전혀 불편하지 않음", maxLabel: "매우 불편함" } },
  { id: "L2", dimension: "lowSensoryThreshold", format: "choice", prompt: "시끄러운 소음(공사장, 확성기 등)을 들으면?", options: [
    { label: "별로 신경 안 쓰인다", score: 0 }, { label: "약간 거슬린다", score: 1 },
    { label: "꽤 불편하다", score: 2 }, { label: "귀를 막고 싶을 정도로 괴롭다", score: 3 } ] },
  { id: "L3", dimension: "lowSensoryThreshold", format: "choice", prompt: "옷의 태그나 재질이 까끌거리면?", options: [
    { label: "거의 못 느낀다", score: 0 }, { label: "가끔 신경 쓰인다", score: 1 },
    { label: "계속 신경 쓰인다", score: 2 }, { label: "바로 잘라내거나 갈아입어야 한다", score: 3 } ] },
  { id: "L4", dimension: "lowSensoryThreshold", format: "choice", prompt: "강한 향수나 냄새를 맡으면?", options: [
    { label: "괜찮은 편이다", score: 0 }, { label: "약간 거슬린다", score: 1 },
    { label: "두통이 올 때가 있다", score: 2 }, { label: "속이 안 좋아지거나 자리를 피하게 된다", score: 3 } ] },
  { id: "L5", dimension: "lowSensoryThreshold", format: "choice", prompt: "밝은 조명이나 화면 빛에?", options: [
    { label: "잘 적응한다", score: 0 }, { label: "약간 눈이 피로하다", score: 1 },
    { label: "쉽게 눈이 부시다", score: 2 }, { label: "두통으로 이어질 때가 있다", score: 3 } ] },
  { id: "L6", dimension: "lowSensoryThreshold", format: "choice", prompt: "배가 고프거나 카페인을 많이 섭취하면?", options: [
    { label: "몸 상태에 큰 변화가 없다", score: 0 }, { label: "약간의 변화를 느낀다", score: 1 },
    { label: "예민해지거나 불안해진다", score: 2 }, { label: "몸이 확연히 반응한다(심장이 빨리 뛰는 등)", score: 3 } ] },
  { id: "L7", dimension: "lowSensoryThreshold", format: "choice", prompt: "여러 소리가 동시에 들리는 환경에서 집중은?", options: [
    { label: "잘 된다", score: 0 }, { label: "그럭저럭 된다", score: 1 },
    { label: "쉽게 흐트러진다", score: 2 }, { label: "거의 불가능하다", score: 3 } ] },
  { id: "L8", dimension: "lowSensoryThreshold", format: "choice", prompt: "온도 변화(너무 덥거나 추운 곳)에?", options: [
    { label: "잘 적응한다", score: 0 }, { label: "약간 불편해한다", score: 1 },
    { label: "꽤 예민하게 반응한다", score: 2 }, { label: "몸 컨디션 전체에 영향을 준다", score: 3 } ] },
  { id: "L9", dimension: "lowSensoryThreshold", format: "choice", prompt: "피부에 닿는 자극(햇빛, 바람 등)에?", options: [
    { label: "잘 못 느낀다", score: 0 }, { label: "가볍게 느낀다", score: 1 },
    { label: "예민하게 느낀다", score: 2 }, { label: "쉽게 자극받고 불편해진다", score: 3 } ] },
  { id: "L10", dimension: "lowSensoryThreshold", format: "choice", prompt: "통증(주사, 작은 상처 등)에 대한 민감도는?", options: [
    { label: "둔감한 편이다", score: 0 }, { label: "보통이다", score: 1 },
    { label: "예민한 편이다", score: 2 }, { label: "남들보다 훨씬 강하게 느낀다", score: 3 } ] },
];

// Display-text-only translations of MODULE7_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE7_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  X1: { prompt: "How overwhelmed do you get when several things pile up at once?", minLabel: "Not overwhelmed at all", maxLabel: "Completely overwhelmed" },
  X2: { prompt: "When several things need doing at the same time?", optionLabels: ["I handle them one by one", "It's a bit hectic, but I manage", "My mind gets tangled up quickly", "I get so overwhelmed I can't focus on anything"] },
  X3: { prompt: "When you spend a long time in a loud, crowded place?", optionLabels: ["I'm fine", "I get a little tired", "I get tired quickly", "I want to leave as soon as possible"] },
  X4: { prompt: "Under a deadline or time pressure?", optionLabels: ["My focus actually sharpens", "I get reasonably tense", "I get anxious easily", "There are times my mind goes blank"] },
  X5: { prompt: "When your schedule suddenly changes?", optionLabels: ["I adapt flexibly", "I'm a bit thrown off, but I adjust", "It takes me time to adjust", "My whole day's rhythm gets thrown off"] },
  X6: { prompt: "When someone is watching you while you work?", optionLabels: ["No different from usual", "It bothers me a little", "I get tense and make more mistakes", "I can't perform at my usual level"] },
  X7: { prompt: "After meeting a lot of people in one day?", optionLabels: ["I still have energy left", "I'm reasonably tired", "I really need some time alone", "I feel completely drained"] },
  X8: { prompt: "How quickly do you adjust to a new environment (moving, a new job, etc.)?", optionLabels: ["I adjust quickly", "I adjust reasonably well", "It takes quite a while", "Adjusting comes with a lot of stress"] },
  X9: { prompt: "After a day full of stimulation (an exam, a presentation, a trip, etc.)?", optionLabels: ["I'm still fine the next day", "A day of rest and I'm recovered", "It lingers for a few days", "It takes quite a while to recover"] },
  X10: { prompt: "When several people talk to you at once?", optionLabels: ["I handle it without trouble", "It's a bit much", "I get confused about who to listen to first", "My mind goes blank and I can't respond at all"] },
  A1: { prompt: "How deeply do music, movies, or scenery move you emotionally?", minLabel: "Barely moves me", maxLabel: "Moves me very deeply (overwhelming)" },
  A2: { prompt: "When you listen to music you love?", optionLabels: ["I just listen comfortably", "It puts me in a good mood", "I get moved fairly deeply", "There are times I get chills or tear up"] },
  A3: { prompt: "When visiting an art museum or exhibition?", optionLabels: ["I take it in casually and move on", "I spend a while on a few pieces that stand out", "I often linger in front of a piece for a long time", "I often feel overwhelmed by it"] },
  A4: { prompt: "When you see a natural landscape (a sunset, the sea, etc.)?", optionLabels: ["I think it's pretty and move on", "I take a moment to appreciate it", "It moves me deeply", "There are times I feel overcome or tear up"] },
  A5: { prompt: "How do you respond to someone else's artistic expression (writing, painting, etc.)?", optionLabels: ["I respond casually", "I compliment it if I like it", "I notice even the delicate details", "I'm deeply moved even by small details"] },
  A6: { prompt: "When watching a movie or drama?", optionLabels: ["I watch it mainly for entertainment", "I get absorbed in it", "I empathize strongly with the emotions", "It lingers with me for days"] },
  A7: { prompt: "How well do you notice subtle differences in color or texture?", optionLabels: ["I can't really tell them apart", "I notice occasionally", "I notice fairly well", "I notice differences others can't even perceive"] },
  A8: { prompt: "How much does the atmosphere of a space (lighting, interior, etc.) affect you?", optionLabels: ["I don't really notice it", "I notice it to some degree", "It affects my mood quite a bit", "My whole state changes completely depending on the atmosphere"] },
  A9: { prompt: "When you encounter something you love (a scent, food, a sound, etc.)?", optionLabels: ["I enjoy it casually", "I enjoy it happily", "I get fully absorbed in enjoying it", "I enjoy it to the point of feeling overwhelmed with happiness"] },
  A10: { prompt: "When you come across a sad story (a book, the news, etc.)?", optionLabels: ["I take it in calmly", "I feel a sense of pity", "It weighs on my heart", "It stays on my mind and hurts for days"] },
  L1: { prompt: "How uncomfortable do bright lights, loud sounds, or strong smells make you feel?", minLabel: "Not uncomfortable at all", maxLabel: "Extremely uncomfortable" },
  L2: { prompt: "When you hear loud noise (construction, a loudspeaker, etc.)?", optionLabels: ["It doesn't really bother me", "It's a bit grating", "It's quite uncomfortable", "It's so distressing I want to cover my ears"] },
  L3: { prompt: "When a clothing tag or fabric feels scratchy?", optionLabels: ["I barely notice it", "It bothers me sometimes", "It keeps bothering me", "I have to cut it off or change right away"] },
  L4: { prompt: "When you smell a strong perfume or odor?", optionLabels: ["I'm generally fine", "It's a bit grating", "It sometimes gives me a headache", "It makes me feel sick or I have to leave the area"] },
  L5: { prompt: "How do you react to bright lighting or screen light?", optionLabels: ["I adjust well", "My eyes get a little tired", "I get easily dazzled", "It sometimes leads to a headache"] },
  L6: { prompt: "When you're hungry or have a lot of caffeine?", optionLabels: ["No major change in how I feel", "I notice a slight change", "I get on edge or anxious", "My body reacts noticeably (racing heart, etc.)"] },
  L7: { prompt: "How well can you focus in an environment with several sounds at once?", optionLabels: ["Very well", "Reasonably well", "I get distracted easily", "It's nearly impossible"] },
  L8: { prompt: "How do you react to temperature changes (somewhere too hot or too cold)?", optionLabels: ["I adjust well", "I feel a bit uncomfortable", "I react quite sensitively", "It affects my whole physical condition"] },
  L9: { prompt: "How do you react to stimuli on your skin (sunlight, wind, etc.)?", optionLabels: ["I barely notice it", "I notice it lightly", "I feel it sensitively", "I get easily irritated and uncomfortable"] },
  L10: { prompt: "How sensitive are you to pain (an injection, a small cut, etc.)?", optionLabels: ["I'm on the less sensitive side", "About average", "I'm on the more sensitive side", "I feel it far more intensely than others"] },
};

export const MODULE7_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  X1: { prompt: "Cuando se juntan varias cosas a la vez, ¿cuánto te desbordan?", minLabel: "Nada", maxLabel: "Me desbordan por completo" },
  X2: { prompt: "Cuando tienes que hacer varias cosas al mismo tiempo, ¿qué te pasa?", optionLabels: ["Las resuelvo una por una", "Es un poco frenético, pero me apaño", "Se me enreda la cabeza enseguida", "Me desbordo tanto que no puedo concentrarme en nada"] },
  X3: { prompt: "Cuando pasas mucho rato en un sitio ruidoso y lleno de gente, ¿cómo te sientes?", optionLabels: ["Bien", "Me canso un poco", "Me canso enseguida", "Quiero irme cuanto antes"] },
  X4: { prompt: "Cuando tienes prisa o una fecha límite encima, ¿qué te pasa?", optionLabels: ["Me concentro incluso mejor", "Me pongo con una tensión razonable", "Me entra ansiedad con facilidad", "A veces me quedo en blanco"] },
  X5: { prompt: "Cuando tu agenda cambia de repente, ¿cómo lo llevas?", optionLabels: ["Me adapto con flexibilidad", "Me descoloca un poco, pero me ajusto", "Me lleva tiempo adaptarme", "Se me desordena el ritmo de todo el día"] },
  X6: { prompt: "Cuando alguien te mira mientras trabajas, ¿qué te pasa?", optionLabels: ["Nada distinto de lo normal", "Me molesta un poco", "Me tenso y cometo más errores", "No logro rendir a mi nivel habitual"] },
  X7: { prompt: "Después de un día con mucha gente, ¿cómo te quedas?", optionLabels: ["Todavía me sobra energía", "Con un cansancio razonable", "Necesito de verdad un rato a solas", "Sin ninguna energía"] },
  X8: { prompt: "¿Con qué rapidez te adaptas a un entorno nuevo (una mudanza, un trabajo nuevo, etc.)?", optionLabels: ["Me adapto rápido", "Me adapto razonablemente bien", "Me lleva bastante tiempo", "Adaptarme me genera mucho estrés"] },
  X9: { prompt: "Después de un día lleno de estímulos (un examen, una presentación, un viaje, etc.), ¿cómo te recuperas?", optionLabels: ["Al día siguiente sigo bien", "Con un día de descanso me recupero", "El efecto me dura unos días", "Tardo bastante en recuperarme"] },
  X10: { prompt: "Cuando varias personas te hablan a la vez, ¿qué te pasa?", optionLabels: ["Lo llevo sin problema", "Se me hace un poco pesado", "No sé a quién atender primero", "Me quedo en blanco y no logro responder"] },
  A1: { prompt: "¿Cuánto te emocionan la música, el cine o los paisajes?", minLabel: "Apenas me conmueven", maxLabel: "Me conmueven muy hondo (me desbordan)" },
  A2: { prompt: "Cuando escuchas música que te encanta, ¿qué sientes?", optionLabels: ["La escucho sin más, a gusto", "Me pone de buen humor", "Me emociona bastante", "A veces se me pone la piel de gallina o se me saltan las lágrimas"] },
  A3: { prompt: "Cuando visitas un museo o una exposición de arte, ¿cómo lo vives?", optionLabels: ["Lo veo sin más y sigo adelante", "Me detengo un rato en algunas obras que me llaman la atención", "Muchas veces me quedo mucho tiempo ante una obra", "A menudo me abruma lo que siento"] },
  A4: { prompt: "Cuando ves un paisaje natural (un atardecer, el mar, etc.), ¿qué sientes?", optionLabels: ["Pienso que es bonito y sigo", "Me tomo un momento para contemplarlo", "Me conmueve hondamente", "A veces me desborda o se me saltan las lágrimas"] },
  A5: { prompt: "¿Cómo reaccionas ante la expresión artística de otra persona (un texto, una pintura, etc.)?", optionLabels: ["Con naturalidad, sin darle más vueltas", "Si me gusta, lo elogio", "Me fijo hasta en los detalles más delicados", "Hasta los pequeños detalles me emocionan mucho"] },
  A6: { prompt: "Cuando ves una película o una serie, ¿cómo la vives?", optionLabels: ["La veo sobre todo para entretenerme", "Me atrapa", "Me identifico mucho con las emociones", "Me acompaña durante días"] },
  A7: { prompt: "¿Qué tan bien notas las diferencias sutiles de color o textura?", optionLabels: ["No suelo distinguirlas", "Las noto de vez en cuando", "Las noto bastante bien", "Noto diferencias que otros ni perciben"] },
  A8: { prompt: "¿Cuánto te afecta el ambiente de un espacio (la iluminación, la decoración, etc.)?", optionLabels: ["Casi no me fijo", "Lo noto hasta cierto punto", "Influye bastante en mi ánimo", "Mi estado cambia por completo según el ambiente"] },
  A9: { prompt: "Cuando te encuentras algo que te encanta (un aroma, una comida, un sonido, etc.), ¿cómo lo disfrutas?", optionLabels: ["Sin darle mucha importancia", "Con alegría", "Me sumerjo por completo en el momento", "Lo disfruto hasta desbordarme de felicidad"] },
  A10: { prompt: "Cuando te encuentras con una historia triste (un libro, las noticias, etc.), ¿qué sientes?", optionLabels: ["La tomo con calma", "Siento algo de compasión", "Me deja el corazón encogido", "Se me queda en la cabeza y me duele durante días"] },
  L1: { prompt: "¿Cuánta incomodidad te producen las luces intensas, los sonidos fuertes o los olores potentes?", minLabel: "Ninguna", maxLabel: "Muchísima" },
  L2: { prompt: "Cuando oyes un ruido fuerte (obras, un altavoz, etc.), ¿qué sientes?", optionLabels: ["Casi no me molesta", "Me resulta un poco irritante", "Me resulta bastante incómodo", "Me angustia tanto que quiero taparme los oídos"] },
  L3: { prompt: "Cuando la etiqueta o la tela de la ropa te raspa, ¿qué haces?", optionLabels: ["Casi no lo noto", "A veces me molesta", "Me sigue molestando", "Tengo que cortarla o cambiarme enseguida"] },
  L4: { prompt: "Cuando hueles un perfume o un olor muy fuerte, ¿qué te pasa?", optionLabels: ["En general, nada", "Me resulta un poco irritante", "A veces me da dolor de cabeza", "Me sienta mal o tengo que alejarme del lugar"] },
  L5: { prompt: "¿Cómo reaccionas ante una luz intensa o la luz de las pantallas?", optionLabels: ["Me adapto bien", "Se me cansa un poco la vista", "Me deslumbra con facilidad", "A veces acaba dándome dolor de cabeza"] },
  L6: { prompt: "Cuando tienes hambre o has tomado mucha cafeína, ¿qué notas?", optionLabels: ["Ningún cambio importante", "Un cambio leve", "Me pongo irritable o con ansiedad", "Mi cuerpo reacciona claramente (el corazón se acelera, etc.)"] },
  L7: { prompt: "¿Qué tan bien te concentras en un ambiente con varios sonidos a la vez?", optionLabels: ["Muy bien", "Razonablemente bien", "Me distraigo con facilidad", "Es casi imposible"] },
  L8: { prompt: "¿Cómo reaccionas a los cambios de temperatura (un lugar demasiado caluroso o demasiado frío)?", optionLabels: ["Me adapto bien", "Me incomoda un poco", "Reacciono con bastante sensibilidad", "Afecta a todo mi estado físico"] },
  L9: { prompt: "¿Cómo reaccionas a los estímulos en la piel (el sol, el viento, etc.)?", optionLabels: ["Casi no los noto", "Los noto levemente", "Los siento con mucha sensibilidad", "Me irritan con facilidad y me incomodan"] },
  L10: { prompt: "¿Cuál es tu sensibilidad al dolor (una inyección, una herida pequeña, etc.)?", optionLabels: ["Más bien poca", "Normal", "Más bien alta", "Lo siento mucho más intensamente que otras personas"] },
};

export const MODULE7_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  overstimulation: 10,
  aestheticSensitivity: 10,
  lowSensoryThreshold: 10,
};

export const MODULE7_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    overstimulation: { high: "자극과부하", low: "안정적인 자극처리" },
    aestheticSensitivity: { high: "심미적민감성", low: "담담한 감상" },
    lowSensoryThreshold: { high: "낮은감각역치", low: "둔감한 감각" },
  },
  en: {
    overstimulation: { high: "Overstimulation", low: "Stable Stimulus Processing" },
    aestheticSensitivity: { high: "Aesthetic Sensitivity", low: "Detached Appreciation" },
    lowSensoryThreshold: { high: "Low Sensory Threshold", low: "Dulled Senses" },
  },
  es: {
    overstimulation: { high: "Sobreestimulación", low: "Estímulos bien llevados" },
    aestheticSensitivity: { high: "Sensibilidad estética", low: "Apreciación serena" },
    lowSensoryThreshold: { high: "Umbral sensorial bajo", low: "Sentidos tranquilos" },
  },
};

export const MODULE7_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "무난한 감각형", hook: "자극에 특별히 압도되거나 예민하지 않은, 비교적 무난한 감각 반응을 보입니다." },
    overstimulation: { title: "과부하형", hook: "여러 자극이 한꺼번에 몰리면 쉽게 압도되고, 혼자만의 시간이 꼭 필요합니다." },
    aestheticSensitivity: { title: "심미형", hook: "음악, 예술, 풍경 같은 아름다움과 감정적 울림에 남들보다 깊이 반응합니다." },
    lowSensoryThreshold: { title: "감각민감형", hook: "소리, 빛, 냄새, 촉감 같은 물리적 자극에 유독 예민하게 반응합니다." },
    "overstimulation+aestheticSensitivity": { title: "감성 과몰입형", hook: "깊이 느끼는 만큼 그 감정에 쉽게 압도되기도 하는 패턴입니다." },
    "overstimulation+lowSensoryThreshold": { title: "감각 과부하형", hook: "물리적 자극에도 민감하고, 여러 자극이 겹치면 쉽게 지치는 편입니다." },
    "aestheticSensitivity+lowSensoryThreshold": { title: "섬세한 감각형", hook: "아름다움은 깊이 느끼면서, 불편한 자극도 예민하게 감지하는 섬세한 감각을 가졌습니다." },
    "overstimulation+aestheticSensitivity+lowSensoryThreshold": { title: "고감각민감형(HSP)", hook: "자극과부하, 심미적 민감성, 낮은 감각역치가 모두 뚜렷한, 전형적인 고감각민감자(HSP) 패턴입니다." },
  },
  en: {
    baseline: { title: "Easygoing Senses", hook: "You're not especially overwhelmed or especially sensitive to stimulation — a relatively easygoing sensory response." },
    overstimulation: { title: "Overloaded Type", hook: "When several stimuli hit at once, you get overwhelmed easily, and you really need time alone." },
    aestheticSensitivity: { title: "Aesthetic Type", hook: "Music, art, scenery, and other forms of beauty or emotional resonance hit you more deeply than most." },
    lowSensoryThreshold: { title: "Sensory-Sensitive Type", hook: "Physical stimuli — sound, light, smell, touch — register with you unusually strongly." },
    "overstimulation+aestheticSensitivity": { title: "Emotionally Immersive Type", hook: "Feeling things deeply also means getting easily overwhelmed by those same feelings." },
    "overstimulation+lowSensoryThreshold": { title: "Sensory Overload Type", hook: "You're sensitive to physical stimuli, and when several pile up at once you tire easily." },
    "aestheticSensitivity+lowSensoryThreshold": { title: "Finely Tuned Senses", hook: "You feel beauty deeply while also picking up on uncomfortable stimuli sharply — a finely tuned sensory makeup." },
    "overstimulation+aestheticSensitivity+lowSensoryThreshold": { title: "Highly Sensitive (HSP)", hook: "Overstimulation, aesthetic sensitivity, and a low sensory threshold are all clearly present — a classic highly sensitive person (HSP) pattern." },
  },
  es: {
    baseline: { title: "Sensibilidad equilibrada", hook: "Los estímulos ni te desbordan ni te afectan de forma especial: tu respuesta sensorial es bastante equilibrada." },
    overstimulation: { title: "Saturación fácil", hook: "Cuando varios estímulos llegan a la vez, te desbordas con facilidad, y de verdad necesitas tiempo a solas." },
    aestheticSensitivity: { title: "Mirada estética", hook: "La música, el arte, los paisajes y otras formas de belleza o de emoción te llegan más hondo que a la mayoría." },
    lowSensoryThreshold: { title: "Sentidos a flor de piel", hook: "Los estímulos físicos (sonido, luz, olor, tacto) te llegan con una intensidad fuera de lo común." },
    "overstimulation+aestheticSensitivity": { title: "Sentir hondo y saturarse", hook: "Sentir las cosas con profundidad también significa que esas mismas emociones pueden desbordarte con facilidad." },
    "overstimulation+lowSensoryThreshold": { title: "Sentidos saturados", hook: "Eres sensible a los estímulos físicos, y cuando se juntan varios a la vez te cansas enseguida." },
    "aestheticSensitivity+lowSensoryThreshold": { title: "Sentidos muy afinados", hook: "Sientes la belleza con profundidad y, a la vez, captas con agudeza los estímulos incómodos: una sensibilidad muy fina." },
    "overstimulation+aestheticSensitivity+lowSensoryThreshold": { title: "Alta sensibilidad (PAS)", hook: "La sobreestimulación, la sensibilidad estética y los sentidos a flor de piel están muy presentes en ti: es el patrón típico de una persona altamente sensible (PAS)." },
  },
};
