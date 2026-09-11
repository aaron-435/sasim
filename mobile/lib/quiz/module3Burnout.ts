/**
 * lib/module3Burnout.ts
 * ------------------------------------------------------------------
 * Module 3 — 번아웃 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈3_번아웃_30문항_전문가검토용.xlsx). 3차원(MBI 기반): 소진(E1-E10) /
 * 냉소(C1-C10) / 효능감저하(F1-F10) — ReportScreen.jsx의 기존 정적
 * "MBI 기반" 목업(exhaustion/cynicism/efficacyLoss)과 동일한 축이다.
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE3_QUESTIONS: ModuleQuestion[] = [
  // ---- 소진 (Exhaustion) — E1-E10 ----
  { id: "E1", dimension: "exhaustion", format: "slider", prompt: "퇴근 후(혹은 일과 후) 피로감 정도는?", options: { minLabel: "전혀 피곤하지 않음", maxLabel: "완전히 탈진한 상태" } },
  { id: "E2", dimension: "exhaustion", format: "choice", prompt: "일주일 중 에너지가 남아있는 날은?", options: [
    { label: "거의 매일 괜찮다", score: 0 }, { label: "주말 정도면 회복된다", score: 1 },
    { label: "일주일 내내 방전 상태다", score: 2 }, { label: "언제 마지막으로 괜찮았는지 기억도 안 난다", score: 3 } ] },
  { id: "E3", dimension: "exhaustion", format: "choice", prompt: "아침에 눈을 뜨면?", options: [
    { label: "오늘 하루가 기대된다", score: 0 }, { label: "그럭저럭 몸을 일으킨다", score: 1 },
    { label: "일어나는 것 자체가 버겁다", score: 2 }, { label: "눈뜨자마자 이미 지쳐있다", score: 3 } ] },
  { id: "E4", dimension: "exhaustion", format: "choice", prompt: "간단한 일(메일 답장, 잡무 등)도?", options: [
    { label: "금방 처리한다", score: 0 }, { label: "조금 미루지만 결국 한다", score: 1 },
    { label: "손대기도 싫어서 계속 미룬다", score: 2 }, { label: "생각만 해도 진이 빠진다", score: 3 } ] },
  { id: "E5", dimension: "exhaustion", format: "choice", prompt: "주말이나 휴가가 끝나면?", options: [
    { label: "다시 에너지가 충전된 느낌이다", score: 0 }, { label: "어느 정도 회복된다", score: 1 },
    { label: "쉬어도 크게 달라지지 않는다", score: 2 }, { label: "쉬는 것조차 피곤하게 느껴진다", score: 3 } ] },
  { id: "E6", dimension: "exhaustion", format: "choice", prompt: "몸의 컨디션(두통, 소화불량, 근육긴장 등)은?", options: [
    { label: "특별한 이상이 없다", score: 0 }, { label: "가끔 뻐근하거나 피곤한 정도", score: 1 },
    { label: "만성적으로 뭔가 아프거나 불편하다", score: 2 }, { label: "여기저기 안 아픈 데가 없다", score: 3 } ] },
  { id: "E7", dimension: "exhaustion", format: "choice", prompt: "하루 일과를 마치고 나면 감정은?", options: [
    { label: "성취감이 느껴진다", score: 0 }, { label: "그냥 하루가 갔다는 느낌이다", score: 1 },
    { label: "탈진한 느낌이 든다", score: 2 }, { label: "더 이상 못 버틸 것 같은 느낌이다", score: 3 } ] },
  { id: "E8", dimension: "exhaustion", format: "choice", prompt: "잠들기 전 상태는?", options: [
    { label: "편안하게 잠든다", score: 0 }, { label: "약간 뒤척이다 잠든다", score: 1 },
    { label: "피곤한데도 쉽게 못 잔다", score: 2 }, { label: "몸은 지쳤는데 머리는 각성돼 있다", score: 3 } ] },
  { id: "E9", dimension: "exhaustion", format: "choice", prompt: "새로운 일이나 요청이 들어오면?", options: [
    { label: "기꺼이 받아들일 여력이 있다", score: 0 }, { label: "부담스럽지만 해낸다", score: 1 },
    { label: "감당이 안 될 것 같아 부담스럽다", score: 2 }, { label: "이미 한계라 거절하고 싶어진다", score: 3 } ] },
  { id: "E10", dimension: "exhaustion", format: "choice", prompt: "스스로 느끼는 전반적인 에너지 수준은?", options: [
    { label: "충분하다", score: 0 }, { label: "보통이다", score: 1 },
    { label: "바닥나 있다", score: 2 }, { label: "완전히 고갈됐다", score: 3 } ] },
  // ---- 냉소 (Cynicism) — C1-C10 ----
  { id: "C1", dimension: "cynicism", format: "slider", prompt: "일에 대해 무감각하거나 냉소적으로 느껴지는 정도는?", options: { minLabel: "전혀 그렇지 않음(여전히 애정 있음)", maxLabel: "완전히 무감각/냉소적" } },
  { id: "C2", dimension: "cynicism", format: "choice", prompt: "동료나 고객을 대할 때?", options: [
    { label: "예전처럼 마음 써서 대한다", score: 0 }, { label: "예전보다 조금 형식적으로 대한다", score: 1 },
    { label: "거리를 두고 사무적으로만 대한다", score: 2 }, { label: "냉소적인 생각이 자주 든다", score: 3 } ] },
  { id: "C3", dimension: "cynicism", format: "choice", prompt: "일의 결과물에 대한 관심은?", options: [
    { label: "여전히 진심으로 신경 쓴다", score: 0 }, { label: "적당히 신경 쓴다", score: 1 },
    { label: "그냥 끝내는 데만 의미를 둔다", score: 2 }, { label: "잘되든 말든 상관없다는 마음이 든다", score: 3 } ] },
  { id: "C4", dimension: "cynicism", format: "choice", prompt: "회사(혹은 조직)에 대한 감정은?", options: [
    { label: "애정이 있다", score: 0 }, { label: "무난한 정도다", score: 1 },
    { label: "거리감이 느껴진다", score: 2 }, { label: "냉소적이거나 회의적인 감정이 크다", score: 3 } ] },
  { id: "C5", dimension: "cynicism", format: "choice", prompt: "예전엔 열정적으로 했던 일을 지금은?", options: [
    { label: "여전히 그 열정이 남아있다", score: 0 }, { label: "예전만은 못하지만 있다", score: 1 },
    { label: "그때 감정이 잘 안 떠오른다", score: 2 }, { label: "왜 그렇게까지 했나 싶을 정도로 낯설다", score: 3 } ] },
  { id: "C6", dimension: "cynicism", format: "choice", prompt: "일하면서 드는 냉소적인 생각(예: 어차피 다 소용없다)은?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 스친다", score: 1 },
    { label: "자주 든다", score: 2 }, { label: "거의 매일 그런 생각을 한다", score: 3 } ] },
  { id: "C7", dimension: "cynicism", format: "choice", prompt: "함께 일하는 사람들에 대한 신뢰는?", options: [
    { label: "여전히 두텁다", score: 0 }, { label: "대체로 괜찮다", score: 1 },
    { label: "예전보다 의심이 늘었다", score: 2 }, { label: "누구도 잘 안 믿게 됐다", score: 3 } ] },
  { id: "C8", dimension: "cynicism", format: "choice", prompt: "일의 의미나 목적에 대해 생각하면?", options: [
    { label: "분명한 의미가 느껴진다", score: 0 }, { label: "그럭저럭 의미는 있다", score: 1 },
    { label: "의미를 잘 못 찾겠다", score: 2 }, { label: "다 무의미하게 느껴진다", score: 3 } ] },
  { id: "C9", dimension: "cynicism", format: "choice", prompt: "문제가 생겼을 때 반응은?", options: [
    { label: "적극적으로 해결하려 한다", score: 0 }, { label: "해결하려 노력하는 편이다", score: 1 },
    { label: "그러려니 하고 넘긴다", score: 2 }, { label: "어차피 안 바뀐다고 체념한다", score: 3 } ] },
  { id: "C10", dimension: "cynicism", format: "choice", prompt: "일에 대한 이야기를 할 때 스스로 느끼기에?", options: [
    { label: "긍정적으로 말한다", score: 0 }, { label: "무난하게 말한다", score: 1 },
    { label: "냉소적으로 말하게 된다", score: 2 }, { label: "비꼬거나 자조적으로 말하게 된다", score: 3 } ] },
  // ---- 효능감저하 (Efficacy Loss) — F1-F10 ----
  { id: "F1", dimension: "efficacyLoss", format: "slider", prompt: "스스로의 능력이나 성과를 의심하는 정도는?", options: { minLabel: "전혀 의심 안 함(확신 있음)", maxLabel: "극심하게 의심함" } },
  { id: "F2", dimension: "efficacyLoss", format: "choice", prompt: "스스로의 능력에 대한 확신은?", options: [
    { label: "내가 잘하는 걸 안다", score: 0 }, { label: "대체로 괜찮다고 느낀다", score: 1 },
    { label: "잘하고 있는 건지 자주 의심스럽다", score: 2 }, { label: "제대로 하는 게 하나도 없다고 느낀다", score: 3 } ] },
  { id: "F3", dimension: "efficacyLoss", format: "choice", prompt: "칭찬을 받으면?", options: [
    { label: "감사히 받아들인다", score: 0 }, { label: "기쁘지만 약간 어색하다", score: 1 },
    { label: "과분하다고 느낀다", score: 2 }, { label: "곧이곧대로 못 믿겠다", score: 3 } ] },
  { id: "F4", dimension: "efficacyLoss", format: "choice", prompt: "어려운 과제가 주어지면?", options: [
    { label: "해낼 수 있다는 자신감이 든다", score: 0 }, { label: "부담되지만 해본다", score: 1 },
    { label: "내가 감당할 수 있을지 의문이 든다", score: 2 }, { label: "시작하기도 전에 무력감이 든다", score: 3 } ] },
  { id: "F5", dimension: "efficacyLoss", format: "choice", prompt: "실수를 하면?", options: [
    { label: "그럴 수 있다고 넘긴다", score: 0 }, { label: "반성하고 다음에 신경 쓴다", score: 1 },
    { label: "역시 나는 안 되나 싶다", score: 2 }, { label: "내 무능함이 드러난 것 같아 괴롭다", score: 3 } ] },
  { id: "F6", dimension: "efficacyLoss", format: "choice", prompt: "다른 사람과 비교했을 때 나의 능력은?", options: [
    { label: "충분히 괜찮다고 느낀다", score: 0 }, { label: "비슷한 수준이라 느낀다", score: 1 },
    { label: "뒤처진다고 자주 느낀다", score: 2 }, { label: "늘 부족하다고 느낀다", score: 3 } ] },
  { id: "F7", dimension: "efficacyLoss", format: "choice", prompt: "중요한 결정을 내려야 할 때?", options: [
    { label: "내 판단을 믿는다", score: 0 }, { label: "고민은 하지만 결국 믿는다", score: 1 },
    { label: "내 판단이 맞는지 계속 의심한다", score: 2 }, { label: "결정을 내릴 자격이 없다고 느낀다", score: 3 } ] },
  { id: "F8", dimension: "efficacyLoss", format: "choice", prompt: "지금까지 이뤄온 것들을 돌아보면?", options: [
    { label: "스스로 뿌듯하다", score: 0 }, { label: "나쁘지 않다고 느낀다", score: 1 },
    { label: "운이나 남들 덕이라고 느낀다", score: 2 }, { label: "제대로 이룬 게 없다고 느낀다", score: 3 } ] },
  { id: "F9", dimension: "efficacyLoss", format: "choice", prompt: "새로운 역할이나 책임을 맡게 되면?", options: [
    { label: "기대되고 잘할 수 있을 것 같다", score: 0 }, { label: "부담되지만 해볼 만하다", score: 1 },
    { label: "내가 감당 못 할 것 같아 두렵다", score: 2 }, { label: "언젠가 무능함이 들통날 것 같다", score: 3 } ] },
  { id: "F10", dimension: "efficacyLoss", format: "choice", prompt: "스스로에게 하는 평가는?", options: [
    { label: "꽤 능력 있는 사람이라 생각한다", score: 0 }, { label: "평범한 수준이라 생각한다", score: 1 },
    { label: "자주 부족하다고 느낀다", score: 2 }, { label: "무능하다고 느낄 때가 많다", score: 3 } ] },
];

export const MODULE3_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  exhaustion: 10,
  cynicism: 10,
  efficacyLoss: 10,
};

export const MODULE3_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  exhaustion: { high: "소진", low: "회복된 에너지" },
  cynicism: { high: "냉소", low: "일에 대한 애정" },
  efficacyLoss: { high: "효능감저하", low: "자기효능감" },
};

export const MODULE3_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "제 페이스 유지형", hook: "지금은 소진·냉소·효능감저하 어느 쪽도 뚜렷하지 않은, 비교적 안정된 상태입니다." },
  exhaustion: { title: "소진형", hook: "에너지가 바닥난 상태지만, 일에 대한 애정과 자기 확신은 아직 남아있습니다." },
  cynicism: { title: "냉소형", hook: "몸은 버틸 만하지만, 일과 조직에 대한 마음이 식어가고 있습니다." },
  efficacyLoss: { title: "효능감저하형", hook: "실제 성과와 무관하게, 스스로의 능력에 대한 확신이 흔들리고 있습니다." },
  "exhaustion+cynicism": { title: "탈진형", hook: "에너지도 바닥났고 일에 대한 애정도 식어가는, 번아웃이 상당히 진행된 상태입니다." },
  "exhaustion+efficacyLoss": { title: "소진된 확신 결여형", hook: "지쳐있는 동시에 스스로를 의심하게 되는, MBI에서 흔한 조합입니다." },
  "cynicism+efficacyLoss": { title: "회의적 무력형", hook: "일에 대한 의미도, 스스로에 대한 확신도 함께 옅어진 상태입니다." },
  "exhaustion+cynicism+efficacyLoss": { title: "완전 소진형", hook: "MBI가 정의하는 전형적인 '풀 번아웃 증후군' — 소진, 냉소, 효능감저하가 모두 뚜렷합니다." },
};
