// SEO baseline check (web SEO TODO 1). OpenAI/DB not used.
//   npx tsx scripts/check-seo.mts [baseUrl=http://localhost:3000]
// Run against a production build (`npm run build && npx next start`); dev mode sends no-store on everything.
// Fetches /sitemap.xml and, for every listed URL, checks: 200, <title>, meta description, canonical (self),
// <html lang>, hreflang reciprocity (page tags == sitemap alternates, each alternate links back),
// JSON-LD parses and has @context/@type, and Cache-Control (reported as a warning, not a failure, until TODO 3).
// Also checks the old-style ?lang= redirect once TODO 2 lands (reported as a warning until then).
// Exit code 1 if any FAIL. WARN lines are known gaps tracked in TODO.md.
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const ORIGIN = "https://www.fatesaidapp.com";

const local = (u: string) => (u.startsWith(ORIGIN) ? BASE + u.slice(ORIGIN.length) : u);
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

let fails = 0;
const warns = new Map<string, string[]>();
const fail = (msg: string) => { fails++; console.log("FAIL " + msg); };
const warn = (kind: string, url: string) => {
  if (!warns.has(kind)) warns.set(kind, []);
  warns.get(kind)!.push(url);
};

type Entry = { loc: string; alternates: Map<string, string> };

function parseSitemap(xml: string): Entry[] {
  const out: Entry[] = [];
  for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const body = block[1];
    const loc = decode(body.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "");
    const alternates = new Map<string, string>();
    for (const tag of body.matchAll(/<xhtml:link\b[^>]*>/g)) {
      const hreflang = tag[0].match(/hreflang="([^"]+)"/)?.[1];
      const href = tag[0].match(/href="([^"]+)"/)?.[1];
      if (hreflang && href) alternates.set(hreflang, decode(href));
    }
    out.push({ loc, alternates });
  }
  return out;
}

function attr(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

const sitemapRes = await fetch(`${BASE}/sitemap.xml`);
if (sitemapRes.status !== 200) { console.log(`FAIL sitemap.xml ${sitemapRes.status}`); process.exit(1); }
const entries = parseSitemap(await sitemapRes.text());
console.log(`sitemap: ${entries.length} URLs`);
const inSitemap = new Set(entries.map((e) => e.loc));
const pageTitles = new Map<string, string>();
const pageDescs = new Map<string, string>();

for (const entry of entries) {
  const { loc } = entry;
  const res = await fetch(local(loc), { redirect: "manual" });
  if (res.status !== 200) { fail(`${res.status} ${loc}`); continue; }
  const html = await res.text();

  // cache
  const cc = res.headers.get("cache-control") ?? "";
  if (/no-store|private/.test(cc) || !cc) warn(`cache-control not cacheable (${cc || "none"})`, loc);

  // title / description
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  if (!title) fail(`no <title> ${loc}`);
  else if (pageTitles.has(title)) fail(`duplicate title "${title}" ${loc} == ${pageTitles.get(title)}`);
  else pageTitles.set(title, loc);
  const descTag = html.match(/<meta\b[^>]*name="description"[^>]*>/)?.[0];
  const desc = decode(descTag ? attr(descTag, "content") ?? "" : "");
  if (!desc) fail(`no meta description ${loc}`);
  else if (pageDescs.has(desc)) warn("duplicate meta description", `${loc} == ${pageDescs.get(desc)}`);
  else pageDescs.set(desc, loc);

  // canonical must point to the page itself (as listed in the sitemap)
  const canonTag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
  const canonical = decode(canonTag ? attr(canonTag, "href") ?? "" : "");
  if (!canonical) fail(`no canonical ${loc}`);
  else if (canonical !== loc) fail(`canonical ${canonical} != sitemap loc ${loc}`);

  // <html lang> vs the language this URL claims in the sitemap's own alternates
  const htmlLang = html.match(/<html\b[^>]*\blang="([^"]*)"/)?.[1];
  const selfLang = [...entry.alternates].find(([k, v]) => k !== "x-default" && v === loc)?.[0];
  if (selfLang && htmlLang !== selfLang) fail(`<html lang="${htmlLang}"> but sitemap says ${selfLang} ${loc}`);

  // hreflang: page tags must equal the sitemap alternates
  const pageAlts = new Map<string, string>();
  for (const tag of html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/g)) {
    const hl = attr(tag[0], "hrefLang") ?? attr(tag[0], "hreflang");
    const href = attr(tag[0], "href");
    if (hl && href) pageAlts.set(hl, decode(href));
  }
  if (entry.alternates.size > 0) {
    if (pageAlts.size === 0) fail(`no hreflang tags on page (sitemap has ${entry.alternates.size}) ${loc}`);
    for (const [hl, href] of entry.alternates) {
      if (pageAlts.size > 0 && pageAlts.get(hl) !== href) fail(`hreflang ${hl}: page=${pageAlts.get(hl) ?? "missing"} sitemap=${href} ${loc}`);
      if (!inSitemap.has(href)) fail(`alternate ${hl} ${href} is not itself in the sitemap (from ${loc})`);
    }
  }

  // JSON-LD
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) warn("no JSON-LD", loc);
  for (const b of blocks) {
    try {
      const data = JSON.parse(b[1]);
      const nodes: any[] = Array.isArray(data) ? data : data["@graph"] ?? [data];
      for (const n of nodes) {
        if (!n["@type"]) fail(`JSON-LD node without @type ${loc}`);
      }
      if (!data["@context"] && !Array.isArray(data)) fail(`JSON-LD without @context ${loc}`);
    } catch (e) {
      fail(`JSON-LD does not parse ${loc}: ${(e as Error).message}`);
    }
  }
}

// hreflang reciprocity across sitemap entries: if A lists B as alternate, B must list A back.
for (const entry of entries) {
  for (const [hl, href] of entry.alternates) {
    if (hl === "x-default") continue;
    const other = entries.find((e) => e.loc === href);
    if (!other) continue;
    const back = [...other.alternates].some(([k, v]) => k !== "x-default" && v === entry.loc);
    if (!back) fail(`hreflang not reciprocal: ${entry.loc} -> ${href}`);
  }
}

// ?lang= redirect (target of TODO 2): old query URLs should 308 to a path
const legacy = await fetch(`${BASE}/day-master/oak?lang=es`, { redirect: "manual" });
if (legacy.status !== 308) warn(`legacy ?lang=es is ${legacy.status}, expected 308 once TODO 2 lands`, "/day-master/oak?lang=es");

// robots
const robots = await (await fetch(`${BASE}/robots.txt`)).text();
if (!/Sitemap:\s*https:\/\/www\.fatesaidapp\.com\/sitemap\.xml/i.test(robots)) fail("robots.txt missing Sitemap line");

console.log("");
for (const [kind, urls] of warns) {
  console.log(`WARN ${kind}: ${urls.length}`);
  for (const u of urls.slice(0, 3)) console.log(`       ${u}`);
  if (urls.length > 3) console.log(`       ... +${urls.length - 3} more`);
}
console.log(`\n${entries.length} URLs checked, ${fails} FAIL, ${[...warns.values()].reduce((a, b) => a + b.length, 0)} WARN`);
process.exit(fails ? 1 : 0);
