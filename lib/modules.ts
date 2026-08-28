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
];

export function getModuleById(id: string): ModuleDefinition | undefined {
  return MODULES.find((m) => m.id === id);
}
