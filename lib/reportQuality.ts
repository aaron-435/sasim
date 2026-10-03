/**
 * lib/reportQuality.ts
 * ------------------------------------------------------------------
 * Checks for the generated deep report, run before a buyer ever sees it. The report is the
 * highest-priced item in the app and the one people expect the most from, so it is worth extra
 * seconds (and a few cents) to catch what the generating model gets wrong on its own:
 *
 *   1. checkReportDeterministic — cheap, exact checks in code: thin pages, style slips, leftover
 *      Korean in another language, leaked instructions, and numbers (percentages, ages) that don't
 *      match the data the model was given.
 *   2. buildReviewPrompt — a second model reads the finished report against the same data as a
 *      strict editor and lists what is unsupported, frightening, generic or unnatural.
 *
 * lib/report.ts runs both and sends the model back to fix exactly what was found.
 * ------------------------------------------------------------------
 */

import type OpenAI from "openai";
import type { ReportContent } from "./report";
import type { YearReportContent } from "./yearReport";
import { logLlmUsage } from "./llmUsage";
import type { Locale } from "./i18n/types";
import { describeUpcomingPeriod, relationToDayMaster, type ReportContext } from "./reportPrompts";
import { ELEMENT_LABEL, FIELD_LANGUAGE_NAME } from "./promptLocale";
import type { ElementKey } from "./sajuScore";
import { getModuleChatSets, getModulePlaybook } from "./modulePlaybooks";
import { cardQuizFor, describeSetPackets, type SetCard } from "./reportSets";

const ELEMENT_KEYS: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

/** Fields whose numbers belong to an invented example person, not to the reader. */
const FICTIONAL_FIELDS = ["case_tag", "case_paragraphs"];

export function countSentences(text: string): number {
  return text
    // A sentence may end inside a quote ('…a quick note?' Mia, …) — closing quotes/brackets after the
    // end mark still end the sentence (2026-09-27: module_deep pages quote a sentence to ask for).
    .split(/[.!?…。]+["'”’»)]*(?:\s+|$)/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1).length;
}

/** Every string in the report with its path (e.g. "strengths[2].body"). */
export function flattenStrings(value: unknown, path = "report", out: [string, string][] = []): [string, string][] {
  if (typeof value === "string") out.push([path, value]);
  else if (Array.isArray(value)) value.forEach((v, i) => flattenStrings(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "locked_token" || k === "locked_shape") continue;
      flattenStrings(v, path === "report" ? k : `${path}.${k}`, out);
    }
  }
  return out;
}

const ES_GENDERED_READER =
  /(?<!\b(?:he|has|ha|hemos|han|había|habías|habrás|apego)\s)\b(atrapad|agotad|cansad|abrumad|sobrecargad|desbordad|preocupad|ansios|estresad|frustrad|aislad|agobiad|vaciad|quemad|inquiet|conectad|desconectad|bloquead|desorientad|saturad|exhaust|sobrepasad|expuest|pegad)[ao]s?\b/i;
const ES_STYLE_SLIP = /\busted(es)?\b|\b[a-záéíóúñ]{3,}x\b|\bcargarse\b|\bdescolocar|\bsu carta\b|\btu carta\b|\bla carta\b|\bvuestr/i;
const ES_CAPITALIZED_ELEMENTS = /\bCinco Elementos\b/; // running text uses lowercase "cinco elementos"
const META_LEAK = /\b(prompt|json|schema)\b|(se describe|se indica|se menciona|se da) aquí|named here|(only|sole|one) (supporting |direct )?relationship (that|which|here|named)|the only relationship|(único|única) relación|(only|sole) (supporting )?(relationship|relation) (named|given|provided|listed)|(único|única) (relación|apoyo) (nombrad|indicad|dad)[ao]|no (future )?age range|age range (is )?(not|un)specified|not specified|no se especifica|edad no (está )?especificad|\bfree (preview|strengths?)\b|\b(vista previa|fortalezas?) gratuitas?\b|무료 (강점|미리보기)/i;
// An age as the grammatical subject of a Spanish sentence ("38 años marcan…", "Los 38 años traen…"): a
// number/verb agreement slip, and it reads as a span of years rather than an age. The prompt asks for a
// leading prepositional phrase ("A los 38 años," / "Desde los 38 años,"), so a bare "N años" at the start
// of a clause is the slip; "N años desde ahora" reads as "38 years from now" anywhere. (TODO Q2, 2026-09-28)
const ES_AGE_AS_SUBJECT =
  /(?:^|[.!?;:—–]\s*|[¡¿]|,\s*|\b(?:pero|mientras|cuando|porque|que)\s+)(?:(?:los|tus|esos|estos|sus)\s+)?\d{1,2}\s+años\b|\b\d{1,2}\s+años\s+(?:desde|a partir de|de) (?:ahora|hoy)\b/i;
const MODULE_META = /이\s?모듈|\bthis module\b|\beste m[oó]dulo\b/i;
const HANGUL_OR_HANJA = /[ㄱ-ㆎ가-힣一-鿿]/;
const HANGUL_OR_HANJA_ALL = /[ㄱ-ㆎ가-힣一-鿿]/g;
// A letter from any script other than Hangul, Han and Latin (Devanagari, Cyrillic, kana, Arabic…). A ko
// report once shipped "शांत" inside weaknesses[3].body because only en/es were checked (TODO 7, 2026-10-02).
// Matched as a whole run so combining vowel signs stay attached ("शांत", not "श" + "त").
// Built from a string: tsconfig targets ES5, which rejects the "u" flag on a literal (the server runtime supports it).
const OTHER_SCRIPT_ALL = new RegExp(String.raw`[^\P{L}\p{Script=Hangul}\p{Script=Han}\p{Script=Latin}][^\s\p{P}\p{N}\p{Script=Hangul}\p{Script=Han}\p{Script=Latin}]*`, "gu");

/** The prompt tells module_map/module_deep the title is already shown on screen and not to repeat it
 * in the body, but models still open with it (TODO F1-c, 2026-09-28: "Tu alarma en las relaciones se
 * enciende…" for a page titled "Tu alarma en las relaciones"). Checks only the opening, since a title
 * word resurfacing later in the body is normal. */
function titleRepeatsInOpening(title: string, body: string): boolean {
  const norm = (s: string) => s.toLowerCase().replace(/[¿¡"“”'’.,:;!?]/g, "").replace(/\s+/g, " ").trim();
  const t = norm(title);
  if (t.length < 4) return false;
  const opening = norm(body).slice(0, t.length + 20);
  return opening.includes(t);
}

/** Minimum sentences per field — the "no thin page" product rule. */
function checkDensity(c: ReportContent, hasChat: boolean): string[] {
  const out: string[] = [];
  const need = (name: string, text: string | undefined, min = 3) => {
    if (typeof text === "string" && text.trim() && countSentences(text) < min) {
      out.push(`${name}: ${min}문장 이상이어야 하는데 ${countSentences(text)}문장`);
    }
  };
  need("opening_scene", c.opening_scene, 4);
  c.case_paragraphs.forEach((t, i) => need(`case_paragraphs[${i}]`, t));
  need("oheng_intro", c.oheng_intro);
  need("quiz_reading", c.quiz_reading);
  for (const k of ELEMENT_KEYS) need(`element_readings.${k}.body`, c.element_readings[k].body);
  need("module_map.body", c.module_map?.body, 4);
  need("module_deep.body", c.module_deep?.body, 4);
  need("upcoming_period_preview_body", c.upcoming_period_preview_body);
  need("upcoming_period_body", c.upcoming_period_body);
  c.cross_analysis_quotes.forEach((t, i) => need(`cross_analysis_quotes[${i}]`, t));
  c.answer_notes.forEach((t, i) => need(`answer_notes[${i}]`, t));
  if (hasChat) {
    need("chat_snapshot_note", c.chat_snapshot_note);
    need("chat_trigger_note", c.chat_trigger_note);
    need("chat_repeat_note", c.chat_repeat_note);
    need("chat_fear_note", c.chat_fear_note);
  }
  need("psychology_fact_body", c.psychology_fact_body);
  c.strengths_preview?.forEach((b, i) => need(`strengths_preview[${i}].body`, b.body));
  c.strengths.forEach((b, i) => need(`strengths[${i}].body`, b.body));
  c.weaknesses.forEach((b, i) => need(`weaknesses[${i}].body`, b.body));
  need("fit_good", c.fit_good);
  need("fit_bad", c.fit_bad);
  c.behavior_guides.forEach((b, i) => need(`behavior_guides[${i}].body`, b.body));
  need("mindset_guide", c.mindset_guide);
  need("closing_body", c.closing_body);
  return out;
}

/** Lowercased, without spaces and punctuation — so a quote that drops a comma, changes spacing or trims
 * an end mark still counts as the reader's own words. */
function normalizeForQuote(text: string): string {
  return text.normalize("NFC").toLowerCase().replace(/[\s.,!?;:…"'“”‘’«»()[\]{}<>\-–—~·、。，！？¿¡*_/]+/g, "");
}

/** True when every part of the quote (split at an ellipsis the model used to skip words) appears, in
 * order, inside one of the reader's answers. */
export function quoteMatchesSource(quote: string, sources: readonly string[]): boolean {
  const parts = quote.split(/…|\.{3}/).map(normalizeForQuote).filter(Boolean);
  if (parts.length === 0) return false;
  return sources.some((s) => {
    const src = normalizeForQuote(s);
    let from = 0;
    for (const part of parts) {
      const at = src.indexOf(part, from);
      if (at < 0) return false;
      from = at + part.length;
    }
    return true;
  });
}

/** The 5-set cards (TODO 8): one card per set in its slot, the quiz answer exactly as the app sent it,
 * a quote that is the reader's own words from that set (empty when the set had no chat), and a 3-sentence
 * reading. Only the cards of the part that was written are checked. */
function checkSetCards(c: ReportContent, ctx: ReportContext): string[] {
  const sets = ctx.reportSets;
  if (!sets) return [];
  const out: string[] = [];
  const part = ctx.part ?? "full";
  const chatSets = getModuleChatSets(ctx.moduleId);
  const slots: [string, number, SetCard | undefined][] = [];
  if (part !== "paid") {
    if (!c.set_card_1) out.push("set_card_1: 무료 카드(세트 1)가 없음");
    else slots.push(["set_card_1", 1, c.set_card_1]);
  }
  if (part !== "free") {
    const paid = c.set_cards_2to5 ?? [];
    if (paid.length !== 4) out.push(`set_cards_2to5: 유료 카드는 4장(세트 2~5)이어야 하는데 ${paid.length}장`);
    paid.slice(0, 4).forEach((card, i) => slots.push([`set_cards_2to5[${i}]`, i + 2, card]));
  }
  for (const [path, set, card] of slots) {
    if (!card) continue;
    if (card.set !== set) out.push(`${path}.set: 세트 ${set} 자리에 세트 ${card.set} 카드가 있음`);
    const expected = chatSets ? cardQuizFor(chatSets, set as 1 | 2 | 3 | 4 | 5, sets.quizAnswers) : null;
    const same = (a: SetCard["quiz"], b: SetCard["quiz"]) => (!a && !b) || (!!a && !!b && a.id === b.id && a.prompt === b.prompt && a.label === b.label && a.score === b.score);
    if (!same(card.quiz, expected)) out.push(`${path}.quiz: 검사 답이 앱이 보낸 30문항 데이터와 다름`);

    const packet = sets.setPackets[set - 1];
    const sources = packet ? [...packet.opening_answers, ...packet.module_answers] : [];
    const quote = card.quote.trim();
    if (!packet?.has_chat || sources.length === 0) {
      if (quote) out.push(`${path}.quote: 세트 ${set}에는 대화가 없어서 인용이 비어 있어야 함`);
    } else if (!quote) {
      out.push(`${path}.quote: 세트 ${set} 사용자 원문에서 고른 인용이 비어 있음 — 아래 원문에서 한 구절을 글자 그대로 옮길 것: ${sources.map((s) => `"${s}"`).join(" / ")}`);
    } else if (!quoteMatchesSource(quote, sources)) {
      out.push(
        `${path}.quote: 세트 ${set} 사용자 원문에 없는 문장 — 바꿔 말하거나 요약하지 말고, 아래 원문 중 한 구절(한두 문장 이내)을 글자 그대로 옮길 것: ${sources.map((s) => `"${s}"`).join(" / ")}`
      );
    }
    const n = card.note.trim() ? countSentences(card.note) : 0;
    if (n !== 3) out.push(`${path}.note: 읽어 주기는 3문장이어야 하는데 ${n}문장 — 검사 답과 대화의 말을 잇는 해석 3문장으로 쓸 것`);
  }
  return out;
}

export function checkReportDeterministic(c: ReportContent, ctx: ReportContext): string[] {
  const locale = ctx.locale ?? "ko";
  const problems = [...checkDensity(c, !!ctx.chatExtract), ...checkSetCards(c, ctx)];
  // A module page the model left empty (TODO F1-b). The free half legitimately carries module_deep with
  // an empty body (it's written after purchase), so only pages whose part was written are checked.
  const part = ctx.part ?? "full";
  if (c.module_map && part !== "paid" && !c.module_map.body.trim()) problems.push("module_map.body: 페이지 본문이 비어 있음 — 이 페이지 제목과 모듈 관점에 맞는 4문장 이상으로 쓸 것");
  if (c.module_deep && part !== "free" && !c.module_deep.body.trim()) problems.push("module_deep.body: 페이지 본문이 비어 있음 — 이 페이지 제목과 모듈 관점에 맞는 4문장 이상으로 쓸 것");
  if (c.module_map && part !== "paid" && c.module_map.body.trim() && titleRepeatsInOpening(c.module_map.title, c.module_map.body)) {
    problems.push(`module_map.body: 첫 문장이 페이지 제목("${c.module_map.title}")을 그대로 되풀이함 — 제목은 화면에 따로 표시되니 되풀이하지 말고 바로 내용으로 시작할 것`);
  }
  if (c.module_deep && part !== "free" && c.module_deep.body.trim() && titleRepeatsInOpening(c.module_deep.title, c.module_deep.body)) {
    problems.push(`module_deep.body: 첫 문장이 페이지 제목("${c.module_deep.title}")을 그대로 되풀이함 — 제목은 화면에 따로 표시되니 되풀이하지 말고 바로 내용으로 시작할 것`);
  }
  // "이 모듈에서는" on a module page is a meta phrase: the reader never sees the word "module" (rule 11,
  // TODO 7 2026-10-02 found it left in module_map).
  for (const [key, page] of [["module_map", c.module_map], ["module_deep", c.module_deep]] as const) {
    const m = page?.body.match(MODULE_META);
    if (m) problems.push(`${key}.body: "${m[0]}" 같은 메타 표현 — 독자에게는 모듈이라는 말이 보이지 않으니 빼고 주제를 직접 말할 것`);
  }
  // The core strength (paid) must not be one of the three free ones under another wording (TODO F2-a).
  if (c.strengths_preview?.length && c.strengths.length && part !== "free") {
    // Same title, or a shared content word ("Repair instinct" / "Repair courage", "끝까지 챙김" / "끝까지 버팀").
    const STOP = new Set(["the", "and", "your", "you", "of", "for", "with", "del", "las", "los", "una", "que", "con", "por", "para", "tu"]);
    const words = (t: string) =>
      t.toLowerCase().split(/[\s.,:;!?¡¿"“”«»()—–-]+/).filter((w) => w.length >= 2 && !STOP.has(w) && (locale === "ko" || w.length >= 4));
    const core = new Set(words(c.strengths[0].title));
    const same = c.strengths_preview.find((b) => words(b.title).some((w) => core.has(w)));
    if (same) {
      // Title and body together, so the fix call rewrites them as one new strength.
      const fix = `핵심 강점이 무료로 공개된 강점 "${same.title}"와 겹침 — 무료 강점 3개와 다른 능력(사주의 일간·원소와 심리검사 축이 만나는 자리의 힘)으로 제목과 본문을 함께 바꾸고, 제목에 무료 강점 제목의 단어를 쓰지 말 것`;
      problems.push(`strengths[0].title: ${fix}`, `strengths[0].body: ${fix}`);
    }
  }
  const strings = flattenStrings(c);

  // Numbers the reader can actually verify on screen: the element bars and the test's dimension bars.
  const allowedPercent = new Set<number>([0, 100]);
  for (const k of ELEMENT_KEYS) {
    const v = ctx.elements[k] ?? 0;
    allowedPercent.add(Math.floor(v));
    allowedPercent.add(Math.ceil(v));
  }
  for (const d of ctx.dimensionResults) {
    allowedPercent.add(Math.floor(d.percentOfMax));
    allowedPercent.add(Math.ceil(d.percentOfMax));
  }
  // Ages: only what the "upcoming period" data line states (plus the reader's own age).
  const allowedAges = new Set<number>();
  const upcoming = describeUpcomingPeriod(ctx.decadeFortune, ctx.currentAge, locale);
  for (const m of Array.from(upcoming.matchAll(/\d+/g))) allowedAges.add(Number(m[0]));
  if (ctx.currentAge != null) allowedAges.add(ctx.currentAge);

  // When the reader's Day Master is known, the chart pages must actually use it (the prompt hands
  // over how their strongest/weakest elements relate to it; models tend to skip that line).
  if (ctx.dayMaster) {
    const label = ELEMENT_LABEL[locale][ctx.dayMaster.element];
    const bare = label.replace(/\(.*\)/, "").trim();
    const mentions = (t?: string) =>
      !!t && (t.toLowerCase().includes(bare.toLowerCase()) || t.includes(ctx.dayMaster!.char) || /day master|일간|maestro del d[ií]a/i.test(t));
    if (c.oheng_intro && !mentions(c.oheng_intro)) {
      problems.push(`oheng_intro: 나의 일간(${ctx.dayMaster.char}, ${label})을 기준으로 우세·약한 원소가 어떤 기운인지 쉬운 말로 한 문장씩 넣어야 함`);
    }
  }

  // The cover subtitle must carry the module number exactly as given ("Module 3", not "Module 1").
  const moduleNumber = ctx.moduleTitle.match(/\d+/)?.[0];
  if (moduleNumber && c.subtitle && !new RegExp(`(?<!\\d)${moduleNumber}(?!\\d)`).test(c.subtitle)) {
    problems.push(`subtitle: 모듈 번호는 데이터의 "${ctx.moduleTitle}"에 나온 ${moduleNumber} 그대로 써야 함`);
  }

  for (const [path, text] of strings) {
    // Verbatim text on the 5-set cards: the quiz answer the app sent and the reader's own words. Style and
    // number rules don't apply to what the reader actually said (TODO 8 checks the quote against the source).
    if (/^set_card(_1|s_2to5\[\d\])\.(quiz\.|quote$)/.test(path)) continue;
    const fictional = FICTIONAL_FIELDS.some((f) => path === f || path.startsWith(`${f}[`));
    const stray = locale !== "ko" ? text.match(HANGUL_OR_HANJA_ALL) : null;
    if (stray) problems.push(`${path}: 한국어/한자가 섞여 있음 ("${Array.from(new Set(stray)).join("")}") — 그 글자를 빼고 이 언어로만 쓸 것`);
    const foreign = text.match(OTHER_SCRIPT_ALL);
    if (foreign) problems.push(`${path}: 다른 나라 문자가 섞여 있음 ("${Array.from(new Set(foreign)).join(", ")}") — 그 글자를 빼고 이 언어로만 쓸 것`);
    if (META_LEAK.test(text)) problems.push(`${path}: 지시문/데이터 누락을 언급하는 메타 발언`);
    if (locale === "es") {
      const m = text.match(ES_GENDERED_READER) ?? text.match(ES_STYLE_SLIP) ?? text.match(ES_CAPITALIZED_ELEMENTS);
      if (m) problems.push(`${path}: 스페인어 스타일 위반 ("${m[0]}") — 독자 성별 표지·usted·carta 금지`);
    }
    if (fictional) continue;
    for (const m of Array.from(text.matchAll(/(\d{1,3})(?:[.,]\d+)?\s?(?:%|percent\b|por ciento\b|퍼센트|프로)/gi))) {
      if (!allowedPercent.has(Number(m[1]))) problems.push(`${path}: 퍼센트 "${m[0].trim()}"가 데이터의 어떤 수치와도 맞지 않음`);
    }
    // Rule 4 (reportPrompts.ts) has closing_body echo the same age+element transition as the
    // upcoming_period_* pages, so it must follow the same number and grammar rules (TODO Q2, 2026-09-29).
    if (path.startsWith("upcoming_period") || path === "closing_body") {
      for (const m of Array.from(text.matchAll(/(\d{1,2})\s*(?:세|years?\b|años\b|yrs?\b)|\b(?:age|edad|aged)\s+(\d{1,2})\b/gi))) {
        const n = Number(m[1] ?? m[2]);
        if (!allowedAges.has(n)) problems.push(`${path}: 나이 "${m[0].trim()}"이 '다가오는 대운 시기' 데이터에 없는 숫자`);
      }
      const subj = locale === "es" ? text.match(ES_AGE_AS_SUBJECT) : null;
      if (subj) problems.push(`${path}: 스페인어 나이 "${subj[0].replace(/^.*?(?=(?:(?:los|tus|esos|estos|sus)\s+)?\d)/i, "")}"를 문장의 주어로 씀 — "A los N años," 또는 "Desde los N años,"처럼 나이를 전치사구로 앞세워 문장을 시작할 것`);
    }
  }
  return Array.from(new Set(problems));
}

function dominantOf(ctx: ReportContext): ElementKey {
  return [...ELEMENT_KEYS].sort((a, b) => (ctx.elements[b] ?? 0) - (ctx.elements[a] ?? 0))[0];
}
function weakestOf(ctx: ReportContext): ElementKey {
  return [...ELEMENT_KEYS].sort((a, b) => (ctx.elements[a] ?? 0) - (ctx.elements[b] ?? 0))[0];
}

/** The source facts a report is written from, as plain lines (shared by the review and fix prompts). */
export function describeReportData(ctx: ReportContext): string {
  const locale = ctx.locale ?? "ko";
  const elementsLine = ELEMENT_KEYS.map((k) => `${ELEMENT_LABEL[locale][k]} ${Math.round(ctx.elements[k] ?? 0)}%`).join(", ");
  const dims = ctx.dimensionResults
    .map((r) => `${ctx.dimensionShortNames[r.dimension] ?? r.dimension} ${r.direction === "high" ? "높음" : "낮음"} ${Math.round(r.percentOfMax)}%`)
    .join("; ");
  const answers = ctx.topAnswers?.map((a) => `"${a.prompt}" → "${a.label}"`).join(" / ") ?? "(없음)";
  const chat = ctx.chatExtract
    ? Object.entries(ctx.chatExtract)
        .filter(([, v]) => typeof v === "string" && v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ")
    : "(상담 없음)";
  const moduleFields = ctx.chatExtract?.module_fields
    ? Object.entries(ctx.chatExtract.module_fields)
        .filter(([, v]) => typeof v === "string" && v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ")
    : "";
  const playbook = getModulePlaybook(ctx.moduleId);
  const sets = ctx.reportSets
    ? `- 상담의 세트 재료 묶음(사용자가 실제로 한 말과 고른 퀴즈 답 — set_card_*의 quote는 여기서 글자 그대로 옮긴 사용자 원문이다):\n${describeSetPackets(ctx.reportSets, ctx.moduleId)}\n`
    : "";
  return `- 닉네임: ${ctx.nickname}
- 오행 분포: ${elementsLine}
${ctx.dayMaster ? `- 나의 일간: ${ctx.dayMaster.char} (${ELEMENT_LABEL[locale][ctx.dayMaster.element]}) — 일간 기준으로 우세 원소 ${ELEMENT_LABEL[locale][dominantOf(ctx)]}는 "${relationToDayMaster(ctx.dayMaster.element, dominantOf(ctx))}", 약한 원소 ${ELEMENT_LABEL[locale][weakestOf(ctx)]}는 "${relationToDayMaster(ctx.dayMaster.element, weakestOf(ctx))}"\n` : ""}- 심리검사 모듈: ${ctx.moduleTitle} / 유형: ${ctx.psychTestTypeTitle} — ${ctx.psychTestTypeHook}
- 심리검사 축: ${dims}
- 심리검사 서술: ${ctx.nuancedSummary}
- 실제 답한 문항: ${answers}
- 상담 내용: ${chat}
${moduleFields ? `- 상담의 모듈 추출 내용: ${moduleFields}\n` : ""}${sets}${playbook ? `- 모듈 전문 관점(module_map·module_deep의 틀): ${playbook.lens}\n` : ""}- ${describeUpcomingPeriod(ctx.decadeFortune, ctx.currentAge, locale)}`;
}

/** System prompt for the reviewing pass. The report is passed as the user message. */
export function buildReviewPrompt(ctx: ReportContext): string {
  const locale = ctx.locale ?? "ko";
  return `너는 유료 심층 리포트를 독자에게 내보내기 전에 검수하는 엄격하지만 합리적인 편집자다. 아래 "근거 데이터"와 사용자가 준 리포트(JSON)를 비교해서, **확실히 틀렸거나 규칙을 어긴 곳만** 목록으로 돌려줘라. 살펴봤더니 문제가 아닌 것은 절대 목록에 적지 마라("문제없음"이라고 쓸 거면 아예 빼라). 문제가 없으면 빈 배열이다.

## 의도된 설계 — 문제로 세지 마라
- opening_scene의 구체적인 밤 장면, 그리고 "~님의 요즘은 이런 모습이지 않으신가요"처럼 독자를 직접 부르는 질문은 의도된 문체다(데이터의 패턴에서 그린 장면).
- 독자에게 말을 거는 2인칭, 격려, 시적 은유, 문체 취향, 문장 길이는 문제가 아니다.
- 같은 숫자를 그 언어답게 표기한 것("40세부터 49세까지" ↔ "from age 40 to 49" ↔ "de los 40 a los 49 años")은 문제가 아니다. 다가오는 시기를 확정적인 어조로 쓰는 것도 문체이므로 문제가 아니다.
- upcoming_period_*의 나이·시기 표현은 코드가 검사한다. 보고하지 마라. 나이 숫자가 데이터와 같다면, 그 시기에 어떤 변화가 온다는 서술 자체는 문제가 아니다("아직 안 왔음"을 다시 밝히라고 요구하지 마라).
- 오행의 상생은 목→화→토→금→수→목, 상극은 목→토, 토→수, 수→화, 화→금, 금→목이다. 이 관계를 맞게 말한 문장은 (데이터에 따로 적혀 있지 않아도) 문제가 아니다. 틀리게 말한 것만 보고한다.
- 오행이 동률이면 데이터의 "약한 원소"로 지정된 것을 약하다고 말하는 것은 문제가 아니다. 데이터에 있는 상생 관계를 그대로 풀어 쓴 것도 문제가 아니다.
- 리포트에는 가상 사례(case_*)가 들어 있으나 이 요청에서는 이미 뺐다. 사례에 대해서는 아무것도 말하지 마라.${ctx.reportSets ? "\n- set_card_*의 quiz와 quote는 코드가 붙인 실제 퀴즈 답과 사용자 원문이다. 그 문구·맞춤법·성별 표현은 보고하지 마라(note만 검수한다)." : ""}

## 문제로 보고할 것 (이 6가지에 해당할 때만)
1. 근거 없는 사실: 근거 데이터에 없는 구체적 과거 사건(직업, 가족, 연애 상태 등)을 독자의 사실로 단정한다. (숫자·나이·오행 관계는 코드가 따로 검사하니 보고하지 마라.)
2. 겁주기: 건강 악화·사고·죽음·재난·이별·파산에 대한 예측, 의학적 진단, 단정적 부정 예측, 불안을 부추기는 압박.
3. 완전한 일반론: 이 사람의 데이터(수치, 답한 문항, 상담 내용) 어느 것도 언급하지 않아서 누구에게나 붙여 쓸 수 있는 문단.
4. 언어 품질: 이 언어(${locale})에서 명백히 부자연스러운 직역투, 뜻이 모호한 단어, 독자 성별을 드러내는 표현, 말투 불일치(존댓말/반말 혼용), 다른 언어 단어 섞임.
5. 모순·중복: 페이지끼리 사실이 서로 다르다(같은 원소를 어디선 강하다, 어디선 약하다고 함). 또는 strengths[0](유료 핵심 강점)이 strengths_preview(무료 강점 3개) 중 하나와 이름만 바꾼 같은 강점이다.
6. 메타 발언: 데이터가 없다/지시를 받았다/필드·프롬프트를 언급.

## 근거 데이터
${describeReportData(ctx)}

## 출력
JSON 객체 하나만: {"problems":[{"field":"필드 경로(예: strengths[1].body)","issue":"무엇이 왜 문제인지 한 문장, 고쳐야 할 방향 포함"}]}
최대 6개, 가장 중요한 것부터. 확실한 것만 적을 것.`;
}

/** Checks for the year-ahead report: the same language rules as the deep report (no leftover
 * Korean, no leaked instructions, Spanish style slips) plus thin month entries. */
export function checkYearReportDeterministic(c: YearReportContent, locale: Locale): string[] {
  const problems: string[] = [];
  c.months.forEach((m, i) => {
    if (countSentences(m.body) < 2) problems.push(`months[${i}].body: 2문장 이상이어야 하는데 ${countSentences(m.body)}문장`);
  });
  for (const [path, text] of flattenStrings(c)) {
    if (locale !== "ko" && HANGUL_OR_HANJA.test(text)) problems.push(`${path}: 한국어/한자가 섞여 있음`);
    if (META_LEAK.test(text)) problems.push(`${path}: 지시문/데이터 누락을 언급하는 메타 발언`);
    if (locale === "es") {
      const m = text.match(ES_GENDERED_READER) ?? text.match(ES_STYLE_SLIP) ?? text.match(ES_CAPITALIZED_ELEMENTS);
      if (m) problems.push(`${path}: 스페인어 스타일 위반 ("${m[0]}") — 독자 성별 표지·usted·carta 금지`);
    }
  }
  return Array.from(new Set(problems));
}

/** Path helpers for "strengths[1].body"-style locations. */
function pathParts(path: string): (string | number)[] {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean)
    .map((k) => (/^\d+$/.test(k) ? Number(k) : k));
}
export function getAt(root: unknown, path: string): unknown {
  return pathParts(path).reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string | number, unknown>)[k]), root);
}
export function setAt(root: unknown, path: string, value: string): boolean {
  const parts = pathParts(path);
  const last = parts.pop();
  const parent = parts.reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string | number, unknown>)[k]), root);
  if (parent == null || last == null || typeof (parent as Record<string | number, unknown>)[last] !== "string") return false;
  (parent as Record<string | number, unknown>)[last] = value;
  return true;
}

/** Rewrites one string so a single named problem disappears. Returns null on any failure. */
export function makeRewriter(client: OpenAI, model: string, locale: Locale, sessionId?: string) {
  return async (original: string, issue: string): Promise<string | null> => {
    try {
      const completion = await client.chat.completions.create({
        model,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `다음 문장을 ${FIELD_LANGUAGE_NAME[locale]}로 고쳐 써라. 고칠 점: ${issue}. 뜻, 분량(문장 수), 어조는 그대로 유지하고 그 문제만 없애라. 독자 성별을 드러내는 형용사·분사는 명사나 동사로 바꿔라. JSON 객체 {"text": "..."} 하나만 출력.`,
          },
          { role: "user", content: original },
        ],
        response_format: { type: "json_object" },
      });
      if (completion.usage) {
        await logLlmUsage({ sessionId, endpoint: "report", model, promptTokens: completion.usage.prompt_tokens, completionTokens: completion.usage.completion_tokens });
      }
      const text = (JSON.parse(completion.choices[0]?.message?.content ?? "{}") as { text?: unknown }).text;
      return typeof text === "string" && text.trim() ? text.trim() : null;
    } catch (err) {
      console.error("[quality] string rewrite failed (non-fatal)", err);
      return null;
    }
  };
}

/** Last resort for a finding the full rewrite could not clear (typically one stubborn word):
 * rewrite just that one string. Only string-level problems qualify; missing sentences or numbers
 * stay with the full rewrite loop. Returns a repaired copy. */
export async function repairStringFindings<T>(
  content: T,
  problems: string[],
  rewrite: (original: string, issue: string) => Promise<string | null>
): Promise<T> {
  const fixed: T = JSON.parse(JSON.stringify(content));
  const targets = new Map<string, string>();
  for (const p of problems) {
    const i = p.indexOf(": ");
    if (i < 0 || /문장 이상|퍼센트|나이/.test(p)) continue;
    const path = p.slice(0, i);
    if (typeof getAt(fixed, path) === "string" && !targets.has(path)) targets.set(path, p.slice(i + 2));
  }
  for (const [path, issue] of Array.from(targets).slice(0, 8)) {
    const text = await rewrite(getAt(fixed, path) as string, issue);
    if (text) setAt(fixed, path, text);
  }
  return fixed;
}

const HANJA_ELEMENT_EMOJI: Record<string, string> = { 木: "🌳", 火: "🔥", 土: "⛰️", 金: "💎", 水: "💧" };
const HANGUL_ELEMENT: Record<string, string> = { 木: "목", 火: "화", 土: "토", 金: "금", 水: "수" };

/** Korean text must never show hanja (the app labels elements with an emoji instead). The prompts
 * already forbid them; this is the guarantee for when the model still writes "화(火)" or "(大運)":
 * an element with its hanja in parentheses keeps the hangul, and any other parenthesised hanja is
 * dropped. Deep-maps every string in the value. */
export function stripHanja<T>(value: T): T {
  const clean = (t: string) =>
    t
      .replace(/([목화토금수])\s?\(([木火土金水])\)/g, (_m, ko: string) => ko)
      .replace(/\s?\([\u4E00-\u9FFF]+\)/g, "")
      .replace(/[木火土金水]/g, (h) => `${HANJA_ELEMENT_EMOJI[h]}${HANGUL_ELEMENT[h]}`)
      .replace(/[\u4E00-\u9FFF]/g, "");
  const walk = (v: unknown): unknown => {
    if (typeof v === "string") return clean(v);
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return walk(value) as T;
}
