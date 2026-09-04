/**
 * app/api/verification-code/route.ts
 * ------------------------------------------------------------------
 * Web→app handoff for the "2 free questions on web, install the app
 * for more" funnel (components/QAChat.jsx). Generates a short numeric
 * code tied to the current session, so a future native app can redeem
 * it (see GET below) and restore the birth data already collected on
 * web instead of asking the user to re-enter everything — this is the
 * low-tech stand-in for deferred deep linking (Branch.io/AppsFlyer)
 * decided against for now, see the monetization-model memory.
 *
 * NOTE: there is no native app yet to call the GET redemption endpoint
 * below — it's built now so the web side has something real to point
 * at (`sessions.verify_code`), and is ready to wire up once app
 * development starts. Until then this is dead code from the app's
 * side, but the code-generation half is fully live.
 *
 * POST body:  { sessionId }
 * POST response: { code }  or  { error } with a non-200 status
 *
 * GET  ?code=XXXXXX
 * GET  response: { nickname, track, sajuResult: {...} } or 404 if the
 *   code is unknown/already used. Marks the code used on successful
 *   redemption (one-time use) so it can't be replayed.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function generateCode(): string {
  // 6-digit numeric, easy to type on a phone keyboard after installing the app.
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(req: NextRequest) {
  let body: { sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { sessionId } = body ?? {};
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId는 필수입니다." }, { status: 400 });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    // 드물게 코드가 충돌하면(6자리 유니크 제약) 몇 번 다시 시도한다.
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = generateCode();
      const { error } = await supabaseAdmin.from("sessions").update({ verify_code: code }).eq("id", sessionId);
      if (!error) return NextResponse.json({ code });
      // unique 제약 위반이 아니면 바로 실패 처리
      if (!String(error.message).toLowerCase().includes("duplicate")) {
        throw error;
      }
    }
    return NextResponse.json({ error: "인증번호 생성에 실패했습니다. 다시 시도해주세요." }, { status: 503 });
  } catch (err) {
    console.error("[api/verification-code] POST failed", err);
    return NextResponse.json({ error: "인증번호 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "code는 필수입니다." }, { status: 400 });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: session, error: sessionErr } = await supabaseAdmin
      .from("sessions")
      .select("id, nickname, track")
      .eq("verify_code", code)
      .maybeSingle();
    if (sessionErr) throw sessionErr;
    if (!session) {
      return NextResponse.json({ error: "유효하지 않거나 이미 사용된 코드입니다." }, { status: 404 });
    }

    const { data: sajuRow, error: sajuErr } = await supabaseAdmin
      .from("saju_results")
      .select("birth_year, birth_month, birth_day, birth_hour, birth_minute, is_female, birth_city, elements, four_pillars, decade_fortune, summary")
      .eq("session_id", session.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (sajuErr) throw sajuErr;

    // 1회용 — 리텀 성공 즉시 코드를 비워서 재사용을 막는다.
    await supabaseAdmin.from("sessions").update({ verify_code: null }).eq("id", session.id);

    return NextResponse.json({
      nickname: session.nickname,
      track: session.track,
      sajuResult: sajuRow,
    });
  } catch (err) {
    console.error("[api/verification-code] GET failed", err);
    return NextResponse.json({ error: "인증번호 확인 중 오류가 발생했습니다." }, { status: 500 });
  }
}
