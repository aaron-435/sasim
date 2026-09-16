/**
 * app/api/dailyFortune/route.ts
 * ------------------------------------------------------------------
 * 구독자 전용 "오늘의 운세" / "이번주 운세" 리소스 (mobile/screens/FortuneScreen.tsx).
 * 구독 여부 자체는 클라이언트가 RevenueCat으로 이미 확인하므로(lib/purchases.ts의
 * hasQaProEntitlement), 여기선 강제하지 않는다 — /api/compatibility와 같은 원칙
 * (권한/과금과 무관한 콘텐츠 계산이라 서버가 다시 확인할 상태가 없음).
 *
 * GET ?selfDayMasterChar=갑&selfDayBranch=자&mode=daily|weekly
 * response: { daily: DayFortune } | { weekly: DayFortune[] }
 *
 * 2026-09-16: selfDayBranch를 선택 파라미터로 추가했다 — 십이신살 계산이
 * 본인의 일지(그룹)를 기준으로 삼기 때문(lib/twelveStages.ts 참고). 필수로
 * 만들지 않은 이유는 lib/dailyFortune.ts의 헤더 주석 참고 — OTA 배포 전
 * 구버전 앱이 이 값을 안 보내도 나머지 응답은 그대로 받아야 한다.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { getDailyFortune, getWeeklyFortune } from "@/lib/dailyFortune";

export async function GET(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "daily-fortune-get", 30, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  const selfDayMasterChar = req.nextUrl.searchParams.get("selfDayMasterChar");
  const selfDayBranch = req.nextUrl.searchParams.get("selfDayBranch");
  const mode = req.nextUrl.searchParams.get("mode") === "weekly" ? "weekly" : "daily";

  if (!selfDayMasterChar) {
    return NextResponse.json({ error: "selfDayMasterChar가 필요합니다." }, { status: 400 });
  }

  try {
    if (mode === "weekly") {
      const weekly = await getWeeklyFortune(selfDayMasterChar, selfDayBranch);
      return NextResponse.json({ weekly });
    }
    const daily = await getDailyFortune(selfDayMasterChar, selfDayBranch);
    return NextResponse.json({ daily });
  } catch (err) {
    console.error("[api/dailyFortune] failed", err);
    return NextResponse.json({ error: "운세 계산 중 오류가 발생했습니다." }, { status: 500 });
  }
}
