import type { LinkRegistry } from "unwritten:renderer/markup/utils/linker.ts";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


//-- Markup

export interface MarkupRenderer extends Renderer {
  fileExtension: ".html" | ".md";
  name: "html" | "markdown";
  linkRegistry?: LinkRegistry;
}

export interface MarkupRenderContext<CustomMarkupRenderer extends MarkupRenderer> extends RenderContext<CustomMarkupRenderer> {
  indentation: number;
  size: number;
}

export type MarkupRenderers = HTMLRenderer | MarkdownRenderer;
export type MarkupRenderContexts = HTMLRenderContext | MarkdownRenderContext;


//-- HTML

export interface HTMLRenderer extends MarkupRenderer {
  fileExtension: ".html";
  name: "html";
}

export interface HTMLRenderContext extends MarkupRenderContext<HTMLRenderer> {
}


//-- Markdown

export interface MarkdownRenderer extends MarkupRenderer {
  fileExtension: ".md";
  name: "markdown";
}

export interface MarkdownRenderContext extends MarkupRenderContext<MarkdownRenderer> {
}
