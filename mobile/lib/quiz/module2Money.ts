/**
 * lib/module2Money.ts
 * ------------------------------------------------------------------
 * Module 2 — 돈 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈2_돈_30문항_전문가검토용.xlsx). 3차원: 결핍공포(S1-S10) /
 * 과시욕(G1-G10) / 회피(M1-M10).
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE2_QUESTIONS: ModuleQuestion[] = [
  // ---- 결핍공포 (Scarcity Fear) — S1-S10 ----
  { id: "S1", dimension: "scarcity", format: "slider", prompt: "통장 잔고를 확인할 때 불안한 정도는?", options: { minLabel: "전혀 불안하지 않음", maxLabel: "매우 불안함" } },
  { id: "S2", dimension: "scarcity", format: "choice", prompt: "필요한 만큼 돈이 있어도?", options: [
    { label: "여유롭게 느낀다", score: 0 }, { label: "그럭저럭 안심된다", score: 1 },
    { label: "그래도 부족할까 걱정된다", score: 2 }, { label: "항상 모자란 것 같아 불안하다", score: 3 } ] },
  { id: "S3", dimension: "scarcity", format: "choice", prompt: "돈을 쓸 때 드는 생각은?", options: [
    { label: "필요하면 쓰는 거다", score: 0 }, { label: "적당히 고민하고 쓴다", score: 1 },
    { label: "쓸 때마다 아깝다는 생각이 든다", score: 2 }, { label: "쓰고 나면 죄책감이나 불안이 든다", score: 3 } ] },
  { id: "S4", dimension: "scarcity", format: "choice", prompt: "미래의 경제적 상황을 생각하면?", options: [
    { label: "크게 걱정 안 한다", score: 0 }, { label: "가끔 걱정된다", score: 1 },
    { label: "자주 불안해진다", score: 2 }, { label: "노후·미래 걱정에 잠 못 들 때도 있다", score: 3 } ] },
  { id: "S5", dimension: "scarcity", format: "choice", prompt: "돈이 생기면(보너스, 용돈 등)?", options: [
    { label: "쓰고 싶은 데 편하게 쓴다", score: 0 }, { label: "어느 정도 쓰고 저축한다", score: 1 },
    { label: "거의 다 모아둔다", score: 2 }, { label: "써야 할 곳에도 못 쓰고 쌓아만 둔다", score: 3 } ] },
  { id: "S6", dimension: "scarcity", format: "choice", prompt: "다른 사람이 돈 얘기(연봉, 지출 등)를 하면?", options: [
    { label: "편하게 듣는다", score: 0 }, { label: "약간 신경 쓰인다", score: 1 },
    { label: "내 상황과 비교하며 불안해진다", score: 2 }, { label: "괜히 초조해지고 위축된다", score: 3 } ] },
  { id: "S7", dimension: "scarcity", format: "choice", prompt: "급하게 큰돈이 필요한 상황을 상상하면?", options: [
    { label: "어떻게든 될 거라 생각한다", score: 0 }, { label: "약간 걱정되지만 괜찮다", score: 1 },
    { label: "매우 불안해진다", score: 2 }, { label: "최악의 상황까지 상상하게 된다", score: 3 } ] },
  { id: "S8", dimension: "scarcity", format: "choice", prompt: "물건을 살 때(꼭 필요한 것이라도)?", options: [
    { label: "필요하면 산다", score: 0 }, { label: "가격을 한 번 정도 비교해본다", score: 1 },
    { label: "여러 번 고민하다 산다", score: 2 }, { label: "싸다고 확신이 들어야 겨우 산다", score: 3 } ] },
  { id: "S9", dimension: "scarcity", format: "choice", prompt: "돈에 대한 꿈이나 상상을 하면?", options: [
    { label: "여유로운 상상을 한다", score: 0 }, { label: "별생각 없다", score: 1 },
    { label: "돈이 없어지는 상상을 할 때가 있다", score: 2 }, { label: "파산하거나 빈털터리가 되는 상상을 할 때가 있다", score: 3 } ] },
  { id: "S10", dimension: "scarcity", format: "choice", prompt: "저축이나 잔고가 줄어들면?", options: [
    { label: "자연스러운 일이라 여긴다", score: 0 }, { label: "조금 신경 쓰인다", score: 1 },
    { label: "바로 다시 채우고 싶어진다", score: 2 }, { label: "극도로 초조해진다", score: 3 } ] },
  // ---- 과시욕 (Ostentation) — G1-G10 ----
  { id: "G1", dimension: "ostentation", format: "choice", prompt: "물건을 살 때 브랜드/가격대가?", options: [
    { label: "크게 중요하지 않다", score: 0 }, { label: "약간 고려한다", score: 1 },
    { label: "남들에게 보이는 게 신경 쓰인다", score: 2 }, { label: "브랜드가 곧 나를 증명한다고 느낀다", score: 3 } ] },
  { id: "G2", dimension: "ostentation", format: "choice", prompt: "SNS에 소비(여행, 물건 등)를 올릴 때?", options: [
    { label: "그냥 기록용이다", score: 0 }, { label: "약간 보여주고 싶은 마음도 있다", score: 1 },
    { label: "반응이 신경 쓰인다", score: 2 }, { label: "인정받는 느낌이 꼭 필요하다", score: 3 } ] },
  { id: "G3", dimension: "ostentation", format: "choice", prompt: "남들보다 못 사는 것 같으면?", options: [
    { label: "별 상관 없다", score: 0 }, { label: "살짝 신경 쓰인다", score: 1 },
    { label: "자존심이 상한다", score: 2 }, { label: "어떻게든 따라잡아야 할 것 같다", score: 3 } ] },
  { id: "G4", dimension: "ostentation", format: "choice", prompt: "돈을 쓸 때 나의 가치가?", options: [
    { label: "돈과 무관하다고 느낀다", score: 0 }, { label: "약간 관련 있다고 느낀다", score: 1 },
    { label: "어느 정도 증명되는 것 같다", score: 2 }, { label: "돈 쓰는 만큼 내 가치가 결정된다고 느낀다", score: 3 } ] },
  { id: "G5", dimension: "ostentation", format: "slider", prompt: "남들에게 잘살아 보이고 싶은 마음의 정도는?", options: { minLabel: "전혀 없음", maxLabel: "매우 강함" } },
  { id: "G6", dimension: "ostentation", format: "choice", prompt: "무리해서라도 좋은 걸 사야 할 때?", options: [
    { label: "예산 안에서만 산다", score: 0 }, { label: "가끔 무리한다", score: 1 },
    { label: "자주 무리해서 산다", score: 2 }, { label: "할부나 빚을 내서라도 산다", score: 3 } ] },
  { id: "G7", dimension: "ostentation", format: "choice", prompt: "선물이나 한턱을 낼 때?", options: [
    { label: "부담 없는 선에서 한다", score: 0 }, { label: "기분 낼 정도로 한다", score: 1 },
    { label: "능력 이상으로 하게 된다", score: 2 }, { label: "과하게 써서 있어 보이고 싶어진다", score: 3 } ] },
  { id: "G8", dimension: "ostentation", format: "choice", prompt: "재테크나 투자 얘기가 나오면?", options: [
    { label: "담담하게 듣는다", score: 0 }, { label: "관심은 있다", score: 1 },
    { label: "남들보다 뒤처질까 조급해진다", score: 2 }, { label: "자랑할 만한 성과가 있어야 할 것 같다", score: 3 } ] },
  { id: "G9", dimension: "ostentation", format: "choice", prompt: "소비 후 만족감은?", options: [
    { label: "물건 자체로 만족한다", score: 0 }, { label: "대체로 만족한다", score: 1 },
    { label: "남들 반응이 있어야 진짜 만족된다", score: 2 }, { label: "과시가 안 되면 허무하다", score: 3 } ] },
  { id: "G10", dimension: "ostentation", format: "choice", prompt: "돈을 많이 벌고 싶은 이유는?", options: [
    { label: "내가 원하는 삶을 위해서다", score: 0 }, { label: "안정과 자유를 위해서다", score: 1 },
    { label: "남들에게 인정받고 싶은 마음도 있다", score: 2 }, { label: "무시당하지 않기 위해서다", score: 3 } ] },
  // ---- 회피 (Avoidance) — M1-M10 ----
  { id: "M1", dimension: "avoidance", format: "choice", prompt: "통장 정리나 지출 내역 확인은?", options: [
    { label: "정기적으로 한다", score: 0 }, { label: "가끔 한다", score: 1 },
    { label: "거의 안 본다", score: 2 }, { label: "보는 것 자체가 두렵다", score: 3 } ] },
  { id: "M2", dimension: "avoidance", format: "choice", prompt: "연봉 협상이나 돈 얘기를 해야 할 때?", options: [
    { label: "편하게 이야기한다", score: 0 }, { label: "약간 어색하지만 한다", score: 1 },
    { label: "최대한 피하고 싶다", score: 2 }, { label: "입도 뻥끗 못 한다", score: 3 } ] },
  { id: "M3", dimension: "avoidance", format: "choice", prompt: "돈 관련 서류(세금, 계약서 등)를 처리할 때?", options: [
    { label: "바로바로 처리한다", score: 0 }, { label: "미루다가 결국 한다", score: 1 },
    { label: "최대한 미룬다", score: 2 }, { label: "누군가 대신해주길 바란다", score: 3 } ] },
  { id: "M4", dimension: "avoidance", format: "choice", prompt: "내가 돈을 많이 벌게 된다면?", options: [
    { label: "당연히 좋은 일이라 느낀다", score: 0 }, { label: "좋지만 약간 낯설다", score: 1 },
    { label: "괜히 부담스럽다", score: 2 }, { label: "죄책감이나 불편함이 든다", score: 3 } ] },
  { id: "M5", dimension: "avoidance", format: "choice", prompt: "돈 관리(가계부, 예산 등)에 대해?", options: [
    { label: "체계적으로 관리한다", score: 0 }, { label: "대략적으로 안다", score: 1 },
    { label: "거의 파악을 안 한다", score: 2 }, { label: "의도적으로 안 보려고 한다", score: 3 } ] },
  { id: "M6", dimension: "avoidance", format: "choice", prompt: "주변에서 돈을 빌려달라 하거나 나눠 쓰자고 하면?", options: [
    { label: "상황 봐서 정한다", score: 0 }, { label: "부담되지만 도와준다", score: 1 },
    { label: "거절을 잘 못 해서 손해를 본다", score: 2 }, { label: "내가 손해 보더라도 맞춰준다", score: 3 } ] },
  { id: "M7", dimension: "avoidance", format: "choice", prompt: "투자나 재테크를 시작하려 하면?", options: [
    { label: "적극적으로 알아본다", score: 0 }, { label: "관심 있게 알아본다", score: 1 },
    { label: "복잡해서 계속 미룬다", score: 2 }, { label: "아예 손도 못 대고 있다", score: 3 } ] },
  { id: "M8", dimension: "avoidance", format: "slider", prompt: "돈 문제를 마주하는 게 부담스러운 정도는?", options: { minLabel: "전혀 부담 없음", maxLabel: "매우 부담스러움" } },
  { id: "M9", dimension: "avoidance", format: "choice", prompt: "내가 성공해서 돈을 많이 벌면 주변 사람들이?", options: [
    { label: "함께 기뻐해줄 거라 믿는다", score: 0 }, { label: "대체로 좋아할 거라 생각한다", score: 1 },
    { label: "질투하거나 멀어질까 걱정된다", score: 2 }, { label: "관계가 불편해질까 봐 성공을 주저하게 된다", score: 3 } ] },
  { id: "M10", dimension: "avoidance", format: "choice", prompt: "스스로 돈을 벌고 다루는 능력에 대해?", options: [
    { label: "충분히 잘 해낼 수 있다고 믿는다", score: 0 }, { label: "어느 정도 자신 있다", score: 1 },
    { label: "잘 모르겠고 자신 없다", score: 2 }, { label: "나는 돈 관리에 소질이 없다고 느낀다", score: 3 } ] },
];

export const MODULE2_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  scarcity: 10,
  ostentation: 10,
  avoidance: 10,
};

export const MODULE2_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  scarcity: { high: "결핍공포", low: "경제적 안정감" },
  ostentation: { high: "과시욕", low: "내적 기준" },
  avoidance: { high: "회피", low: "돈 문제 직면 능력" },
};

export const MODULE2_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "균형형", hook: "돈에 대해 비교적 안정적이고 균형 잡힌 태도를 갖고 있습니다." },
  scarcity: { title: "결핍공포형", hook: "충분히 있어도 늘 부족하다고 느끼며, 돈이 사라질 것에 대한 불안이 큽니다." },
  ostentation: { title: "과시형", hook: "돈을 자기 가치를 증명하는 수단으로 여기고, 남에게 보이는 모습에 민감합니다." },
  avoidance: { title: "회피형", hook: "돈 문제를 마주하는 것 자체가 부담스러워 확인과 처리를 계속 미룹니다." },
  "scarcity+ostentation": { title: "불안한 과시형", hook: "부족함에 대한 불안을 과시적 소비로 덮으려는 패턴입니다." },
  "scarcity+avoidance": { title: "불안 회피형", hook: "돈에 대한 불안이 크지만, 그 불안을 마주하기보다 회피하는 쪽을 택합니다." },
  "ostentation+avoidance": { title: "겉과 속이 다른 형", hook: "보여지는 모습에는 신경 쓰지만, 실제 재정 관리는 회피하는 패턴입니다." },
  "scarcity+ostentation+avoidance": { title: "복합형", hook: "결핍에 대한 불안, 과시 욕구, 회피가 모두 강하게 얽혀 있는 패턴입니다." },
};
