// Reply draft for one Reddit post, built on top of its memo. A starting point the reader edits and posts
// by hand: nothing here ever posts. Sensitive posts (self-harm, suicide) get no draft at all.
// checkDraft() reuses the memo's link/brand rules and adds tells that read as machine-written.
import OpenAI from "openai";
import { addUsage, samplingParams, type ChartResult, type Usage } from "./chart.mts";
import type { RedditPost } from "./collect.mts";
import type { Competitor, SubredditMeta } from "./config.mts";
import { linkAndBrandWarnings, MEMO_MODEL, memoPrompt, type MemoBody } from "./memo.mts";

export const DRAFT_MODEL = process.env.REDDIT_DRAFT_MODEL || MEMO_MODEL;

export type Draft = { status: "ok"; text: string; warnings: string[] } | { status: "skipped"; reason: string };

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["draft"],
  properties: { draft: { type: "string" } },
} as const;

const SYSTEM = `You draft a Reddit comment for a saju (Korean Four Pillars / BaZi) practitioner. They will read it, edit it and post it themselves.

Write like a knowledgeable person typing a reply, not like an assistant:
- Same language as the post (English if unsure). 50 to 150 words. Plain paragraphs, at most 3, no headings, no bullet lists, no bold.
- Start with the substance. No "Great question", no "Hi", no thanks, no sign-off, no offer to DM.
- No em dashes. No "Overall", "In summary", "It's important to note", "dive into", "tapestry", "journey".
- Use the planning notes as the outline. Use the subreddit's own vocabulary (day master, elements, pillars).

Hard rules:
- Never mention any app, website, product, service, URL or brand, including the practitioner's own. Never ask them to DM or to visit anything.
- Chart facts: use ONLY the computed chart given. If no chart is given, state no pillar, day master, element count or luck pillar; ask for birth date, time and city, and speak generally.
- No bad days or bad matches: describe different rhythms and how two charts interact, never "unlucky", "doomed" or "incompatible".
- No predictions about health, illness, death, accidents, disasters or losing money. Steer to tendencies and what they can do.
- No flat negative predictions. Frame challenges as something to pace or work with.
- If the poster seems under 18 and asks about romance, keep it to personality and friendship.
- Saju is a reflective tool: say what a chart suggests, never what will definitely happen.`;

// Posts mentioning self-harm or suicide: no draft, the reader decides whether to answer at all.
const SENSITIVE_RE = /\b(suicid\w*|kill (?:my ?self|myself)|self[- ]?harm\w*|end (?:my|it all)|want to die|cutting myself|overdos\w*)\b|자살|자해|죽고\s*싶/i;

export function sensitiveReason(post: RedditPost): string | null {
  const m = `${post.title}\n${post.body}`.match(SENSITIVE_RE);
  return m ? `민감 글(“${m[0]}”): 초안 생략, 답할지 직접 판단` : null;
}

// Empty body + image or gallery link: the model only sees the title, so notes and drafts would talk past
// the chart the poster actually shared.
const IMAGE_URL_RE = /^https?:\/\/(?:i\.redd\.it|preview\.redd\.it|i\.imgur\.com)\/|\.(?:png|jpe?g|gif|webp)(?:\?|$)|reddit\.com\/gallery\//i;

export function imageOnlyReason(post: RedditPost): string | null {
  return !post.body.trim() && IMAGE_URL_RE.test(post.url) ? "이미지 글: 본문 없이 이미지만 있어 메모·초안 생략, 링크에서 이미지를 직접 보고 판단" : null;
}

const AI_TELL_RE = /—|\b(great question|in summary|overall,|it'?s important to note|dive into|tapestry|journey)\b/i;
const LIST_RE = /^\s*(?:[-*•]|\d+\.)\s|^#+\s|\*\*/m;

export function checkDraft(text: string, competitors: Competitor[]): string[] {
  const warnings = linkAndBrandWarnings(text, competitors);
  if (/\bDM\b|direct message|message me/i.test(text)) warnings.push("DM 유도");
  const words = text.trim().split(/\s+/).length;
  if (words > 200) warnings.push(`${words}단어(길다)`);
  const tell = text.match(AI_TELL_RE);
  if (tell) warnings.push(`AI 티(${tell[0]})`);
  if (LIST_RE.test(text)) warnings.push("목록·제목·굵게");
  if (!text.trim()) warnings.push("초안 비어 있음");
  return warnings;
}

export function draftPrompt(post: RedditPost, memo: MemoBody, chart: ChartResult | null, chartText: string | null): string {
  return [
    memoPrompt(post, chart, chartText),
    "",
    "Planning notes (Korean, from the practitioner's prep):",
    `- Gist: ${memo.gist}`,
    ...memo.points.map((p) => `- Point: ${p}`),
    ...memo.avoid.map((a) => `- Avoid: ${a}`),
  ].join("\n");
}

export async function draftForPost(
  post: RedditPost,
  memo: MemoBody,
  chart: ChartResult | null,
  chartText: string | null,
  competitors: Competitor[],
  client: OpenAI,
  usage: Usage,
  model = DRAFT_MODEL,
): Promise<Draft> {
  const skip = imageOnlyReason(post) ?? sensitiveReason(post);
  if (skip) return { status: "skipped", reason: skip };
  const completion = await client.chat.completions.create({
    model,
    ...samplingParams(model),
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: draftPrompt(post, memo, chart, chartText) },
    ],
    response_format: { type: "json_schema", json_schema: { name: "draft", strict: true, schema: SCHEMA } },
  });
  addUsage(usage, model, completion.usage);
  const text = ((JSON.parse(completion.choices[0]?.message?.content ?? "{}") as { draft?: string }).draft ?? "").trim();
  return { status: "ok", text, warnings: checkDraft(text, competitors) };
}

/** Markdown for the digest's draft slot. AI-banned or unwatched subreddits get a warning line first. */
export function formatDraft(d: Draft, meta: SubredditMeta | undefined): string {
  if (d.status === "skipped") return `- ${d.reason}`;
  const head = [
    ...(meta?.aiBanned ? ["- ⚠️ AI 글 금지 서브레딧: 그대로 올리지 말고 자기 말로 다시 쓸 것"] : []),
    ...(meta ? [] : ["- ⚠️ 감시 밖 서브레딧: 올리기 전에 규칙 직접 확인"]),
    ...(d.warnings.length ? [`- ⚠️ 검사기 경고: ${d.warnings.join(", ")}`] : []),
  ];
  const body = d.text.split(/\r?\n/).map((l) => (l.trim() ? `> ${l}` : ">"));
  return [...head, ...body].join("\n");
}
