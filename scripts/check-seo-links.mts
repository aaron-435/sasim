// SEO link crawl (SPEC C, TODO 16). Usage: npx tsx scripts/check-seo-links.mts [baseUrl=http://localhost:3000]
// Fetches /sitemap.xml, checks every URL is 200, the 30 articles (10 types x 3 langs) are listed,
// article <title>s are unique, canonical points to itself, and internal links on those pages don't 404.
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const ORIGIN = "https://www.fatesaidapp.com";
const SLUGS = ["oak", "vine", "sun", "flame", "mountain", "field", "steel", "gem", "ocean", "dew"];
const LANGS = ["en", "ko", "es"];

const local = (u: string) => (u.startsWith(ORIGIN) ? BASE + u.slice(ORIGIN.length) : u);
const decode = (s: string) => s.replace(/&amp;/g, "&");
let bad = 0;
const fail = (msg: string) => { bad++; console.log("BAD " + msg); };

const status = new Map<string, number>();
async function get(url: string) {
  const res = await fetch(url, { redirect: "manual" });
  status.set(url, res.status);
  return res;
}

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
console.log(`sitemap: ${locs.length} URLs`);

for (const slug of SLUGS) for (const l of LANGS) {
  const want = `${ORIGIN}/day-master/${slug}${l === "en" ? "" : `?lang=${l}`}`;
  if (!locs.includes(want)) fail(`sitemap missing ${want}`);
}

const titles = new Map<string, string>();
const linkSources = new Map<string, string>();
for (const loc of locs) {
  const url = local(loc);
  const res = await get(url);
  if (res.status !== 200) { fail(`${res.status} ${loc}`); continue; }
  const html = await res.text();
  if (!/\/day-master\/[a-z]+/.test(loc)) continue;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const canonical = decode(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "");
  if (!title) fail(`no title ${loc}`);
  else if (titles.has(title)) fail(`duplicate title "${title}" ${loc} vs ${titles.get(title)}`);
  else titles.set(title, loc);
  if (canonical !== loc) fail(`canonical ${canonical} != ${loc}`);
  if (!html.includes("application/ld+json")) fail(`no JSON-LD ${loc}`);
  for (const m of html.matchAll(/<a [^>]*href="([^"#]+)"/g)) {
    const href = decode(m[1]);
    if (href.startsWith("/") || href.startsWith(ORIGIN) || href.startsWith(BASE)) {
      const abs = href.startsWith("/") ? BASE + href : local(href);
      if (!linkSources.has(abs)) linkSources.set(abs, loc);
    }
  }
}

let checked = 0;
for (const [abs, from] of linkSources) {
  if (!status.has(abs)) {
    const res = await get(abs);
    checked++;
    if (res.status >= 400) fail(`link ${res.status} ${abs} (from ${from})`);
  } else if (status.get(abs)! >= 400) fail(`link ${status.get(abs)} ${abs} (from ${from})`);
}
console.log(`articles with titles: ${titles.size}, internal links: ${linkSources.size} (${checked} fetched extra)`);
console.log(bad ? `FAILED: ${bad}` : "ALL OK");
process.exit(bad ? 1 : 0);
