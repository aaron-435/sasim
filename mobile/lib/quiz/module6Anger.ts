/**
 * lib/module6Anger.ts
 * ------------------------------------------------------------------
 * Module 6 — 분노 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈6_분노_30문항_전문가검토용.xlsx). 3차원(STAXI 기반): 억압(S1-S10) /
 * 폭발(E1-E10) / 반추(R1-R10). 억압+폭발이 함께 높은 경우가 원 기획의
 * "참다가 터짐" 패턴과 대응한다 (모듈 설계 근거 문서 참고).
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE6_QUESTIONS: ModuleQuestion[] = [
  // ---- 억압 (Suppression) — S1-S10 ----
  { id: "S1", dimension: "suppression", format: "slider", prompt: "화가 나도 겉으로 티 내지 않는 정도는?", options: { minLabel: "항상 티가 남", maxLabel: "전혀 티 안 남(완벽하게 숨김)" } },
  { id: "S2", dimension: "suppression", format: "choice", prompt: "화가 나면?", options: [
    { label: "바로 표현한다", score: 0 }, { label: "조금 참았다가 표현한다", score: 1 },
    { label: "웃으면서 넘긴다", score: 2 }, { label: "티 하나 안 내고 삼킨다", score: 3 } ] },
  { id: "S3", dimension: "suppression", format: "choice", prompt: "화가 나도, 상대는 내가 화났다는 걸 절대 눈치채지 못한다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "S4", dimension: "suppression", format: "choice", prompt: "억울한 상황에서도?", options: [
    { label: "바로 항의한다", score: 0 }, { label: "적당히 표현한다", score: 1 },
    { label: "속으로만 삭인다", score: 2 }, { label: "오히려 사과하게 된다", score: 3 } ] },
  { id: "S5", dimension: "suppression", format: "choice", prompt: "화를 참고 나면?", options: [
    { label: "금방 풀린다", score: 0 }, { label: "시간이 지나면 풀린다", score: 1 },
    { label: "응어리가 남는다", score: 2 }, { label: "두고두고 곱씹는다", score: 3 } ] },
  { id: "S6", dimension: "suppression", format: "choice", prompt: "가까운 사람에게 서운해도?", options: [
    { label: "바로 말한다", score: 0 }, { label: "때를 봐서 말한다", score: 1 },
    { label: "말 안 하고 넘어간다", score: 2 }, { label: "괜찮은 척하다가 나중에 폭발한다", score: 3 } ] },
  { id: "S7", dimension: "suppression", format: "choice", prompt: "화를 내는 것에 대해?", options: [
    { label: "자연스러운 감정이라 생각한다", score: 0 }, { label: "필요할 땐 낸다", score: 1 },
    { label: "화내는 내 모습이 싫다", score: 2 }, { label: "화내면 안 될 것 같은 죄책감이 든다", score: 3 } ] },
  { id: "S8", dimension: "suppression", format: "choice", prompt: "갈등 상황을 피하려고?", options: [
    { label: "그렇지 않다", score: 0 }, { label: "약간 그런 편이다", score: 1 },
    { label: "어지간하면 참고 넘어간다", score: 2 }, { label: "내가 손해 봐도 그냥 참는다", score: 3 } ] },
  { id: "S9", dimension: "suppression", format: "choice", prompt: "화가 쌓이면 몸으로는?", options: [
    { label: "특별한 증상 없다", score: 0 }, { label: "가끔 긴장된다", score: 1 },
    { label: "두통이나 소화불량이 온다", score: 2 }, { label: "몸이 아플 때까지 참는다", score: 3 } ] },
  { id: "S10", dimension: "suppression", format: "choice", prompt: "화났던 일을 나중에 떠올리면?", options: [
    { label: "이미 잊었다", score: 0 }, { label: "가볍게 기억난다", score: 1 },
    { label: "그때 표현 못 한 게 아쉽다", score: 2 }, { label: "왜 그때 말 못 했나 자책한다", score: 3 } ] },
  // ---- 폭발 (Explosion) — E1-E10 ----
  { id: "E1", dimension: "explosion", format: "choice", prompt: "화가 치밀어 오르면?", options: [
    { label: "차분히 가라앉힌다", score: 0 }, { label: "잠깐 참았다가 말한다", score: 1 },
    { label: "바로 언성이 높아진다", score: 2 }, { label: "순간적으로 확 터진다", score: 3 } ] },
  { id: "E2", dimension: "explosion", format: "slider", prompt: "화가 나면 감정이 확 튀어오르는 정도는?", options: { minLabel: "전혀 그렇지 않음(항상 차분함 유지)", maxLabel: "순식간에 폭발함" } },
  { id: "E3", dimension: "explosion", format: "choice", prompt: "화가 나면, 나조차 통제 못 할 정도로 순간적으로 폭발할 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "E4", dimension: "explosion", format: "choice", prompt: "운전 중 다른 차가 끼어들면?", options: [
    { label: "대수롭지 않게 넘긴다", score: 0 }, { label: "살짝 짜증 난다", score: 1 },
    { label: "욕이 튀어나온다", score: 2 }, { label: "경적을 울리거나 항의하게 된다", score: 3 } ] },
  { id: "E5", dimension: "explosion", format: "choice", prompt: "화가 났을 때 말투는?", options: [
    { label: "평소와 비슷하다", score: 0 }, { label: "조금 날카로워진다", score: 1 },
    { label: "목소리가 커진다", score: 2 }, { label: "나도 모르게 심한 말이 나간다", score: 3 } ] },
  { id: "E6", dimension: "explosion", format: "choice", prompt: "화난 후 물건을 다룰 때?", options: [
    { label: "평소와 같다", score: 0 }, { label: "조금 거칠어진다", score: 1 },
    { label: "문을 세게 닫거나 물건을 세게 놓는다", score: 2 }, { label: "물건을 던지거나 부순 적이 있다", score: 3 } ] },
  { id: "E7", dimension: "explosion", format: "choice", prompt: "누군가 나를 화나게 하면?", options: [
    { label: "차분히 대화로 푼다", score: 0 }, { label: "조금 날 서게 반응한다", score: 1 },
    { label: "바로 맞받아친다", score: 2 }, { label: "감정적으로 강하게 쏘아붙인다", score: 3 } ] },
  { id: "E8", dimension: "explosion", format: "choice", prompt: "화가 난 뒤 후회하는 일이?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "매번 있어서 스스로에게 실망한다", score: 3 } ] },
  { id: "E9", dimension: "explosion", format: "choice", prompt: "화를 참다가 터지면?", options: [
    { label: "적당한 선에서 멈춘다", score: 0 }, { label: "어느 정도 조절한다", score: 1 },
    { label: "멈추기가 어렵다", score: 2 }, { label: "한번 터지면 걷잡을 수 없다", score: 3 } ] },
  { id: "E10", dimension: "explosion", format: "choice", prompt: "주변 사람들은 내 화에 대해?", options: [
    { label: "감정 기복이 적다고 한다", score: 0 }, { label: "보통이라고 한다", score: 1 },
    { label: "욱하는 편이라고 한다", score: 2 }, { label: "화나면 무섭다고 말한다", score: 3 } ] },
  // ---- 반추 (Rumination) — R1-R10 ----
  { id: "R1", dimension: "rumination", format: "choice", prompt: "화났던 일이 지나간 후에도?", options: [
    { label: "금방 잊는다", score: 0 }, { label: "조금 남아있다가 사라진다", score: 1 },
    { label: "계속 생각난다", score: 2 }, { label: "며칠씩 곱씹는다", score: 3 } ] },
  { id: "R2", dimension: "rumination", format: "slider", prompt: "화가 가라앉는 데 걸리는 시간은?", options: { minLabel: "매우 짧음(금방 풀림)", maxLabel: "매우 긺(며칠씩 감)" } },
  { id: "R3", dimension: "rumination", format: "choice", prompt: "화나게 한 사람을 다시 보면?", options: [
    { label: "아무렇지 않다", score: 0 }, { label: "약간 어색하다", score: 1 },
    { label: "그 일이 다시 떠오른다", score: 2 }, { label: "또 화가 치밀어 오른다", score: 3 } ] },
  { id: "R4", dimension: "rumination", format: "choice", prompt: "이미 지나간 일인데도, 자기 전에 그 상황을 계속 재생하며 화를 낸다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "R5", dimension: "rumination", format: "choice", prompt: "화를 가라앉히려고 할 때?", options: [
    { label: "쉽게 진정된다", score: 0 }, { label: "시간이 좀 걸리지만 된다", score: 1 },
    { label: "쉽게 진정이 안 된다", score: 2 }, { label: "생각할수록 오히려 더 화가 난다", score: 3 } ] },
  { id: "R6", dimension: "rumination", format: "choice", prompt: "사소한 일로 화가 나면 다른 일에도?", options: [
    { label: "영향이 없다", score: 0 }, { label: "약간 영향이 있다", score: 1 },
    { label: "기분이 계속 안 좋다", score: 2 }, { label: "다른 일에도 짜증을 옮긴다", score: 3 } ] },
  { id: "R7", dimension: "rumination", format: "choice", prompt: "화났던 상황을 다른 사람에게 얘기할 때?", options: [
    { label: "담담하게 얘기한다", score: 0 }, { label: "조금 감정이 실린다", score: 1 },
    { label: "다시 화가 나며 얘기한다", score: 2 }, { label: "말하다가 그때보다 더 흥분한다", score: 3 } ] },
  { id: "R8", dimension: "rumination", format: "choice", prompt: "상대가 사과해도?", options: [
    { label: "바로 풀린다", score: 0 }, { label: "어느 정도 풀린다", score: 1 },
    { label: "쉽게 안 풀린다", score: 2 }, { label: "이미 마음이 돌아서서 소용없다", score: 3 } ] },
  { id: "R9", dimension: "rumination", format: "choice", prompt: "화가 난 상태에서 중요한 결정을 내려야 하면?", options: [
    { label: "감정과 별개로 판단한다", score: 0 }, { label: "조금 영향은 받지만 판단한다", score: 1 },
    { label: "판단력이 흐려진다", score: 2 }, { label: "화난 채로 후회할 결정을 한 적 있다", score: 3 } ] },
  { id: "R10", dimension: "rumination", format: "choice", prompt: "스스로 화를 다스리는 능력에 대해?", options: [
    { label: "잘 다스린다고 느낀다", score: 0 }, { label: "어느 정도 다스린다", score: 1 },
    { label: "잘 안 되는 편이다", score: 2 }, { label: "화가 나를 지배하는 것 같다", score: 3 } ] },
];

export const MODULE6_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  suppression: 10,
  explosion: 10,
  rumination: 10,
};

export const MODULE6_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  suppression: { high: "억압", low: "자연스러운 표현" },
  explosion: { high: "폭발", low: "차분한 절제" },
  rumination: { high: "반추", low: "빠른 회복" },
};

export const MODULE6_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "감정 유연형", hook: "화를 억누르지도, 터뜨리지도, 오래 곱씹지도 않는 비교적 안정된 분노 조절 상태입니다." },
  suppression: { title: "억압형", hook: "화가 나도 겉으로 잘 드러내지 않고 삼키는 데 익숙하지만, 그만큼 안에는 쌓여갑니다." },
  explosion: { title: "폭발형", hook: "화가 나면 순간적으로 통제가 어려울 만큼 확 터지는 편입니다." },
  rumination: { title: "반추형", hook: "화는 크게 표출되지 않지만, 지나간 뒤에도 오래도록 곱씹으며 놓지 못합니다." },
  "suppression+explosion": { title: "참다가 터짐형", hook: "평소엔 웬만하면 삼키다가, 어느 순간 쌓인 게 걷잡을 수 없이 한꺼번에 터지는 패턴입니다." },
  "suppression+rumination": { title: "억눌린 채 곱씹는형", hook: "겉으로 표현은 안 하지만, 마음속에서는 그 감정을 계속 재생하고 있습니다." },
  "explosion+rumination": { title: "폭발 후 자책형", hook: "순간적으로 강하게 터진 후에도 그 여운과 후회가 오래 남습니다." },
  "suppression+explosion+rumination": { title: "감정 과부하형", hook: "억누르다 터지고, 터진 뒤로도 오래 곱씹는 — 분노 조절의 세 축이 모두 무겁게 걸려있는 상태입니다." },
};
