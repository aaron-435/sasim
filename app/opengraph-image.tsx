import { ImageResponse } from "next/og";

// Link-preview image (Instagram / KakaoTalk / X / iMessage). The old metadata pointed at
// /og-image.png, a file that never existed, so shared links had no picture at all.
// Generated on demand so it needs no binary asset in the repo. The default font has no
// Hangul, so the card is English — the paid-ads audience is EN/ES first.
export const runtime = "edge";
export const alt = "Fatesaid — your birth chart, read as the rhythm you're in now";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#122019",
          color: "#D9C9A3",
          padding: "72px 84px",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#6FA98B" }}>FATESAID</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.1, fontFamily: "serif" }}>Your birth chart, read as</div>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.1, fontFamily: "serif" }}>{"the rhythm you're in now"}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", padding: "14px 30px", borderRadius: 14, background: "#6FA98B", color: "#0F1A15", fontSize: 30, fontWeight: 700 }}>
            See my chart, free
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9C9277" }}>Calculated from real calendar data</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
