import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";


export function renderIndentation(ctx: MarkupRenderContexts): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.indentation.repeat(ctx.indentation);
}
