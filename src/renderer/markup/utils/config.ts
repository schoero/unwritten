import type { HTMLRenderConfig, MarkdownRenderConfig } from "../types-definitions/config.js";
import type { HTMLRenderContext, MarkdownRenderContext, MarkupRenderContexts } from "../types-definitions/markup.js";

import type { Complete } from "unwritten:type-definitions/utils.js";


export function getRenderConfig<MarkupRenderContext extends MarkdownRenderContext>(ctx: MarkdownRenderContext): Complete<MarkdownRenderConfig>;

export function getRenderConfig<MarkupRenderContext extends HTMLRenderContext>(ctx: HTMLRenderContext): Complete<HTMLRenderConfig>;

export function getRenderConfig<MarkupRenderContext extends MarkupRenderContexts>(ctx: MarkupRenderContext) {
  const name = ctx.renderer.name;
  return ctx.config.renderConfig[name];
}
