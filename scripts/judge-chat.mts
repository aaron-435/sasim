// Scores sim-chat conversations against the SPEC Q0 rubric with a stronger LLM judge, so a prompt
// change (Q1) can be compared to the pre-overhaul baseline item by item instead of by eye.
//   npx tsx --env-file=.env.local scripts/judge-chat.mts [--label baseline] [--model gpt-5.5] <sim_*.json> ...
//
// Input: files written by scripts/sim-chat.mts. The judge sees the transcript plus the module's
// playbook (lib/modulePlaybooks.ts) and the overlap checklist from MODULE_PLAYBOOK.md, because
// "expertise" and "no leak" only mean something against what the module is supposed to ask.
// The baseline bot doesn't follow the playbook yet (only turn 7 does) — that's the point: the
// baseline shows how far the current prompt is from the target.
//
// Rubric, each item 0–2 (null = the situation never came up, e.g. no self-blame → ⑦):
//   t1..t7   techniques ①–⑦ (SPEC Q1-b)
//   expertise, no_leak, no_repeat, natural
//   v_*      violations, split so Q1 can check none got worse: double question, advice, invented
//            emotion, body location, "one more" extension. `violations` = the worst of the five.
// (2026-09-27 Q1-e: the judge now gets the pre-chat quiz answers, psych-test type and saju chart the
// user already saw, so quoting them is not scored as invented, and ⑥ allows the one re-confirmation question turn 20 is told to ask.)
//
// (2026-10-02 TODO 5: v2 sim files — 5 sets, 25 turns — get the set structure instead of the 20-turn
// stages, all 30 quiz answers as "real answers", the v2 turn numbers in t6/v_extension, and five extra
// set-compliance items scored separately from the common ones: s_quote, s_axes, s_no_repeat_scene,
// s_recap (judge) and s_lead (turn-24 fixed lead, checked in code). The common-item average stays
// comparable with the q1e-* baseline; the set items get their own average row.)
//
// Writes scripts/out/<label>_<timestamp>.json (per-file scores with evidence, sim + judge cost) and a
// .md summary table next to it. scripts/out/ is git-ignored.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import {
  CHAT_SET_THEMES,
  getModuleChatSets,
  getModulePlaybook,
  PERSPECTIVE_SHIFT_LEAD,
  PLAYBOOK_STAGE_TURNS,
  type ModuleChatSets,
  type ModulePlaybook,
} from "../lib/modulePlaybooks.ts";
import type { Locale } from "../lib/i18n/types.ts";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "out");

// USD per 1M tokens (input/output). gpt-5.5 from the OpenAI pricing page (2026-09).
const PRICING: Record<string, { input: number; output: number }> = {
  "gpt-5.5": { input: 5, output: 30 },
  "gpt-5.4-mini": { input: 0.75, output: 4.5 },
};

const ITEMS = [
  ["t1", "① 이지선다"],
  ["t2", "② 깔때기"],
  ["t3", "③ 모순 짚기"],
  ["t4", "④ 확인형 가설"],
  ["t5", "⑤ 감정 어휘 좁히기"],
  ["t6", "⑥ 정리→재확인"],
  ["t7", "⑦ 폭로 후 리프레이밍"],
  ["expertise", "모듈 전문성"],
  ["no_leak", "옆 모듈로 새지 않음"],
  ["no_repeat", "반복 없음"],
  ["natural", "자연스러움"],
  ["v_double_question", "위반: 질문 2개"],
  ["v_advice", "위반: 조언"],
  ["v_invented_emotion", "위반: 감정 지어 붙이기"],
  ["v_body_location", "위반: 몸 위치 질문"],
  ["v_extension", "위반: '하나만 더' 연장"],
] as const;
// v2 (5-set flow) only. s_lead is decided in code, not by the judge.
const SET_ITEMS = [
  ["s_quote", "세트: ① 퀴즈 인용 정확도"],
  ["s_axes", "세트: ③④⑤ 축 분리"],
  ["s_no_repeat_scene", "세트: 같은 장면 반복 없음"],
  ["s_recap", "세트: 전환(받기→인용 이유→질문)"],
  ["s_lead", "세트: 24턴 고정 문구"],
] as const;
const JUDGED_SET_KEYS = SET_ITEMS.map(([k]) => k).filter((k) => k !== "s_lead");
type CommonKey = (typeof ITEMS)[number][0];
type SetKey = (typeof SET_ITEMS)[number][0];
type ItemKey = CommonKey | SetKey;
const VIOLATION_KEYS = ITEMS.map(([k]) => k).filter((k) => k.startsWith("v_"));

const RUBRIC_V1 = `
각 항목을 0, 1, 2 중 하나로 채점한다. 해당 상황이 대화에 아예 없었을 때만 null(예: 사용자가 자책 발언을 한 적이 없으면 t7은 null, 대화가 6턴 미만이면 t6은 null).
2 = 기준을 분명히 충족, 1 = 부분적이거나 한두 번만, 0 = 없거나 반대로 함.

[대화 기법]
- t1 ① 이지선다: 좁히는 질문을 "A인가요, B인가요?" 두 갈래로 주고 출구("둘 다 아니면 편하게")를 둔다. 보기가 모듈 축이나 사용자 재료에서 나왔는가. 열린 질문만 계속하면 0.
- t2 ② 깔때기: 질문 전에 직전 답을 한 줄로 재진술하고 그걸 전제로 범위를 좁히는가. 매 턴 주제가 새로 시작되면 0. 대화 전체가 한 가설을 향해 모이면 2.
- t3 ③ 모순 짚기: 사용자가 한 말 두 개 사이의 어긋남(또는 모듈의 모순 축)을 판단하지 않는 질문 형태로 짚는가. 없으면 0, 비난조면 0.
- t4 ④ 확인형 가설: 사용자가 말한 재료 두 개 이상을 엮은 가설을 "~인 걸까요?"처럼 확인형으로 묻는가. 재료 없이 단정하면 0.
- t5 ⑤ 감정 어휘 좁히기: 뭉뚱그린 감정("힘들다", "그냥 그래")을 구체 어휘 두세 개 중에서 고르게 해 좁히는가.
- t6 ⑥ 정리→재확인: 6·13·17·20턴에서 새 질문(탐색 질문) 없이 지금까지를 정리하고 맞는지 재확인하는가. 재확인 자체를 위한 물음("~라는 얘기죠?", "제가 이렇게 이해한 게 맞을까요?") 한 개는 이 기법의 일부이므로 감점하지 않는다. 매번 다른 표현이면 2, 같은 틀의 반복이면 1.
- t7 ⑦ 폭로 후 리프레이밍: 사용자의 자책 발언 바로 다음 응답에서, 자책을 그대로 받거나 서둘러 "그렇지 않아요"로 덮지 않고, 다른 해석을 여는 반박형 질문을 하는가(모듈의 리프레이밍 방향 참고). 조언으로 넘어가면 0.

[모듈]
- expertise 모듈 전문성: 그 분야 상담사만 물을 법한 질문(모듈 관점과 단계 질문 참고)이 나오는가. 시그니처 질문(또는 같은 뜻의 질문)이 자연스러운 자리에서 나오는가. 어느 모듈에나 쓸 수 있는 일반 질문뿐이면 0.
- no_leak 옆 모듈로 새지 않음: 겹침 점검표 기준으로 대화가 옆 모듈의 주제로 넘어가 머무르지 않는가. 짧게 닿고 돌아오면 괜찮다. 오래 머물면 0.

[품질]
- no_repeat 반복 없음: 같은 질문, 같은 시작 표현("~하셨군요", "그럴 수 있어요" 등), 같은 문장 틀을 되풀이하지 않는가. 세 번 이상 같은 틀이면 0.
- natural 자연스러움: 번역투, 템플릿 느낌, 어색한 호칭이 없는가. 해당 언어 원어민 상담사가 쓴 것처럼 읽히는가.

[위반] 2 = 한 번도 없음, 1 = 경계선 사례 1건, 0 = 명백한 사례가 1건 이상.
- v_double_question: 한 응답에 서로 다른 질문 두 개(물음표 두 개, 또는 "그리고 ~는요?" 식으로 두 번째 질문을 붙임).
- v_advice: 해결책·행동 권유·조언("~해 보세요", "~하는 게 좋아요"). 사용자가 해결책을 물어도 조언하면 위반. 안전 안내는 제외.
- v_invented_emotion: 사용자가 말하지 않은 감정·동기·경험을 사실처럼 덧붙임("무시당한 느낌이셨겠네요" — 사용자가 그런 말을 안 했으면 위반). 확인형 질문으로 묻는 건 위반이 아니다. 상담 전에 사용자가 본 심리검사 유형·사주 결과를 언급하거나, 퀴즈 답변(둘 다 아래 "사용자 정보"에 있음)을 "아까 '…' 질문에 '…'라고 답해 주셨는데"처럼 인용하는 건 사용자가 실제로 한 답이므로 위반이 아니다. 단, 목록에 없는 퀴즈 답을 인용하면 위반이다.
- v_body_location: 감정이 몸의 어디에서 느껴지는지 묻기.
- v_extension: 대화를 끝낼 자리(10턴 점검, 20턴, 사용자의 종료 의사)에서 "하나만 더", "조금만 더 얘기해 볼까요" 식으로 사용자에게 대화를 더 이어 가자고 끌기. 20턴 끝의 "잠시만 기다려 주세요, (결과/리포트를) 살펴볼게요" 같은 문장은 앱이 리포트 화면으로 넘어가는 정해진 마무리 문구이므로 위반이 아니다.
`.trim();

// 5세트 흐름: 턴 번호가 다른 두 항목(t6, v_extension)만 바꾸고 세트 준수 항목을 더한다. 나머지 기준은 V1과 같아야 비교가 된다.
const RUBRIC_V2 = RUBRIC_V1
  .replace(
    "6·13·17·20턴에서 새 질문(탐색 질문) 없이 지금까지를 정리하고 맞는지 재확인하는가.",
    "10턴 중간 점검에서 지금까지를 사용자 재료로 정리하고, 들은 대로 맞는지 평서문 재확인·정정 허락 줄로 확인하는가(2026-10-04 설계 변경: 세트를 여는 6·16·21턴은 정리·재확인 없이 짧게 받고 넘어가는 것이 정상이다 — 이 항목에서 감점하지 않는다). 25턴 마지막 응답은 사용자가 더 답할 수 없는 자리라 재확인 질문 없이 \"이렇게 정리가 되겠군요\" 같은 평서문으로 맺는 것이 정상이다(물음이 있으면 감점).",
  )
  .replace("(10턴 점검, 20턴, 사용자의 종료 의사)", "(10턴 점검, 25턴, 사용자의 종료 의사)")
  .replace(
    "\"하나만 더\", \"조금만 더 얘기해 볼까요\" 식으로 사용자에게 대화를 더 이어 가자고 끌기.",
    "\"하나만 더\", \"조금만 더 얘기해 볼까요\" 식으로 사용자에게 대화를 더 이어 가자고 끌기. 단 10턴 점검에서 \"더 이야기하고 싶은지, 여기서 마무리해도 괜찮은지\"를 같은 무게로 묻는 질문은 앱이 버튼으로 받는 정해진 설계라 위반이 아니다 — 계속 쪽에만 이유를 붙이거나 상담사가 계속하자고 제안할 때만 위반이다(2026-10-05).",
  )
  .replace("20턴 끝의 \"잠시만", "25턴 끝의 \"잠시만")
  + `

[세트 준수] (5세트 25턴 흐름. 아래 "세트 구조"와 "세트 ① 인용 기대값" 참고)
- s_quote 세트 ① 퀴즈 인용 정확도: 각 세트 ①(1·6·11·16·21턴)이 기대값의 문항을 인용하는가(질문 뜻과 고른 답이 맞으면 문장을 다듬어도 된다). 기대값이 "없음"인 세트는 인용 없이 그 세트의 기본 질문 취지로 물어야 맞다. 다른 문항이나 목록에 없는 답을 인용하면 그 세트는 틀림. 대화가 끝나 도달하지 못한 세트는 빼고 판단한다. 전부 맞으면 2, 한 세트 틀리면 1, 둘 이상 틀리면 0.
- s_axes ③④⑤ 축 분리: 각 세트의 ③④⑤ 질문이 서로 다른 축을 묻는가(같은 질문을 말만 바꿔 되묻지 않음), 직전 답을 받아 넘기는가 — 따로 한 줄로 받든 질문 첫머리에 몇 마디로 녹이든 둘 다 맞다(2026-10-04 설계: 짝수 턴은 재진술 줄 없이 질문 한 줄). 세트 3의 ⑤가 정해진 질문 대신 확인형 가설 질문인 것도 설계대로다.
- s_no_repeat_scene 같은 장면 반복 없음: 세트가 바뀌어도 이미 충분히 들은 같은 장면·같은 질문으로 돌아가지 않고 세트 주제(장면→반복→속마음→대처→힘)대로 다른 층을 여는가.
- s_recap 세트 전환 (2026-10-04 설계): 세트를 여는 6·11·16·21턴이 "직전 답을 짧게 받기(한두 구절)·새 쪽으로 넘어간다는 전환 → 테스트 답 인용과 지금 꺼내는 이유 → 그 인용한 답에서 나온 질문"이 한 흐름으로 이어지는가. 앞 세트를 길게 다시 정리하거나, 인용을 왜 꺼냈는지 없이 툭 놓거나, 질문이 인용과 무관하거나, 사용자가 하지 않은 말을 질문의 전제로 깔면 그 턴은 틀림. "고쳐 주세요" 같은 정정 허락 줄은 이 턴들에 없어야 맞다(10턴 점검에만 있음). 전부 맞으면 2, 한 턴 틀리면 1, 둘 이상 틀리면 0.`;

const rubricFor = (v2: boolean) => (v2 ? RUBRIC_V2 : RUBRIC_V1);

const OVERLAP: [string, string, string][] = [
  ["module1", "module9", "애착(1) vs 원가족(9): 지금의 친밀한 관계에서 거리 조절 vs 가족 체계 속 내 자리"],
  ["module4", "module11", "가면(4) vs 본능(11): 남 앞에서 보여 주는 모습 관리 vs 내가 원하는 것 자체를 삼킴"],
  ["module6", "module11", "분노(6) vs 본능(11): 선이 침범된 뒤의 에너지 vs 침범 없이도 스스로 욕구를 누름"],
  ["module3", "module8", "번아웃(3) vs 수면(8): 낮의 자원 고갈 구조 vs 밤에 꺼지지 않는 각성"],
  ["module5", "module10", "실행력(5) vs 몰입(10): 시작 직전의 브레이크 vs 시작 후 주의의 흩어짐과 과몰입"],
  ["module4", "module7", "가면(4) vs 예민함(7): 연기하는 비용 vs 자극을 깊이 받아들이는 신경계"],
  ["module2", "module4", "돈(2) vs 가면(4): 돈에 붙은 믿음과 감정 vs 사회적 이미지 전반"],
];

interface SimQuizAnswer { qId: string; dimension: string; prompt: string; label: string; score: number }
interface SimFile {
  persona: string;
  flowVersion?: 1 | 2;
  checkpoint?: "continue" | "finish" | null;
  setQuotes?: (SimQuizAnswer | null)[] | null;
  checks?: { perspectiveLead: boolean | null; quotes: { set: number; labelInReply: boolean | null }[] } | null;
  selfBlame?: boolean;
  situation: string;
  moduleId: string | null;
  locale: Locale;
  totalTurns: number;
  turns: { turn: number; bot: string[]; user: string | null; botMs: number; role?: { kind: string; set: number | null; position: number | null } | null }[];
  usage?: { totalCostUsd: number };
  botModel?: string;
  context?: {
    psychTestType?: string; psychTestSummary?: string; dominantSajuElement?: string;
    quizAnswer?: { prompt: string; label: string }; quizAnswerPool?: { prompt: string; label: string }[];
    quizAnswers?: SimQuizAnswer[];
  };
}

type Score = 0 | 1 | 2 | null;
interface ItemResult { score: Score; evidence: string }
interface JudgeResult {
  file: string;
  persona: string;
  moduleId: string | null;
  botModel: string;
  locale: string;
  turns: number;
  flowVersion: 1 | 2;
  /** Common items always; set items (s_*) only for v2 files. */
  scores: Partial<Record<ItemKey, Score>> & { violations: Score };
  details: Partial<Record<ItemKey, ItemResult>>;
  violationList: { turn: number; type: string; quote: string }[];
  summary: string;
  stats: { avgBotMs: number; openingRepeats: number };
  simCostUsd: number | null;
  judgeUsage: { promptTokens: number; completionTokens: number; costUsd: number | null };
}

function playbookBlock(pb: ModulePlaybook, locale: Locale, v2 = false): string {
  const stages = (Object.keys(pb.stages) as (keyof typeof pb.stages)[])
    .map((s) => `  ${s}(${PLAYBOOK_STAGE_TURNS[s].join("·")}턴): ${pb.stages[s]}`).join("\n");
  const overlaps = OVERLAP.filter(([a, b]) => a === pb.id || b === pb.id).map(([, , t]) => `  - ${t}`).join("\n");
  return [
    `모듈: ${pb.id}`,
    `전문 관점: ${pb.lens}`,
    `경계: ${pb.boundary}`,
    `시그니처 질문(${pb.signatureStage} 단계): ${pb.signatureQuestion[locale]}`,
    // v2 runs follow the sets (see "세트 구조"), not the 20-turn stages.
    ...(v2 ? [] : [`단계별 목표 질문(20턴 기준, 1·6·10·13·17·20턴은 고정 역할):\n${stages}`]),
    `${v2 ? 24 : 19}턴 관점 전환: ${pb.perspectiveShift.speaker} → ${pb.perspectiveShift.listener}`,
    `이지선다 축: ${pb.forcedChoiceAxes.map((a) => `${a.name}(${a.options[0][locale]} / ${a.options[1][locale]})`).join("; ")}`,
    `감정 팔레트: ${pb.emotionPalette.map((e) => e[locale]).join(", ")}`,
    `모순 축: ${pb.contradictions.join(" / ")}`,
    `리프레이밍: 자책 "${pb.reframe.selfBlame}" → ${pb.reframe.direction}`,
    `겹침 점검표:\n${overlaps || "  (해당 쌍 없음)"}`,
  ].join("\n");
}

/** v2: the module's 5 sets — theme, focus, ③④⑤ questions — in place of the 20-turn stages. */
function setsBlock(cs: ModuleChatSets, locale: Locale): string {
  return cs.sets.map((s) => {
    const th = CHAT_SET_THEMES[s.set];
    const qs = s.questions.map((q, i) => `③④⑤`[i] + ` ${q.text[locale]}${q.signature ? " (★시그니처)" : ""}`).join(" / ");
    return `  세트 ${s.set} ${th.name}(${th.description}) — ${s.focus}. ① 기본 질문(인용할 문항이 없을 때): ${s.fallbackQuestion[locale]}. ${qs}${s.alternate ? ` / 대체 질문: ${s.alternate.text[locale]}` : ""}`;
  }).join("\n");
}

const SET_TURNS_TEXT = "턴 배치: 1 인사+세트1① · 2~5 세트1②~⑤ · 6 세트1 정리+세트2① · 7~9 세트2②~④ · 10 정리+중간 점검 · 11~15 세트3①~⑤(정리 없음) · 16 세트3 정리+세트4① · 17~20 세트4②~⑤ · 21 세트4 정리+세트5① · 22~23 세트5②③ · 24 고정 문구+관점 전환 · 25 마무리. ①은 퀴즈 답 인용, ②는 ①의 답을 파고드는 자유 서술, ③④⑤는 아래 모듈 질문(이미 답이 나온 질문은 같은 세트의 다른 축으로 바꿔도 된다).";

function expectedQuotesBlock(sim: SimFile): string {
  return (sim.setQuotes ?? []).map((q, i) => `  - 세트 ${i + 1} ①: ${q ? `${q.qId} "${q.prompt}" → "${q.label}" (${q.score}점)` : "없음(기본 질문으로 묻는다)"}`).join("\n");
}

function transcriptBlock(sim: SimFile): string {
  return sim.turns.map((t) => [
    `[${t.turn}턴${t.role?.kind === "set" ? ` · 세트${t.role.set}-${"①②③④⑤"[(t.role.position ?? 1) - 1]}` : ""}] 상담사: ${t.bot.join(" / ")}`,
    ...(t.user === null ? [] : [`[${t.turn}턴] 사용자: ${t.user}`]),
  ].join("\n")).join("\n");
}

/** How many bot replies start with the same first few characters as an earlier reply — a cheap check next to the judge's no_repeat. */
function openingRepeats(sim: SimFile): number {
  const seen = new Set<string>();
  let repeats = 0;
  for (const t of sim.turns) {
    const head = (t.bot[0] ?? "").replace(/\s+/g, "").slice(0, 6);
    if (!head) continue;
    if (seen.has(head)) repeats++;
    seen.add(head);
  }
  return repeats;
}

/** Results the user already saw in the app before the chat (psych test, saju chart) — the bot is told to mention them. */
function priorResultsBlock(sim: SimFile): string {
  const c = sim.context ?? {};
  return [
    c.psychTestType && `  - 심리검사 유형: ${c.psychTestType}${c.psychTestSummary ? ` (${c.psychTestSummary})` : ""}`,
    `  - 사주 결과 화면${c.dominantSajuElement ? `(강한 오행: ${c.dominantSajuElement})` : ""}. 20턴 마무리에서 "들려주신 이야기와 사주를 함께 살펴볼게요"처럼 언급하는 건 정해진 문구다.`,
  ].filter(Boolean).join("\n");
}

/** The pre-chat quiz answers the bot is told it may quote (sim context) — without these the judge reads a quote as invented. */
function quizBlock(sim: SimFile): string {
  if (sim.flowVersion === 2 && sim.context?.quizAnswers?.length) {
    return sim.context.quizAnswers.map((a) => `  - ${a.qId} "${a.prompt}" → "${a.label}" (${a.score}점)`).join("\n");
  }
  const quotes = [sim.context?.quizAnswer, ...(sim.context?.quizAnswerPool ?? [])].filter((q): q is { prompt: string; label: string } => !!q);
  return quotes.length ? quotes.map((q) => `  - "${q.prompt}" → "${q.label}"`).join("\n") : "  (없음)";
}

const isScore = (v: unknown): v is Score => v === null || v === 0 || v === 1 || v === 2;

async function judge(file: string, model: string): Promise<JudgeResult> {
  const sim = JSON.parse(readFileSync(file, "utf8")) as SimFile;
  const pb = getModulePlaybook(sim.moduleId);
  if (!pb) throw new Error(`${file}: no playbook for moduleId ${sim.moduleId}`);
  const v2 = sim.flowVersion === 2;
  const cs = v2 ? getModuleChatSets(sim.moduleId) : undefined;
  if (v2 && !cs) throw new Error(`${file}: no chat sets for moduleId ${sim.moduleId}`);
  const judgedKeys: ItemKey[] = [...ITEMS.map(([k]) => k), ...(v2 ? JUDGED_SET_KEYS : [])];

  const system = `너는 심리 상담 대화 품질을 평가하는 엄격한 채점자다. 따뜻한 존댓말 상담 챗봇(${v2 ? "5세트 25턴" : "20턴"} 구성)의 대화를 루브릭으로 채점한다. 점수는 관대하게 주지 않는다. 근거는 반드시 턴 번호와 짧은 인용으로 댄다. 대화가 영어나 스페인어여도 설명은 한국어로 쓴다.

${rubricFor(v2)}

출력은 JSON 객체 하나:
{
  "items": { "<항목 키>": { "score": 0|1|2|null, "evidence": "턴 번호와 인용을 포함한 한두 문장" }, ... },
  "violations": [ { "turn": 숫자, "type": "v_로 시작하는 항목 키", "quote": "문제 문장" } ],
  "summary": "이 대화의 가장 큰 강점 하나와 가장 큰 약점 하나, 두 문장"
}
항목 키: ${judgedKeys.join(", ")}. 모든 키를 빠짐없이 쓴다.`;

  const user = `## 모듈 플레이북 (이 대화가 목표로 해야 하는 전문성)
${playbookBlock(pb, sim.locale, v2)}
${cs ? `\n## 세트 구조 (이 대화의 실제 흐름)\n${SET_TURNS_TEXT}${sim.checkpoint === "finish" ? "\n이 대화는 사용자가 10턴 중간 점검에서 \"마무리\"를 골라 바로 25턴 마무리로 넘어갔다(세트 3~5와 24턴은 없음)." : ""}\n${setsBlock(cs, sim.locale)}\n\n## 세트 ① 인용 기대값 (서버가 퀴즈 점수로 고른 문항)\n${expectedQuotesBlock(sim)}\n` : ""}
## 사용자 정보
언어: ${sim.locale}. 사용자가 상담 전에 앱에서 이미 본 결과(챗봇이 "아까 ~가 나왔던데"처럼 언급할 수 있으며, 지어낸 것이 아니다):
${priorResultsBlock(sim)}
상담 전 퀴즈에서 사용자가 실제로 고른 답(챗봇이 인용할 수 있음${v2 ? ", 30문항 전부" : ""}):
${quizBlock(sim)}
사용자는 시뮬레이션이며, 설정상 ${sim.selfBlame ? "자책 발언을 하는 성향이다" : "자책 발언 성향이 따로 없다(실제로 했는지는 대화를 보고 판단)"}.

## 대화 (${sim.turns.length}턴)
${transcriptBlock(sim)}`;

  let lastErr: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    const completion = await client.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
    });
    try {
      const parsed = JSON.parse(completion.choices[0]?.message?.content ?? "");
      const details: JudgeResult["details"] = {};
      const scores = { violations: null } as JudgeResult["scores"];
      for (const key of judgedKeys) {
        const it = parsed.items?.[key];
        if (!it || !isScore(it.score)) throw new Error(`bad or missing item ${key}: ${JSON.stringify(it)}`);
        details[key] = { score: it.score, evidence: String(it.evidence ?? "") };
        scores[key] = it.score;
      }
      if (v2) {
        // The fixed lead is prepended by code (lib/chat.ts prependPerspectiveLead), so check it exactly instead of asking the judge.
        const t24 = sim.turns.find((t) => t.turn === 24);
        const lead = PERSPECTIVE_SHIFT_LEAD[sim.locale] ?? PERSPECTIVE_SHIFT_LEAD.ko;
        const ok = t24 ? t24.bot[0]?.trim() === lead : null;
        scores.s_lead = ok === null ? null : ok ? 2 : 0;
        details.s_lead = { score: scores.s_lead, evidence: t24 ? `24턴 첫 줄: "${t24.bot[0] ?? ""}" (기대: "${lead}")` : "24턴 없음(10턴 마무리 등)" };
      }
      const vs = VIOLATION_KEYS.map((k) => scores[k] ?? null).filter((s): s is 0 | 1 | 2 => s !== null);
      scores.violations = vs.length ? (Math.min(...vs) as 0 | 1 | 2) : null;
      const promptTokens = completion.usage?.prompt_tokens ?? 0;
      const completionTokens = completion.usage?.completion_tokens ?? 0;
      const price = PRICING[model];
      return {
        file: basename(file),
        persona: sim.persona,
        moduleId: sim.moduleId,
        botModel: sim.botModel ?? "gpt-5.4-mini",
        locale: sim.locale,
        flowVersion: v2 ? 2 : 1,
        turns: sim.turns.length,
        scores,
        details,
        violationList: Array.isArray(parsed.violations) ? parsed.violations : [],
        summary: String(parsed.summary ?? ""),
        stats: {
          avgBotMs: Math.round(sim.turns.reduce((s, t) => s + t.botMs, 0) / sim.turns.length),
          openingRepeats: openingRepeats(sim),
        },
        simCostUsd: sim.usage?.totalCostUsd ?? null,
        judgeUsage: {
          promptTokens,
          completionTokens,
          costUsd: price ? (promptTokens * price.input + completionTokens * price.output) / 1_000_000 : null,
        },
      };
    } catch (err) {
      lastErr = err;
      console.warn(`! ${basename(file)}: judge output rejected (attempt ${attempt + 1}): ${err}`);
    }
  }
  throw lastErr;
}

const fmt = (s: Score | number | null) => (s === null ? "–" : typeof s === "number" && !Number.isInteger(s) ? s.toFixed(2) : String(s));
const mean = (xs: (Score | number)[]) => {
  const ns = xs.filter((x): x is number => x !== null);
  return ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : null;
};

function summaryTable(results: JudgeResult[]): string {
  const cols = results.map((r) => `${r.persona}·${r.moduleId}${r.botModel === "gpt-5.4-mini" ? "" : `·${r.botModel}`}`);
  const rows: string[] = [
    `| 항목 | ${cols.join(" | ")} | 평균 |`,
    `|---|${cols.map(() => "---:").join("|")}|---:|`,
  ];
  const anyV2 = results.some((r) => r.flowVersion === 2);
  const rowsFor = [...ITEMS, ["violations", "위반 종합(최저)"] as const, ...(anyV2 ? SET_ITEMS : [])];
  for (const [key, label] of rowsFor) {
    const vals = results.map((r) => r.scores[key as ItemKey | "violations"] ?? null);
    rows.push(`| ${label} | ${vals.map(fmt).join(" | ")} | ${fmt(mean(vals))} |`);
  }
  // Common items only, so the average stays comparable with the 20-turn baselines (q1e-*).
  const quality = results.map((r) => mean(ITEMS.map(([k]) => r.scores[k] ?? null)));
  rows.push(`| **전 항목 평균** (공통) | ${quality.map(fmt).join(" | ")} | ${fmt(mean(quality))} |`);
  if (anyV2) {
    const setAvg = results.map((r) => (r.flowVersion === 2 ? mean(SET_ITEMS.map(([k]) => r.scores[k] ?? null)) : null));
    rows.push(`| **세트 준수 평균** | ${setAvg.map(fmt).join(" | ")} | ${fmt(mean(setAvg))} |`);
  }
  rows.push(`| 턴 수 | ${results.map((r) => r.turns).join(" | ")} | |`);
  rows.push(`| 챗봇 평균 응답(ms) | ${results.map((r) => r.stats.avgBotMs).join(" | ")} | |`);
  rows.push(`| 같은 시작 표현 반복 | ${results.map((r) => r.stats.openingRepeats).join(" | ")} | |`);
  rows.push(`| 시뮬레이션 비용($) | ${results.map((r) => fmt(r.simCostUsd)).join(" | ")} | |`);
  rows.push(`| 채점 비용($) | ${results.map((r) => fmt(r.judgeUsage.costUsd)).join(" | ")} | |`);
  return rows.join("\n");
}

// ---- CLI ----
const args = process.argv.slice(2);
let label = "judge";
let model = "gpt-5.5";
const files: string[] = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--label") label = args[++i];
  else if (args[i] === "--model") model = args[++i];
  else files.push(args[i]);
}
if (files.length === 0) {
  console.error("usage: judge-chat.mts [--label baseline] [--model gpt-5.5] <scripts/out/sim_*.json> ...");
  process.exit(1);
}

const results = await Promise.all(files.map((f) => judge(f, model)));
const table = summaryTable(results);
const totalSim = results.reduce((s, r) => s + (r.simCostUsd ?? 0), 0);
const totalJudge = results.reduce((s, r) => s + (r.judgeUsage.costUsd ?? 0), 0);
const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "");
mkdirSync(OUT_DIR, { recursive: true });
const base = join(OUT_DIR, `${label}_${stamp}`);
writeFileSync(`${base}.json`, JSON.stringify({
  kind: "judge-chat",
  label,
  createdAt: new Date().toISOString(),
  judgeModel: model,
  inputs: files.map((f) => basename(f)),
  cost: { simUsd: totalSim, judgeUsd: totalJudge },
  results,
}, null, 2));
const md = `# ${label} (${stamp}, 채점 ${model})\n\n${table}\n\n비용: 시뮬레이션 $${totalSim.toFixed(4)} + 채점 $${totalJudge.toFixed(4)} = $${(totalSim + totalJudge).toFixed(4)}\n\n${results.map((r) => `- **${r.persona}·${r.moduleId}**: ${r.summary}`).join("\n")}\n`;
writeFileSync(`${base}.md`, md);
console.log(`${md}\n→ ${base}.json\n→ ${base}.md`);
