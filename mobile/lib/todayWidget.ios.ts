import TodayWidget, { type TodayWidgetProps } from "../widgets/TodayWidget";
import { nextLocalMidnight, saveTodayWidgetData, widgetDataForNow, type TodayWidgetData } from "./todayWidgetData";

// iOS: a two-entry timeline — today's rhythm now, then the "new day, open the app" line at
// local midnight, so the widget never shows yesterday's rhythm as today's.

function toProps(data: TodayWidgetData): TodayWidgetProps {
  const { eyebrow, rhythm, colorLabel, colorName, swatch, fallbackLine } = data;
  return { eyebrow, rhythm, colorLabel, colorName, swatch, fallbackLine };
}

export function updateTodayWidget(data: TodayWidgetData): void {
  saveTodayWidgetData(data);
  try {
    const stale = widgetDataForNow({ ...data, day: "" })!;
    TodayWidget.updateTimeline([
      { date: new Date(), props: toProps(data) },
      { date: nextLocalMidnight(), props: toProps(stale) },
    ]);
  } catch {
    // best-effort — a widget that misses one update is fine
  }
}

export function resetTodayWidget(empty: TodayWidgetData): void {
  saveTodayWidgetData(empty);
  try {
    TodayWidget.updateSnapshot(toProps(empty));
  } catch {
    // best-effort
  }
}
