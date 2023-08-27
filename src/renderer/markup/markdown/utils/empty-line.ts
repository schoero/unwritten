import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";


export function renderEmptyLine(ctx: MarkdownRenderContext): string {
  return "  ";
}
