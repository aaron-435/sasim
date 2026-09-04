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
}

export function buildQASystemPrompt(ctx: QAContext): string {
  const dataBlock = JSON.stringify(
    {
      오행분포: ctx.sajuResult.elements,
      우세오행: ctx.sajuResult.dominantElement,
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
3. 가능하면 대운(decadeFortune) 데이터를 활용해 구체적인 시기나 흐름을 언급하세요.
4. 의료·법률·재정적 판단의 근거로 오해될 수 있는 단정적 표현("반드시 ~이다", "~하면 안 된다" 같은 절대적 명령)은 피하세요.
5. 자해·자살 등 위기 신호가 질문에 담겨 있다면, 사주 해석 대신 "자살예방상담전화 1393(24시간)"을 안내하는 짧고 진지한 문단으로만 답하세요.
6. 마지막 문단 끝에는 자연스럽게 궁금증을 하나 더 남기거나, 더 깊이 알고 싶다면 관련 심리테스트를 찾아볼 수 있다는 걸 가볍게 한 줄로 덧붙이세요 — 강매하듯 말하지 마세요.

## 사용자 질문
"${ctx.question}"

## 응답 형식
아래 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.
{ "lines": ["문단1", "문단2", "문단3"] }
lines 배열은 3~4개 항목이어야 합니다.`;
}
