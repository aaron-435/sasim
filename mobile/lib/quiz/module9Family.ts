/**
 * lib/module9Family.ts
 * ------------------------------------------------------------------
 * Module 9 — 가족/원가족 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈9_원가족_30문항_전문가검토용.xlsx). 3차원(Bowen 가족체계이론 기반):
 * 정서적얽힘(EM1-EM10) / 정서적단절(CO1-CO10) / 역할부담(PA1-PA10).
 * 트라우마나 구체적 사건을 직접 묻는 문항은 의도적으로 배제되어 있다.
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE9_QUESTIONS: ModuleQuestion[] = [
  // ---- 정서적얽힘 (Enmeshment) — EM1-EM10 ----
  { id: "EM1", dimension: "enmeshment", format: "slider", prompt: "가족 중 누군가의 기분이 안 좋으면 내 기분도 같이 가라앉는 정도는?", options: { minLabel: "전혀 영향 없음", maxLabel: "거의 그대로 전이됨" } },
  { id: "EM2", dimension: "enmeshment", format: "choice", prompt: "부모님이 힘들어하시면?", options: [
    { label: "내 일과 구분해서 생각한다", score: 0 }, { label: "마음이 쓰이지만 내 생활은 유지한다", score: 1 },
    { label: "내 기분도 크게 영향받는다", score: 2 }, { label: "내가 해결해줘야 할 것 같은 책임감이 든다", score: 3 } ] },
  { id: "EM3", dimension: "enmeshment", format: "choice", prompt: "가족과의 갈등이 있으면?", options: [
    { label: "각자의 문제로 넘긴다", score: 0 }, { label: "신경 쓰이지만 지나간다", score: 1 },
    { label: "오랫동안 마음에 남는다", score: 2 }, { label: "내 잘못처럼 느껴진다", score: 3 } ] },
  { id: "EM4", dimension: "enmeshment", format: "choice", prompt: "부모님의 기대나 바람은?", options: [
    { label: "참고만 한다", score: 0 }, { label: "어느 정도 고려한다", score: 1 },
    { label: "내 선택에 큰 영향을 준다", score: 2 }, { label: "내 인생의 기준이 되다시피 한다", score: 3 } ] },
  { id: "EM5", dimension: "enmeshment", format: "choice", prompt: "가족 모임이나 통화 후?", options: [
    { label: "가볍게 마무리된다", score: 0 }, { label: "별다른 여운 없다", score: 1 },
    { label: "기분이 한동안 영향받는다", score: 2 }, { label: "감정을 추스르는 데 시간이 필요하다", score: 3 } ] },
  { id: "EM6", dimension: "enmeshment", format: "choice", prompt: "나의 성취나 실패가 가족에게?", options: [
    { label: "내 개인적인 일이라 느낀다", score: 0 }, { label: "어느 정도 영향이 있다고 느낀다", score: 1 },
    { label: "가족 전체의 일처럼 느껴진다", score: 2 }, { label: "가족을 실망시킬까 봐 늘 신경 쓰인다", score: 3 } ] },
  { id: "EM7", dimension: "enmeshment", format: "choice", prompt: "독립적인 결정(진로, 연애 등)을 내릴 때?", options: [
    { label: "온전히 내 의지로 정한다", score: 0 }, { label: "참고는 하되 내가 정한다", score: 1 },
    { label: "가족의 반응을 먼저 생각한다", score: 2 }, { label: "가족이 반대하면 포기하게 된다", score: 3 } ] },
  { id: "EM8", dimension: "enmeshment", format: "choice", prompt: "부모님과 나의 감정 상태가?", options: [
    { label: "서로 별개로 흘러간다", score: 0 }, { label: "어느 정도 영향을 주고받는다", score: 1 },
    { label: "자주 같이 오르내린다", score: 2 }, { label: "거의 같은 리듬으로 움직인다", score: 3 } ] },
  { id: "EM9", dimension: "enmeshment", format: "choice", prompt: "가족에게 서운한 게 있어도?", options: [
    { label: "편하게 말한다", score: 0 }, { label: "적당히 말한다", score: 1 },
    { label: "괜히 미안해서 말을 아낀다", score: 2 }, { label: "내가 예민한 건가 싶어 참는다", score: 3 } ] },
  { id: "EM10", dimension: "enmeshment", format: "choice", prompt: "'나'와 '가족'을 분리해서 생각하면?", options: [
    { label: "쉽게 구분된다", score: 0 }, { label: "대체로 구분된다", score: 1 },
    { label: "가끔 헷갈린다", score: 2 }, { label: "어디까지가 나고 어디부터가 가족인지 모호하다", score: 3 } ] },
  // ---- 정서적단절 (Cutoff) — CO1-CO10 ----
  { id: "CO1", dimension: "cutoff", format: "slider", prompt: "가족과 깊은 이야기를 나누는 것이 어려운 정도는?", options: { minLabel: "전혀 어렵지 않음", maxLabel: "매우 어려움" } },
  { id: "CO2", dimension: "cutoff", format: "choice", prompt: "가족에게 요즘 근황을 말할 때?", options: [
    { label: "솔직하게 다 말한다", score: 0 }, { label: "대체로 말한다", score: 1 },
    { label: "필요한 것만 간단히 말한다", score: 2 }, { label: "거의 표면적인 얘기만 한다", score: 3 } ] },
  { id: "CO3", dimension: "cutoff", format: "choice", prompt: "가족 행사나 모임에?", options: [
    { label: "적극적으로 참여한다", score: 0 }, { label: "참여는 한다", score: 1 },
    { label: "가급적 줄이려 한다", score: 2 }, { label: "핑계를 대서라도 피하고 싶다", score: 3 } ] },
  { id: "CO4", dimension: "cutoff", format: "choice", prompt: "힘든 일이 있을 때 가족에게?", options: [
    { label: "가장 먼저 말한다", score: 0 }, { label: "어느 정도 말한다", score: 1 },
    { label: "거의 말하지 않는다", score: 2 }, { label: "가족은 마지막까지 모르게 한다", score: 3 } ] },
  { id: "CO5", dimension: "cutoff", format: "choice", prompt: "부모님과의 대화 주제는?", options: [
    { label: "다양하고 깊다", score: 0 }, { label: "일상적인 이야기가 많다", score: 1 },
    { label: "안부 정도로 제한적이다", score: 2 }, { label: "거의 형식적인 대화뿐이다", score: 3 } ] },
  { id: "CO6", dimension: "cutoff", format: "choice", prompt: "가족과 물리적으로 멀어진 것에 대해?", options: [
    { label: "해당 없음 또는 가깝게 지낸다", score: 0 }, { label: "자연스러운 변화라 생각한다", score: 1 },
    { label: "오히려 마음이 편하다", score: 2 }, { label: "의도적으로 거리를 두게 됐다", score: 3 } ] },
  { id: "CO7", dimension: "cutoff", format: "choice", prompt: "가족이 나에 대해 얼마나 알고 있다고 느끼는가?", options: [
    { label: "잘 알고 있다", score: 0 }, { label: "어느 정도 안다", score: 1 },
    { label: "겉모습 정도만 안다", score: 2 }, { label: "진짜 나에 대해선 거의 모른다", score: 3 } ] },
  { id: "CO8", dimension: "cutoff", format: "choice", prompt: "명절이나 가족 연락을 앞두면?", options: [
    { label: "반갑고 기대된다", score: 0 }, { label: "무난하게 받아들인다", score: 1 },
    { label: "약간의 부담이 있다", score: 2 }, { label: "피하고 싶은 마음이 크다", score: 3 } ] },
  { id: "CO9", dimension: "cutoff", format: "choice", prompt: "가족에 대한 감정을 한마디로 하면?", options: [
    { label: "따뜻함", score: 0 }, { label: "무난함", score: 1 },
    { label: "거리감", score: 2 }, { label: "의무감", score: 3 } ] },
  { id: "CO10", dimension: "cutoff", format: "choice", prompt: "성인이 된 후 가족과의 관계는?", options: [
    { label: "더 가까워졌다", score: 0 }, { label: "비슷하게 유지된다", score: 1 },
    { label: "점점 멀어졌다", score: 2 }, { label: "최소한의 연락만 하는 사이가 됐다", score: 3 } ] },
  // ---- 역할부담 (Parentification) — PA1-PA10 ----
  { id: "PA1", dimension: "parentification", format: "slider", prompt: "어릴 때부터 집안일이나 형제자매를 챙기는 역할을 했던 정도는?", options: { minLabel: "전혀 그런 역할 없었음", maxLabel: "항상 그런 역할을 맡음" } },
  { id: "PA2", dimension: "parentification", format: "choice", prompt: "어릴 때 나는?", options: [
    { label: "또래처럼 마음껏 어렸다", score: 0 }, { label: "또래와 비슷했다", score: 1 },
    { label: "또래보다 철이 일찍 들었다", score: 2 }, { label: "어린 시절부터 어른 노릇을 해야 했다", score: 3 } ] },
  { id: "PA3", dimension: "parentification", format: "choice", prompt: "가족 안에서 나의 역할은 주로?", options: [
    { label: "보살핌을 받는 쪽이었다", score: 0 }, { label: "자연스럽게 나눠졌다", score: 1 },
    { label: "챙기는 역할을 자주 맡았다", score: 2 }, { label: "내가 가족을 이끌어야 했다", score: 3 } ] },
  { id: "PA4", dimension: "parentification", format: "choice", prompt: "부모님의 감정(걱정, 스트레스 등)을?", options: [
    { label: "몰랐거나 상관없었다", score: 0 }, { label: "어느 정도 느꼈다", score: 1 },
    { label: "자주 살펴야 했다", score: 2 }, { label: "내가 달래드려야 할 때가 많았다", score: 3 } ] },
  { id: "PA5", dimension: "parentification", format: "choice", prompt: "지금도 가족 문제가 생기면?", options: [
    { label: "각자 알아서 해결한다", score: 0 }, { label: "필요하면 돕는다", score: 1 },
    { label: "내가 나서서 해결해야 할 것 같다", score: 2 }, { label: "항상 내가 책임져야 한다는 부담이 있다", score: 3 } ] },
  { id: "PA6", dimension: "parentification", format: "choice", prompt: "어린 시절, 내 감정보다 우선했던 것은?", options: [
    { label: "딱히 없었다", score: 0 }, { label: "가끔 그랬다", score: 1 },
    { label: "가족 분위기가 먼저였다", score: 2 }, { label: "내 감정은 뒷전이었다", score: 3 } ] },
  { id: "PA7", dimension: "parentification", format: "choice", prompt: "지금 관계(연애, 친구 등)에서 나는?", options: [
    { label: "적당히 서로 챙긴다", score: 0 }, { label: "비슷하게 주고받는다", score: 1 },
    { label: "내가 더 많이 챙기는 편이다", score: 2 }, { label: "늘 내가 상대를 돌봐야 할 것 같다", score: 3 } ] },
  { id: "PA8", dimension: "parentification", format: "choice", prompt: "스스로 쉬어도 될 때조차?", options: [
    { label: "편하게 쉰다", score: 0 }, { label: "어느 정도 쉰다", score: 1 },
    { label: "뭔가 해야 할 것 같은 불안이 있다", score: 2 }, { label: "쉬는 것에 죄책감을 느낀다", score: 3 } ] },
  { id: "PA9", dimension: "parentification", format: "choice", prompt: "'내가 없으면 안 될 것 같다'는 느낌은?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "관계나 일에서 늘 그렇게 느낀다", score: 3 } ] },
  { id: "PA10", dimension: "parentification", format: "choice", prompt: "어릴 때를 돌아보면?", options: [
    { label: "충분히 아이답게 지냈다고 느낀다", score: 0 }, { label: "대체로 그랬다고 느낀다", score: 1 },
    { label: "조금 일찍 철이 든 것 같다", score: 2 }, { label: "아이였던 시간이 짧았다고 느낀다", score: 3 } ] },
];

export const MODULE9_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  enmeshment: 10,
  cutoff: 10,
  parentification: 10,
};

export const MODULE9_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  enmeshment: { high: "정서적얽힘", low: "건강한 분리" },
  cutoff: { high: "정서적단절", low: "열린 소통" },
  parentification: { high: "역할부담", low: "가벼운 책임감" },
};

export const MODULE9_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "균형잡힌 가족거리형", hook: "가족과 정서적으로 지나치게 얽혀 있지도, 단절되어 있지도 않은 균형 잡힌 상태입니다." },
  enmeshment: { title: "정서적 얽힘형", hook: "가족의 감정이 나도 모르게 크게 전이되고, 그 영향에서 벗어나기 어렵습니다." },
  cutoff: { title: "정서적 단절형", hook: "가족과 깊은 이야기를 나누기 어렵고, 의식적이든 아니든 거리를 두고 있습니다." },
  parentification: { title: "조숙한 돌봄형", hook: "어릴 때부터 어른 역할을 떠맡아온 패턴이 지금의 관계에도 이어지고 있습니다." },
  "enmeshment+cutoff": { title: "거리를 둔 채 끌려가는형", hook: "표면적으론 거리를 두면서도, 마음은 여전히 가족의 감정에 크게 끌려가는 모순적인 패턴입니다." },
  "enmeshment+parentification": { title: "책임과 얽힘형", hook: "가족의 감정도 떠안고, 돌봄의 책임까지 함께 짊어진 상태입니다." },
  "cutoff+parentification": { title: "거리를 둔 채 짊어진형", hook: "정서적으로는 멀어졌지만, 여전히 역할과 책임감만은 남아있는 상태입니다." },
  "enmeshment+cutoff+parentification": { title: "원가족 부담 총체형", hook: "얽힘, 단절, 역할부담이 모두 뚜렷하게 나타나는, 원가족의 영향이 여러 방향에서 무겁게 걸려있는 상태입니다." },
};
