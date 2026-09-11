/**
 * lib/module10Focus.ts
 * ------------------------------------------------------------------
 * Module 10 — 몰입/산만함 패턴 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈10_몰입_30문항_전문가검토용.xlsx). 3차원(주의 조절 스펙트럼, 임상 진단
 * 목적 아님): 산만함(D1-D10) / 과집중(H1-H10) / 충동성(I1-I10). 모든 문항이
 * 4지선다 또는 극단형(0/3)이며, 슬라이더 문항은 없다.
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE10_QUESTIONS: ModuleQuestion[] = [
  // ---- 산만함 (Distractibility) — D1-D10 ----
  { id: "D1", dimension: "distractibility", format: "choice", prompt: "일하다가?", options: [
    { label: "끝까지 집중해서 마친다", score: 0 }, { label: "가끔 딴생각이 든다", score: 1 },
    { label: "자주 다른 일이 눈에 들어온다", score: 2 }, { label: "금방 다른 걸 하고 있다", score: 3 } ] },
  { id: "D2", dimension: "distractibility", format: "choice", prompt: "한 가지 일을 하다가도, 눈에 보이는 다른 자극(알림, 소리 등)에 바로 정신이 팔린다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "D3", dimension: "distractibility", format: "choice", prompt: "대화 중에?", options: [
    { label: "끝까지 집중해서 듣는다", score: 0 }, { label: "대체로 집중한다", score: 1 },
    { label: "중간에 딴생각이 든다", score: 2 }, { label: "놓친 부분을 다시 물어볼 때가 많다", score: 3 } ] },
  { id: "D4", dimension: "distractibility", format: "choice", prompt: "책상이나 작업 공간이?", options: [
    { label: "정리된 상태를 유지한다", score: 0 }, { label: "적당히 정리한다", score: 1 },
    { label: "금방 어질러진다", score: 2 }, { label: "여러 일을 벌여놓고 못 치운다", score: 3 } ] },
  { id: "D5", dimension: "distractibility", format: "choice", prompt: "하나의 일을 끝내기 전에, 다른 흥미로운 일이 생기면 바로 그쪽으로 넘어가 버린다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "D6", dimension: "distractibility", format: "choice", prompt: "지루한 일을 할 때?", options: [
    { label: "꾹 참고 끝낸다", score: 0 }, { label: "버티면서 한다", score: 1 },
    { label: "자꾸 다른 생각이 든다", score: 2 }, { label: "도저히 집중이 안 된다", score: 3 } ] },
  { id: "D7", dimension: "distractibility", format: "choice", prompt: "물건(열쇠, 지갑 등)을 어디 뒀는지?", options: [
    { label: "거의 안 잊는다", score: 0 }, { label: "가끔 헷갈린다", score: 1 },
    { label: "자주 못 찾는다", score: 2 }, { label: "매번 찾아 헤맨다", score: 3 } ] },
  { id: "D8", dimension: "distractibility", format: "choice", prompt: "여러 창을 켜놓고 이것저것 왔다갔다 하다 보면, 원래 뭘 하려고 했는지 잊어버릴 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "D9", dimension: "distractibility", format: "choice", prompt: "계획을 세워도?", options: [
    { label: "그대로 실행한다", score: 0 }, { label: "대체로 따른다", score: 1 },
    { label: "금방 흐트러진다", score: 2 }, { label: "계획 자체를 까먹을 때가 많다", score: 3 } ] },
  { id: "D10", dimension: "distractibility", format: "choice", prompt: "지금 하는 일과 관련 없는 생각이?", options: [
    { label: "거의 안 든다", score: 0 }, { label: "가끔 든다", score: 1 },
    { label: "자주 끼어든다", score: 2 }, { label: "끊임없이 떠올라 방해된다", score: 3 } ] },
  // ---- 과집중 (Hyperfocus) — H1-H10 ----
  { id: "H1", dimension: "hyperfocus", format: "choice", prompt: "관심 있는 일을 하면?", options: [
    { label: "적당히 몰입한다", score: 0 }, { label: "꽤 집중한다", score: 1 },
    { label: "시간 가는 줄 모른다", score: 2 }, { label: "주변이 하나도 안 들릴 정도로 빠져든다", score: 3 } ] },
  { id: "H2", dimension: "hyperfocus", format: "choice", prompt: "좋아하는 일에 빠지면, 밥 먹는 것도 잊을 때가 있다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "H3", dimension: "hyperfocus", format: "choice", prompt: "몰입했다가 빠져나오면?", options: [
    { label: "자연스럽게 전환된다", score: 0 }, { label: "약간 시간이 걸린다", score: 1 },
    { label: "현실 감각을 되찾는 데 시간이 걸린다", score: 2 }, { label: "누가 불러야 겨우 정신을 차린다", score: 3 } ] },
  { id: "H4", dimension: "hyperfocus", format: "choice", prompt: "흥미로운 주제를 파고들 때?", options: [
    { label: "적당한 선에서 멈춘다", score: 0 }, { label: "꽤 깊이 알아본다", score: 1 },
    { label: "밤새 파고들 때가 있다", score: 2 }, { label: "다른 할 일을 잊을 정도로 몰두한다", score: 3 } ] },
  { id: "H5", dimension: "hyperfocus", format: "choice", prompt: "하나에 꽂히면, 다른 중요한 일들을 완전히 뒷전으로 미루게 된다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "H6", dimension: "hyperfocus", format: "choice", prompt: "몰입 중에 누가 말을 걸면?", options: [
    { label: "바로 반응한다", score: 0 }, { label: "조금 늦게 반응한다", score: 1 },
    { label: "못 들을 때가 많다", score: 2 }, { label: "완전히 못 듣는다", score: 3 } ] },
  { id: "H7", dimension: "hyperfocus", format: "choice", prompt: "시간 관리 앱이나 알람이 없다면?", options: [
    { label: "스스로 시간을 잘 지킨다", score: 0 }, { label: "대체로 지킨다", score: 1 },
    { label: "몰입하면 시간을 놓친다", score: 2 }, { label: "몇 시간이 훌쩍 지나있다", score: 3 } ] },
  { id: "H8", dimension: "hyperfocus", format: "choice", prompt: "몰입했던 일을 끝내고 나면?", options: [
    { label: "다른 일로 무난히 전환한다", score: 0 }, { label: "약간의 여운이 있다", score: 1 },
    { label: "한동안 멍하다", score: 2 }, { label: "완전히 방전된 느낌이다", score: 3 } ] },
  { id: "H9", dimension: "hyperfocus", format: "choice", prompt: "흥미가 떨어진 일은?", options: [
    { label: "그래도 마무리한다", score: 0 }, { label: "어느 정도 마무리한다", score: 1 },
    { label: "손이 잘 안 간다", score: 2 }, { label: "거의 손을 놓아버린다", score: 3 } ] },
  { id: "H10", dimension: "hyperfocus", format: "choice", prompt: "몰입할 때와 안 할 때의 나는?", options: [
    { label: "큰 차이가 없다", score: 0 }, { label: "약간 다르다", score: 1 },
    { label: "꽤 다른 사람 같다", score: 2 }, { label: "극과 극으로 다르다", score: 3 } ] },
  // ---- 충동성 (Impulsivity) — I1-I10 ----
  { id: "I1", dimension: "impulsivity", format: "choice", prompt: "하고 싶은 게 생기면?", options: [
    { label: "계획부터 세운다", score: 0 }, { label: "잠깐 고민하고 시작한다", score: 1 },
    { label: "바로 시작한다", score: 2 }, { label: "생각과 동시에 행동한다", score: 3 } ] },
  { id: "I2", dimension: "impulsivity", format: "choice", prompt: "말하기 전에 생각하기보다, 일단 말부터 튀어나올 때가 많다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "I3", dimension: "impulsivity", format: "choice", prompt: "벌여놓은 일(취미, 프로젝트 등)이?", options: [
    { label: "거의 없다", score: 0 }, { label: "한두 개 있다", score: 1 },
    { label: "꽤 여러 개 있다", score: 2 }, { label: "시작만 하고 끝낸 게 거의 없다", score: 3 } ] },
  { id: "I4", dimension: "impulsivity", format: "choice", prompt: "충동구매는?", options: [
    { label: "거의 안 한다", score: 0 }, { label: "가끔 한다", score: 1 },
    { label: "자주 한다", score: 2 }, { label: "나중에 후회할 때가 많다", score: 3 } ] },
  { id: "I5", dimension: "impulsivity", format: "choice", prompt: "줄을 서거나 기다려야 하는 상황이 유독 견디기 힘들다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "I6", dimension: "impulsivity", format: "choice", prompt: "규칙적인 루틴(운동, 습관 등)을?", options: [
    { label: "꾸준히 지킨다", score: 0 }, { label: "대체로 지킨다", score: 1 },
    { label: "금방 흐지부지된다", score: 2 }, { label: "며칠 못 가서 그만둔다", score: 3 } ] },
  { id: "I7", dimension: "impulsivity", format: "choice", prompt: "대화 중 끼어들고 싶은 충동은?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "참기 어려워서 자주 끼어든다", score: 3 } ] },
  { id: "I8", dimension: "impulsivity", format: "choice", prompt: "결과를 예상하지 못한 행동을 한 뒤?", options: [
    { label: "거의 그런 적 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "종종 있다", score: 2 }, { label: "자주 있어서 스스로도 놀란다", score: 3 } ] },
  { id: "I9", dimension: "impulsivity", format: "choice", prompt: "하나를 진득하게 끝내기보다, 새로운 걸 벌이는 게 더 끌린다.", options: [
    { label: "전혀 그렇지 않다", score: 0 }, { label: "매우 그렇다", score: 3 } ] },
  { id: "I10", dimension: "impulsivity", format: "choice", prompt: "감정이 확 올라오면 행동은?", options: [
    { label: "한 박자 쉬고 행동한다", score: 0 }, { label: "조금 자제한다", score: 1 },
    { label: "거의 바로 행동으로 나온다", score: 2 }, { label: "생각할 틈도 없이 행동한다", score: 3 } ] },
];

export const MODULE10_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  distractibility: 10,
  hyperfocus: 10,
  impulsivity: 10,
};

export const MODULE10_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  distractibility: { high: "산만함", low: "안정적인 집중" },
  hyperfocus: { high: "과집중", low: "유연한 전환" },
  impulsivity: { high: "충동성", low: "신중한 판단" },
};

export const MODULE10_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "균형잡힌 주의형", hook: "주의가 쉽게 흩어지지도, 과하게 몰입하지도 않는 균형 잡힌 상태입니다." },
  distractibility: { title: "산만형", hook: "여러 자극이 눈에 들어오면 쉽게 그쪽으로 정신이 팔리는 편입니다." },
  hyperfocus: { title: "과몰입형", hook: "한번 꽂히면 주변이 안 보일 정도로 깊이 빠져드는 편입니다." },
  impulsivity: { title: "충동형", hook: "생각보다 행동이 먼저 나가는 편으로, 즉흥적인 결정이 많습니다." },
  "distractibility+hyperfocus": { title: "극과 극 주의형", hook: "평소엔 쉽게 산만해지다가도, 흥미가 생기면 과할 정도로 몰입하는 양극단을 오갑니다." },
  "distractibility+impulsivity": { title: "즉흥 산만형", hook: "주의가 쉽게 흩어지는 동시에, 행동도 계획 없이 충동적으로 나가는 편입니다." },
  "hyperfocus+impulsivity": { title: "몰아치는 몰입형", hook: "꽂히면 앞뒤 재지 않고 곧장 파고드는, 강렬하고 즉각적인 몰입 패턴입니다." },
  "distractibility+hyperfocus+impulsivity": { title: "주의 조절 과부하형", hook: "산만함, 과몰입, 충동성이 모두 뚜렷하게 나타나는, 주의 조절의 진폭이 큰 상태입니다." },
};
