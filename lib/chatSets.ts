/**
 * lib/chatSets.ts
 * ------------------------------------------------------------------
 * 챗봇 5세트 흐름(flowVersion 2)의 순수 함수. OpenAI 호출도, 프롬프트
 * 문장도 없다. 프롬프트 빌더(lib/chatPrompts.ts)와 라우트가 이 결과를 읽는다.
 *
 *   - getSetTurnRole(): 턴 번호 → 세트·위치·정리 여부·점검/관점 전환/마무리
 *   - sanitizeQuizAnswers(): 요청의 30문항 답 정제(신뢰할 수 없는 입력)
 *   - selectSetQuizAnswer() / selectAllSetQuizAnswers(): 세트 ①에서 인용할 문항
 *   - buildSetPackets(): 대화 기록 → 세트 재료 묶음(리포트 근거, LLM 요약 아님)
 *
 * 턴 배치는 CHAT_SETS_DRAFT.md 10장 / SPEC.md 1을 그대로 옮겼다:
 *   1 인사+S1① · 2~5 S1②~⑤ · 6 정리+S2① · 7~9 S2②~④ · 10 정리+점검
 *   11~15 S3①~⑤(정리 없음) · 16 정리+S4① · 17~20 S4②~⑤
 *   21 정리+S5① · 22~23 S5②③ · 24 고정 문구+관점 전환 · 25 마무리
 *
 * 2026-10-02: 추가(TODO 3).
 * ------------------------------------------------------------------
 */

import {
  CHAT_SET_THEMES,
  type ChatSetNumber,
  type ChatSetTheme,
  type ModuleChatSets,
} from "./modulePlaybooks";

export const TOTAL_TURNS_V2 = 25;
export const CHECKPOINT_TURN_V2 = 10;
export const PERSPECTIVE_SHIFT_TURN_V2 = 24;

/** 세트 안의 위치. ① 퀴즈 인용, ② 상세, ③④⑤ 모듈 질문. */
export type SetPosition = 1 | 2 | 3 | 4 | 5;

export type SetTurnKind =
  /** 세트 ①~⑤ 중 하나. */
  | "set"
  /** 10턴: 세트 1~2 정리 + 중간 점검. */
  | "checkpoint"
  /** 24턴: 고정 문구 + 모듈별 관점 전환 질문. */
  | "perspective"
  /** 25턴(이상): 마무리. */
  | "closing";

export interface SetTurnRole {
  turn: number;
  kind: SetTurnKind;
  /** 이 턴이 속한 세트. 마무리 턴은 null. */
  set: ChatSetNumber | null;
  /** kind === "set"일 때만 값이 있다. */
  position: SetPosition | null;
  /** 질문 앞에 정리·재확인할 직전 세트(6턴 → 1, 16턴 → 3, 21턴 → 4). 10턴 점검은 [1, 2]. */
  recapSets: ChatSetNumber[];
  /** 1턴만 true(인사 + 세트 1 ①). */
  greeting: boolean;
}

/** 세트별 시작 턴과 그 세트가 가진 위치 수(①부터). 세트 2는 ④까지, 세트 5는 ③까지. */
const SET_LAYOUT: Record<ChatSetNumber, { start: number; positions: number }> = {
  1: { start: 1, positions: 5 },
  2: { start: 6, positions: 4 },
  3: { start: 11, positions: 5 },
  4: { start: 16, positions: 5 },
  5: { start: 21, positions: 3 },
};

/** 세트 ① 앞에서 직전 세트를 정리·재확인하는 세트. 세트 3은 10턴에서 이미 정리했으므로 없다. */
const RECAP_BEFORE: Partial<Record<ChatSetNumber, ChatSetNumber>> = { 2: 1, 4: 3, 5: 4 };

const SET_NUMBERS: readonly ChatSetNumber[] = [1, 2, 3, 4, 5];

/**
 * 턴 번호(1부터) → 이 턴의 역할. 25 이상은 마무리로 고정한다(서버가 끝을 정한다는
 * 기존 원칙과 같다). 1 미만이나 정수가 아닌 값은 1턴으로 본다.
 * 시간 초과로 앞당긴 마무리는 여기서 다루지 않는다(isFinalTurn이 판단).
 */
export function getSetTurnRole(turnNumber: number): SetTurnRole {
  const turn = Number.isFinite(turnNumber) ? Math.max(1, Math.floor(turnNumber)) : 1;
  if (turn >= TOTAL_TURNS_V2) {
    return { turn, kind: "closing", set: null, position: null, recapSets: [], greeting: false };
  }
  if (turn === PERSPECTIVE_SHIFT_TURN_V2) {
    return { turn, kind: "perspective", set: 5, position: null, recapSets: [], greeting: false };
  }
  if (turn === CHECKPOINT_TURN_V2) {
    return { turn, kind: "checkpoint", set: 2, position: null, recapSets: [1, 2], greeting: false };
  }
  for (const set of SET_NUMBERS) {
    const { start, positions } = SET_LAYOUT[set];
    if (turn >= start && turn < start + positions) {
      const position = (turn - start + 1) as SetPosition;
      const recap = position === 1 ? RECAP_BEFORE[set] : undefined;
      return {
        turn,
        kind: "set",
        set,
        position,
        recapSets: recap ? [recap] : [],
        greeting: turn === 1,
      };
    }
  }
  // SET_LAYOUT이 1~23을 빈틈없이 덮으므로 여기 오지 않는다.
  return { turn, kind: "closing", set: null, position: null, recapSets: [], greeting: false };
}

// ── 퀴즈 답 정제 ───────────────────────────────────────────────────────────

/** 앱이 보내는 퀴즈 한 문항의 답(사용자 언어 문구). */
export interface SetQuizAnswer {
  /** 문항 ID(예: "A6", "IM3"). */
  qId: string;
  dimension: string;
  /** 질문 문구. */
  prompt: string;
  /** 고른 보기(슬라이더면 "8/10" 같은 값). */
  label: string;
  /** 0~3 (슬라이더는 소수). */
  score: number;
}

/** 모듈 퀴즈가 30문항이다. 여유를 두되 과도한 페이로드는 자른다. */
export const QUIZ_ANSWERS_MAX = 40;
const QUIZ_ID_RE = /^[A-Z]{1,3}\d{1,2}$/;
const DIMENSION_RE = /^[A-Za-z][A-Za-z0-9_-]{0,39}$/;
const QUIZ_PROMPT_MAX = 300;
const QUIZ_LABEL_MAX = 200;

function clip(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

/**
 * 요청 body의 30문항 답을 정제한다. 시스템·리포트 프롬프트에 들어가므로 길이를
 * 자르고, 형식이 맞지 않는 항목(ID·차원 형식, 빈 문구, 0~3 밖 점수)은 버린다.
 * 같은 ID가 여러 번 오면 처음 것만 쓴다. 배열이 아니면 빈 배열.
 */
export function sanitizeQuizAnswers(raw: unknown): SetQuizAnswer[] {
  if (!Array.isArray(raw)) return [];
  const out: SetQuizAnswer[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (out.length >= QUIZ_ANSWERS_MAX) break;
    if (!item || typeof item !== "object") continue;
    const r = item as Record<string, unknown>;
    const qId = typeof r.qId === "string" ? r.qId.trim() : "";
    const dimension = typeof r.dimension === "string" ? r.dimension.trim() : "";
    const prompt = clip(r.prompt, QUIZ_PROMPT_MAX);
    const label = clip(r.label, QUIZ_LABEL_MAX);
    const score = typeof r.score === "number" ? r.score : NaN;
    if (!QUIZ_ID_RE.test(qId) || seen.has(qId)) continue;
    if (!DIMENSION_RE.test(dimension)) continue;
    if (!prompt || !label) continue;
    if (!Number.isFinite(score) || score < 0 || score > 3) continue;
    seen.add(qId);
    out.push({ qId, dimension, prompt, label, score });
  }
  return out;
}

// ── 세트 ① 인용 문항 선택 ─────────────────────────────────────────────────

/** 세트 1~4(와 모듈 7·10 세트 5)는 이 점수 이상만 인용한다(2~3점). */
const HIGH_MIN = 2;
/** 세트 5 기본 방향은 이 점수 이하만 인용한다(0~1점). */
const LOW_MAX = 1;

/**
 * 세트 ①에서 인용할 퀴즈 답. CHAT_SETS_DRAFT.md 1-3:
 *   - 세트 1~4: 후보 중 가장 높은 점수(2~3점)
 *   - 세트 5: strengthScoreDirection이 "low"면 가장 낮은 점수(0~1점), "high"(모듈 7·10)면 가장 높은 점수(2~3점)
 *   - 동점은 후보 순서가 앞선 것. 조건을 만족하는 후보가 없으면 null(기본 질문으로 묻는다).
 * 한 문항은 한 세트에서만 쓴다는 규칙은 후보 데이터가 세트끼리 겹치지 않는 것으로 보장한다
 * (scripts/check-playbook-sets.mts가 검사).
 */
export function selectSetQuizAnswer(
  chatSets: ModuleChatSets,
  set: ChatSetNumber,
  answers: readonly SetQuizAnswer[]
): SetQuizAnswer | null {
  const data = chatSets.sets[set - 1];
  const byId = new Map(answers.map((a) => [a.qId, a]));
  const low = set === 5 && chatSets.strengthScoreDirection === "low";
  let best: SetQuizAnswer | null = null;
  for (const id of data.candidates) {
    const a = byId.get(id);
    if (!a) continue;
    if (low ? a.score > LOW_MAX : a.score < HIGH_MIN) continue;
    // 엄격 비교라 동점이면 먼저 나온(후보 순서가 앞선) 문항이 남는다.
    if (!best || (low ? a.score < best.score : a.score > best.score)) best = a;
  }
  return best;
}

/** 세트 1~5 각각의 인용 문항(없으면 null). 인덱스 0이 세트 1. */
export function selectAllSetQuizAnswers(
  chatSets: ModuleChatSets,
  answers: readonly SetQuizAnswer[]
): (SetQuizAnswer | null)[] {
  return SET_NUMBERS.map((set) => selectSetQuizAnswer(chatSets, set, answers));
}

// ── 세트 재료 묶음 ─────────────────────────────────────────────────────────

/** 세트 재료 묶음에 넣는 사용자 원문 한 개의 길이 상한. 카드 인용은 리포트 모델이 이 안에서 고른다. */
export const SET_ANSWER_MAX = 600;

export interface SetHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * 리포트가 근거로 쓰는 세트 하나의 재료. 마지막 턴 extract의 `set_packets`에
 * 그대로 들어가므로 extract의 다른 필드처럼 snake_case다.
 */
export interface SetPacket {
  set: ChatSetNumber;
  theme: ChatSetTheme;
  /** 세트 ①에서 인용한 퀴즈 문항. 후보가 조건을 만족하지 않았으면 null. */
  quiz: { id: string; dimension: string; prompt: string; label: string; score: number } | null;
  /** ①② 질문에 대한 사용자 답 원문(대화한 만큼만). */
  opening_answers: string[];
  /** ③④⑤ 질문에 대한 사용자 답 원문(대화한 만큼만). */
  module_answers: string[];
  /** 이 세트에서 사용자 답이 하나라도 있으면 true. 10턴에 끝낸 사용자는 세트 3~5가 false. */
  has_chat: boolean;
  /** 세트 5만: 24턴 관점 전환 질문에 대한 답 원문. 없으면 null. */
  perspective_answer?: string | null;
}

/**
 * 대화 기록 → 세트 재료 묶음 5개. 서버가 턴 번호로 코드로 만든다(LLM 요약 아님).
 *
 * 기록은 앱이 보내는 모양 그대로다: [봇 1턴, 사용자, 봇 2턴, 사용자, ...]. k번째 봇
 * 메시지가 k턴이고, 그 바로 뒤 사용자 메시지가 k턴 질문에 대한 답이다. 마무리 버튼이나
 * 시간 초과로 앞당겨 끝내면 기록이 중간에서 끝나므로, 답이 없는 턴은 비어 있게 된다.
 * 10턴 점검 뒤 "조금 더"로 이어 간 사용자의 10턴 답, 24턴 외 마무리 관련 답은 세트에 넣지 않는다.
 */
export function buildSetPackets(
  history: readonly SetHistoryMessage[],
  chatSets: ModuleChatSets,
  answers: readonly SetQuizAnswer[]
): SetPacket[] {
  const answerByTurn = new Map<number, string>();
  let botTurn = 0;
  for (const msg of history) {
    if (msg.role === "assistant") {
      botTurn += 1;
      continue;
    }
    if (msg.role !== "user" || botTurn === 0 || answerByTurn.has(botTurn)) continue;
    const text = clip(msg.content, SET_ANSWER_MAX);
    if (text) answerByTurn.set(botTurn, text);
  }

  const quizzes = selectAllSetQuizAnswers(chatSets, answers);
  return SET_NUMBERS.map((set) => {
    const { start, positions } = SET_LAYOUT[set];
    const opening: string[] = [];
    const moduleAnswers: string[] = [];
    for (let p = 1; p <= positions; p++) {
      const text = answerByTurn.get(start + p - 1);
      if (!text) continue;
      (p <= 2 ? opening : moduleAnswers).push(text);
    }
    const q = quizzes[set - 1];
    const packet: SetPacket = {
      set,
      theme: CHAT_SET_THEMES[set].key,
      quiz: q ? { id: q.qId, dimension: q.dimension, prompt: q.prompt, label: q.label, score: q.score } : null,
      opening_answers: opening,
      module_answers: moduleAnswers,
      has_chat: opening.length + moduleAnswers.length > 0,
    };
    if (set === 5) {
      packet.perspective_answer = answerByTurn.get(PERSPECTIVE_SHIFT_TURN_V2) ?? null;
      if (packet.perspective_answer) packet.has_chat = true;
    }
    return packet;
  });
}
