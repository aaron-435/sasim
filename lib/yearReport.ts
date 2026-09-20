/**
 * lib/yearReport.ts
 * ------------------------------------------------------------------
 * Server-side GPT call for the paid year-ahead report (prompt: lib/yearReportPrompts.ts).
 * Same pattern as lib/report.ts. NEVER import in a client component (reads OPENAI_API_KEY).
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";
import { logLlmUsage } from "./llmUsage";
import { buildYearReportPrompt, type YearReportContext } from "./yearReportPrompts";
import { checkYearReportDeterministic, makeRewriter, repairStringFindings } from "./reportQuality";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const YEAR_REPORT_MODEL = "gpt-5.4-mini";

export interface YearReportChapter {
  heading: string;
  body: string;
}

export interface YearReportContent {
  year: number;
  title: string;
  subtitle: string;
  overview: string;
  chapters: { wealth: YearReportChapter; love: YearReportChapter; career: YearReportChapter; study: YearReportChapter; health: YearReportChapter };
  /** Exactly 12, same order as the engine's months (입춘 무렵부터). */
  months: { headline: string; body: string }[];
  /** Exactly 4. */
  action_plan: { title: string; body: string }[];
  closing: string;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function chapter(value: unknown): YearReportChapter {
  const obj = (value ?? {}) as { heading?: unknown; body?: unknown };
  return { heading: str(obj.heading), body: str(obj.body) };
}

/** Throws when the model's JSON is too incomplete to show — the route turns that into a
 * retryable error rather than handing the user a half-empty paid report. */
function parseYearReport(raw: unknown, year: number): YearReportContent {
  const p = (raw ?? {}) as Record<string, unknown>;
  const chapters = (p.chapters ?? {}) as Record<string, unknown>;
  const months = Array.isArray(p.months) ? p.months : [];
  const plan = Array.isArray(p.action_plan) ? p.action_plan : [];

  const content: YearReportContent = {
    year,
    title: str(p.title),
    subtitle: str(p.subtitle),
    overview: str(p.overview),
    chapters: {
      wealth: chapter(chapters.wealth),
      love: chapter(chapters.love),
      career: chapter(chapters.career),
      study: chapter(chapters.study),
      health: chapter(chapters.health),
    },
    months: months.map((m) => ({ headline: str((m as { headline?: unknown })?.headline), body: str((m as { body?: unknown })?.body) })),
    action_plan: plan.map((a) => ({ title: str((a as { title?: unknown })?.title), body: str((a as { body?: unknown })?.body) })),
    closing: str(p.closing),
  };

  const chaptersOk = Object.values(content.chapters).every((c) => c.heading && c.body);
  const monthsOk = content.months.length === 12 && content.months.every((m) => m.headline && m.body);
  const planOk = content.action_plan.length === 4 && content.action_plan.every((a) => a.title && a.body);
  if (!content.title || !content.overview || !chaptersOk || !monthsOk || !planOk || !content.closing) {
    throw new Error(`year report response was incomplete (title=${!!content.title} overview=${!!content.overview} chapters=${chaptersOk} months=${monthsOk}/${content.months.length} plan=${planOk}/${content.action_plan.length} closing=${!!content.closing})`);
  }
  return content;
}

class IncompleteYearReport extends Error {}

/** Same care as the deep report, lighter: check the finished report in code (leftover Korean,
 * leaked instructions, Spanish gender/register slips, thin months) and rewrite only the strings
 * that failed, so a buyer never reads them. */
async function polishYearReport(content: YearReportContent, ctx: YearReportContext, sessionId?: string): Promise<YearReportContent> {
  const problems = checkYearReportDeterministic(content, ctx.locale);
  if (problems.length === 0) return content;
  console.info(`[yearReport] ${problems.length} finding(s) — ${problems.slice(0, 3).join(" | ").slice(0, 300)}`);
  const repaired = await repairStringFindings(content, problems, makeRewriter(client, YEAR_REPORT_MODEL, ctx.locale, sessionId));
  return checkYearReportDeterministic(repaired, ctx.locale).length <= problems.length ? repaired : content;
}

async function generateYearReportOnce(ctx: YearReportContext, sessionId?: string): Promise<YearReportContent> {
  const completion = await client.chat.completions.create({
    model: YEAR_REPORT_MODEL,
    temperature: 0.8,
    messages: [{ role: "system", content: buildYearReportPrompt(ctx) }],
    response_format: { type: "json_object" },
  });

  if (completion.usage) {
    await logLlmUsage({
      sessionId,
      endpoint: "year_report",
      model: YEAR_REPORT_MODEL,
      promptTokens: completion.usage.prompt_tokens,
      completionTokens: completion.usage.completion_tokens,
    });
  }

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new IncompleteYearReport("OpenAI가 빈 응답을 반환했습니다.");
  try {
    return parseYearReport(JSON.parse(content), ctx.year);
  } catch (err) {
    throw new IncompleteYearReport(err instanceof Error ? err.message : "year report response was incomplete");
  }
}

/** The model now writes longer month entries, so an occasional response comes back with a missing
 * month or chapter. That is a generation hiccup, not the user's problem: try up to three times before
 * surfacing an error (the route turns a thrown error into a retryable message). */
export async function getYearReportContent(ctx: YearReportContext, sessionId?: string): Promise<YearReportContent> {
  let last: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await polishYearReport(await generateYearReportOnce(ctx, sessionId), ctx, sessionId);
    } catch (err) {
      if (!(err instanceof IncompleteYearReport)) throw err;
      last = err;
    }
  }
  throw last;
}
