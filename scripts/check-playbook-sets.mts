/**
 * scripts/check-playbook-sets.mts
 * ------------------------------------------------------------------
 * lib/modulePlaybooks.ts의 5세트 데이터(MODULE_CHAT_SETS)를 퀴즈 문항
 * (mobile/lib/quiz/modules.ts의 ALL_MODULES — 앱에 아직 안 나온 모듈 포함)과 맞춰 본다. OpenAI 호출 없음.
 *
 *   npx tsx scripts/check-playbook-sets.mts
 *
 * 검사 항목:
 *   - 후보 문항 ID가 그 모듈 퀴즈에 실제로 있는지
 *   - 슬라이더 문항, 인용 제외 문항(모듈 3 E6, 4 AS2, 6 E6, 8 S8)이 없는지
 *   - 한 모듈 안에서 세트끼리 후보가 겹치지 않는지
 *   - 세트 1~4 후보가 2개 이상의 차원을 덮는지
 *   - 세트 순서·질문 개수(세트 1·3·4는 3개, 세트 2는 2개 + 대체 질문, 세트 5는 1개)
 *   - 시그니처 질문(★)이 모듈마다 정확히 하나이고 플레이북 문구와 같은지
 *   - 세트 5 점수 방향(모듈 7·10만 "high")
 *   - ko/en/es 문구가 비어 있지 않은지(24턴 고정 문구 포함)
 * 세트 데이터가 아직 없는 모듈은 "데이터 없음"으로 건너뛴다.
 * 오류가 하나라도 있으면 exit 1.
 * ------------------------------------------------------------------
 */

import {
  MODULE_CHAT_SETS,
  MODULE_PLAYBOOKS,
  PERSPECTIVE_SHIFT_LEAD,
  type ChatSetQuestion,
  type LocalizedText,
  type PlaybookModuleId,
} from "../lib/modulePlaybooks.ts";
import { ALL_MODULES } from "../mobile/lib/quiz/modules.ts";

const LOCALES = ["ko", "en", "es"] as const;

/** CHAT_SETS_DRAFT.md 1-3: 건강·안전 쪽으로 대화를 여는 문항과 모듈 4 AS2. */
const EXCLUDED: Partial<Record<PlaybookModuleId, readonly string[]>> = {
  module3: ["E6"],
  module4: ["AS2"],
  module6: ["E6"],
  module8: ["S8"],
};

const HIGH_STRENGTH_MODULES: readonly PlaybookModuleId[] = ["module7", "module10"];

/** 세트별 ③④⑤ 질문 개수. */
const QUESTION_COUNT: Record<number, number> = { 1: 3, 2: 2, 3: 3, 4: 3, 5: 1 };

function checkText(errors: string[], where: string, text: LocalizedText | undefined) {
  if (!text) {
    errors.push(`${where}: 문구 없음`);
    return;
  }
  for (const loc of LOCALES) {
    if (typeof text[loc] !== "string" || !text[loc].trim()) errors.push(`${where}: ${loc} 문구가 비어 있음`);
  }
}

function sameText(a: LocalizedText, b: LocalizedText): boolean {
  return LOCALES.every((loc) => a[loc] === b[loc]);
}

let totalErrors = 0;

const leadErrors: string[] = [];
checkText(leadErrors, "PERSPECTIVE_SHIFT_LEAD", PERSPECTIVE_SHIFT_LEAD);
if (leadErrors.length) {
  totalErrors += leadErrors.length;
  console.log(`24턴 고정 문구: 오류 ${leadErrors.length}`);
  for (const e of leadErrors) console.log(`  - ${e}`);
} else {
  console.log("24턴 고정 문구: 오류 0");
}

for (const moduleId of Object.keys(MODULE_PLAYBOOKS) as PlaybookModuleId[]) {
  const data = MODULE_CHAT_SETS[moduleId];
  if (!data) {
    console.log(`${moduleId}: 데이터 없음 (건너뜀)`);
    continue;
  }
  const errors: string[] = [];
  const quiz = ALL_MODULES.find((m) => m.id === moduleId);
  if (!quiz) {
    console.log(`${moduleId}: 퀴즈 정의를 찾지 못함`);
    totalErrors += 1;
    continue;
  }
  const byId = new Map(quiz.questions.map((q) => [q.id, q]));
  const excluded = EXCLUDED[moduleId] ?? [];
  const seen = new Map<string, number>();

  const expectedDirection = HIGH_STRENGTH_MODULES.includes(moduleId) ? "high" : "low";
  if (data.strengthScoreDirection !== expectedDirection) {
    errors.push(`세트 5 점수 방향이 ${data.strengthScoreDirection} (기대: ${expectedDirection})`);
  }

  const signatures: ChatSetQuestion[] = [];

  data.sets.forEach((set, index) => {
    const where = `세트 ${index + 1}`;
    if (set.set !== index + 1) errors.push(`${where}: set 번호가 ${set.set}`);
    if (!set.focus.trim()) errors.push(`${where}: focus가 비어 있음`);
    if (set.candidates.length < 2) errors.push(`${where}: 후보가 ${set.candidates.length}개 (2개 이상 필요)`);

    const dimensions = new Set<string>();
    for (const id of set.candidates) {
      const q = byId.get(id);
      if (!q) {
        errors.push(`${where}: 후보 ${id}가 퀴즈에 없음`);
        continue;
      }
      if (q.format !== "choice") errors.push(`${where}: 후보 ${id}는 슬라이더 문항(${q.format})`);
      if (excluded.includes(id)) errors.push(`${where}: 후보 ${id}는 인용 제외 문항`);
      const prev = seen.get(id);
      if (prev !== undefined) errors.push(`${where}: 후보 ${id}가 세트 ${prev}와 겹침`);
      seen.set(id, index + 1);
      dimensions.add(q.dimension);
    }
    if (index < 4 && dimensions.size < 2) {
      errors.push(`${where}: 후보가 차원 ${dimensions.size}개만 덮음 (2개 이상 필요)`);
    }

    checkText(errors, `${where} 기본 질문`, set.fallbackQuestion);

    const expectedCount = QUESTION_COUNT[index + 1];
    if (set.questions.length !== expectedCount) {
      errors.push(`${where}: ③④⑤ 질문 ${set.questions.length}개 (기대: ${expectedCount})`);
    }
    set.questions.forEach((q, qi) => {
      checkText(errors, `${where} 질문 ${qi + 3}`, q.text);
      if (q.signature) signatures.push(q);
    });
    if (index === 1) {
      if (!set.alternate) errors.push(`${where}: 대체 질문(alternate) 없음`);
      else checkText(errors, `${where} 대체 질문`, set.alternate.text);
    } else if (set.alternate) {
      errors.push(`${where}: 대체 질문은 세트 2에만 둔다`);
    }
  });

  if (signatures.length !== 1) {
    errors.push(`시그니처 질문 ${signatures.length}개 (정확히 1개 필요)`);
  } else if (!sameText(signatures[0].text, MODULE_PLAYBOOKS[moduleId].signatureQuestion)) {
    errors.push("시그니처 질문 문구가 플레이북 signatureQuestion과 다름");
  }

  totalErrors += errors.length;
  console.log(`${moduleId}: 오류 ${errors.length}`);
  for (const e of errors) console.log(`  - ${e}`);
}

console.log(totalErrors === 0 ? "\n전체 오류 0" : `\n전체 오류 ${totalErrors}`);
process.exit(totalErrors === 0 ? 0 : 1);
