export function renderAnchorLink(name: string, anchor: string): string {
  return `[${name}](#${textToAnchorLink(anchor)})`;
}


export function renderBoldText(text: string): string {
  return `**${text}**`;
}


export function renderCode(code: string, language?: string): string {
  return `\`\`\`${language ? language : ""}\n${code}\n\`\`\``;
}

export function renderHorizontalRule(): string {
  return `---${renderNewLine()}`;
}

export function renderHyperLink(name: string, url: string) {
  return `[${name}](${url})`;
}

export function renderItalicText(text: string): string {
  return `*${text}*`;
}

export function renderLineBreak(): string {
  return "\n&nbsp;\n";
}


export function renderList(items: string[]): string {

  const list = items.map(renderListItem);

  renderListEnd();

  return list.join(renderNewLine());

}

export function renderListEnd() {}

export function renderListItem(item: string): string {
  return `* ${item}`;
}


export function renderListStart() {}


export function renderNewLine(): string {
  return "  \n";
}

export function renderParagraph(text: string): string {
  return `${renderNewLine()}${text}`;
}

export function renderSmallText(text: string): string {
  return `<small>${text}</small>`;
}

export function renderSourceCodeLink(file: string, line: number, column: number): string {
  const url = `${file}#L${line}`;
  return renderHyperLink(`${file}:${line}`, url);
}

export function renderStrikeThroughText(text: string): string {
  return `~~${text}~~`;
}

export function renderTitle(title: string, size: number): string {
  return `${renderNewLine()}${"#".repeat(size)} ${title}${renderNewLine()}`;
}

export function renderUnderlineText(text: string): string {
  return `__${text}__`;
}

export function renderWarning(text: string): string {
  return `${renderNewLine()}> ${text}${renderNewLine()}`;
}


function textToAnchorLink(text: string): string {
  let link = text.toLowerCase();

  link = link.replace(/[^\d\sa-z-]/gi, "");
  link = link.replace(/\s/g, "-");
  return link;
}
