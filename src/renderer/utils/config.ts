import type {
  HTMLRenderConfig,
  MarkdownRenderConfig,
  MarkupRenderConfig
} from "../markup/types-definitions/config.js";
import type {
  HTMLRenderContext,
  MarkdownRenderContext,
  MarkupRenderContexts
} from "../markup/types-definitions/markup.js";

import type { JSONRenderConfig } from "unwritten:renderer:json/type-definitions/config.js";
import type { JSONRenderContext } from "unwritten:renderer:json/type-definitions/renderer.js";
import type { RenderConfig } from "unwritten:type-definitions/config.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Complete } from "unwritten:type-definitions/utils.js";


export function getRenderConfig(ctx: MarkdownRenderContext): Complete<MarkdownRenderConfig>;
export function getRenderConfig(ctx: HTMLRenderContext): Complete<HTMLRenderConfig>;
export function getRenderConfig(ctx: MarkupRenderContexts): Complete<MarkupRenderConfig>;
export function getRenderConfig(ctx: JSONRenderContext): Complete<JSONRenderConfig>;
export function getRenderConfig(ctx: JSONRenderContext | MarkupRenderContexts): Complete<JSONRenderConfig | MarkupRenderConfig>;
export function getRenderConfig(ctx: RenderContext): Complete<RenderConfig>;
export function getRenderConfig(ctx: JSONRenderContext | MarkupRenderContexts | RenderContext): Complete<JSONRenderConfig | MarkupRenderConfig | RenderConfig> {
  const name = ctx.renderer.name;
  return ctx.config.renderConfig[name];
}
