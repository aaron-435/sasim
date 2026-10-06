/**
 * app/api/invites/route.ts
 * ------------------------------------------------------------------
 * Creates a friend-compatibility invite link (lib/invites.ts has what is stored and why).
 *
 * Request:  POST { senderName, senderDayMaster, locale }
 * Response: { code, ownerToken, url, expiresAt } | { error, code }
 *   The owner token is returned once and only its hash is stored; the app keeps it to read the
 *   friend's answer back through /api/invites/status.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { cleanName, hashToken, INVITE_TTL_MS, isStem, newCode, newOwnerToken, pickInviteLocale } from "@/lib/invites";

const SITE_URL = "https://www.fatesaidapp.com";

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "invites-create", 10, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  const senderDayMaster = body?.senderDayMaster;
  const locale = pickInviteLocale(body?.locale);
  if (!isStem(senderDayMaster) || !locale) {
    return NextResponse.json({ error: "필수 입력값이 빠졌습니다.", code: "bad_request" }, { status: 400 });
  }
  const senderName = cleanName(body?.senderName) ?? "";

  const now = Date.now();
  const ownerToken = newOwnerToken();
  const expiresAt = new Date(now + INVITE_TTL_MS).toISOString();

  try {
    const supabase = getSupabaseAdmin();
    // Expired links go when the next one is made — no separate cleanup job to forget.
    await supabase.from("invites").delete().lt("expires_at", new Date(now).toISOString());

    // A clash in 31^10 codes is unlikely, but a retry costs nothing.
    for (let attempt = 0; attempt < 3; attempt++) {
      const code = newCode();
      const { error } = await supabase.from("invites").insert({
        code,
        owner_token_hash: hashToken(ownerToken),
        sender_name: senderName,
        sender_day_master: senderDayMaster,
        locale,
        expires_at: expiresAt,
      });
      if (!error) return NextResponse.json({ code, ownerToken, url: `${SITE_URL}/c/${code}`, expiresAt });
      if (error.code !== "23505") throw error;
    }
    throw new Error("code collision");
  } catch (err) {
    console.error("[api/invites] create failed", err);
    return NextResponse.json({ error: "지금은 링크를 만들 수 없어요.", code: "unavailable" }, { status: 503 });
  }
}
