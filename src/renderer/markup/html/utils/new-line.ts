import { EOL } from "node:os";

import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";

import type { HTMLRenderContext } from "unwritten:renderer/markup/types-definitions/markup.js";


export function renderNewLine(ctx: HTMLRenderContext): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.newLine === "os" ? EOL : renderConfig.newLine;
}
