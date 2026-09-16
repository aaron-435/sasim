/**
 * app/api/yearFortune/route.ts
 * ------------------------------------------------------------------
 * "신년운세" (Year Fortune) resource — same principles as
 * app/api/dailyFortune/route.ts (no server-side auth check, since this
 * is content computation, not a paid/permissioned resource the server
 * needs to gate; the client already checked RevenueCat before calling).
 *
 * GET ?selfDayMasterChar=갑&selfDayBranch=자&year=2027&mode=yearly|monthly
 * response: { yearFortune: YearFortune } | { monthly: MonthFortune[] }
 *
 * selfDayBranch is optional (see lib/yearFortune.ts's header for why);
 * year defaults to the next saju-year if omitted, matching this
 * feature's "신년운세" (New Year Fortune) framing.
 *
 * 2026-09-16: mode=monthly added (Phase 2) — same year, broken into its
 * 12 saju-months, mirroring dailyFortune's mode=daily|weekly split.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { currentSajuYear, getMonthlyFortune, getYearFortune } from "@/lib/yearFortune";

export async function GET(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "year-fortune-get", 30, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  const selfDayMasterChar = req.nextUrl.searchParams.get("selfDayMasterChar");
  const selfDayBranch = req.nextUrl.searchParams.get("selfDayBranch");
  const yearParam = req.nextUrl.searchParams.get("year");
  const year = yearParam ? Number(yearParam) : currentSajuYear() + 1;
  const mode = req.nextUrl.searchParams.get("mode") === "monthly" ? "monthly" : "yearly";

  if (!selfDayMasterChar) {
    return NextResponse.json({ error: "selfDayMasterChar가 필요합니다." }, { status: 400 });
  }
  if (!Number.isInteger(year)) {
    return NextResponse.json({ error: "year는 정수여야 합니다." }, { status: 400 });
  }

  try {
    if (mode === "monthly") {
      const monthly = getMonthlyFortune(selfDayMasterChar, selfDayBranch, year);
      return NextResponse.json({ monthly });
    }
    const yearFortune = getYearFortune(selfDayMasterChar, selfDayBranch, year);
    return NextResponse.json({ yearFortune });
  } catch (err) {
    console.error("[api/yearFortune] failed", err);
    return NextResponse.json({ error: "운세 계산 중 오류가 발생했습니다." }, { status: 500 });
  }
}
