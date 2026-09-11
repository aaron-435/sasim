/**
 * app/api/report/route.ts
 * ------------------------------------------------------------------
 * Route Handler ReportScreen calls once on mount to generate the deep
 * report body. Keeps OPENAI_API_KEY server-side only. Mirrors
 * app/api/chat/route.ts's shape and error handling.
 *
 * Request body: { sessionId, context: ReportContext }
 * Response body: ReportContent | { error: string }
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getReportContent } from "@/lib/report";
import type { ReportContext } from "@/lib/reportPrompts";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimitOrResponse } from "@/lib/rateLimit";

interface ReportRequestBody {
  sessionId?: string;
  context?: ReportContext;
}

async function saveReportResult(sessionId: string | undefined, content: unknown) {
  if (!sessionId) return;
  try {
    const { error } = await getSupabaseAdmin().from("report_results").insert({ session_id: sessionId, content });
    if (error) throw error;
  } catch (err) {
    console.error("[api/report] failed to persist report (non-fatal)", err);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "report", 10, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: ReportRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { sessionId, context } = body ?? {};

  if (!context || !context.elements || !context.moduleTitle) {
    return NextResponse.json({ error: "context는 필수입니다." }, { status: 400 });
  }

  try {
    const content = await getReportContent(context, sessionId);
    await saveReportResult(sessionId, content);
    return NextResponse.json(content);
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      if (err.status === 401) {
        console.error("[api/report] auth error", err.code, err.message);
        return NextResponse.json({ error: "일시적인 서비스 오류입니다. 잠시 후 다시 시도해주세요." }, { status: 502 });
      }
      if (err.status === 429) {
        return NextResponse.json({ error: "요청이 많아 잠시 후 다시 시도해주세요." }, { status: 429 });
      }
      if (err.status && err.status >= 500) {
        return NextResponse.json({ error: "리포트 생성 서비스가 일시적으로 불안정합니다. 다시 시도해주세요." }, { status: 503 });
      }
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("[api/report] unexpected error", err);
    return NextResponse.json({ error: "리포트 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
