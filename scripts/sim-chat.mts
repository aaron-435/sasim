// Simulates the AI counseling chat end to end with LLM "users", so a prompt change can be judged on
// whole conversations instead of single replies.
//   npx tsx --env-file=.env.local scripts/sim-chat.mts [turns] [persona,persona,...] [moduleId] [quizPoolSize]
//
// persona: one of PERSONAS below (11 module personas + attach_en / anger_es, and module12's transition / transition_en / transition_es), or a legacy style
// (terse, talkative, lost, questioning). A module persona brings its own moduleId, quiz result,
// quiz-answer pool, locale and situation, so each module gets a coherent conversation — see
// scripts/judge-chat.mts, which scores the saved files. Legacy styles keep the old burnout fixture
// (moduleId default "module3"). The moduleId argument overrides the persona's own module ("-" or
// omitted keeps it); a mismatch is allowed but warned about, since the persona's story won't fit.
// --no-formulation stops echoing the hidden `formulation` memo back each turn (the app echoes it —
// TODO Q1-c), to compare against a web/older-app session. Each turn's memo is saved either way.
// --bot-model <id> runs the counselor turns on another model (TODO Q1-e model comparison); the user
// simulator and the extraction call stay on gpt-5.4-mini so only the chat model differs (without the flag
// the bot runs on lib/chat.ts's CHAT_MODEL — gpt-5.6-luna since 2026-09-28). Bot calls get
// the same sampling params the server would send for that model (lib/chat.ts's chatSamplingParams:
// gpt-5.5/5.6 take reasoning_effort instead of temperature); --reasoning <none|low|medium|high>
// overrides the effort (TODO 15-b).
// At the turn-10 checkpoint the simulated user always chooses to keep going, like tapping the app's
// "continue" button, so every run really has 20 turns to compare (the app's "finish" button jumps
// straight to turn 20, which a typed reply can't reproduce).
// quizPoolSize (default 4) trims the quiz-answer pool, so a run can exercise the quizAnswerPool
// fallback (turn 14 then 7 drops its quote first) — see lib/chatPrompts.ts's QUIZ_QUOTE_TURN_INDEX.
//
// --flow v2 runs the 5-set, 25-turn flow (TODO 5, flowVersion 2): the persona brings all 30 answers of
// its module's real quiz (mobile/lib/quiz), scored by V2_HIGH_DIMS below (its strong dimensions get
// 2–3, the rest 0–1), and the simulated user is told the answers the bot is expected to quote. The run
// stops on the server's final turn (isFinalTurn v2) and runs attachSetPackets like the route, so the
// extract carries set_packets. --checkpoint finish taps "wrap up" at turn 10: the next request jumps to
// turn 25 with no user message, like ChatScreen's handleWrapUpAtCheckpoint (default: continue).
// v2 files also record each turn's set role and a `checks` block (expected vs. quoted answer per set ①,
// the turn-24 fixed lead, set_packets) — judge-chat.mts scores set compliance on top.
//
// Every run writes scripts/out/sim_<timestamp>_<persona>_<moduleId>.json (transcript, extract,
// context, per-turn latency and tokens, total cost) in addition to printing it. scripts/out/ is
// git-ignored.
import { AsyncLocalStorage } from "node:async_hooks";
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import { getChatReply, extractChatSummary, attachSetPackets, chatSamplingParams, CHAT_MODEL, type ChatMessage, type ChatReasoningEffort } from "../lib/chat.ts";
import { chatFlowVersion, effectiveSetTurnRole, isFinalTurn, type ChatFormulation, type ChatSessionContext, type QuizAnswerQuote } from "../lib/chatPrompts.ts";
import { sanitizeQuizAnswers, selectAllSetQuizAnswers, TOTAL_TURNS_V2, type SetQuizAnswer, type SetTurnRole } from "../lib/chatSets.ts";
import { getModuleChatSets, PERSPECTIVE_SHIFT_LEAD } from "../lib/modulePlaybooks.ts";
import type { Locale } from "../lib/i18n/types.ts";
import { getLocalizedQuestions, getModuleById } from "../mobile/lib/quiz/modules.ts";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const USER_SIM_MODEL = "gpt-5.4-mini";
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "out");

// ---- token usage ----
// getChatReply/extractChatSummary don't return usage (lib/chat.ts only logs it to llm_usage_log), so
// every chat.completions.create call in this process is wrapped here and attributed to the persona
// run (AsyncLocalStorage, since personas run in parallel) and to the phase that made it.
// USD per 1M tokens (input/output); keep in step with lib/llmUsage.ts.
// Upper models from the OpenAI pricing page, standard tier, short context (2026-09-27).
const PRICING: Record<string, { input: number; output: number }> = {
  "gpt-5.4-mini": { input: 0.75, output: 4.5 },
  "gpt-5.4": { input: 2.5, output: 15 },
  "gpt-5.5": { input: 5, output: 30 },
  "gpt-5.6-luna": { input: 0.1, output: 0.5 },
  "gpt-5.6-sol": { input: 2, output: 10 },
  "gpt-5.6-terra": { input: 2, output: 12 },
};
let botModel: string | undefined;
let reasoningEffort: ChatReasoningEffort | undefined;
type Phase = "bot" | "userSim" | "extract";
interface Usage { calls: number; promptTokens: number; completionTokens: number; costUsd: number }
interface RunUsage { phase: Phase; last: { promptTokens: number; completionTokens: number } | null; byPhase: Record<Phase, Usage> }
const emptyUsage = (): Usage => ({ calls: 0, promptTokens: 0, completionTokens: 0, costUsd: 0 });
const usageStore = new AsyncLocalStorage<RunUsage>();
type CreateFn = (...a: unknown[]) => Promise<OpenAI.Chat.ChatCompletion>;
function wrapCreate(origCreate: CreateFn): CreateFn {
  return async function (this: unknown, ...args: unknown[]) {
    // Parallel 20-turn personas can hit the org's tokens-per-minute limit after the SDK's own 2
    // retries; keep waiting here so one 429 doesn't throw away a whole run that has already been paid for.
    let completion: OpenAI.Chat.ChatCompletion;
    const run0 = usageStore.getStore();
    if (botModel && run0?.phase === "bot") {
      const { temperature = 0.8, ...rest } = args[0] as Record<string, unknown>;
      const req = { ...rest, model: botModel, ...chatSamplingParams(botModel, temperature as number, reasoningEffort) };
      args = [req, ...args.slice(1)];
    }
    for (let attempt = 0; ; attempt++) {
      try {
        completion = await origCreate.apply(this, args);
        break;
      } catch (err) {
        if ((err as { status?: number }).status !== 429 || attempt >= 6) throw err;
        await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
      }
    }
    const run = usageStore.getStore();
    if (run && completion.usage) {
      const { prompt_tokens: promptTokens, completion_tokens: completionTokens } = completion.usage;
      const price = PRICING[completion.model] ?? PRICING[(args[0] as { model: string }).model];
      const u = run.byPhase[run.phase];
      u.calls++;
      u.promptTokens += promptTokens;
      u.completionTokens += completionTokens;
      u.costUsd += price ? (promptTokens * price.input + completionTokens * price.output) / 1_000_000 : NaN;
      run.last = { promptTokens, completionTokens };
    }
    return completion;
  };
}
// tsx loads lib/chat.ts as CommonJS (package.json has no "type": "module"), so it gets the CJS build of
// the openai package — a different Completions class from this file's ESM import. Patch both.
const cjsOpenAI = createRequire(import.meta.url)("openai") as typeof import("openai");
for (const Completions of new Set([OpenAI.Chat.Completions, (cjsOpenAI.default ?? cjsOpenAI).Chat.Completions])) {
  Completions.prototype.create = wrapCreate(Completions.prototype.create as unknown as CreateFn) as unknown as typeof Completions.prototype.create;
}

interface Persona {
  /** What the simulated user knows about themselves and how they talk. Written in the persona's locale. */
  situation: string;
  /** Set when the persona blames themselves out loud — judge-chat checks the bot doesn't pile on or rush to reassure. */
  selfBlame?: boolean;
  context: ChatSessionContext;
}

type Ctx = ChatSessionContext;
const ko = (moduleId: string, c: Omit<Ctx, "locale" | "moduleId">): Ctx => ({ ...c, moduleId, locale: "ko" });
const q = (prompt: string, label: string): QuizAnswerQuote => ({ prompt, label });

// ---- legacy styles: one burnout fixture, different talking styles ----
const LEGACY_POOL: QuizAnswerQuote[] = [
  q("일이 잘 안 풀릴 때 나는?", "감정을 잘 못 느끼고 그냥 멍해진다"),
  q("이런 상태가?", "예전에도 몇 번 이렇게 지쳐본 적 있다"),
  q("제일 무서운 건?", "이러다 아예 무너져버릴까 봐"),
  q("힘들 때 나는 보통?", "아무렇지 않은 척 계속 일한다"),
];
const LEGACY_CTX = ko("module3", {
  track: "career",
  sajuElements: { wood: 33, fire: 0, earth: 50, metal: 17, water: 0 },
  dominantSajuElement: "earth",
  psychTestType: "완주형 소진",
  psychTestSummary: "완벽주의가 높고 회복이 낮은 편이에요.",
  quizAnswer: q("쉬는 날 나는?", "쉬어도 마음이 불편하다"),
  quizAnswerPool: LEGACY_POOL,
});
const LEGACY_STYLES: Record<string, string> = {
  terse: "너는 30대 직장인이다. 말수가 적고 자기 감정을 잘 모른다. 대부분 한 줄, 짧게 '모르겠네', '그냥 좀 그래' 식으로 답한다. 가끔 되묻는다('돈 관련이야?', '그게 뭔 상관이야?'). 최근 회사에서 월요일 아침 메신저가 오면 머리가 굳는 느낌이 든다는 게 실제 상황이다.",
  talkative: "너는 30대 직장인이다. 이야기를 잘 풀어놓는 편이다. 두세 문장으로 구체적인 장면(월요일 아침 팀장의 메신저, 몸이 굳는 느낌, 예전에도 비슷했던 일)을 말한다. 질문에는 성실히 답한다.",
  lost: "너는 자기가 왜 힘든지 잘 모른다. 아주 짧게 반말로 답한다('모르겠네', '머리가 굳는 느낌이야', '멍해지면서 아무 생각이 안 들어'). 상담사가 맞혀 주길 바라며 '돈 관련이야?' 처럼 되묻기도 한다. 실제로는 회사 일이 쌓이는 것과 월요일 아침이 힘들다.",
  questioning: "너는 30대 직장인이다. 상담사를 조금 의심한다. '이게 사주랑 무슨 상관이야?', '그래서 어떻게 하라는 거야?', '그냥 답 좀 알려줘' 같은 질문을 자주 한다. 그래도 한두 번은 속마음을 살짝 말한다. 상황: 번아웃, 쉬어도 쉬는 것 같지 않다.",
};

// ---- module personas: one per module (ko) + EN/ES ----
const PERSONAS: Record<string, Persona> = {
  attach: {
    situation: "너는 29살 여성 디자이너다. 사귄 지 8개월 된 남자친구가 답장이 늦으면 심장이 빨라지고 휴대폰을 계속 확인한다. 지난주 그가 친구들과 술자리에서 3시간 연락이 없었을 때 '나한테 관심 없어진 거지?'라고 보냈다가 후회했다. 예전 연애도 비슷하게 끝났다. 말은 솔직한 편이고 두세 문장으로 답하지만, 캐물으면 '그냥 제가 너무 예민한 거죠 뭐'라며 넘기려 한다.",
    context: ko("module1", {
      track: "romance",
      sajuElements: { wood: 17, fire: 33, earth: 0, metal: 17, water: 33 },
      dominantSajuElement: "fire",
      psychTestType: "불안형 (Anxious-Preoccupied)",
      psychTestSummary: "관계에서 버려질까 하는 불안이 높고, 회피는 낮은 편이에요.",
      quizAnswer: q("연인이 답장이 늦으면?", "무슨 일 있나 계속 휴대폰을 확인한다"),
      quizAnswerPool: [
        q("다툰 뒤 나는?", "먼저 연락하지 않으면 불안해서 견딜 수 없다"),
        q("연애할 때 자주 드는 생각은?", "내가 더 많이 좋아하는 것 같다"),
        q("가장 두려운 건?", "결국 떠나버리는 것"),
        q("불안할 때 나는?", "상대에게 확인받으려고 계속 묻는다"),
      ],
    }),
  },
  money: {
    selfBlame: true,
    situation: "너는 34살 남성 회사원이다. 월급이 들어오면 며칠 안에 배달, 옷, 게임 결제로 상당 부분이 사라지고, 월말엔 통장을 보기가 무섭다. 부모님이 늘 돈 문제로 싸우셨고 '우리 집은 돈이 없다'는 말을 듣고 자랐다. 스스로를 '돈 관리 못 하는 한심한 놈'이라고 자주 말한다. 짧게 답하다가 가끔 한 번에 몰아서 털어놓는다.",
    context: ko("module2", {
      track: "career",
      sajuElements: { wood: 0, fire: 17, earth: 17, metal: 33, water: 33 },
      dominantSajuElement: "metal",
      psychTestType: "결핍공포형",
      psychTestSummary: "돈이 사라질 것에 대한 불안이 크고, 스트레스를 소비로 푸는 경향이 함께 보여요.",
      quizAnswer: q("월급날 나는?", "며칠 만에 꽤 많이 써버린다"),
      quizAnswerPool: [
        q("잔고를 확인할 때?", "보기가 무서워서 미룬다"),
        q("돈에 대해 어릴 때 들은 말은?", "우리 집은 돈이 없다"),
        q("가장 두려운 건?", "나이 들어서 빈털터리가 되는 것"),
        q("스트레스 받으면?", "뭔가를 산다"),
      ],
    }),
  },
  burnout: {
    situation: "너는 38살 간호사다. 3교대 12년 차이고, 요즘은 출근길 주차장에서 10분씩 차에 앉아 있다가 들어간다. 환자에게 예전만큼 마음이 안 가서 스스로 놀란다. 쉬는 날엔 하루 종일 누워 있는데도 피곤하다. 차분하고 성실하게, 두세 문장으로 답한다.",
    context: ko("module3", {
      track: "career",
      sajuElements: { wood: 17, fire: 17, earth: 50, metal: 0, water: 17 },
      dominantSajuElement: "earth",
      psychTestType: "소진형",
      psychTestSummary: "에너지가 바닥난 상태지만, 일에 대한 애정은 아직 남아 있어요.",
      quizAnswer: q("출근 전 나는?", "몸이 무겁고 들어가기가 싫다"),
      quizAnswerPool: [
        q("쉬는 날 나는?", "누워만 있어도 피곤하다"),
        q("일에 대한 마음은?", "예전만큼 마음이 가지 않는다"),
        q("가장 두려운 건?", "이러다 일을 그만두게 될까 봐"),
        q("버티는 방법은?", "그냥 참고 계속 한다"),
      ],
    }),
  },
  mask: {
    situation: "너는 27살 영업직 여성이다. 회사에서 '분위기 메이커'로 불리고 늘 웃고 있지만, 퇴근해서 집 문을 닫는 순간 말 한마디 하기 싫을 정도로 지친다. 친한 친구에게도 힘든 얘기를 못 한다. 밝은 말투로 답하다가, 핵심을 찔리면 잠깐 말이 짧아진다.",
    context: ko("module4", {
      track: "career",
      sajuElements: { wood: 33, fire: 33, earth: 17, metal: 0, water: 17 },
      dominantSajuElement: "fire",
      psychTestType: "이미지관리형",
      psychTestSummary: "상황과 상대에 맞춰 보여주는 모습을 세심하게 조정하는 편이에요.",
      quizAnswer: q("사람들 앞에서 나는?", "기분과 상관없이 밝게 행동한다"),
      quizAnswerPool: [
        q("혼자 있을 때 나는?", "그제야 표정이 풀린다"),
        q("진짜 속마음은?", "가까운 사람에게도 잘 말하지 않는다"),
        q("가장 두려운 건?", "진짜 내 모습을 보면 실망할까 봐"),
        q("지칠 때 나는?", "약속을 취소하고 혼자 있는다"),
      ],
    }),
  },
  procrast: {
    selfBlame: true,
    situation: "너는 31살 프리랜서 번역가다. 마감이 2주 남은 큰 일감을 받아 놓고 파일을 열지도 못한 채 유튜브만 본다. 마감 직전에 밤새워 끝내는 게 매번 반복된다. '저는 원래 게으른 사람이에요', '의지가 약해서'라고 자주 말한다. 한두 문장으로 답하고, 자조적인 농담을 섞는다.",
    context: ko("module5", {
      track: "career",
      sajuElements: { wood: 17, fire: 0, earth: 17, metal: 17, water: 50 },
      dominantSajuElement: "water",
      psychTestType: "완벽주의형",
      psychTestSummary: "확신이 서지 않으면 시작 자체를 미루는, 높은 기준이 발목을 잡는 패턴이 보여요.",
      quizAnswer: q("큰 일을 앞두고 나는?", "시작 버튼을 누르기까지가 제일 힘들다"),
      quizAnswerPool: [
        q("미루는 동안 나는?", "계속 신경 쓰이는데 손은 안 간다"),
        q("일을 시작하기 전?", "완벽하게 할 자신이 없으면 손이 안 간다"),
        q("가장 두려운 건?", "해봤는데 별로라는 걸 확인하는 것"),
        q("결국 나는?", "마감 직전에 몰아서 한다"),
      ],
    }),
  },
  anger: {
    selfBlame: true,
    situation: "너는 36살 워킹맘이다. 평소엔 참다가 아이가 숙제를 안 하거나 남편이 설거지를 미루면 어느 순간 소리를 지른다. 그러고 나면 아이 얼굴이 떠올라 밤새 자책한다. '제가 엄마 자격이 없는 것 같아요' 같은 말을 한다. 감정이 올라오면 문장이 길어진다.",
    context: ko("module6", {
      track: "career",
      sajuElements: { wood: 17, fire: 50, earth: 17, metal: 17, water: 0 },
      dominantSajuElement: "fire",
      psychTestType: "참다가 터짐형",
      psychTestSummary: "평소엔 웬만하면 삼키다가, 어느 순간 쌓인 게 한꺼번에 터지는 패턴이 보여요.",
      quizAnswer: q("가까운 사람에게 서운해도?", "괜찮은 척하다가 나중에 폭발한다"),
      quizAnswerPool: [
        q("화를 참고 나면?", "응어리가 남는다"),
        q("화를 내는 것에 대해?", "화내면 안 될 것 같은 죄책감이 든다"),
        q("가장 두려운 건?", "아이에게 상처를 남기는 것"),
        q("화가 난 뒤 나는?", "두고두고 곱씹는다"),
      ],
    }),
  },
  sensitive: {
    situation: "너는 25살 대학원생이다. 연구실 형광등, 옆자리 사람의 키보드 소리, 단체 회식 같은 게 너무 버겁다. 남들은 아무렇지 않아 보여서 '내가 유난인가' 싶다. 조용하고 조심스럽게, 짧게 답하지만 감각 묘사는 구체적이다.",
    context: ko("module7", {
      track: "career",
      sajuElements: { wood: 33, fire: 0, earth: 0, metal: 17, water: 50 },
      dominantSajuElement: "water",
      psychTestType: "과부하형",
      psychTestSummary: "여러 자극이 한꺼번에 몰리면 쉽게 압도되고, 혼자만의 시간이 꼭 필요한 편이에요.",
      quizAnswer: q("시끄러운 곳에 오래 있으면?", "머리가 멍해지고 빨리 나가고 싶다"),
      quizAnswerPool: [
        q("사람 많은 모임 뒤에?", "하루는 혼자 있어야 회복된다"),
        q("작은 소리나 빛에?", "남들보다 쉽게 신경이 쓰인다"),
        q("가장 두려운 건?", "예민한 사람으로 찍히는 것"),
        q("버거울 때 나는?", "이어폰을 끼고 차단한다"),
      ],
    }),
  },
  sleep: {
    situation: "너는 42살 중간관리자다. 새벽 1시에 누워도 내일 회의, 지난 실수, 대출 이자 같은 생각이 꼬리를 물어 3시가 넘어야 잠든다. 주말에 몰아 자도 개운하지 않다. 논리적으로, 약간 건조하게 답한다. 가끔 '그래서 수면제라도 먹어야 하나요?'처럼 해결책을 묻는다.",
    context: ko("module8", {
      track: "career",
      sajuElements: { wood: 0, fire: 17, earth: 17, metal: 50, water: 17 },
      dominantSajuElement: "metal",
      psychTestType: "생각과잉형",
      psychTestSummary: "누우면 생각이 꼬리를 물어 잠들기까지 시간이 오래 걸리는 편이에요.",
      quizAnswer: q("누우면 나는?", "하루 일이 머릿속에서 다시 재생된다"),
      quizAnswerPool: [
        q("잠들기 전 휴대폰은?", "안 보려 해도 결국 본다"),
        q("아침에 일어나면?", "잔 것 같지 않다"),
        q("가장 두려운 건?", "이러다 일에서 실수할까 봐"),
        q("잠이 안 올 때 나는?", "그냥 누워서 버틴다"),
      ],
    }),
  },
  family: {
    selfBlame: true,
    situation: "너는 33살 장녀다. 엄마가 하루에도 몇 번씩 전화해 아빠 흉을 보고, 동생 걱정을 너에게 떠넘긴다. 전화를 안 받으면 죄책감이 들고, 받으면 하루 종일 기분이 가라앉는다. '제가 못된 딸인가 봐요'라고 자주 말한다. 가족 얘기가 나오면 말이 많아지지만 자기 감정 얘기는 피한다.",
    context: ko("module9", {
      track: "career",
      sajuElements: { wood: 17, fire: 17, earth: 33, metal: 0, water: 33 },
      dominantSajuElement: "earth",
      psychTestType: "정서적 얽힘형",
      psychTestSummary: "가족의 감정이 나도 모르게 크게 전이되고, 그 영향에서 벗어나기 어려운 편이에요.",
      quizAnswer: q("가족이 힘들어하면?", "내가 해결해야 할 것 같다"),
      quizAnswerPool: [
        q("가족 전화를 받고 나면?", "한동안 기분이 가라앉는다"),
        q("집에서 나는 주로?", "중간에서 달래는 역할이었다"),
        q("가장 두려운 건?", "내가 거리를 두면 가족이 무너질까 봐"),
        q("부담스러울 때 나는?", "그래도 결국 다 들어준다"),
      ],
    }),
  },
  focus: {
    situation: "너는 28살 개발자다. 업무 중에 슬랙 알림, 뉴스, 다른 탭으로 계속 새서 30분 이상 한 가지를 못 한다. 그런데 관심 있는 사이드 프로젝트는 밤새 붙잡고 있다. 빠르고 가볍게, 가끔 반말 섞어서 답한다.",
    context: ko("module10", {
      track: "career",
      sajuElements: { wood: 50, fire: 17, earth: 0, metal: 17, water: 17 },
      dominantSajuElement: "wood",
      psychTestType: "산만형",
      psychTestSummary: "여러 자극이 눈에 들어오면 쉽게 그쪽으로 정신이 팔리는 편이에요.",
      quizAnswer: q("일하다가 알림이 오면?", "바로 확인하고 다른 걸 하게 된다"),
      quizAnswerPool: [
        q("관심 있는 일을 할 때?", "시간 가는 줄 모른다"),
        q("집중이 깨진 뒤에?", "다시 돌아오기가 어렵다"),
        q("가장 두려운 건?", "능력이 없어서 그런 걸로 보일까 봐"),
        q("집중이 안 될 때 나는?", "카페로 자리를 옮긴다"),
      ],
    }),
  },
  instinct: {
    selfBlame: true,
    situation: "너는 30살 공무원이다. 노래방이나 회식에서 다들 신나게 노는데 혼자 굳어 있고, 춤이나 즉흥적인 행동은 상상만 해도 얼굴이 뜨거워진다. 어릴 때 '얌전해야 한다'는 말을 많이 들었다. '제가 재미없는 사람이라서요'라고 자조한다. 짧고 조심스럽게 답한다.",
    context: ko("module11", {
      track: "career",
      sajuElements: { wood: 17, fire: 0, earth: 33, metal: 33, water: 17 },
      dominantSajuElement: "earth",
      psychTestType: "표현억제형",
      psychTestSummary: "사람들 앞에서 나를 자유롭게 드러내는 게 유독 어렵게 느껴지는 편이에요.",
      quizAnswer: q("사람들 앞에서 노래하거나 춤추라고 하면?", "몸이 굳고 빠져나갈 궁리를 한다"),
      quizAnswerPool: [
        q("신나는 음악이 나오면?", "속으로만 따라 한다"),
        q("어릴 때 자주 들은 말은?", "얌전히 있어라"),
        q("가장 두려운 건?", "사람들이 나를 우스워 보는 것"),
        q("하고 싶은데 못 한 게 있으면?", "나중에 혼자 아쉬워한다"),
      ],
    }),
  },
  attach_en: {
    situation: "You are a 32-year-old woman in Chicago who works in marketing. When your boyfriend of a year goes quiet for a few hours, you draft and delete texts and replay the last thing you said. Last month you checked his location three times during his work trip and felt ashamed. You're warm and fairly open, answer in two or three sentences, and sometimes deflect with 'I know, I'm being dramatic.'",
    context: {
      track: "romance",
      sajuElements: { wood: 17, fire: 17, earth: 17, metal: 0, water: 50 },
      dominantSajuElement: "water",
      psychTestType: "Anxious-Preoccupied",
      psychTestSummary: "You tend to worry about being left, and you rarely pull away yourself.",
      quizAnswer: q("When your partner is slow to reply, you…", "check your phone again and again"),
      quizAnswerPool: [
        q("After an argument, you…", "can't settle until you've reached out first"),
        q("In relationships you often think…", "I care more than they do"),
        q("What scares you most is…", "that they'll eventually leave"),
        q("When you feel anxious, you…", "ask for reassurance more than once"),
      ],
      moduleId: "module1",
      locale: "en",
    },
  },
  anger_es: {
    selfBlame: true,
    situation: "Eres un hombre de 40 años de Ciudad de México, jefe de un pequeño taller. Aguantas mucho con los clientes y los empleados, pero en casa explotas por cosas pequeñas, como el ruido de la tele, y luego te sientes mal durante días. Dices cosas como 'soy un bruto, así me hicieron'. Respondes en frases cortas y directas, en español informal de México.",
    context: {
      track: "career",
      sajuElements: { wood: 17, fire: 33, earth: 33, metal: 17, water: 0 },
      dominantSajuElement: "fire",
      psychTestType: "Aguantar hasta explotar",
      psychTestSummary: "Sueles tragarte el enojo hasta que, en algún momento, todo sale de golpe.",
      quizAnswer: q("Cuando alguien cercano te molesta…", "haces como si nada y luego explotas"),
      quizAnswerPool: [
        q("Después de aguantarte el enojo…", "te queda un resentimiento"),
        q("Sobre enojarte, piensas que…", "no deberías enojarte y te sientes culpable"),
        q("Lo que más temes es…", "que tu familia te tenga miedo"),
        q("Después de enojarte, tú…", "le das vueltas durante días"),
      ],
      moduleId: "module6",
      locale: "es",
    },
  },
  // module12 (새 출발, TODO 11): one persona per locale, each strong on a different pair of dimensions.
  transition: {
    selfBlame: true,
    situation: "너는 31살이다. 5년 다닌 회사를 석 달 전에 그만뒀고, 다음 회사는 아직 정하지 못했다. 아침이면 예전 출근 시간에 눈이 떠지고, 예전 팀 단톡방을 몰래 읽는다. 친구들이 승진하거나 이사했다는 소식을 들으면 하루 종일 가라앉는다. '나만 아직 제자리예요'라고 자주 말한다. 차분하지만 말끝을 흐리며, 두세 문장으로 답한다.",
    context: ko("module12", {
      track: "career",
      sajuElements: { wood: 17, fire: 17, earth: 33, metal: 0, water: 33 },
      dominantSajuElement: "earth",
      psychTestType: "안개 속 회상형",
      psychTestSummary: "예전은 아직 놓이지 않았고 다음은 아직 보이지 않아, 그 사이에서 마음이 오래 머무는 편이에요.",
      quizAnswer: q("'요즘 뭐 해?'라는 질문을 받으면?", "대답하기가 곤란하다"),
      quizAnswerPool: [
        q("예전 사진이나 메시지를 다시 보게 되면?", "한동안 그 시절에 머문다"),
        q("주변 사람들이 하나둘 자리를 잡는 소식을 들으면?", "나와 비교하게 된다"),
        q("변화의 한가운데에 있을 때, 나에 대해 드는 생각은?", "내가 누군지 흐릿하다"),
        q("계획 없이 비어 있는 주말이 생기면?", "불안해서 뭔가로 채운다"),
      ],
    }),
  },
  transition_en: {
    situation: "You are 29 and live in Seattle. Eight months ago a four-year relationship ended and you moved out of the apartment you shared, into a studio across town. You still take the old bus route on weekends, and you haven't unpacked two boxes. Coworkers invite you out and you usually say you're tired. You're thoughtful and a little wry, and answer in two or three sentences.",
    context: {
      track: "career",
      sajuElements: { wood: 33, fire: 0, earth: 17, metal: 17, water: 33 },
      dominantSajuElement: "wood",
      psychTestType: "Living in Two Places",
      psychTestSummary: "You're physically in the new place, but part of your heart is still back in the old one.",
      quizAnswer: q("When you come across old photos or messages?", "I stay in that time for a while"),
      quizAnswerPool: [
        q("Clearing out things from that chapter?", "I can't quite bring myself to"),
        q("Finding a regular café or a familiar spot in a new neighborhood?", "I don't really make one"),
        q("When someone invites you to a new group or opportunity?", "I make an excuse and put it off"),
        q("Feeling like you're one of the locals in a new place?", "It barely comes, even after a long time"),
      ],
      moduleId: "module12",
      locale: "en",
    },
  },
  transition_es: {
    selfBlame: true,
    situation: "Tienes 35 años. Hace cinco meses te mudaste de Bogotá a Madrid por un trabajo nuevo. Firmaste el contrato en una semana porque no soportabas seguir sin saber qué venía, y ahora sientes que vas con prisa por todo pero sin terminar de llegar. En la oficina casi no hablas con nadie y cada error te hace pensar en volver. Dices cosas como 'soy un desastre para empezar de cero'. Respondes en frases cortas, en un español neutro y cálido.",
    context: {
      track: "career",
      sajuElements: { wood: 17, fire: 33, earth: 17, metal: 33, water: 0 },
      dominantSajuElement: "fire",
      psychTestType: "Prisa y pausa",
      psychTestSummary: "Quieres encontrar tu lugar rápido, pero cuando llega lo nuevo, te cuesta poner el corazón en ello.",
      quizAnswer: q("A la hora de elegir tu próximo camino…", "Necesito decidir rápido para quedarme en paz"),
      quizAnswerPool: [
        q("Cuando te equivocas en un lugar nuevo…", "Me pregunto si este es mi lugar"),
        q("Acercarte primero a gente que acabas de conocer…", "Espero a que alguien venga a mí"),
        q("Cuando tienes que esperar una respuesta clara…", "Reviso y averiguo una y otra vez"),
        q("Armar una nueva rutina diaria…", "Se me desarma una y otra vez"),
      ],
      moduleId: "module12",
      locale: "es",
    },
  },
};

// The user simulator's frame, in the persona's language so an EN/ES persona doesn't drift into Korean.
const SIM_FRAME: Record<string, string> = {
  ko: "지금 AI 상담 챗봇과 메신저로 대화 중이다. 방금 챗봇이 한 말에 자연스럽게 한 번만 답해라. 따옴표 없이 답변 문장만.",
  en: "You're chatting with an AI counseling chatbot in a messaging app. Reply once, naturally, to what the bot just said. Only your message, no quotation marks.",
  es: "Estás hablando con un chatbot de acompañamiento emocional por mensajes. Responde una sola vez, con naturalidad, a lo que acaba de decir el bot. Solo tu mensaje, sin comillas.",
};

// ---- flow v2: 30 quiz answers per persona ----
// The dimensions each persona scores high on (2–3 points), chosen to fit its situation; every other
// dimension scores 0–1. Each module keeps at least one low dimension among set 5's candidates (so the
// "low score" strength quote has something to pick), except modules 7/10 whose set 5 quotes high scores.
const V2_HIGH_DIMS: Record<string, string[]> = {
  attach: ["anxiety"],
  attach_en: ["anxiety"],
  money: ["scarcity", "avoidance"],
  burnout: ["exhaustion", "cynicism"],
  mask: ["imageManagement", "concealment"],
  procrast: ["perfectionism", "avoidance"],
  anger: ["suppression", "explosion"],
  anger_es: ["suppression", "explosion"],
  sensitive: ["overstimulation", "aestheticSensitivity", "lowSensoryThreshold"],
  sleep: ["cognitiveArousal", "subconsciousLeak"],
  family: ["enmeshment", "parentification"],
  focus: ["distractibility", "hyperfocus"],
  instinct: ["expressionSuppression", "confidenceLack"],
  transition: ["lookingBack", "inBetween"],
  transition_en: ["lookingBack", "restartHesitation"],
  transition_es: ["inBetween", "restartHesitation"],
};

/** The persona's answers to all 30 questions of the module quiz, in the persona's language — the shape ChatScreen sends as context.quizAnswers. */
function buildV2QuizAnswers(moduleId: string, locale: Locale, highDims: string[]): SetQuizAnswer[] {
  const quiz = getModuleById(moduleId);
  if (!quiz) throw new Error(`no quiz for ${moduleId}`);
  const questions = getLocalizedQuestions(quiz, locale);
  const strong = highDims.length ? highDims : [questions[0].dimension];
  let hi = 0;
  let lo = 0;
  // Alternate 3/2 and 1/0 so ties and the "highest score wins" rule both get exercised.
  return sanitizeQuizAnswers(questions.map((q) => {
    const score = strong.includes(q.dimension) ? (hi++ % 2 === 0 ? 3 : 2) : lo++ % 2 === 0 ? 1 : 0;
    const label = Array.isArray(q.options)
      ? (q.options.find((o) => o.score === score) ?? q.options[q.options.length - 1]).label
      : `${score >= 2 ? 8 : 3}/10`;
    return { qId: q.id, dimension: q.dimension, prompt: q.prompt, label, score };
  }));
}

// Told to the simulated user so a quoted answer doesn't surprise them into contradicting it.
const V2_QUIZ_FRAME: Record<string, string> = {
  ko: "상담 전에 앱의 심리 퀴즈에서 이렇게 답했다(챗봇이 인용하면 네가 실제로 고른 답이다):",
  en: "Before the chat you took the app's quiz and answered like this (if the bot quotes one, it's really what you picked):",
  es: "Antes de la charla hiciste el test de la app y respondiste así (si el bot cita alguna, es lo que de verdad elegiste):",
};

function resolvePersona(name: string): { situation: string; selfBlame: boolean; context: Ctx } {
  const p = PERSONAS[name];
  if (p) return { situation: p.situation, selfBlame: !!p.selfBlame, context: p.context };
  const legacy = LEGACY_STYLES[name];
  if (legacy) return { situation: legacy, selfBlame: false, context: LEGACY_CTX };
  throw new Error(`unknown persona "${name}". Personas: ${Object.keys(PERSONAS).join(", ")}; legacy styles: ${Object.keys(LEGACY_STYLES).join(", ")}`);
}

// Turn 10 is the mid-conversation checkpoint; see the header comment for why the simulated user always continues.
const CHECKPOINT_CONTINUE: Record<string, string> = {
  ko: "방금 챗봇이 더 이야기할지 마무리할지 물었다면, 너는 조금 더 이야기하는 쪽을 고른다(마무리하지 않는다). 네 말투로 짧게 답해라.",
  en: "If the bot just asked whether to keep talking or wrap up, you choose to keep talking (don't wrap up). Answer briefly in your own voice.",
  es: "Si el bot acaba de preguntar si seguir hablando o terminar, eliges seguir hablando (no terminas). Responde breve, con tu estilo.",
};

async function userReply(situation: string, locale: string, history: ChatMessage[], checkpoint = false): Promise<string> {
  const msgs = history.map((m) => ({ role: m.role === "user" ? "assistant" : "user", content: m.content })) as OpenAI.Chat.ChatCompletionMessageParam[];
  const c = await client.chat.completions.create({
    model: USER_SIM_MODEL,
    temperature: 0.9,
    messages: [{ role: "system", content: `${situation}\n${SIM_FRAME[locale] ?? SIM_FRAME.ko}${checkpoint ? `\n${CHECKPOINT_CONTINUE[locale] ?? CHECKPOINT_CONTINUE.ko}` : ""}` }, ...msgs],
  });
  return c.choices[0].message.content?.trim() ?? "";
}

// ---- flow v2 checks (deterministic; judge-chat.mts scores the same things by reading) ----
type RoleRec = Pick<SetTurnRole, "kind" | "set" | "position" | "recapSets">;
const roleTag = (r: RoleRec) =>
  r.kind === "set" ? `S${r.set}-${r.position}${r.recapSets.length ? `+recap${r.recapSets.join("")}` : ""}` : r.kind;
const normText = (t: string) => t.toLowerCase().replace(/[\s"'“”‘’「」.,!?¿¡…·:;()—-]+/g, "");

interface V2Checks {
  turnNumbers: number[];
  /** Per set ①: the answer lib/chatSets.ts selects vs. whether its option label shows up in the bot's reply. */
  quotes: { set: number; turn: number | null; expected: string | null; labelInReply: boolean | null }[];
  /** Turn 24 starts with PERSPECTIVE_SHIFT_LEAD; null when the run never reached turn 24. */
  perspectiveLead: boolean | null;
  setPackets: { count: number; hasChat: boolean[]; quizIds: (string | null)[] } | null;
}

function v2Checks(
  turns: { turn: number; role: RoleRec | null; bot: string[] }[],
  setQuotes: (SetQuizAnswer | null)[],
  locale: string,
  packets: { has_chat: boolean; quiz: { id: string } | null }[] | undefined,
): V2Checks {
  const quotes = setQuotes.map((q, i) => {
    const t = turns.find((x) => x.role?.kind === "set" && x.role.set === i + 1 && x.role.position === 1);
    return {
      set: i + 1,
      turn: t?.turn ?? null,
      expected: q ? `${q.qId} "${q.label}" (${q.score})` : null,
      // Labels are sometimes paraphrased into the sentence; a miss here is a flag to read, not a verdict.
      labelInReply: t && q ? normText(t.bot.join(" ")).includes(normText(q.label)) : null,
    };
  });
  const t24 = turns.find((t) => t.role?.kind === "perspective");
  const lead = PERSPECTIVE_SHIFT_LEAD[locale as Locale] ?? PERSPECTIVE_SHIFT_LEAD.ko;
  return {
    turnNumbers: turns.map((t) => t.turn),
    quotes,
    perspectiveLead: t24 ? t24.bot[0]?.trim() === lead : null,
    setPackets: packets ? { count: packets.length, hasChat: packets.map((p) => p.has_chat), quizIds: packets.map((p) => p.quiz?.id ?? null) } : null,
  };
}

function formatChecks(c: V2Checks): string {
  return [
    `turns: ${c.turnNumbers.join(",")}`,
    ...c.quotes.map((q) => `set ${q.set} ① (turn ${q.turn ?? "–"}): expected ${q.expected ?? "none (fallback question)"} · label in reply: ${q.labelInReply ?? "–"}`),
    `turn 24 fixed lead: ${c.perspectiveLead ?? "– (not reached)"}`,
    `set_packets: ${c.setPackets ? `${c.setPackets.count} · has_chat ${c.setPackets.hasChat.join(",")} · quiz ${c.setPackets.quizIds.join(",")}` : "missing"}`,
  ].join("\n");
}

const argv = process.argv.slice(2);
const botModelAt = argv.indexOf("--bot-model");
if (botModelAt >= 0) botModel = argv.splice(botModelAt, 2)[1];
const reasoningAt = argv.indexOf("--reasoning");
if (reasoningAt >= 0) reasoningEffort = argv.splice(reasoningAt, 2)[1] as ChatReasoningEffort;
const flowAt = argv.indexOf("--flow");
const flowV2 = flowAt >= 0 && argv.splice(flowAt, 2)[1] === "v2";
const checkpointAt = argv.indexOf("--checkpoint");
const checkpointChoice = checkpointAt >= 0 && argv.splice(checkpointAt, 2)[1] === "finish" ? "finish" : "continue";
const args = argv.filter((a) => !a.startsWith("--"));
const echoFormulation = !process.argv.includes("--no-formulation");
const TURNS = Number(args[0] ?? 12);
const names = (args[1] ?? "terse,talkative,questioning").split(",");
const moduleOverride = args[2] && args[2] !== "-" ? args[2] : undefined;
const quizPoolSize = Number(args[3] ?? 4);
const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "");
mkdirSync(OUT_DIR, { recursive: true });

await Promise.all(names.map((name) => usageStore.run(
  { phase: "bot", last: null, byPhase: { bot: emptyUsage(), userSim: emptyUsage(), extract: emptyUsage() } },
  async () => {
    const run = usageStore.getStore()!;
    const persona = resolvePersona(name);
    const moduleId = moduleOverride ?? persona.context.moduleId;
    const baseLocale = (persona.context.locale ?? "ko") as Locale;
    const quizAnswers = flowV2 && moduleId ? buildV2QuizAnswers(moduleId, baseLocale, V2_HIGH_DIMS[name] ?? []) : [];
    const ctx: Ctx = {
      ...persona.context,
      moduleId,
      quizAnswerPool: persona.context.quizAnswerPool?.slice(0, quizPoolSize),
      ...(flowV2 && { flowVersion: 2, quizAnswers }),
    };
    if (moduleOverride && PERSONAS[name] && moduleOverride !== persona.context.moduleId) {
      console.warn(`! ${name} is written for ${persona.context.moduleId}, running it on ${moduleOverride}`);
    }
    const flow = chatFlowVersion(ctx);
    if (flowV2 && flow !== 2) throw new Error(`${name}: --flow v2 needs a module with set data and quiz answers (moduleId ${moduleId})`);
    const chatSets = flow === 2 ? getModuleChatSets(moduleId) : undefined;
    const setQuotes = chatSets ? selectAllSetQuizAnswers(chatSets, quizAnswers) : null;
    const locale = ctx.locale ?? "ko";
    const situation = setQuotes
      ? `${persona.situation}\n${V2_QUIZ_FRAME[locale] ?? V2_QUIZ_FRAME.ko}\n${setQuotes.filter((a): a is SetQuizAnswer => !!a).map((a) => `- "${a.prompt}" → "${a.label}"`).join("\n")}`
      : persona.situation;
    const history: ChatMessage[] = [];
    const turns: {
      seq: number; turn: number; role: Pick<SetTurnRole, "kind" | "set" | "position" | "recapSets"> | null;
      bot: string[]; user: string | null; botMs: number; botTokens: RunUsage["last"]; formulation: ChatFormulation | null;
    }[] = [];
    // Echo the hidden memo back the way ChatScreen does (TODO Q1-c). --no-formulation drops it, to compare against the old behavior.
    let formulation: ChatFormulation | undefined;
    const started = Date.now();
    for (let seq = 1; seq <= TURNS; seq++) {
      // v2 "wrap up" at the checkpoint: the request right after turn 10 is turn 25, with no user reply in between.
      const turn = flow === 2 && checkpointChoice === "finish" && seq === 11 ? TOTAL_TURNS_V2 : seq;
      const t0 = Date.now();
      const role = flow === 2 ? effectiveSetTurnRole(turn, Math.floor((t0 - started) / 60000)) : null;
      run.phase = "bot";
      run.last = null;
      const reply = await getChatReply({ turnNumber: turn, history, context: ctx, sessionStartedAt: started, formulation });
      formulation = echoFormulation ? reply.formulation : undefined;
      const botMs = Date.now() - t0;
      const botTokens = run.last;
      history.push({ role: "assistant", content: reply.lines.join("\n") });
      // v2 ends where the route would attach the extract; the 20-turn flow keeps its fixed turn count.
      const final = seq === TURNS || (flow === 2 && isFinalTurn(turn, Math.floor((Date.now() - started) / 60000), 2));
      const skipReply = final || (flow === 2 && checkpointChoice === "finish" && turn === 10);
      run.phase = "userSim";
      const user = skipReply ? null : await userReply(situation, locale, history, turn === 10);
      if (user !== null) history.push({ role: "user", content: user });
      turns.push({
        seq, turn, role: role && { kind: role.kind, set: role.set, position: role.position, recapSets: role.recapSets },
        bot: reply.lines, user, botMs, botTokens, formulation: reply.formulation ?? null,
      });
      if (final) break;
    }
    // Same extraction call the route runs on the final turn, so a change to buildExtractionPrompt can be
    // checked on the conversation it just produced. attachSetPackets is a no-op outside flow v2.
    run.phase = "extract";
    const extract = attachSetPackets(await extractChatSummary(history, ctx), history, ctx);
    const totalCostUsd = Object.values(run.byPhase).reduce((sum, u) => sum + u.costUsd, 0);
    const checks = setQuotes ? v2Checks(turns, setQuotes, locale, extract.set_packets) : null;

    const file = join(OUT_DIR, `sim_${stamp}_${name}_${ctx.moduleId ?? "none"}${flow === 2 ? `_v2${checkpointChoice === "finish" ? "_finish" : ""}` : ""}${botModel ? `_${botModel}` : ""}${reasoningEffort ? `_${reasoningEffort}` : ""}.json`);
    writeFileSync(file, JSON.stringify({
      kind: "sim-chat",
      createdAt: new Date().toISOString(),
      persona: name,
      selfBlame: persona.selfBlame,
      situation: persona.situation,
      moduleId: ctx.moduleId ?? null,
      locale,
      totalTurns: TURNS,
      flowVersion: flow,
      checkpoint: flow === 2 ? checkpointChoice : null,
      setQuotes,
      checks,
      echoFormulation,
      botModel: botModel ?? CHAT_MODEL,
      reasoningEffort: reasoningEffort ?? null,
      userSimModel: USER_SIM_MODEL,
      durationMs: Date.now() - started,
      context: ctx,
      turns,
      extract,
      usage: { ...run.byPhase, totalCostUsd },
    }, null, 2));

    const tag = (t: (typeof turns)[number]) => `${t.turn}${t.role ? ` ${roleTag(t.role)}` : ""}`;
    const lines = turns.flatMap((t) => [`[${tag(t)}] BOT: ${t.bot.join("\n   ")}`, ...(t.user === null ? [] : [`[${t.turn}] ME : ${t.user}`])]);
    console.log(`\n===== ${name} · ${ctx.moduleId ?? "no module"} · ${locale}${flow === 2 ? ` · v2 (checkpoint ${checkpointChoice})` : ""} =====\n${lines.join("\n")}\n----- extract -----\n${JSON.stringify(extract, null, 2)}${checks ? `\n----- v2 checks -----\n${formatChecks(checks)}` : ""}\n----- usage -----\nbot ${run.byPhase.bot.promptTokens}+${run.byPhase.bot.completionTokens} tok, total $${totalCostUsd.toFixed(4)}\n→ ${file}`);
  },
)));
