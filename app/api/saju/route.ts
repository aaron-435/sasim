/**
 * app/api/saju/route.ts
 * ------------------------------------------------------------------
 * Route Handler the frontend calls after onboarding (birth date/time/city)
 * is complete. Keeps the SAZU_API_KEY server-side only.
 *
 * Request body (from the client):
 *   { birthYear, birthMonth, birthDay, birthHour?, birthMinute?, isFemale,
 *     birthCity?, isLunar? }
 *
 * Response body (to the client):
 *   { elements, dominantElement, fourPillars, decadeFortune, timezoneNote, isSandboxSample }
 *   or { error: string, code?: string } with a non-200 status
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { calculateSaju, SazuApiError } from "@/lib/sazu";

interface SajuRequestBody {
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  birthHour?: number | null;
  birthMinute?: number;
  isFemale?: boolean;
  birthCity?: string;
  isLunar?: boolean;
}

export async function POST(req: NextRequest) {
  let body: SajuRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { birthYear, birthMonth, birthDay, birthHour, birthMinute, isFemale, birthCity, isLunar } = body ?? {};

  if (!birthYear || !birthMonth || !birthDay || typeof isFemale !== "boolean") {
    return NextResponse.json(
      { error: "birthYear, birthMonth, birthDay, isFemale는 필수입니다." },
      { status: 400 }
    );
  }

  try {
    const result = await calculateSaju({
      birthYear,
      birthMonth,
      birthDay,
      birthHour: birthHour ?? null, // "모름" 케이스는 null로 전달
      birthMinute,
      isFemale,
      birthCity, // 현재 "서울"만 검증됨 — Pro 전환 후 타 도시 검증 필요 (lib/sazu.ts 주석 참고)
      isLunar,
    });

    return NextResponse.json({
      elements: result.elements,
      dominantElement: result.dominantElement,
      fourPillars: result.fourPillars,
      decadeFortune: result.decadeFortune,
      summary: result.summary,
      timezoneNote: result.timezoneNote,
      isSandboxSample: result.isSandboxSample,
    });
  } catch (err) {
    if (err instanceof SazuApiError) {
      if (err.isAuthError) {
        // 서버 설정 문제(키 누락/만료) — 사용자 잘못이 아니므로 일반 문구로 표시
        console.error("[api/saju] auth error", err.code, err.message);
        return NextResponse.json({ error: "일시적인 서비스 오류입니다. 잠시 후 다시 시도해주세요.", code: err.code }, { status: 502 });
      }
      if (err.isRateLimited) {
        return NextResponse.json({ error: "요청이 많아 잠시 후 다시 시도해주세요.", code: err.code }, { status: 429 });
      }
      if (err.isSandboxMismatch) {
        // Free 티어 — 문서화된 5개 샘플 입력 외에는 실패함. 지인 베타 테스트 중에는
        // 실제 사용자 대부분이 이 경로를 타게 되므로, 개발자 용어 없이 안내.
        return NextResponse.json(
          { error: "죄송해요, 지금은 베타 테스트 기간이라 일부 생년월일만 지원돼요. 정식 오픈 후 모든 생년월일로 이용하실 수 있어요.", code: err.code },
          { status: 422 }
        );
      }
      if (err.isTransient) {
        return NextResponse.json({ error: "SAZU 서비스가 일시적으로 불안정합니다. 다시 시도해주세요.", code: err.code }, { status: 503 });
      }
      return NextResponse.json({ error: err.message, code: err.code }, { status: 400 });
    }
    console.error("[api/saju] unexpected error", err);
    return NextResponse.json({ error: "사주 계산 중 오류가 발생했습니다." }, { status: 500 });
  }
}
