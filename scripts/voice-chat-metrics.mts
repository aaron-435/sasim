/**
 * voice-chat-metrics.mts — 챗 시뮬레이션 대본에서 "AI 같은 기계적 반복"을 턴 사이에서 측정한다.
 *
 * 사용: npx tsx scripts/voice-chat-metrics.mts <dir-or-json...> [--json out.json] [-v]
 * 입력: scripts/sim-chat.mts 가 저장한 scripts/out/(하위폴더)/sim_*.json (turns[].bot = 줄 배열, turns[].user = 그 턴 뒤의 사용자 답)
 *   bot 턴 i 가 반응하는 사용자 말은 turns[i-1].user 이다.
 *
 * 범위: "all" = 2턴 이후 전체, "core" = 2..n-1턴에서 요약 턴(bot 줄 수 >= 4)을 뺀 것.
 *   1턴(인사)과 마지막 턴(마무리 질문), 요약 턴은 제품이 되풀이를 요구하므로 core 에서 뺀다.
 *   점수는 core 기준.
 *
 * 지표
 *  1) opener_echo_rate: 턴의 첫 문장이 직전 사용자 말과 겹치는 비율이 >= 0.4 인 턴의 비율.
 *     ko: 공백·문장부호 제거 후 글자 바이그램, (첫 문장 바이그램 중 사용자 말에 있는 비율). 조사는 바이그램이 흡수(오탐 가능).
 *     en/es: 불용어 제거한 내용어의 앞 5글자 어간이 사용자 말에 있는 비율(악센트 제거, 소문자).
 *  2) ending_repeat: ko = 평서문(물음표 없는 문장) 종결 패턴(군요/네요/나요/까요/요체/죠/습니다/다/기타)의
 *     최빈 비중과 서로 다른 종결 수. en/es = 모든 문장의 앞 두 단어 시작구의 최빈 비중과 종류 수.
 *  3) question_shape_repeat: 턴의 마지막 물음 문장의 모양(choice 'A or B', wh, yn, none).
 *     escape = 턴의 마지막 두 문장 안의 "아니어도/If none fit/Si ninguna" 류 탈출구.
 *     최장 연속 동일 모양 길이(질문이 있는 core 턴만 이어서 센다).
 *  4) phrase_reuse: 2턴 이후 봇 턴들 사이에서 여러 턴에 걸쳐 나온 3단어(en/es) 또는 4글자(ko) 구, 턴 수 기준 상위 5.
 *     따옴표 안 문자열과 그 대본의 사용자 발화에 들어있는 구는 제외. 겹치는 구는 하나로 묶는다.
 *  5) summary_score (0-100, 높을수록 기계적; 전후 비교용 상대 지표일 뿐):
 *       100 * (0.25*opener_echo_rate + 0.25*top_ending_share + 0.20*forced_choice_share
 *            + 0.10*escape_share + 0.10*run_norm + 0.10*phrase_norm)
 *       run_norm = (longest_run-1)/(question_turns-1), phrase_norm = min(1, top1_phrase_turns / core_turns)
 *     모두 core 기준.
 *
 * 한계: 문장 분리는 정규식이라 줄임표·인용 안 마침표에서 틀릴 수 있다. 턴 수가 6 안팎이라 단일 대본 값은 거칠다.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Turn = { turn: number; bot: string[]; user: string | null };
type Sim = { locale: "ko" | "en" | "es"; persona?: string; moduleId?: string; turns: Turn[] };

const args = process.argv.slice(2);
const jsonIdx = args.indexOf("--json");
const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;
const verbose = args.includes("-v");
const inputs = args.filter((a, i) => !a.startsWith("-") && !(jsonIdx >= 0 && i === jsonIdx + 1));

function collect(p: string): string[] {
  if (statSync(p).isDirectory()) {
    return readdirSync(p).flatMap((f) => {
      const q = join(p, f);
      if (statSync(q).isDirectory()) return collect(q);
      return /^sim_.*\.json$/.test(f) ? [q] : [];
    });
  }
  return [p];
}

// ---- text helpers ----
const QUOTE_RE = /[‘“«"][^’”»"]{1,80}[’”»"]/g;
const stripQuotes = (s: string) => s.replace(QUOTE_RE, " ");
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function sentences(lines: string[]): string[] {
  return lines
    .flatMap((l) => l.split(/(?<=[.!?。…])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
}

const STOP_EN = new Set("a an the and or but if so to of in on at for with as is are was were be been it its that this these those you your yours i me my we our they he she him her his them there here from by about into than then when while what how not no do does did can could would should may might have has had just also more most very too up out over after before again still even only".split(" "));
const STOP_ES = new Set("el la los las un una unos unas y o u pero si no de del al en con por para como que se su sus tu tus te ti me mi mis lo le les es son era eran fue ser esta este esto estos estas eso esa ese hay ha han he muy mas ya tambien solo cuando donde sin sobre entre hasta desde".split(" "));
const stopFor = (loc: string) => (loc === "es" ? STOP_ES : STOP_EN);

function contentStems(s: string, loc: string): string[] {
  const stop = stopFor(loc);
  return norm(s)
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stop.has(w))
    .map((w) => w.slice(0, 5));
}
function hangulBigrams(s: string): Set<string> {
  const t = s.replace(/[^가-힣a-zA-Z0-9]/g, "");
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}

function echoRatio(first: string, user: string, loc: string): number {
  if (loc === "ko") {
    const a = hangulBigrams(first);
    if (!a.size) return 0;
    const u = hangulBigrams(user);
    let hit = 0;
    for (const g of a) if (u.has(g)) hit++;
    return hit / a.size;
  }
  const a = contentStems(first, loc);
  if (!a.length) return 0;
  const u = new Set(contentStems(user, loc));
  return a.filter((w) => u.has(w)).length / a.length;
}

function koEnding(s: string): string {
  const t = s.replace(/[\s"'’”.!…~]+$/g, "");
  if (/군요$/.test(t)) return "~군요";
  if (/네요$/.test(t)) return "~네요";
  if (/나요$|가요$/.test(t)) return "~나요/가요";
  if (/까요$/.test(t)) return "~까요";
  if (/(습니다|입니다)$/.test(t)) return "~습니다";
  if (/죠$/.test(t)) return "~죠";
  if (/요$/.test(t)) return "~요체";
  if (/다$/.test(t)) return "~다";
  return "기타";
}
function openerKey(s: string): string {
  return norm(s).replace(/[^a-z0-9ñ\s']/g, " ").split(/\s+/).filter(Boolean).slice(0, 2).join(" ");
}

type Shape = "choice" | "wh" | "yn" | "none";
function questionShape(turnSents: string[], loc: string): { shape: Shape; escape: boolean } {
  let qi = -1;
  for (let i = turnSents.length - 1; i >= 0; i--) if (/[?？]\s*$/.test(turnSents[i])) { qi = i; break; }
  const lastTwo = turnSents.slice(-2).join(" ");
  const esc =
    loc === "ko" ? /아니어도|그 외|그외|둘 다 아니|셋 다 아니|다 아니|아니라면|떠오르는 대로|다른 (게|거|것|느낌)|아니더라도/
    : loc === "es" ? /si ninguna|si no es|si es otra|otra cosa|ninguna de|como te salga|con tus (propias )?palabras/i
    : /if none|if it'?s neither|if it'?s something else|neither|none fit|in your own words|something else|if (that|it) isn'?t/i;
  const escape = esc.test(lastTwo);
  if (qi < 0) return { shape: "none", escape };
  const q = stripQuotes(turnSents[qi]);
  const choice =
    loc === "ko" ? /아니면/.test(q)
    : loc === "es" ? /,\s*o\s|\so\s[^?]{2,}\?/i.test(q)
    : /,\s*or\s|\sor\s[^?]{2,}\?/i.test(q);
  if (choice) return { shape: "choice", escape };
  const wh =
    loc === "ko" ? /무엇|뭐|어떤|어떻게|언제|어디|누가|누구|왜|얼마나|어느|어떻/.test(q)
    : loc === "es" ? /\b(qu[eé]|c[oó]mo|cu[aá]ndo|d[oó]nde|qui[eé]n|cu[aá]l|cu[aá]nto|por qu[eé])\b/i.test(q)
    : /\b(what|how|when|where|who|why|which)\b/i.test(q);
  return { shape: wh ? "wh" : "yn", escape };
}

function phraseReuse(turns: string[][], loc: string, userAll: string): { phrase: string; turns: number }[] {
  const userN = loc === "ko" ? userAll.replace(/[^가-힣]/g, "") : norm(userAll).replace(/[^a-z0-9ñ\s]/g, " ").replace(/\s+/g, " ");
  const counts = new Map<string, number>();
  for (const sents of turns) {
    const text = stripQuotes(sents.join(" "));
    const grams = new Set<string>();
    if (loc === "ko") {
      for (const cl of text.split(/[.,?!…]/)) {
        const t = cl.replace(/[^가-힣]/g, "");
        for (let i = 0; i + 4 <= t.length; i++) grams.add(t.slice(i, i + 4));
      }
    } else {
      const stop = stopFor(loc);
      const w = norm(text).replace(/[^a-z0-9ñ\s]/g, " ").split(/\s+/).filter(Boolean);
      for (let i = 0; i + 3 <= w.length; i++) {
        const g = w.slice(i, i + 3);
        if (g.every((x) => stop.has(x))) continue;
        grams.add(g.join(" "));
      }
    }
    for (const g of grams) counts.set(g, (counts.get(g) ?? 0) + 1);
  }
  const userCmp = loc === "ko" ? userN : userN;
  const ranked = [...counts.entries()]
    .filter(([g, c]) => c >= 2 && !userCmp.includes(g))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const picked: { phrase: string; turns: number }[] = [];
  for (const [g, c] of ranked) {
    const overlaps = picked.some((p) =>
      loc === "ko"
        ? p.phrase.includes(g.slice(1)) || g.includes(p.phrase.slice(1)) || p.phrase.includes(g.slice(0, 3)) || g.includes(p.phrase.slice(0, 3))
        : g.split(" ").filter((x) => p.phrase.split(" ").includes(x)).length >= 2,
    );
    if (!overlaps) picked.push({ phrase: g, turns: c });
    if (picked.length >= 5) break;
  }
  return picked;
}

function longestRun(xs: string[]): number {
  let best = 0, cur = 0, prev = "";
  for (const x of xs) { cur = x === prev ? cur + 1 : 1; prev = x; best = Math.max(best, cur); }
  return best;
}

type Metrics = {
  file: string; locale: string; persona: string; turnsAll: number; turnsCore: number;
  opener_echo_all: number; opener_echo_core: number;
  top_ending: string; top_ending_share: number; distinct_endings: number;
  shapes: Record<Shape, number>; forced_choice_share: number; escape_share: number; longest_shape_run: number;
  phrases: { phrase: string; turns: number }[];
  summary_score: number;
};

function analyze(file: string): Metrics {
  const sim = JSON.parse(readFileSync(file, "utf8")) as Sim;
  const loc = sim.locale;
  const turns = sim.turns;
  const n = turns.length;
  const per = turns.map((t, i) => {
    const sents = sentences(t.bot);
    const prevUser = i > 0 ? turns[i - 1].user ?? "" : "";
    const echo = i > 0 && sents[0] ? echoRatio(stripQuotes(sents[0]), prevUser, loc) : 0;
    return { i, sents, echo, ...questionShape(sents, loc), recap: t.bot.length >= 4 };
  });
  const core = per.filter((p) => p.i >= 1 && p.i <= n - 2 && !p.recap);
  const allB = per.filter((p) => p.i >= 1);
  const isEcho = (p: { echo: number }) => p.echo >= 0.4;
  const echoAll = allB.filter(isEcho).length / Math.max(1, allB.length);
  const echoCore = core.filter(isEcho).length / Math.max(1, core.length);

  const keys: string[] = [];
  for (const p of core) for (const s of p.sents) {
    if (loc === "ko") { if (!/[?？]\s*$/.test(s)) keys.push(koEnding(s)); }
    else keys.push(openerKey(s));
  }
  const kc = new Map<string, number>();
  for (const k of keys) kc.set(k, (kc.get(k) ?? 0) + 1);
  const topEnd: [string, number] = [...kc.entries()].sort((a, b) => b[1] - a[1])[0] ?? ["-", 0];
  const topShare = keys.length ? topEnd[1] / keys.length : 0;

  const shapes: Record<Shape, number> = { choice: 0, wh: 0, yn: 0, none: 0 };
  for (const p of core) shapes[p.shape]++;
  const qTurns = core.filter((p) => p.shape !== "none");
  const choiceShare = qTurns.length ? shapes.choice / qTurns.length : 0;
  const escShare = core.length ? core.filter((p) => p.escape).length / core.length : 0;
  const run = longestRun(qTurns.map((p) => p.shape));
  const runNorm = qTurns.length > 1 ? (run - 1) / (qTurns.length - 1) : 0;

  const userAll = turns.map((t) => t.user ?? "").join(" ");
  const phrases = phraseReuse(per.filter((p) => p.i >= 1).map((p) => p.sents), loc, userAll);
  const phraseNorm = Math.min(1, (phrases[0]?.turns ?? 0) / Math.max(1, core.length));

  const score = 100 * (0.25 * echoCore + 0.25 * topShare + 0.2 * choiceShare + 0.1 * escShare + 0.1 * runNorm + 0.1 * phraseNorm);

  if (verbose) {
    console.log(`\n# ${file}`);
    for (const p of per) console.log(`t${p.i + 1} echo=${p.echo.toFixed(2)} shape=${p.shape}${p.escape ? "+esc" : ""}${p.recap ? " (recap)" : ""} :: ${p.sents[0] ?? ""}`);
  }
  return {
    file, locale: loc, persona: `${sim.persona ?? "?"}/${sim.moduleId ?? "?"}`, turnsAll: n, turnsCore: core.length,
    opener_echo_all: echoAll, opener_echo_core: echoCore,
    top_ending: String(topEnd[0]), top_ending_share: topShare, distinct_endings: kc.size,
    shapes, forced_choice_share: choiceShare, escape_share: escShare, longest_shape_run: run,
    phrases, summary_score: Math.round(score * 10) / 10,
  };
}

// ---- main ----
const files = inputs.flatMap(collect).sort();
if (!files.length) {
  console.error("usage: npx tsx scripts/voice-chat-metrics.mts <dir-or-json...> [--json out.json] [-v]");
  process.exit(1);
}
const results = files.map(analyze);
const pct = (x: number) => `${Math.round(x * 100)}%`;
const pad = (s: string, w: number) => (s + " ".repeat(w)).slice(0, w);

console.log(pad("transcript", 26) + pad("loc", 4) + pad("n/core", 7) + pad("echo(all/core)", 15) + pad("top ending", 16) + pad("endings", 8) + pad("shapes c/w/y/-", 15) + pad("choice", 7) + pad("escape", 7) + pad("run", 4) + "score");
for (const r of results) {
  console.log(
    pad(r.persona, 26) + pad(r.locale, 4) + pad(`${r.turnsAll}/${r.turnsCore}`, 7) +
    pad(`${pct(r.opener_echo_all)}/${pct(r.opener_echo_core)}`, 15) +
    pad(`${r.top_ending} ${pct(r.top_ending_share)}`, 16) + pad(String(r.distinct_endings), 8) +
    pad(`${r.shapes.choice}/${r.shapes.wh}/${r.shapes.yn}/${r.shapes.none}`, 15) +
    pad(pct(r.forced_choice_share), 7) + pad(pct(r.escape_share), 7) + pad(String(r.longest_shape_run), 4) + r.summary_score,
  );
  console.log("   phrases: " + (r.phrases.map((p) => `"${p.phrase}"x${p.turns}`).join(", ") || "-"));
}

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const aggregate: Record<string, unknown> = {};
console.log("\n== aggregate per locale (mean of transcripts) ==");
for (const loc of ["ko", "en", "es"]) {
  const rs = results.filter((r) => r.locale === loc);
  if (!rs.length) continue;
  const a = {
    transcripts: rs.length,
    opener_echo_core: avg(rs.map((r) => r.opener_echo_core)),
    top_ending_share: avg(rs.map((r) => r.top_ending_share)),
    forced_choice_share: avg(rs.map((r) => r.forced_choice_share)),
    escape_share: avg(rs.map((r) => r.escape_share)),
    longest_shape_run: avg(rs.map((r) => r.longest_shape_run)),
    summary_score: avg(rs.map((r) => r.summary_score)),
  };
  aggregate[loc] = a;
  console.log(`${loc}: n=${a.transcripts} echo=${pct(a.opener_echo_core)} topEnding=${pct(a.top_ending_share)} choice=${pct(a.forced_choice_share)} escape=${pct(a.escape_share)} run=${a.longest_shape_run.toFixed(1)} score=${a.summary_score.toFixed(1)}`);
}
if (results.length > 1) console.log(`all: score=${avg(results.map((r) => r.summary_score)).toFixed(1)}`);
if (jsonOut) { writeFileSync(jsonOut, JSON.stringify({ results, aggregate }, null, 2)); console.log(`\nwrote ${jsonOut}`); }
