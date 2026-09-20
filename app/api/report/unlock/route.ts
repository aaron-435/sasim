/**
 * app/api/report/unlock/route.ts
 * ------------------------------------------------------------------
 * Opens the sealed paid half of a report (see lib/reportLock.ts) — but only for a caller whose
 * purchase of that report's module RevenueCat confirms right now.
 *
 * Request:  POST { token, appUserId }
 * Response: { moduleId, locked } | { error, code }
 *           code: "invalid_token" (not ours / altered / key rotated — caller should regenerate
 *                  the report), "not_purchased", "unavailable"
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { openLocked } from "@/lib/reportLock";
import { checkEntitlement } from "@/lib/revenuecat";

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "report-unlock", 20, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: { token?: unknown; appUserId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }
  if (typeof body.token !== "string" || typeof body.appUserId !== "string" || !body.appUserId) {
    return NextResponse.json({ error: "token과 appUserId가 필요합니다.", code: "bad_request" }, { status: 400 });
  }

  const opened = openLocked(body.token);
  if (!opened || !/^module\d{1,2}$/.test(opened.moduleId)) {
    return NextResponse.json({ error: "열 수 없는 리포트입니다.", code: "invalid_token" }, { status: 400 });
  }

  const entitlement = await checkEntitlement(body.appUserId, `report_${opened.moduleId}`);
  if (entitlement === "inactive") return NextResponse.json({ error: "구매한 리포트가 아닙니다.", code: "not_purchased" }, { status: 402 });
  if (entitlement !== "active") return NextResponse.json({ error: "지금은 리포트를 열 수 없어요.", code: "unavailable" }, { status: 503 });

  return NextResponse.json({ moduleId: opened.moduleId, locked: opened.locked });
}
