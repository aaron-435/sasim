/**
 * app/api/report/route.ts
 * ------------------------------------------------------------------
 * Route Handler ReportScreen calls once on mount to generate the deep
 * report body. Keeps OPENAI_API_KEY server-side only. Mirrors
 * app/api/chat/route.ts's shape and error handling.
 *
 * Request body: { sessionId, moduleId, appUserId?, context: ReportContext }
 * Response body: ReportContent (the front half + locked_pending when the back half is not yet written) | { error: string }
 *
 * 2026-09-20: the paid half of the report is no longer sent to non-buyers (see
 * lib/reportLock.ts). A caller whose purchase RevenueCat confirms gets the full report; anyone
 * else gets the free half plus a sealed token, opened by /api/report/unlock after they buy.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getReportContent } from "@/lib/report";
import type { ReportContext } from "@/lib/reportPrompts";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { checkEntitlement } from "@/lib/revenuecat";

// The report is generated, checked by code, reviewed by a second model pass and fixed where that
// found something — up to ~2 minutes in the worst case. Quality matters more than speed here.
export const maxDuration = 180;

interface ReportRequestBody {
  sessionId?: string;
  moduleId?: string;
  appUserId?: string;
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

  const { sessionId, context, moduleId, appUserId } = body ?? {};

  if (!context || !context.elements || !context.moduleTitle) {
    return NextResponse.json({ error: "context는 필수입니다." }, { status: 400 });
  }

  // The module decides which purchase unlocks this report. App versions from before this fix
  // don't send one: they still get the free half (they show their own paywall over the rest),
  // but nothing the paid half is sealed under, so it simply never leaves the server.
  // Modules whose report carries a short "someone like you" case — only some, so every report
  // doesn't follow the same shape (attachment, burnout, anger, family).
  const CASE_MODULES = new Set(["module1", "module3", "module6", "module9"]);
  const validModule = typeof moduleId === "string" && /^module\d{1,2}$/.test(moduleId) ? moduleId : null;

  try {
    // Only a purchase RevenueCat confirms gets the whole report. Everyone else gets just the front
    // half: the back half is not even written until they buy (POST /api/report/paid), which keeps it
    // off the wire entirely and spares the cost of writing pages most readers never unlock.
    // Any other outcome — no id, not purchased, key not configured, RevenueCat unreachable — is
    // treated as "not purchased" (fail closed).
    const entitled =
      validModule !== null && typeof appUserId === "string" && appUserId.length > 0 && (await checkEntitlement(appUserId, `report_${validModule}`)) === "active";

    const content = await getReportContent(
      { ...context, includeCase: validModule !== null && CASE_MODULES.has(validModule), part: entitled ? "full" : "free" },
      sessionId
    );
    await saveReportResult(sessionId, content);
    if (entitled) return NextResponse.json(content);

    // How many pages the back half holds, so the reader can lay out the table of contents, page
    // totals and paywall note before it exists. Matches the counts the back half's schema demands.
    const locked_shape = { cross_analysis_quotes: 2, strengths: 4, weaknesses: 4, behavior_guides: 4 };
    return NextResponse.json({ ...content, locked_pending: true, locked_shape });
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
