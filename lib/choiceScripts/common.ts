/**
 * lib/choiceScripts/common.ts
 * ------------------------------------------------------------------
 * 모든 모듈이 같이 쓰는 고정 문구. 사람이(Opus) 쓴 데이터다. CHOICE_SCRIPT_GUIDE.md 1절·4절.
 * ------------------------------------------------------------------
 */

/** 직접 쓴 답에 붙는 짧은 고정 반응 풀. 8줄. */
export const FREE_REACTION_POOL: readonly string[] = [
  "그렇군요.",
  "알겠어요.",
  "네, 들었어요.",
  "그렇게 적어 둘게요.",
  "좋아요, 이어 갈게요.",
  "그랬군요.",
  "네, 잘 읽었어요.",
  "네, 기억해 둘게요.",
];

/** 퀴즈 인용 턴의 인용 줄. `{label}`만 실제 퀴즈 답으로 바뀐다. */
export const QUOTE_LINE_TEMPLATE = '검사에서 "{label}"라고 답하셨어요.';

/** 문항 문구를 아는 인용 줄. `{prompt}`(끝의 물음표·마침표 제외)와 `{label}`이 바뀐다. */
export const QUOTE_LINE_WITH_PROMPT_TEMPLATE = '검사에서 "{prompt}" 문항에 "{label}"라고 답하셨어요.';

/** 20턴 맨 앞(반응 줄 다음, 질문 앞)에 붙는 고정 문구. */
export const PERSPECTIVE_LEAD_LINE = "마지막으로 묻고 싶은 게 있어요.";

/** 템플릿의 gist 자리에 들어가는, 직접 쓴 답이거나 답이 없는 턴의 말. */
export const FREE_GIST = "직접 들려준 말";

/** 21턴을 건너뛴 사용자의 메시지. 앱(건너뛰기)이 이 문자열을 그대로 보낸다. */
export const SKIP_ANSWER_TEXT = "(건너뜀)";

/** 1턴 맨 앞에 붙는 인사. 질문이 아니고, 차분히 답해 달라는 부탁만 담는다. */
export const GREETING_LINES: readonly string[] = [
  "안녕하세요. 지금부터 검사 결과를 바탕으로 이야기를 나눠 볼게요.",
  "정확한 결과를 위해 천천히, 차분하게 생각하고 답해 주세요.",
];

// ------------------------------------------------------------------
// 2026-10-22: 언어별 고정 문구. 위 상수는 한국어(기본)이고, en/es는 같은 모양의 묶음이다.
// 보기·질문 스크립트는 lib/choiceScripts/{en,es}/moduleN.ts에 있다. 조사 표기 `{gN:A/B}`는 한국어 전용이라
// en/es 템플릿은 `{gN}`만 쓴다.
// ------------------------------------------------------------------

export type ScriptLocale = "ko" | "en" | "es";

export interface ScriptCommon {
  freeReactionPool: readonly string[];
  quoteLine: string;
  quoteLineWithPrompt: string;
  perspectiveLead: string;
  freeGist: string;
  greeting: readonly string[];
  /** 반응 줄이 없는 턴의 질문 앞 이음말. 뒤에 질문(첫 글자 소문자)이 붙는다. */
  connective: string;
}

const KO_COMMON: ScriptCommon = {
  freeReactionPool: FREE_REACTION_POOL,
  quoteLine: QUOTE_LINE_TEMPLATE,
  quoteLineWithPrompt: QUOTE_LINE_WITH_PROMPT_TEMPLATE,
  perspectiveLead: PERSPECTIVE_LEAD_LINE,
  freeGist: FREE_GIST,
  greeting: GREETING_LINES,
  connective: "그럼",
};

const EN_COMMON: ScriptCommon = {
  freeReactionPool: [
    "Okay, I hear you.",
    "Got it.",
    "Thanks for sharing that.",
    "I'll keep that in mind.",
    "Alright, let's keep going.",
    "That makes sense.",
    "Yes, I read that.",
    "I'll note that down.",
  ],
  quoteLine: 'On the quiz, you answered "{label}".',
  quoteLineWithPrompt: 'On the quiz, to "{prompt}" you answered "{label}".',
  perspectiveLead: "There's one last thing I'd like to ask.",
  freeGist: "what you told me in your own words",
  greeting: [
    "Hi. Let's talk through your quiz results together.",
    "For the most accurate result, take your time and answer calmly.",
  ],
  connective: "So,",
};

const ES_COMMON: ScriptCommon = {
  freeReactionPool: [
    "Entiendo.",
    "De acuerdo, te escucho.",
    "Gracias por contármelo.",
    "Lo tendré en cuenta.",
    "Bien, sigamos.",
    "Tiene sentido.",
    "Sí, lo leí.",
    "Lo apunto.",
  ],
  quoteLine: 'En el test respondiste "{label}".',
  quoteLineWithPrompt: 'En el test, a "{prompt}" respondiste "{label}".',
  perspectiveLead: "Hay una última cosa que me gustaría preguntarte.",
  freeGist: "lo que me contaste con tus palabras",
  greeting: [
    "Hola. Vamos a hablar a partir de los resultados de tu test.",
    "Para un resultado más preciso, tómate tu tiempo y responde con calma.",
  ],
  connective: "Entonces,",
};

export function getScriptCommon(locale?: string | null): ScriptCommon {
  return locale === "en" ? EN_COMMON : locale === "es" ? ES_COMMON : KO_COMMON;
}
