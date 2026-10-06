/**
 * app/api/invites/[code]/route.ts
 * ------------------------------------------------------------------
 * The friend answers an invite from the /c/<code> page. Their birth date is used inside this
 * request only (to find their Day Master and saju type) and is not stored; the row keeps the
 * derived result and the optional display name they typed. An invite takes one answer.
 *
 * Request:  POST { birthYear, birthMonth, birthDay, birthHour?, friendName?, consent: true }
 * Response: { senderName, compatibility } — the compatibility is from the friend's side
 *           (they are "you" in the copy), so the page can show it as is.
 *   errors: 400 bad_request | 404 not_found | 409 already_answered | 410 expired | 503 unavailable
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { calculateSaju, SazuApiError } from "@/lib/sazu";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { classifySajuType } from "@/lib/sajuType";
import { calculateCompatibility } from "@/lib/compatibility";
import { getSupabaseAdmin } from "@/lib/supabase";
import { cleanName, getPublicInvite, isInviteCode, isStem, type FriendResult } from "@/lib/invites";

function fail(status: number, code: string, error: string) {
  return NextResponse.json({ error, code }, { status });
}

function validDate(y: unknown, m: unknown, d: unknown): boolean {
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return false;
  const [yy, mm, dd] = [y as number, m as number, d as number];
  const date = new Date(Date.UTC(yy, mm - 1, dd));
  return yy >= 1900 && date.getUTCMonth() === mm - 1 && date.getUTCDate() === dd && date.getTime() <= Date.now();
}

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const limited = rateLimitOrResponse(req, "invites-accept", 10, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  const code = params.code;
  if (!isInviteCode(code)) return fail(404, "not_found", "링크를 찾을 수 없어요.");

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "bad_request", "잘못된 요청 형식입니다.");
  }
  const { birthYear, birthMonth, birthDay, consent } = body ?? {};
  const birthHour = body?.birthHour ?? null;
  if (consent !== true || !validDate(birthYear, birthMonth, birthDay)) return fail(400, "bad_request", "필수 입력값이 빠졌습니다.");
  if (birthHour !== null && (!Number.isInteger(birthHour) || (birthHour as number) < 0 || (birthHour as number) > 23)) {
    return fail(400, "bad_request", "잘못된 시간입니다.");
  }

  let invite: Awaited<ReturnType<typeof getPublicInvite>>;
  try {
    invite = await getPublicInvite(code);
  } catch (err) {
    console.error("[api/invites/accept] lookup failed", err);
    return fail(503, "unavailable", "지금은 답할 수 없어요.");
  }
  if (!invite) return fail(404, "not_found", "링크를 찾을 수 없어요.");
  if (invite.status === "expired") return fail(410, "expired", "만료된 링크예요.");
  if (invite.status === "answered") return fail(409, "already_answered", "이미 답한 링크예요.");

  let friend: FriendResult;
  try {
    // Gender only steers the 10-year cycle direction, which neither the Day Master nor the type uses.
    const saju = await calculateSaju({
      birthYear: birthYear as number,
      birthMonth: birthMonth as number,
      birthDay: birthDay as number,
      birthHour: birthHour as number | null,
      birthMinute: 0,
      isFemale: false,
    });
    const dayMaster = (saju.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char;
    if (!isStem(dayMaster)) throw new Error("no day master");
    friend = { dayMaster, sajuType: classifySajuType(dayMaster, saju.elements), dominantElement: saju.dominantElement ?? null };
  } catch (err) {
    if (err instanceof SazuApiError) return fail(400, "bad_request", err.message);
    console.error("[api/invites/accept] saju failed", err);
    return fail(500, "calc_failed", "궁합 계산 중 오류가 발생했습니다.");
  }

  try {
    // Only an open, unexpired row takes the answer — two tabs racing get one winner.
    const { data, error } = await getSupabaseAdmin()
      .from("invites")
      .update({ accepted_at: new Date().toISOString(), friend_name: cleanName(body?.friendName), friend_result: friend })
      .eq("code", code)
      .is("accepted_at", null)
      .gt("expires_at", new Date().toISOString())
      .select("code");
    if (error) throw error;
    if (!data || data.length === 0) return fail(409, "already_answered", "이미 답한 링크예요.");
  } catch (err) {
    console.error("[api/invites/accept] save failed", err);
    return fail(503, "unavailable", "지금은 답할 수 없어요.");
  }

  return NextResponse.json({
    senderName: invite.senderName,
    compatibility: calculateCompatibility(friend.dayMaster, invite.senderDayMaster),
  });
}
