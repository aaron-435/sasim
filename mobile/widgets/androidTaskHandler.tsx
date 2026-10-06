import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { getDictionary } from "../lib/i18n";
import type { Locale } from "../lib/i18n/types";
import { loadTodayWidgetData, widgetDataForNow } from "../lib/todayWidgetData";
import { TodayWidgetAndroid } from "./TodayWidgetAndroid";

// Headless JS for the Android widget: the system asks for a draw when the widget is added,
// resized or on its update period (app.json, 30 min). It redraws from the stored data
// (lib/todayWidgetData.ts); a past day shows the "open the app" line. Taps are OPEN_URI
// (fatesaid://fortune), handled by the system, so WIDGET_CLICK never reaches here.
export async function widgetTaskHandler({ widgetAction, renderWidget }: WidgetTaskHandlerProps): Promise<void> {
  if (widgetAction === "WIDGET_DELETED" || widgetAction === "WIDGET_CLICK") return;
  const stored = widgetDataForNow(await loadTodayWidgetData());
  // Never-opened widget: the app language if one was picked (LocaleContext's key), else English.
  const savedLocale = await AsyncStorage.getItem("fatesaid_locale").catch(() => null);
  const strings = getDictionary((savedLocale ?? undefined) as Locale | undefined);
  const data = stored ?? {
    day: "",
    eyebrow: strings.widget.eyebrow,
    rhythm: null,
    colorLabel: strings.elementColor.title,
    colorName: null,
    swatch: null,
    fallbackLine: strings.widget.emptyLine,
    staleLine: strings.widget.staleLine,
  };
  renderWidget(<TodayWidgetAndroid data={data} />);
}
