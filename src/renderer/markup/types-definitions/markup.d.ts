import type { LinkRegistry } from "../utils/linker.js";

import type { ExportableEntities } from "unwritten:compiler/type-definitions/entities.js";
import type { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export interface MarkupRenderer extends Renderer {
  fileExtension: string;
  name: BuiltInRenderers.HTML | BuiltInRenderers.Markdown;
  render: <CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) => string;
  renderAnchorLink: (ctx: MarkupRenderContexts, text: string, anchor: string) => string;
  renderAnchorTag: (ctx: MarkupRenderContexts, anchor: string) => string;
  renderBoldText: (ctx: MarkupRenderContexts, text: string) => string;
  renderCode: (ctx: MarkupRenderContexts, code: string, language?: string) => string;
  renderHorizontalRule: (ctx: MarkupRenderContexts) => string;
  renderHyperLink: (ctx: MarkupRenderContexts, text: string, url: string) => string;
  renderIndentation: (ctx: MarkupRenderContexts) => string;
  renderItalicText: (ctx: MarkupRenderContexts, text: string) => string;
  renderLineBreak: (ctx: MarkupRenderContexts) => string;
  renderList: (ctx: MarkupRenderContexts, items: string[]) => string;
  renderListEnd: (ctx: MarkupRenderContexts) => string;
  renderListItem: (ctx: MarkupRenderContexts, item: string) => string;
  renderListStart: (ctx: MarkupRenderContexts) => string;
  renderNewLine: (ctx: MarkupRenderContexts) => string;
  renderParagraph: (ctx: MarkupRenderContexts, text: string) => string;
  renderSmallText: (ctx: MarkupRenderContexts, text: string) => string;
  renderSourceCodeLink: (ctx: MarkupRenderContexts, file: string, line: number, column: number) => string;
  renderStrikeThroughText: (ctx: MarkupRenderContexts, text: string) => string;
  renderTitle: (ctx: MarkupRenderContexts, title: string, size: number, id?: string) => string;
  renderUnderlineText: (ctx: MarkupRenderContexts, text: string) => string;
  renderWarning: (ctx: MarkupRenderContexts, text: string) => string;
}


//-- Contexts

export type MarkupRenderContexts = HTMLRenderContext | MarkdownRenderContext;

interface MarkupRenderContext<Renderer extends MarkupRenderer = MarkupRenderer> extends RenderContext<Renderer> {
  indentation: number;
  linkRegistry: LinkRegistry;
}

export interface MarkdownRenderContext extends MarkupRenderContext<MarkdownRenderer> {
}

export interface MarkdownRenderer extends MarkupRenderer {
}

export interface HTMLRenderContext extends MarkupRenderContext<HTMLRenderer> {
}

export interface HTMLRenderer extends MarkupRenderer {
}
