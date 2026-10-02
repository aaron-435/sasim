/**
 * lib/reportSets.ts
 * ------------------------------------------------------------------
 * 5세트 흐름(flowVersion 2) 리포트의 재료: 퀴즈 30문항 답과 세트 재료 묶음(`set_packets`).
 * CHAT_SETS_DRAFT.md 3장·6장. 리포트 프롬프트(lib/reportPrompts.ts)와 파싱(lib/report.ts)이 쓴다.
 *
 * 요청의 값은 모두 클라이언트가 보낸 것이므로 여기서 다시 정제한다:
 *   - 30문항 답은 sanitizeQuizAnswers(챗봇 라우트와 같은 규칙)
 *   - 세트 재료 묶음은 사용자 원문만 받아 길이를 자르고, 인용 문항은 받은 값을 믿지 않고
 *     같은 30문항 답으로 서버가 다시 고른다(selectSetQuizAnswer — 챗봇이 인용한 것과 같은 함수).
 * 그래서 카드에 붙는 퀴즈 문구는 항상 앱이 보낸 30문항 데이터와 같다.
 * ------------------------------------------------------------------
 */

import {
  SET_ANSWER_MAX,
  buildSetPackets,
  sanitizeQuizAnswers,
  selectSetQuizAnswer,
  type SetPacket,
  type SetQuizAnswer,
} from "./chatSets";
import { CHAT_SET_THEMES, getModuleChatSets, type ChatSetNumber, type ChatSetTheme, type ModuleChatSets } from "./modulePlaybooks";

const SET_NUMBERS: readonly ChatSetNumber[] = [1, 2, 3, 4, 5];

/** 카드에 보이는 퀴즈 답 한 문항(사용자 언어 문구). */
export interface SetCardQuiz {
  id: string;
  prompt: string;
  label: string;
  score: number;
}

/** 검사 × 대화 카드 한 장. 세트·주제·퀴즈는 코드가 붙이고, 모델은 quote와 note만 쓴다. */
export interface SetCard {
  set: ChatSetNumber;
  theme: ChatSetTheme;
  /** "검사에서 고른 답". 세트 후보 문항에 답이 하나도 없으면 null. */
  quiz: SetCardQuiz | null;
  /** "대화에서 한 말" — 그 세트 사용자 원문에서 고른 짧은 인용. 대화가 없는 세트는 빈 문자열. */
  quote: string;
  /** "읽어 주기" 3문장. */
  note: string;
}

/** 5세트 리포트를 쓸 수 있는 요청인지 판단하고 재료를 정제한 결과. */
export interface ReportSetsInput {
  quizAnswers: SetQuizAnswer[];
  setPackets: SetPacket[];
}

function clip(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function clipList(v: unknown, maxItems: number): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => clip(x, SET_ANSWER_MAX)).filter(Boolean).slice(0, maxItems);
}

/**
 * 요청의 flowVersion·30문항 답·extract의 set_packets → 5세트 리포트 재료. 아래 중 하나라도 아니면 null
 * (지금 리포트 그대로): flowVersion 2, 세트 데이터가 있는 moduleId, 정제 후 퀴즈 답 1개 이상.
 * 대화 없이(또는 set_packets 없이) 온 요청은 대화 없는 세트 5개로 채운다 — 카드는 퀴즈 답과 해설만 갖는다.
 */
export function resolveReportSets(
  moduleId: string | undefined,
  flowVersion: unknown,
  rawQuizAnswers: unknown,
  rawSetPackets: unknown
): ReportSetsInput | null {
  if (flowVersion !== 2) return null;
  const chatSets = getModuleChatSets(moduleId);
  if (!chatSets) return null;
  const quizAnswers = sanitizeQuizAnswers(rawQuizAnswers);
  if (quizAnswers.length === 0) return null;

  const base = buildSetPackets([], chatSets, quizAnswers);
  const received = Array.isArray(rawSetPackets) ? rawSetPackets : [];
  const setPackets = base.map((packet) => {
    const r = received.find((p) => p && typeof p === "object" && (p as { set?: unknown }).set === packet.set) as Record<string, unknown> | undefined;
    if (!r) return packet;
    const opening = clipList(r.opening_answers, 2);
    const moduleAnswers = clipList(r.module_answers, 3);
    const out: SetPacket = { ...packet, opening_answers: opening, module_answers: moduleAnswers, has_chat: opening.length + moduleAnswers.length > 0 };
    if (packet.set === 5) {
      out.perspective_answer = clip(r.perspective_answer, SET_ANSWER_MAX) || null;
      if (out.perspective_answer) out.has_chat = true;
    }
    return out;
  });
  return { quizAnswers, setPackets };
}

/**
 * 카드에 보일 퀴즈 답. 세트 ①에서 인용한 문항이 있으면 그것, 없으면(후보가 점수 조건을 못 넘음)
 * 그 세트 후보 중 답한 문항에서 인용 방향에 가장 가까운 것(세트 5 낮은 방향이면 최저점, 아니면 최고점).
 */
export function cardQuizFor(chatSets: ModuleChatSets, set: ChatSetNumber, answers: readonly SetQuizAnswer[]): SetCardQuiz | null {
  const chosen = selectSetQuizAnswer(chatSets, set, answers);
  const low = set === 5 && chatSets.strengthScoreDirection === "low";
  const best =
    chosen ??
    candidateAnswers(chatSets, set, answers).reduce<SetQuizAnswer | null>(
      (b, a) => (!b || (low ? a.score < b.score : a.score > b.score) ? a : b),
      null
    );
  return best ? { id: best.qId, prompt: best.prompt, label: best.label, score: best.score } : null;
}

/** 세트 후보 문항 중 사용자가 답한 것(후보 순서). */
function candidateAnswers(chatSets: ModuleChatSets, set: ChatSetNumber, answers: readonly SetQuizAnswer[]): SetQuizAnswer[] {
  const byId = new Map(answers.map((a) => [a.qId, a]));
  return chatSets.sets[set - 1].candidates.map((id) => byId.get(id)).filter((a): a is SetQuizAnswer => !!a);
}

/** 모델이 쓴 { quote, note }(또는 앱이 돌려준 카드 객체)에 세트·주제·퀴즈를 코드로 붙인다. */
export function buildSetCard(value: unknown, set: ChatSetNumber, moduleId: string | undefined, sets: ReportSetsInput): SetCard {
  const chatSets = getModuleChatSets(moduleId);
  const obj = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const packet = sets.setPackets[set - 1];
  return {
    set,
    theme: CHAT_SET_THEMES[set].key,
    quiz: chatSets ? cardQuizFor(chatSets, set, sets.quizAnswers) : null,
    // 대화가 없는 세트는 인용 칸이 없다 — 모델이 무엇을 썼든 비운다.
    quote: packet?.has_chat ? clip(obj.quote, 200) : "",
    note: typeof obj.note === "string" ? obj.note.trim() : "",
  };
}

const SCORE_MARK = (score: number) => (score >= 2 ? " ★강하게 그렇다" : score === 0 ? " ○전혀 아니다" : "");

/** 30문항 답을 차원별로 묶은 프롬프트 줄. 2~3점·0점 표시. */
export function describeQuizAnswersByDimension(answers: readonly SetQuizAnswer[], dimensionNames: Record<string, string>): string {
  const groups = new Map<string, SetQuizAnswer[]>();
  for (const a of answers) (groups.get(a.dimension) ?? groups.set(a.dimension, []).get(a.dimension)!).push(a);
  return Array.from(groups)
    .map(([dim, list]) => {
      const lines = list.map((a) => `  - [${a.qId}] "${a.prompt}" → "${a.label}" (${Math.round(a.score * 10) / 10}점${SCORE_MARK(a.score)})`);
      return `- ${dimensionNames[dim] ?? dim}\n${lines.join("\n")}`;
    })
    .join("\n");
}

/** 세트 재료 묶음 5개를 프롬프트 줄로. 대화 없는 세트는 후보 문항 답을 근거로 쓰라고 적는다. */
export function describeSetPackets(sets: ReportSetsInput, moduleId: string | undefined): string {
  const chatSets = getModuleChatSets(moduleId);
  return SET_NUMBERS.map((n) => {
    const p = sets.setPackets[n - 1];
    const theme = CHAT_SET_THEMES[n];
    const quiz = chatSets ? cardQuizFor(chatSets, n, sets.quizAnswers) : null;
    const quizLine = quiz ? `"${quiz.prompt}" → "${quiz.label}" (${Math.round(quiz.score * 10) / 10}점)` : "(없음)";
    const lines = [`### 세트 ${n} · ${theme.name} (${theme.description})`, `- 카드의 '검사에서 고른 답': ${quizLine}`];
    if (!p?.has_chat) {
      const cands = chatSets ? candidateAnswers(chatSets, n, sets.quizAnswers).sort((a, b) => b.score - a.score) : [];
      lines.push(`- 대화 없음 — 이 세트의 근거는 아래 후보 문항 답(점수 높은 순)만 쓴다. 이 세트의 말을 지어내지 않는다.`);
      if (cands.length) lines.push(...cands.map((a) => `  - "${a.prompt}" → "${a.label}" (${Math.round(a.score * 10) / 10}점)`));
    } else {
      p.opening_answers.forEach((t, i) => lines.push(`- ${i === 0 ? "①" : "②"} 답 원문: "${t}"`));
      p.module_answers.forEach((t, i) => lines.push(`- ${["③", "④", "⑤"][i]} 답 원문: "${t}"`));
      if (n === 5) lines.push(`- 24턴 관점 전환 답 원문(closing 재료, 카드 인용에는 쓰지 않음): ${p.perspective_answer ? `"${p.perspective_answer}"` : "(없음)"}`);
    }
    return lines.join("\n");
  }).join("\n\n");
}
