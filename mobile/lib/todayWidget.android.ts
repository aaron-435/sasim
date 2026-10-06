import { createElement } from "react";
import { requestWidgetUpdate } from "react-native-android-widget";
import { ANDROID_WIDGET_NAME, TodayWidgetAndroid } from "../widgets/TodayWidgetAndroid";
import { saveTodayWidgetData, widgetDataForNow, type TodayWidgetData } from "./todayWidgetData";

// Android: the data is stored first, because the widget also redraws without the app
// (widgets/androidTaskHandler.tsx reads it back and drops a past day's rhythm).

function redraw(data: TodayWidgetData): void {
  requestWidgetUpdate({
    widgetName: ANDROID_WIDGET_NAME,
    renderWidget: () => createElement(TodayWidgetAndroid, { data: widgetDataForNow(data)! }),
  }).catch(() => {});
}

export function updateTodayWidget(data: TodayWidgetData): void {
  saveTodayWidgetData(data).then(() => redraw(data));
}

export function resetTodayWidget(empty: TodayWidgetData): void {
  saveTodayWidgetData(empty).then(() => redraw(empty));
}
