import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";

import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderQuote(ctx: TypeScriptRenderContext): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.quote;
}

export function renderSemicolon(ctx: TypeScriptRenderContext): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.renderSemicolon ? ";" : "";
}
