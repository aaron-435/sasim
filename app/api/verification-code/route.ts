/**
 * app/api/verification-code/route.ts
 * ------------------------------------------------------------------
 * The original web→app handoff for the "free questions on web, install the app for more"
 * funnel (components/QAChat.jsx). Installed 1.2.0 apps call the GET side from
 * mobile/screens/VerifyCodeScreen.tsx, so its response shape stays as it is. Newer web
 * surfaces use /api/handoff instead; both share lib/handoff.ts, one 6-digit code space
 * and one lookup rate limit.
 *
 * POST body:  { sessionId }
 * POST response: { code }  or  { error } with a non-200 status
 *
 * GET  ?code=XXXXXX
 * GET  response: { nickname, track, sajuResult: {...} }, or a non-200
 *   status: 404 if the code is unknown/already used, 410 if it's a
 *   real code but older than 24h (verify_code_created_at), 409 if it is
 *   a newer /api/handoff code that this app version can't read. Marks the
 *   code used on successful redemption (one-time use).
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { issueSessionCode, redeemSessionCode, supabaseHandoffDb } from "@/lib/handoff";
import { rateLimitOrResponse } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "verify-code-post", 10, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: { sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  try {
    const { status, body: out } = await issueSessionCode(supabaseHandoffDb(), body?.sessionId);
    return NextResponse.json(out, { status });
  } catch (err) {
    console.error("[api/verification-code] POST failed", err);
    return NextResponse.json({ error: "인증번호 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Codes are 6 numeric digits and redemption returns PII (birth date, city, nickname) —
  // without a limit, brute-forcing every code from one IP would be feasible. Same bucket
  // as /api/handoff's code lookup.
  const limited = rateLimitOrResponse(req, "verify-code-get", 20, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  try {
    const { status, body } = await redeemSessionCode(supabaseHandoffDb(), req.nextUrl.searchParams.get("code"));
    return NextResponse.json(body, { status });
  } catch (err) {
    console.error("[api/verification-code] GET failed", err);
    return NextResponse.json({ error: "인증번호 확인 중 오류가 발생했습니다." }, { status: 500 });
  }
}
