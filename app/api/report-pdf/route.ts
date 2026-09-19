/**
 * app/api/report-pdf/route.ts
 * ------------------------------------------------------------------
 * Renders a finished report as a magazine-style PDF (lib/pdf/reportPdf.tsx).
 *
 * The app already holds the report it wants exported (it lives on the device, see
 * mobile/lib/reportStorage.ts / yearReportStorage.ts), so the client POSTs the content and
 * gets the PDF bytes back — no storage bucket, no email, no account. The purchase is
 * verified server-side first (lib/revenuecat.ts): a deep report needs its per-module
 * entitlement `report_<moduleId>`, a year report needs `year_report_<year>`. Fails closed
 * when REVENUECAT_SECRET_KEY isn't set.
 *
 * Request:  POST { kind: "year" | "deep", appUserId, locale, nickname,
 *                  content, moduleId?, extras? }
 * Response: application/pdf | { error, code }
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n/types";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { checkEntitlement, yearReportEntitlementId } from "@/lib/revenuecat";
import { renderDeepReportPdf, renderYearReportPdf, type DeepPdfContent, type DeepPdfExtras, type YearPdfContent } from "@/lib/pdf/reportPdf";

export const runtime = "nodejs";
export const maxDuration = 60;

const LOCALES: Locale[] = ["ko", "en", "es"];
const MAX_BODY_CHARS = 400_000;

const str = (v: unknown, max = 6000): string => (typeof v === "string" ? v.slice(0, max) : "");
const obj = (v: unknown): Record<string, unknown> => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});
const arr = (v: unknown, max = 40): unknown[] => (Array.isArray(v) ? v.slice(0, max) : []);

function cleanYear(raw: unknown): YearPdfContent | null {
  const c = obj(raw);
  const year = Number(c.year);
  if (!Number.isInteger(year)) return null;
  const chap = (k: string) => ({ heading: str(obj(obj(c.chapters)[k]).heading, 200), body: str(obj(obj(c.chapters)[k]).body) });
  const content: YearPdfContent = {
    year,
    title: str(c.title, 200),
    subtitle: str(c.subtitle, 400),
    overview: str(c.overview),
    chapters: { wealth: chap("wealth"), love: chap("love"), career: chap("career"), study: chap("study"), health: chap("health") },
    months: arr(c.months, 12).map((m) => ({ headline: str(obj(m).headline, 200), body: str(obj(m).body, 800) })),
    action_plan: arr(c.action_plan, 8).map((a) => ({ title: str(obj(a).title, 200), body: str(obj(a).body, 1200) })),
    closing: str(c.closing, 2000),
  };
  return content.title && content.overview ? content : null;
}

function cleanDeep(raw: unknown): DeepPdfContent | null {
  const c = obj(raw);
  const bullets = (v: unknown) => arr(v).map((b) => ({ title: str(obj(b).title, 200), body: str(obj(b).body, 2000) })).filter((b) => b.title && b.body);
  const readings: DeepPdfContent["element_readings"] = {};
  for (const key of ["wood", "fire", "earth", "metal", "water"]) {
    const r = obj(obj(c.element_readings)[key]);
    readings[key] = { heading: str(r.heading, 200), body: str(r.body) };
  }
  const content: DeepPdfContent = {
    title_line1: str(c.title_line1, 200),
    title_line2: str(c.title_line2, 200),
    subtitle: str(c.subtitle, 400),
    opening_scene: str(c.opening_scene),
    case_tag: str(c.case_tag, 200),
    case_paragraphs: arr(c.case_paragraphs, 8).map((p) => str(p)),
    element_readings: readings,
    upcoming_period_heading: str(c.upcoming_period_heading, 200),
    upcoming_period_body: str(c.upcoming_period_body),
    cross_analysis_quotes: arr(c.cross_analysis_quotes, 8).map((p) => str(p)),
    answer_notes: arr(c.answer_notes, 12).map((p) => str(p)),
    psychology_fact_heading: str(c.psychology_fact_heading, 200),
    psychology_fact_body: str(c.psychology_fact_body),
    psychology_takeaway: str(c.psychology_takeaway, 600),
    strengths: bullets(c.strengths),
    weaknesses: bullets(c.weaknesses),
    fit_good: str(c.fit_good),
    fit_bad: str(c.fit_bad),
    behavior_guides: bullets(c.behavior_guides),
    mindset_guide: str(c.mindset_guide),
    closing_title: str(c.closing_title, 200),
    closing_body: str(c.closing_body),
  };
  return content.opening_scene && content.closing_body ? content : null;
}

function cleanExtras(raw: unknown): DeepPdfExtras {
  const e = obj(raw);
  const elements = obj(e.elements);
  const chat = obj(e.chat);
  return {
    moduleTitle: str(e.moduleTitle, 120),
    typeTitle: str(e.typeTitle, 200),
    typeHook: str(e.typeHook, 400),
    nuancedSummary: str(e.nuancedSummary),
    dimensions: arr(e.dimensions, 12).map((d) => ({ name: str(obj(d).name, 80), percent: Number(obj(d).percent) || 0 })),
    elements: Object.keys(elements).length ? Object.fromEntries(Object.entries(elements).map(([k, v]) => [k, Number(v) || 0])) : null,
    topAnswers: arr(e.topAnswers, 12).map((a) => ({ dimensionLabel: str(obj(a).dimensionLabel, 80), prompt: str(obj(a).prompt, 400), answer: str(obj(a).answer, 400) })),
    chat: Object.keys(chat).length
      ? {
          primary_concern: str(chat.primary_concern, 800),
          emotional_state: str(chat.emotional_state, 800),
          trigger_point: str(chat.trigger_point, 800),
          repeat_pattern: str(chat.repeat_pattern, 800),
          core_fear_or_meaning: str(chat.core_fear_or_meaning, 800),
        }
      : null,
  };
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "report-pdf", 10, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_CHARS) return NextResponse.json({ error: "요청이 너무 큽니다.", code: "too_large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  const kind = body.kind === "year" || body.kind === "deep" ? body.kind : null;
  const locale = LOCALES.includes(body.locale as Locale) ? (body.locale as Locale) : "ko";
  const nickname = str(body.nickname, 40).trim() || (locale === "ko" ? "회원" : "you");
  const appUserId = str(body.appUserId, 200);
  if (!kind || !appUserId) return NextResponse.json({ error: "kind와 appUserId가 필요합니다.", code: "bad_request" }, { status: 400 });

  // Which purchase unlocks this PDF.
  let entitlementId: string;
  let yearContent: YearPdfContent | null = null;
  let deepContent: DeepPdfContent | null = null;
  if (kind === "year") {
    yearContent = cleanYear(body.content);
    if (!yearContent) return NextResponse.json({ error: "리포트 내용이 올바르지 않습니다.", code: "bad_request" }, { status: 400 });
    entitlementId = yearReportEntitlementId(yearContent.year);
  } else {
    const moduleId = str(body.moduleId, 20);
    deepContent = cleanDeep(body.content);
    if (!/^module\d{1,2}$/.test(moduleId) || !deepContent) {
      return NextResponse.json({ error: "리포트 내용이 올바르지 않습니다.", code: "bad_request" }, { status: 400 });
    }
    entitlementId = `report_${moduleId}`;
  }

  const entitlement = await checkEntitlement(appUserId, entitlementId);
  if (entitlement === "inactive") return NextResponse.json({ error: "구매한 리포트가 아닙니다.", code: "not_purchased" }, { status: 402 });
  if (entitlement !== "active") return NextResponse.json({ error: "지금은 PDF를 만들 수 없어요.", code: "unavailable" }, { status: 503 });

  try {
    const pdf =
      kind === "year"
        ? await renderYearReportPdf({ locale, nickname, content: yearContent! })
        : await renderDeepReportPdf({ locale, nickname, content: deepContent!, extras: cleanExtras(body.extras) });
    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="fatesaid-report.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[api/report-pdf] render failed", err);
    return NextResponse.json({ error: "PDF 생성 중 오류가 발생했습니다.", code: "failed" }, { status: 500 });
  }
}
