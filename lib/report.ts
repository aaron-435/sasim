/**
 * lib/report.ts
 * ------------------------------------------------------------------
 * Server-side wrapper around the OpenAI Chat Completions API for the
 * GPT-generated deep report (see lib/reportPrompts.ts for the design).
 * NEVER import this in a client component — it reads process.env.OPENAI_API_KEY.
 * Mirrors lib/chat.ts's shape (model constant, one buildXPrompt() call,
 * json_object response format) on purpose, since it's the same pattern.
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";
import { buildReportPrompt, type ReportContext } from "./reportPrompts";
import { logLlmUsage } from "./llmUsage";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const REPORT_MODEL = "gpt-5.4-mini";

export interface ReportBullet {
  title: string;
  body: string;
}

export interface ReportContent {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  opening_scene: string;
  case_tag: string;
  case_paragraphs: string[];
  saju_dominant_heading: string;
  saju_dominant_body: string;
  saju_weak_heading: string;
  saju_weak_body: string;
  cross_analysis_quotes: string[];
  psychology_fact_heading: string;
  psychology_fact_body: string;
  psychology_takeaway: string;
  strengths: ReportBullet[];
  weaknesses: ReportBullet[];
  fit_good: string;
  fit_bad: string;
  behavior_guides: ReportBullet[];
  mindset_guide: string;
  closing_title: string;
  closing_body: string;
}

function asBulletList(value: unknown): ReportBullet[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      title: typeof item?.title === "string" ? item.title : "",
      body: typeof item?.body === "string" ? item.body : "",
    }))
    .filter((b) => b.title && b.body);
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => String(v)).filter(Boolean);
}

export async function getReportContent(context: ReportContext, sessionId?: string): Promise<ReportContent> {
  const systemPrompt = buildReportPrompt(context);

  const completion = await client.chat.completions.create({
    model: REPORT_MODEL,
    temperature: 0.85,
    messages: [{ role: "system", content: systemPrompt }],
    response_format: { type: "json_object" },
  });

  if (completion.usage) {
    await logLlmUsage({
      sessionId,
      endpoint: "report",
      model: REPORT_MODEL,
      promptTokens: completion.usage.prompt_tokens,
      completionTokens: completion.usage.completion_tokens,
    });
  }

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI가 빈 응답을 반환했습니다.");

  const parsed = JSON.parse(content);

  return {
    title_line1: String(parsed.title_line1 ?? ""),
    title_line2: String(parsed.title_line2 ?? ""),
    subtitle: String(parsed.subtitle ?? ""),
    opening_scene: String(parsed.opening_scene ?? ""),
    case_tag: String(parsed.case_tag ?? ""),
    case_paragraphs: asStringList(parsed.case_paragraphs),
    saju_dominant_heading: String(parsed.saju_dominant_heading ?? ""),
    saju_dominant_body: String(parsed.saju_dominant_body ?? ""),
    saju_weak_heading: String(parsed.saju_weak_heading ?? ""),
    saju_weak_body: String(parsed.saju_weak_body ?? ""),
    cross_analysis_quotes: asStringList(parsed.cross_analysis_quotes),
    psychology_fact_heading: String(parsed.psychology_fact_heading ?? ""),
    psychology_fact_body: String(parsed.psychology_fact_body ?? ""),
    psychology_takeaway: String(parsed.psychology_takeaway ?? ""),
    strengths: asBulletList(parsed.strengths),
    weaknesses: asBulletList(parsed.weaknesses),
    fit_good: String(parsed.fit_good ?? ""),
    fit_bad: String(parsed.fit_bad ?? ""),
    behavior_guides: asBulletList(parsed.behavior_guides),
    mindset_guide: String(parsed.mindset_guide ?? ""),
    closing_title: String(parsed.closing_title ?? ""),
    closing_body: String(parsed.closing_body ?? ""),
  };
}
