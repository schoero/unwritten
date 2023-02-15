import type { LinkRegistry } from "../utils/linker.js";

import type { ExportableEntities } from "unwritten:compiler/type-definitions/entities.js";
import type { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export interface MarkupRenderer extends Renderer {
  fileExtension: string;
  name: BuiltInRenderers.HTML | BuiltInRenderers.Markdown;
  render: <CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) => string;
  renderAnchorLink: (text: string, anchor: string) => string;
  renderAnchorTag: (anchor: string) => string;
  renderBoldText: (text: string) => string;
  renderCode: (code: string, language?: string) => string;
  renderHorizontalRule: () => string;
  renderHyperLink: (text: string, url: string) => string;
  renderItalicText: (text: string) => string;
  renderLineBreak: () => string;
  renderList: (items: string[]) => string;
  renderListEnd: () => string;
  renderListItem: (item: string) => string;
  renderListStart: () => string;
  renderNewLine: () => string;
  renderParagraph: (text: string) => string;
  renderSmallText: (text: string) => string;
  renderSourceCodeLink: (file: string, line: number, column: number) => string;
  renderStrikeThroughText: (text: string) => string;
  renderTitle: (title: string, size: number, id?: string) => string;
  renderUnderlineText: (text: string) => string;
  renderWarning: (text: string) => string;
}


//-- Contexts

export type MarkupRenderContexts = HTMLRenderContext | MarkdownRenderContext;


interface MarkupRenderContext extends RenderContext<Renderer> {
  indentation: number;
  linkRegistry: LinkRegistry;
}

export type MarkdownRenderContext = MarkupRenderContext;
export interface MarkdownRenderer extends MarkupRenderer {
}

export type HTMLRenderContext = MarkupRenderContext;
export interface HTMLRenderer extends MarkupRenderer {
}
