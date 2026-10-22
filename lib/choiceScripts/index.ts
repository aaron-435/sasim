/**
 * lib/choiceScripts/index.ts
 * ------------------------------------------------------------------
 * 고정 스크립트형 선택지 챗(flowVersion 4)의 모듈별 스크립트 조회.
 * 문구는 lib/choiceScripts/module3.ts 등에 사람이 써 둔 데이터다.
 * ------------------------------------------------------------------
 */

import type { ModuleScript } from "./types";
import { MODULE1_SCRIPT } from "./module1";
import { MODULE2_SCRIPT } from "./module2";
import { MODULE3_SCRIPT } from "./module3";
import { MODULE4_SCRIPT } from "./module4";
import { MODULE5_SCRIPT } from "./module5";
import { MODULE6_SCRIPT } from "./module6";
import { MODULE7_SCRIPT } from "./module7";
import { MODULE8_SCRIPT } from "./module8";
import { MODULE9_SCRIPT } from "./module9";
import { MODULE10_SCRIPT } from "./module10";
import { MODULE11_SCRIPT } from "./module11";
import { MODULE12_SCRIPT } from "./module12";
import { MODULE1_SCRIPT_EN } from "./en/module1";
import { MODULE1_SCRIPT_ES } from "./es/module1";
import { MODULE2_SCRIPT_EN } from "./en/module2";
import { MODULE2_SCRIPT_ES } from "./es/module2";
import { MODULE3_SCRIPT_EN } from "./en/module3";
import { MODULE3_SCRIPT_ES } from "./es/module3";
import { MODULE4_SCRIPT_EN } from "./en/module4";
import { MODULE4_SCRIPT_ES } from "./es/module4";
import { MODULE5_SCRIPT_EN } from "./en/module5";
import { MODULE5_SCRIPT_ES } from "./es/module5";
import { MODULE6_SCRIPT_EN } from "./en/module6";
import { MODULE6_SCRIPT_ES } from "./es/module6";
import { MODULE7_SCRIPT_EN } from "./en/module7";
import { MODULE7_SCRIPT_ES } from "./es/module7";
import { MODULE8_SCRIPT_EN } from "./en/module8";
import { MODULE8_SCRIPT_ES } from "./es/module8";
import { MODULE9_SCRIPT_EN } from "./en/module9";
import { MODULE9_SCRIPT_ES } from "./es/module9";
import { MODULE10_SCRIPT_EN } from "./en/module10";
import { MODULE10_SCRIPT_ES } from "./es/module10";
import { MODULE11_SCRIPT_EN } from "./en/module11";
import { MODULE11_SCRIPT_ES } from "./es/module11";
import { MODULE12_SCRIPT_EN } from "./en/module12";
import { MODULE12_SCRIPT_ES } from "./es/module12";

/** 모듈별 고정 스크립트. 12개 모듈 모두 있다. */
const MODULE_SCRIPTS: Partial<Record<string, ModuleScript>> = {
  module1: MODULE1_SCRIPT,
  module2: MODULE2_SCRIPT,
  module3: MODULE3_SCRIPT,
  module4: MODULE4_SCRIPT,
  module5: MODULE5_SCRIPT,
  module6: MODULE6_SCRIPT,
  module7: MODULE7_SCRIPT,
  module8: MODULE8_SCRIPT,
  module9: MODULE9_SCRIPT,
  module10: MODULE10_SCRIPT,
  module11: MODULE11_SCRIPT,
  module12: MODULE12_SCRIPT,
};

/** 2026-10-22: 영어·스페인어 스크립트. 모듈 파일이 생기는 대로 여기에 등록한다. 없으면 v2로 떨어진다. */
const MODULE_SCRIPTS_EN: Partial<Record<string, ModuleScript>> = {
  module1: MODULE1_SCRIPT_EN,
  module2: MODULE2_SCRIPT_EN,
  module3: MODULE3_SCRIPT_EN,
  module4: MODULE4_SCRIPT_EN,
  module5: MODULE5_SCRIPT_EN,
  module6: MODULE6_SCRIPT_EN,
  module7: MODULE7_SCRIPT_EN,
  module8: MODULE8_SCRIPT_EN,
  module9: MODULE9_SCRIPT_EN,
  module10: MODULE10_SCRIPT_EN,
  module11: MODULE11_SCRIPT_EN,
  module12: MODULE12_SCRIPT_EN,
};
const MODULE_SCRIPTS_ES: Partial<Record<string, ModuleScript>> = {
  module1: MODULE1_SCRIPT_ES,
  module2: MODULE2_SCRIPT_ES,
  module3: MODULE3_SCRIPT_ES,
  module4: MODULE4_SCRIPT_ES,
  module5: MODULE5_SCRIPT_ES,
  module6: MODULE6_SCRIPT_ES,
  module7: MODULE7_SCRIPT_ES,
  module8: MODULE8_SCRIPT_ES,
  module9: MODULE9_SCRIPT_ES,
  module10: MODULE10_SCRIPT_ES,
  module11: MODULE11_SCRIPT_ES,
  module12: MODULE12_SCRIPT_ES,
};

/** 스크립트가 없는 모듈·언어나 알 수 없는 id면 undefined(호출부는 v2로 떨어진다). */
export function getModuleScript(moduleId?: string | null, locale?: string | null): ModuleScript | undefined {
  const table = locale === "en" ? MODULE_SCRIPTS_EN : locale === "es" ? MODULE_SCRIPTS_ES : MODULE_SCRIPTS;
  if (!moduleId || !Object.prototype.hasOwnProperty.call(table, moduleId)) return undefined;
  return table[moduleId];
}
