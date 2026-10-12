// react-native-android-widget pins androidx.work:work-runtime 2.8.1, while another dependency
// pulls work-runtime-ktx 2.7.1. From 2.8.0 the ktx classes live inside work-runtime, so the two
// artifacts both define androidx.work.OneTimeWorkRequestKt and :app:checkReleaseDuplicateClasses
// fails (EAS build ea531556, 2026-10-12). Forcing one version for both removes the duplicate.
const { withProjectBuildGradle } = require("expo/config-plugins");

const MARKER = "// withWorkRuntimeAlign";
const SNIPPET = `
${MARKER}
allprojects {
  configurations.all {
    resolutionStrategy {
      force 'androidx.work:work-runtime:2.8.1'
      force 'androidx.work:work-runtime-ktx:2.8.1'
    }
  }
}
`;

module.exports = function withWorkRuntimeAlign(config) {
  return withProjectBuildGradle(config, (cfg) => {
    if (cfg.modResults.language !== "groovy") return cfg;
    if (!cfg.modResults.contents.includes(MARKER)) cfg.modResults.contents += SNIPPET;
    return cfg;
  });
};
