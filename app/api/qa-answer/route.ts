/**
 * app/api/qa-answer/route.ts
 * ------------------------------------------------------------------
 * Route Handler for components/QAChat.jsx — one call per question the
 * user picks from lib/questionBank.json. Keeps OPENAI_API_KEY
 * server-side only, same as /api/chat.
 *
 * Request body:
 *   { nickname, question, sajuResult, sessionId, locale, platform }
 *   sajuResult is whatever /api/saju already returned to the client —
 *   passed straight through, not re-fetched. sessionId is now required
 *   (was optional until 2026-09-13) — see lib/qaQuota.ts for why: it's
 *   both the LLM cost-log attribution key AND the only way to enforce
 *   the free-question cap server-side, so a request without one would
 *   otherwise get an uncounted, unlimited free answer. `platform`
 *   ("web" | "mobile", defaults to the stricter "web" policy if
 *   missing/unrecognized) picks which free-tier policy applies — see
 *   lib/qaQuota.ts.
 *
 * Response body:
 *   { lines: string[] }  or  { error: string } with a non-200 status
 *   (403 = the free-question cap was hit, 429 = request caps, see LIMIT_MESSAGES; both carry a `code`:
 *   "quota" | "burst" | "daily_limit" and a message in the request's `locale`)
 *
 * "그 사람에 대해 묻기" (2026-10-05, subscribers only): add the optional
 *   { other: { birthYear, birthMonth, birthDay, birthHour?, birthMinute?,
 *     isFemale, birthCity?, birthCityId? }, questionId, appUserId }
 * Without `other` the request behaves exactly as before. With it, the
 * question must be one of lib/personQuestions.json (looked up by id; the
 * free-text `question` is ignored), the qa_premium subscription is checked
 * with RevenueCat and fails closed, the other person's chart is computed for
 * this request only (never stored, no name sent), and the answer counts
 * against the same daily Q&A quota at the paid cap. Errors carry a `code`:
 *   400 bad_request · 401 no_user · 403 not_subscribed | quota
 *   503 unavailable
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getPersonQAAnswer, getQAAnswer } from "@/lib/qaChat";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isQaQuotaExceeded, type QaPlatform } from "@/lib/qaQuota";
import { checkEntitlement } from "@/lib/revenuecat";
import { calculateSaju, SazuApiError } from "@/lib/sazu";
import { calculateCompatibility } from "@/lib/compatibility";
import { localizedText } from "@/lib/qaBankLocale";
import personQuestions from "@/lib/personQuestions.json";

// Same id as mobile/lib/purchases.ts QA_PRO_ENTITLEMENT_ID — the one subscription.
const SUBSCRIPTION_ENTITLEMENT_ID = "qa_premium";

interface OtherPersonInput {
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  birthHour?: number | null;
  birthMinute?: number;
  isFemale?: boolean;
  birthCity?: string;
  birthCityId?: string;
}

interface QAAnswerRequestBody {
  nickname?: string;
  question?: string;
  sajuResult?: {
    elements?: unknown;
    dominantElement?: unknown;
    fourPillars?: unknown;
    decadeFortune?: unknown;
    summary?: unknown;
  };
  sessionId?: string;
  /** Defaults to "ko" when absent — only the native app sends this today. */
  locale?: Locale;
  /** Defaults to the stricter "web" policy when absent/unrecognized. */
  platform?: QaPlatform;
  /** "그 사람에 대해 묻기" only — see the header. */
  other?: OtherPersonInput;
  questionId?: string;
  appUserId?: string | null;
}

function isInt(v: unknown, min: number, max: number): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= min && v <= max;
}

function validOther(o: OtherPersonInput): boolean {
  return (
    isInt(o.birthYear, 1900, new Date().getUTCFullYear()) &&
    isInt(o.birthMonth, 1, 12) &&
    isInt(o.birthDay, 1, 31) &&
    (o.birthHour == null || isInt(o.birthHour, 0, 23)) &&
    (o.birthMinute == null || isInt(o.birthMinute, 0, 59)) &&
    typeof o.isFemale === "boolean" &&
    (o.birthCity == null || (typeof o.birthCity === "string" && o.birthCity.length <= 120)) &&
    (o.birthCityId == null || (typeof o.birthCityId === "string" && o.birthCityId.length <= 80))
  );
}

function findPersonQuestion(id: unknown) {
  if (typeof id !== "string") return null;
  return personQuestions.category.subcategories.flatMap((s) => s.questions).find((q) => q.id === id) ?? null;
}

function openAIErrorResponse(err: unknown, tag: string) {
  if (err instanceof OpenAI.APIError) {
    if (err.status === 401) {
      console.error(`[${tag}] auth error`, err.code, err.message);
      return NextResponse.json({ error: "일시적인 서비스 오류입니다. 잠시 후 다시 시도해주세요." }, { status: 502 });
    }
    if (err.status === 429) {
      return NextResponse.json({ error: "요청이 많아 잠시 후 다시 시도해주세요." }, { status: 429 });
    }
    if (err.status && err.status >= 500) {
      return NextResponse.json({ error: "답변 생성 서비스가 일시적으로 불안정합니다. 다시 시도해주세요." }, { status: 503 });
    }
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  console.error(`[${tag}] unexpected error`, err);
  return NextResponse.json({ error: "답변 생성 중 오류가 발생했습니다." }, { status: 500 });
}

async function answerAboutPerson(body: QAAnswerRequestBody, other: OtherPersonInput) {
  const { nickname, sajuResult, sessionId, locale } = body;
  const question = findPersonQuestion(body.questionId);
  if (!sajuResult || !sessionId || !question || !validOther(other)) {
    return NextResponse.json({ error: "필수 입력값이 빠졌거나 잘못되었습니다.", code: "bad_request" }, { status: 400 });
  }
  if (!body.appUserId) {
    return NextResponse.json({ error: "구독 확인에 필요한 사용자 id가 없습니다.", code: "no_user" }, { status: 401 });
  }

  const entitlement = await checkEntitlement(body.appUserId, SUBSCRIPTION_ENTITLEMENT_ID);
  if (entitlement === "inactive") {
    return NextResponse.json({ error: "구독 전용 기능입니다.", code: "not_subscribed" }, { status: 403 });
  }
  if (entitlement !== "active") {
    return NextResponse.json({ error: "지금은 확인할 수 없어요.", code: "unavailable" }, { status: 503 });
  }

  const platform: QaPlatform = body.platform === "mobile" ? "mobile" : "web";
  if (await isQaQuotaExceeded(sessionId, platform, true)) {
    return NextResponse.json({ error: "오늘 질문 한도를 모두 사용했어요.", code: "quota" }, { status: 403 });
  }

  let otherChart;
  try {
    // Used for this answer only — never saved (same rule as /api/compatibility).
    otherChart = await calculateSaju({
      birthYear: other.birthYear!,
      birthMonth: other.birthMonth!,
      birthDay: other.birthDay!,
      birthHour: other.birthHour ?? null,
      birthMinute: other.birthMinute,
      isFemale: other.isFemale!,
      birthCity: other.birthCity,
      birthCityId: other.birthCityId,
    });
  } catch (err) {
    if (err instanceof SazuApiError) {
      return NextResponse.json({ error: err.message, code: "bad_request" }, { status: 400 });
    }
    console.error("[api/qa-answer person] chart failed", err);
    return NextResponse.json({ error: "답변 생성 중 오류가 발생했습니다." }, { status: 500 });
  }

  const selfChar = (sajuResult.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char;
  const otherChar = (otherChart.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char;
  const compatibility = selfChar && otherChar ? calculateCompatibility(selfChar, otherChar) : null;
  const resolvedLocale = locale ?? "ko";

  try {
    const { lines } = await getPersonQAAnswer(
      {
        nickname: nickname?.trim() || "회원",
        question: localizedText(question.text_ko, question.text_en, question.text_es, resolvedLocale),
        sajuResult,
        other: {
          elements: otherChart.elements,
          dominantElement: otherChart.dominantElement,
          fourPillars: otherChart.fourPillars,
          summary: otherChart.summary,
          birthTimeKnown: other.birthHour != null,
        },
        compatibility,
        locale: resolvedLocale,
      },
      sessionId
    );
    return NextResponse.json({ lines });
  } catch (err) {
    return openAIErrorResponse(err, "api/qa-answer person");
  }
}

/**
 * Request caps (W1, 2026-10-17). Layered on top of the per-session free-question cap in
 * lib/qaQuota.ts, which a caller could dodge by inventing a new sessionId for every call:
 *   - burst:   20 requests / 10 min per IP (unchanged)
 *   - daily:   web 12 / 24 h per IP (a real visitor gets 2 free answers, so this leaves room for a
 *              shared Wi-Fi/NAT); mobile 60 / 24 h per IP (paid users may ask up to 10 a day and several
 *              can share a carrier NAT)
 *   - session: 10 / 24 h per sessionId (generous next to the lifetime 2, bounds a retry loop)
 * Like lib/rateLimit.ts this is in-memory per serverless instance: a backstop, not a hard guarantee.
 * Messages are returned in the caller's language with a machine-readable `code` the client keys on.
 */
const DAILY_MS = 24 * 60 * 60 * 1000;
const IP_DAILY_LIMIT = { web: 12, mobile: 60 } as const;
const SESSION_DAILY_LIMIT = 10;

const LIMIT_MESSAGES: Record<Locale, { burst: string; daily: string; quota: string }> = {
  ko: {
    burst: "요청이 한꺼번에 많이 들어왔어요. 몇 분 뒤에 다시 시도해 주세요.",
    daily: "오늘 이 연결에서 받을 수 있는 무료 답변을 모두 썼어요. 내일 다시 시도해 주세요.",
    quota: "무료 질문을 모두 사용했어요.",
  },
  en: {
    burst: "There are a lot of requests at once. Please wait a few minutes and try again.",
    daily: "This connection has used all of today's free answers. Please try again tomorrow.",
    quota: "You've used all your free questions.",
  },
  es: {
    burst: "Hay muchas solicitudes a la vez. Espera unos minutos y vuelve a intentarlo.",
    daily: "Esta conexión ya usó todas las respuestas gratuitas de hoy. Vuelve a intentarlo mañana.",
    quota: "Has usado todas tus preguntas gratuitas.",
  },
};

function limitResponse(code: "burst" | "daily_limit" | "quota", locale: Locale, status: number, retryAfter?: number) {
  const m = LIMIT_MESSAGES[locale];
  const error = code === "burst" ? m.burst : code === "daily_limit" ? m.daily : m.quota;
  return NextResponse.json(
    { error, code },
    { status, headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined }
  );
}

export async function POST(req: NextRequest) {
  let body: QAAnswerRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const limitLocale: Locale = body?.locale && (LOCALES as string[]).includes(body.locale) ? body.locale : "ko";
  const ip = getClientIp(req);
  const burst = checkRateLimit(`qa-answer:${ip}`, 20, 10 * 60 * 1000);
  if (!burst.allowed) return limitResponse("burst", limitLocale, 429, burst.retryAfterSeconds);
  const ipDaily = checkRateLimit(`qa-answer-day:${ip}`, body?.platform === "mobile" ? IP_DAILY_LIMIT.mobile : IP_DAILY_LIMIT.web, DAILY_MS);
  if (!ipDaily.allowed) return limitResponse("daily_limit", limitLocale, 429, ipDaily.retryAfterSeconds);
  if (typeof body?.sessionId === "string" && body.sessionId) {
    const sess = checkRateLimit(`qa-answer-sess:${body.sessionId}`, SESSION_DAILY_LIMIT, DAILY_MS);
    if (!sess.allowed) return limitResponse("daily_limit", limitLocale, 429, sess.retryAfterSeconds);
  }

  if (body?.other) return answerAboutPerson(body, body.other);

  const { nickname, question, sajuResult, sessionId, locale, platform } = body ?? {};

  if (!question || !sajuResult) {
    return NextResponse.json({ error: "question, sajuResult는 필수입니다." }, { status: 400 });
  }
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId는 필수입니다." }, { status: 400 });
  }

  const resolvedPlatform: QaPlatform = platform === "mobile" ? "mobile" : "web";
  // The app's general path sends no appUserId, so the server can't tell a subscriber apart and
  // the app enforces the free 1/day itself (mobile/lib/qaQuota.ts). The server holds mobile to the
  // paid cap so a subscriber's 2nd question isn't refused now that usage rows actually save
  // (ensureSession, 2026-10-07). Web keeps its lifetime free cap.
  if (await isQaQuotaExceeded(sessionId, resolvedPlatform, resolvedPlatform === "mobile")) {
    return limitResponse("quota", limitLocale, 403);
  }

  try {
    const { lines } = await getQAAnswer(
      {
        nickname: nickname?.trim() || "회원",
        question,
        sajuResult,
        locale,
      },
      sessionId
    );
    return NextResponse.json({ lines });
  } catch (err) {
    return openAIErrorResponse(err, "api/qa-answer");
  }
}
