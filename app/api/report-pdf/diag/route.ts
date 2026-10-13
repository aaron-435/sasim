/**
 * TEMPORARY (2026-10-13): why does /api/report-pdf answer 500 "failed" on Vercel while the same
 * request renders locally? Reports only booleans, versions and the render error text — no user
 * data, no secrets. Delete once the cause is fixed.
 */
import { existsSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { renderDeepReportPdf } from "@/lib/pdf/reportPdf";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const FONTS = [
  ["noto-sans-kr", "400Regular", "NotoSansKR_400Regular.ttf"],
  ["noto-sans-kr", "700Bold", "NotoSansKR_700Bold.ttf"],
  ["plus-jakarta-sans", "400Regular", "PlusJakartaSans_400Regular.ttf"],
  ["plus-jakarta-sans", "600SemiBold", "PlusJakartaSans_600SemiBold.ttf"],
  ["newsreader", "500Medium", "Newsreader_500Medium.ttf"],
];

export async function GET() {
  const fonts = Object.fromEntries(
    FONTS.map(([pkg, w, f]) => [f, existsSync(path.join(process.cwd(), "node_modules", "@expo-google-fonts", pkg, w, f))]),
  );
  const out: Record<string, unknown> = { node: process.version, cwd: process.cwd(), fonts };
  try {
    const bullet = { title: "제목", body: "본문입니다." };
    const content = {
      title_line1: "제목", title_line2: "둘째 줄", subtitle: "부제", opening_scene: "오프닝", oheng_intro: "소개", quiz_reading: "해석",
      case_tag: "태그", case_paragraphs: ["문단"], element_readings: {}, upcoming_period_heading: "시기", upcoming_period_body: "본문",
      cross_analysis_quotes: [], answer_notes: [], psychology_fact_heading: "심리", psychology_fact_body: "본문", psychology_takeaway: "요약",
      strengths_preview: [bullet], strengths: [bullet], weaknesses: [bullet], fit_good: "좋음", fit_bad: "나쁨", behavior_guides: [bullet],
      mindset_guide: "마인드셋", closing_title: "맺음", closing_body: "맺음 본문", set_cards_2to5: [],
    };
    const extras = { moduleTitle: "모듈", typeTitle: "유형", typeHook: "훅", nuancedSummary: "요약", dimensions: [], elements: null, topAnswers: [], chat: null };
    const pdf = await renderDeepReportPdf({ locale: "ko", nickname: "진단", content: content as never, extras: extras as never });
    out.render = { ok: true, bytes: pdf.length };
  } catch (err) {
    const e = err as Error;
    out.render = { ok: false, name: e?.name, message: String(e?.message).slice(0, 400), stack: String(e?.stack).split("\n").slice(0, 6) };
  }
  return NextResponse.json(out);
}
