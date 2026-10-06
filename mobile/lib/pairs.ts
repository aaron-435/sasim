import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config";
import type { CompatRelation } from "./compatibility";

// Couple mode (SPEC 2026-10-05 §7): this device's one link to a partner. The server keeps the row
// (repo root lib/pairs.ts); the token it returned once is the only way to read "today, the two of
// you" or to unlink, so it lives here. One pair per device — making a new code means unlinking first.
const STORAGE_KEY = "fatesaid_pair";

export interface SavedPair {
  code: string;
  token: string;
  /** "pending" until the partner types the code in (only the side that made it waits). */
  status: "pending" | "linked";
  partnerName: string | null;
  codeExpiresAt?: string;
}

export type CoupleDaily =
  | { kind: "today"; date: string; partnerName: string; self: { relation: CompatRelation; pillarIndex: number }; partner: { relation: CompatRelation } }
  | { kind: "pending"; codeExpiresAt: string | null }
  | { kind: "locked"; partnerName: string | null }
  | { kind: "gone" }
  | { kind: "error" };

/** "abcdefgh" → "abcd-efgh", easier to read aloud and type. */
export function formatPairCode(code: string): string {
  return code.length === 8 ? `${code.slice(0, 4)}-${code.slice(4)}` : code;
}

export async function getSavedPair(): Promise<SavedPair | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedPair) : null;
  } catch {
    return null;
  }
}

async function savePair(pair: SavedPair | null): Promise<void> {
  try {
    if (pair) await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pair));
    else await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // Best effort, like the other device stores.
  }
}

type Me = { name: string; dayMaster: string; dayBranch: string | null; appUserId: string | null };

async function post(path: string, body: unknown): Promise<{ ok: boolean; status: number; json: Record<string, unknown> }> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let json: Record<string, unknown> = {};
  try {
    json = await res.json();
  } catch {
    // keep {}
  }
  return { ok: res.ok, status: res.status, json };
}

export async function createPairCode(me: Me): Promise<SavedPair> {
  const { ok, json } = await post("/api/pairs", { op: "create", ...me });
  if (!ok || typeof json.code !== "string" || typeof json.token !== "string") throw new Error(String(json.code ?? "failed"));
  const pair: SavedPair = { code: json.code, token: json.token, status: "pending", partnerName: null, codeExpiresAt: json.codeExpiresAt as string };
  await savePair(pair);
  return pair;
}

/** Throws the server's error code ("not_found", "already_joined", "self", …) on failure. */
export async function joinPair(code: string, me: Me): Promise<SavedPair> {
  const { ok, json } = await post("/api/pairs", { op: "join", code, ...me });
  if (!ok || typeof json.token !== "string") throw new Error(String(json.code ?? "failed"));
  const pair: SavedPair = { code: json.code as string, token: json.token, status: "linked", partnerName: (json.partnerName as string) || null };
  await savePair(pair);
  return pair;
}

/** Unlinks on the server and forgets it here. The local copy goes even if the server can't be
 * reached — the partner's card then lingers until the next unlink attempt or their own unlink. */
export async function unlinkPair(): Promise<boolean> {
  const pair = await getSavedPair();
  if (!pair) return true;
  let serverOk = false;
  try {
    const { ok, status } = await post("/api/pairs", { op: "unlink", code: pair.code, token: pair.token });
    serverOk = ok || status === 404;
  } catch {
    serverOk = false;
  }
  if (serverOk) await savePair(null);
  return serverOk;
}

export async function fetchCoupleDaily(): Promise<CoupleDaily | null> {
  const pair = await getSavedPair();
  if (!pair) return null;
  try {
    const { ok, status, json } = await post("/api/coupleDaily", { code: pair.code, token: pair.token });
    if (ok) {
      const partnerName = (json.partnerName as string) || pair.partnerName || "";
      if (pair.status !== "linked" || pair.partnerName !== partnerName) await savePair({ ...pair, status: "linked", partnerName });
      return { kind: "today", date: json.date as string, partnerName, self: json.self as never, partner: json.partner as never };
    }
    if (status === 404) {
      // The partner unlinked (or an unused code ran out): nothing left to show on either side.
      await savePair(null);
      return { kind: "gone" };
    }
    if (status === 409) return { kind: "pending", codeExpiresAt: (json.codeExpiresAt as string) ?? pair.codeExpiresAt ?? null };
    if (status === 403) {
      const partnerName = (json.partnerName as string) || null;
      if (partnerName && (pair.status !== "linked" || pair.partnerName !== partnerName)) await savePair({ ...pair, status: "linked", partnerName });
      return { kind: "locked", partnerName: partnerName ?? pair.partnerName };
    }
    return { kind: "error" };
  } catch {
    return { kind: "error" };
  }
}

/** Device reset: unlink on the server too, so the partner's card goes away. */
export async function clearPair(): Promise<void> {
  if (!(await unlinkPair())) await savePair(null);
}
