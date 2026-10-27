// Scores fresh Reddit posts for the morning digest: keyword relevance times subreddit, age and comment factors.
import type { RedditPost } from "./collect.mts";
import { postFingerprint } from "./dedupe.mts";
import type { PenaltyConfig, RedditConfig, ScoringAgeConfig, ScoringCommentsConfig } from "./config.mts";

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

// Long bodies hit QUESTION_RE by chance, so the article and spread penalties only trust the title.
const titleAsks = (title: string) => title.includes("?") || QUESTION_RE.test(title);

type PenaltyRes = { series: RegExp[]; promo: RegExp[] };
const penaltyCache = new WeakMap<PenaltyConfig, PenaltyRes>();
function penaltyRes(p: PenaltyConfig): PenaltyRes {
  let r = penaltyCache.get(p);
  if (!r) {
    r = { series: p.seriesTitlePatterns.map((x) => new RegExp(x, "i")), promo: p.promoPatterns.map((x) => new RegExp(x, "i")) };
    penaltyCache.set(p, r);
  }
  return r;
}

// Non-question posts: lecture series, long articles, promo wording, one author spread over many subreddits,
// and posts in Western-astrology subreddits with no saju keyword. Each hit multiplies the score.
function penalties(post: RedditPost, text: string, sc: RedditConfig["scoring"], ctx: { sajuContext: boolean; contextSub: boolean; spread: AuthorSpread }) {
  const p = sc.penalties;
  const res = penaltyRes(p);
  const reasons: string[] = [];
  let factor = 1;
  const asks = titleAsks(post.title);
  if (res.series.some((re) => re.test(post.title))) {
    factor *= p.seriesMultiplier;
    reasons.push(`연재 글 ×${p.seriesMultiplier}`);
  }
  if (!asks && post.body.length >= p.articleMinChars) {
    factor *= p.articleMultiplier;
    reasons.push(`긴 글·제목 질문 아님 ×${p.articleMultiplier}`);
  }
  const promo = res.promo.map((re) => text.match(re)?.[0]).find(Boolean);
  if (promo) {
    factor *= p.promoMultiplier;
    reasons.push(`홍보 문구 "${promo}" ×${p.promoMultiplier}`);
  }
  // Tailored text per subreddit is a blast even with a question title; one identical crosspost of a real question is not.
  if (ctx.spread.subs >= p.spreadMinSubreddits && (ctx.spread.texts >= 2 || !asks)) {
    factor *= p.spreadMultiplier;
    reasons.push(`같은 작성자 ${ctx.spread.subs}개 서브레딧 ×${p.spreadMultiplier}`);
  }
  if (ctx.contextSub && !ctx.sajuContext) {
    factor *= p.noContextMultiplier;
    reasons.push(`사주 문맥 없음 ×${p.noContextMultiplier}`);
  }
  return { factor, reasons };
}

function ageFactor(createdUtc: number, now: number, age: ScoringAgeConfig): number {
  if (!createdUtc) return age.unknown;
  const h = Math.max(0, (now - createdUtc * 1000) / 3600000);
  if (h <= age.fullHours) return 1.0;
  if (h >= age.fadeHours) return age.after;
  return 1 - ((h - age.fullHours) * (1 - age.fadeTo)) / (age.fadeHours - age.fullHours);
}

function ageShort(createdUtc: number, now: number): string {
  if (!createdUtc) return "시각 모름";
  const m = Math.floor(Math.max(0, now - createdUtc * 1000) / 60000);
  if (m < 60) return `${m}분`;
  const h = Math.floor(m / 60);
  return h < 48 ? `${h}시간` : `${Math.floor(h / 24)}일`;
}

function commentFactor(n: number | null, comments: ScoringCommentsConfig): number | null {
  if (n === null) return null;
  for (const b of comments.bands) if (n <= b.upTo) return b.factor;
  return comments.over;
}

// Distinct subreddits and distinct texts (dedupe fingerprints) one author posted in the same batch.
export type AuthorSpread = { subs: number; texts: number };

// spread is filled in by rankPosts; scoring a lone post assumes one subreddit.
export function scorePost(post: RedditPost, config: RedditConfig, now: number, spread: AuthorSpread = { subs: 1, texts: 1 }): Scored {
  const sc = config.scoring;
  const text = `${post.title}\n${post.body}`;
  const lower = text.toLowerCase();
  const reasons: string[] = [];
  let rel = 0;
  const sub = post.subreddit.toLowerCase();
  if (sc.penalties.ignoreSubreddits.some((n) => n.toLowerCase() === sub)) {
    return { post, score: 0, reasons: [`무시 서브레딧 r/${post.subreddit}`], birth: detectBirth(text) };
  }

  const watched = config.subreddits.find((s) => s.name.toLowerCase() === post.subreddit.toLowerCase());
  const matched = config.keywords.map(stripQuotes).filter((k) => k && hit(lower, k));
  const ctxSet = new Set(sc.contextKeywords.map((k) => stripQuotes(k).toLowerCase()));
  let recognized = matched;
  let rejected: string[] = [];
  if (!watched) {
    const normal = matched.filter((k) => !ctxSet.has(k.toLowerCase()));
    const ctx = matched.filter((k) => ctxSet.has(k.toLowerCase()));
    if (ctx.length > 0) {
      const ok = normal.length > 0 || sc.contextWords.some((w) => w && hit(lower, w));
      if (ok) recognized = matched;
      else {
        recognized = normal;
        rejected = ctx;
      }
    }
  }
  if (recognized.length > 0) {
    const pts = Math.min(recognized.length * sc.keywordPoints, sc.keywordMaxPoints);
    rel += pts;
    reasons.push(`키워드 ${recognized.join(", ")} +${pts}`);
  }
  for (const rej of rejected) reasons.push(`${rej} 문맥 없음(가산 없음)`);
  const auxHits = config.auxKeywords.map(stripQuotes).filter((k) => k && hit(lower, k));
  for (const aux of auxHits) {
    if (recognized.length > 0) {
      rel += sc.auxPoints;
      reasons.push(`${aux} +${sc.auxPoints}`);
    } else reasons.push(`${aux} 단독(가산 없음)`);
  }
  const birth = detectBirth(text);
  // Outside watched subreddits a post only arrives via keyword search, so no recognized keyword means noise.
  if (!watched && recognized.length === 0) return { post, score: 0, reasons, birth };
  if (birth.date) {
    rel += sc.birthDatePoints;
    reasons.push(`생년월일 +${sc.birthDatePoints}`);
  }
  if (birth.time) {
    rel += sc.birthTimePoints;
    reasons.push(`출생 시각 +${sc.birthTimePoints}`);
  }
  if (watched) {
    rel += sc.watchedPoints;
    reasons.push(`감시 서브레딧 +${sc.watchedPoints}`);
  }
  if (rel > 0 && (post.title.includes("?") || QUESTION_RE.test(text))) {
    rel += sc.questionPoints;
    reasons.push(`질문 +${sc.questionPoints}`);
  }
  if (rel === 0) return { post, score: 0, reasons, birth };

  const w = watched ? watched.weight : 1.0;
  reasons.push(watched ? `×${w.toFixed(1)} r/${post.subreddit}` : "×1.0");
  const age = ageFactor(post.createdUtc, now, sc.age);
  reasons.push(`${ageShort(post.createdUtc, now)} ×${age.toFixed(1)}`);
  const comments = commentFactor(post.numComments, sc.comments);
  if (comments === null) reasons.push("댓글 수 없음(RSS, 제외)");
  else reasons.push(`댓글 ${post.numComments} ×${comments.toFixed(1)}`);
  let profile = 1;
  if (post.subreddit.toLowerCase().startsWith("u_")) {
    profile = sc.profileMultiplier;
    reasons.push(`프로필 글 ×${sc.profileMultiplier}`);
  }

  const pen = penalties(post, text, sc, {
    sajuContext: recognized.length > 0 || auxHits.length > 0,
    contextSub: sc.penalties.contextSubreddits.some((n) => n.toLowerCase() === sub),
    spread,
  });
  reasons.push(...pen.reasons);

  const score = Math.round(rel * w * age * (comments ?? 1) * profile * pen.factor * 10) / 10;
  return { post, score, reasons, birth };
}

export function rankPosts(posts: RedditPost[], config: RedditConfig, now: number): Scored[] {
  const byAuthor = new Map<string, { subs: Set<string>; texts: Set<string> }>();
  for (const p of posts) {
    if (!p.author) continue;
    const a = p.author.toLowerCase();
    const e = byAuthor.get(a) ?? { subs: new Set<string>(), texts: new Set<string>() };
    e.subs.add(p.subreddit.toLowerCase());
    e.texts.add(postFingerprint(p));
    byAuthor.set(a, e);
  }
  const spreadOf = (p: RedditPost): AuthorSpread | undefined => {
    const e = p.author ? byAuthor.get(p.author.toLowerCase()) : undefined;
    return e && { subs: e.subs.size, texts: e.texts.size };
  };
  return posts
    .map((p) => scorePost(p, config, now, spreadOf(p)))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.post.createdUtc - a.post.createdUtc);
}
