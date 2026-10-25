// Morning Reddit listening digest. Read-only: never posts, votes or logs in.
//   npm run reddit:digest -- [--dry-run] [--limit N] [--config path]
// --dry-run: collect and score only, no LLM calls. --limit N: memo only the top N posts (default config.topN).
import { ConfigError, loadConfig } from "./config.mts";

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
