import { PLAY_STORE_URL } from "@/lib/jsonLd";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Google Play link plus an honest "iOS soon" line. Swap the note for an App Store link once iOS 1.2.0 is approved. */
export default function AppInstall({ t, align = "start" }: { t: Dictionary; align?: "start" | "center" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: 8, marginTop: 16 }}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", background: "#6FA98B", color: "#0F1A15", borderRadius: 12, padding: "0 22px", minHeight: 48, fontSize: 15, fontWeight: 700, textDecoration: "none" }}
      >
        {t.common.playCta}
      </a>
      <span style={{ fontSize: 13, opacity: 0.75 }}>{t.common.iosSoon}</span>
    </div>
  );
}
