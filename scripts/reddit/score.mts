// Scores fresh Reddit posts for the morning digest: keyword relevance times subreddit, age and comment factors.
import type { RedditPost } from "./collect.mts";
import type { RedditConfig } from "./config.mts";

export type Scored = { post: RedditPost; score: number; reasons: string[]; birth: { date: boolean; time: boolean } };

const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isAscii = (s: string) => /^[\x00-\x7f]*$/.test(s);

// ASCII keywords match on word boundaries (spaces flex), non-ASCII ones match as substrings.
function hit(textLower: string, kw: string): boolean {
  const k = kw.toLowerCase();
  if (!k) return false;
  if (!isAscii(k)) return textLower.includes(k);
  return new RegExp(`\\b${escRe(k).replace(/\s+/g, "\\s+")}\\b`).test(textLower);
}

const stripQuotes = (k: string) => k.replace(/"/g, "").trim();

const MONTHS = [
  "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december",
  "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "sept", "oct", "nov", "dec",
].join("|");
const ORD = "(?:st|nd|rd|th)?";
const inYear = (y: string) => { const n = Number(y); return Number.isInteger(n) && n >= 1900 && n <= 2030; };

function anyYear(re: RegExp, t: string, gi: number): boolean {
  for (const m of t.matchAll(re)) if (inYear(m[gi])) return true;
  return false;
}

const DATE_RES: Array<{ re: RegExp; gi: number }> = [
  { re: /\b(\d{4})-(\d{1,2})-(\d{1,2})\b/g, gi: 1 }, // 1990-05-12
  { re: /\b(\d{4})\/(\d{1,2})\/(\d{1,2})\b/g, gi: 1 }, // 1990/5/12
  { re: /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g, gi: 3 }, // 05/12/1990
  { re: /\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/g, gi: 3 }, // 12.05.1990
  { re: new RegExp(`\\b(${MONTHS})\\s+(\\d{1,2})${ORD},?\\s+(\\d{4})\\b`, "gi"), gi: 3 }, // May 12, 1990 / May 12th 1990
  { re: new RegExp(`\\b(\\d{1,2})${ORD}\\s+(${MONTHS})\\s+(\\d{4})\\b`, "gi"), gi: 3 }, // 12 May 1990
  { re: /(\d{4})\s*년\s*(\d{1,2})\s*월\s*(\d{1,2})\s*일/g, gi: 1 }, // 1990년 5월 12일
];

const TIME_RES = [
  /\b\d{1,2}:\d{2}\b/, // 14:30
  /\b\d{1,2}\s*(?:am|pm)\b/i, // 2:30 pm, 2pm, 2 am
  /(?:오전|오후|새벽|아침|저녁|밤)\s*\d{1,2}\s*시/, // 오전 3시
];

export function detectBirth(text: string): { date: boolean; time: boolean } {
  return {
    date: DATE_RES.some(({ re, gi }) => anyYear(re, text, gi)),
    time: TIME_RES.some((re) => re.test(text)),
  };
}

const QUESTION_RE = /help|read\s+my|interpret|anyone|what\s+does|meaning/i;

function ageFactor(createdUtc: number, now: number): number {
  if (!createdUtc) return 0.5;
  const h = Math.max(0, (now - createdUtc * 1000) / 3600000);
  if (h <= 24) return 1.0;
  if (h >= 168) return 0.2;
  return 1 - ((h - 24) * 0.7) / 144;
}

function ageShort(createdUtc: number, now: number): string {
  if (!createdUtc) return "시각 모름";
  const m = Math.floor(Math.max(0, now - createdUtc * 1000) / 60000);
  if (m < 60) return `${m}분`;
  const h = Math.floor(m / 60);
  return h < 48 ? `${h}시간` : `${Math.floor(h / 24)}일`;
}

function commentFactor(n: number | null): number | null {
  if (n === null) return null;
  if (n <= 0) return 1.3;
  if (n <= 3) return 1.1;
  if (n <= 10) return 1.0;
  return 0.7;
}

export function scorePost(post: RedditPost, config: RedditConfig, now: number): Scored {
  const text = `${post.title}\n${post.body}`;
  const lower = text.toLowerCase();
  const reasons: string[] = [];
  let rel = 0;

  const matched = config.keywords.map(stripQuotes).filter((k) => k && hit(lower, k));
  if (matched.length > 0) {
    const pts = Math.min(matched.length * 3, 6);
    rel += pts;
    reasons.push(`키워드 ${matched.join(", ")} +${pts}`);
  }
  for (const aux of config.auxKeywords.map(stripQuotes).filter((k) => k && hit(lower, k))) {
    if (matched.length > 0) {
      rel += 1;
      reasons.push(`${aux} +1`);
    } else reasons.push(`${aux} 단독(가산 없음)`);
  }
  const birth = detectBirth(text);
  if (birth.date) {
    rel += 3;
    reasons.push("생년월일 +3");
  }
  if (birth.time) {
    rel += 1;
    reasons.push("출생 시각 +1");
  }
  const watched = config.subreddits.find((s) => s.name.toLowerCase() === post.subreddit.toLowerCase());
  if (watched) {
    rel += 2;
    reasons.push("감시 서브레딧 +2");
  }
  if (rel > 0 && (post.title.includes("?") || QUESTION_RE.test(text))) {
    rel += 1;
    reasons.push("질문 +1");
  }
  if (rel === 0) return { post, score: 0, reasons, birth };

  const w = watched ? watched.weight : 1.0;
  reasons.push(watched ? `×${w.toFixed(1)} r/${post.subreddit}` : "×1.0");
  const age = ageFactor(post.createdUtc, now);
  reasons.push(`${ageShort(post.createdUtc, now)} ×${age.toFixed(1)}`);
  const comments = commentFactor(post.numComments);
  if (comments === null) reasons.push("댓글 수 없음(RSS, 제외)");
  else reasons.push(`댓글 ${post.numComments} ×${comments.toFixed(1)}`);

  const score = Math.round(rel * w * age * (comments ?? 1) * 10) / 10;
  return { post, score, reasons, birth };
}

export function rankPosts(posts: RedditPost[], config: RedditConfig, now: number): Scored[] {
  return posts
    .map((p) => scorePost(p, config, now))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.post.createdUtc - a.post.createdUtc);
}
