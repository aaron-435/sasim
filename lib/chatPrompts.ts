/**
 * lib/chatPrompts.ts
 * ------------------------------------------------------------------
 * System prompt builder for the Layer 3 챗봇 상담, based on
 * 챗봇_3턴시나리오_5.md (v5). Kept separate from lib/chat.ts (the actual
 * OpenAI call) so the prompt wording can be revised without touching
 * the API-calling logic — the doc's author noted the wording is still
 * being iterated on.
 *
 * Key structural decisions carried over verbatim from the v5 doc:
 *   - The server ALWAYS injects "지금은 N번째 응답입니다" explicitly — the
 *     model is never trusted to count its own turn number (v4 tested this
 *     and it broke: the model ran to turn 13 instead of stopping at 7).
 *   - turnNumber >= 7 is always forced into the Phase C (summary + close)
 *     instruction, regardless of what the caller passes.
 *   - Phase B/C responses must stay plain natural-language text (no JSON).
 *   - Phase A (turns 1-2) is the one deviation from the doc: since the UI
 *     needs actual clickable chip buttons (not just forced-choice prose),
 *     Phase A calls ask for structured `{ text, chips }` JSON instead of
 *     prose alone. The chips are still meant to be the same phrases that
 *     appear in `text` — this is an implementation detail for rendering,
 *     not a relaxation of the "no advice / stay in character" rules.
 *
 * Saju x psych-test combination (2026-08-28 redesign): the oheng-tag quiz
 * questions (Q1-6) were removed — SAZU already returns real oheng percentages
 * at onboarding, so there's nothing for the quiz to infer. The chatbot is
 * the ONLY place saju data and the psych-test result get combined — both
 * are handed to it directly as separate facts, and it's expected to
 * narrate the connection between them.
 *
 * Module-agnostic (2026-08-29): originally written for Module 1 (애착)
 * only; now any of modules 1-5 (lib/modules.ts) can be running, so the
 * context/prompt wording says "심리테스트" generically rather than
 * hardcoding "애착유형" — the actual type name (e.g. "결핍공포형",
 * "완전 소진형") comes through psychTestType/psychTestSummary either way.
 * ------------------------------------------------------------------
 */

import type { ElementKey } from "./sajuScore";

export type Track = "romance" | "career";

export interface QuizAnswerQuote {
  prompt: string;
  label: string;
}

export interface ChatSessionContext {
  track: Track;
  /** Real oheng percentages from SAZU (onboarding), not inferred from the quiz. */
  sajuElements: Record<ElementKey, number>;
  dominantSajuElement: ElementKey;
  /** Whichever module ran (1-5) — human-readable type name, e.g. "불안형 (Anxious-Preoccupied)", "결핍공포형". */
  psychTestType: string;
  /** generateNuancedSummary() output from the quiz — hedged prose describing the dimension results. */
  psychTestSummary: string;
  /** The single highest-scoring quiz answer, so turn 1 can quote it directly. */
  quizAnswer?: QuizAnswerQuote | null;
}

const ELEMENT_LABEL: Record<ElementKey, string> = {
  wood: "목(木)",
  fire: "화(火)",
  earth: "토(土)",
  metal: "금(金)",
  water: "수(水)",
};

const TRACK_LABEL: Record<Track, string> = {
  romance: "연애 & 애착",
  career: "커리어 & 번아웃",
};

export const TOTAL_TURNS = 7;

const ABSOLUTE_RULES = `
## 절대 규칙 (반드시 전부 지킬 것)
1. 모든 응답은 "공감 문장 → 질문" 2단 구조. 공감 문장은 물음표 없이, 유저가 방금 한 말을 1개 이상 그대로 인용해서 만든다.
2. 공감 문장의 표현을 매번 다르게 쓴다. "정말 ~죠", "~군요" 같은 틀을 2턴 이상 연속으로 쓰지 않는다.
3. Phase A(1~2번째 응답)는 선택지 2~3개로 끝낸다 — 참고용 괄호 예시 나열이 아니라 실제로 골라야 하는 강제 선택형 문장("~예요, ~예요, 아니면 ~예요?")이어야 한다. Phase B(3~6번째 응답)는 선택지 없이 열린 질문 하나로 끝낸다.
4. Phase B의 질문은 표면적인 사실 확인에 머무르지 않는다. 유저가 방금 한 말 속에서 아직 스스로도 명확히 언어화하지 못했을 법한 감정·두려움·욕구를 짚어내는 방향으로 다음 질문을 설계한다 — 공감 문장으로 먼저 그 감정에 이름을 붙여주듯 반영한 뒤, 그 이름 붙인 감정의 더 안쪽(왜 그게 그렇게 무서운지, 그 이면에 뭐가 있는지)을 살짝 건드리는 질문을 이어간다. 유저가 이미 명시적으로 말한 내용을 그대로 되묻지 말고, 한 겹 더 파고든다.
5. 절대로 조언, 해결책, 행동 제안(운동, 취미, 마인드셋 전환 등)을 하지 않는다. 유저가 직접 조언을 요청해도 답하지 말고 "그건 사주랑 겹쳐서 보고 나서 짚어드릴게요"로 미루고 다음 질문으로 넘어간다. "화이팅", "응원할게요" 같은 마무리 멘트도 쓰지 않는다.
6. JSON, 코드 블록, 중괄호 등 구조화된 데이터는 응답에 절대 포함하지 않는다.
7. 사주와 심리테스트 결과 언급을 대화 전체에서 각각 최소 1번 이상 자연스럽게 유지한다 — 중반 이후에 완전히 생략되지 않게 한다.
`.trim();

const PHASE_INSTRUCTIONS: Record<number, string> = {
  1: `지금은 1번째 응답입니다 (Phase A - 턴1). 사주 데이터와 심리테스트 결과를 함께 엮어서 구체적으로 진술한 뒤 — 이 둘이 어떻게 연결되는지 한 문장으로 짚어주세요 —, track에 맞는 2~3개 후보 영역을 강제 선택형으로 제시하세요. "(다른 거면 편하게 말씀해주셔도 좋아요)"는 이번 응답에서만 붙이세요. quizAnswer가 주어졌다면, "아까 '[quizAnswer.prompt]'라는 질문에서 '[quizAnswer.label]'이라고 답변해주셨는데"처럼 자연스럽게 인용하며 시작하세요.`,
  2: `지금은 2번째 응답입니다 (Phase A - 턴2). 유저가 고른 영역을 인용하며, 그 안에서 구체적 사건 후보 2~3개로 한 번 더 좁히세요. 강제 선택형 문장으로 끝내세요.`,
  3: `지금은 3번째 응답입니다 (Phase B - 장면/Scene). 선택지 없이, 구체적으로 어떤 순간에 그게 제일 세게 느껴지는지 여는 질문 하나로 물으세요.`,
  4: `지금은 4번째 응답입니다 (Phase B - 반복 패턴/Pattern). 이런 느낌이 이번이 처음인지, 예전에도 비슷한 적이 있었는지 여는 질문 하나로 물으세요.`,
  5: `지금은 5번째 응답입니다 (Phase B - 의미/두려움/Meaning). 이게 유독 힘들게 느껴지는 이유, 잘 안 됐을 때 제일 무서운 게 뭔지 여는 질문 하나로 물으세요.`,
  6: `지금은 6번째 응답입니다 (Phase B - 관계/시선/Relational). 주변 사람들이 이 상황을 어떻게 보는 것 같은지, 혹은 누구한테 제일 티 내기 싫은지 여는 질문 하나로 물으세요.`,
  7: `지금은 7번째(마지막) 응답입니다 (Phase C - 요약+종료). Phase B 4개 각도에서 나온 정보를 하나로 엮어 1문장으로 요약하고 "~라는 얘기죠?" 형태로 확인받으세요. 확인 후에는 절대 조언하지 말고 "잠시만요, 사주랑 겹쳐서 볼게요" 같은 멘트로 마무리하세요. 이 응답이 대화의 마지막입니다 — 8번째 응답은 만들지 마세요.`,
};

function buildTimeNotice(elapsedMinutes: number): string {
  if (elapsedMinutes >= 15) {
    return "현재 대화 시작 후 15분 이상 경과했습니다. 지금 즉시 지금까지 나온 정보로 요약하고 대화를 종료하세요 (Phase C로 전환).";
  }
  if (elapsedMinutes >= 12) {
    return `현재 대화 시작 후 ${elapsedMinutes}분 경과했습니다. 남은 각도를 압축해서 이번 또는 다음 응답에서 마무리 단계로 들어가세요.`;
  }
  return "";
}

const PHASE_A_OUTPUT_FORMAT = `
## 출력 형식 (이번 응답 전용 — 반드시 지킬 것)
반드시 아래 JSON 형식으로만 응답하라 (다른 텍스트나 코드 블록 표시 없이 JSON 객체 하나만):
{"text": "공감 문장과 강제 선택형 질문을 포함한 전체 응답 텍스트", "chips": ["선택지1", "선택지2", "선택지3"]}
chips 배열은 text 안에 등장하는 선택지 문구를 정확히 그대로, 화면에 버튼으로 표시할 수 있는 짧은 명사구 형태로 담아라 (예: "일 문제", "돈 문제", "잘 모르겠어요").
`.trim();

/**
 * @param turnNumber caller-requested turn (1-based). Values >= TOTAL_TURNS are always
 *   clamped to the Phase C instruction — this is the "server, not the model, decides
 *   when the conversation ends" mechanism the doc requires.
 */
export function buildChatSystemPrompt(
  turnNumber: number,
  context: ChatSessionContext,
  elapsedMinutes: number,
  isPhaseA: boolean
): string {
  const effectiveTurn = turnNumber >= TOTAL_TURNS ? TOTAL_TURNS : Math.max(1, turnNumber);
  const phaseInstruction = PHASE_INSTRUCTIONS[effectiveTurn];
  const timeNotice = buildTimeNotice(elapsedMinutes);
  const quizAnswerLine = context.quizAnswer
    ? `- quizAnswer: { prompt: "${context.quizAnswer.prompt}", label: "${context.quizAnswer.label}" }`
    : "- quizAnswer: (없음)";

  const elementsLine = (Object.keys(context.sajuElements) as ElementKey[])
    .map((k) => `${ELEMENT_LABEL[k]} ${Math.round(context.sajuElements[k])}%`)
    .join(", ");

  return `
너는 "The 5 Elements Blueprint"의 무료 AI 상담 챗봇이다. 사주와 심리테스트를 결합해서 유저의 진짜 고민을 다각도로 부드럽게 끌어낸다.

${ABSOLUTE_RULES}

## 지금 해야 할 일
${phaseInstruction}
${timeNotice ? `\n${timeNotice}` : ""}

## 이번 세션 입력값
- track: ${context.track} (${TRACK_LABEL[context.track]})
- 사주 오행 분포: ${elementsLine} (우세 원소: ${ELEMENT_LABEL[context.dominantSajuElement]})
- 심리테스트 결과: ${context.psychTestType}
- 심리테스트 서술: ${context.psychTestSummary || "(없음)"}
${quizAnswerLine}
${isPhaseA ? `\n${PHASE_A_OUTPUT_FORMAT}` : ""}
`.trim();
}

export interface ExtractionMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Builds the (system, user) pair for the turn-7-completion JSON extraction call.
 *
 * Design notes (2026-08-28 revision, per user feedback):
 *   - summary_quote is NOT a verbatim copy of any single chat line anymore (an
 *     earlier version required exact-copy of the last assistant message; the
 *     user pointed out this produces a flat "quote", not a real synthesis).
 *     It's now a short (1-2 sentence) newly-written highlight that blends
 *     saju + the psych-test result + the conversation — same spirit as
 *     integrated_summary but compressed, for the report's pull-quote box.
 *   - integrated_summary is the fuller 3-5 sentence version of the same blend,
 *     for the report's body paragraph. Both must foreground what the user
 *     actually said (trigger_point/repeat_pattern/core_fear_or_meaning), not
 *     just restate saju/psych-test theory in the abstract.
 *   - Neither field may quote the transcript verbatim — both must be freshly
 *     composed synthesis, not copy-paste.
 */
export function buildExtractionPrompt(
  transcript: ExtractionMessage[],
  context: ChatSessionContext
): { system: string; user: string } {
  const elementsLine = (Object.keys(context.sajuElements) as ElementKey[])
    .map((k) => `${ELEMENT_LABEL[k]} ${Math.round(context.sajuElements[k])}%`)
    .join(", ");

  const system = `
아래는 사용자와의 7턴 대화 전문이다. 이 대화와 아래 배경 데이터(사주, 심리테스트 결과)를 바탕으로 다음 JSON을 추출하라.
사용자가 실제로 말한 내용만 반영하고, 언급되지 않은 내용은 추측해서 채우지 마라.
반드시 아래 스키마와 정확히 일치하는 JSON 객체 하나만 출력하라 (다른 텍스트 금지).

{
  "primary_concern": "돈|사업|연애|번아웃 중 하나 (track 정보와 일치시킬 것)",
  "emotional_state": "사용자가 실제로 말한 감정 1개 (한 단어)",
  "trigger_point": "사용자가 언급한 구체적 사건 (Phase B 장면, 한 문장)",
  "repeat_pattern": "이 문제가 처음이 아니라면 과거 패턴 (없으면 null)",
  "core_fear_or_meaning": "이 상황이 유독 힘든 이유/두려움 (Phase B 의미 단계 답변)",
  "summary_quote": "사주 오행 분포, 심리테스트 결과, 그리고 이번 대화에서 사용자가 실제로 언급한 구체적 사건·패턴·두려움(위 trigger_point/repeat_pattern/core_fear_or_meaning에 해당하는 내용) 중 최소 1개를 반드시 포함한 1~2문장 하이라이트. 오행/심리테스트 이론만 일반론으로 나열하지 말 것 — 대화의 특정 문장을 그대로 복사하지도 말고, 대화의 구체적 내용을 새 표현으로 녹여 넣을 것. 리포트의 인용구 박스에 들어갈 짧고 임팩트 있는 한두 문장.",
  "integrated_summary": "이번 상담 전체에 대한 총평. 반드시 trigger_point, repeat_pattern, core_fear_or_meaning 세 가지 모두를 구체적으로 언급하며 시작하고 — 즉 사용자가 이번 대화에서 실제로 말한 장면·반복 패턴·두려움을 먼저 짚은 뒤 — 그것이 사주 오행 분포 및 심리테스트 결과와 어떻게 연결되는지 3~5문장으로 설명할 것. '화 기운이 강하면 열정적이다' 같은 사주/심리학 일반론만 나열하는 것은 금지 — 이 사람이 이번 대화에서 실제로 한 말이 드러나야, 이 상담에서만 나올 수 있는 총평이 된다. 리포트 본문 작성의 기초 자료로 쓰인다."
}

## 배경 데이터
- track: ${context.track}
- 사주 오행 분포: ${elementsLine} (우세 원소: ${ELEMENT_LABEL[context.dominantSajuElement]})
- 심리테스트 결과: ${context.psychTestType}
- 심리테스트 서술: ${context.psychTestSummary || "(없음)"}
`.trim();

  const user = transcript.map((m) => `${m.role === "user" ? "유저" : "챗봇"}: ${m.content}`).join("\n");

  return { system, user };
}
