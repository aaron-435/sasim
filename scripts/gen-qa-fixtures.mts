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
const out: any = { deep: {}, year: {} };
await Promise.all(Object.entries(personas).map(async ([key, p]: [string, any]) => {
  const loc = p.locale as "ko" | "en" | "es"; const c = L[loc]; const r = p.sajuResult;
  const ctx: any = { nickname: p.nickname, track: p.concern === "romance" ? "romance" : "career", elements: r.elements, moduleTitle: c.module, psychTestTypeTitle: c.type, psychTestTypeHook: c.hook,
    dimensionResults: [{ dimension: "perfectionism", direction: "high", percentOfMax: 82, intensity: "strong" }, { dimension: "recovery", direction: "low", percentOfMax: 34, intensity: "moderate" }],
    dimensionShortNames: c.dims, nuancedSummary: c.summary,
    topAnswers: [{ dimension: "perfectionism", dimensionLabel: c.dims.perfectionism, prompt: c.answers[0][0], label: c.answers[0][1] }, { dimension: "recovery", dimensionLabel: c.dims.recovery, prompt: c.answers[1][0], label: c.answers[1][1] }],
    chatExtract: c.chat, includeCase: true, dayMaster: { char: r.fourPillars.day.sky, element: EL[r.fourPillars.day.skyElement] }, decadeFortune: r.decadeFortune, currentAge: r.currentAge, locale: loc };
  const day = r.fourPillars.day;
  const [content, year] = await Promise.all([
    getReportContent(ctx),
    getYearReportContent({ locale: loc, nickname: p.nickname, year: 2027, dayMasterChar: day.sky, dayMasterElement: EL[day.skyElement] as any, elements: r.elements,
      sajuTypeName: r.sajuType ? formatSajuTypeName(loc, r.sajuType) : null, yearFortune: getYearFortune(day.sky, day.earth, 2027), months: getMonthlyFortune(day.sky, day.earth, 2027),
      decadeFortune: r.decadeFortune, currentAge: r.currentAge } as any),
  ]);
  const quizDiagnosis = { moduleId: "module3", moduleTitle: c.module, track: ctx.track,
    answers: [{ qId: "qa-0", prompt: c.answers[0][0], label: c.answers[0][1], dimension: "perfectionism", score: 3 }, { qId: "qa-1", prompt: c.answers[1][0], label: c.answers[1][1], dimension: "recovery", score: 0 }],
    dimensionResults: [{ dimension: "perfectionism", rawScore: 24.6, maxScore: 30, percentOfMax: 82, distanceFromMid: 64, direction: "high", intensity: "강함" }, { dimension: "recovery", rawScore: 10.2, maxScore: 30, percentOfMax: 34, distanceFromMid: 32, direction: "low", intensity: "보통" }],
    classification: { activeDimensions: ["perfectionism"], kind: "single", typeKey: "perfectionism" }, typeInfo: { title: c.type, hook: c.hook }, nuancedSummary: c.summary,
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
