// Morning Reddit listening digest. Read-only: never posts, votes or logs in.
//   npm run reddit:digest -- [--dry-run] [--limit N] [--config path]
// --dry-run: collect and score only, no LLM calls. --limit N: memo only the top N posts (default config.topN).
import { ConfigError, loadConfig } from "./config.mts";
import { Fetcher } from "./fetch.mts";
import { collect } from "./collect.mts";
import { loadRequests, loadSeen, saveRequests, saveSeen, todayLocal } from "./state.mts";
import { rankPosts } from "./score.mts";
import { competitorOwner, findCompetitorMentions } from "./competitors.mts";
import { groupCrossposts } from "./dedupe.mts";
import { renderDigest, statNote, writeDigest } from "./render.mts";
import OpenAI from "openai";
import { chartForPost, emptyUsage, formatChart } from "./chart.mts";
import { formatMemo, memoForPost, MEMO_MODEL } from "./memo.mts";
import { checkShadow, shadowSummary } from "./shadow.mts";

export type DigestArgs = { dryRun: boolean; limit: number | null; configPath: string | undefined };

export function parseArgs(argv: string[]): DigestArgs {
  const args: DigestArgs = { dryRun: false, limit: null, configPath: undefined };
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
const fetcher = new Fetcher(config, today);
const { posts, stats } = await collect(config, fetcher, seen);
for (const s of stats) {
  if (s.failed) console.log(`${s.source}  FAILED: ${statNote(s)}`);
  else console.log(`${s.source}  fetched ${s.fetched}  new ${s.fresh}  (${statNote(s)})`);
}
console.log(`total new posts: ${posts.length}, failed sources: ${stats.filter((s) => s.failed).length}, requests: ${fetcher.made} (today ${today.count}/${config.dailyRequestCap})`);

// Logged-out shadow check runs in dry-run too: it is read-only and costs no LLM calls.
const shadow = shadowSummary(await checkShadow(config.account, fetcher));
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
let notes: { memo: string; chart: string }[] | undefined;
let memoWarnings = 0;
if (!args.dryRun) {
  const client = new OpenAI();
  notes = [];
  for (const [i, t] of top.slice(0, limit).entries()) {
    const text = `${t.post.title.trim()}\n\n${t.post.body.trim()}`;
    const chart = await chartForPost(text, client, usage);
    const chartText = formatChart(chart);
    let memo: string;
    try {
      const m = await memoForPost(t.post, config.subreddits.find((s) => s.name.toLowerCase() === t.post.subreddit.toLowerCase()), chart, chartText, config.competitors, client, usage);
      memoWarnings += m.warnings.length;
      memo = formatMemo(m);
    } catch (err) {
      memo = `메모 실패: ${(err as Error).message}`;
    }
    notes.push({ memo, chart: chartText });
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
    requests: fetcher.made,
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
console.log(`done in ${Math.floor(elapsedSec / 60)}m ${elapsedSec % 60}s, requests ${fetcher.made} (today ${today.count}/${config.dailyRequestCap})`);
if (!args.dryRun) console.log(`LLM: ${usage.calls} calls, ${usage.promptTokens}+${usage.completionTokens} tokens, $${usage.costUsd.toFixed(4)} (memo model ${MEMO_MODEL}), memo warnings: ${memoWarnings}`);
