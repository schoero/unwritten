import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";

import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderIndentation(ctx: MarkupRenderContexts | TypeScriptRenderContext): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.indentation.repeat(ctx.indentation);
}
