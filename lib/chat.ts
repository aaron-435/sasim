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
import { buildChatSystemPrompt, buildExtractionPrompt, TOTAL_TURNS, type ChatSessionContext } from "./chatPrompts";
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
const CHAT_MODEL = "gpt-5.4-mini";

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
}

export interface ChatReply {
  /** 2-4 short messenger-style messages, rendered as sequential bubbles. */
  lines: string[];
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

export async function getChatReply(params: {
  turnNumber: number;
  history: ChatMessage[];
  context: ChatSessionContext;
  sessionStartedAt: number;
  sessionId?: string;
}): Promise<ChatReply> {
  const elapsedMinutes = Math.floor((Date.now() - params.sessionStartedAt) / 60000);
  const systemPrompt = buildChatSystemPrompt(params.turnNumber, params.context, elapsedMinutes);

  const completion = await client.chat.completions.create({
    model: CHAT_MODEL,
    temperature: 0.8,
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

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI가 빈 응답을 반환했습니다.");

  const parsed = JSON.parse(content);
  const rawLines = Array.isArray(parsed.lines) ? parsed.lines.map((l: unknown) => String(l)).filter(Boolean) : [];
  if (rawLines.length === 0) throw new Error("OpenAI 응답에 lines가 없습니다.");
  const lines = enforceOneQuestionPerReply(rawLines);
  return { lines: params.context.locale === "ko" || !params.context.locale ? stripHanja(lines) : lines };
}

export async function extractChatSummary(transcript: ChatMessage[], context: ChatSessionContext, sessionId?: string): Promise<ChatExtract> {
  const { system, user } = buildExtractionPrompt(transcript, context);

  const completion = await client.chat.completions.create({
    model: CHAT_MODEL,
    temperature: 0,
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
      model: CHAT_MODEL,
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
  };
}

export { TOTAL_TURNS };
