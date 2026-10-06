/**
 * app/api/journalReport/route.ts
 * ------------------------------------------------------------------
 * Month-end pattern report for the one-line journal (subscriber, lib/journalReport.ts). The
 * journal stays on the device; the app sends one month of entries, this route reads them inside
 * the request and writes nothing to Supabase (llm_usage_log gets token counts only, through
 * logLlmUsage). Subscription is checked here and fails closed, like /api/goodDays.
 *
 * POST { appUserId, locale, month: "YYYY-MM", selfDayMasterChar, selfDayBranch?, entries: [{ date, mood, note? }] }
 * 200  { report: { title, observations[3-5], closing } }  or  { safety: true } when an entry
 *      carries a self-harm signal (no generation; the app shows the help lines instead)
 * 400 bad_request · 401 no_user · 403 not_subscribed · 503 unavailable · 500 failed
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { checkEntitlement } from "@/lib/revenuecat";
import { hasCrisisSignal, MIN_JOURNAL_ENTRIES, parseJournalRequest } from "@/lib/journal";
import { attachRhythms, generateJournalReport } from "@/lib/journalReport";

// Same id as mobile/lib/purchases.ts QA_PRO_ENTITLEMENT_ID — the one subscription.
const SUBSCRIPTION_ENTITLEMENT_ID = "qa_premium";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "journal-report", 6, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  const parsed = parseJournalRequest(body);
  if (typeof parsed === "string") {
    return NextResponse.json({ error: "요청 값을 확인해 주세요.", code: "bad_request", field: parsed }, { status: 400 });
  }

  const appUserId = (body as { appUserId?: unknown }).appUserId;
  if (typeof appUserId !== "string" || !appUserId) {
    return NextResponse.json({ error: "구독 확인에 필요한 사용자 id가 없습니다.", code: "no_user" }, { status: 401 });
  }

  const entitlement = await checkEntitlement(appUserId, SUBSCRIPTION_ENTITLEMENT_ID);
  if (entitlement === "inactive") {
    return NextResponse.json({ error: "구독 전용 기능입니다.", code: "not_subscribed" }, { status: 403 });
  }
  if (entitlement !== "active") {
    return NextResponse.json({ error: "지금은 확인할 수 없어요.", code: "unavailable" }, { status: 503 });
  }

  // A month that holds a self-harm line doesn't get a pattern reading; the app shows help lines.
  if (hasCrisisSignal(parsed.entries)) {
    return NextResponse.json({ safety: true });
  }

  try {
    const days = await attachRhythms(parsed);
    if (days.length < MIN_JOURNAL_ENTRIES) {
      return NextResponse.json({ error: "지금은 확인할 수 없어요.", code: "unavailable" }, { status: 503 });
    }
    const report = await generateJournalReport(parsed, days);
    return NextResponse.json({ report });
  } catch (err) {
    console.error("[api/journalReport] failed", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "생성 중 오류가 발생했습니다.", code: "failed" }, { status: 500 });
  }
}
