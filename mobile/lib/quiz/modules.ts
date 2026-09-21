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

import {
  MODULE1_QUESTIONS, MODULE1_QUESTIONS_EN, MODULE1_QUESTIONS_ES,
  MODULE1_DIMENSION_ITEM_COUNTS, MODULE1_DIMENSION_LABELS, MODULE1_TYPE_NAMES,
} from "./module1Attachment";
import {
  MODULE2_QUESTIONS, MODULE2_QUESTIONS_EN, MODULE2_QUESTIONS_ES,
  MODULE2_DIMENSION_ITEM_COUNTS, MODULE2_DIMENSION_LABELS, MODULE2_TYPE_NAMES,
} from "./module2Money";
import {
  MODULE3_QUESTIONS, MODULE3_QUESTIONS_EN, MODULE3_QUESTIONS_ES,
  MODULE3_DIMENSION_ITEM_COUNTS, MODULE3_DIMENSION_LABELS, MODULE3_TYPE_NAMES,
} from "./module3Burnout";
import {
  MODULE4_QUESTIONS, MODULE4_QUESTIONS_EN, MODULE4_QUESTIONS_ES,
  MODULE4_DIMENSION_ITEM_COUNTS, MODULE4_DIMENSION_LABELS, MODULE4_TYPE_NAMES,
} from "./module4Mask";
import {
  MODULE5_QUESTIONS, MODULE5_QUESTIONS_EN, MODULE5_QUESTIONS_ES,
  MODULE5_DIMENSION_ITEM_COUNTS, MODULE5_DIMENSION_LABELS, MODULE5_TYPE_NAMES,
} from "./module5Execution";
import {
  MODULE6_QUESTIONS, MODULE6_QUESTIONS_EN, MODULE6_QUESTIONS_ES,
  MODULE6_DIMENSION_ITEM_COUNTS, MODULE6_DIMENSION_LABELS, MODULE6_TYPE_NAMES,
} from "./module6Anger";
import {
  MODULE7_QUESTIONS, MODULE7_QUESTIONS_EN, MODULE7_QUESTIONS_ES,
  MODULE7_DIMENSION_ITEM_COUNTS, MODULE7_DIMENSION_LABELS, MODULE7_TYPE_NAMES,
} from "./module7Sensitivity";
import {
  MODULE8_QUESTIONS, MODULE8_QUESTIONS_EN, MODULE8_QUESTIONS_ES,
  MODULE8_DIMENSION_ITEM_COUNTS, MODULE8_DIMENSION_LABELS, MODULE8_TYPE_NAMES,
} from "./module8Sleep";
import {
  MODULE9_QUESTIONS, MODULE9_QUESTIONS_EN, MODULE9_QUESTIONS_ES,
  MODULE9_DIMENSION_ITEM_COUNTS, MODULE9_DIMENSION_LABELS, MODULE9_TYPE_NAMES,
} from "./module9Family";
import {
  MODULE10_QUESTIONS, MODULE10_QUESTIONS_EN, MODULE10_QUESTIONS_ES,
  MODULE10_DIMENSION_ITEM_COUNTS, MODULE10_DIMENSION_LABELS, MODULE10_TYPE_NAMES,
} from "./module10Focus";
import {
  MODULE11_QUESTIONS, MODULE11_QUESTIONS_EN, MODULE11_QUESTIONS_ES,
  MODULE11_DIMENSION_ITEM_COUNTS, MODULE11_DIMENSION_LABELS, MODULE11_TYPE_NAMES,
} from "./module11Instinct";
import type { Locale } from "../i18n/types";
import { localizeQuestions, type ModuleQuestion, type QuestionTextOverride } from "./quizProfile";

export interface ModuleDefinition {
  id: string;
  /** Which of buildReportPrompt()'s/buildChatSystemPrompt()'s two broad case-study framings
   * (관계·연애 vs 일·커리어) fits this module's actual subject best. There's no dedicated
   * track-picker screen in onboarding (see mobile/screens/CityScreen.tsx's own note — that
   * toggle was deferred, same as web's components/OnboardingWizard.jsx), so this is the
   * real signal ChatScreen/ReportScreen use instead of a hardcoded guess. A crude binary
   * for an 11-module app, but strictly better than always defaulting to "romance"
   * regardless of what the user actually picked. */
  track: "romance" | "career";
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  /** Korean question bank — the single source of truth for id/dimension/format/score. */
  questions: ModuleQuestion[];
  /** Per-locale display-text overrides for `questions`, keyed by question id. ko has none — the base array already is ko. */
  questionText: Partial<Record<Locale, Record<string, QuestionTextOverride>>>;
  dimensionItemCounts: Record<string, number>;
  dimensionLabels: Record<Locale, Record<string, { high: string; low: string }>>;
  typeNames: Record<Locale, Record<string, { title: string; hook: string }>>;
  /** Short dimension display name (per locale), keyed by the same dimension id used in dimensionLabels. */
  dimensionShortNames: Record<Locale, Record<string, string>>;
}

export const MODULES: ModuleDefinition[] = [
  {
    id: "module1",
    track: "romance",
    title: { ko: "모듈 1 · 연애 & 애착", en: "Module 1 · Love & Attachment", es: "Módulo 1 · Amor y apego" },
    subtitle: { ko: "불안/회피 애착 성향", en: "Anxious/Avoidant Attachment Tendencies", es: "Tendencias de apego ansioso y evitativo" },
    questions: MODULE1_QUESTIONS,
    questionText: { en: MODULE1_QUESTIONS_EN, es: MODULE1_QUESTIONS_ES },
    dimensionItemCounts: MODULE1_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE1_DIMENSION_LABELS,
    typeNames: MODULE1_TYPE_NAMES,
    dimensionShortNames: {
      ko: { anxiety: "불안", avoidance: "회피" },
      en: { anxiety: "Anxiety", avoidance: "Avoidance" },
      es: { anxiety: "Ansiedad", avoidance: "Evitación" },
    },
  },
  {
    id: "module2",
    track: "career",
    title: { ko: "모듈 2 · 돈", en: "Module 2 · Money", es: "Módulo 2 · Dinero" },
    subtitle: { ko: "결핍 공포 / 과시욕 / 회피", en: "Scarcity Fear / Ostentation / Avoidance", es: "Miedo a la escasez / Afán de aparentar / Evitación" },
    questions: MODULE2_QUESTIONS,
    questionText: { en: MODULE2_QUESTIONS_EN, es: MODULE2_QUESTIONS_ES },
    dimensionItemCounts: MODULE2_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE2_DIMENSION_LABELS,
    typeNames: MODULE2_TYPE_NAMES,
    dimensionShortNames: {
      ko: { scarcity: "결핍 공포", ostentation: "과시욕", avoidance: "회피" },
      en: { scarcity: "Scarcity Fear", ostentation: "Ostentation", avoidance: "Avoidance" },
      es: { scarcity: "Miedo a la escasez", ostentation: "Afán de aparentar", avoidance: "Evitación" },
    },
  },
  {
    id: "module3",
    track: "career",
    title: { ko: "모듈 3 · 번아웃", en: "Module 3 · Burnout", es: "Módulo 3 · Agotamiento" },
    subtitle: { ko: "소진 / 냉소 / 효능감 저하", en: "Exhaustion / Cynicism / Reduced Efficacy", es: "Falta de energía / Cinismo / Poca eficacia" },
    questions: MODULE3_QUESTIONS,
    questionText: { en: MODULE3_QUESTIONS_EN, es: MODULE3_QUESTIONS_ES },
    dimensionItemCounts: MODULE3_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE3_DIMENSION_LABELS,
    typeNames: MODULE3_TYPE_NAMES,
    dimensionShortNames: {
      ko: { exhaustion: "소진", cynicism: "냉소", efficacyLoss: "효능감 저하" },
      en: { exhaustion: "Exhaustion", cynicism: "Cynicism", efficacyLoss: "Reduced Efficacy" },
      es: { exhaustion: "Falta de energía", cynicism: "Cinismo", efficacyLoss: "Poca eficacia" },
    },
  },
  {
    id: "module4",
    track: "career",
    title: { ko: "모듈 4 · 가면", en: "Module 4 · The Mask", es: "Módulo 4 · La máscara" },
    subtitle: { ko: "이미지 관리 / 은폐 / 관계 피로", en: "Image Management / Concealment / Social Fatigue", es: "Cuidado de la imagen / Ocultamiento / Cansancio social" },
    questions: MODULE4_QUESTIONS,
    questionText: { en: MODULE4_QUESTIONS_EN, es: MODULE4_QUESTIONS_ES },
    dimensionItemCounts: MODULE4_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE4_DIMENSION_LABELS,
    typeNames: MODULE4_TYPE_NAMES,
    dimensionShortNames: {
      ko: { imageManagement: "이미지 관리", concealment: "은폐", socialFatigue: "관계 피로" },
      en: { imageManagement: "Image Management", concealment: "Concealment", socialFatigue: "Social Fatigue" },
      es: { imageManagement: "Cuidado de la imagen", concealment: "Ocultamiento", socialFatigue: "Cansancio social" },
    },
  },
  {
    id: "module5",
    track: "career",
    title: { ko: "모듈 5 · 실행력", en: "Module 5 · Follow-Through", es: "Módulo 5 · Constancia" },
    subtitle: { ko: "완벽주의 / 회피 / 선택 마비", en: "Perfectionism / Avoidance / Decision Paralysis", es: "Perfeccionismo / Evitación / Dificultad para decidir" },
    questions: MODULE5_QUESTIONS,
    questionText: { en: MODULE5_QUESTIONS_EN, es: MODULE5_QUESTIONS_ES },
    dimensionItemCounts: MODULE5_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE5_DIMENSION_LABELS,
    typeNames: MODULE5_TYPE_NAMES,
    dimensionShortNames: {
      ko: { perfectionism: "완벽주의", avoidance: "회피", decisionParalysis: "선택 마비" },
      en: { perfectionism: "Perfectionism", avoidance: "Avoidance", decisionParalysis: "Decision Paralysis" },
      es: { perfectionism: "Perfeccionismo", avoidance: "Evitación", decisionParalysis: "Dificultad para decidir" },
    },
  },
  {
    id: "module6",
    track: "career",
    title: { ko: "모듈 6 · 분노", en: "Module 6 · Anger", es: "Módulo 6 · Ira" },
    subtitle: { ko: "억압 / 폭발 / 반추", en: "Suppression / Explosion / Rumination", es: "Contención / Estallido / Rumiación" },
    questions: MODULE6_QUESTIONS,
    questionText: { en: MODULE6_QUESTIONS_EN, es: MODULE6_QUESTIONS_ES },
    dimensionItemCounts: MODULE6_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE6_DIMENSION_LABELS,
    typeNames: MODULE6_TYPE_NAMES,
    dimensionShortNames: {
      ko: { suppression: "억압", explosion: "폭발", rumination: "반추" },
      en: { suppression: "Suppression", explosion: "Explosion", rumination: "Rumination" },
      es: { suppression: "Contención", explosion: "Estallido", rumination: "Rumiación" },
    },
  },
  {
    id: "module7",
    track: "career",
    title: { ko: "모듈 7 · 예민함", en: "Module 7 · Sensitivity", es: "Módulo 7 · Sensibilidad" },
    subtitle: { ko: "자극 과부하 / 심미적 민감성 / 낮은 감각 역치", en: "Overstimulation / Aesthetic Sensitivity / Low Sensory Threshold", es: "Sobreestimulación / Sensibilidad estética / Umbral sensorial bajo" },
    questions: MODULE7_QUESTIONS,
    questionText: { en: MODULE7_QUESTIONS_EN, es: MODULE7_QUESTIONS_ES },
    dimensionItemCounts: MODULE7_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE7_DIMENSION_LABELS,
    typeNames: MODULE7_TYPE_NAMES,
    dimensionShortNames: {
      ko: { overstimulation: "자극 과부하", aestheticSensitivity: "심미적 민감성", lowSensoryThreshold: "낮은 감각 역치" },
      en: { overstimulation: "Overstimulation", aestheticSensitivity: "Aesthetic Sensitivity", lowSensoryThreshold: "Low Sensory Threshold" },
      es: { overstimulation: "Sobreestimulación", aestheticSensitivity: "Sensibilidad estética", lowSensoryThreshold: "Umbral sensorial bajo" },
    },
  },
  {
    id: "module8",
    track: "career",
    title: { ko: "모듈 8 · 수면", en: "Module 8 · Sleep", es: "Módulo 8 · Sueño" },
    subtitle: { ko: "인지적 각성 / 신체적 각성 / 무의식 누수", en: "Racing Mind / Tense Body / Restless Dreams", es: "Mente activa / Cuerpo en tensión / Sueños inquietos" },
    questions: MODULE8_QUESTIONS,
    questionText: { en: MODULE8_QUESTIONS_EN, es: MODULE8_QUESTIONS_ES },
    dimensionItemCounts: MODULE8_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE8_DIMENSION_LABELS,
    typeNames: MODULE8_TYPE_NAMES,
    dimensionShortNames: {
      ko: { cognitiveArousal: "인지적 각성", somaticArousal: "신체적 각성", subconsciousLeak: "무의식 누수" },
      en: { cognitiveArousal: "Racing Mind", somaticArousal: "Tense Body", subconsciousLeak: "Restless Dreams" },
      es: { cognitiveArousal: "Mente activa", somaticArousal: "Cuerpo en tensión", subconsciousLeak: "Sueños inquietos" },
    },
  },
  {
    id: "module9",
    track: "romance",
    title: { ko: "모듈 9 · 원가족", en: "Module 9 · Family of Origin", es: "Módulo 9 · Familia de origen" },
    subtitle: { ko: "정서적 얽힘 / 정서적 단절 / 역할 부담", en: "Emotional Entanglement / Emotional Distance / Grown-Up Roles Early", es: "Fusión emocional / Corte emocional / Carga de roles" },
    questions: MODULE9_QUESTIONS,
    questionText: { en: MODULE9_QUESTIONS_EN, es: MODULE9_QUESTIONS_ES },
    dimensionItemCounts: MODULE9_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE9_DIMENSION_LABELS,
    typeNames: MODULE9_TYPE_NAMES,
    dimensionShortNames: {
      ko: { enmeshment: "정서적 얽힘", cutoff: "정서적 단절", parentification: "역할 부담" },
      en: { enmeshment: "Emotional Entanglement", cutoff: "Emotional Distance", parentification: "Grown-Up Roles Early" },
      es: { enmeshment: "Fusión emocional", cutoff: "Corte emocional", parentification: "Carga de roles" },
    },
  },
  {
    id: "module10",
    track: "career",
    title: { ko: "모듈 10 · 몰입", en: "Module 10 · Focus", es: "Módulo 10 · Concentración" },
    subtitle: { ko: "산만함 / 과집중 / 충동성", en: "Distractibility / Hyperfocus / Impulsivity", es: "Distracción / Hiperfoco / Impulsividad" },
    questions: MODULE10_QUESTIONS,
    questionText: { en: MODULE10_QUESTIONS_EN, es: MODULE10_QUESTIONS_ES },
    dimensionItemCounts: MODULE10_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE10_DIMENSION_LABELS,
    typeNames: MODULE10_TYPE_NAMES,
    dimensionShortNames: {
      ko: { distractibility: "산만함", hyperfocus: "과집중", impulsivity: "충동성" },
      en: { distractibility: "Distractibility", hyperfocus: "Hyperfocus", impulsivity: "Impulsivity" },
      es: { distractibility: "Distracción", hyperfocus: "Hiperfoco", impulsivity: "Impulsividad" },
    },
  },
  {
    id: "module11",
    track: "career",
    title: { ko: "모듈 11 · 본능", en: "Module 11 · Self-Expression", es: "Módulo 11 · Expresión personal" },
    subtitle: { ko: "표현 억제 / 즉흥성 억제 / 확신 부족", en: "Expression Suppression / Suppressed Spontaneity / Lack of Confidence", es: "Expresión contenida / Espontaneidad frenada / Poca seguridad" },
    questions: MODULE11_QUESTIONS,
    questionText: { en: MODULE11_QUESTIONS_EN, es: MODULE11_QUESTIONS_ES },
    dimensionItemCounts: MODULE11_DIMENSION_ITEM_COUNTS,
    dimensionLabels: MODULE11_DIMENSION_LABELS,
    typeNames: MODULE11_TYPE_NAMES,
    dimensionShortNames: {
      ko: { expressionSuppression: "표현 억제", spontaneitySuppression: "즉흥성 억제", confidenceLack: "확신 부족" },
      en: { expressionSuppression: "Expression Suppression", spontaneitySuppression: "Suppressed Spontaneity", confidenceLack: "Lack of Confidence" },
      es: { expressionSuppression: "Expresión contenida", spontaneitySuppression: "Espontaneidad frenada", confidenceLack: "Poca seguridad" },
    },
  },
];

export function getModuleById(id: string): ModuleDefinition | undefined {
  return MODULES.find((m) => m.id === id);
}

/** Resolves a module's locale-keyed result strings (title, dimension labels,
 * type names, short dimension names) down to one locale, falling back to ko
 * for any locale not yet populated. */
export function resolveModuleLocale(moduleDef: ModuleDefinition, locale: Locale) {
  return {
    title: moduleDef.title[locale] ?? moduleDef.title.ko,
    subtitle: moduleDef.subtitle[locale] ?? moduleDef.subtitle.ko,
    dimensionLabels: moduleDef.dimensionLabels[locale] ?? moduleDef.dimensionLabels.ko,
    typeNames: moduleDef.typeNames[locale] ?? moduleDef.typeNames.ko,
    dimensionShortNames: moduleDef.dimensionShortNames[locale] ?? moduleDef.dimensionShortNames.ko,
  };
}

/** Resolves `moduleDef.questions` (always Korean) against that locale's
 * QuestionTextOverride dictionary — see localizeQuestions() in
 * quizProfile.ts. Falls back to the Korean text for ko or any question a
 * locale hasn't translated yet. */
export function getLocalizedQuestions(moduleDef: ModuleDefinition, locale: Locale): ModuleQuestion[] {
  return localizeQuestions(moduleDef.questions, moduleDef.questionText[locale]);
}
