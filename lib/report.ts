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
import { FIELD_LANGUAGE_NAME, outputLanguageDirective } from "./promptLocale";
import { buildReviewPrompt, checkReportDeterministic, describeReportData, getAt, setAt, stripHanja } from "./reportQuality";
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
  /** Free-half reading under the psych-test bars. Absent in reports saved before 2026-09-21. */
  quiz_reading?: string;
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
    quiz_reading: String(parsed.quiz_reading ?? ""),
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


/** Rewrites ONLY the flagged strings, all in one call. The earlier design handed the model its whole
 * report back (~3.4k output tokens) for every round; a targeted fix is a fraction of that. Problems
 * arrive as "path: issue"; a path that isn't a string in the report is ignored. Never throws — on any
 * failure the content is returned unchanged. */
async function patchFields(context: ReportContext, content: ReportContent, problems: string[], sessionId?: string): Promise<ReportContent> {
  const locale = context.locale ?? "ko";
  const targets: Record<string, { current: string; problems: string[] }> = {};
  for (const p of problems) {
    const i = p.indexOf(": ");
    if (i < 1) continue;
    const path = p.slice(0, i);
    const current = getAt(content, path);
    if (typeof current !== "string") continue;
    (targets[path] ??= { current, problems: [] }).problems.push(p.slice(i + 2));
  }
  const paths = Object.keys(targets).slice(0, 14);
  if (paths.length === 0) return content;
  const request = Object.fromEntries(paths.map((k) => [k, targets[k]]));
  try {
    const completion = await client.chat.completions.create({
      model: REPORT_MODEL,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `너는 유료 심층 리포트의 편집자다. 사용자가 준 JSON의 각 필드는 검수에서 문제가 발견된 문장이다. "problems"를 모두 해결하도록 각 필드를 ${FIELD_LANGUAGE_NAME[locale]}로 다시 써라.
- 이 사람의 실제 데이터(아래 근거 데이터)에서 온 구체적 디테일을 넣고, 데이터에 없는 사실·수치를 지어내지 마라.
- 문제 설명이 요구하는 내용은 반드시 새 문장 안에 실제로 담는다(예: 일간 기준 원소 관계를 쉬운 말로 한 문장씩). 문장 수가 적혀 있으면 그 이상의 완결된 문장으로 쓰고, 필드의 원래 역할과 어조는 유지한다. 필드 이름·프롬프트·데이터 누락을 언급하지 않는다.
- 한자를 쓰지 않는다. 독자는 2인칭으로 부르고, 독자 성별을 드러내는 형용사는 명사·동사로 바꾼다.

## 근거 데이터
${describeReportData(context)}

## 출력
JSON 객체 하나만: {"fixes": {"<필드 경로>": "<다시 쓴 문장>"}} — 받은 경로마다 하나씩.${outputLanguageDirective(locale, { en: 'value in "fixes"', es: 'objeto "fixes"' })}`,
        },
        { role: "user", content: JSON.stringify(request) },
      ],
      response_format: { type: "json_object" },
    });
    if (completion.usage) {
      await logLlmUsage({ sessionId, endpoint: "report", model: REPORT_MODEL, promptTokens: completion.usage.prompt_tokens, completionTokens: completion.usage.completion_tokens });
    }
    const fixes = (JSON.parse(completion.choices[0]?.message?.content ?? "{}") as { fixes?: Record<string, unknown> }).fixes ?? {};
    const patched: ReportContent = JSON.parse(JSON.stringify(content));
    for (const path of paths) {
      const text = fixes[path];
      if (typeof text === "string" && text.trim()) setAt(patched, path, text.trim());
    }
    return patched;
  } catch (err) {
    console.error("[report] patch failed (non-fatal)", err);
    return content;
  }
}

/** Generate once, then fix only what is wrong:
 *   1. code checks (free) → one targeted fix call for what they found
 *   2. ONE editor review of the result → one targeted fix call for what it found
 *   3. code checks again as the last gate; a fix that made things worse is discarded.
 * Typically 2–4 calls (~$0.035) instead of rewriting the whole report for every finding (~$0.10). */
export async function getReportContent(context: ReportContext, sessionId?: string): Promise<ReportContent> {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [{ role: "system", content: buildReportPrompt(context) }];
  let current = (await generateOnce(messages, sessionId)).content;

  const fixOnce = async (problems: string[], label: string) => {
    if (problems.length === 0) return;
    const before = checkReportDeterministic(current, context).length;
    const patched = await patchFields(context, current, problems, sessionId);
    const after = checkReportDeterministic(patched, context).length;
    console.info(`[report] ${label}: ${problems.length} finding(s), code findings ${before} → ${after}`);
    if (after <= before) current = patched;
  };

  await fixOnce(checkReportDeterministic(current, context), "code checks");
  await fixOnce(await reviewReport(context, current, sessionId), "editor review");

  const remaining = checkReportDeterministic(current, context);
  if (remaining.length > 0) {
    await fixOnce(remaining, "final gate");
    const left = checkReportDeterministic(current, context).length;
    if (left > 0) console.warn(`[report] shipped with ${left} unresolved code finding(s)`);
  }
  return context.locale === "ko" ? stripHanja(current) : current;
}
