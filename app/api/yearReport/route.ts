/**
 * app/api/yearReport/route.ts
 * ------------------------------------------------------------------
 * Generates the paid year-ahead report (lib/yearReport.ts). Unlike /api/report, this one
 * verifies the purchase on the server (lib/revenuecat.ts) before spending GPT tokens or
 * returning anything, so the content can't be pulled without buying.
 *
 * Request:  POST { appUserId, locale, nickname, selfDayMasterChar, selfDayBranch?,
 *                  elements?, sajuTypeName?, sessionId?, year?, currentAge?, decadeFortune? }
 * Response: YearReportContent | { error, code }   code: "not_purchased" | "unavailable" | ...
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { Locale } from "@/lib/i18n/types";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { checkEntitlement, yearReportEntitlementId } from "@/lib/revenuecat";
import { getSupabaseAdmin } from "@/lib/supabase";
import { STEM_ELEMENT } from "@/lib/sajuType";
import { getYearReportContent } from "@/lib/yearReport";
import type { ReportDecadeFortune } from "@/lib/reportPrompts";
import { currentSajuYear, getMonthlyFortune, getYearFortune } from "@/lib/yearFortune";
import type { ElementKey } from "@/lib/sajuScore";

interface Body {
  appUserId?: string;
  locale?: string;
  nickname?: string;
  selfDayMasterChar?: string;
  selfDayBranch?: string | null;
  elements?: Record<string, number> | null;
  sajuTypeName?: string | null;
  sessionId?: string;
  year?: number;
  /** From /api/saju (see mobile/App.tsx's homeData.sajuResult) — engine internals, passed through
   * as-is to describeUpcomingPeriod() same as lib/reportPrompts.ts's ReportContext does. */
  currentAge?: number;
  decadeFortune?: ReportDecadeFortune | null;
}

const LOCALES: Locale[] = ["ko", "en", "es"];
const ELEMENT_KEYS: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

function cleanElements(value: Body["elements"]): Record<ElementKey, number> | null {
  if (!value) return null;
  const result = {} as Record<ElementKey, number>;
  for (const key of ELEMENT_KEYS) {
    const n = Number(value[key]);
    if (!Number.isFinite(n)) return null;
    result[key] = n;
  }
  return result;
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "year-report", 5, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  const locale = LOCALES.includes(body.locale as Locale) ? (body.locale as Locale) : "ko";
  const nickname = (body.nickname ?? "").toString().trim().slice(0, 40) || (locale === "ko" ? "회원" : "you");
  const selfDayMasterChar = body.selfDayMasterChar;
  if (!selfDayMasterChar || !body.appUserId) {
    return NextResponse.json({ error: "selfDayMasterChar와 appUserId가 필요합니다.", code: "bad_request" }, { status: 400 });
  }

  // Only the saju year in progress or the coming one — the two a person could sensibly buy.
  const now = currentSajuYear();
  const year = body.year === now || body.year === now + 1 ? body.year : now + 1;

  const entitlement = await checkEntitlement(body.appUserId, yearReportEntitlementId(year));
  if (entitlement === "inactive") {
    return NextResponse.json({ error: "구매한 리포트가 아닙니다.", code: "not_purchased" }, { status: 402 });
  }
  if (entitlement !== "active") {
    // "unconfigured" (no RevenueCat secret on the server) or "error": fail closed.
    return NextResponse.json({ error: "지금은 리포트를 만들 수 없어요.", code: "unavailable" }, { status: 503 });
  }

  try {
    const selfDayBranch = body.selfDayBranch ?? null;
    const yearFortune = getYearFortune(selfDayMasterChar, selfDayBranch, year);
    const months = getMonthlyFortune(selfDayMasterChar, selfDayBranch, year);
    const content = await getYearReportContent(
      {
        locale,
        nickname,
        year,
        dayMasterChar: selfDayMasterChar,
        dayMasterElement: STEM_ELEMENT[selfDayMasterChar] ?? null,
        elements: cleanElements(body.elements),
        sajuTypeName: (body.sajuTypeName ?? "").toString().slice(0, 80) || null,
        yearFortune,
        months,
        currentAge: typeof body.currentAge === "number" ? body.currentAge : undefined,
        decadeFortune: body.decadeFortune ?? null,
      },
      body.sessionId,
    );

    // Best-effort copy, same as /api/report. Never blocks the response.
    if (body.sessionId) {
      try {
        const { error } = await getSupabaseAdmin().from("report_results").insert({ session_id: body.sessionId, content });
        if (error) throw error;
      } catch (err) {
        console.error("[api/yearReport] failed to persist (non-fatal)", err);
      }
    }
    return NextResponse.json(content);
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      if (err.status === 429) return NextResponse.json({ error: "요청이 많아 잠시 후 다시 시도해주세요.", code: "rate_limited" }, { status: 429 });
      if (err.status && err.status >= 500) return NextResponse.json({ error: "리포트 생성 서비스가 일시적으로 불안정합니다.", code: "upstream" }, { status: 503 });
      return NextResponse.json({ error: "일시적인 서비스 오류입니다.", code: "upstream" }, { status: 502 });
    }
    console.error("[api/yearReport] failed", err);
    // Incomplete model output lands here too — retryable.
    return NextResponse.json({ error: "리포트 생성 중 오류가 발생했습니다.", code: "failed" }, { status: 500 });
  }
}
