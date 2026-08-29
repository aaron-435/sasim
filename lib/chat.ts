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
  /** 2-4 short messenger-style messages, rendered as sequential bubbles. */
  lines: string[];
}

export async function getChatReply(params: {
  turnNumber: number;
  history: ChatMessage[];
  context: ChatSessionContext;
  sessionStartedAt: number;
}): Promise<ChatReply> {
  const elapsedMinutes = Math.floor((Date.now() - params.sessionStartedAt) / 60000);
  const systemPrompt = buildChatSystemPrompt(params.turnNumber, params.context, elapsedMinutes);

  const completion = await client.chat.completions.create({
    model: CHAT_MODEL,
    temperature: 0.8,
    messages: [{ role: "system", content: systemPrompt }, ...params.history],
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI가 빈 응답을 반환했습니다.");

  const parsed = JSON.parse(content);
  const lines = Array.isArray(parsed.lines) ? parsed.lines.map((l: unknown) => String(l)).filter(Boolean) : [];
  if (lines.length === 0) throw new Error("OpenAI 응답에 lines가 없습니다.");
  return { lines };
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
