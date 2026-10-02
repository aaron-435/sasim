/**
 * scripts/dump-chat-prompt.mts
 * ------------------------------------------------------------------
 * 챗봇 시스템 프롬프트를 OpenAI 호출 없이 출력한다(lib/chatPrompts.ts 확인용).
 *
 *   npx tsx scripts/dump-chat-prompt.mts <moduleId> <턴,턴,...> [ko|en|es] [--legacy] [--elapsed N]
 *   예) npx tsx scripts/dump-chat-prompt.mts module1 1,6,10,11,24,25 ko
 *       npx tsx scripts/dump-chat-prompt.mts module1 7 ko --legacy > before.txt
 *
 * 기본은 5세트 흐름(flowVersion 2): 실제 퀴즈 정의(mobile/lib/quiz)에서 30문항 답을 만든다 —
 * 모듈의 첫 차원 문항은 2~3점, 나머지 차원은 0~1점(첫 차원이 강한 사람). --legacy는 flowVersion과
 * 30문항 없이 지금 앱 이전 요청(20턴 흐름)과 같은 context다. --elapsed는 대화 경과 분(기본 0).
 *
 * stdout에는 프롬프트만 나온다(턴이 여럿이면 사이에 구분 줄). 턴별 요약(세트·위치, 인용 문항,
 * 프롬프트에 들어간 퀴즈 문항 수)은 stderr로 나온다 — 그래서 `> 파일`로 받으면 프롬프트만 남아 diff할 수 있다.
 * ------------------------------------------------------------------
 */

import { buildChatSystemPrompt, chatFlowVersion, effectiveSetTurnRole, type ChatSessionContext } from "../lib/chatPrompts.ts";
import { sanitizeQuizAnswers, selectSetQuizAnswer, type SetQuizAnswer } from "../lib/chatSets.ts";
import { getModuleChatSets } from "../lib/modulePlaybooks.ts";
import type { Locale } from "../lib/i18n/types.ts";
import { getLocalizedQuestions, getModuleById } from "../mobile/lib/quiz/modules.ts";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const elapsedIdx = args.indexOf("--elapsed");
const elapsed = elapsedIdx >= 0 ? Number(args[elapsedIdx + 1]) : 0;
const positional = args.filter((a, i) => !a.startsWith("--") && !(elapsedIdx >= 0 && i === elapsedIdx + 1));
const [moduleId, turnsArg, localeArg = "ko"] = positional;
if (!moduleId || !turnsArg) {
  console.error("사용법: npx tsx scripts/dump-chat-prompt.mts <moduleId> <턴,턴,...> [ko|en|es] [--legacy] [--elapsed N]");
  process.exit(1);
}
const locale = localeArg as Locale;
const turns = turnsArg.split(",").map(Number).filter((n) => Number.isFinite(n) && n > 0);
const legacy = flags.has("--legacy");

/** 첫 차원이 강한 사람의 30문항 답. 첫 차원 3·2점 번갈아, 나머지 1·0점 번갈아. */
function buildQuizAnswers(): SetQuizAnswer[] {
  const quiz = getModuleById(moduleId);
  if (!quiz) throw new Error(`퀴즈 없음: ${moduleId}`);
  const questions = getLocalizedQuestions(quiz, locale);
  const firstDim = questions[0]?.dimension;
  let hi = 0;
  let lo = 0;
  return questions.map((q) => {
    const score = q.dimension === firstDim ? (hi++ % 2 === 0 ? 3 : 2) : lo++ % 2 === 0 ? 1 : 0;
    const label = Array.isArray(q.options)
      ? (q.options.find((o) => o.score === score) ?? q.options[q.options.length - 1]).label
      : `${score >= 2 ? 8 : 3}/10`;
    return { qId: q.id, dimension: q.dimension, prompt: q.prompt, label, score };
  });
}

// 20턴 흐름 context. 숫자·문구를 바꾸면 --legacy 기준 출력과 비교할 수 없게 되니 그대로 둔다.
const baseContext: ChatSessionContext = {
  track: "romance",
  sajuElements: { wood: 17, fire: 33, earth: 0, metal: 17, water: 33 },
  dominantSajuElement: "fire",
  psychTestType: "불안형 (Anxious-Preoccupied)",
  psychTestSummary: "관계에서 버려질까 하는 불안이 높고, 회피는 낮은 편이에요.",
  quizAnswer: { prompt: "연인이 답장이 늦으면?", label: "무슨 일 있나 계속 휴대폰을 확인한다" },
  quizAnswerPool: [
    { prompt: "다툰 뒤 나는?", label: "먼저 연락하지 않으면 불안해서 견딜 수 없다" },
    { prompt: "가장 두려운 건?", label: "결국 떠나버리는 것" },
  ],
  moduleId,
  locale,
};

const quizAnswers = legacy ? [] : sanitizeQuizAnswers(buildQuizAnswers());
const context: ChatSessionContext = legacy ? baseContext : { ...baseContext, flowVersion: 2, quizAnswers };
const flow = chatFlowVersion(context);
const chatSets = getModuleChatSets(moduleId);
console.error(`[dump] ${moduleId} ${locale} 흐름 v${flow}${legacy ? " (--legacy)" : ""}, 경과 ${elapsed}분, 퀴즈 답 ${quizAnswers.length}개`);

turns.forEach((turn, i) => {
  const prompt = buildChatSystemPrompt(turn, context, elapsed);
  if (flow === 2 && chatSets) {
    const role = effectiveSetTurnRole(turn, elapsed);
    const quote = role.kind === "set" && role.position === 1 && role.set ? selectSetQuizAnswer(chatSets, role.set, quizAnswers) : null;
    const inPrompt = quizAnswers.filter((a) => prompt.includes(`"${a.prompt}"`)).map((a) => a.qId);
    console.error(
      `[dump] 턴 ${turn}: ${role.kind}${role.set ? ` 세트 ${role.set}` : ""}${role.position ? ` ①~⑤ 중 ${role.position}` : ""}` +
        `${role.recapSets.length ? `, 정리 세트 ${role.recapSets.join("·")}` : ""}` +
        `${role.kind === "set" && role.position === 1 ? `, 인용 ${quote ? `${quote.qId}(${quote.score}점)` : "없음(기본 질문)"}` : ""}` +
        `, 프롬프트 속 퀴즈 문항 ${inPrompt.length}/${quizAnswers.length}${inPrompt.length ? ` [${inPrompt.join(",")}]` : ""}`
    );
  } else {
    console.error(`[dump] 턴 ${turn}: 20턴 흐름`);
  }
  if (i > 0) process.stdout.write(`\n${"=".repeat(30)} 턴 ${turn} ${"=".repeat(30)}\n\n`);
  process.stdout.write(`${prompt}\n`);
});
