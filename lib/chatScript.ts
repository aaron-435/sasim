/**
 * lib/chatScript.ts
 * ------------------------------------------------------------------
 * 고정 스크립트형 선택지 챗(flowVersion 4)의 순수 엔진. OpenAI 호출도,
 * 네트워크 import도 없다(`npx tsx`로 환경변수 없이 돈다). 문구는 만들지
 * 않고 lib/choiceScripts/의 데이터를 그대로 꺼내 조립한다.
 * ------------------------------------------------------------------
 */

import {
  FREE_GIST,
  FREE_REACTION_POOL,
  PERSPECTIVE_LEAD_LINE,
  QUOTE_LINE_TEMPLATE,
  SKIP_ANSWER_TEXT,
} from "./choiceScripts/common";
import type { ModuleScript } from "./choiceScripts/types";

/** buildScriptReply가 읽는 대화 기록 한 줄. */
export interface ScriptHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

/** 앞뒤 공백·연속 공백을 걷어낸다. 보기 탭 문구와 비교하는 기준 형태다. */
export function normalizeAnswerText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/**
 * k번째 봇 메시지 바로 뒤 첫 사용자 메시지가 k턴 답이다
 * (lib/chatChoices.ts의 collectAnswerByTurn과 같은 규칙).
 */
export function collectAnswerByTurn(history: readonly ScriptHistoryMessage[]): Map<number, string> {
  const answerByTurn = new Map<number, string>();
  let botTurn = 0;
  for (const msg of history) {
    if (msg.role === "assistant") {
      botTurn += 1;
      continue;
    }
    if (msg.role !== "user" || botTurn === 0 || answerByTurn.has(botTurn)) continue;
    if (typeof msg.content !== "string") continue;
    const text = normalizeAnswerText(msg.content);
    if (text) answerByTurn.set(botTurn, text);
  }
  return answerByTurn;
}

/**
 * gist 뒤 받침 판정. 마지막 글자가 한글 음절이면 (code-0xAC00)%28!==0일 때
 * 받침 있음, 한글이 아니면 받침 있음으로 본다. `말`의 ㄹ도 일반 받침이다.
 */
export function hasFinalConsonant(word: string): boolean {
  const chars = Array.from(word.trim());
  const last = chars[chars.length - 1];
  if (last === undefined) return true;
  const code = last.codePointAt(0) ?? 0;
  if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28 !== 0;
  return true;
}

/** `{gN}`·`{gN:A/B}` 템플릿을 답 기록으로 채운다. */
function fillGistTemplate(template: string, gistByTurn: (turn: number) => string): string {
  return template.replace(/\{g(\d+)(?::([^}/]+)\/([^}]+))?\}/g, (_m, turn: string, a: string | undefined, b: string | undefined) => {
    const gist = gistByTurn(Number(turn));
    if (a === undefined || b === undefined) return gist;
    return gist + (hasFinalConsonant(gist) ? a : b);
  });
}

/** 끝 어미 두 음절(마침표 제외, 예: "군요"). 반응 끝맺음 반복 검사와 같은 기준이다. */
function endingOf(line: string): string {
  return Array.from(line)
    .filter((ch) => ch >= "가" && ch <= "힣")
    .slice(-2)
    .join("");
}

/**
 * 직접 쓴 답에 붙는 짧은 고정 반응을 상태 없이 고른다. 직전 봇 메시지 첫 줄이
 * 풀에 있으면 그 줄을 피하고, 끝 어미가 같은 줄(예: "군요"끼리)도 피한 뒤
 * 나머지에서 턴 번호와 답 길이로 결정적으로 고른다.
 */
function pickFreeReaction(answer: string, turnNumber: number, prevBotFirstLine: string): string {
  const prevIndex = FREE_REACTION_POOL.indexOf(prevBotFirstLine);
  const prevEnding = endingOf(prevBotFirstLine);
  const candidates = FREE_REACTION_POOL.filter((line, i) => i !== prevIndex && endingOf(line) !== prevEnding);
  const pool = candidates.length > 0 ? candidates : [...FREE_REACTION_POOL];
  return pool[(turnNumber + answer.length) % pool.length];
}

/** history에서 마지막 봇 메시지의 첫 줄. 없으면 빈 문자열. */
function lastBotFirstLine(history: readonly ScriptHistoryMessage[]): string {
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].role === "assistant" && typeof history[i].content === "string") {
      return normalizeAnswerText(history[i].content.split("\n")[0] ?? "");
    }
  }
  return "";
}

/**
 * 앞 턴 답에 대한 반응 줄. 보기와 정확히 일치하면 그 보기의 reaction,
 * 직접 쓴 글이면 고정 풀에서 고른다. 건너뜀·빈 답이면 없음.
 */
function reactionForAnswer(
  script: ModuleScript,
  prevTurn: number,
  answerByTurn: Map<number, string>,
  turnNumber: number,
  prevFirstLine: string,
): string | null {
  const answer = answerByTurn.get(prevTurn);
  if (!answer || answer === SKIP_ANSWER_TEXT) return null;
  const options = script.turns[prevTurn]?.options;
  const picked = options?.find((o) => normalizeAnswerText(o.text) === answer);
  if (picked) return picked.reaction;
  return pickFreeReaction(answer, turnNumber, prevFirstLine);
}

/** N턴 답의 gist. 보기와 일치하면 그 보기 gist, 아니면 FREE_GIST. */
function gistForTurn(script: ModuleScript, answerByTurn: Map<number, string>, turn: number): string {
  const answer = answerByTurn.get(turn);
  if (answer && answer !== SKIP_ANSWER_TEXT) {
    const picked = script.turns[turn]?.options?.find((o) => normalizeAnswerText(o.text) === answer);
    if (picked) return picked.gist;
  }
  return FREE_GIST;
}

export interface BuildScriptReplyParams {
  script: ModuleScript;
  turnNumber: number;
  history: readonly ScriptHistoryMessage[];
  /** 퀴즈 인용 턴(1·5·10·14·18)의 실제 퀴즈 답. 없으면 인용 줄을 붙이지 않는다. */
  quoteLabel?: string | null;
}

export interface ScriptReply {
  lines: string[];
  choices?: string[];
  inputOnly?: boolean;
}

/**
 * 고정 스크립트 N번째 응답을 만든다. 9턴은 체크포인트, 22턴 이상은 마무리,
 * 그 밖(1~8, 10~21)은 반응 줄 + 인용·고정 문구 + 질문이다. 22턴 전에
 * 마무리로 당겨진 경우에도 답이 없는 턴의 gist는 FREE_GIST로 채운다.
 */
export function buildScriptReply({ script, turnNumber, history, quoteLabel }: BuildScriptReplyParams): ScriptReply {
  const answerByTurn = collectAnswerByTurn(history);
  const prevFirstLine = lastBotFirstLine(history);
  const gistByTurn = (turn: number): string => gistForTurn(script, answerByTurn, turn);

  // 22턴 이상: 마무리. 반응 줄(21턴) + 정리 3줄 + 관점 줄(실제 글 있을 때만) + 안내 줄.
  if (turnNumber >= 22) {
    const lines: string[] = [];
    const reaction = reactionForAnswer(script, 21, answerByTurn, turnNumber, prevFirstLine);
    if (reaction) lines.push(reaction);
    for (const template of script.closing.summary) lines.push(fillGistTemplate(template, gistByTurn));
    const answer21 = answerByTurn.get(21);
    if (answer21 && answer21 !== SKIP_ANSWER_TEXT) lines.push(script.closing.perspectiveLine);
    lines.push(script.closing.finalLine);
    return { lines };
  }

  // 9턴: 체크포인트. 반응 줄(8턴) + 틀 3줄. 보기는 앱 두 버튼이 맡는다.
  if (turnNumber === 9) {
    const lines: string[] = [];
    const reaction = reactionForAnswer(script, 8, answerByTurn, turnNumber, prevFirstLine);
    if (reaction) lines.push(reaction);
    for (const template of script.checkpoint) lines.push(fillGistTemplate(template, gistByTurn));
    return { lines };
  }

  // 보기 턴(1~8, 10~21). 반응 줄 + 20턴 고정 문구 + 인용 줄 + 질문.
  const turn = script.turns[turnNumber];
  if (!turn) throw new Error(`고정 스크립트 턴 없음: ${script.moduleId} ${turnNumber}턴`);
  const lines: string[] = [];
  if (turnNumber > 1) {
    const reaction = reactionForAnswer(script, turnNumber - 1, answerByTurn, turnNumber, prevFirstLine);
    if (reaction) lines.push(reaction);
  }
  if (turnNumber === 20) lines.push(PERSPECTIVE_LEAD_LINE);
  if (turn.quote && quoteLabel) lines.push(QUOTE_LINE_TEMPLATE.replace("{label}", quoteLabel));
  lines.push(turn.question);
  if (!turn.options || turn.options.length === 0) return { lines, inputOnly: true };
  return { lines, choices: turn.options.map((o) => o.text) };
}
