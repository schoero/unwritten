import type { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import type { LinkRegistry, SourceFile } from "unwritten:renderer/markup/registry/registry.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


//-- Markup

export interface MarkupRenderer extends Renderer {
  fileExtension: ".html" | ".md";
  initializeContext(ctx: MarkupRenderContexts): void;
  name: BuiltInRenderers.HTML | BuiltInRenderers.Markdown;
}

export interface MarkupRenderContext<CustomMarkupRenderer extends MarkupRenderer> extends RenderContext<CustomMarkupRenderer> {
  currentFile: SourceFile;
  set indentation(value: number);
  get indentation(): number;
  links: LinkRegistry;
  get nesting(): number;
  set nesting(value: number);
  _currentFile?: SourceFile;
  _indentation?: number;
  _links?: LinkRegistry;
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
