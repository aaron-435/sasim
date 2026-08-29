/**
 * lib/modules.ts
 * ------------------------------------------------------------------
 * Registry of all wired-up 30-question deep-test modules, so QuizScreen
 * and the module-select step can stay generic instead of hardcoding one
 * module. Each entry supplies exactly what lib/quizProfile.ts's engine
 * needs: the question bank, dimension item counts, dimension labels
 * (for generateNuancedSummary), and a type-name lookup (for
 * resolveTypeName/classifyProfile).
 * ------------------------------------------------------------------
 */

import { MODULE1_QUESTIONS, MODULE1_DIMENSION_ITEM_COUNTS, MODULE1_DIMENSION_LABELS, MODULE1_TYPE_NAMES } from "./module1Attachment";
import { MODULE2_QUESTIONS, MODULE2_DIMENSION_ITEM_COUNTS, MODULE2_DIMENSION_LABELS, MODULE2_TYPE_NAMES } from "./module2Money";
import { MODULE3_QUESTIONS, MODULE3_DIMENSION_ITEM_COUNTS, MODULE3_DIMENSION_LABELS, MODULE3_TYPE_NAMES } from "./module3Burnout";
import { MODULE4_QUESTIONS, MODULE4_DIMENSION_ITEM_COUNTS, MODULE4_DIMENSION_LABELS, MODULE4_TYPE_NAMES } from "./module4Mask";
import { MODULE5_QUESTIONS, MODULE5_DIMENSION_ITEM_COUNTS, MODULE5_DIMENSION_LABELS, MODULE5_TYPE_NAMES } from "./module5Execution";
import { MODULE6_QUESTIONS, MODULE6_DIMENSION_ITEM_COUNTS, MODULE6_DIMENSION_LABELS, MODULE6_TYPE_NAMES } from "./module6Anger";
import { MODULE7_QUESTIONS, MODULE7_DIMENSION_ITEM_COUNTS, MODULE7_DIMENSION_LABELS, MODULE7_TYPE_NAMES } from "./module7Sensitivity";
import { MODULE8_QUESTIONS, MODULE8_DIMENSION_ITEM_COUNTS, MODULE8_DIMENSION_LABELS, MODULE8_TYPE_NAMES } from "./module8Sleep";
import { MODULE9_QUESTIONS, MODULE9_DIMENSION_ITEM_COUNTS, MODULE9_DIMENSION_LABELS, MODULE9_TYPE_NAMES } from "./module9Family";
import { MODULE10_QUESTIONS, MODULE10_DIMENSION_ITEM_COUNTS, MODULE10_DIMENSION_LABELS, MODULE10_TYPE_NAMES } from "./module10Focus";
import { MODULE11_QUESTIONS, MODULE11_DIMENSION_ITEM_COUNTS, MODULE11_DIMENSION_LABELS, MODULE11_TYPE_NAMES } from "./module11Instinct";
import type { ModuleQuestion } from "./quizProfile";

export interface ModuleDefinition {
  id: string;
  title: string;
  subtitle: string;
  questions: ModuleQuestion[];
  dimensionItemCounts: Record<string, number>;
  dimensionLabels: Record<string, { high: string; low: string }>;
  typeNames: Record<string, { title: string; hook: string }>;
  /** Short Korean dimension display name, keyed by the same dimension id used in dimensionLabels. */
  dimensionShortNames: Record<string, string>;
}

export const MODULES: ModuleDefinition[] = [
  {
    id: "module1",
    title: "모듈 1 · 연애 & 애착",
    subtitle: "불안/회피 애착 성향",
    questions: MODULE1_QUESTIONS,
    dimensionItemCounts: MODULE1_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE1_DIMENSION_LABELS,
    typeNames: MODULE1_TYPE_NAMES,
    dimensionShortNames: { anxiety: "불안", avoidance: "회피" },
  },
  {
    id: "module2",
    title: "모듈 2 · 돈",
    subtitle: "결핍공포 / 과시욕 / 회피",
    questions: MODULE2_QUESTIONS,
    dimensionItemCounts: MODULE2_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE2_DIMENSION_LABELS,
    typeNames: MODULE2_TYPE_NAMES,
    dimensionShortNames: { scarcity: "결핍공포", ostentation: "과시욕", avoidance: "회피" },
  },
  {
    id: "module3",
    title: "모듈 3 · 번아웃",
    subtitle: "소진 / 냉소 / 효능감저하",
    questions: MODULE3_QUESTIONS,
    dimensionItemCounts: MODULE3_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE3_DIMENSION_LABELS,
    typeNames: MODULE3_TYPE_NAMES,
    dimensionShortNames: { exhaustion: "소진", cynicism: "냉소", efficacyLoss: "효능감저하" },
  },
  {
    id: "module4",
    title: "모듈 4 · 가면",
    subtitle: "이미지관리 / 은폐 / 관계피로",
    questions: MODULE4_QUESTIONS,
    dimensionItemCounts: MODULE4_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE4_DIMENSION_LABELS,
    typeNames: MODULE4_TYPE_NAMES,
    dimensionShortNames: { imageManagement: "이미지관리", concealment: "은폐", socialFatigue: "관계피로" },
  },
  {
    id: "module5",
    title: "모듈 5 · 실행력",
    subtitle: "완벽주의 / 회피 / 선택마비",
    questions: MODULE5_QUESTIONS,
    dimensionItemCounts: MODULE5_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE5_DIMENSION_LABELS,
    typeNames: MODULE5_TYPE_NAMES,
    dimensionShortNames: { perfectionism: "완벽주의", avoidance: "회피", decisionParalysis: "선택마비" },
  },
  {
    id: "module6",
    title: "모듈 6 · 분노",
    subtitle: "억압 / 폭발 / 반추",
    questions: MODULE6_QUESTIONS,
    dimensionItemCounts: MODULE6_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE6_DIMENSION_LABELS,
    typeNames: MODULE6_TYPE_NAMES,
    dimensionShortNames: { suppression: "억압", explosion: "폭발", rumination: "반추" },
  },
  {
    id: "module7",
    title: "모듈 7 · 예민함",
    subtitle: "자극과부하 / 심미적민감성 / 낮은감각역치",
    questions: MODULE7_QUESTIONS,
    dimensionItemCounts: MODULE7_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE7_DIMENSION_LABELS,
    typeNames: MODULE7_TYPE_NAMES,
    dimensionShortNames: { overstimulation: "자극과부하", aestheticSensitivity: "심미적민감성", lowSensoryThreshold: "낮은감각역치" },
  },
  {
    id: "module8",
    title: "모듈 8 · 수면",
    subtitle: "인지적각성 / 신체적각성 / 무의식누수",
    questions: MODULE8_QUESTIONS,
    dimensionItemCounts: MODULE8_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE8_DIMENSION_LABELS,
    typeNames: MODULE8_TYPE_NAMES,
    dimensionShortNames: { cognitiveArousal: "인지적각성", somaticArousal: "신체적각성", subconsciousLeak: "무의식누수" },
  },
  {
    id: "module9",
    title: "모듈 9 · 원가족",
    subtitle: "정서적얽힘 / 정서적단절 / 역할부담",
    questions: MODULE9_QUESTIONS,
    dimensionItemCounts: MODULE9_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE9_DIMENSION_LABELS,
    typeNames: MODULE9_TYPE_NAMES,
    dimensionShortNames: { enmeshment: "정서적얽힘", cutoff: "정서적단절", parentification: "역할부담" },
  },
  {
    id: "module10",
    title: "모듈 10 · 몰입",
    subtitle: "산만함 / 과집중 / 충동성",
    questions: MODULE10_QUESTIONS,
    dimensionItemCounts: MODULE10_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE10_DIMENSION_LABELS,
    typeNames: MODULE10_TYPE_NAMES,
    dimensionShortNames: { distractibility: "산만함", hyperfocus: "과집중", impulsivity: "충동성" },
  },
  {
    id: "module11",
    title: "모듈 11 · 본능",
    subtitle: "표현억제 / 즉흥성억제 / 확신부족",
    questions: MODULE11_QUESTIONS,
    dimensionItemCounts: MODULE11_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE11_DIMENSION_LABELS,
    typeNames: MODULE11_TYPE_NAMES,
    dimensionShortNames: { expressionSuppression: "표현억제", spontaneitySuppression: "즉흥성억제", confidenceLack: "확신부족" },
  },
];

export function getModuleById(id: string): ModuleDefinition | undefined {
  return MODULES.find((m) => m.id === id);
}
