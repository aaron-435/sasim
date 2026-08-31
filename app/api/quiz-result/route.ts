/**
 * app/api/quiz-result/route.ts
 * ------------------------------------------------------------------
 * Fire-and-forget persistence for a completed 30-question module quiz.
 * Scoring itself still happens client-side (lib/quizProfile.ts) — this
 * route just saves the already-computed result. Best-effort: a failure
 * here should never block the user from moving on to the chat step.
 *
 * Request body:
 *   { sessionId, moduleId, moduleTitle, answers, dimensionResults, typeInfo, nuancedSummary }
 * Response body:
 *   { ok: true } or { ok: false } — the client doesn't need to branch on this.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

interface QuizResultBody {
  sessionId?: string;
  moduleId?: string;
  moduleTitle?: string;
  answers?: unknown;
  dimensionResults?: unknown;
  typeInfo?: unknown;
  nuancedSummary?: string;
}

export async function POST(req: NextRequest) {
  let body: QuizResultBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!body.sessionId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const { error } = await getSupabaseAdmin().from("quiz_results").insert({
      session_id: body.sessionId,
      module_id: body.moduleId ?? null,
      module_title: body.moduleTitle ?? null,
      answers: body.answers ?? null,
      dimension_results: body.dimensionResults ?? null,
      type_info: body.typeInfo ?? null,
      nuanced_summary: body.nuancedSummary ?? null,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/quiz-result] failed to persist result (non-fatal)", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
