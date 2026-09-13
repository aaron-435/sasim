/**
 * lib/module8Sleep.ts
 * ------------------------------------------------------------------
 * Module 8 — 수면/무의식 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈8_수면_30문항_전문가검토용.xlsx). 3차원(Pre-Sleep Arousal Scale 기반 +
 * 자체 추가 축): 인지적각성(C1-C10) / 신체적각성(S1-S10) / 무의식누수(D1-D10).
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE8_QUESTIONS: ModuleQuestion[] = [
  // ---- 인지적각성 (Cognitive Arousal) — C1-C10 ----
  { id: "C1", dimension: "cognitiveArousal", format: "slider", prompt: "잠자리에 누웠을 때 생각이 꼬리를 무는 정도는?", options: { minLabel: "전혀 그렇지 않음(머릿속이 조용함)", maxLabel: "매우 그러함(생각이 멈추지 않음)" } },
  { id: "C2", dimension: "cognitiveArousal", format: "choice", prompt: "잠들기 전 머릿속은?", options: [
    { label: "비교적 조용하다", score: 0 }, { label: "가끔 생각이 스친다", score: 1 },
    { label: "이런저런 생각이 계속 떠오른다", score: 2 }, { label: "생각을 멈출 수가 없다", score: 3 } ] },
  { id: "C3", dimension: "cognitiveArousal", format: "choice", prompt: "오늘 있었던 일을 잠자리에서?", options: [
    { label: "거의 안 떠올린다", score: 0 }, { label: "가볍게 떠올린다", score: 1 },
    { label: "자꾸 곱씹게 된다", score: 2 }, { label: "실수했던 장면이 계속 재생된다", score: 3 } ] },
  { id: "C4", dimension: "cognitiveArousal", format: "choice", prompt: "내일 할 일이나 걱정거리가?", options: [
    { label: "잠들기 전엔 생각 안 한다", score: 0 }, { label: "가끔 스친다", score: 1 },
    { label: "자꾸 계획을 세우게 된다", score: 2 }, { label: "걱정 때문에 잠이 달아난다", score: 3 } ] },
  { id: "C5", dimension: "cognitiveArousal", format: "choice", prompt: "해결 안 된 문제가 있으면?", options: [
    { label: "자기 전엔 내려놓는다", score: 0 }, { label: "살짝 신경 쓰인다", score: 1 },
    { label: "누워서도 계속 고민한다", score: 2 }, { label: "그 생각 때문에 뜬눈으로 지새운 적 있다", score: 3 } ] },
  { id: "C6", dimension: "cognitiveArousal", format: "choice", prompt: "잠들기까지 걸리는 시간은?", options: [
    { label: "눕자마자 잔다", score: 0 }, { label: "10~20분 정도", score: 1 },
    { label: "30분 이상 걸린다", score: 2 }, { label: "1시간 넘게 뒤척일 때가 많다", score: 3 } ] },
  { id: "C7", dimension: "cognitiveArousal", format: "choice", prompt: "갑자기 아이디어나 걱정이 떠오르면?", options: [
    { label: "다음 날 생각하기로 하고 넘긴다", score: 0 }, { label: "메모하고 다시 눕는다", score: 1 },
    { label: "머릿속에서 계속 확장시킨다", score: 2 }, { label: "결국 일어나서 처리해야 잠이 온다", score: 3 } ] },
  { id: "C8", dimension: "cognitiveArousal", format: "choice", prompt: "과거의 후회되는 일들이 잠들기 전?", options: [
    { label: "거의 안 떠오른다", score: 0 }, { label: "가끔 떠오른다", score: 1 },
    { label: "자주 떠오른다", score: 2 }, { label: "오래된 일까지 소환돼서 괴롭다", score: 3 } ] },
  { id: "C9", dimension: "cognitiveArousal", format: "choice", prompt: "대화나 갈등 상황을 되짚어보는 게?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "했어야 할 말을 계속 시뮬레이션한다", score: 3 } ] },
  { id: "C10", dimension: "cognitiveArousal", format: "choice", prompt: "머릿속 생각을 끄고 싶을 때?", options: [
    { label: "쉽게 꺼진다", score: 0 }, { label: "어느 정도 조절된다", score: 1 },
    { label: "잘 안 꺼진다", score: 2 }, { label: "생각의 스위치가 없는 것 같다", score: 3 } ] },
  // ---- 신체적각성 (Somatic Arousal) — S1-S10 ----
  { id: "S1", dimension: "somaticArousal", format: "slider", prompt: "잠자리에서 몸이 긴장되어 있는 정도는?", options: { minLabel: "전혀 긴장되지 않음(완전히 이완됨)", maxLabel: "매우 긴장됨" } },
  { id: "S2", dimension: "somaticArousal", format: "choice", prompt: "누워도 몸은?", options: [
    { label: "금방 이완된다", score: 0 }, { label: "어느 정도 이완된다", score: 1 },
    { label: "뻣뻣하게 긴장돼 있다", score: 2 }, { label: "쉽게 풀리지 않는다", score: 3 } ] },
  { id: "S3", dimension: "somaticArousal", format: "choice", prompt: "잠들기 전 심장박동은?", options: [
    { label: "차분하다", score: 0 }, { label: "평소와 비슷하다", score: 1 },
    { label: "약간 빠르게 느껴질 때가 있다", score: 2 }, { label: "두근거려서 신경 쓰인다", score: 3 } ] },
  { id: "S4", dimension: "somaticArousal", format: "choice", prompt: "편안한 자세를 찾는 데?", options: [
    { label: "금방 찾는다", score: 0 }, { label: "조금 뒤척이다 찾는다", score: 1 },
    { label: "이리저리 자주 뒤척인다", score: 2 }, { label: "편한 자세가 안 나와서 계속 움직인다", score: 3 } ] },
  { id: "S5", dimension: "somaticArousal", format: "choice", prompt: "손발이나 몸의 감각은?", options: [
    { label: "편안하다", score: 0 }, { label: "가끔 뻐근하다", score: 1 },
    { label: "자주 뻣뻣하거나 저릿하다", score: 2 }, { label: "긴장으로 잠들기 힘들 정도다", score: 3 } ] },
  { id: "S6", dimension: "somaticArousal", format: "choice", prompt: "근육(어깨, 턱 등)이 잠자리에서?", options: [
    { label: "풀려있다", score: 0 }, { label: "약간 뭉쳐있다", score: 1 },
    { label: "꽤 긴장돼 있다", score: 2 }, { label: "이 악물기 등 무의식적 긴장이 있다", score: 3 } ] },
  { id: "S7", dimension: "somaticArousal", format: "choice", prompt: "자다가 몸이 움찔하거나 깨는 경우는?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "거의 매일 있다", score: 3 } ] },
  { id: "S8", dimension: "somaticArousal", format: "choice", prompt: "잠자리에서 호흡은?", options: [
    { label: "편안하고 깊다", score: 0 }, { label: "평소와 비슷하다", score: 1 },
    { label: "얕고 빠를 때가 있다", score: 2 }, { label: "답답하게 느껴질 때가 있다", score: 3 } ] },
  { id: "S9", dimension: "somaticArousal", format: "choice", prompt: "카페인이나 스트레스가 있던 날 밤에는?", options: [
    { label: "잠에 큰 영향 없다", score: 0 }, { label: "약간 영향받는다", score: 1 },
    { label: "몸이 확실히 반응한다", score: 2 }, { label: "뜬눈으로 지새울 정도로 영향받는다", score: 3 } ] },
  { id: "S10", dimension: "somaticArousal", format: "choice", prompt: "잠들기 전 몸을 이완시키려면?", options: [
    { label: "저절로 된다", score: 0 }, { label: "약간의 시간이 필요하다", score: 1 },
    { label: "의식적으로 노력해야 한다", score: 2 }, { label: "노력해도 잘 안 풀린다", score: 3 } ] },
  // ---- 무의식누수 (Subconscious Leak) — D1-D10 ----
  { id: "D1", dimension: "subconsciousLeak", format: "slider", prompt: "기상 직후 몸에 남아있는 피로감의 정도는?", options: { minLabel: "전혀 없음(가뿐함)", maxLabel: "매우 심함(전혀 못 잔 듯함)" } },
  { id: "D2", dimension: "subconsciousLeak", format: "choice", prompt: "꿈을 꾸는 빈도는?", options: [
    { label: "거의 안 꾼다(기억이 없다)", score: 0 }, { label: "가끔 꾼다", score: 1 },
    { label: "자주 꾼다", score: 2 }, { label: "거의 매일 생생하게 꾼다", score: 3 } ] },
  { id: "D3", dimension: "subconsciousLeak", format: "choice", prompt: "꿈의 내용은 주로?", options: [
    { label: "특별한 감정 없이 평범하다", score: 0 }, { label: "가끔 인상 깊다", score: 1 },
    { label: "현실 고민이 반영될 때가 많다", score: 2 }, { label: "쫓기거나 불안한 꿈을 자주 꾼다", score: 3 } ] },
  { id: "D4", dimension: "subconsciousLeak", format: "choice", prompt: "자고 일어났을 때 개운함은?", options: [
    { label: "충분히 개운하다", score: 0 }, { label: "대체로 괜찮다", score: 1 },
    { label: "잔 것 같지 않을 때가 많다", score: 2 }, { label: "오히려 더 피곤할 때가 있다", score: 3 } ] },
  { id: "D5", dimension: "subconsciousLeak", format: "choice", prompt: "낮에 있었던 감정(불안, 걱정 등)이 꿈에?", options: [
    { label: "거의 안 나타난다", score: 0 }, { label: "가끔 반영된다", score: 1 },
    { label: "자주 반영된다", score: 2 }, { label: "낮의 감정이 꿈에서 증폭돼 나타난다", score: 3 } ] },
  { id: "D6", dimension: "subconsciousLeak", format: "choice", prompt: "자다가 중간에 깨는 횟수는?", options: [
    { label: "거의 없다", score: 0 }, { label: "1번 정도", score: 1 },
    { label: "2~3번", score: 2 }, { label: "자주 깨서 수면이 끊긴다", score: 3 } ] },
  { id: "D7", dimension: "subconsciousLeak", format: "choice", prompt: "악몽이나 무서운 꿈을 꾸는 빈도는?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "종종 있다", score: 2 }, { label: "자주 시달릴 정도다", score: 3 } ] },
  { id: "D8", dimension: "subconsciousLeak", format: "choice", prompt: "꿈에서 깨어난 직후 기분은?", options: [
    { label: "대체로 평온하다", score: 0 }, { label: "보통이다", score: 1 },
    { label: "찝찝하거나 불편할 때가 많다", score: 2 }, { label: "현실인지 헷갈릴 정도로 강렬하다", score: 3 } ] },
  { id: "D9", dimension: "subconsciousLeak", format: "choice", prompt: "반복되는 꿈이나 패턴이?", options: [
    { label: "없다", score: 0 }, { label: "가끔 있는 것 같다", score: 1 },
    { label: "몇 가지 반복되는 게 있다", score: 2 }, { label: "같은 상황·장소가 계속 반복된다", score: 3 } ] },
  { id: "D10", dimension: "subconsciousLeak", format: "choice", prompt: "잠에서 깬 직후 몸 상태는?", options: [
    { label: "가뿐하다", score: 0 }, { label: "보통이다", score: 1 },
    { label: "무겁게 느껴진다", score: 2 }, { label: "밤새 뭔가에 시달린 듯 지쳐있다", score: 3 } ] },
];

// Display-text-only translations of MODULE8_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE8_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  C1: { prompt: "How much do your thoughts keep chaining into each other once you're in bed?", minLabel: "Not at all (my mind is quiet)", maxLabel: "Very much (thoughts won't stop)" },
  C2: { prompt: "What's your mind like right before falling asleep?", optionLabels: ["Fairly quiet", "The occasional thought passes through", "All sorts of thoughts keep coming up", "I can't stop the thoughts"] },
  C3: { prompt: "Do you replay what happened during the day while in bed?", optionLabels: ["Almost never", "Lightly, sometimes", "I keep dwelling on it", "Scenes of mistakes I made keep replaying"] },
  C4: { prompt: "Do tomorrow's tasks or worries come up before sleep?", optionLabels: ["I don't think about them before sleep", "They cross my mind occasionally", "I keep making plans in my head", "Worry chases sleep away"] },
  C5: { prompt: "When there's an unresolved problem?", optionLabels: ["I let it go before bed", "It bothers me a little", "I keep dwelling on it even lying down", "There have been nights that thought kept me wide awake"] },
  C6: { prompt: "How long does it take you to fall asleep?", optionLabels: ["I fall asleep the moment I lie down", "About 10-20 minutes", "More than 30 minutes", "I often toss and turn for over an hour"] },
  C7: { prompt: "When an idea or worry suddenly pops up?", optionLabels: ["I decide to think about it tomorrow and let it go", "I jot it down and lie back down", "I keep expanding on it in my head", "I end up having to get up and deal with it before I can sleep"] },
  C8: { prompt: "Do past regrets come up before sleep?", optionLabels: ["Almost never", "Occasionally", "Often", "Even old memories get dredged up and it's painful"] },
  C9: { prompt: "Do you replay conversations or conflicts in your head?", optionLabels: ["Almost never", "Sometimes", "Often", "I keep simulating what I should have said"] },
  C10: { prompt: "When you want to switch off your thoughts?", optionLabels: ["They switch off easily", "I can manage it to some degree", "They don't switch off easily", "It's like there's no switch for my thoughts at all"] },
  S1: { prompt: "How tense does your body feel once you're in bed?", minLabel: "Not tense at all (completely relaxed)", maxLabel: "Very tense" },
  S2: { prompt: "Even lying down, how does your body feel?", optionLabels: ["It relaxes quickly", "It relaxes to some degree", "It stays stiff and tense", "It doesn't loosen up easily"] },
  S3: { prompt: "What's your heart rate like before falling asleep?", optionLabels: ["Calm", "About the same as usual", "Sometimes it feels a bit fast", "It pounds enough to bother me"] },
  S4: { prompt: "How easily do you find a comfortable sleeping position?", optionLabels: ["Quickly", "After tossing a bit", "I toss and turn often", "I keep moving because I can't find a comfortable position"] },
  S5: { prompt: "How do your hands, feet, or body feel?", optionLabels: ["Comfortable", "Occasionally stiff", "Often stiff or tingly", "So tense it's hard to fall asleep"] },
  S6: { prompt: "How do your muscles (shoulders, jaw, etc.) feel in bed?", optionLabels: ["Relaxed", "A little tight", "Fairly tense", "There's unconscious tension, like clenching my jaw"] },
  S7: { prompt: "How often does your body twitch or wake you up while sleeping?", optionLabels: ["Almost never", "Occasionally", "Often", "Almost every day"] },
  S8: { prompt: "How's your breathing while in bed?", optionLabels: ["Comfortable and deep", "About the same as usual", "Sometimes shallow and fast", "It sometimes feels stifled"] },
  S9: { prompt: "On nights after caffeine or stress?", optionLabels: ["No major effect on sleep", "A bit of an effect", "My body clearly reacts", "It affects me enough to keep me wide awake"] },
  S10: { prompt: "How does relaxing your body before sleep go?", optionLabels: ["It happens on its own", "It takes a bit of time", "I have to make a conscious effort", "Even with effort, it doesn't really loosen up"] },
  D1: { prompt: "How much fatigue lingers in your body right after waking up?", minLabel: "None at all (I feel light)", maxLabel: "Very severe (like I didn't sleep at all)" },
  D2: { prompt: "How often do you dream?", optionLabels: ["Almost never (no memory of it)", "Occasionally", "Often", "Vividly, almost every day"] },
  D3: { prompt: "What are your dreams usually like?", optionLabels: ["Ordinary, without much feeling", "Occasionally memorable", "Often reflect real-life worries", "Often about being chased or feeling anxious"] },
  D4: { prompt: "How refreshed do you feel after waking up?", optionLabels: ["Fully refreshed", "Generally fine", "It often doesn't feel like I slept at all", "Sometimes I feel even more tired"] },
  D5: { prompt: "Do daytime emotions (anxiety, worry, etc.) show up in your dreams?", optionLabels: ["Almost never", "Occasionally reflected", "Often reflected", "Daytime emotions show up amplified in dreams"] },
  D6: { prompt: "How many times do you wake up in the middle of the night?", optionLabels: ["Almost never", "About once", "2-3 times", "I wake up often, breaking up my sleep"] },
  D7: { prompt: "How often do you have nightmares or scary dreams?", optionLabels: ["Almost never", "Occasionally", "Fairly often", "Often enough that it wears on me"] },
  D8: { prompt: "How do you feel right after waking from a dream?", optionLabels: ["Generally calm", "Average", "Often unsettled or uncomfortable", "So intense I get confused about what's real"] },
  D9: { prompt: "Do you have recurring dreams or patterns?", optionLabels: ["No", "I think there are some, occasionally", "A few recurring ones", "The same situation or place keeps repeating"] },
  D10: { prompt: "How does your body feel right after waking up?", optionLabels: ["Light", "Average", "It feels heavy", "Worn out, like something wore me down all night"] },
};

export const MODULE8_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  C1: { prompt: "¿Cuánto se te encadenan los pensamientos, uno tras otro, al acostarte?", minLabel: "Nada (mi mente está en calma)", maxLabel: "Mucho (los pensamientos no paran)" },
  C2: { prompt: "¿Cómo está tu mente justo antes de dormirte?", optionLabels: ["Bastante tranquila", "De vez en cuando pasa algún pensamiento", "Me vienen todo tipo de pensamientos sin parar", "No logro detener los pensamientos"] },
  C3: { prompt: "¿Repasas lo que pasó durante el día estando en la cama?", optionLabels: ["Casi nunca", "Levemente, a veces", "Sigo dándole vueltas", "Se me repiten escenas de errores que cometí"] },
  C4: { prompt: "¿Te vienen las tareas de mañana o preocupaciones antes de dormir?", optionLabels: ["No pienso en eso antes de dormir", "Me pasan por la cabeza de vez en cuando", "Sigo haciendo planes en mi mente", "La preocupación me quita el sueño"] },
  C5: { prompt: "Cuando hay un problema sin resolver?", optionLabels: ["Lo dejo ir antes de dormir", "Me molesta un poco", "Sigo dándole vueltas incluso acostado/a", "Ha habido noches que ese pensamiento me mantuvo completamente despierto/a"] },
  C6: { prompt: "¿Cuánto tiempo te toma quedarte dormido/a?", optionLabels: ["Me duermo en cuanto me acuesto", "Unos 10-20 minutos", "Más de 30 minutos", "Seguido doy vueltas por más de una hora"] },
  C7: { prompt: "Cuando de repente se te ocurre una idea o preocupación?", optionLabels: ["Decido pensarlo mañana y lo dejo pasar", "Lo anoto y vuelvo a acostarme", "Sigo desarrollándolo en mi mente", "Termino teniendo que levantarme a resolverlo para poder dormir"] },
  C8: { prompt: "¿Te vienen arrepentimientos del pasado antes de dormir?", optionLabels: ["Casi nunca", "De vez en cuando", "Seguido", "Hasta cosas viejas resurgen y me duele"] },
  C9: { prompt: "¿Repites conversaciones o conflictos en tu mente?", optionLabels: ["Casi nunca", "A veces", "Seguido", "Sigo simulando qué debería haber dicho"] },
  C10: { prompt: "Cuando quieres apagar tus pensamientos?", optionLabels: ["Se apagan con facilidad", "Puedo controlarlos hasta cierto punto", "No se apagan con facilidad", "Es como si no tuviera un interruptor para mis pensamientos"] },
  S1: { prompt: "¿Qué tan tenso se siente tu cuerpo una vez que estás en la cama?", minLabel: "Nada tenso (completamente relajado)", maxLabel: "Muy tenso" },
  S2: { prompt: "¿Cómo se siente tu cuerpo incluso acostado?", optionLabels: ["Se relaja rápido", "Se relaja hasta cierto punto", "Se queda rígido y tenso", "No se afloja con facilidad"] },
  S3: { prompt: "¿Cómo está tu ritmo cardíaco antes de dormirte?", optionLabels: ["Tranquilo", "Más o menos como siempre", "A veces se siente algo acelerado", "Late fuerte y me molesta"] },
  S4: { prompt: "¿Qué tan fácil te resulta encontrar una posición cómoda para dormir?", optionLabels: ["Rápido", "Después de dar unas vueltas", "Doy vueltas seguido", "Sigo moviéndome porque no encuentro una posición cómoda"] },
  S5: { prompt: "¿Cómo se sienten tus manos, pies o cuerpo?", optionLabels: ["Cómodos", "A veces algo rígidos", "Seguido rígidos u hormigueantes", "Tan tensos que me cuesta dormirme"] },
  S6: { prompt: "¿Cómo están tus músculos (hombros, mandíbula, etc.) en la cama?", optionLabels: ["Relajados", "Algo tensos", "Bastante tensos", "Hay tensión inconsciente, como apretar la mandíbula"] },
  S7: { prompt: "¿Con qué frecuencia tu cuerpo da sacudidas o te despierta mientras duermes?", optionLabels: ["Casi nunca", "De vez en cuando", "Seguido", "Casi todos los días"] },
  S8: { prompt: "¿Cómo es tu respiración estando en la cama?", optionLabels: ["Cómoda y profunda", "Más o menos como siempre", "A veces superficial y rápida", "A veces se siente sofocante"] },
  S9: { prompt: "¿En las noches después de cafeína o estrés?", optionLabels: ["Sin mayor efecto en el sueño", "Un poco de efecto", "Mi cuerpo reacciona claramente", "Me afecta tanto que me mantiene completamente despierto/a"] },
  S10: { prompt: "¿Cómo te va al intentar relajar tu cuerpo antes de dormir?", optionLabels: ["Sucede solo", "Toma algo de tiempo", "Tengo que esforzarme conscientemente", "Incluso esforzándome, no se afloja bien"] },
  D1: { prompt: "¿Cuánto cansancio te queda en el cuerpo justo al despertar?", minLabel: "Nada (me siento ligero/a)", maxLabel: "Muy severo (como si no hubiera dormido nada)" },
  D2: { prompt: "¿Con qué frecuencia sueñas?", optionLabels: ["Casi nunca (no recuerdo)", "De vez en cuando", "Seguido", "Vívidamente, casi todos los días"] },
  D3: { prompt: "¿Cómo suelen ser tus sueños?", optionLabels: ["Comunes, sin mucha emoción", "A veces memorables", "Muchas veces reflejan preocupaciones reales", "Suelo soñar que me persiguen o con ansiedad"] },
  D4: { prompt: "¿Qué tan descansado/a te sientes al despertar?", optionLabels: ["Completamente descansado/a", "En general bien", "Muchas veces siento que no dormí", "A veces me siento incluso más cansado/a"] },
  D5: { prompt: "¿Las emociones del día (ansiedad, preocupación, etc.) aparecen en tus sueños?", optionLabels: ["Casi nunca", "A veces se reflejan", "Seguido se reflejan", "Las emociones del día aparecen amplificadas en los sueños"] },
  D6: { prompt: "¿Cuántas veces te despiertas a la mitad de la noche?", optionLabels: ["Casi nunca", "Una vez, más o menos", "2-3 veces", "Me despierto seguido y el sueño se interrumpe"] },
  D7: { prompt: "¿Con qué frecuencia tienes pesadillas o sueños que dan miedo?", optionLabels: ["Casi nunca", "De vez en cuando", "Bastante seguido", "Con la frecuencia suficiente para agotarme"] },
  D8: { prompt: "¿Cómo te sientes justo al despertar de un sueño?", optionLabels: ["En general en calma", "Normal", "Muchas veces incómodo/a o intranquilo/a", "Tan intenso que me confundo sobre qué es real"] },
  D9: { prompt: "¿Tienes sueños o patrones que se repiten?", optionLabels: ["No", "Creo que a veces sí", "Algunos que se repiten", "La misma situación o lugar se repite constantemente"] },
  D10: { prompt: "¿Cómo se siente tu cuerpo justo al despertar?", optionLabels: ["Ligero", "Normal", "Se siente pesado", "Agotado, como si algo me hubiera atormentado toda la noche"] },
};

export const MODULE8_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  cognitiveArousal: 10,
  somaticArousal: 10,
  subconsciousLeak: 10,
};

export const MODULE8_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    cognitiveArousal: { high: "인지적각성", low: "조용한 머릿속" },
    somaticArousal: { high: "신체적각성", low: "이완된 몸" },
    subconsciousLeak: { high: "무의식누수", low: "개운한 아침" },
  },
  en: {
    cognitiveArousal: { high: "Cognitive Arousal", low: "A Quiet Mind" },
    somaticArousal: { high: "Somatic Arousal", low: "A Relaxed Body" },
    subconsciousLeak: { high: "Subconscious Leak", low: "Waking Refreshed" },
  },
  es: {
    cognitiveArousal: { high: "Activación Cognitiva", low: "Mente en Calma" },
    somaticArousal: { high: "Activación Corporal", low: "Cuerpo Relajado" },
    subconsciousLeak: { high: "Fuga Subconsciente", low: "Despertar Descansado" },
  },
};

export const MODULE8_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "평온한 수면형", hook: "생각도, 몸도, 무의식도 비교적 편안하게 가라앉는 안정적인 수면 상태입니다." },
    cognitiveArousal: { title: "생각과잉형", hook: "누우면 머릿속 생각이 꼬리를 물어 잠들기까지 시간이 오래 걸립니다." },
    somaticArousal: { title: "몸 긴장형", hook: "머리는 비교적 조용해도, 몸이 좀처럼 이완되지 않아 잠들기 어렵습니다." },
    subconsciousLeak: { title: "무의식 누수형", hook: "낮의 감정이 꿈으로 새어나오고, 자고 일어나도 개운하지 않습니다." },
    "cognitiveArousal+somaticArousal": { title: "몸과 마음 모두 각성형", hook: "생각도 몸도 좀처럼 쉬지 못한 채 잠자리에 드는 상태입니다." },
    "cognitiveArousal+subconsciousLeak": { title: "생각이 꿈까지 이어지는형", hook: "낮의 걱정이 잠들기 전부터 꿈속까지 계속 이어지는 패턴입니다." },
    "somaticArousal+subconsciousLeak": { title: "긴장이 꿈에 새는형", hook: "몸의 긴장이 풀리지 않은 채로 잠들어, 그 여파가 꿈과 아침 컨디션까지 이어집니다." },
    "cognitiveArousal+somaticArousal+subconsciousLeak": { title: "깊은 잠 결핍형", hook: "생각, 몸, 무의식 어느 쪽도 제대로 쉬지 못하는, 회복이 필요한 수면 상태입니다." },
  },
  en: {
    baseline: { title: "Peaceful Sleeper", hook: "Your mind, body, and subconscious all settle down relatively comfortably — a stable sleep pattern." },
    cognitiveArousal: { title: "Overthinking Type", hook: "The moment you lie down, your thoughts chain into each other, so it takes a long time to actually fall asleep." },
    somaticArousal: { title: "Bodily-Tense Type", hook: "Your mind is relatively quiet, but your body just won't relax, which makes falling asleep hard." },
    subconsciousLeak: { title: "Subconscious-Leak Type", hook: "The day's emotions leak into your dreams, and you don't wake up feeling refreshed." },
    "cognitiveArousal+somaticArousal": { title: "Mind and Body Both Wired", hook: "Neither your mind nor your body gets to rest before you go to sleep." },
    "cognitiveArousal+subconsciousLeak": { title: "Thoughts That Carry Into Dreams", hook: "Your daytime worries keep running right through falling asleep and into your dreams." },
    "somaticArousal+subconsciousLeak": { title: "Tension That Leaks Into Dreams", hook: "You fall asleep without your body's tension releasing, and the aftereffects carry into your dreams and your morning." },
    "cognitiveArousal+somaticArousal+subconsciousLeak": { title: "Deep-Sleep Deprived", hook: "Neither your mind, body, nor subconscious gets a proper rest — a sleep state that needs real recovery." },
  },
  es: {
    baseline: { title: "Sueño en Paz", hook: "Tu mente, tu cuerpo y tu subconsciente se calman con relativa comodidad — un patrón de sueño estable." },
    cognitiveArousal: { title: "Tipo Pensamiento Excesivo", hook: "En el momento en que te acuestas, un pensamiento lleva a otro, así que te toma mucho tiempo realmente dormirte." },
    somaticArousal: { title: "Tipo Tensión Corporal", hook: "Tu mente está relativamente tranquila, pero tu cuerpo simplemente no se relaja, lo que hace difícil dormirte." },
    subconsciousLeak: { title: "Tipo Fuga Subconsciente", hook: "Las emociones del día se filtran en tus sueños, y no despiertas sintiéndote descansado." },
    "cognitiveArousal+somaticArousal": { title: "Mente y Cuerpo Activados", hook: "Ni tu mente ni tu cuerpo logran descansar antes de dormir." },
    "cognitiveArousal+subconsciousLeak": { title: "Pensamientos que Siguen en los Sueños", hook: "Tus preocupaciones del día siguen corriendo hasta que te duermes y continúan en tus sueños." },
    "somaticArousal+subconsciousLeak": { title: "Tensión que se Filtra en los Sueños", hook: "Te duermes sin que la tensión de tu cuerpo se libere, y sus efectos siguen en tus sueños y tu mañana." },
    "cognitiveArousal+somaticArousal+subconsciousLeak": { title: "Falta de Sueño Profundo", hook: "Ni tu mente, ni tu cuerpo, ni tu subconsciente logran descansar bien — un estado de sueño que necesita una recuperación real." },
  },
};
