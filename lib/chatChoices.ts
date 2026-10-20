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

import type { ChatSetNumber } from "./modulePlaybooks";

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
