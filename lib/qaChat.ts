/**
 * lib/qaChat.ts
 * ------------------------------------------------------------------
 * Server-side OpenAI call for the question-bank Q&A chat (see
 * lib/qaPrompts.ts). Mirrors lib/chat.ts's shape (same model, same
 * `{ lines: string[] }` JSON contract, same env var) but is a single
 * one-shot call per question — no multi-turn history, since each
 * question is independent. NEVER import this in a client component.
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";
import { buildQASystemPrompt, type QAContext } from "./qaPrompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // set in .env.local, never exposed to client
});

const QA_MODEL = "gpt-4o";

export async function getQAAnswer(ctx: QAContext): Promise<{ lines: string[] }> {
  const systemPrompt = buildQASystemPrompt(ctx);

  const completion = await client.chat.completions.create({
    model: QA_MODEL,
    temperature: 0.8,
    messages: [{ role: "system", content: systemPrompt }],
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI가 빈 응답을 반환했습니다.");

  const parsed = JSON.parse(content);
  const lines = Array.isArray(parsed.lines) ? parsed.lines.map((l: unknown) => String(l)).filter(Boolean) : [];
  if (lines.length === 0) throw new Error("OpenAI 응답에 lines가 없습니다.");
  return { lines };
}
