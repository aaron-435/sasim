/**
 * app/api/compatibility/route.ts
 * ------------------------------------------------------------------
 * 궁합 계산. "나"의 사주는 이미 온보딩 때 계산되어 클라이언트가 들고 있으므로
 * (summary.dayMaster.char) 여기서 다시 계산하지 않고 그 값만 받는다 — 같은
 * KASI 왕복을 두 번 태울 이유가 없고, 클라이언트가 보낸 자기 자신의 값을
 * 신뢰 못 할 이유도 없다(권한/과금과 무관한 콘텐츠 계산).
 *
 * "상대"의 생년월일은 이 요청에서만 쓰고 절대 저장하지 않는다 — 동의 없이
 * 제3자의 생년월일/이름을 DB에 남기지 않기 위한 의도적 설계 (app/api/saju의
 * saveSajuResult에 해당하는 호출을 여기선 만들지 않음).
 *
 * POST body: { selfDayMasterChar: string, other: { birthYear, birthMonth,
 *   birthDay, birthHour?, birthMinute?, isFemale, birthCity?, birthCityId? } }
 * response: { other: { sajuType, dominantElement, elements }, compatibility }
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { calculateSaju, SazuApiError } from "@/lib/sazu";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { classifySajuType } from "@/lib/sajuType";
import { calculateCompatibility } from "@/lib/compatibility";

interface CompatibilityRequestBody {
  selfDayMasterChar?: string;
  other?: {
    birthYear?: number;
    birthMonth?: number;
    birthDay?: number;
    birthHour?: number | null;
    birthMinute?: number;
    isFemale?: boolean;
    birthCity?: string;
    birthCityId?: string;
  };
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "compatibility-post", 20, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: CompatibilityRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { selfDayMasterChar, other } = body ?? {};
  if (!selfDayMasterChar || !other || !other.birthYear || !other.birthMonth || !other.birthDay || other.isFemale === undefined) {
    return NextResponse.json({ error: "필수 입력값이 빠졌습니다." }, { status: 400 });
  }

  try {
    const result = await calculateSaju({
      birthYear: other.birthYear,
      birthMonth: other.birthMonth,
      birthDay: other.birthDay,
      birthHour: other.birthHour ?? null,
      birthMinute: other.birthMinute,
      isFemale: other.isFemale,
      birthCity: other.birthCity,
      birthCityId: other.birthCityId,
    });

    const otherDayMasterChar = (result.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char;
    const otherSajuType = otherDayMasterChar ? classifySajuType(otherDayMasterChar, result.elements) : null;
    const compatibility = otherDayMasterChar ? calculateCompatibility(selfDayMasterChar, otherDayMasterChar) : null;

    return NextResponse.json({
      other: {
        sajuType: otherSajuType,
        dominantElement: result.dominantElement,
        elements: result.elements,
      },
      compatibility,
    });
  } catch (err) {
    if (err instanceof SazuApiError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: 400 });
    }
    console.error("[api/compatibility] failed", err);
    return NextResponse.json({ error: "궁합 계산 중 오류가 발생했습니다." }, { status: 500 });
  }
}
