import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";


export function renderNewLine(ctx: MarkupRenderContexts): string {
  const { lineEndings } = ctx.dependencies.os;
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.newLine === "os" ? lineEndings : renderConfig.newLine;
}
