/**
 * lib/reportPrompts.ts
 * ------------------------------------------------------------------
 * System prompt builder for the GPT-generated deep report. Same reason
 * this is split from lib/report.ts as lib/chatPrompts.ts is from
 * lib/chat.ts: prompt wording changes shouldn't touch the API-calling code.
 *
 * 2026-09-09 — why this exists: ReportScreen.jsx used to hardcode the
 * entire narrative body as Module 3 (번아웃) copy, regardless of which of
 * the 11 modules the user actually ran (see git history). Writing all 11
 * modules × outcome combinations by hand isn't practical, so the literary
 * sections are generated per-request instead, using the original hand-written
 * Module 3 report (see MODULE3_STYLE_EXCERPT below) as a style/quality
 * anchor — same "give it a real example, not just a description" approach
 * that worked for the chat's tone.
 *
 * What stays hardcoded (NOT covered here): the 오행 bars, the psych-test
 * dimension bars, and the "직접 나눈 이야기" chat-quote block are already
 * fully data-driven in ReportScreen.jsx and don't need GPT — only the
 * literary prose slotted around them does.
 * ------------------------------------------------------------------
 */

import type { ElementKey } from "./sajuScore";
import type { ChatExtract } from "./chat";
import type { Locale } from "./i18n/types";
import { ELEMENT_LABEL, FIELD_LANGUAGE_NAME, outputLanguageDirective } from "./promptLocale";

const ELEMENT_HANJA: Record<ElementKey, string> = {
  wood: "목", fire: "화", earth: "토", metal: "금", water: "수",
};

// 상생(相生) 순환: 목생화 → 화생토 → 토생금 → 금생수 → 수생목 → (다시 목)
const GENERATES: Record<ElementKey, ElementKey> = {
  wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood",
};

function generatorOf(key: ElementKey): ElementKey {
  return (Object.keys(GENERATES) as ElementKey[]).find((k) => GENERATES[k] === key)!;
}

const HANJA_TO_ELEMENT_KEY: Record<string, ElementKey> = {
  목: "wood", 화: "fire", 토: "earth", 금: "metal", 수: "water",
};

export interface ReportDecadeFortuneEntry {
  startAge: number;
  skyElement: string; // "화"/"목"/... — see lib/manseryeok.ts's DecadeFortuneEntry
  earthElement: string;
}

export interface ReportDecadeFortune {
  direction: "순행" | "역행";
  startAge: number;
  list: ReportDecadeFortuneEntry[];
}

/** Picks the NEXT decade-fortune period strictly after the user's real current age (never
 * the one they're already in, and never one already fully passed) and returns one ready-to-
 * use Korean data line naming its exact age range and element — handed to the model as a
 * fact to restate, not something it derives itself. 2026-09-14: added after a user caught a
 * forecast example describing an age range that had already passed for the sample age used —
 * computing this in code (instead of letting the model reason over the raw decadeFortune
 * list) is what makes that class of error structurally impossible instead of just instructed
 * against. Returns a "no data" line (not null) so buildReportPrompt always has a data line to
 * insert without extra branching, and the accompanying prompt rule tells the model exactly
 * how to handle that case (no invented ages). */
function describeUpcomingPeriod(
  decadeFortune: ReportDecadeFortune | null | undefined,
  currentAge: number | undefined,
  locale: Locale
): string {
  const list = decadeFortune?.list;
  if (!list?.length || currentAge == null) {
    return "다가오는 대운 시기: 정보 없음 — 구체적인 나이 숫자를 절대 만들어내지 말고, 나이를 언급하지 않는 일반적인 흐름으로만 서술할 것";
  }
  let currentIdx = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].startAge <= currentAge) currentIdx = i;
  }
  const next = list[currentIdx + 1];
  if (!next) {
    return "다가오는 대운 시기: 제공된 데이터 범위를 벗어남 — 구체적인 나이 숫자를 절대 만들어내지 말고, 나이를 언급하지 않는 일반적인 흐름으로만 서술할 것";
  }
  const after = list[currentIdx + 2];
  const elementKey = HANJA_TO_ELEMENT_KEY[next.earthElement] ?? HANJA_TO_ELEMENT_KEY[next.skyElement];
  const elementLabel = elementKey ? ELEMENT_LABEL[locale][elementKey] : next.earthElement;
  const ageRange = after ? `${next.startAge}세부터 ${after.startAge - 1}세까지` : `${next.startAge}세부터`;
  return `다가오는 대운 시기: ${ageRange}, ${elementLabel} 기운이 강해지는 시기 (현재 만 ${currentAge}세 기준 — 이 시기는 아직 오지 않았음. upcoming_period_body에서 나이를 언급할 때 반드시 이 숫자 그대로만 쓸 것, 임의로 바꾸거나 다른 나이대를 지어내지 말 것)`;
}

/** Names which element generates `weakKey`, in a form the model can use
 * directly without translating anything itself. ko keeps the compact hanja
 * form ("금생수") matching existing Korean convention; en/es spell out both
 * element names using the exact same words as ELEMENT_LABEL (and therefore
 * the same words already on screen in the element bars), removing any
 * chance the model picks a different translation for the relationship than
 * it did a few lines earlier for the bare element names. */
function buildGeneratorRelationLabel(locale: Locale, weakKey: ElementKey): string {
  const generatorKey = generatorOf(weakKey);
  if (locale === "ko") return `${ELEMENT_HANJA[generatorKey]}생${ELEMENT_HANJA[weakKey]}`;
  return `${ELEMENT_LABEL[locale][generatorKey]} → ${ELEMENT_LABEL[locale][weakKey]}`;
}

export interface ReportDimensionResult {
  dimension: string;
  direction: "high" | "low";
  percentOfMax: number;
  intensity: string;
}

/** One dimension's single highest-scoring (most extreme) literal quiz answer — computed
 * client-side via lib/quiz/quizProfile.ts's findTopAnswers(), not by the model. Handed over
 * so the model can write one real sentence ABOUT this specific answer instead of the report
 * just displaying the bare question/answer pair with no interpretation (2026-09-14, user
 * feedback: showing the raw Q&A alone felt flat). */
export interface ReportTopAnswer {
  dimension: string;
  dimensionLabel: string;
  prompt: string;
  label: string;
}

export interface ReportContext {
  nickname: string;
  track: "romance" | "career";
  elements: Record<ElementKey, number>;
  moduleTitle: string;
  psychTestTypeTitle: string;
  psychTestTypeHook: string;
  dimensionResults: ReportDimensionResult[];
  dimensionShortNames: Record<string, string>;
  nuancedSummary: string;
  /** One entry per psych-test dimension (see ReportTopAnswer), ordered by how prominent
   * that dimension is — the same order answer_notes must be returned in. */
  topAnswers?: ReportTopAnswer[];
  /** Present when the user completed the free chat; absent for a report generated without it. */
  chatExtract?: ChatExtract | null;
  /** From /api/saju (CityScreen path) or recomputed at redemption time (VerifyCode path) —
   * see mobile/lib/saju.ts. Absent only for pre-2026-09-14 sessions with no stored birthdate;
   * describeUpcomingPeriod() degrades to a no-ages fallback in that case. */
  decadeFortune?: ReportDecadeFortune | null;
  currentAge?: number;
  /** User's app locale. Defaults to "ko" when absent — same convention as
   * ChatSessionContext.locale in chatPrompts.ts. */
  locale?: Locale;
}

// A trimmed excerpt of the original hand-written Module 3 report (see git
// history for components/ReportScreen.jsx pre-2026-09-09) — not the full
// text, just enough to anchor tone: literary but grounded, short sentences,
// no therapy-speak, saju terms used precisely (원소 이름, 상생 관계 같은 용어를
// 정확히 씀), every claim tied back to the actual data instead of floating
// generalities.
const STYLE_EXCERPT = `
## 문체 예시 (실제로 좋은 평가를 받았던 기존 리포트에서 발췌 — 이 톤과 밀도를 그대로 따라갈 것)

"몸은 이미 하루치 연료를 다 써버렸는데, 머리는 좀처럼 꺼지지 않습니다. 침대에 누워도
손은 자꾸 화면을 켜고, 내일 할 일들이 순서 없이 떠올랐다 사라지기를 반복합니다.
오늘도 꽤 많은 걸 해냈을 텐데 — 정작 그 하루가 손에 잡히는 느낌은 별로 없습니다."

"B씨는 사업을 시작한 뒤로 늘 '남들보다 두 배는 해야 겨우 본전'이라는 마음으로
일했습니다. 성과는 나쁘지 않았지만, 정작 스스로는 그걸 성과라고 느낀 적이 거의
없었습니다."

"화는 표현력, 열정, 추진력을 상징하는 원소입니다. 다만 과다할 경우 에너지가
오래 지속되기보다 짧고 강렬하게 소모되는 패턴을 보이기 쉽습니다."

"화(火) 과다는 심리검사의 '소진' 결과와 정확히 맞물립니다. 에너지가 없어서가 아니라,
너무 많이 써서 지친 쪽입니다."

이 예시들의 공통점: (1) 추상적 조언이 아니라 구체적 장면 묘사로 시작한다 (2) 사주
용어를 뭉뚱그리지 않고 정확히 쓴다 (3) 심리검사 결과와 사주 해석을 "우연히 같은
얘기를 하고 있다"는 식으로 명시적으로 연결한다 (4) 문장이 짧고 리듬감 있다 —
한 문장에 두 가지 이상의 생각을 욱여넣지 않는다.
`.trim();

// 2026-09-14 확장: 한 필드 = 한 페이지 원칙으로 전면 개편 (13개 섹션을 스크롤하던 것에서
// 페이지 넘김 방식으로 바뀜에 따라 — 각 필드는 이제 화면 한 장에 표시되므로 길게 늘어지면
// 안 되고, 대신 다루는 주제 자체를 오행 5개 개별 분석·다가오는 시기 전망처럼 실제로 늘렸다).
// saju_dominant_*/saju_weak_* 두 쌍은 element_readings 하나로 통합(5개 전부 다루면서 중복 제거).
/** answer_notes' array-length rule has to name the exact count, so the schema is built per
 * request instead of being one static string — see ReportTopAnswer's header comment for why
 * this field exists at all (a literal Q&A pair alone read as flat with no interpretation). */
function buildOutputSchema(topAnswerCount: number): string {
  const answerNotesField =
    topAnswerCount > 0
      ? `,
  "answer_notes": ["실제로 답한 문항 각각에 대한 해설 — 정확히 ${topAnswerCount}개, 아래 '실제로 답한 문항들' 데이터에 나온 순서 그대로. 그 문항의 질문과 답을 다시 반복하지 말고, 그 특정 답이 이 사람의 어떤 면을 보여주는지 1문장으로 짚을 것 — 그 원소/오행 이야기가 아니라 심리테스트 축 이름과 연결해서 설명"]`
      : "";
  return `
{
  "title_line1": "리포트 제목 1행 — 시적이고 은유적, 이 사람의 핵심 패턴을 압축",
  "title_line2": "리포트 제목 2행 — 1행과 이어지는 한 문장",
  "subtitle": "부제 — '~ 심층 리포트 — 사주 × 심리검사 × 상담 통합' 형식, 모듈명을 자연스럽게 녹여서. 모듈 번호는 아래 데이터의 '심리테스트 모듈' 값에 나온 숫자·표기 그대로 쓰고, '삼'/'사' 같은 한글 숫자로 풀어 쓰지 말 것 (예: '모듈 3', '모듈 9'처럼 아라비아 숫자 그대로)",
  "opening_scene": "'어느 밤의 장면' 섹션 본문. 2~3문장, 화면 한 장 분량. 이 사람의 실제 패턴(dimensionResults, chatExtract)에서 나온 구체적 장면으로 시작해서, 마지막 문장에서 '{nickname}님의 요즘은 이런 모습이지 않으신가요' 식으로 직접 부른다.",
  "case_tag": "'CASE — [가명]씨, [연령대], [상황]' 형식의 짧은 태그",
  "case_paragraphs": ["가상의 닮은 사례 정확히 3문단, 배열 원소 3개. 각 문단은 화면 한 장 분량(2~3문장)이라 따로따로 읽혀도 되게 쓸 것. 1문단: 이 사람과 비슷한 패턴을 겪는 가상 인물의 상황 소개(실존 인물처럼 보이지 않게 가명 사용). 2문단: 그 인물이 그 패턴 때문에 실제로 겪은 구체적 어려움. 3문단: 그 인물의 사주도 이 사람과 비슷한 원소 불균형을 가졌다고 연결."],
  "element_readings": {
    "설명": "다섯 원소 각각에 대한 짧은 해설 — 반드시 wood/fire/earth/metal/water 다섯 키 전부 채울 것, 하나도 빠뜨리지 말 것. 아래 데이터의 '오행 분포'에서 퍼센트가 가장 높은 원소(우세 원소)와 가장 낮은 원소(약한 원소)는 특별 취급하고, 나머지 세 개는 그보다 짧고 담백하게 쓴다.",
    "wood": {"heading": "'목(木) [과다/보통/결핍 중 실제 수치에 맞는 표현] — 한 줄 은유' 형식", "body": "이 사람의 목 기운 수치에 대한 해설. 우세 원소면 1~2문장으로 과다할 때의 패턴을, 약한 원소면 1~2문장으로 그 결핍과 아래 데이터에 명시된 상생 관계 딱 하나만 언급, 그 외의 원소면 1문장으로 담백하게"},
    "fire": {"heading": "화(火)에 대해 위와 같은 형식", "body": "위와 같은 기준"},
    "earth": {"heading": "토(土)에 대해 위와 같은 형식", "body": "위와 같은 기준"},
    "metal": {"heading": "금(金)에 대해 위와 같은 형식", "body": "위와 같은 기준"},
    "water": {"heading": "수(水)에 대해 위와 같은 형식", "body": "위와 같은 기준"}
  },
  "upcoming_period_heading": "'다가오는 시기' 섹션 소제목 — 아래 데이터의 '다가오는 대운 시기' 줄에 나온 나이대와 원소를 반드시 그대로 반영해서, 예를 들면 '32세부터, 물의 계절이 옵니다' 같은 형식으로. 그 줄이 '정보 없음'이면 나이 없이 '다가오는 흐름' 정도의 일반적인 제목",
  "upcoming_period_body": "1~2문장. 아래 '다가오는 대운 시기' 데이터에 근거해서, 그 시기에 어떤 변화나 기회가 자연스럽게 따라오는지 서술. 나이 숫자는 그 데이터 줄에 있는 그대로만 쓰고 절대 새로 만들어내지 말 것 — 정보가 없다고 나오면 숫자 없이 일반적인 흐름으로만 쓸 것. 이미 지난 시기를 다루지 말고 반드시 앞으로 올 시기만 다룰 것.",
  "cross_analysis_quotes": ["우세 원소와 심리검사 주요 축을 명시적으로 연결하는 인용구 스타일 문장 1개", "약한 원소와 심리검사의 다른 축을 연결하는 문장 1개"]${answerNotesField},
  "psychology_fact_heading": "이 사람의 패턴과 관련된 실제 심리학 개념/이론/연구자 이름을 정확히 인용한 소제목. 화면에 이미 '잠깐, 심리학 상식 하나'라는 라벨이 따로 표시되므로 그 문구를 다시 쓰지 말 것 — 개념 이름 자체로 시작 (예: '볼비와 불안-회피 애착')",
  "psychology_fact_body": "그 개념을 1~2문장으로 정확하게 설명하고 이 사람 패턴과 연결",
  "psychology_takeaway": "한 문장짜리 핵심 요약. 화면에 이미 '기억할 한 가지 ·' 라벨이 따로 붙으므로 '기억할 한 가지' 같은 말을 반복하지 말고 바로 요약 문장으로 시작",
  "strengths": [{"title": "강점 제목 (2~6자)", "body": "1문장 설명 — 이 배열 항목은 정확히 4개, 각 항목이 화면 한 장씩 차지함"}],
  "weaknesses": [{"title": "취약점 제목 (2~8자)", "body": "1문장 설명 — 이 배열 항목도 정확히 4개"}],
  "fit_good": "이 사람에게 맞는 환경/일 스타일 1문장",
  "fit_bad": "이 사람이 피해야 할 환경/일 스타일 1문장",
  "behavior_guides": [{"title": "행동지침 제목 (2~10자)", "body": "구체적 실천 방법 1문장 — 이 배열 항목도 정확히 4개"}],
  "mindset_guide": "사고방식 전환 조언 2~3문장 — 은유를 하나 써서. 화면 한 장 분량으로, 문장을 짧게 끊어서",
  "closing_title": "마무리 섹션 소제목 — 짧고 여운 있게",
  "closing_body": "마무리 문단 1~2문장 — 희망적이되 과장하지 않게"
}
`.trim();
}

export function buildReportPrompt(context: ReportContext): string {
  const locale: Locale = context.locale ?? "ko";
  const elementsLine = (Object.keys(context.elements) as ElementKey[])
    .map((k) => `${ELEMENT_LABEL[locale][k]} ${Math.round(context.elements[k])}%`)
    .join(", ");

  const sortedElements = (Object.keys(context.elements) as ElementKey[]).sort(
    (a, b) => context.elements[b] - context.elements[a]
  );
  const dominantKey = sortedElements[0];
  const weakKey = sortedElements[sortedElements.length - 1];
  const weakGeneratorRelation = buildGeneratorRelationLabel(locale, weakKey);
  const upcomingPeriodLine = describeUpcomingPeriod(context.decadeFortune, context.currentAge, locale);

  const dimensionLines = context.dimensionResults
    .map((r) => `${context.dimensionShortNames[r.dimension] ?? r.dimension}: ${r.direction === "high" ? "높음" : "낮음"} (${Math.round(r.percentOfMax)}%, ${r.intensity})`)
    .join("; ");

  const topAnswersLine = context.topAnswers?.length
    ? context.topAnswers.map((a, i) => `[${i + 1}] ${a.dimensionLabel} — "${a.prompt}" → "${a.label}"`).join(" / ")
    : null;

  const chatSection = context.chatExtract
    ? `
## 상담 대화에서 나온 실제 내용 (있으면 반드시 opening_scene, cross_analysis_quotes, strengths/weaknesses 중 자연스러운 곳에 구체적으로 녹여 쓸 것 — 일반론으로 흘리지 말 것)
- 핵심 고민: ${context.chatExtract.primary_concern}
- 감정 상태: ${context.chatExtract.emotional_state}
- 촉발 사건: ${context.chatExtract.trigger_point}
- 반복 패턴: ${context.chatExtract.repeat_pattern ?? "(없음)"}
- 핵심 두려움/의미: ${context.chatExtract.core_fear_or_meaning}
- 종합 요약: ${context.chatExtract.integrated_summary}
`.trim()
    : "## 상담 대화 없음 — 사주와 심리검사 결과만으로 작성할 것";

  return `
너는 "Fatesaid"의 유료 심층 리포트를 쓰는 작가다. 사주(四柱)와 심리검사 결과를 결합해서,
한 사람만을 위한 것처럼 느껴지는 리포트를 쓴다. 절대 일반론을 나열하지 않는다 — 아래
데이터에 있는 구체적 수치와 사실만 근거로 쓴다.

${STYLE_EXCERPT}

## 절대 규칙
1. 모든 문장은 아래 데이터(오행 분포, 심리검사 결과, 상담 내용)에 실제로 근거해야 한다.
   데이터에 없는 사건이나 진단을 지어내지 마라 (case_paragraphs의 가상 인물 사례는 예외 —
   단, 그 인물의 패턴이 이 사람의 실제 데이터와 명확히 대응해야 한다).
2. 의학적·심리학적 "진단"으로 읽히는 단정적 표현("당신은 ○○장애입니다" 등)은 금지.
   전문적 심리상담이나 의료를 대체하지 않는 참고 자료라는 톤을 유지한다.
3. element_readings의 약한 원소 항목에서 상생 관계를 언급할 때는 아래 데이터에 명시된
   "약한 원소를 채워주는 유일한 상생 관계" 하나만 근거로 쓴다. 그 외의 상생相生·상극相剋
   관계를 직접 골라 지어내지 마라 — 관련 없는 원소 쌍의 관계(예: 약한 원소가 목인데
   화생토를 언급하는 것)를 섞으면 안 된다. 데이터의 관계 표기(예: "금생수")는 어떤 관계인지
   알려주는 식별용 표기일 뿐, 문장에 그대로 삽입할 구절이 아니다 — 지금 쓰는 언어에서
   자연스럽게 읽히는 문장으로 풀어서 설명할 것 (예: "이 두 원소는 서로를 살려주는 관계다"
   같은 자연스러운 서술로, "A generates B" 같은 어색한 절 형태를 문장 중간에 그대로
   끼워넣지 말 것).
4. track이 "career"면 일·커리어 맥락으로, "romance"면 관계·연애 맥락으로 사례와 환경
   조언을 맞춘다.
5. 반드시 아래 JSON 스키마와 정확히 일치하는 객체 하나만 출력한다 (다른 텍스트 금지).
   스키마의 큰따옴표 안 한국어 문장은 그 필드에 어떤 내용을 채워야 하는지 알려주는 설명일 뿐이다 —
   그 설명 문장 자체를 (번역해서든 원문 그대로든) 필드 값으로 쓰면 절대 안 된다. 반드시 그 설명에 맞는
   완전히 새로운 문장을 직접 창작해서 넣어라. 예를 들어 "title_line1" 필드에 "리포트 제목 1행 —
   시적이고 은유적, 이 사람의 핵심 패턴을 압축"이라는 설명이 있다면, 이 설명을 그대로 옮기거나
   번역하지 말고, 이 사람의 실제 데이터에 맞는 시적인 제목을 새로 지어서 넣어야 한다.
6. 모든 필드의 문장은 반드시 ${FIELD_LANGUAGE_NAME[locale]}로만 작성한다 — 그 외 다른 언어나 문자가 단어 사이에 섞여 나오면 안 된다.
7. upcoming_period_heading/upcoming_period_body에서 나이를 언급할 때는 아래 데이터의
   "다가오는 대운 시기" 줄에 적힌 숫자만 그대로 쓴다. 그 줄을 스스로 계산하거나, 다른
   나이대를 추측하거나, 이미 지난 시기를 다가올 시기처럼 쓰지 마라 — 그 줄이 "정보 없음"
   이나 "범위를 벗어남"이라고 하면 숫자를 아예 언급하지 말고 일반적인 흐름으로만 쓴다.
8. 모든 문장은 표준 맞춤법과 띄어쓰기(${FIELD_LANGUAGE_NAME[locale]}의 표준 정서법)를
   정확히 지켜서 쓴다 — 붙여쓰기·오탈자 없이. 이 리포트는 이제 한 필드가 화면 한 장에
   표시되므로, 필드마다 2~4개의 짧고 명확한 문장으로 끊어 쓰고 한 문장에 여러 생각을
   욱여넣지 않는다 — 문장이 길어지면 마침표로 끊어서 여러 문장으로 나눌 것.
9. answer_notes는 아래 "실제로 답한 문항들" 데이터에 있는 항목 순서와 정확히 같은
   순서·개수로 작성한다. 각 노트는 그 문항의 질문이나 답을 그대로 되풀이하지 말고 —
   화면에 질문과 답은 이미 그대로 표시되므로 반복하면 중복이다 — 그 답이 이 사람에
   대해 무엇을 보여주는지 새로운 관점 하나를 짚는다.

## 이번 리포트의 데이터
- 닉네임: ${context.nickname}
- track: ${context.track}
- 사주 오행 분포: ${elementsLine}
- 우세 원소: ${ELEMENT_LABEL[locale][dominantKey]} / 약한 원소: ${ELEMENT_LABEL[locale][weakKey]}
- 약한 원소(${ELEMENT_LABEL[locale][weakKey]})를 채워주는 유일한 상생 관계: ${weakGeneratorRelation} — element_readings의 약한 원소 항목에서 이것만 쓸 것
- ${upcomingPeriodLine}
- 심리테스트 모듈: ${context.moduleTitle}
- 심리테스트 유형: ${context.psychTestTypeTitle} — ${context.psychTestTypeHook}
- 심리테스트 세부 축: ${dimensionLines}
- 심리테스트 서술: ${context.nuancedSummary}
${topAnswersLine ? `- 실제로 답한 문항들 (answer_notes는 이 순서 그대로): ${topAnswersLine}` : ""}

${chatSection}

## 출력 스키마
${buildOutputSchema(context.topAnswers?.length ?? 0)}
${outputLanguageDirective(locale, { en: "the JSON schema above", es: "esquema JSON anterior" })}
`.trim();
}
