// Finds competitor name, alias and domain mentions in collected posts (score-independent).
import type { RedditPost } from "./collect.mts";
import type { Competitor } from "./config.mts";

export type CompetitorHit = { post: RedditPost; matched: string[]; own: boolean };

const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Literal term with alnum boundaries; inner whitespace flexes across spaces, hyphens and underscores.
export function termRe(term: string): RegExp | null {
  if (!term.trim()) return null;
  const lit = escRe(term).replace(/\s+/g, "[\\s_-]+");
  return new RegExp(`(?<![A-Za-z0-9])${lit}(?![A-Za-z0-9])`, "i");
}

// Own post by the competitor itself (author account, official subreddit, or link to its domain).
// Body-only domain mentions don't count: a user asking about a competitor is someone to answer.
export function competitorOwner(post: RedditPost, competitors: Competitor[]): string | null {
  const author = post.author.trim().toLowerCase();
  const sub = post.subreddit.toLowerCase();
  for (const c of competitors) {
    if (author && c.accounts.some((a) => a.toLowerCase() === author)) return c.name;
    if (c.subreddits.some((s) => s.toLowerCase() === sub)) return c.name;
    if (c.domains.some((d) => termRe(d)?.test(post.url) ?? false)) return c.name;
  }
  return null;
}

export function findCompetitorMentions(posts: RedditPost[], competitors: Competitor[]): CompetitorHit[] {
  const res = competitors.map((c) => ({
    name: c.name,
    res: [c.name, ...c.aliases, ...c.domains].map(termRe).filter((r): r is RegExp => r !== null),
  }));
  const out: CompetitorHit[] = [];
  for (const post of posts) {
    const texts = [post.title, post.body, post.url];
    const hit = new Set(res.filter(({ res }) => res.some((re) => texts.some((t) => re.test(t)))).map(({ name }) => name));
    const owner = competitorOwner(post, competitors);
    if (owner) hit.add(owner);
    if (hit.size > 0) out.push({ post, matched: res.filter(({ name }) => hit.has(name)).map(({ name }) => name), own: owner !== null });
  }
  return out;
}
