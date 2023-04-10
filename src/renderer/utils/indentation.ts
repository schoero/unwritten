import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";

import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function renderIndentation(ctx: MarkupRenderContexts): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.indentation.repeat(ctx.indentation);
}
