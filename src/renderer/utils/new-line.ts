import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { EOL } from "unwritten:platform/os/node.js";

import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function renderNewLine(ctx: MarkupRenderContexts): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.newLine === "os" ? EOL : renderConfig.newLine;
}
