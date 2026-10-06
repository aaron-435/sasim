/**
 * app/api/groupChemistry/route.ts
 * ------------------------------------------------------------------
 * Group chemistry map (lib/groupChemistry.ts). Free, rules only, nothing stored: birth dates typed
 * into the app are used inside this request to find each person's elements and then dropped, the
 * way /api/compatibility treats "the other person".
 *
 * Request:  POST { members: Member[] }  (3–6, the user first)
 *   Member = { dayMasterElement, dominantElement }     — already known (the user, a friend's answer)
 *          | { birth: { birthYear, birthMonth, birthDay, birthHour?, birthMinute?, isFemale,
 *                       birthCity?, birthCityId? } }   — typed in on this device
 * Response: { members: [{ dayMasterElement, dominantElement, sajuType | null }],
 *             chemistry: { roles, leading, toAdd } }
 *   errors: 400 bad_request (or the engine's own code) · 500 calc_failed
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { calculateSaju, SazuApiError } from "@/lib/sazu";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { classifySajuType, type SajuType } from "@/lib/sajuType";
import { elementOfStem, GROUP_MAX, GROUP_MIN, groupChemistry, isElementKey, type GroupMemberSignals } from "@/lib/groupChemistry";

type Birth = {
  birthYear?: unknown;
  birthMonth?: unknown;
  birthDay?: unknown;
  birthHour?: unknown;
  birthMinute?: unknown;
  isFemale?: unknown;
  birthCity?: unknown;
  birthCityId?: unknown;
};

function fail(status: number, code: string, error: string) {
  return NextResponse.json({ error, code }, { status });
}

function validBirth(b: Birth): boolean {
  const { birthYear: y, birthMonth: m, birthDay: d, birthHour: h, birthMinute: min } = b;
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d) || typeof b.isFemale !== "boolean") return false;
  const date = new Date(Date.UTC(y as number, (m as number) - 1, d as number));
  if ((y as number) < 1900 || date.getUTCMonth() !== (m as number) - 1 || date.getUTCDate() !== d || date.getTime() > Date.now()) return false;
  if (h !== undefined && h !== null && (!Number.isInteger(h) || (h as number) < 0 || (h as number) > 23)) return false;
  if (min !== undefined && (!Number.isInteger(min) || (min as number) < 0 || (min as number) > 59)) return false;
  if (b.birthCity !== undefined && typeof b.birthCity !== "string") return false;
  if (b.birthCityId !== undefined && typeof b.birthCityId !== "string") return false;
  return true;
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "group-chemistry", 20, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: { members?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail(400, "bad_request", "잘못된 요청 형식입니다.");
  }

  const raw = body?.members;
  if (!Array.isArray(raw) || raw.length < GROUP_MIN || raw.length > GROUP_MAX) {
    return fail(400, "bad_request", `${GROUP_MIN}~${GROUP_MAX}명이 필요합니다.`);
  }
  for (const m of raw) {
    const item = (m ?? {}) as { dayMasterElement?: unknown; dominantElement?: unknown; birth?: unknown };
    const known = isElementKey(item.dayMasterElement) && isElementKey(item.dominantElement);
    const typed = !!item.birth && typeof item.birth === "object" && validBirth(item.birth as Birth);
    if (!known && !typed) return fail(400, "bad_request", "필수 입력값이 빠졌습니다.");
  }

  let members: { dayMasterElement: GroupMemberSignals["dayMasterElement"]; dominantElement: GroupMemberSignals["dominantElement"]; sajuType: SajuType | null }[];
  try {
    members = await Promise.all(
      raw.map(async (m) => {
        const item = m as { dayMasterElement?: unknown; dominantElement?: unknown; birth?: Birth };
        if (isElementKey(item.dayMasterElement) && isElementKey(item.dominantElement)) {
          return { dayMasterElement: item.dayMasterElement, dominantElement: item.dominantElement, sajuType: null };
        }
        const b = item.birth as Birth;
        const saju = await calculateSaju({
          birthYear: b.birthYear as number,
          birthMonth: b.birthMonth as number,
          birthDay: b.birthDay as number,
          birthHour: (b.birthHour as number | null | undefined) ?? null,
          birthMinute: (b.birthMinute as number | undefined) ?? 0,
          isFemale: b.isFemale as boolean,
          birthCity: b.birthCity as string | undefined,
          birthCityId: b.birthCityId as string | undefined,
        });
        const stem = (saju.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char ?? "";
        const sajuType = classifySajuType(stem, saju.elements);
        const dayMasterElement = elementOfStem(stem);
        if (!dayMasterElement || !sajuType) throw new Error("no day master");
        return { dayMasterElement, dominantElement: sajuType.dominantElement, sajuType };
      }),
    );
  } catch (err) {
    if (err instanceof SazuApiError) return fail(400, err.code, err.message);
    console.error("[api/groupChemistry] failed", err);
    return fail(500, "calc_failed", "계산 중 오류가 발생했습니다.");
  }

  const chemistry = groupChemistry(members);
  if (!chemistry) return fail(400, "bad_request", "잘못된 요청입니다.");
  return NextResponse.json({ members, chemistry });
}
