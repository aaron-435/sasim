// "AI voice" detector (SPEC_2026-10-17_voice.md, V1). Informational only: always exits 0.
// Usage: npx tsx scripts/check-voice.mts [--baseline] [--compare] [--examples N] [--by-file-lines <path>]
//   --baseline   write scripts/voice-baseline.json (tracked) and scripts/out/voice-baseline.json
//   --compare    print delta vs scripts/voice-baseline.json per language and per group
//   --examples N print N example hit lines per pattern (file:line)
//   --by-file-lines <path>  print every hit (incl. rate-only signals) in one file with its whole sentence
//
// Scope rules (v2): prompt files are scanned for en/es strings only (Korean there = instructions to the model);
// quiz/question banks skip questions (end with ?/？) and short options (<30 chars); ko_trans_daehan, ko_nominal,
// ko_geot_gata are rate-only (per 1k chars, not in hit totals).
//
// How it works: source files are read as TEXT (no app code is executed). String literals
// ('...', "...", `...`) and, for .tsx/.jsx, JSX text are pulled out, language is guessed from
// content (Hangul -> ko, Spanish markers -> es, English function words -> en), then each string
// is matched against the per-language regex dictionary below. Skipped: lib/legalContent.ts,
// lib/reportQuality.ts (holds banned-word lists), strings < 12 chars or without whitespace
// (keys, paths, ids), class-name-like strings, __fixtures__, node_modules.
//
// Known false positives (accepted):
//   - Pattern lists / regexes written as strings inside prompt files (e.g. a prompt that tells the
//     model "avoid 'journey'") count as hits. Prompt "don't say" examples are therefore noisy.
//   - ko_geot_gata, ko_nominal, en_dance_landscape (single words) fire on ordinary uses.
//   - Source comments are skipped, but a quote char inside a regex literal can derail the tokenizer
//     for the rest of a line (single/double quoted strings end at newline, so damage is bounded).
//   - three_list and em_dash are rates only and are not in hit totals.
//   - ko_closing also fires on questions ("진짜 중요한 것은 무엇일까?").
//   - Zero-hit patterns (ko_transition, ko_validation, ko_trans_important, ko_trans_eseo, en_transition, en_validation,
//     es_validation, *_repeat_ending) were grep-verified absent from fixed copy; kept as guards for GPT output/regressions.
//   - Dev-only/QA copy under mobile/screens and app/api error strings are included in "components+app".
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";

type Lang = "ko" | "en" | "es";
const LANGS: Lang[] = ["ko", "en", "es"];
const ROOT = process.cwd();
const BASELINE_PATH = "scripts/voice-baseline.json";

// ---------- file discovery ----------
const SCAN = ["lib", "mobile/lib", "mobile/components", "mobile/screens", "components", "app"];
const SKIP_FILE = /(^|\/)(legalContent\.ts|reportQuality\.ts)$|\.d\.ts$|\.test\./;
const SKIP_DIR = /(^|\/)(node_modules|__fixtures__|__tests__|\.next|dist|ios)(\/|$)/;
const EXT = /\.(ts|tsx|jsx|js|json)$/;

function walk(dir: string, out: string[]) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const rel = relative(ROOT, p);
    if (SKIP_DIR.test(rel)) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.test(name) && !SKIP_FILE.test(rel)) out.push(rel);
  }
}

// ---------- directory groups ----------
function isPromptFile(f: string): boolean {
  return /^lib\/[^/]*Prompts?[^/]*\.ts$/.test(f) || /^lib\/compatReport[^/]*\.ts$/.test(f) || f === "lib/modulePlaybooks.ts" || /^lib\/chat[^/]*\.ts$/.test(f) || f === "lib/promptLocale.ts" || f === "lib/journalReport.ts";
}
function isQuizFile(f: string): boolean {
  return f.startsWith("mobile/lib/quiz/") || /^lib\/module\d+\w*\.ts$/.test(f) || f === "lib/questionBank.json" || f === "lib/personQuestions.json";
}
function groupOf(f: string): string {
  if (f.startsWith("mobile/lib/i18n/")) return "mobile/lib/i18n";
  if (f.startsWith("lib/i18n/")) return "lib/i18n";
  if (isQuizFile(f))
    return "quiz (mobile/lib/quiz + lib/module*, question banks)";
  if (f.startsWith("mobile/lib/dayMasterLessons")) return "mobile/lib/dayMasterLessons";
  if (/^(mobile\/)?lib\/[^/]*Content[^/]*\.ts$/.test(f)) return "*Content*.ts (mobile/lib + lib)";
  if (f.startsWith("lib/seoArticles/")) return "lib/seoArticles";
  if (isPromptFile(f)) return "instructions (en/es only)";
  if (/^(components|app|mobile\/components|mobile\/screens)\//.test(f)) return "components+app";
  return "other";
}

// ---------- string extraction ----------
interface Str { file: string; line: number; text: string; lang: Lang }

function extract(file: string, src: string): { line: number; text: string }[] {
  const out: { line: number; text: string }[] = [];
  const n = src.length;
  let i = 0, line = 1;
  const push = (text: string, ln: number) => out.push({ line: ln, text });
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === "\n") { line++; i++; continue; }
    if (c === "/" && d === "/") { while (i < n && src[i] !== "\n") i++; continue; }
    if (c === "/" && d === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) { if (src[i] === "\n") line++; i++; }
      i += 2; continue;
    }
    if (c === "'" || c === '"') {
      const q = c, start = line;
      let j = i + 1, buf = "", ok = false;
      while (j < n) {
        const ch = src[j];
        if (ch === "\n") break;
        if (ch === "\\") { buf += src[j + 1] === "n" ? " " : src[j + 1]; j += 2; continue; }
        if (ch === q) { ok = true; break; }
        buf += ch; j++;
      }
      if (ok) { push(buf, start); i = j + 1; } else i++; // unterminated (JSX apostrophe etc.): resume
      continue;
    }
    if (c === "`") {
      const start = line;
      let j = i + 1, buf = "", depth = 0;
      while (j < n) {
        const ch = src[j];
        if (depth === 0 && ch === "`") break;
        if (ch === "\\") { buf += src[j + 1] === "n" ? "\n" : src[j + 1]; j += 2; continue; }
        if (ch === "$" && src[j + 1] === "{") { depth++; buf += " "; j += 2; continue; }
        if (depth > 0) { if (ch === "{") depth++; else if (ch === "}") depth--; if (ch === "\n") line++; j++; continue; }
        if (ch === "\n") line++;
        buf += ch; j++;
      }
      push(buf, start); i = j + 1; continue;
    }
    i++;
  }
  if (/\.(tsx|jsx)$/.test(file)) {
    // JSX text between > and <
    const re = />([^<>{}=;\n]{12,}?)(?=<)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
      const ln = src.slice(0, m.index).split("\n").length;
      push(m[1].trim(), ln);
    }
  }
  return out;
}

const CLASSY_TOKEN = /^[a-z0-9:\-\[\]\/%.#_!]+$/;
const CLASSY = { test: (t: string) => t.split(" ").every((w) => CLASSY_TOKEN.test(w)) };
function keep(t: string): boolean {
  if (t.length < 12) return false;
  if (!/\s/.test(t)) return false;
  if (!/[A-Za-zÀ-ɏ가-힣]/.test(t)) return false;
  if (CLASSY.test(t) && /[:\-\[]/.test(t)) return false; // tailwind-ish class lists
  if (/^(https?:|\.{0,2}\/|@)/.test(t)) return false;
  return true;
}

const ES_WORDS = /\b(?:el|la|los|las|un|una|que|de|del|y|en|con|por|para|es|tu|tus|te|se|lo|como|más|pero|si|al|muy|hoy|cuando|esto|tienes|puedes)\b/gi;
const EN_WORDS = /\b(?:the|and|of|to|is|are|you|your|a|in|that|it|for|with|this|on|be|not|but|can|as|have|what)\b/gi;
function detect(t: string): Lang | null {
  if (/[가-힣]/.test(t)) return "ko";
  const es = (t.match(ES_WORDS) || []).length;
  const en = (t.match(EN_WORDS) || []).length;
  const esMark = /[ñ¿¡áéíóúü]/i.test(t);
  if (esMark && es >= 1) return "es";
  if (es >= 3 && es > en) return "es";
  if (en >= 2) return "en";
  return null;
}

// ---------- pattern dictionary ----------
interface Pat { id: string; lang: Lang; re: RegExp; rateOnly?: boolean }
const P = (id: string, lang: Lang, re: RegExp, rateOnly = false): Pat => ({ id, lang, re, rateOnly });
const PATTERNS: Pat[] = [
  // ---- ko ----
  P("ko_contrast", "ko", /(?:이|가|은|는|란|만)?\s?아니라\s[^.!?\n]{1,40}/g), // "마음이 약한 게 아니라 지친 거예요"
  P("ko_closing", "ko", /결국[^.!?\n]{0,10}(?:중요|핵심|남는|문제)|(?:중요한|핵심은|핵심이|핵심적인)\s?(?:건|것은|것이)\s/g), // "결국 중요한 건 ..."
  P("ko_metaphor", "ko", /여정|직조|태피스트리|씨앗을 심|(?:마음|내면|삶|인생|관계|감정|운명)의 (?:풍경|항해|등불)|풍경을 (?:그리|펼치|바꾸)/g), // "내면의 여정", "운명을 직조"; literal 풍경/항해 dropped
  P("ko_transition", "ko", /(?:^|[.!?]\s+)(?:또한|나아가|더불어|아울러|뿐만 아니라)[,\s]/g), // "또한, ..."
  P("ko_validation", "ko", /충분히 그럴 수|그렇게 느끼는 것도 (?:당연|자연)|당연한 감정|느껴도 괜찮아/g), // "충분히 그럴 수 있어요"
  P("ko_trans_daehan", "ko", /에 대한\s/g, true), // "운세에 대한 이야기" (rate-only: ordinary Korean)
  P("ko_trans_tonghae", "ko", /[을를] 통해(?:서)?[\s,]/g), // "대화를 통해"
  P("ko_trans_important", "ko", /(?:하는|되는|는|ㄴ|은) 것이 중요|것이 중요(?:해요|합니다|하죠)|하는 것이 좋(?:아요|습니다)/g), // "쉬는 것이 중요해요"
  P("ko_trans_eseo", "ko", /에 있어서|에 의해|로 인해|라고 할 수 있/g), // "관계에 있어서"
  P("ko_nominal", "ko", /(?:가능|필요|중요|안정|유연|지속|일관|민감|다양|독립|책임|적응|창의|수용|불확실|예민)성(?=[\s,.!?]|$|[이가을를은는의에])/g, true), // rate-only: ordinary nouns like 가능성
  P("ko_geot_gata", "ko", /것 같(?:아요|습니다|다)/g, true), // rate-only: hedging overuse; single honest hedge is fine
  P("ko_repeat_ending", "ko", /$^/g), // structural, see detectRepeats
  // ---- en ----
  P("en_contrast", "en", /\b(?:it['’]?s|that['’]?s|this is|isn['’]?t|is not|aren['’]?t|not)\s(?:just |only |about |a |an )?[^.!?\n]{1,45}?(?:,|;|—|\s-)\s?(?:it['’]?s|but|they['’]?re|you['’]?re|rather|it is)\s/gi), // "It's not weakness, it's fatigue"
  P("en_closing", "en", /at the end of the day|\bultimately,|what (?:really |truly )?matters (?:most )?is|the (?:real |true )?(?:key|takeaway) is|in the end,|in short,|the bottom line/gi),
  P("en_metaphor", "en", /\b(?:journey|tapestry|symphony|realm|unlock(?:s|ing|ed)?|embrac(?:e|es|ed|ing)|landscape|dance[sd]?|dancing)\b/gi), // FP: "embrace" meaning hug, "dance" literal
  P("en_transition", "en", /(?:^|[.!?]\s+)(?:Moreover|Furthermore|Additionally|In addition|Notably|Importantly)\b/g),
  P("en_validation", "en", /(?:completely|totally|perfectly|entirely) (?:valid|normal|okay|understandable)|your feelings are valid|it['’]?s (?:okay|ok) to feel|that['’]?s (?:completely )?valid/gi),
  P("en_tells", "en", /\bI hear you\b|\bdelv(?:e|es|ing)\b|it['’]?s worth noting|worth noting that|\bdive (?:in|into|deeper)\b|\bnavigat(?:e|es|ing)\b|let['’]?s unpack|\bgently remind/gi),
  P("en_repeat_ending", "en", /$^/g),
  // ---- es ----
  P("es_contrast", "es", /\bno (?:es|son|se trata de|significa|eres|estás)\s[^.!?\n]{1,45}?(?:,|;|—)\s?(?:sino|es|son|eres|estás)\b|\bno (?:solo|solamente) [^.!?\n]{1,40}, sino\b/gi), // "No es pereza, es cansancio"
  P("es_closing", "es", /en definitiva|al fin y al cabo|en última instancia|lo (?:más )?importante es|lo que (?:realmente )?importa es|a fin de cuentas|en resumen/gi),
  P("es_metaphor", "es", /\b(?:viaje|tapiz|desbloque(?:ar|a|as|o)|paisaje|danza|sinfonía|abraza(?:r)? (?:tu|tus|el|la))\b/gi),
  P("es_transition", "es", /(?:^|[.!?]\s+)(?:Además|Asimismo|Por otro lado|Cabe destacar|Es importante destacar|Del mismo modo)\b/g),
  P("es_validation", "es", /(?:completamente|totalmente|perfectamente) (?:válido|normal|comprensible)|tus (?:emociones|sentimientos) son válid[oa]s|es (?:totalmente|completamente) (?:válido|normal)/gi),
  P("es_calque", "es", /es importante (?:notar|señalar|destacar|recordar)|a lo largo del camino|cabe destacar|\bnavegar\b|en el día a día|a través de (?:tu|este|la)\b/gi), // FP: "a través de" is sometimes natural
  P("es_mente_dense", "es", /$^/g), // structural: >=3 -mente adverbs in one string
  P("es_repeat_ending", "es", /$^/g),
  // ---- cross-language rates (not in hit totals) ----
  P("em_dash", "ko", /—/g, true), // reported as rate per 1000 chars for every language
  P("three_list", "ko", /$^/g, true), // structural, see detectThreeList
];
const STRUCT = new Set(["ko_repeat_ending", "en_repeat_ending", "es_repeat_ending", "es_mente_dense", "three_list", "em_dash"]);
const REAL = PATTERNS.filter((p) => !STRUCT.has(p.id) || p.id === "em_dash");

function sentences(t: string): string[] {
  return t.split(/(?<=[.!?。…])\s+|\n+/).map((s) => s.trim()).filter((s) => s.length > 3);
}
function endKey(s: string, lang: Lang): string {
  const x = s.replace(/[\s.!?。…"'”’)\]]+$/g, "");
  if (lang === "ko") return x.slice(-2);
  return (x.split(/\s+/).pop() || "").toLowerCase();
}
function detectRepeats(t: string, lang: Lang): boolean {
  const ss = sentences(t);
  if (ss.length < 4) return false;
  let run = 1;
  for (let k = 1; k < ss.length; k++) {
    if (endKey(ss[k], lang) === endKey(ss[k - 1], lang) && endKey(ss[k], lang).length >= 2) { run++; if (run >= 4) return true; }
    else run = 1;
  }
  return false;
}
function threeListMatches(t: string, lang: Lang): number {
  const w = "[\\p{L}'’-]+(?: [\\p{L}'’-]+)?";
  const re =
    lang === "en" ? new RegExp(`(?:^|[\\s(])${w}, ${w},? and ${w}`, "giu")
    : lang === "es" ? new RegExp(`(?:^|[\\s(])${w}, ${w},? y ${w}`, "giu")
    : /[가-힣]{2,6}, [가-힣]{2,6}(?:,| 그리고|, 그리고) [가-힣]{2,6}/g;
  return (t.match(re) || []).length;
}

// ---------- run ----------
const args = process.argv.slice(2);
const flag = (f: string) => args.includes(f);
const fileLinesPath = flag("--by-file-lines") ? args[args.indexOf("--by-file-lines") + 1] : "";
const exN = flag("--examples") ? Number(args[args.indexOf("--examples") + 1]) || 2 : 0;

const files: string[] = [];
for (const r of SCAN) walk(r, files);

const strs: Str[] = [];
const skipped: { prompt: Str[]; quiz: Str[] } = { prompt: [], quiz: [] };
const allHits: { file: string; line: number; id: string; sentence: string }[] = [];
const rateCounts: Record<string, number> = {};
const QSKIP = new Set(["ko_closing"]);
const OLD_RE: Record<string, RegExp> = {
  ko_closing: /결국[^.!?\n]{0,10}(?:중요|핵심|남는|문제)|(?:중요한|핵심은|핵심이|핵심적인)\s?(?:건|것은|것이)\s/g,
  ko_metaphor: /여정|직조|태피스트리|풍경|항해|등불|씨앗을 심/g,
};
const removedNarrow: Record<string, number> = { ko_closing: 0, ko_metaphor: 0 };
for (const f of files) {
  let src: string;
  try { src = readFileSync(f, "utf8"); } catch { continue; }
  for (const s of extract(f, src)) {
    if (!keep(s.text)) continue;
    const lang = detect(s.text);
    if (!lang) continue;
    const st: Str = { file: f, line: s.line, text: s.text, lang };
    if (isPromptFile(f) && lang === "ko") { skipped.prompt.push(st); continue; }
    if (isQuizFile(f) && (/[?？]\s*$/.test(s.text.trim()) || s.text.length < 30)) { skipped.quiz.push(st); continue; }
    strs.push(st);
  }
}

const chars: Record<Lang, number> = { ko: 0, en: 0, es: 0 };
const hits: Record<Lang, number> = { ko: 0, en: 0, es: 0 };
const dashes: Record<Lang, number> = { ko: 0, en: 0, es: 0 };
const threes: Record<Lang, number> = { ko: 0, en: 0, es: 0 };
const perPattern: Record<string, number> = {};
const perGroup: Record<string, { chars: number; hits: number }> = {};
const perFile: Record<string, number> = {};
const examples: Record<string, string[]> = {};

function sentenceAt(text: string, hit: string): string {
  return sentences(text).find((x) => x.includes(hit)) || text.slice(0, 160);
}
function record(id: string, s: Str, snippet: string, hit = "") {
  allHits.push({ file: s.file, line: s.line, id, sentence: sentenceAt(s.text, hit || snippet.trim().slice(0, 12)) });
  perPattern[id] = (perPattern[id] || 0) + 1;
  hits[s.lang]++;
  const g = groupOf(s.file);
  perGroup[g].hits++;
  perFile[s.file] = (perFile[s.file] || 0) + 1;
  (examples[id] ||= []).push(`${s.file}:${s.line}  ${snippet.replace(/\s+/g, " ").slice(0, 110)}`);
}

for (const s of strs) {
  chars[s.lang] += s.text.length;
  const g = groupOf(s.file);
  perGroup[g] ||= { chars: 0, hits: 0 };
  perGroup[g].chars += s.text.length;
  const nd = (s.text.match(/—/g) || []).length;
  dashes[s.lang] += nd;
  if (nd >= 2) record("em_dash_dense", s, s.text.slice(Math.max(0, s.text.indexOf("—") - 30)));
  threes[s.lang] += threeListMatches(s.text, s.lang);
  for (const p of REAL) {
    if (p.lang !== s.lang || p.id === "em_dash" || p.id === "three_list") continue;
    const body = QSKIP.has(p.id) ? sentences(s.text).filter((x) => !/[?？]$/.test(x)).join(" ") : s.text;
    const m = body.match(p.re);
    if (OLD_RE[p.id]) removedNarrow[p.id] += Math.max(0, (s.text.match(OLD_RE[p.id]) || []).length - (m ? m.length : 0));
    if (!m) continue;
    for (const hit of m) {
      const at = body.indexOf(hit);
      if (p.rateOnly) {
        rateCounts[p.id] = (rateCounts[p.id] || 0) + 1;
        allHits.push({ file: s.file, line: s.line, id: p.id + " (rate-only)", sentence: sentenceAt(s.text, hit) });
        continue;
      }
      record(p.id, s, body.slice(Math.max(0, at - 25), at + hit.length + 25), hit);
    }
  }
  if (detectRepeats(s.text, s.lang)) record(`${s.lang}_repeat_ending`, s, s.text.slice(0, 110));
  if (s.lang === "es") {
    const mente = (s.text.match(/\b\p{L}{4,}mente\b/giu) || []).length;
    if (mente >= 3) record("es_mente_dense", s, s.text.slice(0, 110));
  }
}
perGroup["other"] ||= { chars: 0, hits: 0 };
function countHits(list: Str[]): number {
  let n = 0;
  for (const s of list) {
    for (const p of REAL) {
      if (p.rateOnly || p.lang !== s.lang || p.id === "em_dash") continue;
      n += (s.text.match(p.re) || []).length;
    }
    if (detectRepeats(s.text, s.lang)) n++;
    if ((s.text.match(/—/g) || []).length >= 2) n++;
  }
  return n;
}
const removed = {
  "rule1 prompt ko strings skipped": countHits(skipped.prompt),
  "rule2 quiz questions/short options skipped": countHits(skipped.quiz),
  "rule3 ko rate-only (daehan/nominal/geot_gata) moved out of totals": (rateCounts.ko_trans_daehan || 0) + (rateCounts.ko_nominal || 0) + (rateCounts.ko_geot_gata || 0),
  "ko_closing question sentences": removedNarrow.ko_closing,
  "ko_metaphor literal nouns": removedNarrow.ko_metaphor,
};

const per1k = (h: number, c: number) => (c ? (h / c) * 1000 : 0);
const result = {
  generatedAt: new Date().toISOString(),
  files: files.length,
  strings: strs.length,
  languages: Object.fromEntries(LANGS.map((l) => [l, { chars: chars[l], hits: hits[l], hitsPer1k: +per1k(hits[l], chars[l]).toFixed(3), emDashPer1k: +per1k(dashes[l], chars[l]).toFixed(3), threeListPer1k: +per1k(threes[l], chars[l]).toFixed(3) }])),
  patterns: perPattern,
  rateOnly: Object.fromEntries(Object.entries(rateCounts).map(([k, v]) => [k, { count: v, per1kKo: +per1k(v, chars.ko).toFixed(3) }])),
  removedAsFalsePositive: removed,
  groups: Object.fromEntries(Object.entries(perGroup).map(([g, v]) => [g, { chars: v.chars, hits: v.hits, hitsPer1k: +per1k(v.hits, v.chars).toFixed(3) }])),
  topFiles: Object.entries(perFile).sort((a, b) => b[1] - a[1]).slice(0, 20),
};

console.log(`voice scan: ${files.length} files, ${strs.length} strings`);
console.log("\n== per language ==");
for (const l of LANGS) {
  const r = (result.languages as any)[l];
  console.log(`${l}: chars=${r.chars} hits=${r.hits} hits/1k=${r.hitsPer1k}  em-dash/1k=${r.emDashPer1k}  three-list/1k=${r.threeListPer1k}`);
}
console.log("\n== per pattern ==");
const ids = [...new Set([...PATTERNS.filter((p) => !p.rateOnly).map((p) => p.id), "em_dash_dense"])];
for (const id of ids) console.log(`${id.padEnd(20)} ${perPattern[id] || 0}${perPattern[id] ? "" : "   (guard: verified absent in repo at baseline, kept for GPT output / regressions)"}`);
console.log("\n== rate-only signals (not in totals) ==");
for (const [k, v] of Object.entries(rateCounts)) console.log(`${k.padEnd(20)} ${v}  (${per1k(v, chars.ko).toFixed(2)}/1k ko chars)`);
console.log("\n== removed as false positive, by rule ==");
for (const [k, v] of Object.entries(removed)) console.log(`${String(v).padStart(5)}  ${k}`);
console.log("\n== per group ==");
for (const [g, v] of Object.entries(result.groups)) console.log(`${g.padEnd(62)} hits=${String((v as any).hits).padStart(4)}  chars=${String((v as any).chars).padStart(7)}  /1k=${(v as any).hitsPer1k}`);
console.log("\n== top 20 files ==");
for (const [f, n] of result.topFiles) console.log(`${String(n).padStart(4)}  ${f}`);

if (fileLinesPath) {
  console.log(`\n== hits in ${fileLinesPath} ==`);
  for (const h of allHits.filter((x) => x.file === fileLinesPath).sort((a, b) => a.line - b.line))
    console.log(`${h.file}:${h.line} [${h.id}] ${h.sentence}`);
}

if (exN) {
  console.log("\n== examples ==");
  for (const id of ids) {
    console.log(`\n[${id}] ${perPattern[id] || 0} hits`);
    for (const e of (examples[id] || []).slice(0, exN)) console.log("  " + e);
  }
}

if (flag("--compare")) {
  if (!existsSync(BASELINE_PATH)) console.log("\nno baseline at " + BASELINE_PATH);
  else {
    const b = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    console.log("\n== delta vs baseline (" + b.generatedAt + ") ==");
    const d = (a: number, c: number) => `${c} -> ${a} (${a - c >= 0 ? "+" : ""}${a - c}${c ? `, ${(((a - c) / c) * 100).toFixed(0)}%` : ""})`;
    for (const l of LANGS) console.log(`${l}: hits ${d(hits[l], b.languages[l].hits)}  /1k ${b.languages[l].hitsPer1k} -> ${(result.languages as any)[l].hitsPer1k}`);
    for (const [g, v] of Object.entries(result.groups)) console.log(`${g.padEnd(62)} hits ${d((v as any).hits, b.groups[g]?.hits ?? 0)}`);
    for (const id of ids) console.log(`${id.padEnd(20)} ${d(perPattern[id] || 0, b.patterns[id] || 0)}`);
  }
}

if (flag("--baseline")) {
  const json = JSON.stringify(result, null, 2) + "\n";
  writeFileSync(BASELINE_PATH, json);
  mkdirSync("scripts/out", { recursive: true });
  writeFileSync("scripts/out/voice-baseline.json", json);
  console.log("\nbaseline written: " + BASELINE_PATH);
}
process.exit(0);
