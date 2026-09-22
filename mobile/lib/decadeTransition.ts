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

/** Shared by findNextDecadeTransition/findNextDecadeAge: the first list entry whose startAge is
 * strictly after currentAge (i.e. not yet reached), in age order. */
function nextEntryAfter(decadeFortune: unknown, currentAge: number): (DecadeFortuneEntryLike & { startAge: number }) | null {
  const list = (decadeFortune as DecadeFortuneLike | undefined)?.list;
  if (!list?.length) return null;
  const candidates = list.filter(
    (e): e is DecadeFortuneEntryLike & { startAge: number } => typeof e.startAge === "number" && e.startAge > currentAge
  );
  candidates.sort((a, b) => a.startAge - b.startAge);
  return candidates[0] ?? null;
}

export function findNextDecadeTransition(
  decadeFortune: unknown,
  currentAge: number | undefined,
  birthYear: number | undefined,
  birthMonth: number | undefined,
  birthDay: number | undefined
): DecadeTransition | null {
  if (currentAge === undefined || !birthYear || !birthMonth || !birthDay) return null;
  const next = nextEntryAfter(decadeFortune, currentAge);
  if (!next || typeof next.full !== "string") return null;

  return {
    targetDate: new Date(birthYear + next.startAge, birthMonth - 1, birthDay),
    startAge: next.startAge,
    pillarLabel: next.full,
  };
}

/** Lighter-weight sibling of findNextDecadeTransition() for the report paywall preview line: that
 * line only needs "starts at age N" (no exact target date, and no element — the copy is a general
 * "a whole new energy begins" line rather than naming a specific element), so it skips the
 * birth-date args. Returns null when decadeFortune/currentAge are missing (older saved sessions)
 * or there's no future entry in the data. */
export function findNextDecadeAge(decadeFortune: unknown, currentAge: number | undefined): number | null {
  if (currentAge === undefined) return null;
  return nextEntryAfter(decadeFortune, currentAge)?.startAge ?? null;
}
