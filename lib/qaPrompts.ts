/**
 * lib/qaPrompts.ts
 * ------------------------------------------------------------------
 * System prompt builder for the question-bank Q&A chat (components/
 * QAChat.jsx) — the Yodha-inspired "pick a question, get a personalized
 * answer" flow, separate from the Layer 3 상담 챗봇 (lib/chatPrompts.ts,
 * open-ended free text, report-building). This one takes one fixed
 * question from lib/questionBank.json plus the user's own saju result
 * and returns a single personalized answer.
 *
 * Mirrors the SAZU v2 API's own guide+glossary pattern seen while
 * benchmarking it (2026-09-03): dump the structured saju data into the
 * prompt as ground truth, then explicitly forbid inventing anything
 * beyond it. Grounding answers in real calculated data (not generic
 * fortune-cookie text) is the whole point of the KASI-based brand
 * narrative — a hallucinated detail here undercuts that directly.
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";
import type { ElementKey } from "./sajuScore";
import { CRISIS_RESOURCES, ELEMENT_LABEL, FIELD_LANGUAGE_NAME, outputLanguageDirective } from "./promptLocale";

function isElementKey(key: string): key is ElementKey {
  return key === "wood" || key === "fire" || key === "earth" || key === "metal" || key === "water";
}

/** /api/saju's `elements`/`dominantElement` are raw ElementKey strings
 * ("wood", "fire", ...) regardless of locale — translate them to the exact
 * words the rest of the app already uses (mobile's element bars, the report,
 * the chat) so the model isn't left to independently re-derive "Madera" or
 * "Wood" from scratch and risk picking a different word each time. */
function localizeElementKeys<T>(value: T, locale: Locale): T {
  if (Array.isArray(value)) return value.map((v) => localizeElementKeys(v, locale)) as unknown as T;
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        isElementKey(k) ? ELEMENT_LABEL[locale][k] : k,
        v,
      ])
    ) as T;
  }
  if (typeof value === "string" && isElementKey(value)) return ELEMENT_LABEL[locale][value] as unknown as T;
  return value;
}

export interface QAContext {
  nickname: string;
  question: string;
  /** Passed through as-is from /api/saju's response — fourPillars/elements/decadeFortune/summary shapes are engine internals, not re-typed here. */
  sajuResult: {
    elements?: unknown;
    dominantElement?: unknown;
    fourPillars?: unknown;
    decadeFortune?: unknown;
    summary?: unknown;
  };
  /** User's app locale. Defaults to "ko" when absent — same convention as
   * ChatSessionContext.locale in chatPrompts.ts. Note: the question text
   * itself stays whatever language it was asked in (mobile's question bank
   * is Korean-only for now) — this only affects the language of the answer. */
  locale?: Locale;
}

export function buildQASystemPrompt(ctx: QAContext): string {
  const locale: Locale = ctx.locale ?? "ko";
  const dataBlock = JSON.stringify(
    {
      오행분포: localizeElementKeys(ctx.sajuResult.elements, locale),
      우세오행: localizeElementKeys(ctx.sajuResult.dominantElement, locale),
      사주명식: ctx.sajuResult.fourPillars,
      대운: ctx.sajuResult.decadeFortune,
      요약: ctx.sajuResult.summary,
    },
    null,
    2
  );

  return `당신은 Fatesaid의 사주 전문가입니다. Fatesaid는 한국에서 온 사주 전문가와 심리 전문가로 이루어진 팀이 만든 서비스이고, 답변은 아래 실제로 계산된 사주 데이터에 근거해야 합니다.

## ${ctx.nickname}님의 사주 데이터 (KASI 공공데이터 기반 자체 엔진으로 계산된 실제 값)
${dataBlock}

## 규칙 (반드시 전부 지킬 것)
1. 위 데이터에 없는 사실을 지어내지 마세요. 특히 구체적인 생김새, 실명, 정확한 달력 날짜처럼 데이터에 근거 없는 디테일은 절대 만들어내지 마세요. 오행/사주명식/대운 데이터가 뒷받침하는 범위 안에서만 해석하세요.
2. ${ctx.nickname}님의 질문에 대해 3~4문단, 친근하지만 신뢰감 있는 존댓말 톤으로 답하세요. 각 문단은 그 자체로 완결된 메시지가 되도록 쓰세요 — 메신저로 여러 번 나눠 보내는 것처럼요.
3. 가능하면 대운(decadeFortune) 데이터를 활용해 구체적인 시기나 흐름을 언급하세요. 단, 위 데이터의 "정미"/"병오" 같은 원본 갑자(干支) 이름이나 한자는 절대 그대로 인용하지 마세요 — "24세 무렵부터 34세까지는 화 기운이 강해지는 시기" 처럼 나이대와 오행 변화로만 풀어서 설명하세요 (이 예시 문장은 스타일 참고용일 뿐이니 그대로 베끼지 말고, 실제 답변 언어로 새로 작성할 것). 갑자 이름은 일반 사용자에게 아무 의미가 없는 전문용어입니다.
3.5. 위 데이터의 "요약"(dayMaster, elementBalance 등) 필드도 마찬가지로 전문 용어다 — "일간(Day Master)", "격국", "용신" 같은 사주 전문 용어 이름을 답변에 그대로 노출하지 마세요. 사용자는 사주에 대한 배경지식이 전혀 없는 외국인일 수 있다는 걸 항상 염두에 두고, 그 용어가 가리키는 실제 의미(예: 일간은 "이 사람의 타고난 중심 기운/성향")만 쉬운 말로 자연스럽게 풀어서 설명하세요.
4. 의료·법률·재정적 판단의 근거로 오해될 수 있는 단정적 표현("반드시 ~이다", "~하면 안 된다" 같은 절대적 명령)은 피하세요.
5. 자해·자살 등 위기 신호가 질문에 담겨 있다면, 사주 해석 대신 ${CRISIS_RESOURCES[locale]}를 안내하는 짧고 진지한 문단으로만 (${FIELD_LANGUAGE_NAME[locale]}로) 답하세요.
6. 마지막 문단 끝에는 자연스럽게 궁금증을 하나 더 남기거나, 더 깊이 알고 싶다면 관련 심리테스트를 찾아볼 수 있다는 걸 가볍게 한 줄로 덧붙이세요 — 강매하듯 말하지 마세요.
7. 아래 "사용자 질문"이 한국어로 적혀 있더라도, 답변은 반드시 ${FIELD_LANGUAGE_NAME[locale]}로만 작성하세요 — 질문의 언어를 그대로 따라가지 마세요.

## 사용자 질문
"${ctx.question}"

## 응답 형식
아래 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.
{ "lines": ["문단1", "문단2", "문단3"] }
lines 배열은 3~4개 항목이어야 합니다.
${outputLanguageDirective(locale, { en: `the "lines" array`, es: `array "lines"` })}`;
}
