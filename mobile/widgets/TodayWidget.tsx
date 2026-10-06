import { Ellipse, HStack, Spacer, Text, VStack } from "@expo/ui/swift-ui";
import { containerBackground, font, foregroundStyle, frame, lineLimit, minimumScaleFactor, widgetURL } from "@expo/ui/swift-ui/modifiers";
import { createWidget, type WidgetEnvironment } from "expo-widgets";

// iOS home screen widget "Today's rhythm" (TODO 12, 2026-10-06): today's rhythm name and the
// balancing element color — the same two things a free user sees on Home, nothing from the
// subscriber reading. Tapping opens today's fortune (fatesaid://fortune, routed in App.tsx).
//
// The 'widget' function runs in an isolated runtime (expo-widgets docs): no hooks, no app
// imports, no module-scope values — every color and string arrives through props or is
// written inline below. Props are written by lib/todayWidget.ios.ts from HomeScreen.
// Colors are the Celadon & Hanji values from theme/colors.ts (inlined; keep in step). App
// fonts aren't bundled into the widget extension, so it uses the system serif/sans pair.

export type TodayWidgetProps = {
  eyebrow: string;
  /** null = no reading for this day yet (first install, or the day rolled over). */
  rhythm: string | null;
  colorLabel: string;
  colorName: string | null;
  swatch: string | null;
  fallbackLine: string;
};

const TodayWidget = (props: TodayWidgetProps, environment: WidgetEnvironment) => {
  "widget";
  const bg = "#122019";
  const headline = "#D9C9A3";
  const sub = "#9C9277";
  const accent = "#6FA98B";
  const small = environment.widgetFamily === "systemSmall";
  const root = [
    containerBackground(bg, "widget"),
    widgetURL("fatesaid://fortune"),
    frame({ maxWidth: 10000, maxHeight: 10000, alignment: "topLeading" }),
  ];

  if (!props.rhythm) {
    return (
      <VStack alignment="leading" spacing={6} modifiers={root}>
        <Text modifiers={[font({ size: 12, weight: "semibold" }), foregroundStyle(accent)]}>{props.eyebrow}</Text>
        <Spacer />
        <Text modifiers={[font({ size: 14, design: "serif" }), foregroundStyle(headline), lineLimit(4)]}>{props.fallbackLine}</Text>
      </VStack>
    );
  }

  return (
    <VStack alignment="leading" spacing={4} modifiers={root}>
      <Text modifiers={[font({ size: 12, weight: "semibold" }), foregroundStyle(accent)]}>{props.eyebrow}</Text>
      <Text modifiers={[font({ size: small ? 20 : 24, design: "serif" }), foregroundStyle(headline), lineLimit(2), minimumScaleFactor(0.8)]}>
        {props.rhythm}
      </Text>
      <Spacer />
      {props.colorName && props.swatch ? (
        <HStack spacing={8}>
          <Ellipse modifiers={[foregroundStyle(props.swatch), frame({ width: small ? 22 : 26, height: small ? 22 : 26 })]} />
          <VStack alignment="leading" spacing={1}>
            <Text modifiers={[font({ size: 10 }), foregroundStyle(sub), lineLimit(1)]}>{props.colorLabel}</Text>
            <Text modifiers={[font({ size: 13, weight: "medium" }), foregroundStyle(headline), lineLimit(1), minimumScaleFactor(0.8)]}>{props.colorName}</Text>
          </VStack>
        </HStack>
      ) : null}
    </VStack>
  );
};

export default createWidget("TodayWidget", TodayWidget);
