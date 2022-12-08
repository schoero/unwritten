import { MarkupRenderImplementation } from "quickdoks:renderer:markup/types/renderer.js";
import { BuiltInRenderers } from "quickdoks:types:renderer.js";


class MarkdownRenderer implements MarkupRenderImplementation {

  public name = BuiltInRenderers.Markdown;
  public fileExtension = ".md";

  private _listIndentation: number = -2;

  private _increaseListIndentation(): void {
    this._listIndentation += 2;
  }


  private _decreaseListIndentation(): void {

    if(this._listIndentation === -2){
      return;
    }

    this._listIndentation -= 2;

  }


  private _getIndentation(): string {
    return " ".repeat(this._listIndentation < 0 ? 0 : this._listIndentation);
  }


  public renderAnchorLink(name: string, anchor: string): string {
    return `[${name}](#${this._textToAnchorLink(anchor)})`;
  }


  public renderSourceCodeLink(name: string, file: string, line: number, column: number): string {
    const url = `${file}#L${line}`;
    return this.renderHyperLink(`${name}:${line}`, url);
  }


  public renderHyperLink(name: string, url: string) {
    return `[${name}](${url})`;
  }

  public renderNewLine(): string {
    return "  \n";
  }

  public renderLineBreak(): string {
    return "\n&nbsp;\n";
  }

  public renderParagraph(text: string): string {
    return `${this.renderNewLine()}${text}`;
  }


  public renderList(items: string[]): string {

    this.renderListStart();

    const list = items.map(this.renderListItem.bind(this));

    this.renderListEnd();

    return list.join(this.renderNewLine());

  }


  public renderListStart() {
    this._increaseListIndentation();
  }


  public renderListEnd() {
    this._decreaseListIndentation();

    // Add an extra new line because otherwise the content will still be indented
    if(this._listIndentation === -2){
      return this.renderNewLine();
    }
  }


  public renderListItem(item: string): string {
    return `${this._getIndentation()}* ${item}`;
  }


  public renderTitle(title: string, size: number): string {
    return `${this.renderNewLine()}${"#".repeat(size)} ${title}${this.renderNewLine()}`;
  }

  public renderHorizontalRule(): string {
    return `---${this.renderNewLine()}`;
  }

  public renderBoldText(text: string): string {
    return `**${text}**`;
  }

  public renderItalicText(text: string): string {
    return `*${text}*`;
  }

  public renderStrikeThroughText(text: string): string {
    return `~~${text}~~`;
  }

  public renderUnderlineText(text: string): string {
    return `__${text}__`;
  }

  public renderCode(code: string, language?: string): string {
    return `\`\`\`${language ? language : ""}\n${code}\n\`\`\``;
  }

  public renderSmallText(text: string): string {
    return `<small>${text}</small>`;
  }

  public renderWarning(text: string): string {
    return `${this.renderNewLine()}> ${text}${this.renderNewLine()}`;
  }


  private _textToAnchorLink(text: string): string {
    let link = text.toLowerCase();

    link = link.replace(/[^a-z0-9\s-]/gi, "");
    link = link.replace(/\s/g, "-");
    return link;
  }

}

export const markdownRenderer = new MarkdownRenderer();
