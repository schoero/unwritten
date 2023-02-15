/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import * as HTMLRenderer from "unwritten:renderer:markup/html/index.js";
import { render as sharedRender } from "unwritten:renderer:markup/index.js";

import { getRenderConfig } from "../utils/config.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkdownRenderContext,
  MarkdownRenderer,
  MarkupRenderContexts
} from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is MarkdownRenderer {
  if(renderer.name !== BuiltInRenderers.Markdown){
    throw new Error(`Renderer '${renderer.name}' is not a Markdown renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is MarkdownRenderContext {
  verifyRenderer(ctx.renderer);
}

export const fileExtension = "md";
export const name = BuiltInRenderers.Markdown;

export function render(ctx: RenderContext<Renderer>, entities: ExportableEntities[]) {
  verifyContext(ctx);
  return sharedRender(ctx, entities);
}

export function renderAnchorLink(ctx: MarkupRenderContexts, name: string, anchor: string): string {
  return `[${name}](#${anchor})`;
}

export function renderAnchorTag(ctx: MarkupRenderContexts, anchor: string): string {
  return isHTMLTagAllowed(ctx, "a")
    ? HTMLRenderer.renderAnchorTag(ctx, anchor)
    : anchor;
}

export function renderBoldText(ctx: MarkupRenderContexts, text: string): string {
  return `**${text}**`;
}

export function renderCode(ctx: MarkupRenderContexts, code: string, language?: string): string {
  return `\`\`\`${language ? language : ""}\n${code}\n\`\`\``;
}

export function renderHorizontalRule(ctx: MarkupRenderContexts): string {
  return `---${renderNewLine(ctx)}`;
}

export function renderHyperLink(ctx: MarkupRenderContexts, name: string, url: string) {
  return `[${name}](${url})`;
}

export function renderItalicText(ctx: MarkupRenderContexts, text: string): string {
  return `*${text}*`;
}

export function renderLineBreak(ctx: MarkupRenderContexts): string {
  return "\n&nbsp;\n";
}

export function renderList(ctx: MarkupRenderContexts, items: string[]): string {
  return [
    renderListStart(ctx),
    ...items.map(item => renderListItem(ctx, item)),
    renderListEnd(ctx)
  ].join(renderNewLine(ctx));
}

export function renderListEnd(ctx: MarkupRenderContexts) {
  return "";
}

export function renderListItem(ctx: MarkupRenderContexts, item: string): string {
  return `* ${item}`;
}

export function renderListStart(ctx: MarkupRenderContexts) {
  return "";
}

export function renderNewLine(ctx: MarkupRenderContexts): string {
  return "  \n";
}

export function renderParagraph(ctx: MarkupRenderContexts, text: string): string {
  return `${renderNewLine(ctx)}${text}`;
}

export function renderSmallText(ctx: MarkupRenderContexts, text: string): string {
  return isHTMLTagAllowed(ctx, "small") ? HTMLRenderer.renderSmallText(ctx, text) : text;
}

export function renderSourceCodeLink(ctx: MarkupRenderContexts, file: string, line: number, column: number): string {
  const url = `${file}#L${line}`;
  return renderHyperLink(ctx, `${file}:${line}`, url);
}

export function renderStrikeThroughText(ctx: MarkupRenderContexts, text: string): string {
  return `~~${text}~~`;
}

export function renderTitle(ctx: MarkupRenderContexts, title: string, size: number): string {
  return `${renderNewLine(ctx)}${"#".repeat(size)} ${title}${renderNewLine(ctx)}`;
}

export function renderUnderlineText(ctx: MarkupRenderContexts, text: string): string {
  return `__${text}__`;
}

export function renderWarning(ctx: MarkupRenderContexts, text: string): string {
  return `${renderNewLine(ctx)}> ${text}${renderNewLine(ctx)}`;
}

function isHTMLTagAllowed(ctx: MarkupRenderContexts, tag: string): boolean {
  verifyContext(ctx);
  const renderConfig = getRenderConfig(ctx);
  return typeof renderConfig.allowedHTMLTags === "boolean"
    ? renderConfig.allowedHTMLTags
    : renderConfig.allowedHTMLTags.includes(tag.toLowerCase());
}

export function renderIndentation(ctx: MarkupRenderContexts): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.indentation.repeat(ctx.indentation);
}
