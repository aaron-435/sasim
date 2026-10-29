// Rotating ElementMap backdrop for the F3/F6 short-form renderers. The svg is the
// app's own drawing (common.mts elementMap captures it off-camera from mobile-web),
// scaled up, not redrawn. One revolution per 60s — a touch faster than the app's
// 90s so the loop reads as alive in a 7-12s clip.
import { COLORS } from "../../mobile/theme/colors.ts";

export interface ArtLayerOpts {
  /** 0-1: background veil over the art for text contrast. Default 0. */
  dim?: number;
}

/** 540x960 CSS + markup: oversized art just above middle, slowly spinning. */
export function artLayerHtml(svg: string, opts?: ArtLayerOpts): { css: string; html: string } {
  const dim = Math.min(1, Math.max(0, opts?.dim ?? 0));
  const css = `
  #art-bg { position: fixed; inset: 0; background: ${COLORS.background}; overflow: hidden; }
  #art-bg .art-spin { position: absolute; left: 50%; top: 40%; width: 648px; height: 648px;
    transform: translate(-50%, -50%); animation: artspin 60s linear infinite; }
  #art-bg .art-spin svg { width: 100%; height: 100%; display: block; }
  #art-bg .art-dim { position: absolute; inset: 0; background: ${COLORS.background}; opacity: ${dim}; }
  @keyframes artspin { from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); } }`;
  const html = `<div id="art-bg" aria-hidden="true"><div class="art-spin">${svg}</div><div class="art-dim"></div></div>`;
  return { css, html };
}
