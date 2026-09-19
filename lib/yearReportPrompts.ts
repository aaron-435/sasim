/**
 * lib/yearReportPrompts.ts
 * ------------------------------------------------------------------
 * System prompt for the paid "신년 리포트" (year-ahead report): five life-area chapters,
 * a 12-month timeline and a four-step action plan, all grounded in what the engine already
 * computes for that person and year (lib/yearFortune.ts) — the model writes prose AROUND
 * those facts, it never derives chart facts of its own.
 *
 * Deliberate departures from the "2만 자 풀이" style of prompt that circulates for saju
 * products (2026-09-19 review): no flat predictions ("you will change jobs in the second
 * half"), no health/accident/disaster forecasts, no invented chart terms. Tension is
 * allowed (a stretch that asks you to slow down can be called that), fear is not. See
 * PRODUCT.md, "Pressure without fear".
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";
import type { CompatRelation } from "./compatibility";
import type { MonthFortune, YearFortune } from "./yearFortune";
import { TWELVE_STAGES_CONTENT } from "./twelveStagesContent";
import { ELEMENT_LABEL, FIELD_LANGUAGE_NAME, outputLanguageDirective } from "./promptLocale";
import type { ElementKey } from "./sajuScore";

export interface YearReportContext {
  locale: Locale;
  nickname: string;
  year: number;
  dayMasterChar: string;
  dayMasterElement: ElementKey | null;
  elements: Record<ElementKey, number> | null;
  /** Display name of the person's saju type (e.g. "Oak · Rooted"), already localized. Optional. */
  sajuTypeName: string | null;
  yearFortune: YearFortune;
  months: MonthFortune[];
}

/** What each relation means, in words the model can turn into plain prose. */
const RELATION_MEANING: Record<CompatRelation, string> = {
  mirror: "이 해의 기운이 나와 같은 결 — 익숙하고 편안하지만 새 자극은 적은 흐름",
  selfNurturesOther: "내가 이 해의 기운을 키워 주는 관계 — 표현·생산·베풂이 늘고 에너지 소모도 큰 흐름",
  otherNurturesSelf: "이 해의 기운이 나를 채워 주는 관계 — 도움·배움·회복이 들어오는 흐름",
  selfChallengesOther: "내가 이 해의 기운을 다스리는 관계 — 주도권·재물·성과를 밀어붙이기 좋은 흐름(과욕 주의)",
  otherChallengesSelf: "이 해의 기운이 나를 단련하는 관계 — 책임·압박이 늘지만 속도를 고르면 단단해지는 흐름",
};

function relationOf(result: { compatibility: { relation: CompatRelation } | null }): string {
  return result.compatibility ? RELATION_MEANING[result.compatibility.relation] : "정보 없음";
}

function branchLine(rel: "hap" | "chung" | "none"): string {
  if (rel === "hap") return "지지가 내 일지와 합(어울려 붙는 관계)";
  if (rel === "chung") return "지지가 내 일지와 충(부딪혀 전환이 생기는 관계)";
  return "특이 관계 없음";
}

export function buildYearReportPrompt(ctx: YearReportContext): string {
  const locale = ctx.locale;
  const stages = TWELVE_STAGES_CONTENT[locale];
  const stageName = (i: number) => stages.lifeStages[i]?.name ?? "";
  const sinsalName = (i: number | null) => (i === null ? "정보 없음" : stages.sinsal[i]?.name ?? "정보 없음");

  const elementsLine = ctx.elements
    ? (Object.keys(ctx.elements) as ElementKey[]).map((k) => `${ELEMENT_LABEL[locale][k]} ${Math.round(ctx.elements![k])}%`).join(", ")
    : "정보 없음";

  const y = ctx.yearFortune;
  const monthLines = ctx.months
    .map(
      (m, i) =>
        `${i + 1}. ${m.calendarYear}년 ${m.calendarMonth}월경 — ${relationOf(m)} / 12운성: ${stageName(m.lifeStageIndex)} / 신살: ${sinsalName(m.sinsalIndex)} / 지지 관계: ${branchLine(m.branchRelation)}`
    )
    .join("\n");

  const outLang = FIELD_LANGUAGE_NAME[locale];

  const prompt = `당신은 사주(명리)를 자기이해의 도구로 풀어 쓰는 따뜻하고 명료한 작가입니다. ${ctx.nickname}님을 위한 ${ctx.year}년 신년 리포트를 씁니다.

## 이 리포트의 성격
- 오락과 자기이해를 위한 읽을거리입니다. 미래를 "맞히는" 글이 아니라, 이 해의 흐름에서 어떤 경향이 있고 그때 무엇을 하면 편했는지를 알려주는 글입니다.
- 독자는 사주 배경지식이 없는 외국인일 수 있습니다. 일간, 격국, 용신, 십성 같은 전문용어는 쓰지 말고, 쓰더라도 쉬운 말로 풀어서만 쓰세요.

## 근거 데이터 (엔진이 계산한 값 — 이 밖의 사주 사실을 지어내지 말 것)
- 대상 해: ${ctx.year}년 (기운: ${y.yearMaster.char}, 오행 ${ELEMENT_LABEL[locale][elementKeyOf(y.yearMaster.element)]})
- 나의 중심 기운(일간): ${ctx.dayMasterChar}${ctx.dayMasterElement ? ` (${ELEMENT_LABEL[locale][ctx.dayMasterElement]})` : ""}
- 나의 오행 분포: ${elementsLine}
- 나의 사주 유형: ${ctx.sajuTypeName ?? "정보 없음"}
- 이 해와 나의 관계: ${relationOf(y)}
- 이 해의 지지 관계: ${branchLine(y.branchRelation)}
- 이 해의 12운성: ${stageName(y.lifeStageIndex)} / 신살: ${sinsalName(y.sinsalIndex)}

## 12개월 흐름 (입춘 무렵인 2월경부터 시작, 순서 그대로 months 배열에 1:1로 대응)
${monthLines}

## 작성 규칙 (반드시 지킬 것)
1. 단정 금지. "~할 것이다", "~하게 된다" 대신 "~하기 좋은 흐름이에요", "~하는 편이 편했어요"처럼 경향과 제안으로 쓰세요.
2. 절대 쓰지 말 것: 건강 악화·사고·죽음·재난·이별·파산에 대한 예측, 의학·법률·투자 조언, 특정 시점의 이직/결혼/이혼/투자 성공 확언.
3. 긴장감은 허용됩니다. "속도를 늦추는 편이 좋은 시기", "한 번 더 확인하면 좋은 시기"처럼 부드럽게 쓰되, 겁을 주는 표현은 쓰지 마세요.
4. 각 분야 챕터는 (1) 이 해의 흐름이 이 분야에 뜻하는 것 → (2) 일상에서 마주칠 만한 구체적 장면 → (3) 작게 시작할 수 있는 실행 제안 순서로, 3문단, 문단 사이는 빈 줄(\\n\\n)로 구분하세요. 분량은 한국어 기준 700~1000자(영어·스페인어는 130~190단어)를 목표로 하되, 근거 데이터가 말하는 것보다 부풀리지 마세요.
5. 월별 항목은 각 달의 관계·12운성·지지 관계에 충실하게 쓰고, 12개월이 서로 같은 문장으로 반복되지 않게 하세요. 각 달 headline은 8~16자(영어는 3~6단어)의 짧은 제목, body는 1~2문장입니다.
6. 실행 계획(action_plan)은 정확히 4개: 2~4월경, 5~7월경, 8~10월경, 11월~다음해 1월경. 각각 지켜볼 흐름과 해볼 행동 하나씩을 구체적으로 제안하세요.
7. ${ctx.nickname}님을 자연스럽게 한두 번 부르되 과하게 반복하지 마세요. 성별을 가정하지 마세요.
8. 오행 분포와 사주 유형이 있으면 분야 챕터에 한두 번 자연스럽게 연결하세요(없으면 무시).

## 출력 형식 — 아래 키만 가진 JSON 객체 하나. 모든 문자열 값은 ${outLang}로 씁니다.
{
  "title": "리포트 제목 한 줄 (예: '${ctx.year}, 당신의 리듬을 읽는 한 해' 같은 스타일, 12~24자)",
  "subtitle": "부제 한 줄",
  "overview": "이 해 전체의 흐름 총론. 2~3문단, 문단 사이 빈 줄(\\n\\n)",
  "chapters": {
    "wealth": { "heading": "재물 챕터 제목", "body": "본문" },
    "love": { "heading": "관계·연애 챕터 제목", "body": "본문" },
    "career": { "heading": "일·커리어 챕터 제목", "body": "본문" },
    "study": { "heading": "배움 챕터 제목", "body": "본문" },
    "health": { "heading": "몸과 마음 돌봄 챕터 제목(의학적 언급 없이 생활 리듬 중심)", "body": "본문" }
  },
  "months": [ { "headline": "짧은 제목", "body": "1~2문장" } ],
  "action_plan": [ { "title": "구간 제목", "body": "지켜볼 흐름과 해볼 행동" } ],
  "closing": "마무리 한 문단(따뜻하게, 2~3문장)"
}
months 배열은 정확히 12개, action_plan 배열은 정확히 4개여야 합니다.`;

  return (
    prompt +
    outputLanguageDirective(locale, {
      en: `JSON object (title, subtitle, overview, every chapter heading and body, every months headline and body, every action_plan title and body, closing)`,
      es: `objeto JSON (title, subtitle, overview, cada heading y body de los capítulos, cada headline y body de months, cada title y body de action_plan, closing)`,
    })
  );
}

function elementKeyOf(hanjaOrKey: string): ElementKey {
  const map: Record<string, ElementKey> = { 목: "wood", 화: "fire", 토: "earth", 금: "metal", 수: "water", wood: "wood", fire: "fire", earth: "earth", metal: "metal", water: "water" };
  return map[hanjaOrKey] ?? "wood";
}
