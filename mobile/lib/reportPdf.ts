import * as Sharing from "expo-sharing";
import { API_BASE_URL } from "../config";
import { track } from "./analytics";
import { getRevenueCatUserId } from "./purchases";

// Downloads a report as a PDF from the server (app/api/report-pdf — it verifies the purchase
// itself) and hands it to the OS share sheet, so the user can save it to Files, AirDrop it,
// email it, print it. No account or email needed: the report is POSTed from the device.
//
// expo-file-system and expo/fetch are imported lazily inside the function on purpose. This
// ships as an OTA update; if some installed binary ever lacked the native module, a static
// import would crash the whole app at load, while a failed dynamic import just reports
// "unsupported" here and leaves the rest of the app alone.

export type PdfFailure = "unsupported" | "not_purchased" | "unavailable" | "rate_limited" | "failed";
// `detail` is a short technical tail ("500 failed", "write: ...") that the alert appends so a device
// report says which step broke (2026-10-12: Android showed only the generic "failed" message).
export type PdfResult = { ok: true } | { ok: false; reason: PdfFailure; detail?: string };

/** "Fatesaid_<part>_<part>_<YYYY-MM-DD>.pdf" (parts: the reader's name, the report's name): what
 * the share sheet and the saved file are called. Characters the file systems reject are dropped,
 * spaces become underscores, and each part is capped so a long name cannot push the whole file
 * name past a limit. */
export function pdfFileName(parts: string[], now: Date = new Date()): string {
  const clean = (t: string) =>
    t
      .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/^[._]+|[._]+$/g, "")
      .slice(0, 24);
  const pad = (n: number) => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  return `${["Fatesaid", ...parts.map(clean).filter(Boolean), date].join("_")}.pdf`;
}

export async function exportReportPdf(payload: Record<string, unknown>, dialogTitle: string, nameParts: string[] = []): Promise<PdfResult> {
  let FileSystem: typeof import("expo-file-system");
  let expoFetch: typeof import("expo/fetch").fetch;
  try {
    FileSystem = await import("expo-file-system");
    expoFetch = (await import("expo/fetch")).fetch;
  } catch {
    return { ok: false, reason: "unsupported" };
  }

  const appUserId = await getRevenueCatUserId();
  if (!appUserId) return { ok: false, reason: "not_purchased" };

  let stage = "request";
  try {
    const res = await expoFetch(`${API_BASE_URL}/api/report-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, appUserId }),
    });
    if (!res.ok) {
      const code = await res
        .json()
        .then((j: { code?: string }) => j?.code)
        .catch(() => undefined);
      if (code === "not_purchased") return { ok: false, reason: "not_purchased" };
      if (code === "unavailable") return { ok: false, reason: "unavailable" };
      if (res.status === 429) return { ok: false, reason: "rate_limited" };
      return { ok: false, reason: "failed", detail: `${res.status}${code ? ` ${code}` : ""}` };
    }
    stage = "bytes";
    const bytes = await res.bytes();
    stage = "write";
    // A readable, stable name; a second export on the same day replaces the first file.
    const file = new FileSystem.File(FileSystem.Paths.cache, pdfFileName(nameParts));
    if (file.exists) file.delete();
    file.create();
    file.write(bytes);
    stage = "share";
    if (await Sharing.isAvailableAsync()) {
      track("share", { kind: "report_pdf" });
      await Sharing.shareAsync(file.uri, { mimeType: "application/pdf", UTI: "com.adobe.pdf", dialogTitle });
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, reason: "failed", detail: `${stage}: ${msg.slice(0, 100)}` };
  }
}

/** The localized message for a failed export, from the `pdf` string block. */
export function pdfErrorMessage(reason: PdfFailure, pdf: { errorUnsupported: string; errorNotPurchased: string; errorUnavailable: string; errorRateLimited: string; errorFailed: string }, detail?: string): string {
  const tail = detail ? `\n(${detail})` : "";
  return pdfErrorBase(reason, pdf) + tail;
}

function pdfErrorBase(reason: PdfFailure, pdf: { errorUnsupported: string; errorNotPurchased: string; errorUnavailable: string; errorRateLimited: string; errorFailed: string }): string {
  switch (reason) {
    case "unsupported":
      return pdf.errorUnsupported;
    case "not_purchased":
      return pdf.errorNotPurchased;
    case "unavailable":
      return pdf.errorUnavailable;
    case "rate_limited":
      return pdf.errorRateLimited;
    default:
      return pdf.errorFailed;
  }
}
