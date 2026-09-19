import * as Sharing from "expo-sharing";
import { API_BASE_URL } from "../config";
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
export type PdfResult = { ok: true } | { ok: false; reason: PdfFailure };

export async function exportReportPdf(payload: Record<string, unknown>, dialogTitle: string): Promise<PdfResult> {
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
      return { ok: false, reason: "failed" };
    }
    const bytes = await res.bytes();
    const file = new FileSystem.File(FileSystem.Paths.cache, `fatesaid-report-${Date.now()}.pdf`);
    file.create();
    file.write(bytes);
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri, { mimeType: "application/pdf", UTI: "com.adobe.pdf", dialogTitle });
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

/** The localized message for a failed export, from the `pdf` string block. */
export function pdfErrorMessage(reason: PdfFailure, pdf: { errorUnsupported: string; errorNotPurchased: string; errorUnavailable: string; errorRateLimited: string; errorFailed: string }): string {
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
