// Morning Reddit listening digest. Read-only: never posts, votes, comments or messages.
//   npm run reddit:digest -- [--dry-run] [--limit N] [--config path] [--transport aside|direct]
// --dry-run: collect and score only, no LLM calls. --limit N: memo + draft only the top N posts (default config.topN).
// Transport (config.transport, overridable): "aside" collects through the logged-in Aside browser and falls back to
// "direct" (cookie-less) when Aside is not running or logged in as another account. The shadow check is always direct.
import { ConfigError, loadConfig } from "./config.mts";
import { asideAccount, Fetcher, type Transport } from "./fetch.mts";
import { collect } from "./collect.mts";
import { loadRequests, loadSeen, saveRequests, saveSeen, todayLocal } from "./state.mts";
import { rankPosts } from "./score.mts";
import { competitorOwner, findCompetitorMentions } from "./competitors.mts";
import { groupCrossposts } from "./dedupe.mts";
import { renderDigest, statNote, writeDigest } from "./render.mts";
import OpenAI from "openai";
import { chartForPost, emptyUsage, formatChart } from "./chart.mts";
import { formatMemo, memoForPost, MEMO_MODEL } from "./memo.mts";
import { draftForPost, formatDraft, imageOnlyReason } from "./draft.mts";
import { checkShadow, shadowSummary } from "./shadow.mts";

export type DigestArgs = { dryRun: boolean; limit: number | null; configPath: string | undefined; transport: Transport | undefined };

export function parseArgs(argv: string[]): DigestArgs {
  const args: DigestArgs = { dryRun: false, limit: null, configPath: undefined, transport: undefined };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--limit") {
      const n = Number(argv[++i]);
      if (!Number.isInteger(n) || n < 1) throw new Error("--limit needs a positive integer");
      args.limit = n;
    } else if (a === "--config") {
      const p = argv[++i];
      if (!p) throw new Error("--config needs a path");
      args.configPath = p;
    } else if (a === "--transport") {
      const t = argv[++i];
      if (t !== "aside" && t !== "direct") throw new Error("--transport needs aside or direct");
      args.transport = t;
    } else throw new Error(`unknown argument: ${a}`);
  }
  return args;
}

let args: DigestArgs;
try {
  args = parseArgs(process.argv.slice(2));
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}

let config;
try {
  config = loadConfig(args.configPath);
} catch (e) {
  if (e instanceof ConfigError) {
    console.error(e.message);
    process.exit(1);
  }
  throw e;
}

const limit = Math.min(args.limit ?? config.topN, config.topN);
console.log(`config ok: ${config.subreddits.length} subreddits, ${config.keywords.length} keywords (+${config.auxKeywords.length} aux), ${config.competitors.length} competitors`);
console.log(`mode: ${args.dryRun ? "dry-run (no LLM)" : "full"}, top ${limit}, interval ${config.requestIntervalMs}ms, cap ${config.dailyRequestCap} requests/day`);

const startedAt = Date.now();
const seen = loadSeen();
const today = loadRequests();
let transport: Transport = args.transport ?? config.transport;
let transportNote = transport === "aside" ? `aside (u/${config.account})` : "direct (쿠키 없음)";
if (transport === "aside") {
  const who = await asideAccount();
  if (who?.toLowerCase() !== config.account.toLowerCase()) {
    transport = "direct";
    transportNote = `direct (쿠키 없음) — aside ${who ? `계정이 u/${who}` : "응답 없음·로그아웃"}이라 대체`;
  }
}
console.log(`transport: ${transportNote}`);
const fetcher = new Fetcher(config, today, transport);
const { posts, stats } = await collect(config, fetcher, seen);
for (const s of stats) {
  if (s.failed) console.log(`${s.source}  FAILED: ${statNote(s)}`);
  else console.log(`${s.source}  fetched ${s.fetched}  new ${s.fresh}  (${statNote(s)})`);
}
console.log(`total new posts: ${posts.length}, failed sources: ${stats.filter((s) => s.failed).length}, requests: ${fetcher.made} (today ${today.count}/${config.dailyRequestCap})`);

// Logged-out shadow check runs in dry-run too: it is read-only and costs no LLM calls.
// Logged-out view on purpose: through Aside our own comments would always look visible.
const shadowFetcher = new Fetcher(config, today, "direct");
const shadow = shadowSummary(await checkShadow(config.account, shadowFetcher));
if (shadow.alert) console.log(`WARNING: ${shadow.alert}`);
for (const l of shadow.lines) console.log(`shadow: ${l}`);
const ranked = rankPosts(posts, config, Date.now());
const competitorHits = findCompetitorMentions(posts, config.competitors);
const kept = ranked.filter((s) => competitorOwner(s.post, config.competitors) === null);
const grouped = groupCrossposts(kept);
const top = grouped.slice(0, config.topN);
const folded = grouped.reduce((a, t) => a + t.crossposts.length, 0);

// Full mode: chart (only when a birth year shows up) then memo, for the first `limit` top posts.
const usage = emptyUsage();
let notes: { memo: string; chart: string; draft: string }[] | undefined;
let memoWarnings = 0;
let draftWarnings = 0;
if (!args.dryRun) {
  const client = new OpenAI();
  notes = [];
  for (const [i, t] of top.slice(0, limit).entries()) {
    const imageOnly = imageOnlyReason(t.post);
    if (imageOnly) {
      notes.push({ memo: `- ${imageOnly}`, chart: "(이미지 글이라 생략)", draft: "(생략)" });
      console.log(`memo ${i + 1}/${Math.min(limit, top.length)}: image-only, skipped`);
      continue;
    }
    const text = `${t.post.title.trim()}\n\n${t.post.body.trim()}`;
    const chart = await chartForPost(text, client, usage);
    const chartText = formatChart(chart);
    const meta = config.subreddits.find((s) => s.name.toLowerCase() === t.post.subreddit.toLowerCase());
    let memo: string;
    let draft: string;
    try {
      const m = await memoForPost(t.post, meta, chart, chartText, config.competitors, client, usage);
      memoWarnings += m.warnings.length;
      memo = formatMemo(m);
      try {
        const d = await draftForPost(t.post, m, chart, chartText, config.competitors, client, usage);
        if (d.status === "ok") draftWarnings += d.warnings.length;
        draft = formatDraft(d, meta);
      } catch (err) {
        draft = `초안 실패: ${(err as Error).message}`;
      }
    } catch (err) {
      memo = `메모 실패: ${(err as Error).message}`;
      draft = "(메모 실패로 초안 없음)";
    }
    notes.push({ memo, chart: chartText, draft });
    console.log(`memo ${i + 1}/${Math.min(limit, top.length)}: ${chart.status} chart, OpenAI ${usage.calls} calls so far`);
  }
}
const elapsedSec = Math.round((Date.now() - startedAt) / 1000);
const file = writeDigest(
  renderDigest({
    date: todayLocal(),
    generatedAt: new Date(),
    dryRun: args.dryRun,
    stats,
    requests: fetcher.made + shadowFetcher.made,
    transport: transportNote,
    elapsedSec,
    todayCount: today.count,
    cap: config.dailyRequestCap,
    totalNew: posts.length,
    top,
    competitors: competitorHits,
    shadow,
    notes,
    llm: args.dryRun ? undefined : { calls: usage.calls, costUsd: usage.costUsd },
  }),
  todayLocal(),
);
const now = new Date().toISOString();
for (const p of posts) seen[p.id] = now;
saveSeen(seen);
saveRequests(today);
console.log(`scored: ${ranked.length} posts > 0, top ${top.length} → ${file}`);
console.log(`excluded competitor-own: ${ranked.length - kept.length}, crossposts folded: ${folded}`);
console.log(`competitor mentions: ${competitorHits.length}`);
console.log(`done in ${Math.floor(elapsedSec / 60)}m ${elapsedSec % 60}s, requests ${fetcher.made + shadowFetcher.made} (today ${today.count}/${config.dailyRequestCap})`);
if (!args.dryRun) console.log(`LLM: ${usage.calls} calls, ${usage.promptTokens}+${usage.completionTokens} tokens, $${usage.costUsd.toFixed(4)} (memo model ${MEMO_MODEL}), memo warnings: ${memoWarnings}, draft warnings: ${draftWarnings}`);
