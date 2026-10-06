/**
 * lib/groupChemistry.ts
 * ------------------------------------------------------------------
 * Group chemistry map (SPEC 2026-10-05 §7): 3–6 people, one role each, from the five elements.
 * Rules only — no LLM — so it can stay free.
 *
 * Each person brings two signals the app already has for everyone it can add (itself, a
 * birth date typed in, or a friend's answered invite): the Day Master's element (who they are)
 * and the chart's most present element. The role is the Day Master's element, except when that
 * element is already someone else's role and the person's most present element is still free —
 * then they take that one, so a group spreads over as many roles as the people allow.
 *
 * Returns locale-neutral element keys; the app holds the copy (mobile/lib/groupChemistryContent.ts),
 * same split as lib/sajuType.ts.
 * ------------------------------------------------------------------
 */

import { GENERATES, STEM_ELEMENT, type ElementKey } from "./sajuType";

export const GROUP_MIN = 3;
export const GROUP_MAX = 6;

const ELEMENT_ORDER: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

export interface GroupMemberSignals {
  dayMasterElement: ElementKey;
  dominantElement: ElementKey;
}

export interface GroupChemistry {
  /** One role per member, same order as the input. */
  roles: ElementKey[];
  /** The element the group carries most (Day Masters count double). */
  leading: ElementKey;
  /** The first element nobody carries in either signal, or null when all five are there. */
  toAdd: ElementKey | null;
}

export function isElementKey(value: unknown): value is ElementKey {
  return typeof value === "string" && (ELEMENT_ORDER as string[]).includes(value);
}

export function elementOfStem(stem: string): ElementKey | null {
  return STEM_ELEMENT[stem] ?? null;
}

export function groupChemistry(members: GroupMemberSignals[]): GroupChemistry | null {
  if (members.length < GROUP_MIN || members.length > GROUP_MAX) return null;

  const roles = members.map((m) => m.dayMasterElement);
  // Spread out: anyone sharing a role with an earlier person moves to their most present element
  // when nobody holds it yet. Input order breaks ties, so the same list always gives the same map.
  for (let i = 0; i < members.length; i++) {
    const sharesRole = roles.some((role, j) => j < i && role === roles[i]);
    const alt = members[i].dominantElement;
    if (sharesRole && alt !== roles[i] && !roles.includes(alt)) roles[i] = alt;
  }

  const weight = new Map<ElementKey, number>(ELEMENT_ORDER.map((e) => [e, 0]));
  for (const m of members) {
    weight.set(m.dayMasterElement, weight.get(m.dayMasterElement)! + 2);
    weight.set(m.dominantElement, weight.get(m.dominantElement)! + 1);
  }
  const leading = [...ELEMENT_ORDER].sort((a, b) => weight.get(b)! - weight.get(a)! || ELEMENT_ORDER.indexOf(a) - ELEMENT_ORDER.indexOf(b))[0];

  // Of the missing elements, suggest the one the leading element feeds first — it reads as the
  // group's natural next step rather than a gap.
  const missing = ELEMENT_ORDER.filter((e) => weight.get(e) === 0);
  let toAdd: ElementKey | null = null;
  if (missing.length) {
    let e = GENERATES[leading];
    for (let k = 0; k < 5 && !toAdd; k++, e = GENERATES[e]) if (missing.includes(e)) toAdd = e;
  }

  return { roles, leading, toAdd };
}
