// Simulates the AI counseling chat end to end with LLM "users" of different styles, so a prompt
// change can be judged on whole conversations instead of single replies.
//   npx tsx --env-file=.env.local scripts/sim-chat.mts [turns] [style,style,...]
import OpenAI from "openai";
import { getChatReply, type ChatMessage } from "../lib/chat.ts";
import type { ChatSessionContext } from "../lib/chatPrompts.ts";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const TURNS = Number(process.argv[2] ?? 12);
const STYLES: Record<string, string> = {
  terse: "너는 30대 직장인이다. 말수가 적고 자기 감정을 잘 모른다. 대부분 한 줄, 짧게 '모르겠네', '그냥 좀 그래' 식으로 답한다. 가끔 되묻는다('돈 관련이야?', '그게 뭔 상관이야?'). 최근 회사에서 월요일 아침 메신저가 오면 머리가 굳는 느낌이 든다는 게 실제 상황이다.",
  talkative: "너는 30대 직장인이다. 이야기를 잘 풀어놓는 편이다. 두세 문장으로 구체적인 장면(월요일 아침 팀장의 메신저, 몸이 굳는 느낌, 예전에도 비슷했던 일)을 말한다. 질문에는 성실히 답한다.",
  lost: "너는 자기가 왜 힘든지 잘 모른다. 아주 짧게 반말로 답한다('모르겠네', '머리가 굳는 느낌이야', '멍해지면서 아무 생각이 안 들어'). 상담사가 맞혀 주길 바라며 '돈 관련이야?' 처럼 되묻기도 한다. 실제로는 회사 일이 쌓이는 것과 월요일 아침이 힘들다.",
  questioning: "너는 30대 직장인이다. 상담사를 조금 의심한다. '이게 사주랑 무슨 상관이야?', '그래서 어떻게 하라는 거야?', '그냥 답 좀 알려줘' 같은 질문을 자주 한다. 그래도 한두 번은 속마음을 살짝 말한다. 상황: 번아웃, 쉬어도 쉬는 것 같지 않다.",
};
const ctx: ChatSessionContext = {
  track: "career",
  sajuElements: { wood: 33, fire: 0, earth: 50, metal: 17, water: 0 },
  dominantSajuElement: "earth",
  psychTestType: "완주형 소진",
  psychTestSummary: "완벽주의가 높고 회복이 낮은 편이에요.",
  quizAnswer: { prompt: "쉬는 날 나는?", label: "쉬어도 마음이 불편하다" },
  locale: "ko",
};

async function userReply(style: string, history: ChatMessage[]): Promise<string> {
  const msgs = history.map((m) => ({ role: m.role === "user" ? "assistant" : "user", content: m.content })) as OpenAI.Chat.ChatCompletionMessageParam[];
  const c = await client.chat.completions.create({
    model: "gpt-5.4-mini",
    temperature: 0.9,
    messages: [{ role: "system", content: `${STYLES[style]}\n지금 AI 상담 챗봇과 메신저로 대화 중이다. 방금 챗봇이 한 말에 자연스럽게 한 번만 답해라. 따옴표 없이 답변 문장만.` }, ...msgs],
  });
  return c.choices[0].message.content?.trim() ?? "";
}

const styles = (process.argv[3] ?? "terse,talkative,questioning").split(",");
await Promise.all(styles.map(async (style) => {
  const history: ChatMessage[] = [];
  const started = Date.now();
  const out: string[] = [];
  for (let turn = 1; turn <= TURNS; turn++) {
    const reply = await getChatReply({ turnNumber: turn, history, context: ctx, sessionStartedAt: started });
    const text = reply.lines.join("\n   ");
    history.push({ role: "assistant", content: reply.lines.join("\n") });
    out.push(`[${turn}] BOT: ${text}`);
    if (turn === TURNS) break;
    const u = await userReply(style, history);
    history.push({ role: "user", content: u });
    out.push(`[${turn}] ME : ${u}`);
  }
  console.log(`\n===== ${style} =====\n${out.join("\n")}`);
}));
