/**
 * app/api/solarTerms/route.ts
 * ------------------------------------------------------------------
 * 앱의 절기 알림(2026-10-06)이 예약할 날짜. 지금부터 1년 안의 24절기 시각을
 * 엔진과 같은 태양 황경 계산(lib/solarTerms.ts)으로 돌려준다. 사용자 데이터가
 * 필요 없는 공개 계산이라 입력이 없다. "나에게 주는 의미" 문구는 앱이 자기 일간
 * 오행과 각 절기의 계절 오행(seasonElement)으로 고른다.
 *
 * GET → { terms: SolarTermEvent[] }
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { upcomingSolarTerms } from "@/lib/solarTerms";

export async function GET(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "solar-terms-get", 30, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;
  const terms = upcomingSolarTerms(new Date(), 366);
  return NextResponse.json({ terms }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
