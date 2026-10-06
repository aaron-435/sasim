/**
 * lib/compatReportRoute.ts
 * ------------------------------------------------------------------
 * Error → response mapping shared by /api/compatReport and /api/compatReport/paid (a route file
 * may only export its handlers). Messages stay Korean like the other routes; the app shows its
 * own localized text by status/code.
 * ------------------------------------------------------------------
 */

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SazuApiError } from "./sazu";
import { CompatInputError } from "./compatReport";

export function compatErrorResponse(err: unknown, tag: string) {
  if (err instanceof CompatInputError || err instanceof SazuApiError) {
    return NextResponse.json({ error: "필수 입력값이 빠졌거나 잘못되었습니다.", code: "bad_request" }, { status: 400 });
  }
  if (err instanceof OpenAI.APIError) {
    if (err.status === 429) return NextResponse.json({ error: "요청이 많아 잠시 후 다시 시도해주세요.", code: "rate_limited" }, { status: 429 });
    return NextResponse.json({ error: "리포트 생성 서비스가 일시적으로 불안정합니다.", code: "upstream" }, { status: 503 });
  }
  console.error(`[${tag}] failed`, err);
  // Incomplete model output lands here too — retryable.
  return NextResponse.json({ error: "리포트 생성 중 오류가 발생했습니다.", code: "failed" }, { status: 500 });
}
