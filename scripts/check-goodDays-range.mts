// 범위 계산 확인(네트워크 없음): npx tsx scripts/check-goodDays-range.mts
import { goodDaysRangeLength } from "../lib/goodDays";

// 사용법 출력: --help 또는 -h
const cliArgs = process.argv.slice(2);
if (cliArgs.includes("--help") || cliArgs.includes("-h")) {
  console.log(`좋은 날 범위 길이 검사 스크립트 (네트워크 없음)

실행 방법:
  npx tsx scripts/check-goodDays-range.mts [--help | -h]

종료 코드:
  0 = 모두 통과 (또는 사용법 출력)
  1 = 실패 있음`);
  process.exit(0);
}

const cases: Array<[string, "month" | undefined, { year: number; month: number; day: number }, number]> = [
  ["10/1 (31일 달) month", "month", { year: 2026, month: 10, day: 1 }, 31],
  ["10/25 month", "month", { year: 2026, month: 10, day: 25 }, 7],
  ["10/31 month", "month", { year: 2026, month: 10, day: 31 }, 1],
  ["2/28 평년 말일 month", "month", { year: 2027, month: 2, day: 28 }, 1],
  ["2/1 윤년 month", "month", { year: 2028, month: 2, day: 1 }, 29],
  ["9/1 (30일 달) month", "month", { year: 2026, month: 9, day: 1 }, 30],
  ["12/20 month", "month", { year: 2026, month: 12, day: 20 }, 12],
  ["scope 없음 10/25", undefined, { year: 2026, month: 10, day: 25 }, 30],
  ["scope 없음 10/1", undefined, { year: 2026, month: 10, day: 1 }, 30],
];
let fail = 0;
for (const [name, scope, today, want] of cases) {
  const got = goodDaysRangeLength(scope, today);
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"} ${name}: ${got} (기대 ${want})`);
}
process.exit(fail ? 1 : 0);
