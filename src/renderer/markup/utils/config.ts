import type { MarkupRenderContext } from "../types/renderer.js";

import type { MarkupRenderConfig } from "unwritten:renderer:markup/types/config.js";
import type { Complete } from "unwritten:type-definitions/utils.js";


export function getRenderConfig(ctx: MarkupRenderContext): Complete<MarkupRenderConfig> {
  const name = ctx.renderer.name;
  return ctx.config.renderConfig[name];
}
