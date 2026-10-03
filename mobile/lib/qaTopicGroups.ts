import questionBank from "../data/questionBank.json";

export type QaQuestion = { id: string; text_ko: string; text_en?: string; text_es?: string };
export type QaSubcategory = { id: string; name_ko: string; name_en?: string; name_es?: string; questions: QaQuestion[] };
export type QaCategory = { id: string; name_ko: string; name_en?: string; name_es?: string; subcategories: QaSubcategory[] };

export type QaTopicGroupId = "love" | "work" | "self" | "timing" | "today";
export type QaTopicGroup = { id: QaTopicGroupId; categories: QaCategory[] };

// Display-only grouping for the app's first Q&A picker (2026-10-03 critique: 8 topics was
// too many to scan). The question bank (data/questionBank.json) and the web Q&A keep their
// own 8 categories; this only decides which of them sit together on one screen. Group
// names live in strings.qa.topicGroups, and inside a merged group the original category
// names become section labels.
const GROUP_CATEGORY_IDS: [QaTopicGroupId, string[]][] = [
  ["love", ["love", "family"]],
  ["work", ["career", "wealth"]],
  ["self", ["self", "wellbeing"]],
  ["timing", ["timing"]],
  ["today", ["daily"]],
];

const CATEGORIES = questionBank.categories as QaCategory[];

export const QA_TOPIC_GROUPS: QaTopicGroup[] = GROUP_CATEGORY_IDS.map(([id, categoryIds]) => ({
  id,
  categories: categoryIds
    .map((cid) => CATEGORIES.find((c) => c.id === cid))
    .filter((c): c is QaCategory => !!c),
})).filter((g) => g.categories.length > 0);

/** The one subcategory of a group that has nothing to narrow down (e.g. today), else null. */
export function onlySubcategory(group: QaTopicGroup): QaSubcategory | null {
  const subs = group.categories.flatMap((c) => c.subcategories);
  return subs.length === 1 ? subs[0] : null;
}
