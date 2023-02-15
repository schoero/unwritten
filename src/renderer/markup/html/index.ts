/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { render as sharedRender } from "unwritten:renderer:markup/index.js";

import { getRenderConfig } from "../utils/config.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.js";
import type {
  HTMLRenderContext,
  HTMLRenderer,
  MarkupRenderContexts
} from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is HTMLRenderer {
  if(renderer.name !== BuiltInRenderers.HTML){
    throw new Error(`Renderer '${renderer.name}' is not a HTML renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is HTMLRenderContext {
  verifyRenderer(ctx.renderer);
}


export const fileExtension = "html";
export const name = BuiltInRenderers.HTML;

export function render(ctx: RenderContext<Renderer>, entities: ExportableEntities[]) {
  verifyContext(ctx);
  return sharedRender(ctx, entities);
}

export function renderAnchorLink(ctx: MarkupRenderContexts, name: string, anchor: string): string {
  return `<a href="#${anchor}">${name}</a>`;
}

export function renderAnchorTag(ctx: MarkupRenderContexts, anchor: string): string {
  return `<a id="${anchor}"></a>`;
}

export function renderBoldText(ctx: MarkupRenderContexts, text: string): string {
  return `<b>${text}</b>`;
}

export function renderCode(ctx: MarkupRenderContexts, code: string, language?: string): string {
  return `<pre><code language="${language ? language : ""}">${code}</code></pre>`;
}

export function renderHorizontalRule(ctx: MarkupRenderContexts): string {
  return `<hr>${renderNewLine(ctx)}`;
}

export function renderHyperLink(ctx: MarkupRenderContexts, name: string, url: string) {
  return `<a href="${url}">${name}</a>`;
}

export function renderItalicText(ctx: MarkupRenderContexts, text: string): string {
  return `<i>${text}</i>`;
}

export function renderLineBreak(ctx: MarkupRenderContexts): string {
  return "<br>";
}

export function renderList(ctx: MarkupRenderContexts, items: string[]): string {
  return [
    renderListStart(ctx),
    ...items.map(item => renderListItem(ctx, item)),
    renderListEnd(ctx)
  ].join(renderNewLine(ctx));
}

export function renderListEnd(ctx: MarkupRenderContexts): string {
  ctx.indentation--;
  return `${renderIndentation(ctx)}</ul>`;
}

export function renderListItem(ctx: MarkupRenderContexts, item: string): string {
  return `${renderIndentation(ctx)}<li>${item}</li>`;
}

export function renderListStart(ctx: MarkupRenderContexts) {
  const listStart = `${renderIndentation(ctx)}<ul>`;
  ctx.indentation++;
  return listStart;
}

export function renderNewLine(ctx: MarkupRenderContexts): string {
  return "\n";
}

export function renderParagraph(ctx: MarkupRenderContexts, text: string): string {
  return `${renderIndentation(ctx)}<p>${text}</p>`;
}

export function renderSmallText(ctx: MarkupRenderContexts, text: string): string {
  return `<small>${text}</small>`;
}

export function renderSourceCodeLink(ctx: MarkupRenderContexts, file: string, line: number, column: number): string {
  const url = `${file}#L${line}`;
  return renderHyperLink(ctx, `${file}:${line}`, url);
}

export function renderStrikeThroughText(ctx: MarkupRenderContexts, text: string): string {
  return `<del>${text}</del>`;
}

export function renderTitle(ctx: MarkupRenderContexts, title: string, size: number, anchor?: string): string {
  const id = anchor ? ` id="${anchor}"` : "";
  return `${renderIndentation(ctx)}<h${size}${id}>${title}</h${size}>`;
}

export function renderUnderlineText(ctx: MarkupRenderContexts, text: string): string {
  return `<u>${text}</u>`;
}

export function renderWarning(ctx: MarkupRenderContexts, text: string): string {
  return `<blockquote>${text}</blockquote>`;
}

export function renderIndentation(ctx: MarkupRenderContexts): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.indentation.repeat(ctx.indentation);
}
