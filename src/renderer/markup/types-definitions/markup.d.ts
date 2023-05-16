import type { BuiltInRenderers } from "unwritten:renderer/enums/renderer.ts";
import type { LinkRegistry } from "unwritten:renderer/markup/utils/linker.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


//-- Markup

export interface MarkupRenderer extends Renderer {
  fileExtension: ".html" | ".md";
  name: BuiltInRenderers.HTML | BuiltInRenderers.Markdown;
  linkRegistry?: LinkRegistry;
}

export interface MarkupRenderContext<CustomMarkupRenderer extends MarkupRenderer> extends RenderContext<CustomMarkupRenderer> {
  get indentation(): number;
  set indentation(value: number);
  get nesting(): number;
  set nesting(value: number);
  _indentation?: number;
  _nesting?: number;
}

export type MarkupRenderers = HTMLRenderer | MarkdownRenderer;
export type MarkupRenderContexts = HTMLRenderContext | MarkdownRenderContext;


//-- HTML

export interface HTMLRenderer extends MarkupRenderer {
  fileExtension: ".html";
  name: BuiltInRenderers.HTML;
}

export interface HTMLRenderContext extends MarkupRenderContext<HTMLRenderer> {
}


//-- Markdown

export interface MarkdownRenderer extends MarkupRenderer {
  fileExtension: ".md";
  name: BuiltInRenderers.Markdown;
}

export interface MarkdownRenderContext extends MarkupRenderContext<MarkdownRenderer> {
}
