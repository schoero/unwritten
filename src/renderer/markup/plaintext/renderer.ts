import { MarkupRenderImplementation } from "../types/renderer.js";


class PlaintextRenderer implements MarkupRenderImplementation {

  public name: string = "plaintext";

  public fileExtension: string = ".txt";

  public renderAnchorLink(name: string, anchor: string): string {
    return name;
  }

  public renderDocumentAnchor(text: string, anchor: string): string {
    return text;
  }


  public renderSourceCodeLink(name: string, file: string, line: number, column: number): string {
    return name;
  }


  public renderHyperLink(name: string, url: string) {
    return name;
  }

  public renderNewLine(): string {
    return "\n";
  }

  public renderLineBreak(): string {
    return "\n\n";
  }

  public renderParagraph(text: string): string {
    return text;
  }

  public renderList(items: string[]): string {
    return items.map(this.renderListItem).join(this.renderNewLine());
  }

  public renderListStart(): string {
    return "{listStart}";
  }

  public renderListEnd(): string {
    return "{listEnd}";
  }

  public renderListItem(item: string): string {
    return `{listItemStart}${item}{listItemEnd}`;
  }

  public renderTitle(title: string, size: number): string {
    return `{titleStart-${size}}${title}{titleEnd-${size}}`;
  }

  public renderHorizontalRule(): string {
    return "{hr}";
  }

  public renderBoldText(text: string): string {
    return `{bold}${text}`;
  }

  public renderItalicText(text: string): string {
    return `{italic}${text}`;
  }

  public renderStrikeThroughText(text: string): string {
    return `{strike}${text}`;
  }

  public renderUnderlineText(text: string): string {
    return `{underline}${text}`;
  }

  public renderCode(code: string, language?: string): string {
    return `{code-${language}}${code}`;
  }

  public renderSmallText(text: string): string {
    return `{small}${text}`;
  }

  public renderWarning(text: string): string {
    return `{warning}${text}`;
  }


  private _textToAnchorLink(text: string): string {
    let link = text.toLowerCase();

    link = link.replace(/[^a-z0-9\s-]/gi, "");
    link = link.replace(/\s/g, "-");
    return link;
  }

}

export const plaintextRenderer = new PlaintextRenderer();