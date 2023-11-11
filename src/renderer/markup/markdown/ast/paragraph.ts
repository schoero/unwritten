import { renderWithIndentation } from "unwritten:renderer/utils/indentation";
import { renderNode } from "unwritten:renderer:markdown/index";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ParagraphNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderParagraphNode(ctx: MarkdownRenderContext, paragraphNode: ParagraphNode): string {
  const renderedNode = renderNode(ctx, paragraphNode.children);
  const trailingSpaces = renderedNode.endsWith("  ")
    ? ""
    : "  ";

  return renderedNode === ""
    ? ""
    : renderWithIndentation(ctx, `${renderedNode}${trailingSpaces}`);
}
