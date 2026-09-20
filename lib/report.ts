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
import { FIELD_LANGUAGE_NAME } from "./promptLocale";
import { buildReviewPrompt, checkReportDeterministic } from "./reportQuality";
import { logLlmUsage } from "./llmUsage";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const REPORT_MODEL = "gpt-5.4-mini";

export interface ReportBullet {
  title: string;
  body: string;
}

export interface ElementReading {
  heading: string;
  body: string;
}

const ELEMENT_KEYS = ["wood", "fire", "earth", "metal", "water"] as const;

export interface ReportContent {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  opening_scene: string;
  case_tag: string;
  case_paragraphs: string[];
  /** Free-half note under the five-element bar chart. Absent in reports saved before 2026-09-20. */
  oheng_intro?: string;
  element_readings: Record<(typeof ELEMENT_KEYS)[number], ElementReading>;
  upcoming_period_heading: string;
  upcoming_period_body: string;
  cross_analysis_quotes: string[];
  /** One entry per ReportContext.topAnswers, same order — empty when topAnswers wasn't sent. */
  answer_notes: string[];
  /** Paid-half notes under the chat-derived pages (empty without a chat / in older reports). */
  chat_snapshot_note?: string;
  chat_trigger_note?: string;
  chat_repeat_note?: string;
  chat_fear_note?: string;
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

function asElementReadings(value: unknown): ReportContent["element_readings"] {
  const obj = (value ?? {}) as Record<string, { heading?: unknown; body?: unknown }>;
  const result = {} as ReportContent["element_readings"];
  for (const key of ELEMENT_KEYS) {
    result[key] = {
      heading: String(obj[key]?.heading ?? ""),
      body: String(obj[key]?.body ?? ""),
    };
  }
  return result;
}

function parseReport(parsed: Record<string, unknown>): ReportContent {
  return {
    title_line1: String(parsed.title_line1 ?? ""),
    title_line2: String(parsed.title_line2 ?? ""),
    subtitle: String(parsed.subtitle ?? ""),
    opening_scene: String(parsed.opening_scene ?? ""),
    case_tag: String(parsed.case_tag ?? ""),
    case_paragraphs: asStringList(parsed.case_paragraphs),
    oheng_intro: String(parsed.oheng_intro ?? ""),
    element_readings: asElementReadings(parsed.element_readings),
    upcoming_period_heading: String(parsed.upcoming_period_heading ?? ""),
    upcoming_period_body: String(parsed.upcoming_period_body ?? ""),
    cross_analysis_quotes: asStringList(parsed.cross_analysis_quotes),
    answer_notes: asStringList(parsed.answer_notes),
    chat_snapshot_note: String(parsed.chat_snapshot_note ?? ""),
    chat_trigger_note: String(parsed.chat_trigger_note ?? ""),
    chat_repeat_note: String(parsed.chat_repeat_note ?? ""),
    chat_fear_note: String(parsed.chat_fear_note ?? ""),
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

async function generateOnce(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  sessionId?: string
): Promise<{ raw: string; content: ReportContent }> {
  const completion = await client.chat.completions.create({
    model: REPORT_MODEL,
    temperature: 0.85,
    messages,
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

  const raw = completion.choices[0]?.message?.content?.trim();
  if (!raw) throw new Error("OpenAI가 빈 응답을 반환했습니다.");
  return { raw, content: parseReport(JSON.parse(raw)) };
}

/** Generation rounds (first draft + fixes) and independent editor reviews. Time is cheap next to a
 * report the buyer is unhappy with: worst case is ~2 minutes and a few cents, and the client waits. */
const MAX_GENERATIONS = 4;
const MAX_REVIEWS = 2;

/** A second model reads the finished report against the source data as a strict editor. Returns
 * the problems it found ("path: issue"). Never throws — a failed review just means no findings. */
async function reviewReport(context: ReportContext, content: ReportContent, sessionId?: string): Promise<string[]> {
  try {
    const completion = await client.chat.completions.create({
      model: REPORT_MODEL,
      temperature: 0.1,
      messages: [
        { role: "system", content: buildReviewPrompt(context) },
        { role: "user", content: JSON.stringify({ ...content, case_tag: undefined, case_paragraphs: undefined }) },
      ],
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
    const parsed = JSON.parse(completion.choices[0]?.message?.content ?? "{}") as { problems?: unknown };
    if (!Array.isArray(parsed.problems)) return [];
    return parsed.problems
      .map((p) => {
        const o = (p ?? {}) as { field?: unknown; issue?: unknown };
        return typeof o.issue === "string" && o.issue ? `${typeof o.field === "string" ? o.field : "report"}: ${o.issue}` : "";
      })
      .filter(Boolean)
      // The editor sometimes lists an item only to say it is fine — drop those.
      .filter((p) => !/문제(가)? ?없|문제 ?아님|no (hay )?(problem|error)|not (a )?(problem|an error)|no issue|sin problema/i.test(p))
      .slice(0, 6);
  } catch (err) {
    console.error("[report] review failed (non-fatal)", err);
    return [];
  }
}


/** Path helpers for "strengths[1].body"-style locations. */
function pathParts(path: string): (string | number)[] {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean)
    .map((k) => (/^\d+$/.test(k) ? Number(k) : k));
}
function getAt(root: unknown, path: string): unknown {
  return pathParts(path).reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string | number, unknown>)[k]), root);
}
function setAt(root: unknown, path: string, value: string): boolean {
  const parts = pathParts(path);
  const last = parts.pop();
  const parent = parts.reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string | number, unknown>)[k]), root);
  if (parent == null || last == null || typeof (parent as Record<string | number, unknown>)[last] !== "string") return false;
  (parent as Record<string | number, unknown>)[last] = value;
  return true;
}

/** Last resort for a finding the full-report fixes could not clear (typically one stubborn word):
 * rewrite just that one string. Only string-level problems are repaired this way; missing
 * sentences or numbers stay with the full rewrite loop. */
async function repairStrings(context: ReportContext, content: ReportContent, problems: string[], sessionId?: string): Promise<ReportContent> {
  const fixed: ReportContent = JSON.parse(JSON.stringify(content));
  const languageName = FIELD_LANGUAGE_NAME[context.locale ?? "ko"];
  const targets = new Map<string, string>();
  for (const p of problems) {
    const i = p.indexOf(": ");
    if (i < 0 || /문장 이상|퍼센트|나이/.test(p)) continue;
    const path = p.slice(0, i);
    if (typeof getAt(fixed, path) === "string" && !targets.has(path)) targets.set(path, p.slice(i + 2));
  }
  for (const [path, issue] of Array.from(targets).slice(0, 6)) {
    try {
      const original = getAt(fixed, path) as string;
      const completion = await client.chat.completions.create({
        model: REPORT_MODEL,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `다음 문장을 ${languageName}로 고쳐 써라. 고칠 점: ${issue}. 뜻, 분량(문장 수), 어조는 그대로 유지하고 그 문제만 없애라. 독자 성별을 드러내는 형용사·분사는 명사나 동사로 바꿔라. JSON 객체 {"text": "..."} 하나만 출력.`,
          },
          { role: "user", content: original },
        ],
        response_format: { type: "json_object" },
      });
      if (completion.usage) {
        await logLlmUsage({ sessionId, endpoint: "report", model: REPORT_MODEL, promptTokens: completion.usage.prompt_tokens, completionTokens: completion.usage.completion_tokens });
      }
      const text = (JSON.parse(completion.choices[0]?.message?.content ?? "{}") as { text?: unknown }).text;
      if (typeof text === "string" && text.trim()) setAt(fixed, path, text.trim());
    } catch (err) {
      console.error("[report] string repair failed (non-fatal)", err);
    }
  }
  return fixed;
}

export async function getReportContent(context: ReportContext, sessionId?: string): Promise<ReportContent> {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [{ role: "system", content: buildReportPrompt(context) }];

  let current = await generateOnce(messages, sessionId);
  let best = current;
  let bestScore = Number.POSITIVE_INFINITY;
  let generations = 1;
  let reviews = 0;

  for (;;) {
    // Exact checks first; only a draft that passes them is worth an editor's read.
    let problems = checkReportDeterministic(current.content, context);
    if (problems.length === 0 && reviews < MAX_REVIEWS) {
      reviews += 1;
      problems = await reviewReport(context, current.content, sessionId);
    }
    console.info(`[report] draft ${generations}: ${problems.length} finding(s)${problems.length ? ` — ${problems.slice(0, 3).join(" | ").slice(0, 300)}` : ""}`);
    if (problems.length < bestScore) {
      best = current;
      bestScore = problems.length;
    }
    if (problems.length === 0 || generations >= MAX_GENERATIONS) break;

    // Hand the model its own JSON back with exactly what was found and ask for the full object again.
    generations += 1;
    try {
      current = await generateOnce(
        [
          ...messages,
          { role: "assistant", content: current.raw },
          {
            role: "user",
            content: `검수에서 다음 문제가 발견됐다. 해당 필드만 고치고(각각 규칙 8·11·12·13과 언어 스타일 규칙에 맞게), 나머지 필드는 그대로 유지한 전체 JSON 객체 하나만 다시 출력해라.\n${problems.map((p, i) => `${i + 1}. ${p}`).join("\n")}`,
          },
        ],
        sessionId
      );
    } catch (err) {
      console.error("[report] fix round failed (non-fatal)", err);
      break;
    }
  }
  if (bestScore > 0) {
    // One more chance for stubborn string-level findings (checked by code, so this is exact).
    const remaining = checkReportDeterministic(best.content, context);
    if (remaining.length > 0) {
      const repaired = await repairStrings(context, best.content, remaining, sessionId);
      if (checkReportDeterministic(repaired, context).length < remaining.length) return repaired;
    }
  }
  if (bestScore > 0) console.warn(`[report] shipped with ${bestScore} unresolved finding(s) after ${generations} generation(s)`);
  return best.content;
}
