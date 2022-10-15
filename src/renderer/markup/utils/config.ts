import { RenderContext } from "../../../types/context.js";
import { MarkupRenderConfig } from "../types/config.js";


export function getRenderConfig(ctx: RenderContext): MarkupRenderConfig {
  return ctx.config.renderConfig[ctx.renderer.name]!;
}