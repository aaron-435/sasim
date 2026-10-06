import AsyncStorage from "@react-native-async-storage/async-storage";
import type { OtherBirthPayload } from "../components/OtherBirthForm";
import type { Locale } from "./i18n/types";

// Compatibility reports, kept on the device (same reasoning as lib/reportStorage.ts: no account
// to look a paid report up by). One entry per other person, keyed by their birth moment:
//   - the free preview, so reopening it doesn't call the model again;
//   - the purchase's transaction id, saved the moment the purchase succeeds and BEFORE the paid
//     half is requested, so a failed generation can be retried without buying again (the server
//     accepts the same transaction for the same pair a few times);
//   - the paid half once generated. Only entries with it are listed under "My reports".
// The other person's birth data and name stay on this device; the server never stores them.
const STORAGE_KEY = "fatesaid_compat_reports";

export interface CompatFreePart {
  title: string;
  subtitle: string;
  meeting: { heading: string; body: string };
  gifts: { heading: string; body: string };
}

export interface CompatPaidPart {
  friction: { title: string; body: string }[];
  rhythm: { heading: string; body: string };
  closing: string;
}

export interface SavedCompatReport {
  pairKey: string;
  locale: Locale;
  otherName: string;
  other: OtherBirthPayload;
  savedAt: string;
  free: CompatFreePart;
  transactionId: string | null;
  paid: CompatPaidPart | null;
}

/** Same birth moment = same chart = same report; name and city are left out like on the server.
 * Not keyed by language: one report per person (a purchase covers the person, not a language). */
export function compatPairKey(other: OtherBirthPayload): string {
  const time = other.birthHour == null ? "x" : `${other.birthHour}:${other.birthMinute ?? 0}`;
  return `${other.birthYear}-${other.birthMonth}-${other.birthDay}-${time}-${other.isFemale ? "f" : "m"}`;
}

async function readAll(): Promise<Record<string, SavedCompatReport>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, SavedCompatReport>) : {};
  } catch {
    return {};
  }
}

export async function getSavedCompatReport(pairKey: string): Promise<SavedCompatReport | null> {
  return (await readAll())[pairKey] ?? null;
}

/** Merges into the entry for this pair (creating it), so each step can save just its part. */
export async function saveCompatReport(entry: Omit<SavedCompatReport, "savedAt" | "transactionId" | "paid"> & Partial<Pick<SavedCompatReport, "transactionId" | "paid">>): Promise<void> {
  const all = await readAll();
  const prev = all[entry.pairKey];
  all[entry.pairKey] = {
    ...prev,
    ...entry,
    transactionId: entry.transactionId ?? prev?.transactionId ?? null,
    paid: entry.paid ?? prev?.paid ?? null,
    savedAt: new Date().toISOString(),
  };
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // best-effort — the report still shows this session
  }
}

/** Purchased reports, newest first. */
export async function listPurchasedCompatReports(): Promise<SavedCompatReport[]> {
  const all = await readAll();
  return Object.values(all)
    .filter((r) => r.paid)
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function clearSavedCompatReports(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort
  }
}
