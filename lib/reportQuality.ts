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

import type { ReportContent } from "./report";
import { describeUpcomingPeriod, type ReportContext } from "./reportPrompts";
import { ELEMENT_LABEL } from "./promptLocale";
import type { ElementKey } from "./sajuScore";

const ELEMENT_KEYS: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

/** Fields whose numbers belong to an invented example person, not to the reader. */
const FICTIONAL_FIELDS = ["case_tag", "case_paragraphs"];

export function countSentences(text: string): number {
  return text
    .split(/[.!?…。]+(?:\s+|$)/)
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
  /(?<!\b(?:he|has|ha|hemos|han|había|habías|habrás)\s)\b(atrapad|agotad|cansad|abrumad|sobrecargad|desbordad|preocupad|ansios|estresad|frustrad|aislad|agobiad|vaciad|quemad|inquiet|conectad|desconectad)[ao]s?\b/i;
const ES_STYLE_SLIP = /\busted(es)?\b|\bsu carta\b|\btu carta\b|\bla carta\b|\bvuestr/i;
const META_LEAK = /\b(prompt|json|schema)\b|no (future )?age range|age range (is )?(not|un)specified|not specified|no se especifica|edad no (está )?especificad/i;
const HANGUL_OR_HANJA = /[ㄱ-ㆎ가-힣一-鿿]/;

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
  for (const k of ELEMENT_KEYS) need(`element_readings.${k}.body`, c.element_readings[k].body);
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
  c.strengths.forEach((b, i) => need(`strengths[${i}].body`, b.body));
  c.weaknesses.forEach((b, i) => need(`weaknesses[${i}].body`, b.body));
  need("fit_good", c.fit_good);
  need("fit_bad", c.fit_bad);
  c.behavior_guides.forEach((b, i) => need(`behavior_guides[${i}].body`, b.body));
  need("mindset_guide", c.mindset_guide);
  need("closing_body", c.closing_body);
  return out;
}

export function checkReportDeterministic(c: ReportContent, ctx: ReportContext): string[] {
  const locale = ctx.locale ?? "ko";
  const problems = checkDensity(c, !!ctx.chatExtract);
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

  for (const [path, text] of strings) {
    const fictional = FICTIONAL_FIELDS.some((f) => path === f || path.startsWith(`${f}[`));
    if (locale !== "ko" && HANGUL_OR_HANJA.test(text)) problems.push(`${path}: 한국어/한자가 섞여 있음`);
    if (META_LEAK.test(text)) problems.push(`${path}: 지시문/데이터 누락을 언급하는 메타 발언`);
    if (locale === "es") {
      const m = text.match(ES_GENDERED_READER) ?? text.match(ES_STYLE_SLIP);
      if (m) problems.push(`${path}: 스페인어 스타일 위반 ("${m[0]}") — 독자 성별 표지·usted·carta 금지`);
    }
    if (fictional) continue;
    for (const m of Array.from(text.matchAll(/(\d{1,3})(?:[.,]\d+)?\s?(?:%|percent\b|por ciento\b|퍼센트|프로)/gi))) {
      if (!allowedPercent.has(Number(m[1]))) problems.push(`${path}: 퍼센트 "${m[0].trim()}"가 데이터의 어떤 수치와도 맞지 않음`);
    }
    if (path.startsWith("upcoming_period")) {
      for (const m of Array.from(text.matchAll(/(\d{1,2})\s*(?:세|years?\b|años\b|yrs?\b)|\b(?:age|edad|aged)\s+(\d{1,2})\b/gi))) {
        const n = Number(m[1] ?? m[2]);
        if (!allowedAges.has(n)) problems.push(`${path}: 나이 "${m[0].trim()}"이 '다가오는 대운 시기' 데이터에 없는 숫자`);
      }
    }
  }
  return Array.from(new Set(problems));
}

/** System prompt for the reviewing pass. The report is passed as the user message. */
export function buildReviewPrompt(ctx: ReportContext): string {
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
  return `너는 유료 심층 리포트를 독자에게 내보내기 전에 검수하는 엄격하지만 합리적인 편집자다. 아래 "근거 데이터"와 사용자가 준 리포트(JSON)를 비교해서, **확실히 틀렸거나 규칙을 어긴 곳만** 목록으로 돌려줘라. 살펴봤더니 문제가 아닌 것은 절대 목록에 적지 마라("문제없음"이라고 쓸 거면 아예 빼라). 문제가 없으면 빈 배열이다.

## 의도된 설계 — 문제로 세지 마라
- opening_scene의 구체적인 밤 장면, 그리고 "~님의 요즘은 이런 모습이지 않으신가요"처럼 독자를 직접 부르는 질문은 의도된 문체다(데이터의 패턴에서 그린 장면).
- 독자에게 말을 거는 2인칭, 격려, 시적 은유, 문체 취향, 문장 길이는 문제가 아니다.
- 같은 숫자를 그 언어답게 표기한 것("40세부터 49세까지" ↔ "from age 40 to 49" ↔ "de los 40 a los 49 años")은 문제가 아니다. 다가오는 시기를 확정적인 어조로 쓰는 것도 문체이므로 문제가 아니다.
- upcoming_period_*의 나이·시기 표현은 코드가 검사한다. 보고하지 마라. 나이 숫자가 데이터와 같다면, 그 시기에 어떤 변화가 온다는 서술 자체는 문제가 아니다("아직 안 왔음"을 다시 밝히라고 요구하지 마라).
- 오행의 상생은 목→화→토→금→수→목, 상극은 목→토, 토→수, 수→화, 화→금, 금→목이다. 이 관계를 맞게 말한 문장은 (데이터에 따로 적혀 있지 않아도) 문제가 아니다. 틀리게 말한 것만 보고한다.
- 오행이 동률이면 데이터의 "약한 원소"로 지정된 것을 약하다고 말하는 것은 문제가 아니다. 데이터에 있는 상생 관계를 그대로 풀어 쓴 것도 문제가 아니다.
- 리포트에는 가상 사례(case_*)가 들어 있으나 이 요청에서는 이미 뺐다. 사례에 대해서는 아무것도 말하지 마라.

## 문제로 보고할 것 (이 6가지에 해당할 때만)
1. 근거 없는 사실: 근거 데이터에 없는 구체적 과거 사건(직업, 가족, 연애 상태 등)을 독자의 사실로 단정한다. (숫자·나이·오행 관계는 코드가 따로 검사하니 보고하지 마라.)
2. 겁주기: 건강 악화·사고·죽음·재난·이별·파산에 대한 예측, 의학적 진단, 단정적 부정 예측, 불안을 부추기는 압박.
3. 완전한 일반론: 이 사람의 데이터(수치, 답한 문항, 상담 내용) 어느 것도 언급하지 않아서 누구에게나 붙여 쓸 수 있는 문단.
4. 언어 품질: 이 언어(${locale})에서 명백히 부자연스러운 직역투, 뜻이 모호한 단어, 독자 성별을 드러내는 표현, 말투 불일치(존댓말/반말 혼용), 다른 언어 단어 섞임.
5. 모순: 페이지끼리 사실이 서로 다르다(같은 원소를 어디선 강하다, 어디선 약하다고 함).
6. 메타 발언: 데이터가 없다/지시를 받았다/필드·프롬프트를 언급.

## 근거 데이터
- 닉네임: ${ctx.nickname}
- 오행 분포: ${elementsLine}
- 심리검사 모듈: ${ctx.moduleTitle} / 유형: ${ctx.psychTestTypeTitle} — ${ctx.psychTestTypeHook}
- 심리검사 축: ${dims}
- 심리검사 서술: ${ctx.nuancedSummary}
- 실제 답한 문항: ${answers}
- 상담 내용: ${chat}
- ${describeUpcomingPeriod(ctx.decadeFortune, ctx.currentAge, locale)}

## 출력
JSON 객체 하나만: {"problems":[{"field":"필드 경로(예: strengths[1].body)","issue":"무엇이 왜 문제인지 한 문장, 고쳐야 할 방향 포함"}]}
최대 6개, 가장 중요한 것부터. 확실한 것만 적을 것.`;
}
