import type { MarkupRenderContext } from "../types-definitions/markup.js";

import type { MarkupRenderConfig } from "unwritten:renderer/markup/types-definitions/config.js";
import type { Complete } from "unwritten:type-definitions/utils.js";


export function getRenderConfig(ctx: MarkupRenderContext): Complete<MarkupRenderConfig> {
  const name = ctx.renderer.name;
  return ctx.config.renderConfig[name];
}
