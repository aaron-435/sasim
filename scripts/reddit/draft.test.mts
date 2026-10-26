// Draft checker, sensitive filter and formatting, offline: npx tsx scripts/reddit/draft.test.mts
import assert from "node:assert/strict";
import { loadConfig, parseConfig } from "./config.mts";
import { checkDraft, draftPrompt, formatDraft, sensitiveReason } from "./draft.mts";
import { renderDigest } from "./render.mts";
import type { RedditPost } from "./collect.mts";

let n = 0;
const check = (cond: unknown, msg: string) => {
  assert.ok(cond, msg);
  n++;
};

const config = loadConfig();
const clean =
  "Geng Metal day masters tend to hold firm lines, so a role with clear standards usually suits you better than one that keeps shifting.\n\nWithout your birth hour the hour pillar is missing, so take this as a partial read.";
check(checkDraft(clean, config.competitors).length === 0, "clean draft has no warnings");
const has = (t: string, w: string) => checkDraft(t, config.competitors).some((x) => x.includes(w));
check(has(clean + " See fatesaidapp.com", "URL"), "domain flagged");
check(has(clean + " I use Fatesaid for this.", "Fatesaid"), "own brand flagged");
check(has(clean + " PAL:JA says otherwise.", "경쟁사"), "competitor flagged");
check(has(clean + " Feel free to DM me.", "DM"), "DM flagged");
check(has("Your chart is balanced — mostly.", "AI 티"), "em dash flagged");
check(has("Great question! Your chart shows Metal.", "AI 티"), "assistant opener flagged");
check(has("Here is the read:\n- Metal strong\n- Water weak", "목록"), "bullet list flagged");
check(has("Your **day master** is Metal.", "목록"), "bold flagged");
check(has(Array(210).fill("word").join(" "), "단어"), "long draft flagged");
check(has("   ", "비어"), "empty draft flagged");

const post = (title: string, body: string): RedditPost => ({
  id: "t3_x", subreddit: "Bazi_Astrology", title, body, author: "a", createdUtc: 0, numComments: 0,
  permalink: "https://www.reddit.com/r/x", url: "", sources: [],
});
check(sensitiveReason(post("Am I doomed?", "I keep thinking about suicide since my dad died")) !== null, "suicide → skip");
check(sensitiveReason(post("help", "I want to die, what does my chart say")) !== null, "want to die → skip");
check(sensitiveReason(post("사주", "요즘 자해를 해요")) !== null, "Korean self-harm → skip");
check(sensitiveReason(post("Career?", "Born 1990-05-12, what job fits?")) === null, "normal post passes");
check(sensitiveReason(post("Death card?", "My chart has the Death star 死, what is that")) === null, "plain 'death' passes");

const memo = { gist: "직업 방향", points: ["庚 일간 원칙"], avoid: ["단정"] };
const prompt = draftPrompt(post("Career?", "Born 1990-05-12"), memo, null, null);
check(prompt.includes("none. Do not state any chart facts") && prompt.includes("- Point: 庚 일간 원칙"), "prompt carries memo, forbids chart facts");

const banned = config.subreddits.find((s) => s.aiBanned);
const open = config.subreddits.find((s) => !s.aiBanned);
const ok = { status: "ok" as const, text: "Line one.\n\nLine two.", warnings: [] };
check(formatDraft(ok, banned).startsWith("- ⚠️ AI 글 금지"), "AI-banned sub warns first");
check(!formatDraft(ok, open).includes("AI 글 금지"), "open sub has no AI warning");
check(formatDraft(ok, undefined).includes("감시 밖"), "unwatched sub warns");
check(formatDraft(ok, open) === "> Line one.\n>\n> Line two.", "draft rendered as blockquote");
check(formatDraft({ status: "skipped", reason: "민감 글" }, open) === "- 민감 글", "skipped shows reason");

const md = renderDigest({
  date: "2026-10-26", generatedAt: new Date(), dryRun: false, stats: [], requests: 3, transport: "aside (u/x)", todayCount: 3, cap: 200, totalNew: 1,
  top: [{ post: post("Career?", "Born"), score: 5, reasons: ["kw"], birth: { date: true, time: false }, crossposts: [] }],
  notes: [{ memo: "- 요지: x", chart: "시주 없음", draft: formatDraft(ok, banned) }],
  llm: { calls: 3, costUsd: 0.001 },
});
check(md.includes("수집 aside (u/x)"), "header shows transport");
check(md.includes("- 초안 (직접 고쳐서 올리기):\n  - ⚠️ AI 글 금지") && md.includes("  > Line one."), "draft slot indented under top post");

const base = JSON.parse(JSON.stringify(config));
check(parseConfig({ ...base, transport: undefined }).transport === "direct", "transport defaults to direct");
assert.throws(() => parseConfig({ ...base, transport: "chrome" }), /transport/);
n++;

console.log(`draft tests: ${n} passed`);
