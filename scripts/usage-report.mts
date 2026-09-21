// Sums llm_usage_log (written by lib/llmUsage.ts) per day and endpoint.
//   npx tsx --env-file=.env.local scripts/usage-report.mts [days]
import { getSupabaseAdmin } from "../lib/supabase.ts";
const days = Number(process.argv[2] ?? 4);
const since = new Date(Date.now() - days * 86400_000).toISOString();
const sb = getSupabaseAdmin();
const rows: any[] = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb.from("llm_usage_log").select("*").gte("created_at", since).order("created_at").range(from, from + 999);
  if (error) { console.error(error.message); process.exit(1); }
  rows.push(...(data ?? []));
  if (!data || data.length < 1000) break;
}
console.log("rows:", rows.length, "columns:", rows[0] ? Object.keys(rows[0]).join(",") : "-");
const key = (r: any) => new Date(new Date(r.created_at).getTime() + 9 * 3600_000).toISOString().slice(0, 10); // KST
const byDay: Record<string, { n: number; cost: number; inp: number; out: number; ep: Record<string, { n: number; cost: number }>; anon: number }> = {};
for (const r of rows) {
  const d = (byDay[key(r)] ??= { n: 0, cost: 0, inp: 0, out: 0, ep: {}, anon: 0 });
  const c = Number(r.cost_usd ?? 0);
  d.n++; d.cost += c; d.inp += r.prompt_tokens ?? 0; d.out += r.completion_tokens ?? 0;
  if (!r.session_id) d.anon++;
  const e = (d.ep[r.endpoint] ??= { n: 0, cost: 0 }); e.n++; e.cost += c;
}
for (const [day, d] of Object.entries(byDay)) {
  console.log(`\n${day} (KST): ${d.n} calls, $${d.cost.toFixed(2)}, in ${(d.inp / 1e6).toFixed(2)}M / out ${(d.out / 1e6).toFixed(2)}M tokens, without session id (scripts/tests): ${d.anon}`);
  for (const [ep, e] of Object.entries(d.ep).sort((a, b) => b[1].cost - a[1].cost)) console.log(`   ${ep.padEnd(14)} ${String(e.n).padStart(5)} calls  $${e.cost.toFixed(2)}`);
}
console.log("\nTOTAL $" + Object.values(byDay).reduce((s, d) => s + d.cost, 0).toFixed(2));
