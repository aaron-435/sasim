import AsyncStorage from "@react-native-async-storage/async-storage";

// Whether the reader has already turned a page in each report reader (ReportPager's
// first-page "swipe to turn" hint). Kept per report kind, so the in-depth report and the
// year-ahead report each show it once.
export type ReaderHintId = "deep" | "year";

const keyFor = (id: ReaderHintId) => `fatesaid_reader_hint_seen_${id}`;

export async function hasSeenReaderHint(id: ReaderHintId): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(keyFor(id))) === "1";
  } catch {
    // Storage unavailable: don't nag on every open.
    return true;
  }
}

export async function markReaderHintSeen(id: ReaderHintId): Promise<void> {
  try {
    await AsyncStorage.setItem(keyFor(id), "1");
  } catch {
    // best-effort — worst case the hint shows once more
  }
}
