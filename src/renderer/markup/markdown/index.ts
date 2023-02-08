/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import HTMLRenderer from "unwritten:renderer:markup/html/index.js";
import { render as sharedRender } from "unwritten:renderer:markup/index.js";
import { assert } from "unwritten:utils/general.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkdownRenderContext,
  MarkdownRenderer as MarkdownRendererType
} from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is MarkdownRendererType {
  if(renderer.name !== BuiltInRenderers.Markdown){
    throw new Error(`Renderer '${renderer.name}' is not a Markdown renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is RenderContext<MarkdownRendererType> {
  verifyRenderer(ctx.renderer);
}


class MarkdownRenderer extends HTMLRenderer implements MarkdownRendererType {

  public override fileExtension = "md";
  public override name = BuiltInRenderers.Markdown;

  private _ctx: MarkdownRenderContext | undefined;


  public override render(ctx: RenderContext<Renderer>, entities: ExportableEntities[]) {
    verifyContext(ctx);
    this._ctx = ctx;
    return sharedRender(ctx, entities);
  }

  public override renderAnchorLink(name: string, anchor: string): string {
    return `[${name}](#${anchor})`;
  }

  public override renderAnchorTag(anchor: string): string {
    return this._isHTMLTagAllowed("a")
      ? super.renderAnchorTag(anchor)
      : anchor;
  }

  public override renderBoldText(text: string): string {
    return `**${text}**`;
  }

  public override renderCode(code: string, language?: string): string {
    return `\`\`\`${language ? language : ""}\n${code}\n\`\`\``;
  }

  public override renderHorizontalRule(): string {
    return `---${this.renderNewLine()}`;
  }

  public override renderHyperLink(name: string, url: string) {
    return `[${name}](${url})`;
  }

  public override renderItalicText(text: string): string {
    return `*${text}*`;
  }

  public override renderLineBreak(): string {
    return "\n&nbsp;\n";
  }

  public override renderList(items: string[]): string {
    return [
      this.renderListStart(),
      ...items.map(item => this.renderListItem(item)),
      this.renderListEnd()
    ].join(this.renderNewLine());
  }

  public override renderListEnd() {
    return "";
  }

  public override renderListItem(item: string): string {
    return `* ${item}`;
  }

  public override renderListStart() {
    return "";
  }

  public override renderNewLine(): string {
    return "  \n";
  }

  public override renderParagraph(text: string): string {
    return `${this.renderNewLine()}${text}`;
  }

  public override renderSmallText(text: string): string {
    return `<small>${text}</small>`;
  }

  public override renderSourceCodeLink(file: string, line: number, column: number): string {
    const url = `${file}#L${line}`;
    return this.renderHyperLink(`${file}:${line}`, url);
  }

  public override renderStrikeThroughText(text: string): string {
    return `~~${text}~~`;
  }

  public override renderTitle(title: string, size: number): string {
    return `${this.renderNewLine()}${"#".repeat(size)} ${title}${this.renderNewLine()}`;
  }

  public override renderUnderlineText(text: string): string {
    return `__${text}__`;
  }

  public override renderWarning(text: string): string {
    return `${this.renderNewLine()}> ${text}${this.renderNewLine()}`;
  }

  private _isHTMLTagAllowed(tag: string): boolean {
    assert(this._ctx, "MarkdownRenderer._isHTMLTagAllowed() called before context was initialized.");
    return typeof this._ctx.config.renderConfig.markdown.allowedHTMLTags === "boolean"
      ? this._ctx.config.renderConfig.markdown.allowedHTMLTags
      : this._ctx.config.renderConfig.markdown.allowedHTMLTags.includes(tag.toLowerCase());
  }

}

export default new MarkdownRenderer();
