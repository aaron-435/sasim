/**
 * lib/chat.ts
 * ------------------------------------------------------------------
 * Server-side wrapper around the OpenAI Chat Completions API for the
 * Layer 3 무료 AI 상담 챗봇 (see lib/chatPrompts.ts for the design).
 * NEVER import this in a client component — it reads process.env.OPENAI_API_KEY.
 * Call it only from Route Handlers / Server Actions.
 *
 * Two calls per session:
 *   1. getChatReply() — one call per bot turn (1-7). Every turn requests
 *      structured `{ lines: string[] }` JSON — a short array of separate
 *      messenger-style messages, rendered as sequential chat bubbles on
 *      the client (see components/ChatScreen.jsx) rather than one long
 *      paragraph.
 *   2. extractChatSummary() — one extra call right after turn 7, to pull the
 *      structured chatExtract (primary_concern, emotional_state, ...) that
 *      ReportScreen.jsx consumes.
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";
import {
  buildChatSystemPrompt,
  buildExtractionPrompt,
  isFinalTurn,
  sanitizeFormulation,
  TOTAL_TURNS,
  type ChatFormulation,
  type ChatSessionContext,
} from "./chatPrompts";
import { getModulePlaybook } from "./modulePlaybooks";
import { logLlmUsage } from "./llmUsage";
import { stripHanja } from "./reportQuality";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // set in .env.local, never exposed to client
});

// 2026-09-07: switched from gpt-4o to gpt-5.4-mini — ~1/3 the price, newer
// generation. Verified against an 11-case safety-protocol matrix (6 crisis
// phrasings of varying directness + 5 Korean hyperbole cases like "배고파
// 죽겠다" that must NOT trigger it): gpt-5.4-mini scored 100% recall / 0%
// false-positive, actually outperforming gpt-4o (67% recall on the same
// set — it missed a method-mention case and dropped the mandatory hotline
// numbers on another). Re-run that matrix before ever changing this again.
//
// 2026-09-28 (TODO 15-b): 대화 턴은 gpt-5.6-luna(추론 강도 low)로 바꿨다. 같은 4개 페르소나 × 20턴
// 채점 평균 1.80(mini 1.59, gpt-5.4 1.79), 대화 1개 비용 $0.017(mini $0.12), 응답 중앙값 4.2초(mini 2.2초).
// 안전 매트릭스(위기 6 + 과장 5 + 돈 스트레스 1) 3회: 위기 18/18, 과장 오탐 0/15, "또 못 버티겠다"는 매번
// 안전 확인으로 넘어감(규칙 0에 위기 신호로 적힌 표현). 추출은 mini로 둔다 — luna 추출은 summary_quote를
// 오행 수치로 시작하고 조언투가 섞였으며 20턴 끝 대기가 약 7초로 늘었다.
export const CHAT_MODEL = "gpt-5.6-luna";
const EXTRACT_MODEL = "gpt-5.4-mini";

// 2026-09-28 (TODO 15-b): gpt-5.5·5.6 계열은 temperature 기본값(1)만 받고 추론형이다. 기본 추론을 켜 두면
// gpt-5.6-luna가 턴당 약 300개의 보이지 않는 추론 토큰을 써서 응답 중앙값이 6초대였다. 이 계열로 바꿀 때는
// temperature 대신 추론 강도를 보낸다.
export type ChatReasoningEffort = "none" | "low" | "medium" | "high";
const CHAT_REASONING_EFFORT: ChatReasoningEffort = "low";
export function chatSamplingParams(
  model: string,
  temperature: number,
  reasoningEffort: ChatReasoningEffort = CHAT_REASONING_EFFORT,
): { temperature: number } | { reasoning_effort: ChatReasoningEffort } {
  return /^gpt-5\.[56]/.test(model) ? { reasoning_effort: reasoningEffort } : { temperature };
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatExtract {
  primary_concern: string;
  emotional_state: string;
  trigger_point: string;
  repeat_pattern: string | null;
  core_fear_or_meaning: string;
  /** The exact last assistant (Phase C) message — see buildExtractionPrompt for the turn-3-vs-turn-7 bugfix. */
  summary_quote: string;
  /** Saju + Module 1 attachment result + full conversation, synthesized into one narrative. Drives the report. */
  integrated_summary: string;
  // 2026-09-27 (TODO F1-a): 아래는 모두 optional — 이 필드가 생기기 전의 extract(앱에 저장된 이전
  // 리포트, 구버전 앱이 보내는 리포트 요청)도 그대로 통과해야 한다. 사용자가 말하지 않았으면 null.
  coping?: string | null;
  relational?: string | null;
  desired_change?: string | null;
  /** 모듈 플레이북의 extractFields 2개(key → 값). 플레이북이 없는 moduleId면 생략. */
  module_fields?: Record<string, string | null>;
}

// The model sometimes writes the string "null" (or "") instead of JSON null for a field the user never touched.
function nullableText(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t && t.toLowerCase() !== "null" ? t : null;
}

export interface ChatReply {
  /** 2-4 short messenger-style messages, rendered as sequential bubbles. */
  lines: string[];
  /** Hidden counselor memo (TODO Q1-c). The route passes it to the app, which echoes it back next turn; never shown or persisted. */
  formulation?: ChatFormulation;
}

// A line counts as "asking a question" if it ends in ? or in a no-"?"
// curiosity phrasing like "~인지 궁금해요." — both showed up as the second
// half of a stacked pair in real transcripts (see chatPrompts.ts rule 4's
// docstring for examples).
function isQuestionLine(line: string): boolean {
  const trimmed = line.trim();
  return /[?？]\s*$/.test(trimmed) || /궁금(해요|하네요|합니다)\.?\s*$/.test(trimmed);
}

/**
 * Deterministic backstop for chatPrompts.ts rule 4 ("one question per
 * reply"). Prose instructions plus negative examples measurably failed to
 * stop this on their own — gpt-5.4-mini kept stacking a second, unrelated
 * question after the first turn's worth of feedback, even reproducing an
 * example we'd just told it not to write. Rather than keep tuning the
 * prompt, enforce it in code: keep only the last question-like line and
 * drop the earlier one(s), which in every observed violation were pure
 * follow-up questions with no reflection content worth preserving.
 */
function enforceOneQuestionPerReply(lines: string[]): string[] {
  const questionIndices = lines.reduce<number[]>((acc, line, i) => {
    if (isQuestionLine(line)) acc.push(i);
    return acc;
  }, []);
  if (questionIndices.length <= 1) return lines;
  // Keep the FIRST question: a second question line is usually a dependent follow-up ("있었다면 그건
  // 언제쯤이었나요?"), which reads as a broken fragment once the question it leans on is removed.
  const dropIndices = new Set(questionIndices.slice(1));
  return lines.filter((_, i) => !dropIndices.has(i));
}

// 2026-09-28 (TODO 15-b): 마지막 턴은 "요약 → 확인 질문 → 잠시 기다려 달라는 마무리 안내" 순서여야 하는데,
// 모델이 확인 질문을 맨 끝에 두거나(규칙 3 "질문은 마지막 줄"과 헷갈림) 안내를 빠뜨리면 대화가 질문으로 끝난 채
// 앱이 리포트로 넘어간다(gpt-5.6-luna·terra 4개 중 2개). 안내 줄을 맨 끝으로 옮기고, 없으면 언어별 문장을 붙인다.
// 요약 줄에도 나올 수 있는 말("기다리다", "wait for his reply")은 피하고, 안내 문장에만 나오는 표현으로 찾는다.
const CLOSING_LINE_PATTERN: Record<string, RegExp> = {
  ko: /잠시만|잠깐만|기다려 주|(사주|테스트).*(살펴|묶|엮|종합|볼게)/,
  en: /\b(give me a moment|one moment|a moment|hold on|saju|test results)\b/i,
  es: /(un momento|un segundo|saju|resultados del test)/i,
};
const CLOSING_LINE_FALLBACK: Record<string, string> = {
  ko: "잠시만 기다려 주세요. 들려주신 이야기와 사주, 테스트 결과를 함께 살펴볼게요.",
  en: "Give me a moment — I'll look at everything you shared together with your saju and test results.",
  es: "Dame un momento: voy a revisar todo lo que compartiste junto con tu saju y los resultados del test.",
};
// 위기 대응(규칙 0) 중인 응답에는 리포트로 넘어간다는 안내를 붙이지 않는다 — 안전 안내가 마지막 말이어야 한다.
// 번호는 lib/promptLocale.ts의 언어별 위기 상담 안내와 같다.
const CRISIS_LINE_PATTERN = /1393|1577-0199|\b988\b|findahelpline/i;
export function ensureClosingLineLast(lines: string[], locale: string = "ko"): string[] {
  if (lines.some((line) => CRISIS_LINE_PATTERN.test(line))) return lines;
  const pattern = CLOSING_LINE_PATTERN[locale] ?? CLOSING_LINE_PATTERN.ko;
  let idx = -1;
  lines.forEach((line, i) => {
    if (!isQuestionLine(line) && pattern.test(line)) idx = i;
  });
  if (idx === -1) return [...lines, CLOSING_LINE_FALLBACK[locale] ?? CLOSING_LINE_FALLBACK.ko];
  if (idx === lines.length - 1) return lines;
  return [...lines.slice(0, idx), ...lines.slice(idx + 1), lines[idx]];
}

export async function getChatReply(params: {
  turnNumber: number;
  history: ChatMessage[];
  context: ChatSessionContext;
  sessionStartedAt: number;
  sessionId?: string;
  /** The previous reply's formulation, echoed back by the client. */
  formulation?: ChatFormulation;
}): Promise<ChatReply> {
  const elapsedMinutes = Math.floor((Date.now() - params.sessionStartedAt) / 60000);
  const systemPrompt = buildChatSystemPrompt(params.turnNumber, params.context, elapsedMinutes, params.formulation);

  // 2026-09-28 (TODO 15-b): gpt-5.6-luna 시뮬레이션 80턴 중 2번, JSON에 lines가 빠진 응답이 와서 대화가 오류로
  // 끊겼다. 빈 응답·깨진 JSON·lines 없음은 한 번만 다시 요청한다(두 번째도 실패하면 예전처럼 오류).
  let parsed: { lines?: unknown; formulation?: unknown } = {};
  let rawLines: string[] = [];
  for (let attempt = 0; ; attempt++) {
    const completion = await client.chat.completions.create({
      model: CHAT_MODEL,
      ...chatSamplingParams(CHAT_MODEL, 0.8),
      messages: [{ role: "system", content: systemPrompt }, ...params.history],
      response_format: { type: "json_object" },
    });

    if (completion.usage) {
      await logLlmUsage({
        sessionId: params.sessionId,
        endpoint: "chat",
        model: CHAT_MODEL,
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
      });
    }

    const content = completion.choices[0]?.message?.content?.trim() ?? "";
    let problem = "";
    try {
      parsed = content ? JSON.parse(content) : {};
      rawLines = Array.isArray(parsed.lines) ? parsed.lines.map((l: unknown) => String(l)).filter(Boolean) : [];
      if (!content) problem = "OpenAI가 빈 응답을 반환했습니다.";
      else if (rawLines.length === 0) problem = `OpenAI 응답에 lines가 없습니다. (받은 키: ${Object.keys(parsed).join(", ")})`;
    } catch {
      problem = `OpenAI 응답이 JSON이 아닙니다. (앞부분: ${content.slice(0, 120)})`;
    }
    if (!problem) break;
    if (attempt >= 1) throw new Error(problem);
    console.warn(`[chat] turn ${params.turnNumber}: ${problem} — 한 번 다시 요청합니다.`);
  }
  const oneQuestion = enforceOneQuestionPerReply(rawLines);
  const lines = isFinalTurn(params.turnNumber, elapsedMinutes)
    ? ensureClosingLineLast(oneQuestion, params.context.locale ?? "ko")
    : oneQuestion;
  const formulation = sanitizeFormulation(parsed.formulation);
  return {
    lines: params.context.locale === "ko" || !params.context.locale ? stripHanja(lines) : lines,
    ...(formulation && { formulation }),
  };
}

export async function extractChatSummary(transcript: ChatMessage[], context: ChatSessionContext, sessionId?: string): Promise<ChatExtract> {
  const playbook = getModulePlaybook(context.moduleId);
  const { system, user } = buildExtractionPrompt(transcript, context);

  const completion = await client.chat.completions.create({
    model: EXTRACT_MODEL,
    ...chatSamplingParams(EXTRACT_MODEL, 0),
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  if (completion.usage) {
    await logLlmUsage({
      sessionId,
      endpoint: "chat_extract",
      model: EXTRACT_MODEL,
      promptTokens: completion.usage.prompt_tokens,
      completionTokens: completion.usage.completion_tokens,
    });
  }

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("OpenAI가 빈 추출 응답을 반환했습니다.");

  const parsed = JSON.parse(raw);
  return {
    primary_concern: parsed.primary_concern ?? "",
    emotional_state: parsed.emotional_state ?? "",
    trigger_point: parsed.trigger_point ?? "",
    repeat_pattern: parsed.repeat_pattern ?? null,
    core_fear_or_meaning: parsed.core_fear_or_meaning ?? "",
    summary_quote: parsed.summary_quote ?? "",
    integrated_summary: parsed.integrated_summary ?? "",
    coping: nullableText(parsed.coping),
    relational: nullableText(parsed.relational),
    desired_change: nullableText(parsed.desired_change),
    // Only the playbook's own keys, so a stray key the model invents never reaches the report prompt.
    ...(playbook && {
      module_fields: Object.fromEntries(playbook.extractFields.map((f) => [f.key, nullableText(parsed.module_fields?.[f.key])])),
    }),
  };
}

export { TOTAL_TURNS };
