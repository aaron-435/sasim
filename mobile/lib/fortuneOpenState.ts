import AsyncStorage from "@react-native-async-storage/async-storage";

// Tracks whether the user has already "opened" today's daily fortune — added 2026-09-16
// to turn FortuneScreen's daily tab from an instant info-dump into a once-a-day reveal
// ritual (see FortuneScreen.tsx's seal card). Keyed off the API's own `daily.date` (KST-
// anchored, from app/api/dailyFortune) rather than a client-computed "today", so there's
// no risk of the client and server disagreeing about which day it currently is.
const STORAGE_KEY = "fatesaid_fortune_last_opened_date";

export async function isFortuneOpened(dateIso: string): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(STORAGE_KEY)) === dateIso;
  } catch {
    return false;
  }
}

export async function markFortuneOpened(dateIso: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, dateIso);
  } catch {
    // best-effort — worst case the seal reappears next visit, harmless
  }
}
