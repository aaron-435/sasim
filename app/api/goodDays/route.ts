/**
 * app/api/goodDays/route.ts
 * ------------------------------------------------------------------
 * "좋은 날 찾기" for subscribers (lib/goodDays.ts). Unlike /api/dailyFortune, this one checks
 * the qa_premium subscription on the server (lib/revenuecat.ts) and fails closed — it is a
 * subscriber-only list, so a missing secret key or a RevenueCat outage refuses rather than
 * handing it out.
 *
 * POST { appUserId, selfDayMasterChar, selfDayBranch?, purpose, scope? }  (scope "month" = today through this month's end; omitted = next 30 days)
 * 200  { goodDays: { purpose, days: GoodDay[] } }
 * 400 bad_request · 401 no_user (no RevenueCat id, e.g. web preview) · 403 not_subscribed
 * 503 unavailable (unconfigured / RevenueCat error)
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { checkEntitlement } from "@/lib/revenuecat";
import { STEM_ELEMENT } from "@/lib/sajuType";
import { getGoodDays, isGoodDayPurpose, isGoodDaysScope } from "@/lib/goodDays";

// Same id as mobile/lib/purchases.ts QA_PRO_ENTITLEMENT_ID — the one subscription.
const SUBSCRIPTION_ENTITLEMENT_ID = "qa_premium";

interface Body {
  appUserId?: string | null;
  selfDayMasterChar?: string;
  selfDayBranch?: string | null;
  purpose?: string;
  scope?: string;
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "good-days", 20, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  const { selfDayMasterChar, purpose } = body;
  if (!selfDayMasterChar || !STEM_ELEMENT[selfDayMasterChar] || !isGoodDayPurpose(purpose)) {
    return NextResponse.json({ error: "selfDayMasterChar와 purpose가 필요합니다.", code: "bad_request" }, { status: 400 });
  }
  if (body.scope !== undefined && !isGoodDaysScope(body.scope)) {
    return NextResponse.json({ error: "scope 값이 올바르지 않습니다.", code: "bad_request" }, { status: 400 });
  }
  if (!body.appUserId) {
    return NextResponse.json({ error: "구독 확인에 필요한 사용자 id가 없습니다.", code: "no_user" }, { status: 401 });
  }

  const entitlement = await checkEntitlement(body.appUserId, SUBSCRIPTION_ENTITLEMENT_ID);
  if (entitlement === "inactive") {
    return NextResponse.json({ error: "구독 전용 기능입니다.", code: "not_subscribed" }, { status: 403 });
  }
  if (entitlement !== "active") {
    return NextResponse.json({ error: "지금은 확인할 수 없어요.", code: "unavailable" }, { status: 503 });
  }

  try {
    const days = await getGoodDays(selfDayMasterChar, body.selfDayBranch ?? null, purpose, body.scope);
    return NextResponse.json({ goodDays: { purpose, days } });
  } catch (err) {
    console.error("[api/goodDays] failed", err);
    return NextResponse.json({ error: "계산 중 오류가 발생했습니다.", code: "failed" }, { status: 500 });
  }
}
