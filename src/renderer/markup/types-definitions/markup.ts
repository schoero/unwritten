import type { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import type { LinkRegistry, SourceFile } from "unwritten:renderer/markup/registry/registry";
import type { RenderBrowserContext, RenderNodeContext } from "unwritten:type-definitions/context";
import type { Renderer } from "unwritten:type-definitions/renderer";


// Markup
interface BaseMarkupRenderer extends Renderer {
  fileExtension: ".html" | ".md";
  initializeContext(ctx: MarkupRenderContext): void;
  name: BuiltInRenderers.HTML | BuiltInRenderers.Markdown;
}

interface BaseMarkupRenderContext {
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

export interface MarkupRenderNodeContext<CustomMarkupRenderer extends BaseMarkupRenderer> extends
  BaseMarkupRenderContext,
  RenderNodeContext<CustomMarkupRenderer> {}

export interface MarkupRenderBrowserContext<CustomMarkupRenderer extends BaseMarkupRenderer> extends
  BaseMarkupRenderContext,
  RenderBrowserContext<CustomMarkupRenderer> {}

export type MarkupRenderer = HTMLRenderer | MarkdownRenderer;
export type MarkupRenderContext = HTMLRenderContext | MarkdownRenderContext;


// HTML
export interface HTMLRenderer extends BaseMarkupRenderer {
  fileExtension: ".html";
  name: BuiltInRenderers.HTML;
}

export interface HTMLRenderNodeContext extends MarkupRenderNodeContext<HTMLRenderer> {}
export interface HTMLRenderBrowserContext extends MarkupRenderBrowserContext<HTMLRenderer> {}
export type HTMLRenderContext = HTMLRenderBrowserContext | HTMLRenderNodeContext;


// Markdown
export interface MarkdownRenderer extends BaseMarkupRenderer {
  fileExtension: ".md";
  name: BuiltInRenderers.Markdown;
}

export interface MarkdownRenderNodeContext extends MarkupRenderNodeContext<MarkdownRenderer> {}
export interface MarkdownBrowserRenderContext extends MarkupRenderBrowserContext<MarkdownRenderer> {}
export type MarkdownRenderContext = MarkdownBrowserRenderContext | MarkdownRenderNodeContext;
