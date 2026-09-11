/**
 * lib/llmUsage.ts
 * ------------------------------------------------------------------
 * Best-effort token/cost logging for every OpenAI call in the app
 * (chat, chat_extract, qa, report) — none of this existed before
 * 2026-09-10, so there was no way to see real per-endpoint GPT spend
 * without pulling it from the OpenAI dashboard by hand. Same
 * non-fatal try/catch pattern as saveChatSession/saveReportResult in
 * the route handlers — a logging failure must never break the actual
 * user-facing response.
 * ------------------------------------------------------------------
 */

import { getSupabaseAdmin } from "./supabase";

// USD per 1M tokens (input/output). Update if OpenAI repricing happens —
// cost_usd is computed at log time, so past rows keep whatever rate was
// true when they were written (not recalculated retroactively).
const PRICING: Record<string, { input: number; output: number }> = {
  "gpt-5.4-mini": { input: 0.75, output: 4.5 },
  "gpt-4o": { input: 2.5, output: 10.0 },
};

export type LlmEndpoint = "chat" | "chat_extract" | "qa" | "report";

export interface LlmUsageEvent {
  sessionId?: string;
  endpoint: LlmEndpoint;
  model: string;
  promptTokens: number;
  completionTokens: number;
}

export async function logLlmUsage(event: LlmUsageEvent): Promise<void> {
  const pricing = PRICING[event.model];
  const costUsd = pricing
    ? (event.promptTokens / 1_000_000) * pricing.input + (event.completionTokens / 1_000_000) * pricing.output
    : null;

  try {
    const { error } = await getSupabaseAdmin().from("llm_usage_log").insert({
      session_id: event.sessionId ?? null,
      endpoint: event.endpoint,
      model: event.model,
      prompt_tokens: event.promptTokens,
      completion_tokens: event.completionTokens,
      cost_usd: costUsd,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[llmUsage] failed to log usage (non-fatal)", err);
  }
}
