/**
 * app/api/dailyFortune/route.ts
 * ------------------------------------------------------------------
 * 구독자 전용 "오늘의 운세" / "이번주 운세" 리소스 (mobile/screens/FortuneScreen.tsx).
 * 구독 여부 자체는 클라이언트가 RevenueCat으로 이미 확인하므로(lib/purchases.ts의
 * hasQaProEntitlement), 여기선 강제하지 않는다 — /api/compatibility와 같은 원칙
 * (권한/과금과 무관한 콘텐츠 계산이라 서버가 다시 확인할 상태가 없음).
 *
 * GET ?selfDayMasterChar=갑&mode=daily|weekly
 * response: { daily: DayFortune } | { weekly: DayFortune[] }
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { getDailyFortune, getWeeklyFortune } from "@/lib/dailyFortune";

export async function GET(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "daily-fortune-get", 30, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  const selfDayMasterChar = req.nextUrl.searchParams.get("selfDayMasterChar");
  const mode = req.nextUrl.searchParams.get("mode") === "weekly" ? "weekly" : "daily";

  if (!selfDayMasterChar) {
    return NextResponse.json({ error: "selfDayMasterChar가 필요합니다." }, { status: 400 });
  }

  try {
    if (mode === "weekly") {
      const weekly = await getWeeklyFortune(selfDayMasterChar);
      return NextResponse.json({ weekly });
    }
    const daily = await getDailyFortune(selfDayMasterChar);
    return NextResponse.json({ daily });
  } catch (err) {
    console.error("[api/dailyFortune] failed", err);
    return NextResponse.json({ error: "운세 계산 중 오류가 발생했습니다." }, { status: 500 });
  }
}
