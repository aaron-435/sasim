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
