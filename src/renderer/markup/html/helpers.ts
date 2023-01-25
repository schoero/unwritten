export function renderAnchorLink(name: string, anchor: string): string {
  return `<a href="#${anchor}">${name}</a>`;
}


export function renderSourceCodeLink(name: string, file: string, line: number, column: number): string {
  const url = `${file}#L${line}`;
  return renderHyperLink(`${name}:${line}`, url);
}


export function renderHyperLink(name: string, url: string) {
  return `<a href="${url}">${name}</a>`;
}

export function renderNewLine(): string {
  return "\n";
}

export function renderLineBreak(): string {
  return "<br>";
}

export function renderParagraph(text: string): string {
  return `<p>${text}</p>`;
}


export function renderList(items: string[]): string {
  return [
    renderListStart(),
    ...items.map(renderListItem),
    renderListEnd()
  ].join(renderNewLine());
}


export function renderListStart(): string {
  return "<ul>";
}

export function renderListEnd(): string {
  return "</ul>";
}

export function renderListItem(item: string): string {
  return `<li>${item}</li>`;
}


export function renderTitle(title: string, size: number, anchor?: string): string {
  const id = anchor ? `id="${anchor}"` : "";
  return `<h${size} ${id}>${title}</h${size}>${renderNewLine()}`;
}


export function renderHorizontalRule(): string {
  return `<hr>${renderNewLine()}`;
}

export function renderBoldText(text: string): string {
  return `<b>${text}</b>`;
}

export function renderItalicText(text: string): string {
  return `<i>${text}</i>`;
}

export function renderStrikeThroughText(text: string): string {
  return `<del>${text}</del>`;
}

export function renderUnderlineText(text: string): string {
  return `<u>${text}</u>`;
}

export function renderCode(code: string, language?: string): string {
  return `<pre><code language="${language ? language : ""}">${code}</code></pre>`;
}

export function renderSmallText(text: string): string {
  return `<small>${text}</small>`;
}

export function renderWarning(text: string): string {
  return `<blockquote>${text}</blockquote>`;
}
