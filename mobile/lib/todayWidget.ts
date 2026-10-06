import type { TodayWidgetData } from "./todayWidgetData";

// Home screen widget bridge — web/default build: there is no widget, so both calls do nothing.
// The real ones are lib/todayWidget.ios.ts (expo-widgets) and lib/todayWidget.android.ts
// (react-native-android-widget); Metro picks them by platform extension.

export function updateTodayWidget(_data: TodayWidgetData): void {}

/** After "reset my data": the widget goes back to its "open the app" state. */
export function resetTodayWidget(_empty: TodayWidgetData): void {}
