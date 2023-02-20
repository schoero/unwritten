import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


//-- Markup

export interface MarkupRenderer extends Renderer {
  fileExtension: ".html" | ".md";
  name: "html" | "markdown";
}

export interface MarkupRenderContext<CustomMarkupRenderer extends MarkupRenderer> extends RenderContext<CustomMarkupRenderer> {
  indentation: number;
  size: number;
}

export type MarkupRenderers = HTMLRenderer | MarkdownRenderer;
export type MarkupRenderContexts = HTMLRenderContext | MarkdownRenderContext;


//-- HTML

export interface HTMLRenderer extends Renderer {
  fileExtension: ".html";
  name: "html";
}

export interface HTMLRenderContext extends MarkupRenderContext<HTMLRenderer> {
}


//-- Markdown

export interface MarkdownRenderer extends Renderer {
  fileExtension: ".md";
  name: "markdown";
}

export interface MarkdownRenderContext extends MarkupRenderContext<MarkdownRenderer> {
}
