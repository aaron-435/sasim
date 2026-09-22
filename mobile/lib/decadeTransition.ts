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

import type { ElementKey } from "./sajuType";

export type DecadeTransition = {
  targetDate: Date;
  startAge: number;
  /** "임인" 같은 표시용 간지 문자열 — engine의 DecadeFortuneEntry.full */
  pillarLabel: string;
};

interface DecadeFortuneEntryLike {
  startAge?: number;
  full?: string;
  skyElement?: string;
  earthElement?: string;
}
interface DecadeFortuneLike {
  list?: DecadeFortuneEntryLike[];
}

// Same hanja→key mapping as web's lib/reportPrompts.ts (HANJA_TO_ELEMENT_KEY) and
// App.tsx's EL_KO_TO_KEY — duplicated locally because mobile is a separate package
// that never imports the root lib/.
const HANJA_TO_ELEMENT_KEY: Record<string, ElementKey> = {
  목: "wood", 화: "fire", 토: "earth", 금: "metal", 수: "water",
};

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

export type DecadeElementPreview = {
  startAge: number;
  elementKey: ElementKey;
};

/** Lighter-weight sibling of findNextDecadeTransition() for the report paywall preview line:
 * that line only needs "starts at age N, element X" (no exact target date), so it skips the
 * birth-date args and reads the element hanja instead of the ganji string. Returns null when
 * decadeFortune/currentAge are missing (older saved sessions) or the next entry's element
 * can't be mapped — the caller shows nothing rather than a broken line. */
export function findNextDecadeElementPreview(decadeFortune: unknown, currentAge: number | undefined): DecadeElementPreview | null {
  if (currentAge === undefined) return null;
  const list = (decadeFortune as DecadeFortuneLike | undefined)?.list;
  if (!list?.length) return null;

  const next = list
    .filter((e): e is Required<Pick<DecadeFortuneEntryLike, "startAge" | "earthElement" | "skyElement">> => typeof e.startAge === "number" && e.startAge > currentAge)
    .sort((a, b) => a.startAge - b.startAge)[0];
  if (!next) return null;

  const elementKey = HANJA_TO_ELEMENT_KEY[next.earthElement] ?? HANJA_TO_ELEMENT_KEY[next.skyElement];
  if (!elementKey) return null;

  return { startAge: next.startAge, elementKey };
}
