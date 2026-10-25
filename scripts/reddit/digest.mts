// Morning Reddit listening digest. Read-only: never posts, votes or logs in.
//   npm run reddit:digest -- [--dry-run] [--limit N] [--config path]
// --dry-run: collect and score only, no LLM calls. --limit N: memo only the top N posts (default config.topN).
import { ConfigError, loadConfig } from "./config.mts";
import { Fetcher } from "./fetch.mts";
import { collect } from "./collect.mts";
import { loadRequests, loadSeen, saveRequests, saveSeen } from "./state.mts";

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

const failLabel = (f: { reason: string; status?: number }) => (f.reason === "http" ? `http ${f.status ?? "?"}` : f.reason);

const seen = loadSeen();
const today = loadRequests();
const { posts, stats, requests } = await collect(config, new Fetcher(config, today), seen);
for (const s of stats) {
  if (s.failed) console.log(`${s.source}  FAILED (${failLabel(s.failed)})`);
  else console.log(`${s.source}  fetched ${s.fetched}  new ${s.fresh}${s.format === "rss" ? " (rss)" : ""}`);
}
console.log(`total new posts: ${posts.length}, failed sources: ${stats.filter((s) => s.failed).length}, requests: ${requests} (today ${today.count}/${config.dailyRequestCap})`);
const now = new Date().toISOString();
for (const p of posts) seen[p.id] = now;
saveSeen(seen);
saveRequests(today);
