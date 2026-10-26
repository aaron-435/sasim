// Memo checker and formatting, offline: npx tsx scripts/reddit/memo.test.mts
import assert from "node:assert/strict";
import { loadConfig } from "./config.mts";
import { checkMemo, formatMemo, memoPrompt, rulesLine, sentenceCount } from "./memo.mts";
import { renderDigest } from "./render.mts";
import type { RedditPost } from "./collect.mts";

let n = 0;
const check = (cond: unknown, msg: string) => {
  assert.ok(cond, msg);
  n++;
};

const config = loadConfig();
const clean = {
  gist: "1990년생 庚 일간인데 직업 방향이 궁금함",
  points: ["일간 庚 Metal: 원칙·결단 쪽 성향으로 설명", "시주 없으니 출생 시각을 물어보기"],
  avoid: ["특정 직업이 맞다/안 맞다 단정"],
};
check(checkMemo(clean, config.competitors).length === 0, "clean memo has no warnings");

const has = (m: typeof clean, w: string) => checkMemo(m, config.competitors).some((x) => x.includes(w));
check(has({ ...clean, points: [...clean.points, "see https://example.com"] }, "URL"), "https URL flagged");
check(has({ ...clean, avoid: ["mention fatesaidapp.com"] }, "URL"), "bare domain flagged");
check(has({ ...clean, gist: "Fatesaid 앱 추천" }, "Fatesaid"), "own brand flagged");
check(has({ ...clean, gist: "Fate Said 앱" }, "Fatesaid"), "spaced own brand flagged");
check(has({ ...clean, points: [...clean.points, "PAL:JA 와 비교"] }, "경쟁사"), "competitor name flagged");
check(has({ ...clean, avoid: ["getpalja 언급"] }, "경쟁사"), "competitor alias flagged");
check(!has({ ...clean, avoid: ["a pal of yours"] }, "경쟁사"), "plain 'pal' not flagged");
const para = "Your day master is Geng Metal. That means you are decisive. You value fairness. Your chart also has strong Water. This suggests flow.";
check(sentenceCount(para) === 5, "5 sentences counted");
check(sentenceCount("일간 庚 Metal: 원칙 쪽 성향") === 1, "fragment is one sentence");
check(sentenceCount("성향 설명. 시각 묻기.") === 2, "Korean with periods");
check(has({ ...clean, points: [para, clean.points[1]] }, "3문장"), "paragraph flagged");
check(has({ ...clean, points: ["Hi there! Great chart", clean.points[1]] }, "인사말"), "greeting flagged");
check(has({ ...clean, points: [clean.points[0]] }, "포인트 1개"), "one point flagged");
check(has({ ...clean, points: ["a", "b", "c", "d"] }, "포인트 4개"), "four points flagged");

const zodiac = config.subreddits.find((s) => s.name === "ChineseZodiac");
const astro = config.subreddits.find((s) => s.name === "astrology");
check(rulesLine(zodiac).startsWith("링크 금지"), "ChineseZodiac: links banned");
check(rulesLine(astro).includes("AI 글 금지"), "astrology: AI banned");
check(rulesLine(undefined).includes("감시 밖"), "unwatched subreddit");

const post: RedditPost = {
  id: "t3_x", subreddit: "Bazi_Astrology", title: "Career?", body: "Born 1990-05-12, what job fits?", author: "a",
  createdUtc: 0, numComments: null, permalink: "https://www.reddit.com/r/x", url: "", sources: [],
};
check(memoPrompt(post, null, null).includes("none. Do not state any chart facts"), "no chart → forbid chart facts");
check(memoPrompt(post, { status: "none", reason: "x" }, "출생 정보 없음 (x)").includes("none."), "none status → no chart text");

const md = formatMemo({ ...clean, rules: "링크 금지", warnings: [] });
check(md.split("\n").length === 7 && md.includes("  - 시주 없으니"), "memo markdown shape");
const warned = formatMemo({ ...clean, rules: "링크 금지", warnings: ["URL·도메인 포함"] });
check(warned.startsWith("- ⚠️ 검사기 경고: URL"), "warning line first");

const base = {
  date: "2026-10-26", generatedAt: new Date(), stats: [], requests: 0, todayCount: 0, cap: 200, totalNew: 1,
  top: [{ post, score: 5, reasons: ["kw"], birth: { date: true, time: false }, crossposts: [] }],
};
const full = renderDigest({ ...base, dryRun: false, notes: [{ memo: md, chart: "출생 정보 없음 (본문에 출생 연도 없음)" }], llm: { calls: 2, costUsd: 0.0012 } });
check(full.includes("LLM 비용: $0.0012 (OpenAI 2회)"), "cost in header");
check(full.includes("- 사주: 출생 정보 없음"), "one-line chart inline");
check(full.includes("- 메모:\n  - 요지:"), "memo indented under label");
check(renderDigest({ ...base, dryRun: false, notes: [], llm: { calls: 0, costUsd: 0 } }).includes("- 메모: (--limit 밖)"), "beyond limit");
check(renderDigest({ ...base, dryRun: true }).includes("- 메모: (dry-run)"), "dry-run slot");

console.log(`memo tests: ${n} passed`);
