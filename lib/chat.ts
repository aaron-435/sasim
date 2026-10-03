/**
 * lib/chat.ts
 * ------------------------------------------------------------------
 * Server-side wrapper around the OpenAI Chat Completions API for the
 * Layer 3 무료 AI 상담 챗봇 (see lib/chatPrompts.ts for the design).
 * NEVER import this in a client component — it reads process.env.OPENAI_API_KEY.
 * Call it only from Route Handlers / Server Actions.
 *
 * Two calls per session:
 *   1. getChatReply() — one call per bot turn (1-7). Every turn requests
 *      structured `{ lines: string[] }` JSON — a short array of separate
 *      messenger-style messages, rendered as sequential chat bubbles on
 *      the client (see components/ChatScreen.jsx) rather than one long
 *      paragraph.
 *   2. extractChatSummary() — one extra call right after turn 7, to pull the
 *      structured chatExtract (primary_concern, emotional_state, ...) that
 *      ReportScreen.jsx consumes.
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";
import {
  buildChatSystemPrompt,
  buildExtractionPrompt,
  chatFlowVersion,
  effectiveSetTurnRole,
  isFinalTurn,
  sanitizeFormulation,
  TOTAL_TURNS,
  type ChatFormulation,
  type ChatSessionContext,
} from "./chatPrompts";
import { getModuleChatSets, getModulePlaybook, PERSPECTIVE_SHIFT_LEAD } from "./modulePlaybooks";
import { buildSetPackets, selectSetQuizAnswer, type SetPacket } from "./chatSets";
import type { Locale } from "./i18n/types";
import { logLlmUsage } from "./llmUsage";
import { stripHanja } from "./reportQuality";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // set in .env.local, never exposed to client
});

// 2026-09-07: switched from gpt-4o to gpt-5.4-mini — ~1/3 the price, newer
// generation. Verified against an 11-case safety-protocol matrix (6 crisis
// phrasings of varying directness + 5 Korean hyperbole cases like "배고파
// 죽겠다" that must NOT trigger it): gpt-5.4-mini scored 100% recall / 0%
// false-positive, actually outperforming gpt-4o (67% recall on the same
// set — it missed a method-mention case and dropped the mandatory hotline
// numbers on another). Re-run that matrix before ever changing this again.
//
// 2026-09-28 (TODO 15-b): 대화 턴은 gpt-5.6-luna(추론 강도 low)로 바꿨다. 같은 4개 페르소나 × 20턴
// 채점 평균 1.80(mini 1.59, gpt-5.4 1.79), 대화 1개 비용 $0.017(mini $0.12), 응답 중앙값 4.2초(mini 2.2초).
// 안전 매트릭스(위기 6 + 과장 5 + 돈 스트레스 1) 3회: 위기 18/18, 과장 오탐 0/15, "또 못 버티겠다"는 매번
// 안전 확인으로 넘어감(규칙 0에 위기 신호로 적힌 표현). 추출은 mini로 둔다 — luna 추출은 summary_quote를
// 오행 수치로 시작하고 조언투가 섞였으며 20턴 끝 대기가 약 7초로 늘었다.
export const CHAT_MODEL = "gpt-5.6-luna";
const EXTRACT_MODEL = "gpt-5.4-mini";

// 2026-09-28 (TODO 15-b): gpt-5.5·5.6 계열은 temperature 기본값(1)만 받고 추론형이다. 기본 추론을 켜 두면
// gpt-5.6-luna가 턴당 약 300개의 보이지 않는 추론 토큰을 써서 응답 중앙값이 6초대였다. 이 계열로 바꿀 때는
// temperature 대신 추론 강도를 보낸다.
export type ChatReasoningEffort = "none" | "low" | "medium" | "high";
const CHAT_REASONING_EFFORT: ChatReasoningEffort = "low";
export function chatSamplingParams(
  model: string,
  temperature: number,
  reasoningEffort: ChatReasoningEffort = CHAT_REASONING_EFFORT,
): { temperature: number } | { reasoning_effort: ChatReasoningEffort } {
  return /^gpt-5\.[56]/.test(model) ? { reasoning_effort: reasoningEffort } : { temperature };
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatExtract {
  primary_concern: string;
  emotional_state: string;
  trigger_point: string;
  repeat_pattern: string | null;
  core_fear_or_meaning: string;
  /** The exact last assistant (Phase C) message — see buildExtractionPrompt for the turn-3-vs-turn-7 bugfix. */
  summary_quote: string;
  /** Saju + Module 1 attachment result + full conversation, synthesized into one narrative. Drives the report. */
  integrated_summary: string;
  // 2026-09-27 (TODO F1-a): 아래는 모두 optional — 이 필드가 생기기 전의 extract(앱에 저장된 이전
  // 리포트, 구버전 앱이 보내는 리포트 요청)도 그대로 통과해야 한다. 사용자가 말하지 않았으면 null.
  coping?: string | null;
  relational?: string | null;
  desired_change?: string | null;
  /** 모듈 플레이북의 extractFields 2개(key → 값). 플레이북이 없는 moduleId면 생략. */
  module_fields?: Record<string, string | null>;
  /** 5세트 흐름(flowVersion 2)만: 세트별 재료 묶음 5개. LLM이 아니라 서버가 대화 기록과 턴 번호로 만든다(attachSetPackets). */
  set_packets?: SetPacket[];
}

// The model sometimes writes the string "null" (or "") instead of JSON null for a field the user never touched.
function nullableText(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t && t.toLowerCase() !== "null" ? t : null;
}

export interface ChatReply {
  /** 2-4 short messenger-style messages, rendered as sequential bubbles. */
  lines: string[];
  /** Hidden counselor memo (TODO Q1-c). The route passes it to the app, which echoes it back next turn; never shown or persisted. */
  formulation?: ChatFormulation;
}

// A line counts as "asking a question" if it ends in ? or in a no-"?"
// curiosity phrasing like "~인지 궁금해요." — both showed up as the second
// half of a stacked pair in real transcripts (see chatPrompts.ts rule 4's
// docstring for examples).
function isQuestionLine(line: string): boolean {
  const trimmed = line.trim();
  return /[?？]\s*$/.test(trimmed) || /궁금(해요|하네요|합니다)\.?\s*$/.test(trimmed);
}

const HANGUL = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/;
function hasHangul(line: string): boolean {
  return HANGUL.test(line);
}

/**
 * Deterministic backstop for chatPrompts.ts rule 4 ("one question per
 * reply"). Prose instructions plus negative examples measurably failed to
 * stop this on their own — gpt-5.4-mini kept stacking a second, unrelated
 * question after the first turn's worth of feedback, even reproducing an
 * example we'd just told it not to write. Rather than keep tuning the
 * prompt, enforce it in code: keep only the last question-like line and
 * drop the earlier one(s), which in every observed violation were pure
 * follow-up questions with no reflection content worth preserving.
 */
// A second question that opens with one of these is the other half of a binary choice
// ("~나요? 반대로 ~나요?"), so it is folded into one question instead of dropped.
const ALTERNATIVE_LEAD = /^(?:반대로|아니면|혹은|또는|or rather|or|o bien|o más bien|o)(?=[\s,])[\s,]*/i;

/**
 * One line holding two questions ("혼자 정리하나요? 반대로 누군가에게 털어놓나요?") slipped past the
 * line-based check below (TODO 5, judge runs q5-v2-checkpoint and attach_en). A follow-up that offers
 * the other side of a choice is joined into one question; otherwise the first real question stays and
 * the rest are dropped (a short tag like "그렇죠?" before it is dropped instead).
 */
export function collapseInlineQuestions(line: string): string {
  // A "?" inside a quote ("“왜 나만?” 하는 마음") doesn't end a sentence — hide it while splitting.
  const QUOTED_Q = "\u0000";
  const masked = line.replace(/[?？](?=[”"’'»」』)])/g, QUOTED_Q);
  const parts = masked.match(/[^?？]+[?？]+|[^?？]+$/g);
  if (!parts) return line;
  const isQ = (t: string) => /[?？]\s*$/.test(t);
  if (parts.filter(isQ).length <= 1) return line;
  const unmask = (t: string) => t.split(QUOTED_Q).join("?");
  const qs = parts.map((t, i) => ({ t, i })).filter((p) => isQ(p.t));
  const core = (t: string) => t.replace(/[\s?？¿¡.,]/g, "");
  // Tag questions ("그렇죠?", "right?", "¿verdad?") are short; a real question is longer.
  const main = qs.find((q) => core(q.t).length > 6) ?? qs[0];
  const next = qs.find((q) => q.i > main.i);
  const out: string[] = [];
  parts.forEach((t, i) => {
    if (isQ(t) && i !== main.i) return;
    out.push(t);
  });
  if (next) {
    const rest = next.t.trim().replace(/^¿/, "");
    const lead = rest.match(ALTERNATIVE_LEAD);
    if (lead) {
      const leadWord = lead[0].trim().replace(/,$/, "").toLowerCase();
      const word = /[가-힣]/.test(leadWord) ? "아니면" : leadWord.startsWith("or") ? "or" : "o";
      let tail = rest.slice(lead[0].length);
      if (word === "or" && !/^I\b/.test(tail)) tail = tail.charAt(0).toLowerCase() + tail.slice(1);
      const idx = out.indexOf(main.t);
      out[idx] = `${main.t.replace(/[?？]+\s*$/, "")}, ${word} ${tail}`;
      if (/\s$/.test(main.t)) out[idx] += " ";
    }
  }
  return unmask(out.join("").replace(/\s{2,}/g, " ").trim());
}

function enforceOneQuestionPerReply(lines: string[]): string[] {
  lines = lines.map(collapseInlineQuestions);
  const questionIndices = lines.reduce<number[]>((acc, line, i) => {
    if (isQuestionLine(line)) acc.push(i);
    return acc;
  }, []);
  if (questionIndices.length <= 1) return lines;
  // Keep the FIRST question: a second question line is usually a dependent follow-up ("있었다면 그건
  // 언제쯤이었나요?"), which reads as a broken fragment once the question it leans on is removed.
  const dropIndices = new Set(questionIndices.slice(1));
  return lines.filter((_, i) => !dropIndices.has(i));
}

// 2026-09-28 (TODO 15-b): 마지막 턴은 "요약 → 확인 질문 → 잠시 기다려 달라는 마무리 안내" 순서여야 하는데,
// 모델이 확인 질문을 맨 끝에 두거나(규칙 3 "질문은 마지막 줄"과 헷갈림) 안내를 빠뜨리면 대화가 질문으로 끝난 채
// 앱이 리포트로 넘어간다(gpt-5.6-luna·terra 4개 중 2개). 안내 줄을 맨 끝으로 옮기고, 없으면 언어별 문장을 붙인다.
// 요약 줄에도 나올 수 있는 말("기다리다", "wait for his reply")은 피하고, 안내 문장에만 나오는 표현으로 찾는다.
const CLOSING_LINE_PATTERN: Record<string, RegExp> = {
  ko: /잠시만|잠깐만|기다려 주|(사주|테스트).*(살펴|묶|엮|종합|볼게)/,
  en: /\b(give me a moment|one moment|a moment|hold on|saju|test results)\b/i,
  es: /(un momento|un segundo|saju|resultados del test)/i,
};
const CLOSING_LINE_FALLBACK: Record<string, string> = {
  ko: "잠시만 기다려 주세요. 들려주신 이야기와 사주, 테스트 결과를 함께 살펴볼게요.",
  en: "Give me a moment — I'll look at everything you shared together with your saju and test results.",
  es: "Dame un momento: voy a revisar todo lo que compartiste junto con tu saju y los resultados del test.",
};
// 위기 대응(규칙 0) 중인 응답에는 리포트로 넘어간다는 안내를 붙이지 않는다 — 안전 안내가 마지막 말이어야 한다.
// 번호는 lib/promptLocale.ts의 언어별 위기 상담 안내와 같다.
const CRISIS_LINE_PATTERN = /1393|1577-0199|\b988\b|findahelpline/i;
export function ensureClosingLineLast(lines: string[], locale: string = "ko"): string[] {
  if (lines.some((line) => CRISIS_LINE_PATTERN.test(line))) return lines;
  const pattern = CLOSING_LINE_PATTERN[locale] ?? CLOSING_LINE_PATTERN.ko;
  let idx = -1;
  lines.forEach((line, i) => {
    if (!isQuestionLine(line) && pattern.test(line)) idx = i;
  });
  if (idx === -1) return [...lines, CLOSING_LINE_FALLBACK[locale] ?? CLOSING_LINE_FALLBACK.ko];
  if (idx === lines.length - 1) return lines;
  return [...lines.slice(0, idx), ...lines.slice(idx + 1), lines[idx]];
}

// 2026-10-02 (TODO 4): 5세트 흐름의 24턴은 "마지막으로 묻고 싶은 게 있어요." 고정 문구로 시작한다. 모델에게 맡기면
// 표현이 바뀌므로 코드가 붙인다. 모델이 지시를 어기고 같은 문장을 직접 썼으면 그 줄(또는 줄 앞부분)을 지운 뒤 붙인다.
// 위기 대응 응답(규칙 0)은 건드리지 않는다 — 안전 안내가 응답의 전부여야 한다.
export function prependPerspectiveLead(lines: string[], locale: string = "ko"): string[] {
  if (lines.some((line) => CRISIS_LINE_PATTERN.test(line))) return lines;
  const lead = PERSPECTIVE_SHIFT_LEAD[locale as Locale] ?? PERSPECTIVE_SHIFT_LEAD.ko;
  // 2026-10-02 (TODO 11): 모델이 고정 문구를 둥근 아포스트로피(’)로 써서 같은 줄이 두 번 나갔다 — 따옴표 모양은 무시하고 비교한다.
  const norm = (t: string) => t.replace(/[\s.。!?¿¡,:—'’‘"“”-]+/g, "").toLowerCase();
  const leadKey = norm(lead);
  const rest = lines
    .map((line) => {
      const trimmed = line.trim();
      if (norm(trimmed) === leadKey) return "";
      // 고정 문구로 시작하고 같은 줄에 질문이 이어지면 문구만 떼어 낸다(따옴표 모양이 달라도).
      for (let i = 1; i <= trimmed.length; i++) {
        if (norm(trimmed.slice(0, i)) === leadKey) return trimmed.slice(i).replace(/^[\s.!?,:—-]+/, "").trim();
      }
      return trimmed;
    })
    .filter(Boolean);
  return [lead, ...rest];
}

// 2026-10-02 (TODO 5 후속): 5세트 흐름의 세트를 여는 턴(6·16·21)은 정리 → 재확인·정정 허락 → 테스트 답 인용 → 질문
// 순서인데, 모델이 인용 지시에 밀려 재확인 줄을 자주 빠뜨렸다(q5-v2 채점 s_recap 0). 질문 줄을 뺀 나머지에 정정 허락 표현이
// 없으면 코드가 언어별 한 줄을 인용 줄 앞(못 찾으면 질문 줄 앞)에 끼운다. 턴마다 문장이 달라 같은 틀이 되풀이되지 않는다.
// 10턴 중간 점검도 같은 이유로 정리 뒤 재확인이 빠졌다(q5-v2-recap 채점 t6 1) — 인용이 없으니 계속 여부 질문 앞에 끼운다.
const RECAP_RECHECK_PATTERN: Record<string, RegExp> = {
  ko: /고쳐|바로잡|다르면|다르게 기억|틀렸|잘못 (들|짚|이해)|어긋났|멈춰/,
  en: /correct me|got (it|that|this) wrong|misheard|not quite (right|how)|set me straight|tell me|stand corrected/i,
  es: /corr[ií]ge|correg|equivoc|si no es así|no es exactamente|d[ií]melo|dime si/i,
};
const RECAP_RECHECK_FALLBACK: Record<number, Record<string, string>> = {
  10: {
    ko: "제가 들은 모습과 다른 데가 있다면, 이어서 이야기하면서 고쳐 주셔도 돼요.",
    en: "If any of that isn't how it was for you, you can correct me as we keep going.",
    es: "Si algo de esto no fue así para ti, puedes corregirme mientras seguimos hablando.",
  },
  6: {
    ko: "제가 들은 순서가 다르면 바로 고쳐 주셔도 돼요.",
    en: "If I've got the order wrong, feel free to correct me.",
    es: "Si el orden no fue así, corrígeme sin problema.",
  },
  16: {
    ko: "제가 짚은 게 어긋났다면 그 자리에서 바로잡아 주세요.",
    en: "If that's not quite how it is for you, set me straight.",
    es: "Si no es exactamente así para ti, dímelo.",
  },
  21: {
    ko: "제가 너무 멀리 짚었다면 거기서 멈춰 주셔도 괜찮아요.",
    en: "If I've read too much into it, just tell me.",
    es: "Si fui demasiado lejos, dímelo con confianza.",
  },
};
const normForMatch = (t: string) => t.toLowerCase().replace(/[\s"'“”‘’「」.,!?¿¡…·:;()—-]+/g, "");

export function ensureRecapRecheck(lines: string[], turn: number, quoteLabel: string | null, locale: string = "ko"): string[] {
  const fallback = RECAP_RECHECK_FALLBACK[turn];
  if (!fallback || lines.length === 0) return lines;
  if (lines.some((line) => CRISIS_LINE_PATTERN.test(line))) return lines;
  const pattern = RECAP_RECHECK_PATTERN[locale] ?? RECAP_RECHECK_PATTERN.ko;
  if (lines.slice(0, -1).some((line) => pattern.test(line))) return lines;
  const label = quoteLabel ? normForMatch(quoteLabel) : "";
  const quoteIdx = label ? lines.findIndex((line) => normForMatch(line).includes(label)) : -1;
  const at = quoteIdx > 0 ? quoteIdx : Math.max(0, lines.length - 1);
  return [...lines.slice(0, at), fallback[locale] ?? fallback.ko, ...lines.slice(at)];
}

export async function getChatReply(params: {
  turnNumber: number;
  history: ChatMessage[];
  context: ChatSessionContext;
  sessionStartedAt: number;
  sessionId?: string;
  /** The previous reply's formulation, echoed back by the client. */
  formulation?: ChatFormulation;
}): Promise<ChatReply> {
  const elapsedMinutes = Math.floor((Date.now() - params.sessionStartedAt) / 60000);
  const systemPrompt = buildChatSystemPrompt(params.turnNumber, params.context, elapsedMinutes, params.formulation);

  // 2026-09-28 (TODO 15-b): gpt-5.6-luna 시뮬레이션 80턴 중 2번, JSON에 lines가 빠진 응답이 와서 대화가 오류로
  // 끊겼다. 빈 응답·깨진 JSON·lines 없음은 한 번만 다시 요청한다(두 번째도 실패하면 예전처럼 오류).
  // 2026-10-02 (TODO 11): 영어 v2 대화 15턴에 "“…”이라는 말에, …"처럼 한국어가 섞여 나왔다. 한국어가 아닌 대화에서
  // 한글이 섞인 응답은 한 번 다시 요청하고, 두 번째도 섞이면 한글이 든 줄을 뺀다(다 빠지면 그대로 둔다).
  const replyLocale = params.context.locale ?? "ko";
  let parsed: { lines?: unknown; formulation?: unknown } = {};
  let rawLines: string[] = [];
  for (let attempt = 0; ; attempt++) {
    const completion = await client.chat.completions.create({
      model: CHAT_MODEL,
      ...chatSamplingParams(CHAT_MODEL, 0.8),
      messages: [{ role: "system", content: systemPrompt }, ...params.history],
      response_format: { type: "json_object" },
    });

    if (completion.usage) {
      await logLlmUsage({
        sessionId: params.sessionId,
        endpoint: "chat",
        model: CHAT_MODEL,
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
      });
    }

    const content = completion.choices[0]?.message?.content?.trim() ?? "";
    let problem = "";
    try {
      parsed = content ? JSON.parse(content) : {};
      rawLines = Array.isArray(parsed.lines) ? parsed.lines.map((l: unknown) => String(l)).filter(Boolean) : [];
      if (!content) problem = "OpenAI가 빈 응답을 반환했습니다.";
      else if (rawLines.length === 0) problem = `OpenAI 응답에 lines가 없습니다. (받은 키: ${Object.keys(parsed).join(", ")})`;
    } catch {
      problem = `OpenAI 응답이 JSON이 아닙니다. (앞부분: ${content.slice(0, 120)})`;
    }
    if (!problem && replyLocale !== "ko" && rawLines.some(hasHangul)) {
      if (attempt >= 1) {
        const kept = rawLines.filter((l) => !hasHangul(l));
        if (kept.length) rawLines = kept;
        console.warn(`[chat] turn ${params.turnNumber}: 다시 요청해도 한글이 섞여 해당 줄을 뺐습니다.`);
        break;
      }
      problem = `${replyLocale} 응답에 한글이 섞였습니다.`;
    }
    if (!problem) break;
    if (attempt >= 1) throw new Error(problem);
    console.warn(`[chat] turn ${params.turnNumber}: ${problem} — 한 번 다시 요청합니다.`);
  }
  const oneQuestion = enforceOneQuestionPerReply(rawLines);
  const flow = chatFlowVersion(params.context);
  const locale = params.context.locale ?? "ko";
  const role = flow === 2 ? effectiveSetTurnRole(params.turnNumber, elapsedMinutes) : null;
  const chatSets = role ? getModuleChatSets(params.context.moduleId) : undefined;
  const lines = isFinalTurn(params.turnNumber, elapsedMinutes, flow)
    ? ensureClosingLineLast(oneQuestion, locale)
    : role?.kind === "perspective"
      ? prependPerspectiveLead(oneQuestion, locale)
      : role?.kind === "checkpoint"
        ? ensureRecapRecheck(oneQuestion, role.turn, null, locale)
        : role?.kind === "set" && role.position === 1 && role.recapSets.length && role.set && chatSets
        ? ensureRecapRecheck(
            oneQuestion,
            role.turn,
            selectSetQuizAnswer(chatSets, role.set, params.context.quizAnswers ?? [])?.label ?? null,
            locale
          )
        : oneQuestion;
  const formulation = sanitizeFormulation(parsed.formulation);
  return {
    lines: params.context.locale === "ko" || !params.context.locale ? stripHanja(lines) : lines,
    ...(formulation && { formulation }),
  };
}

export async function extractChatSummary(transcript: ChatMessage[], context: ChatSessionContext, sessionId?: string): Promise<ChatExtract> {
  const playbook = getModulePlaybook(context.moduleId);
  const { system, user } = buildExtractionPrompt(transcript, context);

  const completion = await client.chat.completions.create({
    model: EXTRACT_MODEL,
    ...chatSamplingParams(EXTRACT_MODEL, 0),
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  if (completion.usage) {
    await logLlmUsage({
      sessionId,
      endpoint: "chat_extract",
      model: EXTRACT_MODEL,
      promptTokens: completion.usage.prompt_tokens,
      completionTokens: completion.usage.completion_tokens,
    });
  }

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("OpenAI가 빈 추출 응답을 반환했습니다.");

  const parsed = JSON.parse(raw);
  return {
    primary_concern: parsed.primary_concern ?? "",
    emotional_state: parsed.emotional_state ?? "",
    trigger_point: parsed.trigger_point ?? "",
    repeat_pattern: parsed.repeat_pattern ?? null,
    core_fear_or_meaning: parsed.core_fear_or_meaning ?? "",
    summary_quote: parsed.summary_quote ?? "",
    integrated_summary: parsed.integrated_summary ?? "",
    coping: nullableText(parsed.coping),
    relational: nullableText(parsed.relational),
    desired_change: nullableText(parsed.desired_change),
    // Only the playbook's own keys, so a stray key the model invents never reaches the report prompt.
    ...(playbook && {
      module_fields: Object.fromEntries(playbook.extractFields.map((f) => [f.key, nullableText(parsed.module_fields?.[f.key])])),
    }),
  };
}

/**
 * 5세트 흐름의 마지막 턴 extract에 세트 재료 묶음을 붙인다. 20턴 흐름이면 extract를 그대로 돌려준다.
 * transcript는 마지막 봇 응답까지 포함한 대화 전문(app/api/chat/route.ts의 fullTranscript).
 */
export function attachSetPackets(extract: ChatExtract, transcript: ChatMessage[], context: ChatSessionContext): ChatExtract {
  const chatSets = getModuleChatSets(context.moduleId);
  if (chatFlowVersion(context) !== 2 || !chatSets) return extract;
  return { ...extract, set_packets: buildSetPackets(transcript, chatSets, context.quizAnswers ?? []) };
}

export { TOTAL_TURNS };
