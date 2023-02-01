/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { render as sharedRender } from "unwritten:renderer:markup/index.js";
import { html } from "unwritten:tests:utils/template.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.js";
import type { HTMLRenderContext, HTMLRenderer } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is HTMLRenderer {
  if(renderer.name !== BuiltInRenderers.Markdown){
    throw new Error(`Renderer '${renderer.name}' is not a Markdown renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is HTMLRenderContext {
  verifyRenderer(ctx.renderer);
}


const htmlRenderer: HTMLRenderer = {
  fileExtension: "html",
  name: BuiltInRenderers.HTML,
  render: <CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) => {
    verifyContext(ctx);
    return sharedRender(ctx, entities);
  },
  renderAnchorLink: (name: string, anchor: string): string => {
    return `<a href="#${anchor}">${name}</a>`;
  },
  renderBoldText: (text: string): string => {
    return `<b>${text}</b>`;
  },
  renderCode: (code: string, language?: string): string => {
    return `<pre><code language="${language ? language : ""}">${code}</code></pre>`;
  },
  renderHorizontalRule: (): string => {
    return `<hr>${htmlRenderer.renderNewLine()}`;
  },
  renderHyperLink: (name: string, url: string) => {
    return `<a href="${url}">${name}</a>`;
  },
  renderItalicText: (text: string): string => {
    return `<i>${text}</i>`;
  },
  renderLineBreak: (): string => {
    return "<br>";
  },
  renderList: (items: string[]): string => {
    return [
      htmlRenderer.renderListStart(),
      ...items.map(item => htmlRenderer.renderListItem(item)),
      htmlRenderer.renderListEnd()
    ].join(htmlRenderer.renderNewLine());
  },
  renderListEnd: (): string => {
    return "</ul>";
  },
  renderListItem: (item: string): string => {
    return html`<li>${item}</li>`;
  },
  renderListStart: (): string => {
    return "<ul>";
  },
  renderNewLine: (): string => {
    return "\n";
  },
  renderParagraph: (text: string): string => {
    return `<p>${text}</p>`;
  },
  renderSmallText: (text: string): string => {
    return `<small>${text}</small>`;
  },
  renderSourceCodeLink: (file: string, line: number, column: number): string => {
    const url = `${file}#L${line}`;
    return htmlRenderer.renderHyperLink(`${file}:${line}`, url);
  },
  renderStrikeThroughText: (text: string): string => {
    return `<del>${text}</del>`;
  },
  renderTitle: (title: string, size: number, anchor?: string): string => {
    const id = anchor ? ` id="${anchor}"` : "";
    return `<h${size}${id}>${title}</h${size}>`;
  },
  renderUnderlineText: (text: string): string => {
    return `<u>${text}</u>`;
  },
  renderWarning: (text: string): string => {
    return `<blockquote>${text}</blockquote>`;
  }
};

export default htmlRenderer;
