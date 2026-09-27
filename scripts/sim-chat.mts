// Simulates the AI counseling chat end to end with LLM "users", so a prompt change can be judged on
// whole conversations instead of single replies.
//   npx tsx --env-file=.env.local scripts/sim-chat.mts [turns] [persona,persona,...] [moduleId] [quizPoolSize]
//
// persona: one of PERSONAS below (11 module personas + attach_en / anger_es), or a legacy style
// (terse, talkative, lost, questioning). A module persona brings its own moduleId, quiz result,
// quiz-answer pool, locale and situation, so each module gets a coherent conversation — see
// scripts/judge-chat.mts, which scores the saved files. Legacy styles keep the old burnout fixture
// (moduleId default "module3"). The moduleId argument overrides the persona's own module ("-" or
// omitted keeps it); a mismatch is allowed but warned about, since the persona's story won't fit.
// quizPoolSize (default 4) trims the quiz-answer pool, so a run can exercise the quizAnswerPool
// fallback (turn 14 then 7 drops its quote first) — see lib/chatPrompts.ts's QUIZ_QUOTE_TURN_INDEX.
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
import { getChatReply, extractChatSummary, type ChatMessage } from "../lib/chat.ts";
import type { ChatSessionContext, QuizAnswerQuote } from "../lib/chatPrompts.ts";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const USER_SIM_MODEL = "gpt-5.4-mini";
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "out");

// ---- token usage ----
// getChatReply/extractChatSummary don't return usage (lib/chat.ts only logs it to llm_usage_log), so
// every chat.completions.create call in this process is wrapped here and attributed to the persona
// run (AsyncLocalStorage, since personas run in parallel) and to the phase that made it.
// USD per 1M tokens (input/output); keep in step with lib/llmUsage.ts.
const PRICING: Record<string, { input: number; output: number }> = {
  "gpt-5.4-mini": { input: 0.75, output: 4.5 },
};
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
};

// The user simulator's frame, in the persona's language so an EN/ES persona doesn't drift into Korean.
const SIM_FRAME: Record<string, string> = {
  ko: "지금 AI 상담 챗봇과 메신저로 대화 중이다. 방금 챗봇이 한 말에 자연스럽게 한 번만 답해라. 따옴표 없이 답변 문장만.",
  en: "You're chatting with an AI counseling chatbot in a messaging app. Reply once, naturally, to what the bot just said. Only your message, no quotation marks.",
  es: "Estás hablando con un chatbot de acompañamiento emocional por mensajes. Responde una sola vez, con naturalidad, a lo que acaba de decir el bot. Solo tu mensaje, sin comillas.",
};

function resolvePersona(name: string): { situation: string; selfBlame: boolean; context: Ctx } {
  const p = PERSONAS[name];
  if (p) return { situation: p.situation, selfBlame: !!p.selfBlame, context: p.context };
  const legacy = LEGACY_STYLES[name];
  if (legacy) return { situation: legacy, selfBlame: false, context: LEGACY_CTX };
  throw new Error(`unknown persona "${name}". Personas: ${Object.keys(PERSONAS).join(", ")}; legacy styles: ${Object.keys(LEGACY_STYLES).join(", ")}`);
}

async function userReply(situation: string, locale: string, history: ChatMessage[]): Promise<string> {
  const msgs = history.map((m) => ({ role: m.role === "user" ? "assistant" : "user", content: m.content })) as OpenAI.Chat.ChatCompletionMessageParam[];
  const c = await client.chat.completions.create({
    model: USER_SIM_MODEL,
    temperature: 0.9,
    messages: [{ role: "system", content: `${situation}\n${SIM_FRAME[locale] ?? SIM_FRAME.ko}` }, ...msgs],
  });
  return c.choices[0].message.content?.trim() ?? "";
}

const TURNS = Number(process.argv[2] ?? 12);
const names = (process.argv[3] ?? "terse,talkative,questioning").split(",");
const moduleOverride = process.argv[4] && process.argv[4] !== "-" ? process.argv[4] : undefined;
const quizPoolSize = Number(process.argv[5] ?? 4);
const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "");
mkdirSync(OUT_DIR, { recursive: true });

await Promise.all(names.map((name) => usageStore.run(
  { phase: "bot", last: null, byPhase: { bot: emptyUsage(), userSim: emptyUsage(), extract: emptyUsage() } },
  async () => {
    const run = usageStore.getStore()!;
    const persona = resolvePersona(name);
    const ctx: Ctx = {
      ...persona.context,
      moduleId: moduleOverride ?? persona.context.moduleId,
      quizAnswerPool: persona.context.quizAnswerPool?.slice(0, quizPoolSize),
    };
    if (moduleOverride && PERSONAS[name] && moduleOverride !== persona.context.moduleId) {
      console.warn(`! ${name} is written for ${persona.context.moduleId}, running it on ${moduleOverride}`);
    }
    const locale = ctx.locale ?? "ko";
    const history: ChatMessage[] = [];
    const turns: { turn: number; bot: string[]; user: string | null; botMs: number; botTokens: RunUsage["last"] }[] = [];
    const started = Date.now();
    for (let turn = 1; turn <= TURNS; turn++) {
      const t0 = Date.now();
      run.phase = "bot";
      run.last = null;
      const reply = await getChatReply({ turnNumber: turn, history, context: ctx, sessionStartedAt: started });
      const botMs = Date.now() - t0;
      const botTokens = run.last;
      history.push({ role: "assistant", content: reply.lines.join("\n") });
      run.phase = "userSim";
      const user = turn === TURNS ? null : await userReply(persona.situation, locale, history);
      if (user !== null) history.push({ role: "user", content: user });
      turns.push({ turn, bot: reply.lines, user, botMs, botTokens });
    }
    // Same extraction call the route runs on the final turn, so a change to buildExtractionPrompt can be
    // checked on the conversation it just produced.
    run.phase = "extract";
    const extract = await extractChatSummary(history, ctx);
    const totalCostUsd = Object.values(run.byPhase).reduce((sum, u) => sum + u.costUsd, 0);

    const file = join(OUT_DIR, `sim_${stamp}_${name}_${ctx.moduleId ?? "none"}.json`);
    writeFileSync(file, JSON.stringify({
      kind: "sim-chat",
      createdAt: new Date().toISOString(),
      persona: name,
      selfBlame: persona.selfBlame,
      situation: persona.situation,
      moduleId: ctx.moduleId ?? null,
      locale,
      totalTurns: TURNS,
      userSimModel: USER_SIM_MODEL,
      durationMs: Date.now() - started,
      context: ctx,
      turns,
      extract,
      usage: { ...run.byPhase, totalCostUsd },
    }, null, 2));

    const lines = turns.flatMap((t) => [`[${t.turn}] BOT: ${t.bot.join("\n   ")}`, ...(t.user === null ? [] : [`[${t.turn}] ME : ${t.user}`])]);
    console.log(`\n===== ${name} · ${ctx.moduleId ?? "no module"} · ${locale} =====\n${lines.join("\n")}\n----- extract -----\n${JSON.stringify(extract, null, 2)}\n----- usage -----\nbot ${run.byPhase.bot.promptTokens}+${run.byPhase.bot.completionTokens} tok, total $${totalCostUsd.toFixed(4)}\n→ ${file}`);
  },
)));
