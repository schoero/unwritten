import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";


export function renderEmptyLine(ctx: MarkdownRenderContext): string {
  return "  ";
}
