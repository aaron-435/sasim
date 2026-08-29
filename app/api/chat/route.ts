/**
 * app/api/chat/route.ts
 * ------------------------------------------------------------------
 * Route Handler the ChatScreen calls once per bot turn (1-7), including
 * turn 1 (fired automatically on mount, before any user message — see
 * lib/chatPrompts.ts's opener instruction). Keeps OPENAI_API_KEY
 * server-side only.
 *
 * Request body:
 *   { turnNumber, sessionStartedAt, context: ChatSessionContext, history: ChatMessage[] }
 *
 * Response body:
 *   { lines: string[] }
 *   { lines, extract: ChatExtract }  — only when turnNumber >= 7
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
    const { lines } = await getChatReply({
      turnNumber,
      history,
      context,
      sessionStartedAt: sessionStartedAt ?? Date.now(),
    });

    if (turnNumber >= TOTAL_TURNS) {
      // 추출 프롬프트는 한 턴 = 한 메시지 단위로 트랜스크립트를 읽으므로,
      // 화면에 여러 버블로 나뉘어 보이는 lines를 다시 한 줄로 합쳐서 전달한다.
      const fullTranscript: ChatMessage[] = [...history, { role: "assistant", content: lines.join(" ") }];
      const extract = await extractChatSummary(fullTranscript, context);
      return NextResponse.json({ lines, extract });
    }

    return NextResponse.json({ lines });
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
