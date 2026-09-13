/**
 * app/api/qa-answer/route.ts
 * ------------------------------------------------------------------
 * Route Handler for components/QAChat.jsx — one call per question the
 * user picks from lib/questionBank.json. Keeps OPENAI_API_KEY
 * server-side only, same as /api/chat.
 *
 * Request body:
 *   { nickname, question, sajuResult, sessionId }
 *   sajuResult is whatever /api/saju already returned to the client —
 *   passed straight through, not re-fetched. sessionId is optional,
 *   used only to attribute LLM cost logging (see lib/llmUsage.ts).
 *
 * Response body:
 *   { lines: string[] }  or  { error: string } with a non-200 status
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getQAAnswer } from "@/lib/qaChat";
import type { Locale } from "@/lib/i18n/types";
import { rateLimitOrResponse } from "@/lib/rateLimit";

interface QAAnswerRequestBody {
  nickname?: string;
  question?: string;
  sajuResult?: {
    elements?: unknown;
    dominantElement?: unknown;
    fourPillars?: unknown;
    decadeFortune?: unknown;
    summary?: unknown;
  };
  sessionId?: string;
  /** Defaults to "ko" when absent — only the native app sends this today. */
  locale?: Locale;
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "qa-answer", 20, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: QAAnswerRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { nickname, question, sajuResult, sessionId, locale } = body ?? {};

  if (!question || !sajuResult) {
    return NextResponse.json({ error: "question, sajuResult는 필수입니다." }, { status: 400 });
  }

  try {
    const { lines } = await getQAAnswer(
      {
        nickname: nickname?.trim() || "회원",
        question,
        sajuResult,
        locale,
      },
      sessionId
    );
    return NextResponse.json({ lines });
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      if (err.status === 401) {
        console.error("[api/qa-answer] auth error", err.code, err.message);
        return NextResponse.json({ error: "일시적인 서비스 오류입니다. 잠시 후 다시 시도해주세요." }, { status: 502 });
      }
      if (err.status === 429) {
        return NextResponse.json({ error: "요청이 많아 잠시 후 다시 시도해주세요." }, { status: 429 });
      }
      if (err.status && err.status >= 500) {
        return NextResponse.json({ error: "답변 생성 서비스가 일시적으로 불안정합니다. 다시 시도해주세요." }, { status: 503 });
      }
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("[api/qa-answer] unexpected error", err);
    return NextResponse.json({ error: "답변 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
