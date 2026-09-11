/**
 * lib/module8Sleep.ts
 * ------------------------------------------------------------------
 * Module 8 — 수면/무의식 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈8_수면_30문항_전문가검토용.xlsx). 3차원(Pre-Sleep Arousal Scale 기반 +
 * 자체 추가 축): 인지적각성(C1-C10) / 신체적각성(S1-S10) / 무의식누수(D1-D10).
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE8_QUESTIONS: ModuleQuestion[] = [
  // ---- 인지적각성 (Cognitive Arousal) — C1-C10 ----
  { id: "C1", dimension: "cognitiveArousal", format: "slider", prompt: "잠자리에 누웠을 때 생각이 꼬리를 무는 정도는?", options: { minLabel: "전혀 그렇지 않음(머릿속이 조용함)", maxLabel: "매우 그러함(생각이 멈추지 않음)" } },
  { id: "C2", dimension: "cognitiveArousal", format: "choice", prompt: "잠들기 전 머릿속은?", options: [
    { label: "비교적 조용하다", score: 0 }, { label: "가끔 생각이 스친다", score: 1 },
    { label: "이런저런 생각이 계속 떠오른다", score: 2 }, { label: "생각을 멈출 수가 없다", score: 3 } ] },
  { id: "C3", dimension: "cognitiveArousal", format: "choice", prompt: "오늘 있었던 일을 잠자리에서?", options: [
    { label: "거의 안 떠올린다", score: 0 }, { label: "가볍게 떠올린다", score: 1 },
    { label: "자꾸 곱씹게 된다", score: 2 }, { label: "실수했던 장면이 계속 재생된다", score: 3 } ] },
  { id: "C4", dimension: "cognitiveArousal", format: "choice", prompt: "내일 할 일이나 걱정거리가?", options: [
    { label: "잠들기 전엔 생각 안 한다", score: 0 }, { label: "가끔 스친다", score: 1 },
    { label: "자꾸 계획을 세우게 된다", score: 2 }, { label: "걱정 때문에 잠이 달아난다", score: 3 } ] },
  { id: "C5", dimension: "cognitiveArousal", format: "choice", prompt: "해결 안 된 문제가 있으면?", options: [
    { label: "자기 전엔 내려놓는다", score: 0 }, { label: "살짝 신경 쓰인다", score: 1 },
    { label: "누워서도 계속 고민한다", score: 2 }, { label: "그 생각 때문에 뜬눈으로 지새운 적 있다", score: 3 } ] },
  { id: "C6", dimension: "cognitiveArousal", format: "choice", prompt: "잠들기까지 걸리는 시간은?", options: [
    { label: "눕자마자 잔다", score: 0 }, { label: "10~20분 정도", score: 1 },
    { label: "30분 이상 걸린다", score: 2 }, { label: "1시간 넘게 뒤척일 때가 많다", score: 3 } ] },
  { id: "C7", dimension: "cognitiveArousal", format: "choice", prompt: "갑자기 아이디어나 걱정이 떠오르면?", options: [
    { label: "다음 날 생각하기로 하고 넘긴다", score: 0 }, { label: "메모하고 다시 눕는다", score: 1 },
    { label: "머릿속에서 계속 확장시킨다", score: 2 }, { label: "결국 일어나서 처리해야 잠이 온다", score: 3 } ] },
  { id: "C8", dimension: "cognitiveArousal", format: "choice", prompt: "과거의 후회되는 일들이 잠들기 전?", options: [
    { label: "거의 안 떠오른다", score: 0 }, { label: "가끔 떠오른다", score: 1 },
    { label: "자주 떠오른다", score: 2 }, { label: "오래된 일까지 소환돼서 괴롭다", score: 3 } ] },
  { id: "C9", dimension: "cognitiveArousal", format: "choice", prompt: "대화나 갈등 상황을 되짚어보는 게?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "했어야 할 말을 계속 시뮬레이션한다", score: 3 } ] },
  { id: "C10", dimension: "cognitiveArousal", format: "choice", prompt: "머릿속 생각을 끄고 싶을 때?", options: [
    { label: "쉽게 꺼진다", score: 0 }, { label: "어느 정도 조절된다", score: 1 },
    { label: "잘 안 꺼진다", score: 2 }, { label: "생각의 스위치가 없는 것 같다", score: 3 } ] },
  // ---- 신체적각성 (Somatic Arousal) — S1-S10 ----
  { id: "S1", dimension: "somaticArousal", format: "slider", prompt: "잠자리에서 몸이 긴장되어 있는 정도는?", options: { minLabel: "전혀 긴장되지 않음(완전히 이완됨)", maxLabel: "매우 긴장됨" } },
  { id: "S2", dimension: "somaticArousal", format: "choice", prompt: "누워도 몸은?", options: [
    { label: "금방 이완된다", score: 0 }, { label: "어느 정도 이완된다", score: 1 },
    { label: "뻣뻣하게 긴장돼 있다", score: 2 }, { label: "쉽게 풀리지 않는다", score: 3 } ] },
  { id: "S3", dimension: "somaticArousal", format: "choice", prompt: "잠들기 전 심장박동은?", options: [
    { label: "차분하다", score: 0 }, { label: "평소와 비슷하다", score: 1 },
    { label: "약간 빠르게 느껴질 때가 있다", score: 2 }, { label: "두근거려서 신경 쓰인다", score: 3 } ] },
  { id: "S4", dimension: "somaticArousal", format: "choice", prompt: "편안한 자세를 찾는 데?", options: [
    { label: "금방 찾는다", score: 0 }, { label: "조금 뒤척이다 찾는다", score: 1 },
    { label: "이리저리 자주 뒤척인다", score: 2 }, { label: "편한 자세가 안 나와서 계속 움직인다", score: 3 } ] },
  { id: "S5", dimension: "somaticArousal", format: "choice", prompt: "손발이나 몸의 감각은?", options: [
    { label: "편안하다", score: 0 }, { label: "가끔 뻐근하다", score: 1 },
    { label: "자주 뻣뻣하거나 저릿하다", score: 2 }, { label: "긴장으로 잠들기 힘들 정도다", score: 3 } ] },
  { id: "S6", dimension: "somaticArousal", format: "choice", prompt: "근육(어깨, 턱 등)이 잠자리에서?", options: [
    { label: "풀려있다", score: 0 }, { label: "약간 뭉쳐있다", score: 1 },
    { label: "꽤 긴장돼 있다", score: 2 }, { label: "이 악물기 등 무의식적 긴장이 있다", score: 3 } ] },
  { id: "S7", dimension: "somaticArousal", format: "choice", prompt: "자다가 몸이 움찔하거나 깨는 경우는?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "거의 매일 있다", score: 3 } ] },
  { id: "S8", dimension: "somaticArousal", format: "choice", prompt: "잠자리에서 호흡은?", options: [
    { label: "편안하고 깊다", score: 0 }, { label: "평소와 비슷하다", score: 1 },
    { label: "얕고 빠를 때가 있다", score: 2 }, { label: "답답하게 느껴질 때가 있다", score: 3 } ] },
  { id: "S9", dimension: "somaticArousal", format: "choice", prompt: "카페인이나 스트레스가 있던 날 밤에는?", options: [
    { label: "잠에 큰 영향 없다", score: 0 }, { label: "약간 영향받는다", score: 1 },
    { label: "몸이 확실히 반응한다", score: 2 }, { label: "뜬눈으로 지새울 정도로 영향받는다", score: 3 } ] },
  { id: "S10", dimension: "somaticArousal", format: "choice", prompt: "잠들기 전 몸을 이완시키려면?", options: [
    { label: "저절로 된다", score: 0 }, { label: "약간의 시간이 필요하다", score: 1 },
    { label: "의식적으로 노력해야 한다", score: 2 }, { label: "노력해도 잘 안 풀린다", score: 3 } ] },
  // ---- 무의식누수 (Subconscious Leak) — D1-D10 ----
  { id: "D1", dimension: "subconsciousLeak", format: "slider", prompt: "기상 직후 몸에 남아있는 피로감의 정도는?", options: { minLabel: "전혀 없음(가뿐함)", maxLabel: "매우 심함(전혀 못 잔 듯함)" } },
  { id: "D2", dimension: "subconsciousLeak", format: "choice", prompt: "꿈을 꾸는 빈도는?", options: [
    { label: "거의 안 꾼다(기억이 없다)", score: 0 }, { label: "가끔 꾼다", score: 1 },
    { label: "자주 꾼다", score: 2 }, { label: "거의 매일 생생하게 꾼다", score: 3 } ] },
  { id: "D3", dimension: "subconsciousLeak", format: "choice", prompt: "꿈의 내용은 주로?", options: [
    { label: "특별한 감정 없이 평범하다", score: 0 }, { label: "가끔 인상 깊다", score: 1 },
    { label: "현실 고민이 반영될 때가 많다", score: 2 }, { label: "쫓기거나 불안한 꿈을 자주 꾼다", score: 3 } ] },
  { id: "D4", dimension: "subconsciousLeak", format: "choice", prompt: "자고 일어났을 때 개운함은?", options: [
    { label: "충분히 개운하다", score: 0 }, { label: "대체로 괜찮다", score: 1 },
    { label: "잔 것 같지 않을 때가 많다", score: 2 }, { label: "오히려 더 피곤할 때가 있다", score: 3 } ] },
  { id: "D5", dimension: "subconsciousLeak", format: "choice", prompt: "낮에 있었던 감정(불안, 걱정 등)이 꿈에?", options: [
    { label: "거의 안 나타난다", score: 0 }, { label: "가끔 반영된다", score: 1 },
    { label: "자주 반영된다", score: 2 }, { label: "낮의 감정이 꿈에서 증폭돼 나타난다", score: 3 } ] },
  { id: "D6", dimension: "subconsciousLeak", format: "choice", prompt: "자다가 중간에 깨는 횟수는?", options: [
    { label: "거의 없다", score: 0 }, { label: "1번 정도", score: 1 },
    { label: "2~3번", score: 2 }, { label: "자주 깨서 수면이 끊긴다", score: 3 } ] },
  { id: "D7", dimension: "subconsciousLeak", format: "choice", prompt: "악몽이나 무서운 꿈을 꾸는 빈도는?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "종종 있다", score: 2 }, { label: "자주 시달릴 정도다", score: 3 } ] },
  { id: "D8", dimension: "subconsciousLeak", format: "choice", prompt: "꿈에서 깨어난 직후 기분은?", options: [
    { label: "대체로 평온하다", score: 0 }, { label: "보통이다", score: 1 },
    { label: "찝찝하거나 불편할 때가 많다", score: 2 }, { label: "현실인지 헷갈릴 정도로 강렬하다", score: 3 } ] },
  { id: "D9", dimension: "subconsciousLeak", format: "choice", prompt: "반복되는 꿈이나 패턴이?", options: [
    { label: "없다", score: 0 }, { label: "가끔 있는 것 같다", score: 1 },
    { label: "몇 가지 반복되는 게 있다", score: 2 }, { label: "같은 상황·장소가 계속 반복된다", score: 3 } ] },
  { id: "D10", dimension: "subconsciousLeak", format: "choice", prompt: "잠에서 깬 직후 몸 상태는?", options: [
    { label: "가뿐하다", score: 0 }, { label: "보통이다", score: 1 },
    { label: "무겁게 느껴진다", score: 2 }, { label: "밤새 뭔가에 시달린 듯 지쳐있다", score: 3 } ] },
];

export const MODULE8_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  cognitiveArousal: 10,
  somaticArousal: 10,
  subconsciousLeak: 10,
};

export const MODULE8_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  cognitiveArousal: { high: "인지적각성", low: "조용한 머릿속" },
  somaticArousal: { high: "신체적각성", low: "이완된 몸" },
  subconsciousLeak: { high: "무의식누수", low: "개운한 아침" },
};

export const MODULE8_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "평온한 수면형", hook: "생각도, 몸도, 무의식도 비교적 편안하게 가라앉는 안정적인 수면 상태입니다." },
  cognitiveArousal: { title: "생각과잉형", hook: "누우면 머릿속 생각이 꼬리를 물어 잠들기까지 시간이 오래 걸립니다." },
  somaticArousal: { title: "몸 긴장형", hook: "머리는 비교적 조용해도, 몸이 좀처럼 이완되지 않아 잠들기 어렵습니다." },
  subconsciousLeak: { title: "무의식 누수형", hook: "낮의 감정이 꿈으로 새어나오고, 자고 일어나도 개운하지 않습니다." },
  "cognitiveArousal+somaticArousal": { title: "몸과 마음 모두 각성형", hook: "생각도 몸도 좀처럼 쉬지 못한 채 잠자리에 드는 상태입니다." },
  "cognitiveArousal+subconsciousLeak": { title: "생각이 꿈까지 이어지는형", hook: "낮의 걱정이 잠들기 전부터 꿈속까지 계속 이어지는 패턴입니다." },
  "somaticArousal+subconsciousLeak": { title: "긴장이 꿈에 새는형", hook: "몸의 긴장이 풀리지 않은 채로 잠들어, 그 여파가 꿈과 아침 컨디션까지 이어집니다." },
  "cognitiveArousal+somaticArousal+subconsciousLeak": { title: "깊은 잠 결핍형", hook: "생각, 몸, 무의식 어느 쪽도 제대로 쉬지 못하는, 회복이 필요한 수면 상태입니다." },
};
