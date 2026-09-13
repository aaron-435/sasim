// Finds the next 대운(decade fortune) transition from the already-computed
// decadeFortune + birth date — no new saju calculation needed, this just reads
// the shape lib/manseryeok.ts's DecadeFortune/DecadeFortuneEntry already produces
// (passed through as `unknown` end-to-end, see mobile/lib/saju.ts).
//
// Why derive the exact date from birthYear/Month/Day instead of just
// `currentAge`: currentAge is floor(elapsed years), so "years until next
// transition = nextEntry.startAge - currentAge" can be off by almost a full
// year in either direction. The transition always lands on the birthday in
// (birthYear + startAge), so with the exact birth date we can pin it exactly.

export type DecadeTransition = {
  targetDate: Date;
  startAge: number;
  /** "임인" 같은 표시용 간지 문자열 — engine의 DecadeFortuneEntry.full */
  pillarLabel: string;
};

interface DecadeFortuneEntryLike {
  startAge?: number;
  full?: string;
}
interface DecadeFortuneLike {
  list?: DecadeFortuneEntryLike[];
}

export function findNextDecadeTransition(
  decadeFortune: unknown,
  currentAge: number | undefined,
  birthYear: number | undefined,
  birthMonth: number | undefined,
  birthDay: number | undefined
): DecadeTransition | null {
  if (currentAge === undefined || !birthYear || !birthMonth || !birthDay) return null;
  const list = (decadeFortune as DecadeFortuneLike | undefined)?.list;
  if (!list?.length) return null;

  const next = list
    .filter((e): e is Required<DecadeFortuneEntryLike> => typeof e.startAge === "number" && typeof e.full === "string" && e.startAge > currentAge)
    .sort((a, b) => a.startAge - b.startAge)[0];
  if (!next) return null;

  return {
    targetDate: new Date(birthYear + next.startAge, birthMonth - 1, birthDay),
    startAge: next.startAge,
    pillarLabel: next.full,
  };
}
