// Finds competitor name, alias and domain mentions in collected posts (score-independent).
import type { RedditPost } from "./collect.mts";
import type { Competitor } from "./config.mts";

export type CompetitorHit = { post: RedditPost; matched: string[] };

const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Literal term with alnum boundaries; inner whitespace flexes across spaces, hyphens and underscores.
function termRe(term: string): RegExp | null {
  if (!term.trim()) return null;
  const lit = escRe(term).replace(/\s+/g, "[\\s_-]+");
  return new RegExp(`(?<![A-Za-z0-9])${lit}(?![A-Za-z0-9])`, "i");
}

export function findCompetitorMentions(posts: RedditPost[], competitors: Competitor[]): CompetitorHit[] {
  const res = competitors.map((c) => ({
    name: c.name,
    res: [c.name, ...c.aliases, ...c.domains].map(termRe).filter((r): r is RegExp => r !== null),
  }));
  const out: CompetitorHit[] = [];
  for (const post of posts) {
    const texts = [post.title, post.body, post.url];
    const matched = res.filter(({ res }) => res.some((re) => texts.some((t) => re.test(t)))).map(({ name }) => name);
    if (matched.length > 0) out.push({ post, matched });
  }
  return out;
}
