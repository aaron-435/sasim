/**
 * lib/chat.ts
 * ------------------------------------------------------------------
 * Server-side wrapper around the OpenAI Chat Completions API for the
 * Layer 3 무료 AI 상담 챗봇 (see 챗봇_3턴시나리오_5.md).
 * NEVER import this in a client component — it reads process.env.OPENAI_API_KEY.
 * Call it only from Route Handlers / Server Actions.
 *
 * Two calls per session:
 *   1. getChatReply() — one call per bot turn (1-7). Phase A (turns 1-2)
 *      requests structured `{ text, chips }` JSON so the UI can render real
 *      clickable chip buttons; Phase B/C (turns 3-7) return plain text, per
 *      the doc's "no JSON in the conversational text" rule.
 *   2. extractChatSummary() — one extra call right after turn 7, to pull the
 *      structured chatExtract (primary_concern, emotional_state, ...) that
 *      ReportScreen.jsx consumes. Kept separate from the turn-7 reply itself
 *      because turn 7's response must stay natural prose, not JSON.
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";
import { buildChatSystemPrompt, buildExtractionPrompt, TOTAL_TURNS, type ChatSessionContext } from "./chatPrompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // set in .env.local, never exposed to client
});

const CHAT_MODEL = "gpt-4o";

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
  text: string;
  /** Only present for Phase A turns (1-2) — clickable options to render as chips. */
  chips?: string[];
}

export async function getChatReply(params: {
  turnNumber: number;
  history: ChatMessage[];
  context: ChatSessionContext;
  sessionStartedAt: number;
}): Promise<ChatReply> {
  const effectiveTurn = params.turnNumber >= TOTAL_TURNS ? TOTAL_TURNS : Math.max(1, params.turnNumber);
  const isPhaseA = effectiveTurn <= 2;
  const elapsedMinutes = Math.floor((Date.now() - params.sessionStartedAt) / 60000);
  const systemPrompt = buildChatSystemPrompt(params.turnNumber, params.context, elapsedMinutes, isPhaseA);

  const completion = await client.chat.completions.create({
    model: CHAT_MODEL,
    temperature: 0.8,
    messages: [{ role: "system", content: systemPrompt }, ...params.history],
    ...(isPhaseA ? { response_format: { type: "json_object" as const } } : {}),
  });

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI가 빈 응답을 반환했습니다.");

  if (isPhaseA) {
    const parsed = JSON.parse(content);
    return {
      text: String(parsed.text ?? ""),
      chips: Array.isArray(parsed.chips) ? parsed.chips.map((c: unknown) => String(c)) : undefined,
    };
  }
  return { text: content };
}

export async function extractChatSummary(transcript: ChatMessage[], context: ChatSessionContext): Promise<ChatExtract> {
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
