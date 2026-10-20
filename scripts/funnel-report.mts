// Funnel report over the first 100/200/300 install cohorts. Read-only; prints aggregates only
// (no anon ids, session ids or props values).
//   npx tsx --env-file=.env.local scripts/funnel-report.mts
// Install = first event of an anon_id on ios/android (no store install count in the DB).
// Anons that ever sent a dev=true event are excluded as test devices.
import { getSupabaseAdmin } from "../lib/supabase.ts";

const COHORTS = [100, 200, 300];
const DAY = 86400_000;
const kstDay = (ms: number) => Math.floor((ms + 9 * 3600_000) / DAY);
const sb = getSupabaseAdmin();

async function fetchAll(table: string, columns: string, orderBy = "created_at"): Promise<any[]> {
  const rows: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb.from(table).select(columns).order(orderBy).range(from, from + 999);
    if (error) { console.error(table, error.message); process.exit(1); }
    rows.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  return rows;
}

const events = await fetchAll("events", "created_at,anon_id,platform,dev,name,props");
const usage = await fetchAll("llm_usage_log", "session_id,cost_usd,created_at");
const sessions = await fetchAll("sessions", "created_at");

const testAnons = new Set(events.filter((e) => e.dev).map((e) => e.anon_id));
type Anon = { first: number; days: Set<number>; trial: boolean; paid: boolean; paidUnknown: boolean; paywall: boolean; chatDone: boolean; report: boolean };
const anons = new Map<string, Anon>();
let appOpenEvents = 0, purchaseKindEvents = 0;
for (const e of events) {
  if (testAnons.has(e.anon_id) || (e.platform !== "ios" && e.platform !== "android")) continue;
  const t = new Date(e.created_at).getTime();
  const a = anons.get(e.anon_id) ?? { first: t, days: new Set<number>(), trial: false, paid: false, paidUnknown: false, paywall: false, chatDone: false, report: false };
  anons.set(e.anon_id, a);
  a.days.add(kstDay(t));
  if (e.name === "app_open") appOpenEvents++;
  if (e.name === "paywall_view") a.paywall = true;
  if (e.name === "chat_complete") a.chatDone = true;
  if (e.name === "report_generate") a.report = true;
  if (e.name === "purchase_success") {
    const kind = e.props?.kind;
    if (kind) purchaseKindEvents++;
    if (kind === "trial") a.trial = true;
    else if (kind === "paid") a.paid = true;
    else a.paidUnknown = true; // old app builds don't send kind
  }
}

const ordered = [...anons.values()].sort((a, b) => a.first - b.first);
const now = Date.now();
const pct = (n: number, d: number) => (d ? `${((n / d) * 100).toFixed(1)}% (${n}/${d})` : "-");

console.log(`events: ${events.length} rows; test (dev) anons excluded: ${testAnons.size}; real-app anons: ${ordered.length}`);
console.log(`app_open events: ${appOpenEvents} (D1/D7 below count any event as "active" until the new build is widespread)`);
console.log(`purchase_success with kind: ${purchaseKindEvents} (rest counted as "paid?" because kind is missing)\n`);

for (const size of COHORTS) {
  if (ordered.length < size) {
    console.log(`== first ${size} installs: sample too small (${ordered.length}/${size}) ==`);
    continue;
  }
  const c = ordered.slice(0, size);
  const start = c[0].first, end = c[c.length - 1].first;
  const eligible = (n: number) => c.filter((a) => kstDay(now) >= kstDay(a.first) + n);
  const retained = (n: number) => eligible(n).filter((a) => a.days.has(kstDay(a.first) + n));
  const e1 = eligible(1), e7 = eligible(7);
  console.log(`== first ${size} installs (${new Date(start).toISOString().slice(0, 10)} ~ ${new Date(end).toISOString().slice(0, 10)}) ==`);
  console.log(`D1 retention       ${pct(retained(1).length, e1.length)}`);
  console.log(`D7 retention       ${pct(retained(7).length, e7.length)}`);
  console.log(`paywall seen       ${pct(c.filter((a) => a.paywall).length, size)}`);
  console.log(`chat completed     ${pct(c.filter((a) => a.chatDone).length, size)}`);
  console.log(`report generated   ${pct(c.filter((a) => a.report).length, size)}`);
  console.log(`trial started      ${pct(c.filter((a) => a.trial).length, size)}`);
  console.log(`paid (kind=paid)   ${pct(c.filter((a) => a.paid).length, size)}`);
  console.log(`paid? (no kind)    ${pct(c.filter((a) => a.paidUnknown).length, size)}`);
  // AI cost can't be split per install (llm_usage_log has no anon id): total cost in the cohort's
  // window divided by sessions created in that window.
  const inWin = (iso: string) => { const t = new Date(iso).getTime(); return t >= start && t <= end; };
  const cost = usage.filter((u) => u.session_id && inWin(u.created_at)).reduce((s, u) => s + Number(u.cost_usd ?? 0), 0);
  const nSess = sessions.filter((s) => inWin(s.created_at)).length;
  console.log(`AI cost / session  ${nSess ? `$${(cost / nSess).toFixed(3)} ($${cost.toFixed(2)} / ${nSess} sessions, approx, includes web)` : "-"}\n`);
}
console.log("Trial vs paid is a floor/ceiling guess; RevenueCat dashboard is the source of truth for subscriptions and churn.");
