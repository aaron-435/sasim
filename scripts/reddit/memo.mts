// "What to say" notes for one Reddit post. Notes only: the reader writes the actual reply in their own words.
// The LLM gives gist / points / avoid; the subreddit rule line comes from config, never from the model.
// checkMemo() flags anything that drifts toward a pasteable reply, a link or a brand name.
import OpenAI from "openai";
import { addUsage, samplingParams, type ChartResult, type Usage } from "./chart.mts";
import type { RedditPost } from "./collect.mts";
import type { Competitor, SubredditMeta } from "./config.mts";
import { termRe } from "./competitors.mts";

export const MEMO_MODEL = process.env.REDDIT_MEMO_MODEL || "gpt-5.4-mini";

export type MemoBody = { gist: string; points: string[]; avoid: string[] };
export type Memo = MemoBody & { rules: string; warnings: string[] };

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["gist", "points", "avoid"],
  properties: {
    gist: { type: "string" },
    points: { type: "array", items: { type: "string" } },
    avoid: { type: "array", items: { type: "string" } },
  },
} as const;

// Principles from PRODUCT.md and the root CLAUDE.md pressure rule, restated for a stranger's post.
const SYSTEM = `You help a saju (Korean Four Pillars / BaZi) practitioner decide what to say in a Reddit reply.
They will write the reply themselves, in their own words. You write short planning notes in Korean, never the reply.

Output JSON:
- gist: one line, what the poster actually wants to know.
- points: 2 or 3 bullet notes, each a fragment or one short sentence (max 2 sentences). Each names one idea worth making, e.g. "일간 庚 Metal: 결단력·원칙 쪽 성향으로 설명" or "시주 없으니 시각을 물어보기".
- avoid: 1 to 3 short notes on what not to say for this post.

Hard rules:
- Notes, not prose. No greetings, no sign-off, no full paragraph, nothing that could be pasted as a reply.
- Never mention any app, website, product, service, URL or brand, including the practitioner's own. Never suggest linking anything or sending a DM.
- Chart facts: use ONLY the computed chart given below. If no chart is given, do not state any pillar, day master, element count or luck pillar; suggest asking for birth data instead or speak generally.
- No bad days or bad matches: describe different rhythms and how two charts interact, never "unlucky", "doomed" or "incompatible".
- No predictions about health, illness, death, accidents, disasters or losing money. If the poster asks for one, a point should steer to tendencies and what they can do.
- No flat negative predictions ("you will fail", "this will end badly"). Frame challenges as something to pace or work with.
- If the poster seems under 18 and asks about romance or a partner, the only point is to keep it to personality and friendship and skip romantic readings.
- Saju is a reflective tool, not certainty. Points may say what a chart suggests, never what will definitely happen.`;

export function rulesLine(meta: SubredditMeta | undefined): string {
  if (!meta) return "감시 밖 서브레딧: 답하기 전에 규칙 직접 확인";
  const parts = [meta.linksAllowed ? "링크 허용" : "링크 금지", ...(meta.aiBanned ? ["AI 글 금지(자기 말로)"] : []), meta.promoRule];
  return parts.join(" · ");
}

function chartContext(chart: ChartResult | null, chartText: string | null): string {
  if (chart && (chart.status === "ok" || chart.status === "lunar") && chartText) return `Computed chart (the only chart facts you may use):\n${chartText}`;
  return "Computed chart: none. Do not state any chart facts.";
}

export function memoPrompt(post: RedditPost, chart: ChartResult | null, chartText: string | null): string {
  return [
    `Subreddit: r/${post.subreddit}`,
    `Title: ${post.title.trim()}`,
    `Post:\n${post.body.trim().slice(0, 4000) || "(no body)"}`,
    "",
    chartContext(chart, chartText),
  ].join("\n");
}

const URL_RE = /https?:\/\/|www\.|\b[a-z0-9-]+\.(com|app|io|net|org|co|ai|kr)\b/i;
const OWN_BRAND_RE = /fate\s*said/i;
const REPLY_OPENER_RE = /^\s*(hi|hey|hello|great question|thanks for sharing|안녕하세요)\b/i;

/** Sentences ending in . ! ? 。 (or the end of the text). */
export function sentenceCount(s: string): number {
  return s.split(/[.!?。]+(?:\s+|$)/).filter((x) => /[\p{L}\p{N}]/u.test(x)).length;
}

/** URL, own brand and competitor names: banned in memos and drafts alike. */
export function linkAndBrandWarnings(text: string, competitors: Competitor[]): string[] {
  const warnings: string[] = [];
  if (URL_RE.test(text)) warnings.push("URL·도메인 포함");
  if (OWN_BRAND_RE.test(text)) warnings.push("Fatesaid 언급");
  for (const c of competitors) {
    const hit = [c.name, ...c.aliases, ...c.domains].find((t) => termRe(t)?.test(text));
    if (hit) warnings.push(`경쟁사 언급(${hit})`);
  }
  return warnings;
}

export function checkMemo(m: MemoBody, competitors: Competitor[]): string[] {
  const fields = [m.gist, ...m.points, ...m.avoid];
  const warnings = linkAndBrandWarnings(fields.join("\n"), competitors);
  if (fields.some((f) => sentenceCount(f) > 3)) warnings.push("3문장 넘는 문단(완성 답글 의심)");
  if (fields.some((f) => REPLY_OPENER_RE.test(f))) warnings.push("답글 인사말");
  if (m.points.length < 2 || m.points.length > 3) warnings.push(`답할 포인트 ${m.points.length}개(2~3개 기대)`);
  if (!m.gist.trim()) warnings.push("요지 비어 있음");
  return warnings;
}

export async function memoForPost(
  post: RedditPost,
  meta: SubredditMeta | undefined,
  chart: ChartResult | null,
  chartText: string | null,
  competitors: Competitor[],
  client: OpenAI,
  usage: Usage,
  model = MEMO_MODEL,
): Promise<Memo> {
  const completion = await client.chat.completions.create({
    model,
    ...samplingParams(model),
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: memoPrompt(post, chart, chartText) },
    ],
    response_format: { type: "json_schema", json_schema: { name: "memo", strict: true, schema: SCHEMA } },
  });
  addUsage(usage, model, completion.usage);
  const body = JSON.parse(completion.choices[0]?.message?.content ?? "{}") as MemoBody;
  const memo: MemoBody = { gist: body.gist ?? "", points: body.points ?? [], avoid: body.avoid ?? [] };
  return { ...memo, rules: rulesLine(meta), warnings: checkMemo(memo, competitors) };
}

/** Markdown lines for the digest's memo slot. */
export function formatMemo(m: Memo): string {
  const flat = (s: string) => s.replace(/\s+/g, " ").trim();
  return [
    ...(m.warnings.length ? [`- ⚠️ 검사기 경고: ${m.warnings.join(", ")}`] : []),
    `- 요지: ${flat(m.gist)}`,
    "- 답할 포인트:",
    ...m.points.map((p) => `  - ${flat(p)}`),
    "- 피할 것:",
    ...m.avoid.map((a) => `  - ${flat(a)}`),
    `- 서브레딧 규칙: ${m.rules}`,
  ].join("\n");
}
