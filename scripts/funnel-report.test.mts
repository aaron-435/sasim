// Offline: npx tsx scripts/funnel-report.test.mts
import assert from "node:assert/strict";
import { buildFunnelReport, type FunnelEvent } from "./funnel-report.mts";

const now = Date.parse("2026-10-26T03:00:00Z"); // noon KST
const event = (id: string, date: string, name = "app_open", props: Record<string, unknown> | null = null, extra: Partial<FunnelEvent> = {}): FunnelEvent =>
  ({ anon_id: id, created_at: date, name, props, platform: "android", dev: false, ...extra });
let checks = 0;
const check = (ok: boolean, message: string) => { assert.ok(ok, message); checks++; };
const section = (report: string, title: string) => report.split(`== ${title} ==\n`)[1]?.split("\n== ")[0] ?? "";

const rows = [
  event("private-device-alpha", "2026-10-18T03:00:00Z"),
  event("private-device-alpha", "2026-10-19T03:00:00Z"),
  event("private-device-alpha", "2026-10-25T03:00:00Z"),
  event("private-device-alpha", "2026-10-25T04:00:00Z", "paywall_view", { surface: "report" }),
  event("private-device-alpha", "2026-10-25T05:00:00Z", "purchase_start", { product: "report_module1" }),
  event("private-device-alpha", "2026-10-25T06:00:00Z", "purchase_success", { product: "report_module1", kind: "paid" }),
  event("private-device-alpha", "2026-10-25T07:00:00Z", "purchase_success", { product: "com.fatesaid.app.report.module1", kind: "paid" }),
  event("private-device-beta", "2026-10-20T00:00:00Z", "purchase_success", { product: "compat_report", kind: "trial" }),
  event("private-device-beta", "2026-10-21T00:00:00Z", "purchase_cancel", { product: "compat_report" }),
  event("private-device-gamma", "2026-10-25T03:00:00Z", "purchase_success", { product: "private-name-1994-03-08" }),
  event("private-device-gamma", "2026-10-25T04:00:00Z", "paywall_view", { surface: "private-city" }),
  event("web-private", "2026-10-20T00:00:00Z", "purchase_success", { kind: "paid" }, { platform: "site" }),
  event("test-private", "2026-10-18T00:00:00Z", "purchase_success", { kind: "paid" }),
  event("test-private", "2026-10-20T00:00:00Z", "app_open", null, { dev: true }),
  event("invalid-private", "bad-date"),
  event("future-private", "2026-10-27T00:00:00Z"),
];
const report = buildFunnelReport(rows, [
  { created_at: "2026-10-22T00:00:00Z", session_id: "private-session", cost_usd: "0.25" },
  { created_at: "2026-10-23T00:00:00Z", session_id: "private-session", cost_usd: null },
  { created_at: "2026-10-23T01:00:00Z", session_id: null, cost_usd: "0.50" },
], [{ created_at: "2026-10-22T00:00:00Z" }], now);
const all = section(report, "all observed native devices");
const recent = section(report, "first seen in last 7 KST calendar dates");
check(report.includes("native anonymous devices observed: 3"), "exclude dev IDs, web, invalid and future rows");
check(all.includes("purchase_success kind=paid (unverified): 1/3"), "deduplicate repeated paid success by device");
check(all.includes("purchase_success kind=trial (not a charge): 1/3"), "trial separate from paid");
check(all.includes("purchase_success kind=unknown: 1/3"), "missing kind is unknown, not paid");
check(report.includes("product=report_module1: start=1, paid_signal=1"), "merge known iOS and Android module SKUs");
check(report.includes("trial_signal=1, unknown_success=0, cancel=1"), "product trial and cancellation milestones");
check(all.includes("D1 retained (completed KST days, any event): 2/2"), "exclude today's unfinished return day; cancellation still counts as activity");
check(all.includes("D7 retained (completed KST days, any event): 1/1"), "only mature D7 denominators");
check(recent.includes("observed devices: 2") && recent.includes("purchase_success kind=paid (unverified): 0/2"), "recent cohort has its own denominator and milestones");
check(report.includes("sample too small (3/100)"), "keep legacy small cohort notice");
check(report.includes("other_or_missing_product") && report.includes("other_or_missing_surface"), "mask unrecognized props");
check(!/private-|1994-03-08/.test(report), "no IDs, arbitrary props or dates from props printed");
check(all.includes("$0.750 known, 1 unpriced rows"), "include unattributed costs and count unpriced costs separately");
check(all.includes("rows with no session attribution (included above): 1"), "disclose unattributed rows without losing their costs");
check(buildFunnelReport([...rows].reverse(), [], [], now).split("AI window")[0] === buildFunnelReport(rows, [], [], now).split("AI window")[0], "input order independent");

const boundary = buildFunnelReport([
  event("before", "2026-10-19T14:59:59Z"), // Oct 19 23:59:59 KST, outside
  event("at", "2026-10-19T15:00:00Z"), // Oct 20 00:00 KST, inside
], [], [], now);
check(boundary.includes("== first seen in last 7 KST calendar dates ==\nobserved devices: 1"), "recent cohort uses KST date boundary");
const immature = buildFunnelReport([event("new", "2026-10-26T00:00:00Z")], [], [], now);
check(immature.includes("D1 retained (completed KST days, any event): - (0 eligible devices)"), "immature D1 is unknown, not zero retention");
const empty = buildFunnelReport([], [], [], now);
check(empty.includes("observed devices: 0") && empty.includes("sample too small (0/100)"), "empty data still outputs actionable sections");
const hundred = buildFunnelReport(Array.from({ length: 100 }, (_, i) => event(`id-${i}`, "2026-10-10T00:00:00Z")), [], [], now);
check(hundred.includes("== first 100 observed native devices (legacy install cohort) ==") && hundred.includes("sample too small (100/200)"), "preserve populated 100/200/300 cohorts");
const tiedRows = Array.from({ length: 101 }, (_, i) => event(`device${String(i).padStart(3, "0")}`, "2026-10-10T00:00:00Z", i === 100 ? "purchase_success" : "app_open", i === 100 ? { kind: "paid" } : null));
const tied = buildFunnelReport(tiedRows, [], [], now);
check(tied === buildFunnelReport([...tiedRows].reverse(), [], [], now), "deterministic cohort boundary for identical first timestamps");
check(section(tied, "first 100 observed native devices (legacy install cohort)").includes("purchase_success kind=paid (unverified): 0/100"), "cohort-specific assertion catches the 101st device leaking into the first 100");
check(report.includes("independent milestones") && report.includes("not verified charges"), "do not describe signals as ordered conversion or revenue");

// Tester-marked devices (hidden Settings switch / ?tester=1): out of every user section, into their own.
const testerRows = [
  ...rows,
  event("private-tester", "2026-10-21T00:00:00Z", "onboarding_complete"), // before the switch was turned on
  event("private-tester", "2026-10-21T01:00:00Z", "chat_start", { tester: true }),
  event("private-tester", "2026-10-21T02:00:00Z", "report_generate", { module: "module1", tester: true }),
  event("private-tester", "2026-10-21T03:00:00Z", "purchase_success", { product: "report_module1", kind: "paid", tester: true }),
  event("private-tester-web", "2026-10-21T00:00:00Z", "landing_view", { tester: true }, { platform: "site" }),
];
const withTesters = buildFunnelReport(testerRows, [], [], now);
const testerSection = section(withTesters, "tester-marked native devices (excluded above)");
check(withTesters.includes("native anonymous devices observed: 3 (tester-marked, reported separately: 1)"), "tester device leaves the main count and is counted on its own");
check(section(withTesters, "all observed native devices").includes("purchase_success kind=paid (unverified): 1/3"), "tester purchase does not reach user sections");
check(section(withTesters, "all observed native devices").includes("chat_start: 0/3"), "tester milestones do not reach user sections");
check(testerSection.includes("observed devices: 1") && testerSection.includes("chat_start: 1/1") && testerSection.includes("report_generate: 1/1"), "tester section shows the build's recorded milestones");
check(testerSection.includes("onboarding_complete: 1/1"), "events from before the switch go with the tester device");
check(testerSection.includes("purchase_success kind=paid (unverified): 1/1"), "tester purchases are visible only in the tester section");
check(!/private-/.test(withTesters), "no tester IDs printed");
check(section(report, "tester-marked native devices (excluded above)").includes("observed devices: 0"), "tester section present (empty) without testers");
check(section(buildFunnelReport([event("dev-and-tester", "2026-10-21T00:00:00Z", "app_open", { tester: true }, { dev: true })], [], [], now), "tester-marked native devices (excluded above)").includes("observed devices: 0"), "dev builds stay fully excluded, even when tester-marked");
console.log(`funnel report tests: ${checks} passed (offline, synthetic data only)`);
