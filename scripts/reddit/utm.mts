// UTM link for a Reddit post or comment. Prints one URL; never touches the network.
//   npm run reddit:utm -- --sub ChineseZodiac --medium comment --content dm-intro [--path /saju-calculator]
// Keys come from lib/eventSchema.ts so the web's event filter (cleanUtmValue) accepts every value.
import { pathToFileURL } from "node:url";
import { cleanUtmValue, UTM_KEYS } from "../../lib/eventSchema.ts";

const SITE = "https://www.fatesaidapp.com";
const MEDIUMS = ["post", "comment"] as const;

export type UtmArgs = { sub: string; medium: (typeof MEDIUMS)[number]; content: string; path: string };

// Lowercase, anything outside a-z0-9 becomes one hyphen, no hyphens at the ends.
export function slug(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function tag(name: string, raw: string | undefined): string {
  if (raw === undefined) throw new Error(`--${name} is required`);
  const v = slug(raw);
  if (cleanUtmValue(v) !== v) throw new Error(`--${name} "${raw}" is not a valid tag (a-z, 0-9, "-", up to 40 chars, no dates)`);
  return v;
}

export function parseArgs(argv: string[]): UtmArgs {
  const raw: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!["--sub", "--medium", "--content", "--path"].includes(a)) throw new Error(`unknown argument: ${a}`);
    const v = argv[++i];
    if (v === undefined || v.startsWith("--")) throw new Error(`${a} needs a value`);
    raw[a.slice(2)] = v;
  }
  const medium = raw.medium;
  if (!MEDIUMS.includes(medium as UtmArgs["medium"])) throw new Error(`--medium must be ${MEDIUMS.join(" or ")}, got "${medium ?? ""}"`);
  const path = raw.path ?? "/";
  if (!/^\/[a-z0-9/-]*$/.test(path) || path.includes("//")) throw new Error(`--path "${path}" must start with "/" and use a-z, 0-9, "-", "/" only`);
  return { sub: tag("sub", raw.sub), medium: medium as UtmArgs["medium"], content: tag("content", raw.content), path };
}

export function buildUtmUrl(a: UtmArgs): string {
  const values: Record<(typeof UTM_KEYS)[number], string> = {
    utm_source: "reddit",
    utm_medium: a.medium,
    utm_campaign: a.sub,
    utm_content: a.content,
  };
  const query = UTM_KEYS.map((k) => `${k}=${values[k]}`).join("&");
  return `${SITE}${a.path}?${query}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(buildUtmUrl(parseArgs(process.argv.slice(2))));
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }
}
