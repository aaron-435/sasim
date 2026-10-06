import AsyncStorage from "@react-native-async-storage/async-storage";

// Last-asked Q&A question, shown on Home as a "최근 질문" recap card. There's no
// server-side conversation thread to actually resume (QAScreen's /api/qa-answer call is
// stateless per-question, and `messages` is in-memory only — see QAScreen.tsx) — this
// just remembers the single most recent question+answer locally so returning users have
// something to revisit instead of a blank slate. Same client-side-only limitation as
// qaQuota.ts's usage counter.
const STORAGE_KEY = "fatesaid_qa_last_question";

export type LastQuestion = {
  question: string;
  answerPreview: string;
  answeredAt: string; // ISO timestamp
};

export async function saveLastQuestion(question: string, answerLines: string[]): Promise<void> {
  const entry: LastQuestion = {
    question,
    answerPreview: answerLines[0] ?? "",
    answeredAt: new Date().toISOString(),
  };
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // best-effort — losing this just means the Home recap card falls back to empty state
  }
}

export async function getLastQuestion(): Promise<LastQuestion | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LastQuestion) : null;
  } catch {
    return null;
  }
}

// Year Wrapped (2026-10-06): how many answered questions fell in each Q&A topic, per local
// calendar year, so the "what you asked about most" card can be built on this device alone.
// Topic ids only (lib/qaTopicGroups.ts), never the question text. Cleared by Settings' reset.
const TOPIC_COUNTS_KEY = "fatesaid_qa_topic_counts";

type TopicCounts = Record<string, Record<string, number>>; // year → topic → count

async function readTopicCounts(): Promise<TopicCounts> {
  try {
    const raw = await AsyncStorage.getItem(TOPIC_COUNTS_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    return parsed && typeof parsed === "object" ? (parsed as TopicCounts) : {};
  } catch {
    return {};
  }
}

export async function recordQaTopic(topic: string, at = new Date()): Promise<void> {
  try {
    const counts = await readTopicCounts();
    const year = String(at.getFullYear());
    const forYear = counts[year] && typeof counts[year] === "object" ? counts[year] : {};
    forYear[topic] = (Number(forYear[topic]) || 0) + 1;
    counts[year] = forYear;
    await AsyncStorage.setItem(TOPIC_COUNTS_KEY, JSON.stringify(counts));
  } catch {
    // best-effort — a lost count only thins out the Wrapped topic card
  }
}

export type QaTopicSummary = { topic: string; count: number; total: number };

/** The most-asked topic of a calendar year (ties go to the topic listed first), or null when
 * nothing was asked that year on this device. */
export async function getQaTopicSummary(year: number, topicOrder: readonly string[]): Promise<QaTopicSummary | null> {
  const forYear = (await readTopicCounts())[String(year)] ?? {};
  let best: QaTopicSummary | null = null;
  let total = 0;
  for (const topic of topicOrder) {
    const count = Math.max(0, Math.floor(Number(forYear[topic]) || 0));
    total += count;
    if (count > 0 && (!best || count > best.count)) best = { topic, count, total: 0 };
  }
  return best ? { ...best, total } : null;
}

export async function clearQaTopicCounts(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TOPIC_COUNTS_KEY);
  } catch {
    // best-effort
  }
}
