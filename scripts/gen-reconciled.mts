// One-off content generator for mobile/lib/reconciledCards.ts: card bodies for the days when a 12운성 /
// 12신살 card points the opposite way from the day's overview. Output goes to stdout as JSON to be reviewed.
import fs from "fs";
import OpenAI from "openai";
import { LOCALE_STYLE } from "../lib/promptLocale.ts";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const stages = JSON.parse(fs.readFileSync(new URL("./_stages.json", import.meta.url), "utf8"));
// Cautionary cards, to be reworded for a SUPPORTIVE day; upbeat cards, to be reworded for a PRESSURE day.
const STAGE_DOWN = [5, 6, 7], STAGE_UP = [2, 3, 4];
const SINSAL_DOWN = [0, 1, 2, 5, 6, 10], SINSAL_UP = [4, 7, 8];
const LANG: Record<string, string> = { ko: "한국어(해요체, 독자는 존칭 없이 '오늘' 중심)", en: "English", es: "español neutro (tú)" };
const out: any = {};
for (const loc of ["ko", "en", "es"]) {
  const items = [
    ...STAGE_DOWN.map((i) => ({ id: `stage.${i}`, name: stages[loc].lifeStages[i][0], original: stages[loc].lifeStages[i][1], dayIs: "supportive" })),
    ...STAGE_UP.map((i) => ({ id: `stage.${i}`, name: stages[loc].lifeStages[i][0], original: stages[loc].lifeStages[i][1], dayIs: "pressure" })),
    ...SINSAL_DOWN.map((i) => ({ id: `sinsal.${i}`, name: stages[loc].sinsal[i][0], original: stages[loc].sinsal[i][1], dayIs: "supportive" })),
    ...SINSAL_UP.map((i) => ({ id: `sinsal.${i}`, name: stages[loc].sinsal[i][0], original: stages[loc].sinsal[i][1], dayIs: "pressure" })),
  ];
  const c = await client.chat.completions.create({
    model: "gpt-5.4-mini", temperature: 0.6, response_format: { type: "json_object" },
    messages: [{ role: "system", content: `너는 일일 운세 앱의 카피라이터다. 오늘 화면에는 '총론' 카드 아래에 '에너지 주기' 카드와 '오늘의 영향' 카드가 함께 나온다. 총론과 카드가 서로 반대 방향이면 독자가 모순으로 느낀다. 각 항목의 original 본문을 오늘 총론의 방향에 맞게 다시 쓴 새 본문(reconciled)을 써라.
- dayIs = "supportive": 오늘 총론은 흐름이 받쳐 주고 도움이 오는 날이다. original은 조심하라는 톤이다. 그 내용을 "가볍게 살피면 되는 정도의 작은 유의점"으로 낮추고, 받쳐 주는 총론과 자연스럽게 이어지게 쓴다. 겁주거나 "막힌다/안 된다/힘들다" 같은 단정은 쓰지 않는다.
- dayIs = "pressure": 오늘 총론은 서두르지 말고 페이스를 조절하는 날이다. original은 힘 있고 밀어붙이는 톤이다. 그 힘을 "차분히 쓰면 좋은 에너지"로 바꿔, 조절하는 총론과 이어지게 쓴다. 과시·돌진·"마음껏 밀어붙여라"는 쓰지 않는다.
- 각 본문은 정확히 2문장, 원래 카드 이름의 뜻(예: '오해가 생기기 쉬움', '조용한 저장')은 살리되 톤만 맞춘다. 건강·사고·재물 손실 예측 금지. 이름은 다시 쓰지 않는다.
- 언어: ${LANG[loc]}. ${loc === "ko" ? "" : LOCALE_STYLE[loc as "en" | "es"]}
출력: JSON {"items": {"<id>": "<새 본문>"}} — 받은 id마다 하나씩.` }, { role: "user", content: JSON.stringify(items) }],
  });
  out[loc] = JSON.parse(c.choices[0].message.content!).items;
}
console.log(JSON.stringify(out, null, 1));
