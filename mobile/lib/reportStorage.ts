import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ReportContent } from "../screens/ReportScreen";
import type { ChatExtract } from "../screens/ChatScreen";
import type { QuizDiagnosis } from "../screens/QuizScreen";

// Generated deep reports, kept on the device so a paid (or about-to-be-paid) report can be
// reopened. 2026-09-19 (Impeccable critique of ReportScreen): the report only existed in
// memory right after the AI chat — one back press and the GPT-generated report was gone,
// including for someone who had just bought it. The server stores it too
// (report_results), but the app never reads that back, and there is no account to key a
// server lookup on; a local copy is the smallest fix that works without a login.
//
// One report per module (the latest wins): retaking a module replaces its saved report.
const STORAGE_KEY = "fatesaid_saved_reports";

export type SavedReport = {
  moduleId: string;
  moduleTitle: string;
  savedAt: string; // ISO timestamp
  quizDiagnosis: QuizDiagnosis;
  chatExtract: ChatExtract | null;
  content: ReportContent;
};

async function readAll(): Promise<Record<string, SavedReport>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, SavedReport>) : {};
  } catch {
    return {};
  }
}

export async function saveReport(report: Omit<SavedReport, "savedAt">): Promise<void> {
  const all = await readAll();
  all[report.moduleId] = { ...report, savedAt: new Date().toISOString() };
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // best-effort — the report still shows for this session; it just can't be reopened later
  }
}

/** Newest first. */
export async function listSavedReports(): Promise<SavedReport[]> {
  const all = await readAll();
  return Object.values(all).sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function clearSavedReports(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort
  }
}
