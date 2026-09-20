import { registerRootComponent } from 'expo';

import App from './App';
import { applyQaPreset } from './dev/qaMode';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
//
// In a dev web session opened with ?qa=... (see dev/README.md), the persona preset (saved
// reading, language, concern) has to be written BEFORE the app reads storage, so registration
// waits for it. Release builds skip this branch entirely (`__DEV__` is false).
if (__DEV__) {
  applyQaPreset().finally(() => registerRootComponent(App));
} else {
  registerRootComponent(App);
}
