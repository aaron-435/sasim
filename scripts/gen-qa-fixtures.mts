// Regenerates QA_DEEP_REPORT / QA_YEAR_REPORT in qaData.ts for every persona with the REAL report
// and year-report prompts (about 7 x $0.07, ~1 minute). Run after changing those prompts:
//   cd <repo root> && npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts
// Node-only tooling: never imported by the app.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getReportContent } from "../lib/report.ts";
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
const out: any = { deep: {}, year: {} };
await Promise.all(Object.entries(personas).map(async ([key, p]: [string, any]) => {
  const loc = p.locale as "ko" | "en" | "es"; const r = p.sajuResult;
  const moduleId = p.concern === "romance" ? "module1" : "module3";
  const c = moduleId === "module1" ? L1[loc] : L[loc];
  const [dimA, dimB] = Object.keys(c.dims);
  const ctx: any = { nickname: p.nickname, track: p.concern === "romance" ? "romance" : "career", elements: r.elements, moduleTitle: c.module, psychTestTypeTitle: c.type, psychTestTypeHook: c.hook,
    moduleId,
    dimensionResults: [{ dimension: dimA, direction: "high", percentOfMax: 82, intensity: "strong" }, { dimension: dimB, direction: "low", percentOfMax: 34, intensity: "moderate" }],
    dimensionShortNames: c.dims, nuancedSummary: c.summary,
    topAnswers: [{ dimension: dimA, dimensionLabel: c.dims[dimA], prompt: c.answers[0][0], label: c.answers[0][1] }, { dimension: dimB, dimensionLabel: c.dims[dimB], prompt: c.answers[1][0], label: c.answers[1][1] }],
    chatExtract: c.chat, includeCase: true, dayMaster: { char: r.fourPillars.day.sky, element: EL[r.fourPillars.day.skyElement] }, decadeFortune: r.decadeFortune, currentAge: r.currentAge, locale: loc };
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
const src = fs.readFileSync(dataFile, "utf8");
const head = src.slice(0, src.indexOf("export const QA_DEEP_REPORT"));
fs.writeFileSync(
  dataFile,
  head +
    "export const QA_DEEP_REPORT: Record<string, { content: any; quizDiagnosis: any; chatExtract: any }> = " + JSON.stringify(out.deep, null, 1) + ";\n\n" +
    "export const QA_YEAR_REPORT: Record<string, any> = " + JSON.stringify(out.year, null, 1) + ";\n"
);
console.log("wrote", dataFile);
