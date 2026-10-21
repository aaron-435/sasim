/**
 * scripts/run-choice-script.mts
 * ------------------------------------------------------------------
 * 고정 스크립트 엔진(flowVersion 4) 확인용. OpenAI를 쓰지 않고
 * buildScriptReply만으로 module3 1~22턴을 돌려 출력한다.
 *
 *   npx tsx scripts/run-choice-script.mts
 *
 * 시나리오 3개: (a) 매 턴 첫 번째 보기, (b) 보기와 직접 쓴 글 섞기
 * (3·7·12·21턴 직접 입력), (c) (a)와 같되 21턴 건너뛰기.
 * 9턴·22턴은 조사 치환을 사람이 읽을 수 있게 줄 전체를 이어서도 찍는다.
 * ------------------------------------------------------------------
 */

import { buildScriptReply, type ScriptHistoryMessage } from "../lib/chatScript.ts";
import { getModuleScript } from "../lib/choiceScripts/index.ts";
import { QUOTE_LINE_TEMPLATE, SKIP_ANSWER_TEXT } from "../lib/choiceScripts/common.ts";
import { getChoiceTurnRole } from "../lib/chatChoices.ts";
import { sanitizeQuizAnswers, selectSetQuizAnswer, type SetQuizAnswer } from "../lib/chatSets.ts";
import { getModuleChatSets } from "../lib/modulePlaybooks.ts";
import { getLocalizedQuestions, getModuleById } from "../mobile/lib/quiz/modules.ts";

const MODULE_ID = "module3";
const QUOTE_TURNS = [1, 5, 10, 14, 18];

/** dump-chat-prompt.mts와 같은 방식: 첫 차원이 강한 사람의 30문항 답. */
function buildQuizAnswers(): SetQuizAnswer[] {
  const quiz = getModuleById(MODULE_ID);
  if (!quiz) throw new Error(`퀴즈 없음: ${MODULE_ID}`);
  const questions = getLocalizedQuestions(quiz, "ko");
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

const script = getModuleScript(MODULE_ID);
if (!script) throw new Error(`스크립트 없음: ${MODULE_ID}`);
const chatSets = getModuleChatSets(MODULE_ID);
if (!chatSets) throw new Error(`세트 없음: ${MODULE_ID}`);
const quizAnswers = sanitizeQuizAnswers(buildQuizAnswers());

/** getChatReplyV4와 같은 방식으로 인용 답을 고른다. */
function quoteLabelFor(turn: number): string | null {
  const role = getChoiceTurnRole(turn);
  if (!role.set || !QUOTE_TURNS.includes(turn)) return null;
  return selectSetQuizAnswer(chatSets!, role.set, quizAnswers)?.label ?? null;
}

// 시나리오별 사용자 답. null이면 사용자 메시지를 쌓지 않는다(9턴 체크포인트).
type AnswerFn = (turn: number, firstOption: string | null) => string | null;
const FIRST_OPTION: AnswerFn = (_turn, firstOption) =>
  firstOption ?? "그날의 나에게 수고했다고 말해주고 싶어요.";
const MIXED_FREE: Record<number, string> = {
  3: "몸도 마음도 다 지친 것 같아요.",
  7: "일이 끝이 없어서 그래요.",
  12: "처음엔 동료들이 좋아서 다녔어요.",
  21: "그때의 나에게 수고했다고 말해주고 싶어요.",
};
const MIXED: AnswerFn = (turn, firstOption) => MIXED_FREE[turn] ?? firstOption ?? MIXED_FREE[21];
const SKIP_LAST: AnswerFn = (turn, firstOption) =>
  turn === 21 ? SKIP_ANSWER_TEXT : (firstOption ?? MIXED_FREE[21]);

const SCENARIOS: { name: string; answer: AnswerFn }[] = [
  { name: "(a) 매 턴 첫 번째 보기", answer: FIRST_OPTION },
  { name: "(b) 보기 + 직접 입력(3·7·12·21턴)", answer: MIXED },
  { name: "(c) (a)와 같되 21턴 건너뛰기", answer: SKIP_LAST },
];

for (const { name, answer } of SCENARIOS) {
  console.log(`\n${"=".repeat(20)} 시나리오 ${name} ${"=".repeat(20)}`);
  const history: ScriptHistoryMessage[] = [];
  for (let turn = 1; turn <= 22; turn++) {
    const quoteLabel = quoteLabelFor(turn);
    const reply = buildScriptReply({ script, turnNumber: turn, history, quoteLabel });
    console.log(`\n[T${turn}]`);
    reply.lines.forEach((line, i) => console.log(`  ${i + 1}. ${line}`));
    if (reply.choices) console.log(`  choices: ${reply.choices.map((c) => `"${c}"`).join(" / ")}`);
    else console.log(`  choices: (없음)${reply.inputOnly ? " inputOnly" : ""}`);
    if ((turn === 9 || turn === 22) && quoteLabel && script.turns[turn]?.quote) {
      console.log(`  (인용 확인: ${QUOTE_LINE_TEMPLATE.replace("{label}", quoteLabel)})`);
    }
    if (turn === 9 || turn === 22) console.log(`  [전체] ${reply.lines.join(" ")}`);
    // 9턴 체크포인트와 22턴 마무리 뒤에는 사용자 메시지를 쌓지 않는다.
    const userText = turn === 9 || turn === 22 ? null : answer(turn, script.turns[turn]?.options?.[0]?.text ?? null);
    history.push({ role: "assistant", content: reply.lines.join("\n") });
    if (userText !== null) {
      console.log(`  > 사용자: ${userText}`);
      history.push({ role: "user", content: userText });
    }
  }
}
