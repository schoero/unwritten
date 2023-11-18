import type { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import type { LinkRegistry, SourceFile } from "unwritten:renderer/markup/registry/registry";
import type { RenderBrowserContext, RenderNodeContext } from "unwritten:type-definitions/context";
import type { Renderer } from "unwritten:type-definitions/renderer";


// Markup
export interface MarkupRenderer extends Renderer {
  fileExtension: ".html" | ".md";
  initializeContext(ctx: MarkupRenderContexts): void;
  name: BuiltInRenderers.HTML | BuiltInRenderers.Markdown;
}

export interface MarkupRenderBaseContext<CustomMarkupRenderer extends MarkupRenderer> {
  currentFile: SourceFile;
  set indentation(value: number);
  get indentation(): number;
  links: LinkRegistry;
  memberContext: string[];
  set nesting(value: number);
  get nesting(): number;
  _indentation?: number;
  _nesting?: number;
}

export interface MarkupRenderNodeContext<CustomMarkupRenderer extends MarkupRenderer> extends
  MarkupRenderBaseContext<CustomMarkupRenderer>,
  RenderNodeContext<CustomMarkupRenderer> {}

export interface MarkupRenderBrowserContext<CustomMarkupRenderer extends MarkupRenderer> extends
  MarkupRenderBaseContext<CustomMarkupRenderer>,
  RenderBrowserContext<CustomMarkupRenderer> {}

export type MarkupRenderContext<CustomMarkupRenderer extends MarkupRenderer> =
  | MarkupRenderBrowserContext<CustomMarkupRenderer>
  | MarkupRenderNodeContext<CustomMarkupRenderer>;


export type MarkupRenderers = HTMLRenderer | MarkdownRenderer;
export type MarkupRenderContexts = HTMLRenderContext | MarkdownRenderContext;


// HTML
export interface HTMLRenderer extends MarkupRenderer {
  fileExtension: ".html";
  name: BuiltInRenderers.HTML;
}

export interface HTMLRenderNodeContext extends MarkupRenderNodeContext<HTMLRenderer> {}
export interface HTMLRenderBrowserContext extends MarkupRenderBrowserContext<HTMLRenderer> {}
export type HTMLRenderContext = HTMLRenderBrowserContext | HTMLRenderNodeContext;


// Markdown
export interface MarkdownRenderer extends MarkupRenderer {
  fileExtension: ".md";
  name: BuiltInRenderers.Markdown;
}

export interface MarkdownNodeRenderContext extends MarkupRenderNodeContext<MarkdownRenderer> {}
export interface MarkdownBrowserRenderContext extends MarkupRenderBrowserContext<MarkdownRenderer> {}
export type MarkdownRenderContext = MarkdownBrowserRenderContext | MarkdownNodeRenderContext;
