/**
 * app/api/compatReport/route.ts
 * ------------------------------------------------------------------
 * Free preview of the compatibility report (lib/compatReport.ts): title, how the two charts
 * meet, what each brings the other. The rest is /api/compatReport/paid, after a purchase.
 * The other person's birth data is used for this request only and never saved (same rule as
 * /api/compatibility); their name never reaches the server (the text carries an {other} token).
 *
 * Request:  POST { locale, nickname, selfDayMasterChar, selfDayBranch?, selfElements?, other, sessionId? }
 * Response: CompatFreePart & { relation } | { error, code }
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { buildCompatReportContext, getCompatFreePart, type CompatReportRequest } from "@/lib/compatReport";
import { compatErrorResponse } from "@/lib/compatReportRoute";

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "compat-report", 10, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: CompatReportRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  try {
    const ctx = await buildCompatReportContext(body);
    const free = await getCompatFreePart(ctx, body.sessionId);
    return NextResponse.json({ ...free, relation: ctx.compatibility.relation });
  } catch (err) {
    return compatErrorResponse(err, "api/compatReport");
  }
}
