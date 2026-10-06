import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config";
import type { CompatibilityResult } from "./compatibility";
import type { SajuType } from "./sajuType";
import type { Locale } from "./i18n/types";

// Friend-compatibility invites made on this device (SPEC 2026-10-05 §6). The server keeps a row
// per link for 30 days; the owner token it returned once is the only way to read the friend's
// answer, so it lives here. Answered results are copied onto the device so they outlast the link.
const STORAGE_KEY = "fatesaid_invites";
const MAX_KEPT = 30;

export type InviteResult = {
  other: { sajuType: SajuType | null; dominantElement: string | null; elements: Record<string, number> };
  compatibility: CompatibilityResult | null;
};

export interface SavedInvite {
  code: string;
  ownerToken: string;
  url: string;
  createdAt: string;
  expiresAt: string;
  status: "open" | "answered";
  friendName?: string | null;
  result?: InviteResult | null;
}

async function readAll(): Promise<SavedInvite[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedInvite[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(list: SavedInvite[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_KEPT)));
  } catch {
    // Best effort, like the other device stores.
  }
}

/** Newest first; open links past their expiry are dropped (the server has nothing left to give). */
export async function getSavedInvites(): Promise<SavedInvite[]> {
  const now = Date.now();
  return (await readAll()).filter((i) => i.status === "answered" || Date.parse(i.expiresAt) > now);
}

export async function createInvite(params: { senderName: string; senderDayMaster: string; locale: Locale }): Promise<SavedInvite> {
  const res = await fetch(`${API_BASE_URL}/api/invites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  if (!res.ok || typeof json?.code !== "string") throw new Error(json?.code ?? String(res.status));
  const invite: SavedInvite = {
    code: json.code,
    ownerToken: json.ownerToken,
    url: json.url,
    createdAt: new Date().toISOString(),
    expiresAt: json.expiresAt,
    status: "open",
  };
  await writeAll([invite, ...(await readAll())]);
  return invite;
}

/**
 * Asks the server about the still-open links and stores any answers. Returns the updated list,
 * or the stored one when the server can't be reached (answers already on the device still show).
 */
export async function refreshInvites(): Promise<SavedInvite[]> {
  const list = await getSavedInvites();
  const open = list.filter((i) => i.status === "open").slice(0, 20);
  if (open.length === 0) return list;
  try {
    const res = await fetch(`${API_BASE_URL}/api/invites/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: open.map(({ code, ownerToken }) => ({ code, ownerToken })) }),
    });
    if (!res.ok) return list;
    const json = (await res.json()) as { invites?: { code: string; status: string; friendName?: string | null; result?: InviteResult | null }[] };
    const byCode = new Map((json.invites ?? []).map((i) => [i.code, i]));
    const next = list.flatMap((item): SavedInvite[] => {
      const update = item.status === "open" ? byCode.get(item.code) : undefined;
      if (!update) return [item];
      if (update.status === "answered" && update.result?.compatibility) {
        return [{ ...item, status: "answered", friendName: update.friendName ?? null, result: update.result }];
      }
      // Gone from the server (expired and cleaned up, or never saved): nothing left to wait for.
      if (update.status === "missing" || update.status === "expired") return [];
      return [item];
    });
    await writeAll(next);
    return next;
  } catch {
    return list;
  }
}

export async function clearSavedInvites(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
