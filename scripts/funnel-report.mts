// Read-only product-event report. IDs, free text and arbitrary props are never printed.
// Run: npx tsx --env-file=.env.local scripts/funnel-report.mts
import { pathToFileURL } from "node:url";

export interface FunnelEvent {
  created_at: string;
  anon_id: string;
  platform: string;
  dev: boolean;
  name: string;
  props?: Record<string, unknown> | null;
}
export interface UsageRow { created_at: string; session_id: string | null; cost_usd: number | string | null }
export interface SessionRow { created_at: string }

const DAY = 86_400_000;
const kstDay = (ms: number) => Math.floor((ms + 9 * 3_600_000) / DAY);
const COHORTS = [100, 200, 300];
const SURFACES = new Set(["report", "qa", "qa_person", "compat_report", "year_report", "fortune"]);
const PURCHASE_EVENTS = ["purchase_start", "purchase_success", "purchase_cancel", "purchase_error"];

// Normalize only known product families. Event props can be forged: never print an
// unrecognized product or surface verbatim, even if it passed the API's string rules.
function productFamily(value: unknown): string {
  if (typeof value !== "string") return "other_or_missing_product";
  const module = /^(?:report_module|com\.fatesaid\.app\.report\.module)([1-9]|1[0-2])$/.exec(value);
  if (module) return `report_module${module[1]}`;
  if (["report_bundle_all", "com.fatesaid.app.report.bundle_all"].includes(value)) return "report_bundle_all";
  if (["compat_report", "com.fatesaid.app.report.compat"].includes(value)) return "compat_report";
  const year = /^(?:year_report_|com\.fatesaid\.app\.report\.year_)(20\d{2})$/.exec(value);
  return year ? `year_report_${year[1]}` : "other_or_missing_product";
}

interface Device { id: string; first: number; days: Set<number>; events: FunnelEvent[] }

export function buildFunnelReport(
  events: FunnelEvent[], usage: UsageRow[] = [], sessions: SessionRow[] = [], now = Date.now(),
): string {
  const lines: string[] = [];
  // A device is a tester's if any of its events is dev-built or carries the tester mark
  // (hidden Settings switch / ?tester=1) — its earlier, unmarked events go with it.
  const devIds = new Set(events.filter((e) => e.dev).map((e) => e.anon_id));
  const testerIds = new Set(events.filter((e) => e.props?.tester === true).map((e) => e.anon_id));
  const devices = new Map<string, Device>();
  const testers = new Map<string, Device>();
  for (const e of events) {
    const time = Date.parse(e.created_at);
    if (devIds.has(e.anon_id) || !e.anon_id || !["ios", "android"].includes(e.platform) || !Number.isFinite(time) || time > now) continue;
    const into = testerIds.has(e.anon_id) ? testers : devices;
    const device = into.get(e.anon_id) ?? { id: e.anon_id, first: time, days: new Set<number>(), events: [] };
    device.first = Math.min(device.first, time);
    device.days.add(kstDay(time));
    device.events.push(e);
    into.set(e.anon_id, device);
  }
  const byFirst = (a: Device, b: Device) => a.first - b.first || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const ordered = [...devices.values()].sort(byFirst);
  const testerDevices = [...testers.values()].sort(byFirst);
  const count = (group: Device[], predicate: (event: FunnelEvent) => boolean) => group.filter((d) => d.events.some(predicate)).length;
  const ratio = (n: number, d: number) => d ? `${n}/${d}` : "- (0 eligible devices)";
  const milestone = (group: Device[], name: string) => count(group, (e) => e.name === name);

  lines.push(`native anonymous devices observed: ${ordered.length} (tester-marked, reported separately: ${testerDevices.length})`);
  lines.push("Device != person or verified install. dev-built and tester-marked IDs are excluded from every section except the tester one; unmarked production-build test devices may remain.");
  lines.push("Rows below are independent milestones (unique devices), not an ordered conversion funnel.");
  lines.push("Purchase events are client signals, not verified charges, revenue, net profit or independent paying customers.");
  lines.push("Product families merge known iOS/Android SKUs; subscription/unrecognized/missing SKUs stay in other_or_missing_product.");

  function section(title: string, group: Device[]) {
    lines.push(`\n== ${title} ==`, `observed devices: ${group.length}`);
    for (const name of ["onboarding_complete", "type_reveal_view", "chat_start", "chat_complete", "report_generate", "paywall_view", "purchase_start"]) {
      lines.push(`${name}: ${ratio(milestone(group, name), group.length)}`);
    }
    for (const [label, predicate] of [
      ["purchase_success kind=paid (unverified)", (e: FunnelEvent) => e.name === "purchase_success" && e.props?.kind === "paid"],
      ["purchase_success kind=trial (not a charge)", (e: FunnelEvent) => e.name === "purchase_success" && e.props?.kind === "trial"],
      ["purchase_success kind=unknown", (e: FunnelEvent) => e.name === "purchase_success" && !["paid", "trial"].includes(String(e.props?.kind))],
      ["purchase_cancel", (e: FunnelEvent) => e.name === "purchase_cancel"],
      ["purchase_error", (e: FunnelEvent) => e.name === "purchase_error"],
    ] as const) lines.push(`${label}: ${ratio(count(group, predicate), group.length)}`);

    // A return day must have ended in KST before it enters the denominator.
    // Otherwise today's not-yet-returned devices would be counted as churned.
    for (const day of [1, 7]) {
      const eligible = group.filter((d) => kstDay(now) > kstDay(d.first) + day);
      lines.push(`D${day} retained (completed KST days, any event): ${ratio(eligible.filter((d) => d.days.has(kstDay(d.first) + day)).length, eligible.length)}`);
    }

    const surfaces = new Set<string>();
    const products = new Set<string>();
    for (const d of group) for (const e of d.events) {
      if (e.name === "paywall_view") surfaces.add(SURFACES.has(String(e.props?.surface)) ? String(e.props?.surface) : "other_or_missing_surface");
      if (PURCHASE_EVENTS.includes(e.name)) products.add(productFamily(e.props?.product));
    }
    for (const surface of [...surfaces].sort()) {
      lines.push(`paywall surface=${surface}: ${ratio(count(group, (e) => e.name === "paywall_view" && (SURFACES.has(String(e.props?.surface)) ? String(e.props?.surface) : "other_or_missing_surface") === surface), group.length)}`);
    }
    for (const product of [...products].sort()) {
      const has = (name: string, kind?: string) => count(group, (e) => e.name === name && productFamily(e.props?.product) === product &&
        (kind === undefined || (kind === "unknown" ? !["paid", "trial"].includes(String(e.props?.kind)) : e.props?.kind === kind)));
      lines.push(`product=${product}: start=${has("purchase_start")}, paid_signal=${has("purchase_success", "paid")}, trial_signal=${has("purchase_success", "trial")}, unknown_success=${has("purchase_success", "unknown")}, cancel=${has("purchase_cancel")}, error=${has("purchase_error")} (unique devices per milestone; categories may overlap)`);
    }

    if (group.length) {
      const start = group[0].first;
      const inWindow = (iso: string) => { const t = Date.parse(iso); return t >= start && t <= now; };
      const rows = usage.filter((u) => inWindow(u.created_at));
      const priced = rows.filter((u) => u.cost_usd !== null && Number.isFinite(Number(u.cost_usd)) && Number(u.cost_usd) >= 0);
      const cost = priced.reduce((sum, u) => sum + Number(u.cost_usd), 0);
      const sessionCount = sessions.filter((s) => inWindow(s.created_at)).length;
      lines.push(`AI window cost (not cohort-attributed; includes web/test/other devices): $${cost.toFixed(3)} known, ${rows.length - priced.length} unpriced rows; ${sessionCount} sessions`);
      lines.push(`AI window rows with no session attribution (included above): ${rows.filter((u) => !u.session_id).length}`);
      lines.push(`AI window cost/session (rough, not customer margin): ${sessionCount ? `$${(cost / sessionCount).toFixed(3)}` : "-"}`);
    }
  }

  section("all observed native devices", ordered);
  const firstRecentDay = kstDay(now) - 6;
  lines.push("\nRecent cohort = first observed on one of the last 7 KST calendar dates, including today's partial day; lifetime milestones through now.");
  section("first seen in last 7 KST calendar dates", ordered.filter((d) => kstDay(d.first) >= firstRecentDay));
  for (const size of COHORTS) {
    if (ordered.length < size) lines.push(`\n== first ${size} installs: sample too small (${ordered.length}/${size}) ==`);
    else section(`first ${size} observed native devices (legacy install cohort)`, ordered.slice(0, size));
  }
  lines.push("\nTester devices = hidden Settings switch or ?tester=1; use this to check that a build records each milestone, not as user data.");
  section("tester-marked native devices (excluded above)", testerDevices);
  lines.push("\nReconcile paid/trial signals, test purchases, refunds and renewals with RevenueCat/store records. Verified charges are not available in this report.");
  return lines.join("\n");
}

async function main() {
  // Import only when executing the CLI: unit tests need neither secrets nor network.
  const { getSupabaseAdmin } = await import("../lib/supabase.ts");
  const sb = getSupabaseAdmin();
  async function fetchAll(table: string, columns: string): Promise<unknown[]> {
    const rows: unknown[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await sb.from(table).select(columns).order("created_at").order("id").range(from, from + 999);
      if (error) throw error;
      rows.push(...(data ?? []));
      if (!data || data.length < 1000) return rows;
    }
  }
  const [events, usage, sessions] = await Promise.all([
    fetchAll("events", "id,created_at,anon_id,platform,dev,name,props"),
    fetchAll("llm_usage_log", "id,session_id,cost_usd,created_at"),
    fetchAll("sessions", "id,created_at"),
  ]);
  console.log(buildFunnelReport(events as FunnelEvent[], usage as UsageRow[], sessions as SessionRow[]));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => {
    console.error("Funnel report failed. Check database access/configuration; no customer records were printed.");
    process.exitCode = 1;
  });
}
