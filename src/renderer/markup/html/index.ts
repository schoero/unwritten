/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { render as sharedRender } from "unwritten:renderer:markup/index.js";
import { html } from "unwritten:tests:utils/template.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.js";
import type {
  HTMLRenderContext,
  HTMLRenderer as HTMLRendererType
} from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is HTMLRendererType {
  if(renderer.name !== BuiltInRenderers.HTML){
    throw new Error(`Renderer '${renderer.name}' is not a HTML renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is HTMLRenderContext {
  verifyRenderer(ctx.renderer);
}


export class HTMLRenderer implements HTMLRendererType {

  public fileExtension = "html";
  public name = BuiltInRenderers.HTML;


  public render<CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) {
    verifyContext(ctx);
    return sharedRender(ctx, entities);
  }

  public renderAnchorLink(name: string, anchor: string): string {
    return `<a href="#${anchor}">${name}</a>`;
  }

  public renderAnchorTag(anchor: string): string {
    return `<a id="${anchor}"></a>`;
  }

  public renderBoldText(text: string): string {
    return `<b>${text}</b>`;
  }

  public renderCode(code: string, language?: string): string {
    return `<pre><code language="${language ? language : ""}">${code}</code></pre>`;
  }

  public renderHorizontalRule(): string {
    return `<hr>${this.renderNewLine()}`;
  }

  public renderHyperLink(name: string, url: string) {
    return `<a href="${url}">${name}</a>`;
  }

  public renderItalicText(text: string): string {
    return `<i>${text}</i>`;
  }

  public renderLineBreak(): string {
    return "<br>";
  }

  public renderList(items: string[]): string {
    return [
      this.renderListStart(),
      ...items.map(item => this.renderListItem(item)),
      this.renderListEnd()
    ].join(this.renderNewLine());
  }

  public renderListEnd(): string {
    return "</ul>";
  }

  public renderListItem(item: string): string {
    return html`<li>${item}</li>`;
  }

  public renderListStart() {
    return "<ul>";
  }

  public renderNewLine(): string {
    return "\n";
  }

  public renderParagraph(text: string): string {
    return `<p>${text}</p>`;
  }

  public renderSmallText(text: string): string {
    return `<small>${text}</small>`;
  }

  public renderSourceCodeLink(file: string, line: number, column: number): string {
    const url = `${file}#L${line}`;
    return this.renderHyperLink(`${file}:${line}`, url);
  }

  public renderStrikeThroughText(text: string): string {
    return `<del>${text}</del>`;
  }

  public renderTitle(title: string, size: number, anchor?: string): string {
    const id = anchor ? ` id="${anchor}"` : "";
    return `<h${size}${id}>${title}</h${size}>`;
  }

  public renderUnderlineText(text: string): string {
    return `<u>${text}</u>`;
  }

  public renderWarning(text: string): string {
    return `<blockquote>${text}</blockquote>`;
  }

}

export default new HTMLRenderer();
