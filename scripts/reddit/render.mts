// Renders the morning digest markdown and writes it under marketing/reddit/digest/.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import type { SourceStat } from "./collect.mts";
import type { CompetitorHit } from "./competitors.mts";
import type { TopPost } from "./dedupe.mts";

export const DEFAULT_DIGEST_DIR = fileURLToPath(new URL("../../marketing/reddit/digest/", import.meta.url));

export type DigestInput = {
  date: string;
  generatedAt: Date;
  dryRun: boolean;
  stats: SourceStat[];
  requests: number;
  elapsedSec?: number;
  todayCount: number;
  cap: number;
  totalNew: number;
  top: TopPost[];
  competitors?: CompetitorHit[];
  shadow?: { alert: string | null; lines: string[] };
  // Full mode: memo and chart markdown per top post, same order as top. Missing = beyond --limit.
  notes?: { memo: string; chart: string }[];
  llm?: { calls: number; costUsd: number };
};

const pad2 = (n: number) => String(n).padStart(2, "0");
const esc = (s: string) => s.replace(/\r?\n/g, " ").replace(/([[\]|`])/g, "\\$1").replace(/^#/, "\\#");

function ageLabel(createdUtc: number, at: Date): string {
  if (!createdUtc) return "시각 모름";
  const m = Math.floor(Math.max(0, at.getTime() - createdUtc * 1000) / 60000);
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  return h < 48 ? `${h}시간 전` : `${Math.floor(h / 24)}일 전`;
}

export const statNote = (s: SourceStat): string => {
  if (s.failed) {
    const why = s.failed.reason === "http" ? `http ${s.failed.status ?? "?"}` : s.failed.reason;
    return [`실패 (${why})`, ...(s.round > 0 ? [`재시도 ${s.round}회 후`] : []), ...(s.note ? [s.note] : [])].join(", ");
  }
  return [s.format ?? "", ...(s.round > 0 ? [`재시도 ${s.round}회차 성공`] : [])].filter(Boolean).join(", ");
};

function snippet(body: string): string {
  const flat = body.replace(/\s+/g, " ").trim();
  if (!flat) return "(본문 없음)";
  return esc(flat.length > 200 ? flat.slice(0, 200) + "…" : flat);
}

// One-line text stays inline; multi-line markdown goes under the label, indented one level.
function slot(label: string, text: string): string[] {
  if (!text.includes("\n")) return [`- ${label}: ${text.replace(/^- /, "")}`];
  return [`- ${label}:`, ...text.split("\n").map((l) => `  ${l}`)];
}

function topBlock(s: TopPost, i: number, dryRun: boolean, at: Date, note: { memo: string; chart: string } | undefined): string[] {
  const p = s.post;
  const comments = p.numComments === null ? "댓글 알 수 없음" : `댓글 ${p.numComments}`;
  return [
    `### ${i + 1}. ${esc(p.title.trim()) || "(제목 없음)"}`,
    `- r/${p.subreddit} · ${ageLabel(p.createdUtc, at)} · ${comments} · 작성자 ${p.author ? `u/${p.author}` : "모름"}`,
    `- 링크: ${p.permalink}`,
    ...(s.crossposts.length > 0 ? [`- 같은 글: ${s.crossposts.map((c) => `r/${c.subreddit}`).join(", ")}`] : []),
    `- 점수 ${s.score.toFixed(1)} — ${s.reasons.join(" · ")}`,
    `- 본문: > ${snippet(p.body)}`,
    ...slot("사주", dryRun ? "(dry-run)" : note?.chart ?? "(--limit 밖)"),
    ...slot("메모", dryRun ? "(dry-run)" : note?.memo ?? "(--limit 밖)"),
  ];
}

const llmCost = (l: DigestInput["llm"]) => (l ? `$${Number.isNaN(l.costUsd) ? "? (단가 없는 모델)" : l.costUsd.toFixed(4)} (OpenAI ${l.calls}회)` : "(미연결)");

function sectionList(items: string[] | undefined): string[] {
  if (items === undefined) return ["(아직 연결 안 됨)"];
  return items.length === 0 ? ["없음"] : items;
}

export function renderDigest(d: DigestInput): string {
  const hhmm = `${pad2(d.generatedAt.getHours())}:${pad2(d.generatedAt.getMinutes())}`;
  const out: string[] = [
    `# 레딧 요약 ${d.date}`,
    ...(d.shadow?.alert ? [`> ⚠️ ${d.shadow.alert}`] : []),
    "",
    `> 모드: ${d.dryRun ? "dry-run" : "full"} · LLM 비용: ${d.dryRun ? "$0 (dry-run)" : llmCost(d.llm)} · 요청 ${d.requests} (오늘 ${d.todayCount}/${d.cap}) · 새 글 ${d.totalNew}${d.elapsedSec === undefined ? "" : ` · 실행 ${Math.floor(d.elapsedSec / 60)}분 ${d.elapsedSec % 60}초`} · 생성 ${hhmm}`,
    "",
    "## 1. 수집 통계",
    "| 출처 | 가져옴 | 새 글 | 비고 |",
    "|---|---|---|---|",
    ...d.stats.map((s) => `| ${esc(s.source)} | ${s.fetched} | ${s.fresh} | ${esc(statNote(s))} |`),
    "",
    `## 2. 상위 글 (${d.top.length})`,
    ...(d.top.length === 0 ? ["새 글 중 점수 있는 글 없음"] : d.top.flatMap((s, i) => [...(i > 0 ? [""] : []), ...topBlock(s, i, d.dryRun, d.generatedAt, d.notes?.[i])])),
    "",
    "## 3. 경쟁사 언급",
    ...sectionList(d.competitors?.map((h) => `- [r/${h.post.subreddit}] ${esc(h.post.title.trim()) || "(제목 없음)"} — ${h.matched.join(", ")}${h.own ? " (자사 글)" : ""} — ${h.post.permalink}`)),
    "",
    "## 4. 섀도 필터 점검",
    ...sectionList(d.shadow?.lines.map((l) => `- ${l}`)),
  ];
  return out.join("\n") + "\n";
}

export function writeDigest(markdown: string, date: string, dir = DEFAULT_DIGEST_DIR): string {
  mkdirSync(dir, { recursive: true });
  let name = `${date}.md`;
  for (let n = 2; existsSync(join(dir, name)); n++) name = `${date}-${n}.md`;
  const path = join(dir, name);
  writeFileSync(path, markdown);
  return path;
}
