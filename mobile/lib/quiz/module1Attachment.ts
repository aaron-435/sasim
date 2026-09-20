/**
 * lib/module1Attachment.ts
 * ------------------------------------------------------------------
 * Module 1 — 연애/애착 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈1_연애애착_30문항_전문가검토용.xlsx). 성인애착이론(불안/회피 2차원)에
 * 기반해 설계됨. A1-A15 = 불안(anxiety) 차원, V1-V15 = 회피(avoidance) 차원.
 *
 * 채점 규칙 (원본 시트 "검토 안내" 시트 그대로):
 *   - 4지선다: 0~3점, 옵션 배열 순서가 곧 점수 (index 0 = 0점 ... index 3 = 3점)
 *   - 슬라이더(1~10): scaleToScore()로 0~3점 환산 (lib/quizProfile.ts)
 *
 * 오행(사주) 데이터는 이 퀴즈와 무관하다 — SAZU API가 이미 오행 퍼센트를
 * 직접 반환하므로, 퀴즈에서 오행을 추론할 필요가 없다. 사주와 이 심리테스트
 * 결과의 결합은 챗봇 단계(system prompt)에서 이루어진다.
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { QuestionTextOverride } from "./quizProfile";

export type AttachmentDimension = "anxiety" | "avoidance";

export interface Module1ChoiceOption {
  label: string;
  score: 0 | 1 | 2 | 3;
}

export interface Module1Question {
  id: string; // e.g. "A1", "V7" — matches the original expert-review numbering
  dimension: AttachmentDimension;
  format: "choice" | "slider";
  prompt: string;
  /** 4지선다: 4 options in score order (0..3). 슬라이더: 2 endpoint labels (min at 1, max at 10). */
  options: Module1ChoiceOption[] | { minLabel: string; maxLabel: string };
}

export const MODULE1_QUESTIONS: Module1Question[] = [
  // ---- 불안 (Anxiety) — A1-A15 ----
  {
    id: "A1",
    dimension: "anxiety",
    format: "slider",
    prompt: "연락이 늦어지면 신경 쓰이는 정도는?",
    options: { minLabel: "전혀 신경 안 쓰임", maxLabel: "극도로 불안해짐" },
  },
  {
    id: "A2",
    dimension: "anxiety",
    format: "choice",
    prompt: "상대의 애정 표현이 줄어든 것 같으면?",
    options: [
      { label: "원래 그런 사람이겠거니 한다", score: 0 },
      { label: "그런가 보다 하고 넘어간다", score: 1 },
      { label: "내가 뭘 잘못했는지 되짚어본다", score: 2 },
      { label: "버림받을까 봐 조급해진다", score: 3 },
    ],
  },
  {
    id: "A3",
    dimension: "anxiety",
    format: "choice",
    prompt: "관계에서 확신이 필요할 때?",
    options: [
      { label: "딱히 확인받을 필요를 못 느낀다", score: 0 },
      { label: "가끔 물어보는 정도면 충분하다", score: 1 },
      { label: "자주 확인받아야 안심이 된다", score: 2 },
      { label: "끊임없이 확인해도 불안이 안 가신다", score: 3 },
    ],
  },
  {
    id: "A4",
    dimension: "anxiety",
    format: "choice",
    prompt: "상대가 다른 이성/동성 친구랑 즐겁게 얘기하는 걸 보면?",
    options: [
      { label: "아무렇지 않다", score: 0 },
      { label: "살짝 신경 쓰이는 정도", score: 1 },
      { label: "마음이 복잡해진다", score: 2 },
      { label: "질투심이 확 올라온다", score: 3 },
    ],
  },
  {
    id: "A5",
    dimension: "anxiety",
    format: "choice",
    prompt: "다투고 나서 상대가 먼저 연락하지 않으면?",
    options: [
      { label: "시간을 두고 자연스럽게 풀린다고 생각한다", score: 0 },
      { label: "조금 기다려본다", score: 1 },
      { label: "먼저 연락 안 하면 초조해진다", score: 2 },
      { label: "관계가 끝난 건가 싶어 패닉이 온다", score: 3 },
    ],
  },
  {
    id: "A6",
    dimension: "anxiety",
    format: "choice",
    prompt: "상대의 표정이 안 좋아 보이면?",
    options: [
      { label: "그냥 그런가 보다 한다", score: 0 },
      { label: "무슨 일 있나 궁금해진다", score: 1 },
      { label: "혹시 나 때문인가 싶어진다", score: 2 },
      { label: "내가 뭘 잘못했는지 계속 생각하게 된다", score: 3 },
    ],
  },
  {
    id: "A7",
    dimension: "anxiety",
    format: "choice",
    prompt: "함께 있을 때 상대가 조용해지면?",
    options: [
      { label: "편안한 침묵이라 느낀다", score: 0 },
      { label: "별생각 없다", score: 1 },
      { label: "혹시 삐졌나 신경 쓰인다", score: 2 },
      { label: "내가 뭔가 실수했나 불안해진다", score: 3 },
    ],
  },
  {
    id: "A8",
    dimension: "anxiety",
    format: "choice",
    prompt: "미래(결혼, 동거 등) 이야기가 명확하지 않으면?",
    options: [
      { label: "천천히 가도 괜찮다고 생각한다", score: 0 },
      { label: "언젠가 자연스럽게 정해질 거라 믿는다", score: 1 },
      { label: "불확실함이 자꾸 마음에 걸린다", score: 2 },
      { label: "관계 자체가 흔들리는 것 같아 불안하다", score: 3 },
    ],
  },
  {
    id: "A9",
    dimension: "anxiety",
    format: "choice",
    prompt: "상대에게 서운한 게 있을 때?",
    options: [
      { label: "가볍게 말하고 넘어간다", score: 0 },
      { label: "적당한 때 이야기한다", score: 1 },
      { label: "말하기 전에 계속 눈치를 본다", score: 2 },
      { label: "혼자 삭이다가 감정이 터진다", score: 3 },
    ],
  },
  {
    id: "A10",
    dimension: "anxiety",
    format: "choice",
    prompt: "SNS에서 상대의 새 게시물을 보면?",
    options: [
      { label: "그냥 스쳐 지나간다", score: 0 },
      { label: "가볍게 확인하는 정도", score: 1 },
      { label: "누구랑 있는지, 뭘 의미하는지 분석하게 된다", score: 2 },
      { label: "계속 확인하며 의미를 곱씹는다", score: 3 },
    ],
  },
  {
    id: "A11",
    dimension: "anxiety",
    format: "choice",
    prompt: "상대가 나를 덜 사랑하는 것 같다는 느낌이 들면?",
    options: [
      { label: "그런 느낌 자체가 잘 안 든다", score: 0 },
      { label: "가끔 스치듯 든다", score: 1 },
      { label: "자주 그런 생각이 든다", score: 2 },
      { label: "그 생각에 사로잡혀 다른 게 손에 안 잡힌다", score: 3 },
    ],
  },
  {
    id: "A12",
    dimension: "anxiety",
    format: "choice",
    prompt: "관계에서 나 자신에 대한 확신은?",
    options: [
      { label: "사랑받을 자격이 충분하다고 느낀다", score: 0 },
      { label: "대체로 괜찮다고 느낀다", score: 1 },
      { label: "가끔 내가 부족한 건 아닐까 싶다", score: 2 },
      { label: "늘 상대가 날 떠날까 봐 불안하다", score: 3 },
    ],
  },
  {
    id: "A13",
    dimension: "anxiety",
    format: "choice",
    prompt: "상대와 조금이라도 갈등이 생기면?",
    options: [
      { label: "자연스러운 일이라 여긴다", score: 0 },
      { label: "금방 지나갈 일이라 생각한다", score: 1 },
      { label: "관계에 문제가 생긴 건 아닌지 걱정된다", score: 2 },
      { label: "이러다 헤어지는 거 아닌가 최악을 상상한다", score: 3 },
    ],
  },
  {
    id: "A14",
    dimension: "anxiety",
    format: "choice",
    prompt: "혼자 있는 시간이 길어지면 상대 생각은?",
    options: [
      { label: "특별히 안 난다", score: 0 },
      { label: "가끔 떠오르는 정도", score: 1 },
      { label: "계속 뭐 하고 있을지 궁금하다", score: 2 },
      { label: "연락이 없으면 초조해서 못 견딘다", score: 3 },
    ],
  },
  {
    id: "A15",
    dimension: "anxiety",
    format: "choice",
    prompt: "상대에게 사랑한다는 말을 들어도?",
    options: [
      { label: "충분히 안심된다", score: 0 },
      { label: "안심되지만 오래가진 않는다", score: 1 },
      { label: "그때뿐이고 또 확인받고 싶어진다", score: 2 },
      { label: "들어도 마음속 불안이 잘 안 가신다", score: 3 },
    ],
  },
  // ---- 회피 (Avoidance) — V1-V15 ----
  {
    id: "V1",
    dimension: "avoidance",
    format: "slider",
    prompt: "감정적으로 가까워지려 할 때 부담스러운 정도는?",
    options: { minLabel: "전혀 부담 없음", maxLabel: "도망치고 싶을 정도로 부담" },
  },
  {
    id: "V2",
    dimension: "avoidance",
    format: "choice",
    prompt: "힘든 일이 있을 때 상대에게?",
    options: [
      { label: "가장 먼저 털어놓는다", score: 0 },
      { label: "어느 정도는 이야기한다", score: 1 },
      { label: "웬만하면 혼자 해결하려 한다", score: 2 },
      { label: "절대 약한 모습을 보이고 싶지 않다", score: 3 },
    ],
  },
  {
    id: "V3",
    dimension: "avoidance",
    format: "choice",
    prompt: "관계가 깊어질수록?",
    options: [
      { label: "더 편안하고 좋아진다", score: 0 },
      { label: "좋으면서도 약간 긴장된다", score: 1 },
      { label: "왠지 모르게 마음이 식는다", score: 2 },
      { label: "도망치고 싶은 충동이 든다", score: 3 },
    ],
  },
  {
    id: "V4",
    dimension: "avoidance",
    format: "choice",
    prompt: '상대가 "우리 사이가 뭐야?"라고 물으면?',
    options: [
      { label: "편하게 이야기 나눈다", score: 0 },
      { label: "약간 부담스럽지만 답한다", score: 1 },
      { label: "그런 대화 자체를 피하고 싶다", score: 2 },
      { label: "그 질문이 나오면 마음이 확 닫힌다", score: 3 },
    ],
  },
  {
    id: "V5",
    dimension: "avoidance",
    format: "choice",
    prompt: "상대가 내 하루 일과를 자세히 물어보면?",
    options: [
      { label: "기꺼이 다 이야기한다", score: 0 },
      { label: "대체로 이야기한다", score: 1 },
      { label: "굳이 다 말할 필요를 못 느낀다", score: 2 },
      { label: "사생활 침해처럼 느껴진다", score: 3 },
    ],
  },
  {
    id: "V6",
    dimension: "avoidance",
    format: "choice",
    prompt: "상대에게 의지하고 싶을 때?",
    options: [
      { label: "자연스럽게 기댄다", score: 0 },
      { label: "가끔은 기댄다", score: 1 },
      { label: "웬만하면 스스로 해결하려 한다", score: 2 },
      { label: "의지한다는 것 자체가 불편하다", score: 3 },
    ],
  },
  {
    id: "V7",
    dimension: "avoidance",
    format: "choice",
    prompt: "상대가 나에게 서운함을 표현하면?",
    options: [
      { label: "진지하게 듣고 대화한다", score: 0 },
      { label: "들어주긴 하지만 약간 부담스럽다", score: 1 },
      { label: "그 순간을 빨리 넘기고 싶어진다", score: 2 },
      { label: "그런 감정 표현 자체가 버겁다", score: 3 },
    ],
  },
  {
    id: "V8",
    dimension: "avoidance",
    format: "choice",
    prompt: "커플로서 미래를 계획할 때?",
    options: [
      { label: "적극적으로 함께 그려본다", score: 0 },
      { label: "어느 정도는 함께 생각한다", score: 1 },
      { label: "구체적으로 그리는 게 부담스럽다", score: 2 },
      { label: "생각만 해도 갑갑해진다", score: 3 },
    ],
  },
  {
    id: "V9",
    dimension: "avoidance",
    format: "choice",
    prompt: "상대와 매일 연락을 주고받는 것에 대해?",
    options: [
      { label: "당연하고 좋다", score: 0 },
      { label: "적당하면 괜찮다", score: 1 },
      { label: "가끔은 피곤하게 느껴진다", score: 2 },
      { label: "혼자만의 시간이 더 소중하게 느껴진다", score: 3 },
    ],
  },
  {
    id: "V10",
    dimension: "avoidance",
    format: "choice",
    prompt: "상대가 내 감정 상태를 살피며 다가오면?",
    options: [
      { label: "고맙고 편안하다", score: 0 },
      { label: "나쁘지 않다", score: 1 },
      { label: "약간 부담스럽다", score: 2 },
      { label: "관찰당하는 느낌이라 불편하다", score: 3 },
    ],
  },
  {
    id: "V11",
    dimension: "avoidance",
    format: "choice",
    prompt: "연애를 시작할 때 내 마음은?",
    options: [
      { label: "설레는 마음으로 온전히 빠져든다", score: 0 },
      { label: "즐기면서도 어느 정도 선을 둔다", score: 1 },
      { label: "너무 빠지지 않으려 스스로 조절한다", score: 2 },
      { label: "정 붙이는 것 자체가 두렵다", score: 3 },
    ],
  },
  {
    id: "V12",
    dimension: "avoidance",
    format: "choice",
    prompt: '상대가 "사랑해"라고 말하면 나는?',
    options: [
      { label: "자연스럽게 화답한다", score: 0 },
      { label: "쑥스럽지만 화답한다", score: 1 },
      { label: "그 말이 부담스럽게 느껴진다", score: 2 },
      { label: "비슷한 말을 하기가 어렵다", score: 3 },
    ],
  },
  {
    id: "V13",
    dimension: "avoidance",
    format: "choice",
    prompt: "다투고 난 후 화해하고 싶을 때?",
    options: [
      { label: "먼저 다가가서 푼다", score: 0 },
      { label: "때를 보다가 다가간다", score: 1 },
      { label: "먼저 다가가는 게 어렵다", score: 2 },
      { label: "그냥 시간이 해결해주길 기다린다", score: 3 },
    ],
  },
  {
    id: "V14",
    dimension: "avoidance",
    format: "choice",
    prompt: "상대와 24시간 붙어있어야 하는 여행을 간다면?",
    options: [
      { label: "설레고 기대된다", score: 0 },
      { label: "좋지만 개인 시간도 필요하다", score: 1 },
      { label: "숨 쉴 틈이 없을까 봐 걱정된다", score: 2 },
      { label: "생각만 해도 부담스럽다", score: 3 },
    ],
  },
  {
    id: "V15",
    dimension: "avoidance",
    format: "choice",
    prompt: '관계에서 "이 사람 없이도 괜찮다"는 생각은?',
    options: [
      { label: "거의 안 든다", score: 0 },
      { label: "가끔 든다", score: 1 },
      { label: "종종 그런 생각이 든다", score: 2 },
      { label: "늘 마음 한쪽에 그런 생각이 있다", score: 3 },
    ],
  },
];

// Display-text-only translations of MODULE1_QUESTIONS above — id/dimension/
// format/score never change per locale, so they stay in the single Korean
// array; see localizeQuestions() in quizProfile.ts for how these merge in.
export const MODULE1_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  A1: { prompt: "How much does it bother you when they're slow to reply?", minLabel: "Doesn't bother me at all", maxLabel: "Makes me extremely anxious" },
  A2: { prompt: "If it seems like they're showing you less affection?", optionLabels: ["I figure that's just how they are", "I let it go without thinking much of it", "I start replaying what I might have done wrong", "I get anxious that I'm about to be abandoned"] },
  A3: { prompt: "When you need reassurance in a relationship?", optionLabels: ["I don't really feel the need to be reassured", "Asking once in a while is enough", "I need to be reassured often to feel okay", "Even constant reassurance doesn't calm my anxiety"] },
  A4: { prompt: "When you see them happily talking with another friend?", optionLabels: ["I don't think anything of it", "It bothers me a little", "My mind gets tangled up", "A wave of jealousy hits me"] },
  A5: { prompt: "If they don't reach out first after a fight?", optionLabels: ["I figure it'll naturally sort itself out with time", "I wait it out a bit", "I get anxious if they don't reach out first", "I panic, wondering if the relationship is over"] },
  A6: { prompt: "If they look like they're in a bad mood?", optionLabels: ["I figure it's just one of those things", "I get curious about what's going on", "I start wondering if it's because of me", "I keep thinking about what I might have done wrong"] },
  A7: { prompt: "If they go quiet while you're together?", optionLabels: ["I take it as a comfortable silence", "I don't think much of it", "I wonder if they're upset with me", "I get anxious that I did something wrong"] },
  A8: { prompt: "If plans for the future (marriage, moving in together, etc.) stay unclear?", optionLabels: ["I'm fine taking it slow", "I trust it'll naturally sort itself out someday", "The uncertainty keeps nagging at me", "It makes me anxious, like the relationship itself is shaky"] },
  A9: { prompt: "When something they did leaves you feeling hurt?", optionLabels: ["I mention it lightly and move on", "I bring it up when the timing feels right", "I keep reading their mood before I say anything", "I hold it in until my feelings finally burst"] },
  A10: { prompt: "When you see their new post on social media?", optionLabels: ["I just scroll past it", "I glance at it, nothing more", "I start analyzing who they're with and what it means", "I keep checking it, turning the meaning over and over"] },
  A11: { prompt: "When you get a feeling they love you less than before?", optionLabels: ["That feeling rarely comes up at all", "It crosses my mind every once in a while", "The thought comes up often", "I get so consumed by the thought I can't focus on anything else"] },
  A12: { prompt: "How confident do you feel in yourself within the relationship?", optionLabels: ["I feel like I fully deserve to be loved", "I feel mostly fine about it", "Sometimes I wonder if I'm not enough", "I'm always anxious they'll leave me"] },
  A13: { prompt: "When even a small conflict comes up with them?", optionLabels: ["I see it as a normal part of any relationship", "I figure it'll blow over quickly", "I worry something's wrong with the relationship", "I imagine the worst, like we're about to break up"] },
  A14: { prompt: "When you spend a long stretch of time alone, do you think about them?", optionLabels: ["Not especially", "It crosses my mind once in a while", "I keep wondering what they're up to", "I can't stand it if they don't reach out"] },
  A15: { prompt: "Even after hearing them say 'I love you'?", optionLabels: ["It reassures me completely", "It reassures me, but it doesn't last long", "It only helps for the moment, then I need reassurance again", "Even hearing it, the anxiety underneath doesn't really go away"] },
  V1: { prompt: "How much pressure do you feel when things start getting emotionally close?", minLabel: "No pressure at all", maxLabel: "Enough pressure to make me want to run" },
  V2: { prompt: "When something's hard, what do you do with your partner?", optionLabels: ["I open up to them first, before anyone else", "I share some of it with them", "I try to handle it alone whenever I can", "I never want to show them a vulnerable side of me"] },
  V3: { prompt: "The deeper the relationship gets?", optionLabels: ["The more comfortable and good it feels", "It feels good, but I get a little tense too", "Somehow, my feelings start to cool", "I get the urge to run away"] },
  V4: { prompt: `If they ask, "What are we, exactly?"`, optionLabels: ["I talk about it comfortably", "It feels a bit heavy, but I answer", "I'd rather avoid that conversation altogether", "That question makes me shut down completely"] },
  V5: { prompt: "If they ask about the details of your day?", optionLabels: ["I happily tell them everything", "I tell them most of it", "I don't feel the need to share every detail", "It feels like an invasion of my privacy"] },
  V6: { prompt: "When you want to lean on your partner?", optionLabels: ["I lean on them naturally", "I lean on them sometimes", "I try to handle it myself whenever I can", "Even the idea of relying on someone makes me uncomfortable"] },
  V7: { prompt: "When they tell you they feel hurt by something?", optionLabels: ["I listen seriously and talk it through", "I listen, but it feels a bit heavy", "I just want to move past that moment quickly", "That kind of emotional expression feels like too much"] },
  V8: { prompt: "When it comes to planning a future together as a couple?", optionLabels: ["I actively picture it together with them", "I think about it together, to some extent", "Getting specific about it feels like pressure", "Just thinking about it makes me feel suffocated"] },
  V9: { prompt: "How do you feel about staying in touch with them every day?", optionLabels: ["It feels natural and good", "It's fine as long as it's not too much", "Sometimes it feels tiring", "My own time alone starts to feel more precious"] },
  V10: { prompt: "When they check in on your emotional state?", optionLabels: ["It feels thoughtful and comforting", "It's not bad", "It feels a little like too much", "It feels uncomfortable, like being watched"] },
  V11: { prompt: "How do you feel at the start of a relationship?", optionLabels: ["I fall in completely, with an excited heart", "I enjoy it, while keeping a bit of a line", "I hold myself back from falling too deep", "Getting attached itself scares me"] },
  V12: { prompt: `When they say "I love you," what do you do?`, optionLabels: ["I say it back naturally", "It's a bit embarrassing, but I say it back", "Hearing it feels like pressure", "It's hard for me to say something similar back"] },
  V13: { prompt: "When you want to make up after a fight?", optionLabels: ["I reach out first to fix things", "I wait for the right moment, then reach out", "It's hard for me to reach out first", "I just wait for time to sort it out"] },
  V14: { prompt: "If you had to take a trip where you'd be together 24/7?", optionLabels: ["I'd be excited about it", "It sounds nice, but I'd still need some time alone", "I'd worry about not having room to breathe", "Just thinking about it feels like pressure"] },
  V15: { prompt: "The thought \"I'd be fine even without this person\"?", optionLabels: ["It almost never comes up", "It crosses my mind occasionally", "It comes up fairly often", "It's always there somewhere in the back of my mind"] },
};

export const MODULE1_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  A1: { prompt: "¿Cuánto te molesta que tarde en responderte?", minLabel: "No me molesta en absoluto", maxLabel: "Me genera mucha ansiedad" },
  A2: { prompt: "Si sientes que te muestra menos cariño que antes, ¿cómo reaccionas?", optionLabels: ["Pienso que así es su forma de ser", "Lo dejo pasar sin darle muchas vueltas", "Empiezo a repasar qué pude haber hecho mal", "Me angustia pensar que me va a abandonar"] },
  A3: { prompt: "Cuando necesitas que te confirmen que todo va bien en la relación, ¿qué te pasa?", optionLabels: ["No siento mucha necesidad de que me lo confirmen", "Con preguntarlo de vez en cuando me basta", "Necesito que me lo confirmen a menudo para sentirme en calma", "Ni aunque me lo confirmen siempre se me quita la ansiedad"] },
  A4: { prompt: "Cuando ves que conversa animadamente con otra amistad, ¿qué sientes?", optionLabels: ["No me afecta en nada", "Me incomoda un poco", "Se me enreda la cabeza", "Me invaden los celos de golpe"] },
  A5: { prompt: "Si después de una pelea esa persona no te escribe primero, ¿cómo reaccionas?", optionLabels: ["Pienso que con el tiempo se arreglará solo", "Espero un poco", "Me da ansiedad que no escriba primero", "Entro en pánico pensando que la relación se acabó"] },
  A6: { prompt: "Si notas que esa persona tiene mala cara, ¿qué haces?", optionLabels: ["Pienso que son cosas normales", "Me da curiosidad saber qué le pasa", "Empiezo a preguntarme si es por mí", "No dejo de pensar en qué pude haber hecho mal"] },
  A7: { prompt: "Si guarda silencio mientras están juntos, ¿cómo lo vives?", optionLabels: ["Lo siento como un silencio cómodo", "No le doy mayor importancia", "Me pregunto si se ha molestado conmigo", "Me da ansiedad pensar que hice algo mal"] },
  A8: { prompt: "Si los planes de futuro (casarse, vivir juntos, etc.) siguen sin definirse, ¿cómo lo llevas?", optionLabels: ["Está bien ir despacio", "Confío en que algún día se aclararán solos", "La incertidumbre no deja de rondarme", "Me genera ansiedad, como si la relación misma se tambaleara"] },
  A9: { prompt: "Cuando algo que hizo esa persona te duele, ¿qué haces?", optionLabels: ["Lo menciono sin darle importancia y sigo adelante", "Lo hablo cuando encuentro el momento adecuado", "Antes de decir algo, sigo tanteando cómo está de ánimo", "Me lo guardo hasta que exploto"] },
  A10: { prompt: "Cuando ves su nueva publicación en redes sociales, ¿qué haces?", optionLabels: ["Sigo de largo", "Le echo un vistazo, nada más", "Empiezo a analizar con quién está y qué significa", "La reviso una y otra vez, dándole vueltas a lo que significa"] },
  A11: { prompt: "Cuando tienes la sensación de que te quiere menos que antes, ¿qué pasa?", optionLabels: ["Casi nunca tengo esa sensación", "Se me cruza por la cabeza de vez en cuando", "Lo pienso a menudo", "Ese pensamiento me absorbe tanto que no puedo concentrarme en nada más"] },
  A12: { prompt: "¿Cuánta confianza sientes en ti dentro de la relación?", optionLabels: ["Siento que merezco por completo que me quieran", "En general me siento bien", "A veces me pregunto si soy suficiente", "Siempre me da ansiedad que me vaya a dejar"] },
  A13: { prompt: "Cuando surge un conflicto, aunque sea pequeño, ¿cómo lo tomas?", optionLabels: ["Lo veo como algo normal en cualquier relación", "Pienso que se pasará pronto", "Me preocupa que algo ande mal en la relación", "Imagino lo peor, como si estuviéramos a punto de terminar"] },
  A14: { prompt: "Cuando pasas mucho tiempo a solas, ¿piensas en esa persona?", optionLabels: ["No especialmente", "Se me cruza por la cabeza de vez en cuando", "No dejo de preguntarme qué estará haciendo", "No soporto que pase el tiempo sin tener noticias suyas"] },
  A15: { prompt: "Aunque te diga «te quiero», ¿qué sientes?", optionLabels: ["Me tranquiliza por completo", "Me tranquiliza, pero dura poco", "Solo me sirve en el momento y enseguida necesito que me lo repita", "Aunque lo escuche, la ansiedad de fondo no se va"] },
  V1: { prompt: "¿Cuánta presión sientes cuando la relación empieza a volverse cercana en lo emocional?", minLabel: "Ninguna presión", maxLabel: "Tanta que me dan ganas de huir" },
  V2: { prompt: "Cuando algo se pone difícil, ¿qué haces con tu pareja?", optionLabels: ["Se lo cuento a esa persona antes que a nadie", "Le cuento una parte", "Intento resolverlo por mi cuenta siempre que puedo", "No quiero mostrarle nunca un lado vulnerable"] },
  V3: { prompt: "Cuanto más profunda se vuelve la relación, ¿qué te pasa?", optionLabels: ["Más a gusto me siento", "Me siento bien, pero también me tenso un poco", "Sin saber por qué, mis sentimientos se van enfriando", "Me dan ganas de huir"] },
  V4: { prompt: "Si esa persona te pregunta «¿qué somos exactamente?», ¿qué haces?", optionLabels: ["Lo hablo con tranquilidad", "Se me hace un poco pesado, pero respondo", "Preferiría evitar esa conversación por completo", "Esa pregunta me hace cerrarme por completo"] },
  V5: { prompt: "Si te pregunta los detalles de tu día, ¿cómo reaccionas?", optionLabels: ["Se lo cuento todo con gusto", "Le cuento la mayor parte", "No siento la necesidad de contarlo todo", "Lo siento como una invasión de mi privacidad"] },
  V6: { prompt: "Cuando quieres apoyarte en tu pareja, ¿qué haces?", optionLabels: ["Me apoyo con naturalidad", "Me apoyo de vez en cuando", "Intento resolverlo por mi cuenta siempre que puedo", "Hasta la idea de depender de alguien me incomoda"] },
  V7: { prompt: "Cuando te dice que algo le dolió, ¿cómo reaccionas?", optionLabels: ["Lo escucho con seriedad y lo hablamos", "Lo escucho, pero se me hace un poco pesado", "Solo quiero que ese momento pase rápido", "Ese tipo de expresión emocional me abruma"] },
  V8: { prompt: "Cuando se trata de planear un futuro en pareja, ¿cómo te sientes?", optionLabels: ["Me lo imagino con entusiasmo junto a esa persona", "Lo pienso en conjunto, hasta cierto punto", "Concretarlo me hace sentir presión", "Solo de pensarlo me falta el aire"] },
  V9: { prompt: "¿Qué sientes al mantener contacto todos los días?", optionLabels: ["Me parece natural y agradable", "Está bien mientras no sea demasiado", "A veces me cansa", "Mi tiempo a solas empieza a parecerme más valioso"] },
  V10: { prompt: "Cuando esa persona te pregunta cómo estás emocionalmente, ¿cómo lo sientes?", optionLabels: ["Me parece un gesto atento y reconfortante", "No está mal", "Se me hace un poco pesado", "Me incomoda, como si me vigilaran"] },
  V11: { prompt: "¿Cómo te sientes al comienzo de una relación?", optionLabels: ["Me entrego por completo, con el corazón ilusionado", "Lo disfruto, pero mantengo cierta distancia", "Me freno para no enamorarme demasiado", "Encariñarme ya me da miedo"] },
  V12: { prompt: "Cuando te dice «te quiero», ¿qué haces?", optionLabels: ["Le respondo con naturalidad", "Me da vergüenza, pero le respondo", "Escucharlo me hace sentir presión", "Me cuesta decir algo parecido a cambio"] },
  V13: { prompt: "Cuando quieres reconciliarte después de una pelea, ¿qué haces?", optionLabels: ["Doy el primer paso para arreglarlo", "Espero el momento adecuado y me acerco", "Me cuesta dar el primer paso", "Espero a que el tiempo lo arregle"] },
  V14: { prompt: "Si tuvieras que hacer un viaje en el que estén juntos las 24 horas, ¿cómo lo verías?", optionLabels: ["Me emocionaría", "Suena bien, pero igual necesitaría tiempo a solas", "Me preocuparía no tener espacio para respirar", "Solo de pensarlo siento presión"] },
  V15: { prompt: "¿Con qué frecuencia te viene el pensamiento «estaría bien incluso sin esta persona»?", optionLabels: ["Casi nunca", "Se me cruza por la cabeza de vez en cuando", "Me viene con cierta frecuencia", "Siempre está ahí, en algún rincón de mi mente"] },
};

export const MODULE1_DIMENSION_ITEM_COUNTS: Record<AttachmentDimension, number> = {
  anxiety: 15,
  avoidance: 15,
};

export const MODULE1_DIMENSION_LABELS: Record<Locale, Record<AttachmentDimension, { high: string; low: string }>> = {
  ko: {
    anxiety: { high: "불안 애착", low: "정서적 안정감" },
    avoidance: { high: "회피 애착", low: "친밀감에 대한 개방성" },
  },
  en: {
    anxiety: { high: "Anxious Attachment", low: "Emotional Security" },
    avoidance: { high: "Avoidant Attachment", low: "Openness to Intimacy" },
  },
  es: {
    anxiety: { high: "Apego ansioso", low: "Seguridad emocional" },
    avoidance: { high: "Apego evitativo", low: "Apertura a la intimidad" },
  },
};

/** 성인애착이론 4유형 명칭 — classifyProfile()의 typeKey에 대응. */
export const MODULE1_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: {
      title: "안정형 (Secure)",
      hook: "관계에서 크게 불안해하거나 거리를 두지 않는, 비교적 안정된 애착 패턴입니다.",
    },
    anxiety: {
      title: "불안형 (Anxious-Preoccupied)",
      hook: "관계의 안정성을 자주 확인받고 싶어하고, 상대의 반응에 민감하게 반응하는 패턴입니다.",
    },
    avoidance: {
      title: "회피형 (Dismissive-Avoidant)",
      hook: "친밀감이나 정서적 의존을 부담스러워하고, 독립성을 우선시하는 패턴입니다.",
    },
    "anxiety+avoidance": {
      title: "혼란형 (Fearful-Avoidant)",
      hook: "가까워지고 싶은 마음과 거리를 두고 싶은 마음이 동시에 강하게 작동하는, 양가적인 패턴입니다.",
    },
  },
  en: {
    baseline: {
      title: "Secure",
      hook: "A relatively stable attachment pattern — you don't get especially anxious about the relationship or feel the need to keep your distance.",
    },
    anxiety: {
      title: "Anxious-Preoccupied",
      hook: "You tend to seek frequent reassurance that the relationship is okay, and you're sensitive to how your partner reacts.",
    },
    avoidance: {
      title: "Dismissive-Avoidant",
      hook: "Closeness and emotional dependence feel like a lot — you tend to prioritize your independence.",
    },
    "anxiety+avoidance": {
      title: "Fearful-Avoidant",
      hook: "A push-and-pull pattern — wanting to get closer and wanting to keep your distance are both running strong at the same time.",
    },
  },
  es: {
    baseline: {
      title: "Apego seguro",
      hook: "Un patrón de apego relativamente estable: no sueles sentir mucha ansiedad en la relación ni la necesidad de tomar distancia.",
    },
    anxiety: {
      title: "Apego ansioso",
      hook: "Tiendes a buscar confirmación frecuente de que la relación está bien, y eres sensible a las reacciones de la otra persona.",
    },
    avoidance: {
      title: "Apego evitativo",
      hook: "La cercanía y la dependencia emocional se te hacen pesadas, y tiendes a dar prioridad a tu independencia.",
    },
    "anxiety+avoidance": {
      title: "Apego temeroso-evitativo",
      hook: "Un patrón ambivalente: las ganas de acercarte y las de tomar distancia actúan con la misma fuerza al mismo tiempo.",
    },
  },
};
