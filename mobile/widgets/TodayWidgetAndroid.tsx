import { FlexWidget, TextWidget } from "react-native-android-widget";
import type { TodayWidgetData } from "../lib/todayWidgetData";

// Android home screen widget "Today's rhythm" (TODO 12) — same content as the iOS one
// (widgets/TodayWidget.tsx): today's rhythm name + the balancing element color, free scope
// only. Rendered by the headless task handler (widgets/androidTaskHandler.tsx) and by
// lib/todayWidget.android.ts when Home loads. A tap opens today's fortune (fatesaid://fortune).
// Colors: Celadon & Hanji (theme/colors.ts). App fonts aren't registered with the widget
// plugin, so text uses the system font.

const BG = "#122019";
const HEADLINE = "#D9C9A3";
const SUB = "#9C9277";
const ACCENT = "#6FA98B";

export const ANDROID_WIDGET_NAME = "TodayWidget";

export function TodayWidgetAndroid({ data }: { data: TodayWidgetData }) {
  return (
    <FlexWidget
      clickAction="OPEN_URI"
      clickActionData={{ uri: "fatesaid://fortune" }}
      accessibilityLabel={data.rhythm ? `${data.eyebrow}: ${data.rhythm}` : data.fallbackLine}
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor: BG,
        borderRadius: 20,
        padding: 16,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <FlexWidget style={{ flexDirection: "column", width: "match_parent" }}>
        <TextWidget text={data.eyebrow} style={{ fontSize: 12, fontWeight: "600", color: ACCENT }} />
        <TextWidget
          text={data.rhythm ?? data.fallbackLine}
          maxLines={data.rhythm ? 2 : 4}
          truncate="END"
          style={{ fontSize: data.rhythm ? 20 : 14, fontFamily: "serif", color: HEADLINE, marginTop: 4 }}
        />
      </FlexWidget>
      {data.rhythm && data.colorName && data.swatch ? (
        <FlexWidget style={{ flexDirection: "row", alignItems: "center" }}>
          <FlexWidget style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: data.swatch as `#${string}` }} />
          <FlexWidget style={{ flexDirection: "column", marginLeft: 8 }}>
            <TextWidget text={data.colorLabel} maxLines={1} truncate="END" style={{ fontSize: 10, color: SUB }} />
            <TextWidget text={data.colorName} maxLines={1} truncate="END" style={{ fontSize: 13, fontWeight: "500", color: HEADLINE }} />
          </FlexWidget>
        </FlexWidget>
      ) : null}
    </FlexWidget>
  );
}
