import { EOL } from "node:os";

import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";

import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:ts/type-definitions/renderer.js";


export function renderNewLine(ctx: MarkupRenderContexts | TypeScriptRenderContext): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.newLine === "os" ? EOL : renderConfig.newLine;
}
