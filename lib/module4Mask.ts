/**
 * lib/module4Mask.ts
 * ------------------------------------------------------------------
 * Module 4 — 가면(가제) 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈4_가면_30문항_전문가검토용.xlsx). 3차원: 이미지관리(IM1-IM10) /
 * 은폐(AS1-AS10) / 관계피로(SE1-SE10).
 *
 * Two new item formats first appear in this module (see lib/quizProfile.ts):
 *   - "극단형(0/3)" items (IM3, IM6, AS2, AS7, SE2, SE7) have only two options
 *     (0점/3점, no middle) — encoded here as a 2-option "choice" question,
 *     which QuizScreen renders the same way as a 4-option one.
 *   - AS5 is a REVERSED slider ("역환산"): 1 = "아무도 모른다" (high concealment,
 *     3점), 10 = "누군가는 완전히 안다" (low concealment, 0점) — format
 *     "slider-reverse", scored via scoreSliderValue() in lib/quizProfile.ts.
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE4_QUESTIONS: ModuleQuestion[] = [
  // ---- 이미지관리 (Image Management) — IM1-IM10 ----
  { id: "IM1", dimension: "imageManagement", format: "slider", prompt: "상황·상대에 따라 나를 다르게 보여주는 정도는?", options: { minLabel: "어디서나 똑같음", maxLabel: "상대마다 완전히 다른 사람처럼" } },
  { id: "IM2", dimension: "imageManagement", format: "choice", prompt: "처음 만난 사람 앞에서 나는?", options: [
    { label: "있는 그대로 행동한다", score: 0 }, { label: "약간 조심하는 정도", score: 1 },
    { label: "상대가 좋아할 만한 모습을 보여준다", score: 2 }, { label: "거의 다른 사람처럼 연기한다", score: 3 } ] },
  { id: "IM3", dimension: "imageManagement", format: "choice", prompt: "나는 완전히 다른 두 개의 성격을 상황에 따라 스위치처럼 바꿔 쓴다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "IM4", dimension: "imageManagement", format: "choice", prompt: "모임 자리에서 분위기가 처지면?", options: [
    { label: "굳이 나서지 않는다", score: 0 }, { label: "적당히 맞춰준다", score: 1 },
    { label: "분위기 메이커 역할을 자처한다", score: 2 }, { label: "억지로라도 밝은 캐릭터를 연기한다", score: 3 } ] },
  { id: "IM5", dimension: "imageManagement", format: "choice", prompt: "상사/윗사람 앞에서의 나와 친구들 앞에서의 나는?", options: [
    { label: "거의 비슷하다", score: 0 }, { label: "조금 다르다", score: 1 },
    { label: "꽤 다르다", score: 2 }, { label: "완전히 다른 사람 같다", score: 3 } ] },
  { id: "IM6", dimension: "imageManagement", format: "choice", prompt: "사람들이 좋아하는 '나'는, 사실 진짜 내가 아니라 내가 만든 캐릭터에 가깝다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "IM7", dimension: "imageManagement", format: "choice", prompt: "대화 중 상대의 반응을 보면서?", options: [
    { label: "별로 신경 안 쓴다", score: 0 }, { label: "가볍게 참고한다", score: 1 },
    { label: "실시간으로 내 태도를 조정한다", score: 2 }, { label: "상대 표정 하나하나에 맞춰 연기를 수정한다", score: 3 } ] },
  { id: "IM8", dimension: "imageManagement", format: "choice", prompt: "SNS에 올리는 나의 모습은?", options: [
    { label: "평소 모습 그대로다", score: 0 }, { label: "조금 더 나은 모습이다", score: 1 },
    { label: "꽤 편집된 모습이다", score: 2 }, { label: "실제와는 다른 캐릭터에 가깝다", score: 3 } ] },
  { id: "IM9", dimension: "imageManagement", format: "choice", prompt: "누군가 나를 좋아한다고 하면?", options: [
    { label: "있는 그대로 좋아해주는 거라 믿는다", score: 0 }, { label: "대체로 그렇다고 믿는다", score: 1 },
    { label: "내가 보여준 모습을 좋아하는 거란 생각이 든다", score: 2 }, { label: "진짜 나를 알면 안 좋아할 거라 생각한다", score: 3 } ] },
  { id: "IM10", dimension: "imageManagement", format: "choice", prompt: "여러 사람과의 관계에서 나는?", options: [
    { label: "일관된 한 사람이다", score: 0 }, { label: "약간씩 다르지만 비슷하다", score: 1 },
    { label: "관계마다 다른 역할을 맡는다", score: 2 }, { label: "관계 수만큼 다른 '나'가 존재하는 것 같다", score: 3 } ] },
  // ---- 은폐 (Concealment) — AS1-AS10 ----
  { id: "AS1", dimension: "concealment", format: "choice", prompt: "속마음과 다른 말을 해야 할 때?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "거의 매번 그렇다", score: 3 } ] },
  { id: "AS2", dimension: "concealment", format: "choice", prompt: "나에게는 가장 친한 사람에게조차 절대 말 못 할 진짜 속마음이 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "AS3", dimension: "concealment", format: "choice", prompt: "화가 나거나 서운해도?", options: [
    { label: "바로 표현한다", score: 0 }, { label: "적당히 표현한다", score: 1 },
    { label: "웃으면서 넘긴다", score: 2 }, { label: "티도 안 나게 완전히 숨긴다", score: 3 } ] },
  { id: "AS4", dimension: "concealment", format: "choice", prompt: "내 진짜 취향이나 생각을 말했을 때 사람들이 이상하게 볼까 봐?", options: [
    { label: "그런 걱정은 안 한다", score: 0 }, { label: "가끔 걱정된다", score: 1 },
    { label: "그래서 적당히 숨기고 말한다", score: 2 }, { label: "아예 말을 안 하게 된다", score: 3 } ] },
  { id: "AS5", dimension: "concealment", format: "slider-reverse", prompt: "지금 이 순간, '가면을 완전히 벗은 나'를 아는 사람이 있다는 확신의 정도는?", options: { minLabel: "아무도 진짜 나를 모른다", maxLabel: "누군가는 완전히 안다" } },
  { id: "AS6", dimension: "concealment", format: "choice", prompt: "내가 힘들 때?", options: [
    { label: "주변에 바로 알린다", score: 0 }, { label: "가까운 사람에겐 알린다", score: 1 },
    { label: "괜찮은 척하는 게 편하다", score: 2 }, { label: "누구에게도 티 내지 않으려 한다", score: 3 } ] },
  { id: "AS7", dimension: "concealment", format: "choice", prompt: "사람들 앞에서 웃고 있어도, 속으로는 완전히 다른 감정일 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "AS8", dimension: "concealment", format: "choice", prompt: "다수의 의견과 내 생각이 다를 때?", options: [
    { label: "내 의견을 명확히 말한다", score: 0 }, { label: "조심스럽게 말한다", score: 1 },
    { label: "굳이 말 안 하고 넘어간다", score: 2 }, { label: "다수 의견에 맞춰 동조하는 척한다", score: 3 } ] },
  { id: "AS9", dimension: "concealment", format: "choice", prompt: "진짜 내 모습을 누군가 알게 된다면?", options: [
    { label: "편안할 것 같다", score: 0 }, { label: "조금 어색할 것 같다", score: 1 },
    { label: "부담스러울 것 같다", score: 2 }, { label: "그 관계가 깨질까 봐 두렵다", score: 3 } ] },
  { id: "AS10", dimension: "concealment", format: "choice", prompt: "하루를 마치고 혼자가 되면?", options: [
    { label: "특별한 감정 없이 편안하다", score: 0 }, { label: "적당히 홀가분하다", score: 1 },
    { label: "가면을 벗은 듯 안도감이 크다", score: 2 }, { label: "온종일 연기한 듯한 피로감이 몰려온다", score: 3 } ] },
  // ---- 관계피로 (Social Exhaustion) — SE1-SE10 ----
  { id: "SE1", dimension: "socialFatigue", format: "choice", prompt: "사람들과 즐겁게 어울리고 집에 오면?", options: [
    { label: "에너지가 채워진 느낌이다", score: 0 }, { label: "적당히 만족스럽다", score: 1 },
    { label: "묘하게 허탈하다", score: 2 }, { label: "혼자 있고 싶은 마음뿐이다", score: 3 } ] },
  { id: "SE2", dimension: "socialFatigue", format: "choice", prompt: "사람 많은 자리를 다녀오면, 즐거웠던 것과 별개로 몸과 마음이 완전히 방전된다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "SE3", dimension: "socialFatigue", format: "choice", prompt: "인간관계를 유지하는 것에 대해?", options: [
    { label: "자연스럽고 편하다", score: 0 }, { label: "노력이 좀 필요하다", score: 1 },
    { label: "꽤 힘이 든다", score: 2 }, { label: "버겁게 느껴질 때가 많다", score: 3 } ] },
  { id: "SE4", dimension: "socialFatigue", format: "choice", prompt: "사람들이 나를 인싸/사교적이라고 생각하는 것에 대해?", options: [
    { label: "그게 진짜 내 모습이다", score: 0 }, { label: "대체로 맞다", score: 1 },
    { label: "절반만 맞는 것 같다", score: 2 }, { label: "완전히 오해하고 있는 것 같다", score: 3 } ] },
  { id: "SE5", dimension: "socialFatigue", format: "slider", prompt: "사람 만나는 걸 좋아하지만 동시에 피곤한, 그 모순된 마음의 정도는?", options: { minLabel: "전혀 모순 없음", maxLabel: "매우 모순적으로 느낌" } },
  { id: "SE6", dimension: "socialFatigue", format: "choice", prompt: "여러 사람과 함께 있어도?", options: [
    { label: "충만하게 느껴진다", score: 0 }, { label: "대체로 괜찮다", score: 1 },
    { label: "가끔 외로움이 스친다", score: 2 }, { label: "군중 속에서도 혼자라는 느낌이 든다", score: 3 } ] },
  { id: "SE7", dimension: "socialFatigue", format: "choice", prompt: "나를 좋아하는 사람이 많아도, 정작 진짜 내 편은 아무도 없다고 느낄 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "SE8", dimension: "socialFatigue", format: "choice", prompt: "약속이 취소되면?", options: [
    { label: "아쉬운 마음이 크다", score: 0 }, { label: "그럭저럭 아쉽다", score: 1 },
    { label: "솔직히 좀 안도된다", score: 2 }, { label: "몰래 다행이라고 생각한다", score: 3 } ] },
  { id: "SE9", dimension: "socialFatigue", format: "choice", prompt: "관계를 유지하기 위해 하는 노력에 비해 돌아오는 감정적 만족은?", options: [
    { label: "충분하다", score: 0 }, { label: "그럭저럭 있다", score: 1 },
    { label: "부족하게 느껴질 때가 많다", score: 2 }, { label: "노력한 만큼 허무하게 느껴진다", score: 3 } ] },
  { id: "SE10", dimension: "socialFatigue", format: "choice", prompt: "가면을 벗고 완전히 쉴 수 있는 시간/사람이?", options: [
    { label: "충분히 있다", score: 0 }, { label: "어느 정도 있다", score: 1 },
    { label: "거의 없다", score: 2 }, { label: "전혀 없다고 느껴진다", score: 3 } ] },
];

export const MODULE4_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  imageManagement: 10,
  concealment: 10,
  socialFatigue: 10,
};

export const MODULE4_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  imageManagement: { high: "이미지관리", low: "일관된 자기표현" },
  concealment: { high: "은폐", low: "솔직한 개방성" },
  socialFatigue: { high: "관계피로", low: "관계에서 얻는 충전감" },
};

export const MODULE4_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "일관된 자기형", hook: "상황에 따라 크게 다른 모습을 보이지 않는, 비교적 일관된 자기표현을 갖고 있습니다." },
  imageManagement: { title: "이미지관리형", hook: "상황과 상대에 맞춰 보여주는 모습을 세심하게 조정합니다." },
  concealment: { title: "은폐형", hook: "진짜 속마음은 가까운 사람에게도 잘 드러내지 않습니다." },
  socialFatigue: { title: "관계피로형", hook: "사람을 만나는 걸 좋아하면서도, 그만큼 크게 소진됩니다." },
  "imageManagement+concealment": { title: "가면형", hook: "보여주는 모습을 관리하는 동시에 진짜 속마음은 철저히 숨기는 패턴입니다." },
  "imageManagement+socialFatigue": { title: "연기하는 인싸형", hook: "밝은 모습을 보여주려 애쓰지만, 그만큼 관계에서 크게 지칩니다." },
  "concealment+socialFatigue": { title: "고립된 은폐형", hook: "속마음을 숨기다 보니 관계에서 진짜 충전을 얻지 못하고 있습니다." },
  "imageManagement+concealment+socialFatigue": { title: "완전 가면형", hook: "이미지관리, 은폐, 관계피로가 모두 뚜렷한, '가면'이 가장 무거운 패턴입니다." },
};
