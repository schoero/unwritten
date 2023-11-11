import { renderNewLine } from "unwritten:renderer/utils/new-line.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";


export function renderEmptyLine(ctx: MarkdownRenderContext): string {
  return "  ";
}

export function startsWithEmptyLine(ctx: MarkdownRenderContext, renderedNode: string): boolean {
  const renderedNewLine = renderNewLine(ctx);
  const emptyLineRegex = new RegExp(`^\\s*${renderedNewLine}`);
  return emptyLineRegex.test(renderedNode);
}
