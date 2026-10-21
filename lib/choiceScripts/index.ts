/**
 * lib/choiceScripts/index.ts
 * ------------------------------------------------------------------
 * 고정 스크립트형 선택지 챗(flowVersion 4)의 모듈별 스크립트 조회.
 * 문구는 lib/choiceScripts/module3.ts 등에 사람이 써 둔 데이터다.
 * ------------------------------------------------------------------
 */

import type { ModuleScript } from "./types";
import { MODULE3_SCRIPT } from "./module3";
import { MODULE5_SCRIPT } from "./module5";
import { MODULE6_SCRIPT } from "./module6";
import { MODULE7_SCRIPT } from "./module7";
import { MODULE8_SCRIPT } from "./module8";
import { MODULE9_SCRIPT } from "./module9";
import { MODULE10_SCRIPT } from "./module10";
import { MODULE11_SCRIPT } from "./module11";
import { MODULE12_SCRIPT } from "./module12";

/** 모듈별 고정 스크립트. 지금은 모듈 3·5·6·7·8·9·10이 있다. */
const MODULE_SCRIPTS: Partial<Record<string, ModuleScript>> = {
  module3: MODULE3_SCRIPT,
  module5: MODULE5_SCRIPT,
  module6: MODULE6_SCRIPT,
  module7: MODULE7_SCRIPT,
  module8: MODULE8_SCRIPT,
  module9: MODULE9_SCRIPT,
  module10: MODULE10_SCRIPT,
  module11: MODULE11_SCRIPT,
  module12: MODULE12_SCRIPT,
};

/** 스크립트가 없는 모듈이나 알 수 없는 id면 undefined(호출부는 v2로 떨어진다). */
export function getModuleScript(moduleId?: string | null): ModuleScript | undefined {
  if (!moduleId || !Object.prototype.hasOwnProperty.call(MODULE_SCRIPTS, moduleId)) return undefined;
  return MODULE_SCRIPTS[moduleId];
}
