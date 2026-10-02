/**
 * app/api/chat/route.ts
 * ------------------------------------------------------------------
 * Route Handler the ChatScreen calls once per bot turn (1-TOTAL_TURNS, see
 * lib/chatPrompts.ts), including turn 1 (fired automatically on mount,
 * before any user message — see lib/chatPrompts.ts's opener instruction).
 * Keeps OPENAI_API_KEY server-side only.
 *
 * Request body:
 *   { turnNumber, sessionStartedAt, context: ChatSessionContext, history: ChatMessage[], formulation?: ChatFormulation }
 *   formulation is the previous response's hidden memo, echoed back unchanged by the app (TODO Q1-c).
 *   context.flowVersion === 2 + context.quizAnswers (30문항) → 5세트 25턴 흐름(TODO 4). 없으면 20턴 흐름 그대로.
 *
 * Response body:
 *   { lines: string[], formulation?: ChatFormulation }  — formulation is never shown or saved; the app keeps it for the next request
 *   { lines, extract: ChatExtract }  — only when isFinalTurn() is true (turnNumber >= TOTAL_TURNS, or the client jumped straight there via the CHECKPOINT_TURN early-finish path)
 *     5세트 흐름이면 extract.set_packets(세트 재료 묶음 5개)가 붙는다.
 *   or { error: string } with a non-200 status
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { attachSetPackets, getChatReply, extractChatSummary, type ChatMessage } from "@/lib/chat";
import type { ChatSessionContext } from "@/lib/chatPrompts";
import { chatFlowVersion, sanitizeFormulation } from "@/lib/chatPrompts";
import { isFinalTurn } from "@/lib/chatPrompts";
import { sanitizeQuizAnswers } from "@/lib/chatSets";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimitOrResponse } from "@/lib/rateLimit";

interface ChatRequestBody {
  turnNumber?: number;
  sessionStartedAt?: number;
  context?: ChatSessionContext;
  history?: ChatMessage[];
  sessionId?: string;
  formulation?: unknown;
}

async function saveChatSession(sessionId: string | undefined, transcript: ChatMessage[], extract: unknown) {
  if (!sessionId) return;
  try {
    const { error } = await getSupabaseAdmin().from("chat_sessions").insert({ session_id: sessionId, transcript, extract });
    if (error) throw error;
  } catch (err) {
    console.error("[api/chat] failed to persist chat session (non-fatal)", err);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "chat", 60, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { turnNumber, sessionStartedAt, context: rawContext, history, sessionId, formulation } = body ?? {};

  if (!turnNumber || !rawContext || !Array.isArray(history)) {
    return NextResponse.json({ error: "turnNumber, context, history는 필수입니다." }, { status: 400 });
  }
  // 30문항 답은 시스템 프롬프트와 extract에 들어가므로 형식·길이를 거른다. 구버전 앱은 보내지 않는다(빈 배열 → 20턴 흐름).
  const context: ChatSessionContext = { ...rawContext, quizAnswers: sanitizeQuizAnswers(rawContext.quizAnswers) };

  try {
    const resolvedStartedAt = sessionStartedAt ?? Date.now();
    const { lines, formulation: nextFormulation } = await getChatReply({
      turnNumber,
      history,
      context,
      sessionStartedAt: resolvedStartedAt,
      sessionId,
      // Client-supplied, so it goes through the same length caps and whitelist as the model's output.
      formulation: sanitizeFormulation(formulation),
    });

    // A slow typer who blows past the time limit gets the closing message on
    // their *next* reply (see isFinalTurn's docstring) — so this must check
    // elapsed time too, not just turnNumber, or the model would say goodbye
    // while the route keeps waiting for turnNumber to reach TOTAL_TURNS.
    const elapsedMinutes = Math.floor((Date.now() - resolvedStartedAt) / 60000);
    if (isFinalTurn(turnNumber, elapsedMinutes, chatFlowVersion(context))) {
      // 추출 프롬프트는 한 턴 = 한 메시지 단위로 트랜스크립트를 읽으므로,
      // 화면에 여러 버블로 나뉘어 보이는 lines를 다시 한 줄로 합쳐서 전달한다.
      const fullTranscript: ChatMessage[] = [...history, { role: "assistant", content: lines.join(" ") }];
      const extract = attachSetPackets(await extractChatSummary(fullTranscript, context, sessionId), fullTranscript, context);
      await saveChatSession(sessionId, fullTranscript, extract);
      return NextResponse.json({ lines, extract });
    }

    return NextResponse.json({ lines, ...(nextFormulation && { formulation: nextFormulation }) });
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      if (err.status === 401) {
        console.error("[api/chat] auth error", err.code, err.message);
        return NextResponse.json({ error: "일시적인 서비스 오류입니다. 잠시 후 다시 시도해주세요." }, { status: 502 });
      }
      if (err.status === 429) {
        return NextResponse.json({ error: "요청이 많아 잠시 후 다시 시도해주세요." }, { status: 429 });
      }
      if (err.status && err.status >= 500) {
        return NextResponse.json({ error: "챗봇 서비스가 일시적으로 불안정합니다. 다시 시도해주세요." }, { status: 503 });
      }
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("[api/chat] unexpected error", err);
    return NextResponse.json({ error: "챗봇 응답 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
