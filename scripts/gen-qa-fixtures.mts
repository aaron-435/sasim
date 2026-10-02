// Regenerates QA_DEEP_REPORT / QA_YEAR_REPORT in qaData.ts for every persona with the REAL report
// and year-report prompts (about 7 x $0.07, ~1 minute), plus QA_DEEP_REPORT_V2 (5-set chat flow,
// written free half → paid half like the app). Run after changing those prompts:
//   cd <repo root> && npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts
// Only the 5-set fixtures (2 reports, keeps the others as they are):
//   npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts --v2-only
// Node-only tooling: never imported by the app.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPaidPart, getReportContent } from "../lib/report.ts";
import { buildSetPackets, sanitizeQuizAnswers, type SetHistoryMessage } from "../lib/chatSets.ts";
import { getModuleChatSets } from "../lib/modulePlaybooks.ts";
import { resolveReportSets } from "../lib/reportSets.ts";
import { getLocalizedQuestions, getModuleById, resolveModuleLocale } from "../mobile/lib/quiz/modules.ts";
import {
  classifyProfile,
  computeAllDimensionResults,
  generateNuancedSummary,
  resolveTypeName,
  scoreSliderValue,
  type QuizAnswerRecord,
} from "../mobile/lib/quiz/quizProfile.ts";
import { getYearReportContent } from "../lib/yearReport.ts";
import { getMonthlyFortune, getYearFortune } from "../lib/yearFortune.ts";
import { formatSajuTypeName } from "../mobile/lib/sajuTypeContent.ts";
import { QA_PERSONAS } from "../mobile/dev/qaData.ts";
const personas: Record<string, any> = QA_PERSONAS;
const dataFile = path.join(path.dirname(fileURLToPath(import.meta.url)), "../mobile/dev/qaData.ts");
const EL: Record<string, string> = { 목: "wood", 화: "fire", 토: "earth", 금: "metal", 수: "water" };
const L: any = {
  ko: { module: "모듈 3 · 번아웃", type: "완주형 소진", hook: "끝까지 해내는 대신 끝까지 지친다", summary: "완벽주의가 높고 회복이 낮은 편이에요.", dims: { perfectionism: "완벽주의", recovery: "회복" },
        answers: [["일을 끝낸 뒤 나는?", "다시 처음부터 훑어본다"], ["쉬는 날 나는?", "쉬어도 마음이 불편하다"]],
        chat: { primary_concern: "쉬어도 쉬는 것 같지 않아요", emotional_state: "지쳤고 조금 불안함", trigger_point: "월요일 아침 메신저 알림", repeat_pattern: "몰아서 하고 무너지기", core_fear_or_meaning: "뒤처질까 봐 멈출 수 없어요", summary_quote: "쉬어도 쉬는 것 같지 않아요", integrated_summary: "일이 끝나도 머릿속에서는 계속 점검이 이어지고, 월요일 아침 알림이 그 긴장을 다시 켭니다. 몰아서 버티다 한 번에 무너지는 패턴이 반복되고, 그 밑에는 멈추면 뒤처진다는 두려움이 있습니다." } },
  en: { module: "Module 3 · Burnout", type: "Finisher's Drain", hook: "Finishes everything, and is finished by it", summary: "Perfectionism runs high and recovery runs low.", dims: { perfectionism: "Perfectionism", recovery: "Recovery" },
        answers: [["After finishing a task I…", "Go back and re-check everything"], ["On a day off I…", "Feel uneasy even when I rest"]],
        chat: { primary_concern: "I rest but it never feels like resting", emotional_state: "Tired and a little anxious", trigger_point: "Monday-morning messages", repeat_pattern: "Cramming, then crashing", core_fear_or_meaning: "I'm afraid that if I stop I'll fall behind", summary_quote: "I rest but it never feels like resting", integrated_summary: "Even when the work is done, your mind keeps checking, and Monday-morning messages switch that tension back on. You push through, then crash all at once, and underneath sits the fear that stopping means falling behind." } },
  es: { module: "Módulo 3 · Agotamiento", type: "Quien termina todo y se agota", hook: "Termina todo, y todo termina con su energía", summary: "El perfeccionismo es alto y la recuperación es baja.", dims: { perfectionism: "Perfeccionismo", recovery: "Recuperación" },
        answers: [["Después de terminar una tarea…", "Vuelvo a revisarlo todo desde el principio"], ["En un día libre…", "Siento inquietud aunque descanse"]],
        chat: { primary_concern: "Descanso, pero nunca se siente como descanso", emotional_state: "Cansancio y un poco de ansiedad", trigger_point: "Los mensajes del lunes por la mañana", repeat_pattern: "Acumular y luego derrumbarme", core_fear_or_meaning: "Me da miedo quedarme atrás si paro", summary_quote: "Descanso, pero nunca se siente como descanso", integrated_summary: "Aunque el trabajo termine, tu mente sigue revisando, y los mensajes del lunes por la mañana vuelven a encender esa tensión. Aguantas y luego te derrumbas de golpe, y debajo está el miedo a quedarte atrás si paras." } },
};
// 2026-09-27 (TODO F1-b): romance personas get a Module 1 (attachment) report so the fixtures cover
// two modules' module_map / module_deep pages; everyone else keeps the Module 3 (burnout) report.
const L1: any = {
  ko: { module: "모듈 1 · 연애 & 애착", type: "불안형 (Anxious-Preoccupied)", hook: "관계의 안정성을 자주 확인받고 싶어하고, 상대의 반응에 민감하게 반응하는 패턴입니다.", summary: "불안이 높고 회피는 낮은 편이에요.", dims: { anxiety: "불안", avoidance: "회피" },
        answers: [["연인의 답장이 늦으면 나는?", "무슨 일이 있는지 계속 확인하고 싶어진다"], ["가까워질수록 나는?", "편해지는 편이다"]],
        chat: { primary_concern: "답장이 늦으면 마음이 무너져요", emotional_state: "불안하고 조금 서운함", trigger_point: "읽고 답이 없는 메시지", repeat_pattern: "확인 메시지를 연달아 보내고 후회하기", core_fear_or_meaning: "결국 나를 떠날까 봐 무서워요", summary_quote: "답장이 늦으면 마음이 무너져요", integrated_summary: "상대의 답이 늦어지는 순간 불안이 켜지고, 확인 메시지를 연달아 보낸 뒤 후회하는 흐름이 반복됩니다. 그 밑에는 결국 떠날 거라는 두려움이 있습니다.",
                coping: "친구에게 캡처를 보여 주며 괜찮은지 물어봐요", relational: "상대 기분을 먼저 살피고 제 마음은 뒤로 미뤄요", desired_change: "답이 늦어도 제 하루를 지키고 싶어요",
                module_fields: { attachment_alarm: "메시지를 읽고 몇 시간째 답이 없을 때", protest_or_deactivate: "확인 메시지를 연달아 보내고, 답이 오면 괜히 차갑게 굴어요" } } },
  en: { module: "Module 1 · Love & Attachment", type: "Anxious-Preoccupied", hook: "Often needs reassurance about the relationship and reacts strongly to a partner's cues.", summary: "Anxiety runs high and avoidance runs low.", dims: { anxiety: "Anxiety", avoidance: "Avoidance" },
        answers: [["When my partner is slow to reply I…", "Keep wanting to check what's going on"], ["The closer we get, the more I…", "Relax"]],
        chat: { primary_concern: "When a reply is late, I fall apart", emotional_state: "Anxious and a little hurt", trigger_point: "A message read but not answered", repeat_pattern: "Sending check-in texts in a row, then regretting it", core_fear_or_meaning: "I'm scared they'll leave in the end", summary_quote: "When a reply is late, I fall apart", integrated_summary: "The moment a reply runs late, the anxiety switches on; you send check-in texts one after another and then regret it. Underneath is the fear that they will leave in the end.",
                coping: "I screenshot the chat and ask a friend if it's fine", relational: "I read their mood first and put my own feelings last", desired_change: "I want to keep my day intact even when a reply is late",
                module_fields: { attachment_alarm: "A message read with no reply for hours", protest_or_deactivate: "Texting again and again, then acting cold once they answer" } } },
  es: { module: "Módulo 1 · Amor y apego", type: "Apego ansioso", hook: "Necesita confirmar a menudo que la relación está bien y reacciona con fuerza a las señales de la pareja.", summary: "La ansiedad es alta y la evitación es baja.", dims: { anxiety: "Ansiedad", avoidance: "Evitación" },
        answers: [["Cuando mi pareja tarda en responder…", "Quiero comprobar una y otra vez qué pasa"], ["Cuanto más cerca estamos…", "Más tranquilidad siento"]],
        chat: { primary_concern: "Cuando una respuesta tarda, me derrumbo", emotional_state: "Ansiedad y algo de dolor", trigger_point: "Un mensaje leído y sin respuesta", repeat_pattern: "Mandar mensajes seguidos para comprobar y luego arrepentirme", core_fear_or_meaning: "Me da miedo que al final se vaya", summary_quote: "Cuando una respuesta tarda, me derrumbo", integrated_summary: "En cuanto una respuesta se retrasa, se enciende la ansiedad; mandas mensajes uno tras otro y luego te arrepientes. Debajo está el miedo a que al final se vaya.",
                coping: "Le mando capturas a una amiga para preguntarle si todo está bien", relational: "Leo primero su estado de ánimo y dejo lo mío para después", desired_change: "Quiero que mi día siga en pie aunque la respuesta tarde",
                module_fields: { attachment_alarm: "Un mensaje leído sin respuesta durante horas", protest_or_deactivate: "Escribir una y otra vez, y luego tomar distancia cuando responde" } } },
};
const v2Only = process.argv.includes("--v2-only");
const out: any = { deep: {}, year: {}, v2: {} };
if (!v2Only) await Promise.all(Object.entries(personas).map(async ([key, p]: [string, any]) => {
  const loc = p.locale as "ko" | "en" | "es"; const r = p.sajuResult;
  const moduleId = p.concern === "romance" ? "module1" : "module3";
  const c = moduleId === "module1" ? L1[loc] : L[loc];
  const [dimA, dimB] = Object.keys(c.dims);
  const ctx: any = { nickname: p.nickname, track: p.concern === "romance" ? "romance" : "career", elements: r.elements, moduleTitle: c.module, psychTestTypeTitle: c.type, psychTestTypeHook: c.hook,
    moduleId,
    dimensionResults: [{ dimension: dimA, direction: "high", percentOfMax: 82, intensity: "strong" }, { dimension: dimB, direction: "low", percentOfMax: 34, intensity: "moderate" }],
    dimensionShortNames: c.dims, nuancedSummary: c.summary,
    topAnswers: [{ dimension: dimA, dimensionLabel: c.dims[dimA], prompt: c.answers[0][0], label: c.answers[0][1] }, { dimension: dimB, dimensionLabel: c.dims[dimB], prompt: c.answers[1][0], label: c.answers[1][1] }],
    chatExtract: c.chat, includeCase: true, dayMaster: { char: r.fourPillars.day.sky, element: EL[r.fourPillars.day.skyElement] }, decadeFortune: r.decadeFortune, currentAge: r.currentAge, locale: loc, strengthsSplit: true };
  const day = r.fourPillars.day;
  const [content, year] = await Promise.all([
    getReportContent(ctx),
    getYearReportContent({ locale: loc, nickname: p.nickname, year: 2027, dayMasterChar: day.sky, dayMasterElement: EL[day.skyElement] as any, elements: r.elements,
      sajuTypeName: r.sajuType ? formatSajuTypeName(loc, r.sajuType) : null, yearFortune: getYearFortune(day.sky, day.earth, 2027), months: getMonthlyFortune(day.sky, day.earth, 2027),
      decadeFortune: r.decadeFortune, currentAge: r.currentAge } as any),
  ]);
  const quizDiagnosis = { moduleId, moduleTitle: c.module, track: ctx.track,
    answers: [{ qId: "qa-0", prompt: c.answers[0][0], label: c.answers[0][1], dimension: dimA, score: 3 }, { qId: "qa-1", prompt: c.answers[1][0], label: c.answers[1][1], dimension: dimB, score: 0 }],
    dimensionResults: [{ dimension: dimA, rawScore: 24.6, maxScore: 30, percentOfMax: 82, distanceFromMid: 64, direction: "high", intensity: "강함" }, { dimension: dimB, rawScore: 10.2, maxScore: 30, percentOfMax: 34, distanceFromMid: 32, direction: "low", intensity: "보통" }],
    classification: { activeDimensions: [dimA], kind: "single", typeKey: dimA }, typeInfo: { title: c.type, hook: c.hook }, nuancedSummary: c.summary,
    dimensionShortNames: c.dims, elements: r.elements, dominantElement: r.dominantElement };
  out.deep[key] = { content, quizDiagnosis, chatExtract: c.chat };
  out.year[key] = year;
  console.log(key, "ok");
}));
// ---- 5-set flow (flowVersion 2) fixtures ----
// Two readers with the app's real 30 quiz questions and a written chat. The set packets come from
// the same server code the chat route uses (buildSetPackets over the turn-numbered history), so
// the cards quote exactly what the reader "said". jisoo (ko) talks all 25 turns; lucia (es) ends
// at the 10-turn check-in, so sets 3–5 have no chat and their cards carry the quiz answer only.
type V2Spec = {
  moduleId: string;
  /** Score per question: strong dimensions 2–3, the rest 0–1 (overrides pin a few set quotes). */
  strong: Record<string, readonly number[]>;
  weak: readonly number[];
  overrides?: Record<string, number>;
  /** The reader's reply after bot turn k (index 0 = turn 1). Stops early for a 10-turn finish. */
  replies: string[];
  chat: Record<string, unknown>;
};
const V2: Record<string, V2Spec> = {
  jisoo: {
    moduleId: "module3",
    strong: { exhaustion: [3, 2, 3, 3, 2], efficacyLoss: [2, 3, 2, 2, 3] },
    weak: [1, 0, 1, 1, 0],
    overrides: { C3: 0, F8: 1, F2: 1 },
    replies: [
      "맞아요. 알람 끄고 누운 채로 오늘 해야 할 일 목록부터 떠올리는데, 그때 벌써 진이 빠져요.",
      "특히 월요일 아침이요. 일요일 밤부터 메신저 알림이 하나씩 쌓이는 게 보이면 잠도 설쳐요.",
      "양이요. 사람들은 다 괜찮은데, 제가 맡은 게 계속 늘어나요. 거절을 잘 못 해서요.",
      "몸이 무거운 쪽이에요. 마음은 아직 잘하고 싶은데 몸이 안 따라와요.",
      "계속 일 생각이요. 지하철에서도 내일 보고서 문장을 고치고 있어요.",
      "쉬어도 크게 달라지지 않아요. 주말 내내 누워 있었는데 월요일에 똑같이 피곤했어요.",
      "보통 금요일까지 몰아서 버티고, 주말에 쓰러지듯 자고, 일요일 저녁부터 다시 불안해져요. 그게 몇 달째 반복이에요.",
      "작년 연말 결산 때도 그랬어요. 그때는 프로젝트가 끝나면 괜찮아질 줄 알았는데 이번엔 끝이 안 보여요.",
      "일이 많은 거요. 알아주긴 하는데, 잘한다는 말을 들으면 일이 더 와요.",
      "조금 더 할게요.",
      "네, 새 프로젝트 리드를 맡았을 때 사실 기쁘기보다 무서웠어요. 언젠가 제가 별거 아니라는 게 드러날 것 같아서요.",
      "그래서 남들보다 두 번 세 번 확인해요. 실수 하나가 그동안 쌓은 걸 다 무너뜨릴 것 같거든요.",
      "빼 가는 건 끝없는 확인 작업이고, 채워 주는 건 퇴근 후에 동생이랑 통화하는 10분이요.",
      "제 안에서요. 아무도 쉬지 말라고 안 했는데, 쉬면 뒤처질 것 같아서 제가 못 쉬어요.",
      "솔직히 잘해 내는 제 모습이었던 것 같아요. 인정받을 때 살아 있는 느낌이었어요.",
      "그거 완전 저예요. 누우면 오늘 보낸 메일을 머릿속에서 다시 읽어요.",
      "그럴 땐 유튜브를 틀어 놓고 잠들 때까지 봐요. 생각을 끄려고요. 근데 그러면 새벽 두 시가 돼요.",
      "쉬면서도 일 생각이 나요. 카페에 가도 노트북을 챙겨 가요.",
      "혼자 끝까지 해요. 부탁하는 순간 제가 감당 못 한다고 인정하는 것 같아서요.",
      "팀장님이 한 번 괜찮냐고 물었는데, 괜찮다고 했어요. 아마 아무도 모를 거예요.",
      "네, 그건 맞아요. 지쳐도 결과물은 대충 넘기지 못해요. 그게 저를 힘들게도 하지만요.",
      "후배가 제 자료를 보고 덕분에 이해됐다고 할 때요. 그때는 피곤해도 기분이 좋아요.",
      "아침에 알람 없이 일어나서 한강 따라 천천히 걷고 싶어요. 아무 목적 없이요.",
      "친구였다면 그만 좀 확인하고 오늘은 일찍 자라고 했을 거예요. 그 정도면 충분히 했다고요.",
    ],
    chat: {
      primary_concern: "쉬어도 쉬는 것 같지 않아요", emotional_state: "지쳤고 조금 불안함", trigger_point: "월요일 아침 메신저 알림",
      repeat_pattern: "금요일까지 몰아서 버티고 주말에 쓰러지기", core_fear_or_meaning: "쉬면 뒤처지고, 언젠가 별거 아니라는 게 드러날까 봐 두려워요",
      summary_quote: "쉬어도 크게 달라지지 않아요",
      integrated_summary: "눈뜨자마자 오늘 할 일부터 떠올리며 지치고, 금요일까지 몰아서 버틴 뒤 주말에 쓰러지는 흐름이 몇 달째 이어집니다. 그 밑에는 쉬면 뒤처지고 언젠가 부족함이 드러날 거라는 두려움이 있고, 그래서 도움을 청하지 않고 혼자 끝까지 확인합니다.",
      coping: "잠들 때까지 유튜브를 틀어 놓아요", relational: "괜찮냐는 질문에 괜찮다고 해요", desired_change: "알람 없이 일어나 목적 없이 걷고 싶어요",
    },
  },
  lucia: {
    moduleId: "module1",
    strong: { anxiety: [3, 2, 3, 2, 3] },
    weak: [1, 0, 0, 1, 0],
    overrides: { V9: 0, V15: 0 },
    replies: [
      "Sí, me pasa mucho. Si llega con mala cara, me paso la noche pensando qué hice yo.",
      "La semana pasada contestó con un «ok» seco y estuve toda la tarde releyendo el chat para ver dónde me había equivocado.",
      "«¿Hice algo mal?», siempre esa primero. Aunque sepa que tenía una reunión.",
      "Quiero comprobarlo. Le escribo otra vez o miro si está en línea.",
      "Me alegra, pero me dura poco. Enseguida pienso que algún día dejará de hacerlo.",
      "Exacto. Si después de discutir no me escribe, no puedo concentrarme en nada hasta saber algo.",
      "Casi siempre igual: discutimos, me callo, luego le escribo yo para arreglarlo aunque no haya sido mi culpa, y al final me siento peor.",
      "Hago como si todo estuviera bien. Me da miedo que, si lo digo, se canse de mí.",
      "Doy yo el primer paso, siempre. Esperar se me hace eterno.",
      "Prefiero terminar aquí por hoy.",
    ],
    chat: {
      primary_concern: "Cuando una respuesta tarda, me derrumbo", emotional_state: "Ansiedad y algo de dolor", trigger_point: "Un «ok» seco después de una discusión",
      repeat_pattern: "Callarme, escribir yo para arreglarlo y sentirme peor", core_fear_or_meaning: "Me da miedo que se canse de mí",
      summary_quote: "Esperar se me hace eterno",
      integrated_summary: "Una señal pequeña, como un «ok» seco, enciende la pregunta de qué hiciste mal. Después de discutir te callas, das tú el primer paso aunque no sea tu culpa y terminas peor; debajo está el miedo a que la otra persona se canse de ti.",
      coping: "Releo el chat buscando el error", relational: "Doy el primer paso aunque no haya sido mi culpa", desired_change: "Quiero que mi día siga en pie aunque la respuesta tarde",
    },
  },
};

function v2QuizAnswers(spec: V2Spec, loc: "ko" | "en" | "es"): QuizAnswerRecord[] {
  const mod = getModuleById(spec.moduleId)!;
  const seen: Record<string, number> = {};
  return getLocalizedQuestions(mod, loc).map((q) => {
    const i = (seen[q.dimension] = (seen[q.dimension] ?? -1) + 1);
    const pattern = spec.strong[q.dimension] ?? spec.weak;
    const score = spec.overrides?.[q.id] ?? pattern[i % pattern.length];
    if (q.format === "slider" || q.format === "slider-reverse") {
      const v = score >= 2 ? 8 : 3;
      return { qId: q.id, dimension: q.dimension, prompt: q.prompt, label: `${v}/10`, score: scoreSliderValue(q.format, v) };
    }
    const opts = q.options as { label: string; score: number }[];
    const opt = opts.find((o) => o.score === score) ?? opts[0];
    return { qId: q.id, dimension: q.dimension, prompt: q.prompt, label: opt.label, score: opt.score };
  });
}

const QUIZ_COMBINED: Record<string, string> = { ko: "복합형", en: "Combined type", es: "Tipo combinado" };
await Promise.all(Object.entries(V2).map(async ([key, spec]) => {
  const p = personas[key];
  const loc = p.locale as "ko" | "en" | "es"; const r = p.sajuResult;
  const mod = getModuleById(spec.moduleId)!;
  const names = resolveModuleLocale(mod, loc);
  const answers = v2QuizAnswers(spec, loc);
  const dimensionResults = computeAllDimensionResults(answers, mod.dimensionItemCounts);
  const classification = classifyProfile(dimensionResults);
  const typeInfo = resolveTypeName(classification, names.typeNames, (dims) => ({ title: dims.map((d) => names.dimensionShortNames[d] ?? d).join("+") + " " + QUIZ_COMBINED[loc], hook: "" }));
  const nuancedSummary = generateNuancedSummary(dimensionResults, names.dimensionLabels, loc);

  // [bot 1, reply 1, bot 2, reply 2, ...] — the shape the app sends the chat route.
  const history: SetHistoryMessage[] = spec.replies.flatMap((text, i) => [
    { role: "assistant" as const, content: `(turn ${i + 1})` },
    { role: "user" as const, content: text },
  ]);
  const set_packets = buildSetPackets(history, getModuleChatSets(spec.moduleId)!, sanitizeQuizAnswers(answers));
  const chatExtract = { ...spec.chat, set_packets };

  const ctx: any = { nickname: p.nickname, track: mod.track, elements: r.elements, moduleTitle: names.title, psychTestTypeTitle: typeInfo.title, psychTestTypeHook: typeInfo.hook,
    dimensionResults: dimensionResults.map((d) => ({ dimension: d.dimension, direction: d.direction, percentOfMax: d.percentOfMax, intensity: d.intensity })),
    dimensionShortNames: names.dimensionShortNames, nuancedSummary, topAnswers: [], chatExtract,
    dayMaster: { char: r.fourPillars.day.sky, element: EL[r.fourPillars.day.skyElement] }, decadeFortune: r.decadeFortune, currentAge: r.currentAge, locale: loc,
    strengthsSplit: true, flowVersion: 2, quizAnswers: answers };
  // Same steps as /api/report (free half for a non-buyer) → /api/report/paid (after the purchase).
  const reportSets = resolveReportSets(spec.moduleId, 2, answers, set_packets);
  if (!reportSets) throw new Error(`${key}: not a 5-set request`);
  const free: any = await getReportContent({ ...ctx, moduleId: spec.moduleId, includeCase: ["module1", "module3"].includes(spec.moduleId), part: "free", reportSets });
  const freePart = {
    title_line1: free.title_line1, title_line2: free.title_line2, subtitle: free.subtitle, opening_scene: free.opening_scene, case_tag: free.case_tag,
    oheng_intro: free.oheng_intro, quiz_reading: free.quiz_reading,
    element_readings: Object.fromEntries(Object.entries(free.element_readings ?? {}).map(([k, v]: [string, any]) => [k, { heading: v?.heading ?? "" }])),
    module_map: free.module_map, strengths_preview: free.strengths_preview, set_card_1: free.set_card_1,
  };
  const locked = await getPaidPart({ ...ctx, moduleId: spec.moduleId, includeCase: false, reportSets }, freePart);
  const content = { ...free, ...locked };
  const quizDiagnosis = { moduleId: spec.moduleId, moduleTitle: names.title, track: mod.track, answers, dimensionResults, classification, typeInfo, nuancedSummary,
    dimensionShortNames: names.dimensionShortNames, elements: r.elements, dominantElement: r.dominantElement };
  out.v2[key] = { content, quizDiagnosis, chatExtract };
  console.log(key, "v2 ok");
}));

const src = fs.readFileSync(dataFile, "utf8");
const v2Block =
  "// 5-set chat flow (flowVersion 2) reports with test × conversation cards — scripts/gen-qa-fixtures.mts.\n" +
  "export const QA_DEEP_REPORT_V2: Record<string, { content: any; quizDiagnosis: any; chatExtract: any }> = " + JSON.stringify(out.v2, null, 1) + ";\n";
const v2At = src.indexOf("// 5-set chat flow (flowVersion 2)");
const withoutV2 = v2At >= 0 ? src.slice(0, v2At) : src;
if (v2Only) {
  fs.writeFileSync(dataFile, withoutV2.replace(/\n*$/, "\n\n") + v2Block);
} else {
  const head = src.slice(0, src.indexOf("export const QA_DEEP_REPORT"));
  fs.writeFileSync(
    dataFile,
    head +
      "export const QA_DEEP_REPORT: Record<string, { content: any; quizDiagnosis: any; chatExtract: any }> = " + JSON.stringify(out.deep, null, 1) + ";\n\n" +
      "export const QA_YEAR_REPORT: Record<string, any> = " + JSON.stringify(out.year, null, 1) + ";\n\n" +
      v2Block
  );
}
console.log("wrote", dataFile);
