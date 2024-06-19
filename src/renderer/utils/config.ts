import type { HTMLRenderConfig, MarkdownRenderConfig, MarkupRenderConfig } from "../markup/types-definitions/config";
import type {
  HTMLRenderContext,
  MarkdownRenderContext,
  MarkupRenderContext
} from "../markup/types-definitions/markup";

import type { JSONRenderConfig } from "unwritten:renderer:json:type-definitions/config";
import type { JSONRenderContext } from "unwritten:renderer:json:type-definitions/renderer";
import type { RenderConfig } from "unwritten:type-definitions/config";
import type { RenderContext } from "unwritten:type-definitions/context";
import type { Complete } from "unwritten:type-definitions/utils";


export function getRenderConfig(ctx: MarkdownRenderContext): Complete<MarkdownRenderConfig>;
export function getRenderConfig(ctx: HTMLRenderContext): Complete<HTMLRenderConfig>;
export function getRenderConfig(ctx: MarkupRenderContext): Complete<MarkupRenderConfig>;
export function getRenderConfig(ctx: JSONRenderContext): Complete<JSONRenderConfig>;
export function getRenderConfig(ctx: JSONRenderContext | MarkupRenderContext): Complete<JSONRenderConfig | MarkupRenderConfig>;
export function getRenderConfig(ctx: RenderContext): Complete<RenderConfig>;
export function getRenderConfig(ctx: JSONRenderContext | MarkupRenderContext | RenderContext): Complete<JSONRenderConfig | MarkupRenderConfig | RenderConfig> {
  const name = ctx.renderer.name;
  return ctx.config.renderConfig[name];
}
