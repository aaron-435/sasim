import AsyncStorage from "@react-native-async-storage/async-storage";
import type { QuizAnswerRecord } from "./quiz/quizProfile";
import type { Locale } from "./i18n/types";

// Quiz resume (2026-10-17): the 30-question runner used to lose every answer on back/close.
// One entry per module, kept only on this device. Answer prompts/labels are written in the
// language the test was taken in, so a saved run is only offered back in that same language.
// Cleared when the run finishes or is restarted. (Chat resume is out of scope: it needs a
// server-side session.)
const PREFIX = "fatesaid_quiz_progress_";

type Saved = { locale: Locale; answers: QuizAnswerRecord[]; savedAt: string };

async function read(moduleId: string): Promise<Saved | null> {
  try {
    const raw = await AsyncStorage.getItem(PREFIX + moduleId);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Saved;
    if (!parsed || !Array.isArray(parsed.answers)) return null;
    return parsed;
  } catch {
    return null; // storage unavailable or corrupt — start fresh
  }
}

/** Saved answers for this module in this language, or [] when there is nothing to resume. */
export async function loadQuizProgress(moduleId: string, locale: Locale): Promise<QuizAnswerRecord[]> {
  const saved = await read(moduleId);
  return saved && saved.locale === locale ? saved.answers : [];
}

export async function saveQuizProgress(moduleId: string, locale: Locale, answers: QuizAnswerRecord[]): Promise<void> {
  try {
    await AsyncStorage.setItem(PREFIX + moduleId, JSON.stringify({ locale, answers, savedAt: new Date().toISOString() } satisfies Saved));
  } catch {
    // best-effort — losing a resume point must never block the quiz
  }
}

export async function clearQuizProgress(moduleId: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(PREFIX + moduleId);
  } catch {
    // best-effort
  }
}

/** moduleId -> number of questions already answered, for the module list. */
export async function loadAllQuizProgress(moduleIds: string[], locale: Locale): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  await Promise.all(
    moduleIds.map(async (id) => {
      const answers = await loadQuizProgress(id, locale);
      if (answers.length > 0) out[id] = answers.length;
    }),
  );
  return out;
}
