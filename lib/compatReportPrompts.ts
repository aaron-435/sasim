/**
 * lib/compatReportPrompts.ts
 * ------------------------------------------------------------------
 * The paid compatibility report ("궁합 상세 리포트", product `compat_report`): how two charts
 * meet, what each brings the other, where they tend to rub and how to handle it, and the
 * rhythm that suits them together. Generated in two halves like the deep report — the free
 * preview (/api/compatReport) and, after a verified purchase, the rest (/api/compatReport/paid).
 *
 * Facts come from the engine only (lib/compatibility.ts, the two element distributions, the two
 * day branches); the model writes prose around them. Rules on top of the year report's:
 * no "bad match" verdicts (명리에 나쁜 궁합은 없다), no reading the other person's mind, no
 * predicting how the relationship ends, no relationship labels the user didn't give (the pair
 * may be partners, friends, family or coworkers). See PRODUCT.md, "Pressure without fear".
 *
 * The other person's name never reaches the server: the model writes the token {other} and the
 * app puts the name (or "that person") in its place.
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";
import type { CompatibilityResult, CompatRelation } from "./compatibility";
import { ELEMENT_LABEL, FIELD_LANGUAGE_NAME, outputLanguageDirective } from "./promptLocale";
import type { ElementKey } from "./sajuType";

export const OTHER_TOKEN = "{other}";

const ELEMENT_KEYS: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

export interface CompatPerson {
  dayMasterElement: ElementKey;
  elements: Record<ElementKey, number> | null;
}

export interface CompatReportContext {
  locale: Locale;
  nickname: string;
  self: CompatPerson;
  other: CompatPerson & { birthTimeKnown: boolean };
  compatibility: CompatibilityResult;
  /** 두 사람 일지(day branch)의 관계. 한쪽이라도 모르면 "none". */
  branchRelation: "hap" | "chung" | "none";
}

/** Free half, as the app sends it back with the paid request so the second half doesn't repeat it. */
export interface CompatFreePart {
  title: string;
  subtitle: string;
  meeting: { heading: string; body: string };
  gifts: { heading: string; body: string };
}

const RELATION_MEANING: Record<CompatRelation, string> = {
  mirror: "두 사람의 타고난 중심 기운이 같은 오행 — 설명 없이 통하는 게 많지만, 같은 지점에서 함께 막히고 같은 사각지대를 공유하기 쉽다",
  selfNurturesOther: "나의 중심 기운이 {other}의 중심 기운을 북돋는 관계 — 내가 주로 채워 주는 쪽이 되기 쉽고, 주는 만큼 지치지 않게 받는 연습이 관건",
  otherNurturesSelf: "{other}의 중심 기운이 나의 중심 기운을 북돋는 관계 — {other} 곁에서 내가 힘을 얻기 쉽고, 받는 것을 당연하게 여기지 않는 것이 관건",
  selfChallengesOther: "나의 중심 기운이 {other}의 기운을 다듬는 관계 — 서로 자극이 되어 성장하게 하지만, 내 방식이 {other}에게 압박으로 느껴질 수 있다",
  otherChallengesSelf: "{other}의 중심 기운이 나의 기운을 다듬는 관계 — {other}이 나를 단단하게 만들지만, 그 방식이 나에게 압박으로 느껴질 수 있다",
};

function branchLine(rel: CompatReportContext["branchRelation"]): string {
  if (rel === "hap") return "두 사람의 생활 리듬(일지)이 합 — 일상에서 자연스럽게 어울려 붙는 결";
  if (rel === "chung") return "두 사람의 생활 리듬(일지)이 충 — 일상의 속도·방식이 부딪혀 서로를 움직이게 하는 결(나쁜 것이 아니라 조율할 거리)";
  return "특별한 관계 없음(언급하지 말 것)";
}

/** Code-derived contrasts between the two distributions — the model may only lean on these. */
export function describeElementContrasts(ctx: CompatReportContext): string[] {
  const s = ctx.self.elements;
  const o = ctx.other.elements;
  if (!s || !o) return ["오행 분포 정보가 한쪽에 없음 — 중심 기운의 관계로만 이야기할 것"];
  const label = (k: ElementKey) => ELEMENT_LABEL[ctx.locale][k];
  const lines: string[] = [];
  for (const k of ELEMENT_KEYS) {
    const a = Math.round(s[k]);
    const b = Math.round(o[k]);
    if (a >= 25 && b <= 10) lines.push(`${label(k)}: 나 ${a}% / {other} ${b}% — 내가 {other}에게 보태 주는 기운`);
    else if (b >= 25 && a <= 10) lines.push(`${label(k)}: 나 ${a}% / {other} ${b}% — {other}이 나에게 보태 주는 기운`);
    else if (a >= 25 && b >= 25) lines.push(`${label(k)}: 나 ${a}% / {other} ${b}% — 둘 다 강한 기운(함께 있으면 더 커지는 쪽)`);
    else if (a <= 10 && b <= 10) lines.push(`${label(k)}: 나 ${a}% / {other} ${b}% — 둘 다 적은 기운(함께 놓치기 쉬운 쪽)`);
  }
  return lines.length ? lines : ["두 분포가 비슷하게 고름 — 특별히 짚을 대비 없음"];
}

function distributionLine(elements: Record<ElementKey, number> | null, locale: Locale): string {
  if (!elements) return "정보 없음";
  return ELEMENT_KEYS.map((k) => `${ELEMENT_LABEL[locale][k]} ${Math.round(elements[k])}%`).join(", ");
}

function dataBlock(ctx: CompatReportContext): string {
  const label = (k: ElementKey) => ELEMENT_LABEL[ctx.locale][k];
  return `- 나(${ctx.nickname})의 중심 기운: ${label(ctx.self.dayMasterElement)}
- {other}의 중심 기운: ${label(ctx.other.dayMasterElement)}
- 두 중심 기운의 관계: ${RELATION_MEANING[ctx.compatibility.relation]}
- 서로를 끌어당기는 특별한 결합: ${ctx.compatibility.stemBond ? "있음(이유 없이 끌리는 힘이 하나 더 붙는 조합)" : "없음(언급하지 말 것)"}
- 일상 리듬: ${branchLine(ctx.branchRelation)}
- 나의 오행 분포: ${distributionLine(ctx.self.elements, ctx.locale)}
- {other}의 오행 분포: ${distributionLine(ctx.other.elements, ctx.locale)}${ctx.other.birthTimeKnown ? "" : " (출생 시간 모름 — 시간에 기대는 해석은 하지 말 것)"}
- 분포 대비(코드 계산):
${describeElementContrasts(ctx).map((l) => `  · ${l}`).join("\n")}`;
}

const NAME_RULES: Record<Locale, string> = {
  ko: `상대방은 이름 대신 반드시 토큰 {other}로만 쓰세요(앱이 이름으로 바꿉니다). {other} 뒤의 조사는 받침이 있는 말처럼 붙이세요: "{other}은", "{other}이", "{other}을", "{other}과", "{other}으로". "님"은 붙이지 마세요(앱이 붙입니다). "그 사람", "상대방" 같은 말로 바꿔 쓰지 마세요.`,
  en: `Refer to the other person only with the token {other} (the app swaps in their name). Never use he/she/him/her for {other}; repeat {other} or use "they" with plural verbs.`,
  es: `Refer to the other person only with the token {other} (the app swaps in their name). Do not use él/ella or any gendered adjective or participle about {other} or the reader; prefer nouns and verbs ("{other} tiene una energía tranquila", not "{other} es tranquilo/a").`,
};

function sharedRules(ctx: CompatReportContext): string {
  return `## 이 리포트의 성격
- 두 사람의 사주가 어떻게 만나는지 읽어 주는 자기이해용 읽을거리입니다. 미래를 맞히는 글이 아닙니다.
- 두 사람이 어떤 사이인지(연인, 친구, 가족, 동료) 모릅니다. 관계를 짐작해 이름 붙이지 말고, 어떤 사이에도 맞는 말로 쓰세요("함께 있을 때", "같이 무언가를 할 때").
- 독자는 사주를 처음 접하는 외국인일 수 있습니다. 일간, 일지, 천간합, 상생, 상극, 격국, 용신, Day Master, Maestro del Día 같은 전문용어와 한자는 쓰지 말고 뜻으로 풀어 쓰세요. 오행 이름(데이터에 쓰인 단어)은 써도 됩니다.

## 근거 데이터 (엔진이 계산한 값 — 이 밖의 사주 사실을 지어내지 말 것)
${dataBlock(ctx)}

## 반드시 지킬 것
1. 나쁜 궁합은 없습니다. "맞지 않는다", "상극이라 어렵다", "나쁜 궁합", "피해야 할 사람", 점수·등급 같은 판정을 쓰지 마세요. 부딪히는 지점은 "서로 다른 리듬"과 "다루는 방법"으로 씁니다.
2. {other}의 마음, 속마음, 의도, 감정을 단정하거나 추측하지 마세요("{other}은 당신을 좋아한다/떠날 것이다/마음이 있을 가능성이 크다" 모두 금지). {other}에 대해서는 타고난 기질과 표현 방식의 경향으로만 말합니다("이런 기운의 사람은 ~하는 편이에요").
3. 관계의 결말이나 시기를 예언하지 마세요(헤어진다, 이어진다, 결혼한다, 돌아온다, 끝난다, 언제 무엇이 일어난다). 관계를 끊으라거나 붙잡으라고 권하지 마세요.
4. 건강·사고·재난·금전 손실 예측, 의학·법률·투자 조언은 쓰지 마세요.
5. 단정 대신 경향과 제안으로 씁니다("~하기 쉬워요", "~해 보면 한결 편해요"). 긴장은 허용되지만 겁주지 마세요.
6. ${ctx.nickname}님은 2인칭으로 부르고, 이름은 리포트 전체에서 두세 번만 자연스럽게 씁니다. 성별을 가정하지 마세요.
7. ${NAME_RULES[ctx.locale]}
8. 데이터 줄의 라벨이나 퍼센트를 나열하지 말고, 퍼센트는 꼭 필요할 때 한두 번만 데이터 그대로 쓰세요. 데이터가 "언급하지 말 것"이라고 한 항목은 쓰지 마세요.`;
}

export function buildCompatFreePrompt(ctx: CompatReportContext): string {
  const outLang = FIELD_LANGUAGE_NAME[ctx.locale];
  const prompt = `당신은 사주(명리)를 자기이해의 도구로 풀어 쓰는 따뜻하고 명료한 작가입니다. ${ctx.nickname}님과 {other}, 두 사람의 궁합 상세 리포트 앞부분(무료 미리보기)을 씁니다.

${sharedRules(ctx)}

## 이번에 쓸 부분
- meeting: 두 사람의 기운이 어떻게 만나는지. (1) 두 중심 기운의 관계가 일상에서 어떤 느낌으로 나타나는지 → (2) 분포 대비에서 가장 뚜렷한 한두 가지 → (3) 둘이 함께 있을 때 생기는 분위기. 3문단, 문단 사이 빈 줄(\\n\\n). 한국어 기준 500~750자(영어·스페인어 100~150단어).
- gifts: 서로에게 주는 것. 첫 문단은 ${ctx.nickname}님이 {other}에게 주는 것, 둘째 문단은 {other}이 ${ctx.nickname}님에게 주는 것, 셋째 문단은 그걸 의식적으로 주고받는 작은 방법 하나. 3문단, 같은 분량.

## 출력 형식 — 아래 키만 가진 JSON 객체 하나. 모든 문자열 값은 ${outLang}로 씁니다.
{
  "title": "리포트 제목 한 줄(12~24자, 두 사람의 만남을 한 이미지로. 판정·점수 없이)",
  "subtitle": "부제 한 줄",
  "meeting": { "heading": "이 장의 제목(짧게)", "body": "본문" },
  "gifts": { "heading": "이 장의 제목(짧게)", "body": "본문" }
}`;
  return (
    prompt +
    outputLanguageDirective(ctx.locale, {
      en: `JSON object (title, subtitle, every heading and body). Keep the {other} token exactly as written`,
      es: `objeto JSON (title, subtitle, cada heading y body). Mantén el token {other} tal cual`,
    })
  );
}

export function buildCompatPaidPrompt(ctx: CompatReportContext, free: CompatFreePart | null): string {
  const outLang = FIELD_LANGUAGE_NAME[ctx.locale];
  const already = free
    ? `\n## 앞부분에 이미 쓴 내용 (반복하지 말고 이어서 쓸 것)\n- 제목: ${free.title}\n- 기운이 만나는 방식: ${free.meeting.body.slice(0, 900)}\n- 서로에게 주는 것: ${free.gifts.body.slice(0, 900)}\n`
    : "";
  const prompt = `당신은 사주(명리)를 자기이해의 도구로 풀어 쓰는 따뜻하고 명료한 작가입니다. ${ctx.nickname}님과 {other}, 두 사람의 궁합 상세 리포트 뒷부분(구매 후 열리는 부분)을 씁니다.

${sharedRules(ctx)}
${already}
## 이번에 쓸 부분
- friction: 부딪히기 쉬운 지점과 다루는 방법, 정확히 3개. 각 항목은 근거 데이터(관계, 일상 리듬, 분포 대비) 중 서로 다른 것에서 나와야 합니다. title은 장면이 떠오르는 짧은 제목(판정 말투 금지, 예: "속도가 엇갈리는 순간"). body는 2문단: 첫 문단은 그 지점이 일상에서 어떻게 보이는지(누구 탓도 아닌 리듬 차이로), 둘째 문단은 둘이 해 볼 수 있는 구체적인 방법 하나. 한국어 기준 항목당 300~450자(영어·스페인어 60~95단어).
- rhythm: 함께하기 좋은 리듬. 두 사람의 기운이 잘 맞물리는 일상의 속도, 함께하면 좋은 활동의 결, 서로 쉬는 방식의 차이를 존중하는 법. 3문단, 문단 사이 빈 줄(\\n\\n), 한국어 기준 500~750자.
- closing: 마무리 2~3문장. 두 사람의 다름이 관계의 재료라는 것을 담담하고 따뜻하게. 결말 예언 없이.

## 출력 형식 — 아래 키만 가진 JSON 객체 하나. 모든 문자열 값은 ${outLang}로 씁니다.
{
  "friction": [ { "title": "짧은 제목", "body": "두 문단" } ],
  "rhythm": { "heading": "이 장의 제목(짧게)", "body": "본문" },
  "closing": "마무리"
}
friction 배열은 정확히 3개여야 합니다.`;
  return (
    prompt +
    outputLanguageDirective(ctx.locale, {
      en: `JSON object (every friction title and body, rhythm heading and body, closing). Keep the {other} token exactly as written`,
      es: `objeto JSON (cada title y body de friction, heading y body de rhythm, closing). Mantén el token {other} tal cual`,
    })
  );
}
