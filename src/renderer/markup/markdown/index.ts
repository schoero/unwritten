/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { render as sharedRender } from "unwritten:renderer:markup/index.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkdownRenderer, RenderedLink } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is MarkdownRenderer {
  if(renderer.name !== BuiltInRenderers.Markdown){
    throw new Error(`Renderer '${renderer.name}' is not a Markdown renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is RenderContext<MarkdownRenderer> {
  verifyRenderer(ctx.renderer);
}


const markdownRenderer: MarkdownRenderer = {
  fileExtension: "md",
  name: BuiltInRenderers.Markdown,
  render: (ctx: RenderContext<Renderer>, entities: ExportableEntities[]) => {
    verifyContext(ctx);
    return sharedRender(ctx, entities);
  },
  renderAnchorLink: (name: string, anchor: string): RenderedLink => {
    return `[${name}](#${anchor})`;
  },
  renderBoldText: (text: string): string => {
    return `**${text}**`;
  },
  renderCode: (code: string, language?: string): string => {
    return `\`\`\`${language ? language : ""}\n${code}\n\`\`\``;
  },
  renderHorizontalRule: (): string => {
    return `---${markdownRenderer.renderNewLine()}`;
  },
  renderHyperLink: (name: string, url: string) => {
    return `[${name}](${url})`;
  },
  renderItalicText: (text: string): string => {
    return `*${text}*`;
  },
  renderLineBreak: (): string => {
    return "\n&nbsp;\n";
  },
  renderList: (items: string[]): string => {
    return [
      markdownRenderer.renderListStart(),
      ...items.map(item => markdownRenderer.renderListItem(item)),
      markdownRenderer.renderListEnd()
    ].join(markdownRenderer.renderNewLine());
  },
  renderListEnd: () => {},
  renderListItem: (item: string): string => {
    return `* ${item}`;
  },
  renderListStart: () => {},
  renderNewLine: (): string => {
    return "  \n";
  },
  renderParagraph: (text: string): string => {
    return `${markdownRenderer.renderNewLine()}${text}`;
  },
  renderSmallText: (text: string): string => {
    return `<small>${text}</small>`;
  },
  renderSourceCodeLink: (file: string, line: number, column: number): string => {
    const url = `${file}#L${line}`;
    return markdownRenderer.renderHyperLink(`${file}:${line}`, url);
  },
  renderStrikeThroughText: (text: string): string => {
    return `~~${text}~~`;
  },
  renderTitle: (title: string, size: number): string => {
    return `${markdownRenderer.renderNewLine()}${"#".repeat(size)} ${title}${markdownRenderer.renderNewLine()}`;
  },
  renderUnderlineText: (text: string): string => {
    return `__${text}__`;
  },
  renderWarning: (text: string): string => {
    return `${markdownRenderer.renderNewLine()}> ${text}${markdownRenderer.renderNewLine()}`;
  }
};

export default markdownRenderer;
