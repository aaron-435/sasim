/**
 * app/api/chat/route.ts
 * ------------------------------------------------------------------
 * Route Handler the ChatScreen calls once per bot turn (1-7). Keeps
 * OPENAI_API_KEY server-side only. See 챗봇_3턴시나리오_5.md and
 * lib/chatPrompts.ts for the conversation design.
 *
 * Request body:
 *   { turnNumber, sessionStartedAt, context: ChatSessionContext, history: ChatMessage[] }
 *
 * Response body:
 *   { reply: string, chips?: string[] }
 *   { reply, chips?, extract: ChatExtract }  — only when turnNumber >= 7
 *   or { error: string } with a non-200 status
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getChatReply, extractChatSummary, type ChatMessage } from "@/lib/chat";
import type { ChatSessionContext } from "@/lib/chatPrompts";
import { TOTAL_TURNS } from "@/lib/chatPrompts";

interface ChatRequestBody {
  turnNumber?: number;
  sessionStartedAt?: number;
  context?: ChatSessionContext;
  history?: ChatMessage[];
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { turnNumber, sessionStartedAt, context, history } = body ?? {};

  if (!turnNumber || !context || !Array.isArray(history)) {
    return NextResponse.json({ error: "turnNumber, context, history는 필수입니다." }, { status: 400 });
  }

  try {
    const { text, chips } = await getChatReply({
      turnNumber,
      history,
      context,
      sessionStartedAt: sessionStartedAt ?? Date.now(),
    });

    if (turnNumber >= TOTAL_TURNS) {
      const fullTranscript: ChatMessage[] = [...history, { role: "assistant", content: text }];
      const extract = await extractChatSummary(fullTranscript, context);
      return NextResponse.json({ reply: text, chips, extract });
    }

    return NextResponse.json({ reply: text, chips });
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
