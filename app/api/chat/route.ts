/**
 * app/api/chat/route.ts
 * ------------------------------------------------------------------
 * Route Handler the ChatScreen calls once per bot turn (1-TOTAL_TURNS, see
 * lib/chatPrompts.ts), including turn 1 (fired automatically on mount,
 * before any user message — see lib/chatPrompts.ts's opener instruction).
 * Keeps OPENAI_API_KEY server-side only.
 *
 * Request body:
 *   { turnNumber, sessionStartedAt, context: ChatSessionContext, history: ChatMessage[], formulation?: ChatFormulation, choicePicks?: number[] }
 *   formulation is the previous response's hidden memo, echoed back unchanged by the app (TODO Q1-c).
 *   context.flowVersion === 2 + context.quizAnswers (30문항) → 5세트 25턴 흐름(TODO 4). 없으면 20턴 흐름 그대로.
 *
 * Response body:
 *   { lines: string[], formulation?: ChatFormulation, choices?: string[], inputOnly?: boolean }  — choices(보기 2~3개)는 flowVersion 3에서만, 검증 통과 시에만. inputOnly는 flowVersion 4의 21턴(직접 입력만)에만. formulation is never shown or saved; the app keeps it for the next request
 *   { lines, extract: ChatExtract }  — only when isFinalTurn() is true (turnNumber >= TOTAL_TURNS, or the client jumped straight there via the CHECKPOINT_TURN early-finish path)
 *     5세트 흐름이면 extract.set_packets(세트 재료 묶음 5개)가 붙는다.
 *   or { error: string } with a non-200 status
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { attachSetPackets, getChatReply, getChatReplyV4, extractChatSummary, type ChatMessage } from "@/lib/chat";
import type { ChatSessionContext } from "@/lib/chatPrompts";
import { chatFlowVersion, sanitizeFormulation } from "@/lib/chatPrompts";
import { isFinalTurn } from "@/lib/chatPrompts";
import { sanitizeQuizAnswers } from "@/lib/chatSets";
import { sanitizeChoicePicks } from "@/lib/chatChoices";
import { ensureSession, getSupabaseAdmin } from "@/lib/supabase";
import { rateLimitOrResponse } from "@/lib/rateLimit";

interface ChatRequestBody {
  turnNumber?: number;
  sessionStartedAt?: number;
  context?: ChatSessionContext;
  history?: ChatMessage[];
  sessionId?: string;
  formulation?: unknown;
  /** 2026-10-20 (작업 17): 보기를 탭해서 답한 봇 턴 번호. history는 건드리지 않는다. */
  choicePicks?: unknown;
}

async function saveChatSession(sessionId: string | undefined, transcript: ChatMessage[], extract: unknown) {
  if (!sessionId) return;
  try {
    if (!(await ensureSession(sessionId))) return;
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

  const { turnNumber, sessionStartedAt, context: rawContext, history, sessionId, formulation, choicePicks: rawChoicePicks } = body ?? {};
  // 2026-10-20 (작업 17): 클라이언트가 보낸 보기 탭 목록이라 정제해서 쓴다. history에는 필드를 더하지 않는다.
  const choicePicks = sanitizeChoicePicks(rawChoicePicks);

  if (!turnNumber || !rawContext || !Array.isArray(history)) {
    return NextResponse.json({ error: "turnNumber, context, history는 필수입니다." }, { status: 400 });
  }
  // 30문항 답은 시스템 프롬프트와 extract에 들어가므로 형식·길이를 거른다. 구버전 앱은 보내지 않는다(빈 배열 → 20턴 흐름).
  const context: ChatSessionContext = { ...rawContext, quizAnswers: sanitizeQuizAnswers(rawContext.quizAnswers) };

  try {
    const resolvedStartedAt = sessionStartedAt ?? Date.now();
    const replyParams = {
      turnNumber,
      history,
      context,
      sessionStartedAt: resolvedStartedAt,
      sessionId,
      // Client-supplied, so it goes through the same length caps and whitelist as the model's output.
      formulation: sanitizeFormulation(formulation),
    };
    // 2026-10-21 (작업 04): flow 4는 모델 없이 고정 스크립트로 응답한다. inputOnly는 그대로 실어 보낸다.
    const { lines, formulation: nextFormulation, choices, inputOnly } =
      chatFlowVersion(context) === 4 ? await getChatReplyV4(replyParams) : await getChatReply(replyParams);

    // A slow typer who blows past the time limit gets the closing message on
    // their *next* reply (see isFinalTurn's docstring) — so this must check
    // elapsed time too, not just turnNumber, or the model would say goodbye
    // while the route keeps waiting for turnNumber to reach TOTAL_TURNS.
    const elapsedMinutes = Math.floor((Date.now() - resolvedStartedAt) / 60000);
    if (isFinalTurn(turnNumber, elapsedMinutes, chatFlowVersion(context))) {
      // 추출 프롬프트는 한 턴 = 한 메시지 단위로 트랜스크립트를 읽으므로,
      // 화면에 여러 버블로 나뉘어 보이는 lines를 다시 한 줄로 합쳐서 전달한다.
      const fullTranscript: ChatMessage[] = [...history, { role: "assistant", content: lines.join(" ") }];
      // 2026-10-20 (작업 17): extractChatSummary는 v3 묶음 답을 fullTranscript에서 직접 뽑아
      // 추출 프롬프트와 빈 필드 채우기에 쓴다. attachSetPackets에는 정제한 choicePicks를 넘긴다.
      const extract = attachSetPackets(await extractChatSummary(fullTranscript, context, sessionId), fullTranscript, context, choicePicks);
      await saveChatSession(sessionId, fullTranscript, extract);
      return NextResponse.json({ lines, extract });
    }

    return NextResponse.json({
      lines,
      ...(nextFormulation && { formulation: nextFormulation }),
      ...(choices && { choices }),
      ...(inputOnly && { inputOnly }),
    });
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
