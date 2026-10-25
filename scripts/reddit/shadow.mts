// Logged-out shadow check: is the account visible, and do its recent comments show up in their threads?
//   npx tsx scripts/reddit/shadow.mts [account] [--config path]
// Read-only, no cookies. Uses the shared Fetcher, so requests count toward the daily cap.
import { pathToFileURL } from "node:url";
import { ConfigError, loadConfig, type RedditConfig } from "./config.mts";
import { decodeEntities } from "./collect.mts";
import { Fetcher, type FetchOk, type FetchResult } from "./fetch.mts";
import { loadRequests, saveRequests } from "./state.mts";

const MAX_COMMENTS = 10;
const HOST = "https://www.reddit.com";

export type CommentRef = { id: string; permalink: string };
export type CommentCheck = CommentRef & { status: "visible" | "removed" | "missing" | "unknown"; note?: string };
export type ShadowResult = {
  account: string;
  status: "visible" | "missing" | "unknown";
  note?: string;
  comments: CommentCheck[];
};

const failNote = (r: Exclude<FetchResult, FetchOk>) => (r.reason === "http" ? `http ${r.status ?? "?"}` : r.reason);
const relPath = (url: string) => url.replace(/^https?:\/\/[^/]+/, "").replace(/\/?$/, "/");
const removedText = (s: string) => /^\s*\[(removed|deleted)\]\s*$/i.test(s);

// Comment listing from /user/<name>/comments, JSON or RSS. RSS comment ids are t1_<id>.
export function parseUserComments(res: FetchOk): CommentRef[] {
  const out: CommentRef[] = [];
  if (res.format === "json") {
    const children = (res.data as { data?: { children?: unknown[] } } | null)?.data?.children ?? [];
    for (const c of children) {
      const d = (c as { kind?: string; data?: Record<string, unknown> })?.data;
      if ((c as { kind?: string })?.kind !== "t1" || !d || typeof d.id !== "string" || typeof d.permalink !== "string") continue;
      out.push({ id: d.id, permalink: HOST + d.permalink });
    }
  } else {
    for (const entry of res.xml.match(/<entry[\s>][\s\S]*?<\/entry>/g) ?? []) {
      const id = entry.match(/<id>\s*t1_([^<\s]+)\s*<\/id>/)?.[1];
      const link = entry.match(/<link[^>]*href="([^"]+)"/)?.[1];
      if (id && link) out.push({ id, permalink: link.startsWith("http") ? link : HOST + link });
    }
  }
  return out.slice(0, MAX_COMMENTS);
}

type Found = { found: false } | { found: true; body: string; author: string };

function findInJson(data: unknown, id: string): Found {
  const stack: unknown[] = Array.isArray(data) ? [...data] : [data];
  while (stack.length) {
    const node = stack.pop() as { kind?: string; data?: Record<string, unknown> } | null;
    if (!node || typeof node !== "object") continue;
    const d = node.data;
    if (!d) continue;
    if (node.kind === "t1" && d.id === id) return { found: true, body: String(d.body ?? ""), author: String(d.author ?? "") };
    if (Array.isArray(d.children)) stack.push(...d.children);
    if (d.replies && typeof d.replies === "object") stack.push(d.replies);
  }
  return { found: false };
}

function findInRss(xml: string, id: string): Found {
  for (const entry of xml.match(/<entry[\s>][\s\S]*?<\/entry>/g) ?? []) {
    if (!new RegExp(`<id>\\s*t1_${id}\\s*</id>`).test(entry)) continue;
    const content = decodeEntities(decodeEntities(entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1] ?? "").replace(/<[^>]*>/g, "")).trim();
    const author = entry.match(/<author>[\s\S]*?<name>([^<]*)<\/name>/)?.[1]?.replace(/^\/u\//, "") ?? "";
    return { found: true, body: content, author };
  }
  return { found: false };
}

// The comment's own permalink page, read logged out. Hidden comments are missing or show [removed].
export function judgeComment(res: FetchOk, id: string): CommentCheck["status"] {
  const f = res.format === "json" ? findInJson(res.data, id) : findInRss(res.xml, id);
  if (!f.found) return "missing";
  return removedText(f.body) || f.author === "[deleted]" ? "removed" : "visible";
}

export async function checkShadow(account: string, fetcher: Fetcher): Promise<ShadowResult> {
  const list = await fetcher.get(`/user/${encodeURIComponent(account)}/comments.json?limit=${MAX_COMMENTS}&raw_json=1`);
  if (!list.ok) {
    // Logged out, a shadowbanned or deleted account's profile answers 404.
    if (list.status === 404) return { account, status: "missing", note: "404", comments: [] };
    return { account, status: "unknown", note: failNote(list), comments: [] };
  }
  const comments: CommentCheck[] = [];
  for (const ref of parseUserComments(list)) {
    const res = await fetcher.get(`${relPath(ref.permalink)}.json?raw_json=1`);
    comments.push(res.ok ? { ...ref, status: judgeComment(res, ref.id) } : { ...ref, status: "unknown", note: failNote(res) });
  }
  return { account, status: "visible", comments };
}

const LABEL: Record<CommentCheck["status"], string> = { visible: "보임", removed: "숨김([removed])", missing: "숨김(스레드에 없음)", unknown: "확인 실패" };

// Shape that render.mts takes as DigestInput.shadow.
export function shadowSummary(r: ShadowResult): { alert: string | null; lines: string[] } {
  if (r.status === "missing") {
    return { alert: `u/${r.account} 계정이 로그아웃 상태에서 안 보임(404). 섀도밴 의심, 답글 활동을 멈추고 확인할 것.`, lines: [`u/${r.account}: 계정 없음(404)`] };
  }
  if (r.status === "unknown") return { alert: null, lines: [`u/${r.account}: 확인 실패 (${r.note ?? "?"})`] };
  const hidden = r.comments.filter((c) => c.status === "removed" || c.status === "missing");
  const lines = [`u/${r.account}: 계정 보임, 최근 댓글 ${r.comments.length}개 중 숨김 ${hidden.length}개`];
  for (const c of r.comments) lines.push(`${LABEL[c.status]}${c.note ? ` (${c.note})` : ""} — ${c.permalink}`);
  return { alert: hidden.length ? `u/${r.account} 최근 댓글 ${hidden.length}개가 로그아웃 상태에서 안 보임.` : null, lines };
}

function parseCli(argv: string[]): { account?: string; configPath?: string } {
  const out: { account?: string; configPath?: string } = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--config") {
      out.configPath = argv[++i];
      if (!out.configPath) throw new Error("--config needs a path");
    } else if (argv[i].startsWith("--")) throw new Error(`unknown argument: ${argv[i]}`);
    else out.account = argv[i];
  }
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let cli: ReturnType<typeof parseCli>;
  let config: RedditConfig;
  try {
    cli = parseCli(process.argv.slice(2));
    config = loadConfig(cli.configPath);
  } catch (e) {
    if (!(e instanceof ConfigError) && !(e instanceof Error)) throw e;
    console.error(e.message);
    process.exit(1);
  }
  const today = loadRequests();
  const fetcher = new Fetcher(config, today);
  const result = await checkShadow(cli.account ?? config.account, fetcher);
  saveRequests(today);
  const summary = shadowSummary(result);
  if (summary.alert) console.log(`WARNING: ${summary.alert}`);
  for (const l of summary.lines) console.log(l);
  console.log(`requests: ${fetcher.made} (today ${today.count}/${config.dailyRequestCap})`);
}
