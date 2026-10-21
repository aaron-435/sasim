/**
 * lib/chatChoices.ts
 * ------------------------------------------------------------------
 * 선택지 분기형 챗(flowVersion 3)의 순수 함수. OpenAI 호출도, 프롬프트
 * 문장도 없다. 프롬프트 빌더(lib/chatPrompts.ts)와 라우트가 이 결과를 읽는다.
 *
 *   - getChoiceTurnRole(): 턴 번호 → 묶음·단계·필드·체크포인트/마무리
 *   - limitCheckpointLinesV3(): 9턴 체크포인트 3줄 제한(질문 줄 유지)
 *
 * 턴 배치는 CHOICE_CHAT_DESIGN.md 2절 / SPEC.md를 그대로 옮겼다:
 *   1–4 S1(A1·A2·B1·B2) · 5–8 S2(A1·A2·B1·B2) · 9 정리+점검
 *   10–13 S3 · 14–17 S4 · 18–21 S5(20 고정 문구+관점 전환) · 22 마무리
 *
 * 2026-10-20: 추가(선택지 분기형 프로토타입).
 * ------------------------------------------------------------------
 */

import { CHAT_SET_THEMES, type ChatSetNumber, type ModuleChatSets } from "./modulePlaybooks";
import { SKIP_ANSWER_TEXT } from "./choiceScripts/common";
import {
  SET_ANSWER_MAX,
  selectAllSetQuizAnswers,
  type SetHistoryMessage,
  type SetPacket,
  type SetQuizAnswer,
} from "./chatSets";

export const TOTAL_TURNS_V3 = 22;
export const CHECKPOINT_TURN_V3 = 9;
export const PERSPECTIVE_LEAD_TURN_V3 = 20;

export interface ChoiceTurnRole {
  turn: number;
  kind: "set" | "checkpoint" | "closing";
  /** 이 턴이 속한 세트. 마무리 턴은 null. */
  set: ChatSetNumber | null;
  /** kind === "set"일 때만 값이 있다. A1·A2 묶음 또는 B1·B2 묶음. */
  bundle: "A" | "B" | null;
  /** kind === "set"일 때만 값이 있다. 1 갈래 고르기, 2 고른 쪽 한 겹 더. */
  step: 1 | 2 | null;
  /** A2·B2 턴에서 이 묶음이 정하는 추출 필드 키. 나머지 턴은 null. */
  field: string | null;
  /** 1턴만 true(인사 + 세트 1 A1). */
  greeting: boolean;
}

/** A2·B2 턴 → 그 묶음이 정하는 추출 필드 키(TODO 5 묶음→필드 매핑이 쓴다). */
export const CHOICE_FIELD_BY_TURN: Record<number, string> = {
  2: "trigger_point",
  4: "emotional_state",
  6: "repeat_pattern",
  8: "demand_drain",
  11: "core_fear_or_meaning",
  13: "resource_left",
  15: "coping",
  17: "relational",
  19: "desired_change",
  21: "perspective_answer",
};

/** 세트별 시작 턴. 세트는 4턴씩(A1·A2·B1·B2), 9턴(체크포인트)이 사이를 가른다. */
const CHOICE_SET_START: Record<ChatSetNumber, number> = { 1: 1, 2: 5, 3: 10, 4: 14, 5: 18 };

/**
 * 턴 번호(1부터) → 이 턴의 역할. 22 이상은 마무리로 고정한다(서버가 끝을 정한다는
 * 기존 원칙과 같다). 1 미만이나 정수가 아닌 값은 1턴으로 본다.
 * 시간 초과로 앞당긴 마무리는 여기서 다루지 않는다(isFinalTurn이 판단).
 */
export function getChoiceTurnRole(turnNumber: number): ChoiceTurnRole {
  const turn = Number.isFinite(turnNumber) ? Math.max(1, Math.floor(turnNumber)) : 1;
  if (turn >= TOTAL_TURNS_V3) {
    return { turn, kind: "closing", set: null, bundle: null, step: null, field: null, greeting: false };
  }
  if (turn === CHECKPOINT_TURN_V3) {
    return { turn, kind: "checkpoint", set: 2, bundle: null, step: null, field: null, greeting: false };
  }
  const set = (turn <= 4 ? 1 : turn <= 8 ? 2 : turn <= 13 ? 3 : turn <= 17 ? 4 : 5) as ChatSetNumber;
  const rel = turn - CHOICE_SET_START[set];
  const bundle = (rel < 2 ? "A" : "B") as "A" | "B";
  const step = ((rel % 2) + 1) as 1 | 2;
  return {
    turn,
    kind: "set",
    set,
    bundle,
    step,
    field: CHOICE_FIELD_BY_TURN[turn] ?? null,
    greeting: turn === 1,
  };
}

/**
 * 9턴 체크포인트 3줄 제한. 3줄 초과면 앞에서부터 줄여 총 3줄로 만들되, 질문 줄은
 * 반드시 남긴다(마지막이 질문이면 마지막 줄 + 그 앞 2줄). 위기 안내가 담긴 응답은
 * 건드리지 않으므로 호출부(lib/chat.ts)에서 미리 걸러 준다.
 */
export function limitCheckpointLinesV3(lines: string[]): string[] {
  if (lines.length <= 3) return lines;
  const isQuestion = (line: string): boolean => {
    const t = line.trim();
    return /[?？]\s*$/.test(t) || /궁금(해요|하네요|합니다)\.?\s*$/.test(t);
  };
  const last = lines.length - 1;
  if (isQuestion(lines[last])) return lines.slice(last - 2);
  let q = -1;
  for (let i = last - 1; i >= 0; i--) {
    if (isQuestion(lines[i])) {
      q = i;
      break;
    }
  }
  if (q < 0 || q >= lines.length - 3) return lines.slice(-3);
  return lines.slice(q, q + 3);
}

// ── 보기 탭 구분과 세트 재료 (2026-10-20, 작업 17: 묶음→추출 필드→세트 카드) ──
// v1·v2 함수는 건드리지 않고, 아래만 새로 둔다.

/** v3 세트별 시작 턴. 9턴(체크포인트)이 세트 2와 3 사이를 가른다. */
const CHOICE_SET_START_V3: Record<ChatSetNumber, number> = { 1: 1, 2: 5, 3: 10, 4: 14, 5: 18 };

const CHOICE_SETS_V3: readonly ChatSetNumber[] = [1, 2, 3, 4, 5];

/**
 * 앱이 body 최상위로 보낸 choicePicks(보기를 탭해서 답한 봇 턴 번호)를 정제한다.
 * 클라이언트가 보낸 값이므로 믿지 않는다: 정수 1~22만, 중복 제거, 최대 22개, 그 밖은 버린다.
 * 배열이 아니면 빈 배열.
 */
export function sanitizeChoicePicks(raw: unknown): number[] {
  if (!Array.isArray(raw)) return [];
  const out: number[] = [];
  for (const v of raw) {
    if (out.length >= TOTAL_TURNS_V3) break;
    if (typeof v !== "number" || !Number.isInteger(v)) continue;
    if (v < 1 || v > TOTAL_TURNS_V3) continue;
    if (out.includes(v)) continue;
    out.push(v);
  }
  return out;
}

/** v2 buildSetPackets와 같은 규칙: k번째 봇 메시지 바로 뒤 첫 사용자 메시지가 k턴 답이다. */
function collectAnswerByTurn(history: readonly SetHistoryMessage[]): Map<number, string> {
  const answerByTurn = new Map<number, string>();
  let botTurn = 0;
  for (const msg of history) {
    if (msg.role === "assistant") {
      botTurn += 1;
      continue;
    }
    if (msg.role !== "user" || botTurn === 0 || answerByTurn.has(botTurn)) continue;
    const text = typeof msg.content === "string" ? msg.content.replace(/\s+/g, " ").trim().slice(0, SET_ANSWER_MAX) : "";
    if (text) answerByTurn.set(botTurn, text);
  }
  return answerByTurn;
}

/**
 * v3 대화 기록 → 세트 재료 묶음 5개. v2 buildSetPackets와 같은 방식으로 답을 모은 뒤
 * v3 번호표로 나눈다: 세트 1 = 1–4턴, 2 = 5–8, 3 = 10–13, 4 = 14–17, 5 = 18–21.
 * 9턴 체크포인트 답은 어느 세트에도 넣지 않는다. 세트마다 A묶음 턴(시작, 시작+1) 답은
 * opening_answers, B묶음 턴(시작+2, 시작+3) 답은 module_answers다. 세트 5는 module_answers에
 * 20턴 답만, perspective_answer에 21턴 답을 넣는다. 보기를 탭한 턴(picks)의 답은 위 배열에
 * 넣지 않고 picked_choices(턴 순서)에 넣는다. 직접 쓴 말이 하나라도 있으면 has_chat이 true,
 * 보기만 있으면 has_chat이 false다. quiz는 v2와 같이 selectAllSetQuizAnswers로 고른다.
 * 세트 5의 21턴 답이 보기 탭이면 perspective_answer에 그 문구를 그대로 넣고(마무리 문장이 그 말에
 * 기대므로) picked_choices에도 넣는다.
 */
export function buildSetPacketsV3(
  history: readonly SetHistoryMessage[],
  chatSets: ModuleChatSets,
  answers: readonly SetQuizAnswer[],
  picks: readonly number[] = []
): SetPacket[] {
  const answerByTurn = collectAnswerByTurn(history);
  const picked = new Set(picks);
  const quizzes = selectAllSetQuizAnswers(chatSets, answers);
  return CHOICE_SETS_V3.map((set) => {
    const start = CHOICE_SET_START_V3[set];
    const opening: string[] = [];
    const moduleAnswers: string[] = [];
    const pickedChoices: string[] = [];
    const put = (turn: number, target: string[]): void => {
      const text = answerByTurn.get(turn);
      if (!text) return;
      if (picked.has(turn)) pickedChoices.push(text);
      else target.push(text);
    };
    put(start, opening);
    put(start + 1, opening);
    put(start + 2, moduleAnswers);
    // 세트 5의 B묶음은 20턴(관점 전환 장면) + 21턴(건넬 말)이라 21턴은 perspective_answer가 받는다.
    if (set !== 5) put(start + 3, moduleAnswers);
    const q = quizzes[set - 1];
    const packet: SetPacket = {
      set,
      theme: CHAT_SET_THEMES[set].key,
      quiz: q ? { id: q.qId, dimension: q.dimension, prompt: q.prompt, label: q.label, score: q.score } : null,
      opening_answers: opening,
      module_answers: moduleAnswers,
      has_chat: opening.length + moduleAnswers.length > 0,
      picked_choices: pickedChoices,
    };
    if (set === 5) {
      const turn21 = start + 3;
      // 2026-10-21 (작업 04): 21턴 건너뜀은 답이 없는 것으로 친다.
      const raw21 = answerByTurn.get(turn21);
      packet.perspective_answer = raw21 && raw21 !== SKIP_ANSWER_TEXT ? raw21 : null;
      if (packet.perspective_answer) {
        if (picked.has(turn21)) pickedChoices.push(packet.perspective_answer);
        else packet.has_chat = true;
      }
    }
    return packet;
  });
}

/** 묶음→필드 매핑 한 건. A2 턴 답(a2)과 바로 앞 A1 턴 답(a1, 없으면 null). */
export interface ChoiceFieldPick {
  field: string;
  a1: string | null;
  a2: string;
}

/**
 * CHOICE_FIELD_BY_TURN에 따라 필드별 "묶음 답" 목록을 만든다. 답이 없는 필드는 건너뛴다.
 * 보기 탭인지 직접 쓴 말인지는 가리지 않고 해당 턴의 사용자 답 원문을 쓴다.
 */
export function buildChoiceFieldPicks(history: readonly SetHistoryMessage[]): ChoiceFieldPick[] {
  const answerByTurn = collectAnswerByTurn(history);
  const out: ChoiceFieldPick[] = [];
  for (const turn of Object.keys(CHOICE_FIELD_BY_TURN).map(Number).sort((a, b) => a - b)) {
    const a2 = answerByTurn.get(turn);
    if (!a2) continue;
    out.push({ field: CHOICE_FIELD_BY_TURN[turn], a1: answerByTurn.get(turn - 1) ?? null, a2 });
  }
  return out;
}
