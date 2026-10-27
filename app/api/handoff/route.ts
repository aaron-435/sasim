/**
 * app/api/handoff/route.ts
 * ------------------------------------------------------------------
 * Web→app handoff from any web surface (lib/handoff.ts has what is stored and why).
 *
 * POST { source, locale, data }  — sent only when the visitor taps "continue in the app".
 *   source: type_card | calculator | day_master | invite | qa;  data: lib/handoff.ts HandoffData
 *   → { code, token, deepLink, expiresAt }   (7 days, one use)
 *
 * GET ?t=<64-hex token>  (fatesaid://handoff link)  or  ?code=<6 digits>  (typed)
 *   → { kind: "handoff", source, locale, data }
 *   → { kind: "session", nickname, track, sajuResult }   (an older Q&A code, old shape)
 *   errors: { error, code } — 400 bad input, 404 unknown/used, 410 expired, 429 too many
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { createHandoff, redeemHandoff, supabaseHandoffDb } from "@/lib/handoff";
import { rateLimitOrResponse } from "@/lib/rateLimit";

const TOO_MANY = "요청이 많아 잠시 후 다시 시도해주세요.";

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "handoff-post", 10, 10 * 60 * 1000, TOO_MANY);
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  try {
    const { status, body: out } = await createHandoff(supabaseHandoffDb(), body);
    return NextResponse.json(out, { status });
  } catch (err) {
    console.error("[api/handoff] POST failed", err);
    return NextResponse.json({ error: "인증번호 생성 중 오류가 발생했습니다.", code: "unavailable" }, { status: 503 });
  }
}

export async function GET(req: NextRequest) {
  const t = req.nextUrl.searchParams.get("t");
  const code = req.nextUrl.searchParams.get("code");
  // A typed code has 900,000 values and returns birth data, so it shares one bucket with
  // /api/verification-code's lookup — two endpoints must not double the guesses per IP.
  // A token is 256 bits and only needs a looser limit.
  const limited = t != null
    ? rateLimitOrResponse(req, "handoff-get-token", 30, 10 * 60 * 1000, TOO_MANY)
    : rateLimitOrResponse(req, "verify-code-get", 20, 10 * 60 * 1000, TOO_MANY);
  if (limited) return limited;

  try {
    const { status, body } = await redeemHandoff(supabaseHandoffDb(), { t, code });
    return NextResponse.json(body, { status });
  } catch (err) {
    console.error("[api/handoff] GET failed", err);
    return NextResponse.json({ error: "인증번호 확인 중 오류가 발생했습니다.", code: "unavailable" }, { status: 500 });
  }
}
