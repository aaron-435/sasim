/**
 * lib/module5Execution.ts
 * ------------------------------------------------------------------
 * Module 5 — 실행력 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈5_실행력_30문항_전문가검토용.xlsx). 3차원: 완벽주의(P1-P10) /
 * 회피(T1-T10) / 선택마비(D1-D10). P4/T4/D4는 극단형(0/3) 문항.
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE5_QUESTIONS: ModuleQuestion[] = [
  // ---- 완벽주의 (Perfectionism) — P1-P10 ----
  { id: "P1", dimension: "perfectionism", format: "slider", prompt: "완벽하지 않을 것 같으면 시작 자체를 미루는 정도는?", options: { minLabel: "전혀 미루지 않음", maxLabel: "확신 없인 항상 미룸" } },
  { id: "P2", dimension: "perfectionism", format: "choice", prompt: "결과물에 대해 확신이 안 서면?", options: [
    { label: "일단 해보고 수정한다", score: 0 }, { label: "하면서 다듬어간다", score: 1 },
    { label: "완벽한 계획이 설 때까지 기다린다", score: 2 }, { label: "확신 없인 아예 시작을 못 한다", score: 3 } ] },
  { id: "P3", dimension: "perfectionism", format: "choice", prompt: "제출·발표 전 마지막까지?", options: [
    { label: "여유롭게 마무리한다", score: 0 }, { label: "막판에 조금 다듬는다", score: 1 },
    { label: "계속 고치느라 마감에 쫓긴다", score: 2 }, { label: "만족스럽지 않아 끝까지 손을 못 뗀다", score: 3 } ] },
  { id: "P4", dimension: "perfectionism", format: "choice", prompt: "완벽하게 할 자신이 없으면, 차라리 시작을 안 하는 쪽을 택한다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "P5", dimension: "perfectionism", format: "choice", prompt: "다른 사람에게 미완성 결과물을 보여줘야 할 때?", options: [
    { label: "편하게 보여준다", score: 0 }, { label: "약간 부담스럽지만 보여준다", score: 1 },
    { label: "부족한 부분이 계속 신경 쓰인다", score: 2 }, { label: "보여주느니 차라리 숨기고 싶다", score: 3 } ] },
  { id: "P6", dimension: "perfectionism", format: "choice", prompt: "계획을 세울 때?", options: [
    { label: "대략적으로 세우고 바로 움직인다", score: 0 }, { label: "적당히 구체적으로 세운다", score: 1 },
    { label: "모든 변수를 다 따지고서야 움직인다", score: 2 }, { label: "완벽한 계획이 아니면 아예 못 움직인다", score: 3 } ] },
  { id: "P7", dimension: "perfectionism", format: "choice", prompt: "실수할 가능성이 있는 일은?", options: [
    { label: "그냥 해본다", score: 0 }, { label: "조심하며 진행한다", score: 1 },
    { label: "여러 번 검토 후 진행한다", score: 2 }, { label: "실수 안 한다는 확신 없인 미룬다", score: 3 } ] },
  { id: "P8", dimension: "perfectionism", format: "choice", prompt: "마감이 다가오는데 결과물이 마음에 안 들면?", options: [
    { label: "일단 마감을 지킨다", score: 0 }, { label: "조금 더 다듬고 낸다", score: 1 },
    { label: "마감을 살짝 넘겨서라도 고친다", score: 2 }, { label: "늦더라도 끝까지 완벽하게 끝낸다", score: 3 } ] },
  { id: "P9", dimension: "perfectionism", format: "choice", prompt: "'이 정도면 됐다'는 기준은?", options: [
    { label: "비교적 쉽게 만족한다", score: 0 }, { label: "적당한 선에서 만족한다", score: 1 },
    { label: "좀처럼 만족하기 어렵다", score: 2 }, { label: "늘 부족하다고 느껴서 손을 못 뗀다", score: 3 } ] },
  { id: "P10", dimension: "perfectionism", format: "choice", prompt: "새로운 도전 앞에서?", options: [
    { label: "일단 부딪혀본다", score: 0 }, { label: "준비하고 시작한다", score: 1 },
    { label: "완벽히 준비될 때까지 미룬다", score: 2 }, { label: "실패할 바엔 안 하는 게 낫다고 생각한다", score: 3 } ] },
  // ---- 회피 (Avoidance) — T1-T10 ----
  { id: "T1", dimension: "avoidance", format: "choice", prompt: "하기 싫은 일이 생기면?", options: [
    { label: "바로 처리해버린다", score: 0 }, { label: "미루다가도 결국 한다", score: 1 },
    { label: "최대한 뒤로 미룬다", score: 2 }, { label: "닥칠 때까지 손도 안 댄다", score: 3 } ] },
  { id: "T2", dimension: "avoidance", format: "slider", prompt: "마감 직전에야 겨우 시작하는 빈도는?", options: { minLabel: "전혀 그렇지 않음(항상 일찍 시작)", maxLabel: "거의 항상 마감 직전에 시작" } },
  { id: "T3", dimension: "avoidance", format: "choice", prompt: "하기 싫은 일을 앞두면?", options: [
    { label: "빨리 끝내고 편해지고 싶다", score: 0 }, { label: "부담되지만 시작한다", score: 1 },
    { label: "다른 일부터 먼저 하게 된다", score: 2 }, { label: "청소·정리 등 딴짓부터 하게 된다", score: 3 } ] },
  { id: "T4", dimension: "avoidance", format: "choice", prompt: "하기 싫은 일은, 마감이 코앞에 닥쳐야만 겨우 손이 움직인다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "T5", dimension: "avoidance", format: "choice", prompt: "할 일 목록을 보면?", options: [
    { label: "우선순위대로 처리한다", score: 0 }, { label: "대체로 처리한다", score: 1 },
    { label: "쉬운 것부터 처리하고 어려운 건 미룬다", score: 2 }, { label: "보기만 해도 하기 싫어져서 덮어버린다", score: 3 } ] },
  { id: "T6", dimension: "avoidance", format: "choice", prompt: "미루고 있는 일이 생각나면?", options: [
    { label: "바로 처리하러 간다", score: 0 }, { label: "조금 있다 하자고 생각한다", score: 1 },
    { label: "애써 생각을 안 하려 한다", score: 2 }, { label: "불안한데도 계속 회피하게 된다", score: 3 } ] },
  { id: "T7", dimension: "avoidance", format: "choice", prompt: "반복적으로 미루는 일이?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "꽤 있다", score: 2 }, { label: "항상 같은 일들을 미루고 있다", score: 3 } ] },
  { id: "T8", dimension: "avoidance", format: "choice", prompt: "미루다가 마감에 쫓기면?", options: [
    { label: "미리 안 한 걸 후회하고 다음엔 안 그런다", score: 0 }, { label: "후회하지만 또 반복한다", score: 1 },
    { label: "이 패턴이 이미 익숙하다", score: 2 }, { label: "매번 이러면서도 못 고친다는 자괴감이 든다", score: 3 } ] },
  { id: "T9", dimension: "avoidance", format: "choice", prompt: "일을 시작하기 전 마음은?", options: [
    { label: "가벼운 마음으로 시작한다", score: 0 }, { label: "약간의 부담을 안고 시작한다", score: 1 },
    { label: "시작하는 것 자체가 큰 산처럼 느껴진다", score: 2 }, { label: "생각만 해도 피하고 싶어진다", score: 3 } ] },
  { id: "T10", dimension: "avoidance", format: "choice", prompt: "미뤄둔 일들이 쌓이면?", options: [
    { label: "차근차근 정리한다", score: 0 }, { label: "조급해지지만 처리한다", score: 1 },
    { label: "압도당해서 더 손을 놓게 된다", score: 2 }, { label: "아예 외면해버린다", score: 3 } ] },
  // ---- 선택마비 (Decision Paralysis) — D1-D10 ----
  { id: "D1", dimension: "decisionParalysis", format: "choice", prompt: "선택지가 여러 개일 때?", options: [
    { label: "빠르게 하나를 고른다", score: 0 }, { label: "조금 고민하고 고른다", score: 1 },
    { label: "한참을 비교하다 고른다", score: 2 }, { label: "끝까지 못 고르고 남에게 맡긴다", score: 3 } ] },
  { id: "D2", dimension: "decisionParalysis", format: "slider", prompt: "결정을 내려야 할 때 머릿속이 복잡해지는 정도는?", options: { minLabel: "전혀 복잡하지 않음", maxLabel: "매우 복잡해짐(생각이 뒤엉킴)" } },
  { id: "D3", dimension: "decisionParalysis", format: "choice", prompt: "메뉴판을 보면?", options: [
    { label: "바로 정한다", score: 0 }, { label: "조금 고민하고 정한다", score: 1 },
    { label: "한참을 들여다본다", score: 2 }, { label: "결국 옆 사람에게 골라달라고 한다", score: 3 } ] },
  { id: "D4", dimension: "decisionParalysis", format: "choice", prompt: "사소한 결정 하나에도, 머릿속으로 모든 경우의 수를 다 따져봐야 마음이 편하다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "D5", dimension: "decisionParalysis", format: "choice", prompt: "결정을 내린 후에는?", options: [
    { label: "더 이상 생각 안 한다", score: 0 }, { label: "가끔 돌아본다", score: 1 },
    { label: "다른 선택이 나았을까 자주 생각한다", score: 2 }, { label: "계속 후회하며 곱씹는다", score: 3 } ] },
  { id: "D6", dimension: "decisionParalysis", format: "choice", prompt: "중요한 결정 앞에서는?", options: [
    { label: "스스로 판단하고 결정한다", score: 0 }, { label: "주변에 물어보고 결정한다", score: 1 },
    { label: "결정을 남에게 미루고 싶어진다", score: 2 }, { label: "누군가 대신 정해주길 간절히 바란다", score: 3 } ] },
  { id: "D7", dimension: "decisionParalysis", format: "choice", prompt: "정보를 찾을 때?", options: [
    { label: "적당한 선에서 정리하고 결정한다", score: 0 }, { label: "조금 더 찾아보고 결정한다", score: 1 },
    { label: "끝없이 더 찾아보게 된다", score: 2 }, { label: "정보가 너무 많아 오히려 결정을 못 한다", score: 3 } ] },
  { id: "D8", dimension: "decisionParalysis", format: "choice", prompt: "결정을 미루면?", options: [
    { label: "여유가 생겨 좋다", score: 0 }, { label: "괜찮다", score: 1 },
    { label: "오히려 더 불안해진다", score: 2 }, { label: "선택지 자체가 스트레스가 된다", score: 3 } ] },
  { id: "D9", dimension: "decisionParalysis", format: "choice", prompt: "'잘못된 선택을 하면 어쩌지'라는 생각은?", options: [
    { label: "거의 안 든다", score: 0 }, { label: "가끔 든다", score: 1 },
    { label: "결정할 때마다 든다", score: 2 }, { label: "그 생각 때문에 아예 결정을 못 할 때가 있다", score: 3 } ] },
  { id: "D10", dimension: "decisionParalysis", format: "choice", prompt: "인생의 큰 결정(진로, 이사 등)을 앞두면?", options: [
    { label: "때가 되면 자연스럽게 정해질 거라 믿는다", score: 0 }, { label: "고민하며 차근차근 정한다", score: 1 },
    { label: "오랫동안 정하지 못하고 미룬다", score: 2 }, { label: "결정 자체가 두려워서 회피하게 된다", score: 3 } ] },
];

export const MODULE5_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  perfectionism: 10,
  avoidance: 10,
  decisionParalysis: 10,
};

export const MODULE5_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  perfectionism: { high: "완벽주의", low: "일단 시작하는 유연함" },
  avoidance: { high: "회피", low: "즉시 실행력" },
  decisionParalysis: { high: "선택마비", low: "결정의 명료함" },
};

export const MODULE5_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "안정 실행형", hook: "완벽주의·회피·선택마비 어느 쪽도 뚜렷하지 않은, 비교적 실행이 원활한 상태입니다." },
  perfectionism: { title: "완벽주의형", hook: "확신이 서지 않으면 시작 자체를 미루는, 높은 기준이 발목을 잡는 패턴입니다." },
  avoidance: { title: "회피형", hook: "하기 싫은 일은 마감 직전까지 손을 대지 않는 패턴입니다." },
  decisionParalysis: { title: "선택마비형", hook: "선택지 앞에서 머릿속이 복잡해지고, 결정을 내리는 것 자체가 큰 부담입니다." },
  "perfectionism+avoidance": { title: "완벽주의적 회피형", hook: "완벽하지 않을 바엔 시작을 미루는, 회피와 완벽주의가 서로를 강화하는 패턴입니다." },
  "perfectionism+decisionParalysis": { title: "정지된 완벽주의형", hook: "완벽한 선택을 하려다 결정 자체를 내리지 못하는 패턴입니다." },
  "avoidance+decisionParalysis": { title: "미루는 우유부단형", hook: "결정도 실행도 뒤로 미루며, 둘 다 부담스럽게 느끼는 패턴입니다." },
  "perfectionism+avoidance+decisionParalysis": { title: "복합 정체형", hook: "완벽주의, 회피, 선택마비가 모두 강하게 얽혀 실행이 크게 막혀 있는 상태입니다." },
};
