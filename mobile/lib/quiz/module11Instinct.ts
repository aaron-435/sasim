/**
 * lib/module11Instinct.ts
 * ------------------------------------------------------------------
 * Module 11 — 섹슈얼리티/본능 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈11_본능_30문항_전문가검토용.xlsx). 3차원(자기표현 억제 개념 기반, 성적
 * 욕구/행동을 묻는 문항은 의도적으로 배제): 표현억제(E1-E10) / 즉흥성억제
 * (V1-V10) / 확신부족(S1-S10).
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE11_QUESTIONS: ModuleQuestion[] = [
  // ---- 표현억제 (Expression Suppression) — E1-E10 ----
  { id: "E1", dimension: "expressionSuppression", format: "slider", prompt: "사람들 앞에서 나를 자유롭게 표현하는 게 어려운 정도는?", options: { minLabel: "전혀 어렵지 않음", maxLabel: "매우 어려움" } },
  { id: "E2", dimension: "expressionSuppression", format: "choice", prompt: "매력적이라는 칭찬을 들으면?", options: [
    { label: "자연스럽게 받아들인다", score: 0 }, { label: "기분 좋게 받아들인다", score: 1 },
    { label: "어색해서 넘긴다", score: 2 }, { label: "부정하거나 회피하게 된다", score: 3 } ] },
  { id: "E3", dimension: "expressionSuppression", format: "choice", prompt: "사람들의 시선을 받으면?", options: [
    { label: "즐긴다", score: 0 }, { label: "크게 신경 안 쓴다", score: 1 },
    { label: "의식하게 된다", score: 2 }, { label: "불편해서 위축된다", score: 3 } ] },
  { id: "E4", dimension: "expressionSuppression", format: "choice", prompt: "춤을 추거나 몸을 자유롭게 움직여야 하는 자리에서?", options: [
    { label: "신나게 즐긴다", score: 0 }, { label: "적당히 즐긴다", score: 1 },
    { label: "눈치 보며 조심스럽다", score: 2 }, { label: "최대한 피하고 싶다", score: 3 } ] },
  { id: "E5", dimension: "expressionSuppression", format: "choice", prompt: "좋아하는 사람에게 호감을 표현할 때?", options: [
    { label: "자연스럽게 표현한다", score: 0 }, { label: "조심스럽게 표현한다", score: 1 },
    { label: "표현하기가 꽤 어렵다", score: 2 }, { label: "거의 숨기게 된다", score: 3 } ] },
  { id: "E6", dimension: "expressionSuppression", format: "choice", prompt: "자신 있는 옷차림이나 스타일을?", options: [
    { label: "자유롭게 시도한다", score: 0 }, { label: "어느 정도 시도한다", score: 1 },
    { label: "눈치를 보게 된다", score: 2 }, { label: "남들 시선이 무서워 못 한다", score: 3 } ] },
  { id: "E7", dimension: "expressionSuppression", format: "choice", prompt: "즉흥적으로 웃거나 소리 내는 것에?", options: [
    { label: "거리낌이 없다", score: 0 }, { label: "대체로 편하다", score: 1 },
    { label: "의식하게 된다", score: 2 }, { label: "최대한 절제하려 한다", score: 3 } ] },
  { id: "E8", dimension: "expressionSuppression", format: "choice", prompt: "매력을 발산하는 상상을 하면?", options: [
    { label: "자연스럽게 상상한다", score: 0 }, { label: "가끔 상상한다", score: 1 },
    { label: "어색하고 낯설다", score: 2 }, { label: "상상만 해도 민망하다", score: 3 } ] },
  { id: "E9", dimension: "expressionSuppression", format: "choice", prompt: "새로운 사람 앞에서의 첫인상은?", options: [
    { label: "있는 그대로 보여준다", score: 0 }, { label: "조금 조심스럽게 보여준다", score: 1 },
    { label: "많이 절제된 모습을 보여준다", score: 2 }, { label: "최대한 무난하게만 보이려 한다", score: 3 } ] },
  { id: "E10", dimension: "expressionSuppression", format: "choice", prompt: "나의 매력 포인트에 대해?", options: [
    { label: "잘 알고 자신 있다", score: 0 }, { label: "어느 정도 안다", score: 1 },
    { label: "잘 모르겠다", score: 2 }, { label: "매력이랄 게 있을까 싶다", score: 3 } ] },
  // ---- 즉흥성억제 (Spontaneity Suppression) — V1-V10 ----
  { id: "V1", dimension: "spontaneitySuppression", format: "slider", prompt: "몸으로 감정을 자유롭게 표현하는 게(웃음, 몸짓 등) 억제되는 정도는?", options: { minLabel: "전혀 억제되지 않음(자유롭게 표현)", maxLabel: "매우 억제됨" } },
  { id: "V2", dimension: "spontaneitySuppression", format: "choice", prompt: "신나는 음악이 나오면?", options: [
    { label: "몸이 저절로 움직인다", score: 0 }, { label: "리듬을 타는 편이다", score: 1 },
    { label: "속으로만 즐긴다", score: 2 }, { label: "가만히 있게 된다", score: 3 } ] },
  { id: "V3", dimension: "spontaneitySuppression", format: "choice", prompt: "즉흥적인 제안(갑자기 놀러가기 등)을 받으면?", options: [
    { label: "바로 좋다고 한다", score: 0 }, { label: "고민 후 따라간다", score: 1 },
    { label: "계획이 없으면 부담스럽다", score: 2 }, { label: "즉흥적인 건 거의 피한다", score: 3 } ] },
  { id: "V4", dimension: "spontaneitySuppression", format: "choice", prompt: "감정이 크게 벅차오르면?", options: [
    { label: "몸으로 자연스럽게 표현된다", score: 0 }, { label: "어느 정도 드러난다", score: 1 },
    { label: "애써 눌러 담는다", score: 2 }, { label: "티 안 나게 억누른다", score: 3 } ] },
  { id: "V5", dimension: "spontaneitySuppression", format: "choice", prompt: "나의 웃음소리나 표현 방식은?", options: [
    { label: "크고 자유롭다", score: 0 }, { label: "적당히 자연스럽다", score: 1 },
    { label: "조심스러운 편이다", score: 2 }, { label: "많이 절제돼 있다", score: 3 } ] },
  { id: "V6", dimension: "spontaneitySuppression", format: "choice", prompt: "낯선 활동(즉흥 여행, 새로운 취미 등)에?", options: [
    { label: "적극적으로 뛰어든다", score: 0 }, { label: "관심 있으면 해본다", score: 1 },
    { label: "익숙해질 시간이 필요하다", score: 2 }, { label: "익숙한 것만 고수한다", score: 3 } ] },
  { id: "V7", dimension: "spontaneitySuppression", format: "choice", prompt: "몸을 움직이는 활동(운동, 춤 등)에서 느끼는 해방감은?", options: [
    { label: "크게 느낀다", score: 0 }, { label: "어느 정도 느낀다", score: 1 },
    { label: "잘 못 느낀다", score: 2 }, { label: "오히려 긴장된다", score: 3 } ] },
  { id: "V8", dimension: "spontaneitySuppression", format: "choice", prompt: "즉흥적으로 떠오른 생각을 바로 말하거나 행동으로 옮기는 것에?", options: [
    { label: "거리낌이 없다", score: 0 }, { label: "대체로 편하다", score: 1 },
    { label: "주저하게 된다", score: 2 }, { label: "거의 못 한다", score: 3 } ] },
  { id: "V9", dimension: "spontaneitySuppression", format: "choice", prompt: "나의 에너지 상태를 표현하면?", options: [
    { label: "생동감 넘친다", score: 0 }, { label: "활기 있는 편이다", score: 1 },
    { label: "차분한 편이다", score: 2 }, { label: "에너지를 잘 안 드러낸다", score: 3 } ] },
  { id: "V10", dimension: "spontaneitySuppression", format: "choice", prompt: "하루 중 온전히 '나답게' 자유로운 순간이?", options: [
    { label: "많다", score: 0 }, { label: "어느 정도 있다", score: 1 },
    { label: "드물다", score: 2 }, { label: "거의 없다고 느낀다", score: 3 } ] },
  // ---- 확신부족 (Confidence Lack) — S1-S10 ----
  { id: "S1", dimension: "confidenceLack", format: "slider", prompt: "스스로의 매력에 대한 확신이 부족하다고 느끼는 정도는?", options: { minLabel: "전혀 부족하지 않음(확신 있음)", maxLabel: "매우 부족함" } },
  { id: "S2", dimension: "confidenceLack", format: "choice", prompt: "거울 속 내 모습을 보면?", options: [
    { label: "만족스럽다", score: 0 }, { label: "대체로 괜찮다", score: 1 },
    { label: "아쉬운 점이 먼저 보인다", score: 2 }, { label: "자신감이 잘 안 생긴다", score: 3 } ] },
  { id: "S3", dimension: "confidenceLack", format: "choice", prompt: "다른 사람의 반응(호감, 관심 등)이 없으면?", options: [
    { label: "내 매력과 무관하다고 느낀다", score: 0 }, { label: "크게 신경 안 쓴다", score: 1 },
    { label: "스스로를 의심하게 된다", score: 2 }, { label: "내가 매력 없나 싶어진다", score: 3 } ] },
  { id: "S4", dimension: "confidenceLack", format: "choice", prompt: "매력적인 사람을 보면?", options: [
    { label: "자극이 되고 좋다", score: 0 }, { label: "멋있다고 생각한다", score: 1 },
    { label: "나와 비교하게 된다", score: 2 }, { label: "위축되고 작아지는 느낌이다", score: 3 } ] },
  { id: "S5", dimension: "confidenceLack", format: "choice", prompt: "누군가 나에게 호감을 보이면?", options: [
    { label: "자연스럽게 받아들인다", score: 0 }, { label: "기분 좋게 받아들인다", score: 1 },
    { label: "의심하거나 의아해한다", score: 2 }, { label: "믿기지 않아 부정하게 된다", score: 3 } ] },
  { id: "S6", dimension: "confidenceLack", format: "choice", prompt: "나의 매력을 스스로 표현해야 한다면?", options: [
    { label: "쉽게 말할 수 있다", score: 0 }, { label: "어느 정도 말할 수 있다", score: 1 },
    { label: "쑥스럽고 어렵다", score: 2 }, { label: "거의 못 하겠다", score: 3 } ] },
  { id: "S7", dimension: "confidenceLack", format: "choice", prompt: "연애나 관계에서 나의 매력에 대한 확신은?", options: [
    { label: "확고하다", score: 0 }, { label: "어느 정도 있다", score: 1 },
    { label: "자주 흔들린다", score: 2 }, { label: "거의 없다", score: 3 } ] },
  { id: "S8", dimension: "confidenceLack", format: "choice", prompt: "셀카나 내 모습이 담긴 사진을 보면?", options: [
    { label: "만족스럽게 본다", score: 0 }, { label: "무난하게 본다", score: 1 },
    { label: "부족한 점부터 찾는다", score: 2 }, { label: "잘 못 본다", score: 3 } ] },
  { id: "S9", dimension: "confidenceLack", format: "choice", prompt: "매력적이라는 말을 들으면 속으로?", options: [
    { label: "그렇게 느낀다", score: 0 }, { label: "고맙지만 그런가 싶다", score: 1 },
    { label: "믿기지 않는다", score: 2 }, { label: "빈말이라고 생각한다", score: 3 } ] },
  { id: "S10", dimension: "confidenceLack", format: "choice", prompt: "있는 그대로의 나에 대해?", options: [
    { label: "매력 있다고 느낀다", score: 0 }, { label: "괜찮다고 느낀다", score: 1 },
    { label: "부족하다고 느낄 때가 많다", score: 2 }, { label: "매력을 잘 못 느낀다", score: 3 } ] },
];

export const MODULE11_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  expressionSuppression: 10,
  spontaneitySuppression: 10,
  confidenceLack: 10,
};

export const MODULE11_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  expressionSuppression: { high: "표현억제", low: "자연스러운 표현" },
  spontaneitySuppression: { high: "즉흥성억제", low: "자유로운 생동감" },
  confidenceLack: { high: "확신부족", low: "매력에 대한 확신" },
};

export const MODULE11_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "자연스러운 표현형", hook: "나를 드러내는 데 있어 억제도, 확신 부족도 뚜렷하지 않은 비교적 자유로운 상태입니다." },
  expressionSuppression: { title: "표현억제형", hook: "사람들 앞에서 나를 자유롭게 드러내는 게 유독 어렵게 느껴집니다." },
  spontaneitySuppression: { title: "즉흥성억제형", hook: "몸으로 감정을 표현하거나 즉흥적으로 움직이는 게 많이 억제되어 있습니다." },
  confidenceLack: { title: "확신부족형", hook: "스스로의 매력에 대한 확신이 부족해, 좋은 반응을 받아도 잘 믿지 못합니다." },
  "expressionSuppression+spontaneitySuppression": { title: "억눌린 생동감형", hook: "표현도 즉흥성도 함께 억제되어 있어, 자기다운 생동감을 드러낼 틈이 적습니다." },
  "expressionSuppression+confidenceLack": { title: "위축된 자기표현형", hook: "나를 드러내는 것도 어렵고, 스스로에 대한 확신도 부족해 이중으로 위축되어 있습니다." },
  "spontaneitySuppression+confidenceLack": { title: "조심스러운 확신부족형", hook: "즉흥적인 생동감은 억눌려 있고, 스스로의 매력에 대한 믿음도 흔들립니다." },
  "expressionSuppression+spontaneitySuppression+confidenceLack": { title: "억눌린 본능형", hook: "표현, 즉흥성, 자기확신 세 가지 모두가 억제된, 나다움을 드러내기 어려운 상태입니다." },
};
