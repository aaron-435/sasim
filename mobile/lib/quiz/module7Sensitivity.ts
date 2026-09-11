/**
 * lib/module7Sensitivity.ts
 * ------------------------------------------------------------------
 * Module 7 — 예민함/기질 심화 테스트, 30문항 (전문가 검토용 원본:
 * 모듈7_예민함_30문항_전문가검토용.xlsx). 3차원(HSP 척도 기반): 자극과부하
 * (X1-X10) / 심미적민감성(A1-A10) / 낮은감각역치(L1-L10). 셋 다 높은 경우가
 * 학계 정립된 고감각민감성(HSP) 3요인 구조와 대응한다.
 * ------------------------------------------------------------------
 */

import type { ModuleQuestion } from "./quizProfile";

export const MODULE7_QUESTIONS: ModuleQuestion[] = [
  // ---- 자극과부하 (Overstimulation) — X1-X10 ----
  { id: "X1", dimension: "overstimulation", format: "slider", prompt: "한 번에 여러 가지가 몰리면 압도되는 정도는?", options: { minLabel: "전혀 압도되지 않음", maxLabel: "완전히 압도됨" } },
  { id: "X2", dimension: "overstimulation", format: "choice", prompt: "해야 할 일이 동시에 여러 개 생기면?", options: [
    { label: "차근차근 처리한다", score: 0 }, { label: "약간 정신없지만 해낸다", score: 1 },
    { label: "머릿속이 금방 복잡해진다", score: 2 }, { label: "압도돼서 아무것도 손에 안 잡힌다", score: 3 } ] },
  { id: "X3", dimension: "overstimulation", format: "choice", prompt: "시끄럽고 붐비는 장소에 오래 있으면?", options: [
    { label: "괜찮은 편이다", score: 0 }, { label: "조금 피곤해진다", score: 1 },
    { label: "빨리 지친다", score: 2 }, { label: "빨리 나가고 싶어진다", score: 3 } ] },
  { id: "X4", dimension: "overstimulation", format: "choice", prompt: "마감이나 시간 압박이 있으면?", options: [
    { label: "집중력이 오히려 올라간다", score: 0 }, { label: "적당히 긴장된다", score: 1 },
    { label: "쉽게 초조해진다", score: 2 }, { label: "머릿속이 하얘질 때가 있다", score: 3 } ] },
  { id: "X5", dimension: "overstimulation", format: "choice", prompt: "갑작스러운 일정 변경이 생기면?", options: [
    { label: "유연하게 받아들인다", score: 0 }, { label: "약간 당황하지만 적응한다", score: 1 },
    { label: "적응하는 데 시간이 걸린다", score: 2 }, { label: "하루 전체 리듬이 흔들린다", score: 3 } ] },
  { id: "X6", dimension: "overstimulation", format: "choice", prompt: "누군가 나를 지켜보면서 일을 시키면?", options: [
    { label: "평소와 다르지 않다", score: 0 }, { label: "약간 신경 쓰인다", score: 1 },
    { label: "긴장돼서 실수가 잦아진다", score: 2 }, { label: "평소 실력이 잘 안 나온다", score: 3 } ] },
  { id: "X7", dimension: "overstimulation", format: "choice", prompt: "하루 동안 사람을 많이 만나고 나면?", options: [
    { label: "에너지가 남아있다", score: 0 }, { label: "적당히 피곤하다", score: 1 },
    { label: "혼자만의 시간이 꼭 필요하다", score: 2 }, { label: "완전히 소진된 느낌이다", score: 3 } ] },
  { id: "X8", dimension: "overstimulation", format: "choice", prompt: "새로운 환경(이사, 이직 등)에 적응하는 속도는?", options: [
    { label: "빠르게 적응한다", score: 0 }, { label: "무난하게 적응한다", score: 1 },
    { label: "시간이 꽤 걸린다", score: 2 }, { label: "적응하는 동안 스트레스가 크다", score: 3 } ] },
  { id: "X9", dimension: "overstimulation", format: "choice", prompt: "자극이 많은 하루(시험, 발표, 여행 등)를 보내면?", options: [
    { label: "다음 날도 괜찮다", score: 0 }, { label: "하루 정도 쉬면 회복된다", score: 1 },
    { label: "며칠은 여운이 남는다", score: 2 }, { label: "회복하는 데 꽤 오래 걸린다", score: 3 } ] },
  { id: "X10", dimension: "overstimulation", format: "choice", prompt: "여러 사람이 동시에 말을 걸면?", options: [
    { label: "무리 없이 대응한다", score: 0 }, { label: "조금 버겁다", score: 1 },
    { label: "누구 말부터 들어야 할지 혼란스럽다", score: 2 }, { label: "머리가 멍해지며 아무 반응을 못 한다", score: 3 } ] },
  // ---- 심미적민감성 (Aesthetic Sensitivity) — A1-A10 ----
  { id: "A1", dimension: "aestheticSensitivity", format: "slider", prompt: "음악·영화·풍경 등에서 감정이 깊이 움직이는 정도는?", options: { minLabel: "거의 움직이지 않음", maxLabel: "매우 깊이 움직임(벅차오름)" } },
  { id: "A2", dimension: "aestheticSensitivity", format: "choice", prompt: "좋아하는 음악을 들으면?", options: [
    { label: "그냥 편안하게 듣는다", score: 0 }, { label: "기분이 좋아진다", score: 1 },
    { label: "감정이 꽤 크게 움직인다", score: 2 }, { label: "소름 돋거나 눈물이 날 때가 있다", score: 3 } ] },
  { id: "A3", dimension: "aestheticSensitivity", format: "choice", prompt: "미술관이나 전시를 보면?", options: [
    { label: "적당히 감상하고 지나간다", score: 0 }, { label: "인상 깊은 작품 몇 개는 오래 본다", score: 1 },
    { label: "작품 앞에서 한참 머무를 때가 많다", score: 2 }, { label: "압도되는 느낌을 자주 받는다", score: 3 } ] },
  { id: "A4", dimension: "aestheticSensitivity", format: "choice", prompt: "자연의 풍경(노을, 바다 등)을 보면?", options: [
    { label: "예쁘다고 생각하고 넘어간다", score: 0 }, { label: "잠시 감상한다", score: 1 },
    { label: "마음이 깊이 움직인다", score: 2 }, { label: "벅차오르거나 눈물이 날 때가 있다", score: 3 } ] },
  { id: "A5", dimension: "aestheticSensitivity", format: "choice", prompt: "다른 사람의 예술적 표현(글, 그림 등)에?", options: [
    { label: "무난하게 반응한다", score: 0 }, { label: "좋으면 칭찬한다", score: 1 },
    { label: "섬세한 부분까지 알아챈다", score: 2 }, { label: "작은 디테일에도 깊이 감동한다", score: 3 } ] },
  { id: "A6", dimension: "aestheticSensitivity", format: "choice", prompt: "영화나 드라마를 볼 때?", options: [
    { label: "재미 위주로 본다", score: 0 }, { label: "몰입해서 본다", score: 1 },
    { label: "감정이 크게 이입된다", score: 2 }, { label: "며칠씩 여운이 남는다", score: 3 } ] },
  { id: "A7", dimension: "aestheticSensitivity", format: "choice", prompt: "미세한 색감이나 질감의 차이를?", options: [
    { label: "잘 구분하지 못한다", score: 0 }, { label: "가끔 알아챈다", score: 1 },
    { label: "곧잘 알아챈다", score: 2 }, { label: "남들이 못 느끼는 차이까지 알아챈다", score: 3 } ] },
  { id: "A8", dimension: "aestheticSensitivity", format: "choice", prompt: "공간의 분위기(조명, 인테리어 등)가?", options: [
    { label: "크게 신경 안 쓰인다", score: 0 }, { label: "어느 정도 신경 쓰인다", score: 1 },
    { label: "기분에 꽤 영향을 준다", score: 2 }, { label: "분위기에 따라 컨디션이 완전히 달라진다", score: 3 } ] },
  { id: "A9", dimension: "aestheticSensitivity", format: "choice", prompt: "좋아하는 것(향, 음식, 소리 등)을 접하면?", options: [
    { label: "무난하게 즐긴다", score: 0 }, { label: "기분 좋게 즐긴다", score: 1 },
    { label: "온전히 몰입해서 즐긴다", score: 2 }, { label: "행복감이 벅차오를 정도로 즐긴다", score: 3 } ] },
  { id: "A10", dimension: "aestheticSensitivity", format: "choice", prompt: "슬픈 이야기(책, 뉴스 등)를 접하면?", options: [
    { label: "담담하게 받아들인다", score: 0 }, { label: "안타까움을 느낀다", score: 1 },
    { label: "마음이 무거워진다", score: 2 }, { label: "며칠간 계속 생각나고 마음이 아프다", score: 3 } ] },
  // ---- 낮은감각역치 (Low Sensory Threshold) — L1-L10 ----
  { id: "L1", dimension: "lowSensoryThreshold", format: "slider", prompt: "밝은 빛·큰 소리·강한 냄새 등에 불편함을 느끼는 정도는?", options: { minLabel: "전혀 불편하지 않음", maxLabel: "매우 불편함" } },
  { id: "L2", dimension: "lowSensoryThreshold", format: "choice", prompt: "시끄러운 소음(공사장, 확성기 등)을 들으면?", options: [
    { label: "별로 신경 안 쓰인다", score: 0 }, { label: "약간 거슬린다", score: 1 },
    { label: "꽤 불편하다", score: 2 }, { label: "귀를 막고 싶을 정도로 괴롭다", score: 3 } ] },
  { id: "L3", dimension: "lowSensoryThreshold", format: "choice", prompt: "옷의 태그나 재질이 까끌거리면?", options: [
    { label: "거의 못 느낀다", score: 0 }, { label: "가끔 신경 쓰인다", score: 1 },
    { label: "계속 신경 쓰인다", score: 2 }, { label: "바로 잘라내거나 갈아입어야 한다", score: 3 } ] },
  { id: "L4", dimension: "lowSensoryThreshold", format: "choice", prompt: "강한 향수나 냄새를 맡으면?", options: [
    { label: "괜찮은 편이다", score: 0 }, { label: "약간 거슬린다", score: 1 },
    { label: "두통이 올 때가 있다", score: 2 }, { label: "속이 안 좋아지거나 자리를 피하게 된다", score: 3 } ] },
  { id: "L5", dimension: "lowSensoryThreshold", format: "choice", prompt: "밝은 조명이나 화면 빛에?", options: [
    { label: "잘 적응한다", score: 0 }, { label: "약간 눈이 피로하다", score: 1 },
    { label: "쉽게 눈이 부시다", score: 2 }, { label: "두통으로 이어질 때가 있다", score: 3 } ] },
  { id: "L6", dimension: "lowSensoryThreshold", format: "choice", prompt: "배가 고프거나 카페인을 많이 섭취하면?", options: [
    { label: "몸 상태에 큰 변화가 없다", score: 0 }, { label: "약간의 변화를 느낀다", score: 1 },
    { label: "예민해지거나 불안해진다", score: 2 }, { label: "몸이 확연히 반응한다(심장이 빨리 뛰는 등)", score: 3 } ] },
  { id: "L7", dimension: "lowSensoryThreshold", format: "choice", prompt: "여러 소리가 동시에 들리는 환경에서 집중은?", options: [
    { label: "잘 된다", score: 0 }, { label: "그럭저럭 된다", score: 1 },
    { label: "쉽게 흐트러진다", score: 2 }, { label: "거의 불가능하다", score: 3 } ] },
  { id: "L8", dimension: "lowSensoryThreshold", format: "choice", prompt: "온도 변화(너무 덥거나 추운 곳)에?", options: [
    { label: "잘 적응한다", score: 0 }, { label: "약간 불편해한다", score: 1 },
    { label: "꽤 예민하게 반응한다", score: 2 }, { label: "몸 컨디션 전체에 영향을 준다", score: 3 } ] },
  { id: "L9", dimension: "lowSensoryThreshold", format: "choice", prompt: "피부에 닿는 자극(햇빛, 바람 등)에?", options: [
    { label: "잘 못 느낀다", score: 0 }, { label: "가볍게 느낀다", score: 1 },
    { label: "예민하게 느낀다", score: 2 }, { label: "쉽게 자극받고 불편해진다", score: 3 } ] },
  { id: "L10", dimension: "lowSensoryThreshold", format: "choice", prompt: "통증(주사, 작은 상처 등)에 대한 민감도는?", options: [
    { label: "둔감한 편이다", score: 0 }, { label: "보통이다", score: 1 },
    { label: "예민한 편이다", score: 2 }, { label: "남들보다 훨씬 강하게 느낀다", score: 3 } ] },
];

export const MODULE7_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  overstimulation: 10,
  aestheticSensitivity: 10,
  lowSensoryThreshold: 10,
};

export const MODULE7_DIMENSION_LABELS: Record<string, { high: string; low: string }> = {
  overstimulation: { high: "자극과부하", low: "안정적인 자극처리" },
  aestheticSensitivity: { high: "심미적민감성", low: "담담한 감상" },
  lowSensoryThreshold: { high: "낮은감각역치", low: "둔감한 감각" },
};

export const MODULE7_TYPE_NAMES: Record<string, { title: string; hook: string }> = {
  baseline: { title: "무난한 감각형", hook: "자극에 특별히 압도되거나 예민하지 않은, 비교적 무난한 감각 반응을 보입니다." },
  overstimulation: { title: "과부하형", hook: "여러 자극이 한꺼번에 몰리면 쉽게 압도되고, 혼자만의 시간이 꼭 필요합니다." },
  aestheticSensitivity: { title: "심미형", hook: "음악, 예술, 풍경 같은 아름다움과 감정적 울림에 남들보다 깊이 반응합니다." },
  lowSensoryThreshold: { title: "감각민감형", hook: "소리, 빛, 냄새, 촉감 같은 물리적 자극에 유독 예민하게 반응합니다." },
  "overstimulation+aestheticSensitivity": { title: "감성 과몰입형", hook: "깊이 느끼는 만큼 그 감정에 쉽게 압도되기도 하는 패턴입니다." },
  "overstimulation+lowSensoryThreshold": { title: "감각 과부하형", hook: "물리적 자극에도 민감하고, 여러 자극이 겹치면 쉽게 지치는 편입니다." },
  "aestheticSensitivity+lowSensoryThreshold": { title: "섬세한 감각형", hook: "아름다움은 깊이 느끼면서, 불편한 자극도 예민하게 감지하는 섬세한 감각을 가졌습니다." },
  "overstimulation+aestheticSensitivity+lowSensoryThreshold": { title: "고감각민감형(HSP)", hook: "자극과부하, 심미적 민감성, 낮은 감각역치가 모두 뚜렷한, 전형적인 고감각민감자(HSP) 패턴입니다." },
};
