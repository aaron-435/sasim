/**
 * app/api/report/paid/route.ts
 * ------------------------------------------------------------------
 * Writes the back half of a deep report — but only for a caller whose purchase of that report's
 * module RevenueCat confirms right now. POST /api/report only writes the front half for everyone
 * else, so the paid pages do not exist (and cost nothing) until someone buys them.
 *
 * Request:  POST { moduleId, appUserId, context, freePart }
 *           context = the same ReportContext /api/report received; freePart = the front half the
 *           reader already saw (used only so the back half continues it instead of repeating it)
 * Response: { moduleId, locked } | { error, code }
 *           code: "not_purchased" (402), "unavailable" (503), "bad_request" (400)
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getPaidPart } from "@/lib/report";
import type { ReportContext } from "@/lib/reportPrompts";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { checkEntitlement } from "@/lib/revenuecat";

// Written, checked and reviewed like the front half: up to ~1 minute.
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "report-paid", 8, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: { moduleId?: unknown; appUserId?: unknown; context?: ReportContext; freePart?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }
  const { moduleId, appUserId, context, freePart } = body ?? {};
  if (
    typeof moduleId !== "string" ||
    !/^module\d{1,2}$/.test(moduleId) ||
    typeof appUserId !== "string" ||
    !appUserId ||
    !context ||
    !context.elements ||
    !context.moduleTitle
  ) {
    return NextResponse.json({ error: "moduleId, appUserId, context가 필요합니다.", code: "bad_request" }, { status: 400 });
  }

  const entitlement = await checkEntitlement(appUserId, `report_${moduleId}`);
  if (entitlement === "inactive") return NextResponse.json({ error: "구매한 리포트가 아닙니다.", code: "not_purchased" }, { status: 402 });
  if (entitlement !== "active") return NextResponse.json({ error: "지금은 리포트를 열 수 없어요.", code: "unavailable" }, { status: 503 });

  try {
    const free = freePart && typeof freePart === "object" && !Array.isArray(freePart) ? (freePart as Record<string, unknown>) : {};
    const locked = await getPaidPart({ ...context, includeCase: false }, free);
    return NextResponse.json({ moduleId, locked });
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      console.error("[api/report/paid] OpenAI error", err.status, err.message);
      return NextResponse.json({ error: "리포트 생성 서비스가 일시적으로 불안정합니다.", code: "unavailable" }, { status: err.status === 429 ? 429 : 503 });
    }
    console.error("[api/report/paid] unexpected error", err);
    return NextResponse.json({ error: "리포트 생성 중 오류가 발생했습니다.", code: "unavailable" }, { status: 500 });
  }
}
