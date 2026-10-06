import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

import App from './App';
import { applyQaPreset } from './dev/qaMode';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
//
// In a dev web session opened with ?qa=... (see dev/README.md), the persona preset (saved
// reading, language, concern) has to be written BEFORE the app reads storage, so registration
// waits for it. Release builds skip this branch entirely (`__DEV__` is false).
// Android home screen widget (TODO 12): the headless task that draws it when the system asks.
// Required lazily so web and iOS never load the Android-only module.
if (Platform.OS === 'android') {
  const { registerWidgetTaskHandler } = require('react-native-android-widget');
  registerWidgetTaskHandler(require('./widgets/androidTaskHandler').widgetTaskHandler);
}

if (__DEV__) {
  applyQaPreset().finally(() => registerRootComponent(App));
} else {
  registerRootComponent(App);
}
