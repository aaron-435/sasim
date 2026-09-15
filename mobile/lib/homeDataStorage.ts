import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NormalizedSajuResult } from "./saju";

// Persists the onboarding result (nickname + saju reading) so a returning user lands
// straight on Home instead of re-entering their birth info every time the app is
// relaunched — until this existed, App.tsx's `homeData` was plain in-memory useState,
// so it reset on every cold start (2026-09-15, caught in live device testing).
const STORAGE_KEY = "fatesaid_home_data";

export type StoredHomeData = { nickname: string; sajuResult: NormalizedSajuResult };

export async function saveHomeData(data: StoredHomeData): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // best-effort — worst case a returning user re-onboards, same as before this existed
  }
}

export async function getStoredHomeData(): Promise<StoredHomeData | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredHomeData) : null;
  } catch {
    return null;
  }
}

export async function clearHomeData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort
  }
}
