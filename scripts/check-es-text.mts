/**
 * scripts/check-es-text.mts
 * ------------------------------------------------------------------
 * 스페인어(es-419) 글 파일 린트. 마케팅 키트처럼 코드 밖에 있는 md·txt를 줄 단위로 본다. OpenAI를 쓰지 않는다.
 *
 *   npx tsx scripts/check-es-text.mts marketing/es/hooks.md [다른 파일 ...]
 *
 * 검사: 독자 성별 표지(lib/esGender.ts, 리포트 목록 + 챗 보조 목록. 훅·대사는 따옴표 안에 쓰므로 따옴표 안도 본다)와
 * es-419 기준 밖 스페인식 표지(lib/esSpain.ts: vale·vosotros·스페인 어휘·끝난 일의 현재완료).
 * 금지 예시를 일부러 적은 줄은 그 줄에 `es-check: ignore`를 넣으면 건너뛴다.
 * 걸린 곳이 하나라도 있으면 종료 코드 1.
 * ------------------------------------------------------------------
 */

import { readFileSync } from "node:fs";
import { matchEsGenderedReader } from "../lib/esGender.ts";
import { findEsSpainMarkers } from "../lib/esSpain.ts";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("사용법: npx tsx scripts/check-es-text.mts <파일> [파일 ...]");
  process.exit(2);
}

let warnings = 0;
for (const file of files) {
  console.log(`- ${file}`);
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (!line.trim() || line.includes("es-check: ignore")) return;
      const where = `${file}:${i + 1}`;
      const gendered = matchEsGenderedReader(line);
      if (gendered) {
        warnings++;
        console.log(`  [경고] ${where}: 독자 성별 표지 "${gendered}"(성별 중립으로): ${line.trim()}`);
      }
      for (const hit of findEsSpainMarkers(line)) {
        warnings++;
        console.log(`  [경고] ${where}: ${hit}: ${line.trim()}`);
      }
    });
}
console.log(`\n경고 ${warnings}개`);
process.exit(warnings > 0 ? 1 : 0);
