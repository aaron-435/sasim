/**
 * scripts/check-chat-sets.mts
 * ------------------------------------------------------------------
 * lib/chatSets.ts(5세트 흐름의 순수 함수) 사례 검사. OpenAI 호출 없음.
 *
 *   npx tsx scripts/check-chat-sets.mts
 *
 * 검사 사례:
 *   - 턴 1·6·10·11·16·21·24·25(와 2·9·15·20·23·30) 매핑
 *   - 세트 ① 인용 문항: 최고점 선택, 동점은 후보 순서, 후보 전부 0~1점이면 null
 *   - 세트 5 방향: 기본 "low"(0~1점 중 최저), 모듈 7·10 "high"
 *   - 30문항 답 정제(형식·점수 범위·중복·개수·길이)
 *   - 세트 재료 묶음: 25턴 완주 기록, 10턴 조기 종료 기록(세트 3~5 대화 없음)
 * 하나라도 실패하면 exit 1.
 * ------------------------------------------------------------------
 */

import {
  buildSetPackets,
  getSetTurnRole,
  QUIZ_ANSWERS_MAX,
  sanitizeQuizAnswers,
  selectAllSetQuizAnswers,
  selectSetQuizAnswer,
  SET_ANSWER_MAX,
  type SetHistoryMessage,
  type SetQuizAnswer,
} from "../lib/chatSets.ts";
import { getModuleChatSets, type ModuleChatSets } from "../lib/modulePlaybooks.ts";
import { MODULES } from "../mobile/lib/quiz/modules.ts";

let pass = 0;
let fail = 0;

function check(name: string, ok: boolean, detail?: unknown) {
  if (ok) {
    pass += 1;
    console.log(`  ok   ${name}`);
  } else {
    fail += 1;
    console.log(`  FAIL ${name}${detail !== undefined ? ` → ${JSON.stringify(detail)}` : ""}`);
  }
}

function eq(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function sets(moduleId: string): ModuleChatSets {
  const s = getModuleChatSets(moduleId);
  if (!s) throw new Error(`${moduleId} 세트 데이터 없음`);
  return s;
}

/** 실제 퀴즈 정의에서 30문항 답을 만든다. scores에 없는 문항은 defaultScore. */
function answersFor(moduleId: string, scores: Record<string, number>, defaultScore = 1): SetQuizAnswer[] {
  const quiz = MODULES.find((m) => m.id === moduleId);
  if (!quiz) throw new Error(`${moduleId} 퀴즈 없음`);
  return quiz.questions.map((q) => ({
    qId: q.id,
    dimension: q.dimension,
    prompt: q.prompt,
    label: `보기-${q.id}`,
    score: scores[q.id] ?? defaultScore,
  }));
}

// ── 1. 턴 매핑 ────────────────────────────────────────────────────────────
console.log("턴 매핑");
const mapCases: [number, object][] = [
  [1, { kind: "set", set: 1, position: 1, recapSets: [], greeting: true }],
  [2, { kind: "set", set: 1, position: 2, recapSets: [], greeting: false }],
  [5, { kind: "set", set: 1, position: 5, recapSets: [], greeting: false }],
  [6, { kind: "set", set: 2, position: 1, recapSets: [1], greeting: false }],
  [9, { kind: "set", set: 2, position: 4, recapSets: [], greeting: false }],
  [10, { kind: "checkpoint", set: 2, position: null, recapSets: [1, 2], greeting: false }],
  [11, { kind: "set", set: 3, position: 1, recapSets: [], greeting: false }],
  [15, { kind: "set", set: 3, position: 5, recapSets: [], greeting: false }],
  [16, { kind: "set", set: 4, position: 1, recapSets: [3], greeting: false }],
  [20, { kind: "set", set: 4, position: 5, recapSets: [], greeting: false }],
  [21, { kind: "set", set: 5, position: 1, recapSets: [4], greeting: false }],
  [23, { kind: "set", set: 5, position: 3, recapSets: [], greeting: false }],
  [24, { kind: "perspective", set: 5, position: null, recapSets: [], greeting: false }],
  [25, { kind: "closing", set: null, position: null, recapSets: [], greeting: false }],
  [30, { kind: "closing", set: null, position: null, recapSets: [], greeting: false }],
];
for (const [turn, expected] of mapCases) {
  const { turn: _t, ...role } = getSetTurnRole(turn);
  check(`턴 ${turn}`, eq(role, expected), role);
}
// 1~25 전부 역할이 정해지고, 세트 ①은 1·6·11·16·21에만 있다.
const firstTurns = Array.from({ length: 25 }, (_, i) => i + 1).filter((t) => {
  const r = getSetTurnRole(t);
  return r.kind === "set" && r.position === 1;
});
check("세트 ① 턴 = 1·6·11·16·21", eq(firstTurns, [1, 6, 11, 16, 21]), firstTurns);
check("턴 0 → 1턴으로 취급", getSetTurnRole(0).greeting === true);

// ── 2. 인용 문항 선택 ─────────────────────────────────────────────────────
console.log("인용 문항 선택");
const m1 = sets("module1");
// 모듈 1 세트 1 후보: A6, A2, V10, V5
{
  const a = answersFor("module1", { A6: 2, A2: 3, V10: 2, V5: 1 });
  check("세트 1 최고점(A2=3)", selectSetQuizAnswer(m1, 1, a)?.qId === "A2");
}
{
  const a = answersFor("module1", { A6: 1, A2: 2, V10: 2, V5: 2 });
  check("세트 1 동점은 후보 순서(A2)", selectSetQuizAnswer(m1, 1, a)?.qId === "A2");
}
{
  const a = answersFor("module1", { A6: 3, A2: 3, V10: 3, V5: 3 });
  check("세트 1 전부 동점 → 첫 후보 A6", selectSetQuizAnswer(m1, 1, a)?.qId === "A6");
}
{
  const a = answersFor("module1", { A6: 1, A2: 0, V10: 1, V5: 0 });
  check("세트 1 후보 전부 0~1점 → null", selectSetQuizAnswer(m1, 1, a) === null);
}
{
  const a = answersFor("module1", { A6: 1.99, A2: 2.0 });
  check("2점 경계(1.99 제외, 2.0 포함)", selectSetQuizAnswer(m1, 1, a)?.qId === "A2");
}
{
  const a = answersFor("module1", { A2: 3 }).filter((x) => x.qId !== "A2");
  check("답이 없는 후보는 건너뜀 → 나머지 1점이라 null", selectSetQuizAnswer(m1, 1, a) === null);
}
check("답 배열이 비면 null", selectSetQuizAnswer(m1, 1, []) === null);

// 모듈 1 세트 5(low) 후보: A4, A13, V9, V15
{
  const a = answersFor("module1", { A4: 3, A13: 1, V9: 0, V15: 2 });
  check("세트 5 low: 최저점(V9=0)", selectSetQuizAnswer(m1, 5, a)?.qId === "V9");
}
{
  const a = answersFor("module1", { A4: 2, A13: 1, V9: 1, V15: 3 });
  check("세트 5 low: 동점 1점은 후보 순서(A13)", selectSetQuizAnswer(m1, 5, a)?.qId === "A13");
}
{
  const a = answersFor("module1", { A4: 2, A13: 3, V9: 2, V15: 3 });
  check("세트 5 low: 후보 전부 2~3점 → null", selectSetQuizAnswer(m1, 5, a) === null);
}

// 모듈 7 세트 5(high) 후보: A2, A4, A6, A9, A5
const m7 = sets("module7");
check("모듈 7 세트 5 방향 high", m7.strengthScoreDirection === "high");
{
  const a = answersFor("module7", { A2: 2, A4: 3, A6: 0, A9: 3, A5: 1 });
  check("모듈 7 세트 5 high: 최고점 동점은 후보 순서(A4)", selectSetQuizAnswer(m7, 5, a)?.qId === "A4");
}
{
  const a = answersFor("module7", { A2: 0, A4: 1, A6: 0, A9: 1, A5: 0 });
  check("모듈 7 세트 5 high: 후보 전부 0~1점 → null", selectSetQuizAnswer(m7, 5, a) === null);
}
const m10 = sets("module10");
check("모듈 10 세트 5 방향 high", m10.strengthScoreDirection === "high");
{
  const cand = m10.sets[4].candidates;
  const a = answersFor("module10", { [cand[0]]: 2, [cand[1]]: 3 });
  check(`모듈 10 세트 5 high: 최고점(${cand[1]})`, selectSetQuizAnswer(m10, 5, a)?.qId === cand[1]);
}

// 11개 모듈 전체: 모든 문항 3점이면 세트 1~4는 첫 후보, 세트 5는 방향에 따라 첫 후보/null.
// 모든 문항 0점이면 세트 1~4는 null, 세트 5 low는 첫 후보.
for (const mod of MODULES) {
  const s = getModuleChatSets(mod.id);
  if (!s) {
    check(`${mod.id} 세트 데이터`, false, "없음");
    continue;
  }
  const allHigh = selectAllSetQuizAnswers(s, answersFor(mod.id, {}, 3)).map((x) => x?.qId ?? null);
  const allLow = selectAllSetQuizAnswers(s, answersFor(mod.id, {}, 0)).map((x) => x?.qId ?? null);
  const first = s.sets.map((x) => x.candidates[0]);
  const high = s.strengthScoreDirection === "high";
  const expHigh = [...first.slice(0, 4), high ? first[4] : null];
  const expLow = [null, null, null, null, high ? null : first[4]];
  check(`${mod.id} 전부 3점 → ${JSON.stringify(expHigh)}`, eq(allHigh, expHigh), allHigh);
  check(`${mod.id} 전부 0점 → ${JSON.stringify(expLow)}`, eq(allLow, expLow), allLow);
  // 다섯 세트의 인용 문항이 서로 다르다(한 문항은 한 세트에서만).
  const mixed = selectAllSetQuizAnswers(s, answersFor(mod.id, {}, 2)).filter(Boolean).map((x) => x!.qId);
  check(`${mod.id} 세트끼리 인용 문항 중복 없음`, new Set(mixed).size === mixed.length, mixed);
}

// ── 3. 30문항 답 정제 ────────────────────────────────────────────────────
console.log("30문항 답 정제");
{
  const good = { qId: "A6", dimension: "anxiety", prompt: "  질문\n문구 ", label: "보기", score: 2 };
  const out = sanitizeQuizAnswers([
    good,
    { ...good, qId: "A6", label: "중복" }, // 같은 ID → 버림
    { ...good, qId: "a7" }, // 소문자 ID → 버림
    { ...good, qId: "A7; DROP" }, // 형식 위반 → 버림
    { ...good, qId: "A8", score: 3.5 }, // 범위 밖 → 버림
    { ...good, qId: "A9", score: -1 }, // 범위 밖 → 버림
    { ...good, qId: "A10", score: "3" }, // 숫자 아님 → 버림
    { ...good, qId: "A11", prompt: "   " }, // 빈 문구 → 버림
    { ...good, qId: "A12", dimension: "현실 차원" }, // 차원 형식 위반 → 버림
    { ...good, qId: "A13", score: 1.37 }, // 슬라이더 소수 → 유지
    { ...good, qId: "A14", label: "x".repeat(500) }, // 길이 자름
    null,
    "A15",
  ]);
  check("정제 결과 3개(A6, A13, A14)", eq(out.map((a) => a.qId), ["A6", "A13", "A14"]), out.map((a) => a.qId));
  check("공백 정규화", out[0]?.prompt === "질문 문구", out[0]?.prompt);
  check("보기 길이 상한 200", out[2]?.label.length === 200, out[2]?.label.length);
  check("배열이 아니면 []", eq(sanitizeQuizAnswers({ qId: "A1" }), []) && eq(sanitizeQuizAnswers(undefined), []));
  const many = Array.from({ length: 60 }, (_, i) => ({ ...good, qId: `A${i + 1}` }));
  check(`개수 상한 ${QUIZ_ANSWERS_MAX}`, sanitizeQuizAnswers(many).length === QUIZ_ANSWERS_MAX);
  const real = answersFor("module4", {}, 2);
  check("실제 모듈 4 30문항 그대로 통과", sanitizeQuizAnswers(real).length === real.length && real.length === 30, real.length);
}

// ── 4. 세트 재료 묶음 ────────────────────────────────────────────────────
console.log("세트 재료 묶음");

/** 봇 n턴을 만들고, replyTurns에 든 턴 뒤에만 사용자 답을 붙인다. */
function historyUpTo(lastBotTurn: number, replyTurns: (t: number) => boolean): SetHistoryMessage[] {
  const h: SetHistoryMessage[] = [];
  for (let t = 1; t <= lastBotTurn; t++) {
    h.push({ role: "assistant", content: `봇 ${t}턴` });
    if (replyTurns(t)) h.push({ role: "user", content: `답 ${t}턴` });
  }
  return h;
}

const m1Answers = answersFor("module1", { A2: 3, A5: 2, A15: 3, A14: 2, V9: 0 });
{
  // 25턴 완주: 앱은 25턴 요청에 1~24턴 봇+답 기록을 보낸다.
  const packets = buildSetPackets(historyUpTo(24, () => true), m1, m1Answers);
  check("묶음 5개", packets.length === 5);
  check(
    "세트 1: ①② = 1·2턴, ③④⑤ = 3~5턴",
    eq(packets[0].opening_answers, ["답 1턴", "답 2턴"]) && eq(packets[0].module_answers, ["답 3턴", "답 4턴", "답 5턴"]),
    packets[0]
  );
  check(
    "세트 2: ①② = 6·7턴, ③④ = 8·9턴(10턴 답 제외)",
    eq(packets[1].opening_answers, ["답 6턴", "답 7턴"]) && eq(packets[1].module_answers, ["답 8턴", "답 9턴"]),
    packets[1]
  );
  check(
    "세트 3: 11~15턴",
    eq([...packets[2].opening_answers, ...packets[2].module_answers], ["답 11턴", "답 12턴", "답 13턴", "답 14턴", "답 15턴"])
  );
  check(
    "세트 4: 16~20턴",
    eq([...packets[3].opening_answers, ...packets[3].module_answers], ["답 16턴", "답 17턴", "답 18턴", "답 19턴", "답 20턴"])
  );
  check(
    "세트 5: ①② = 21·22턴, ③ = 23턴, 관점 전환 = 24턴",
    eq(packets[4].opening_answers, ["답 21턴", "답 22턴"]) &&
      eq(packets[4].module_answers, ["답 23턴"]) &&
      packets[4].perspective_answer === "답 24턴",
    packets[4]
  );
  check("모든 세트 대화 있음", packets.every((p) => p.has_chat));
  check(
    "인용 문항 = A2, A5, A15, A14, V9",
    eq(packets.map((p) => p.quiz?.id ?? null), ["A2", "A5", "A15", "A14", "V9"]),
    packets.map((p) => p.quiz?.id ?? null)
  );
  check(
    "세트 주제 키",
    eq(packets.map((p) => p.theme), ["scene", "repeat", "inner", "coping", "strength"])
  );
  check("인용 문항에 질문·보기·점수", packets[0].quiz?.prompt === m1Answers.find((a) => a.qId === "A2")!.prompt && packets[0].quiz?.score === 3);
  check("세트 1~4에는 perspective_answer 키 없음", packets.slice(0, 4).every((p) => !("perspective_answer" in p)));
}
{
  // 10턴 "마무리": 앱은 25턴 요청에 1~10턴 봇 + 1~9턴 답 기록을 보낸다(10턴 뒤 답 없음).
  const packets = buildSetPackets(historyUpTo(10, (t) => t < 10), m1, m1Answers);
  check("10턴 조기 종료: 세트 1·2 대화 있음", packets[0].has_chat && packets[1].has_chat);
  check(
    "10턴 조기 종료: 세트 3~5 대화 없음, 원문 비어 있음",
    packets.slice(2).every((p) => !p.has_chat && p.opening_answers.length === 0 && p.module_answers.length === 0),
    packets.slice(2)
  );
  check("10턴 조기 종료: 세트 5 perspective_answer null", packets[4].perspective_answer === null);
  check("10턴 조기 종료: 퀴즈 문항은 그대로 실림", packets[2].quiz?.id === "A15" && packets[4].quiz?.id === "V9");
}
{
  // 7분 뒤 "다 얘기했어요"로 4턴에 끝냄: 1~4턴 봇 + 1~3턴 답.
  const packets = buildSetPackets(historyUpTo(4, (t) => t < 4), m1, m1Answers);
  check(
    "4턴 조기 종료: 세트 1 일부만",
    eq(packets[0].opening_answers, ["답 1턴", "답 2턴"]) && eq(packets[0].module_answers, ["답 3턴"]) && packets[0].has_chat,
    packets[0]
  );
  check("4턴 조기 종료: 세트 2~5 대화 없음", packets.slice(1).every((p) => !p.has_chat));
}
{
  // 10턴 점검 뒤 "조금 더": 10턴 답은 어느 세트에도 들어가지 않는다.
  const packets = buildSetPackets(historyUpTo(12, () => true), m1, m1Answers);
  const all = packets.flatMap((p) => [...p.opening_answers, ...p.module_answers]);
  check("10턴 답은 세트에 넣지 않음", !all.includes("답 10턴") && all.includes("답 11턴"), all);
}
{
  // 기록 맨 앞이 사용자 메시지(비정상)이거나, 한 턴 뒤 사용자 메시지가 둘이면 첫 답만.
  const h: SetHistoryMessage[] = [
    { role: "user", content: "봇보다 먼저 온 메시지" },
    { role: "assistant", content: "봇 1턴" },
    { role: "user", content: "  첫\n답  " },
    { role: "user", content: "둘째 답" },
    { role: "assistant", content: "봇 2턴" },
    { role: "user", content: "x".repeat(2000) },
  ];
  const packets = buildSetPackets(h, m1, []);
  check("봇 앞 사용자 메시지 무시, 한 턴에 첫 답만, 공백 정규화", eq(packets[0].opening_answers[0], "첫 답"), packets[0].opening_answers);
  check(`원문 길이 상한 ${SET_ANSWER_MAX}`, packets[0].opening_answers[1]?.length === SET_ANSWER_MAX);
  check("퀴즈 답이 없으면 quiz 전부 null", packets.every((p) => p.quiz === null));
}

console.log(`\n통과 ${pass} · 실패 ${fail}`);
process.exit(fail === 0 ? 0 : 1);
