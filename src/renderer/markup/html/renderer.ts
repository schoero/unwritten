import { BuiltInRenderers } from "quickdoks:compiler:type-definitions/renderer.d.js";

import type { MarkupRenderImplementation } from "quickdoks:renderer:markup/types/renderer.js";


class HTMLRenderer implements MarkupRenderImplementation {

  public name = BuiltInRenderers.HTML;
  public fileExtension: string = ".html";


  public renderAnchorLink(name: string, anchor: string): string {
    return `<a href="#${anchor}">${name}</a>`;
  }


  public renderSourceCodeLink(name: string, file: string, line: number, column: number): string {
    const url = `${file}#L${line}`;
    return this.renderHyperLink(`${name}:${line}`, url);
  }


  public renderHyperLink(name: string, url: string) {
    return `<a href="${url}">${name}</a>`;
  }

  public renderNewLine(): string {
    return "\n";
  }

  public renderLineBreak(): string {
    return "<br>";
  }

  public renderParagraph(text: string): string {
    return `<p>${text}</p>`;
  }


  public renderList(items: string[]): string {
    return [
      this.renderListStart(),
      ...items.map(this.renderListItem),
      this.renderListEnd()
    ].join(this.renderNewLine());
  }


  public renderListStart(): string {
    return "<ul>";
  }

  public renderListEnd(): string {
    return "</ul>";
  }

  public renderListItem(item: string): string {
    return `<li>${item}</li>`;
  }


  public renderTitle(title: string, size: number, anchor?: string): string {
    const id = anchor ? `id="${anchor}"` : "";
    return `<h${size} ${id}>${title}</h${size}>${this.renderNewLine()}`;
  }


  public renderHorizontalRule(): string {
    return `<hr>${this.renderNewLine()}`;
  }

  public renderBoldText(text: string): string {
    return `<b>${text}</b>`;
  }

  public renderItalicText(text: string): string {
    return `<i>${text}</i>`;
  }

  public renderStrikeThroughText(text: string): string {
    return `<del>${text}</del>`;
  }

  public renderUnderlineText(text: string): string {
    return `<u>${text}</u>`;
  }

  public renderCode(code: string, language?: string): string {
    return `<pre><code language="${language ? language : ""}">${code}</code></pre>`;
  }

  public renderSmallText(text: string): string {
    return `<small>${text}</small>`;
  }

  public renderWarning(text: string): string {
    return `<blockquote>${text}</blockquote>`;
  }

}

export const htmlRenderer = new HTMLRenderer();
