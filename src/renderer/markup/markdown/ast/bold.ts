import { renderNode } from "unwritten:renderer:markdown:index";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { BoldNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderBoldNode(ctx: MarkdownRenderContext, boldNode: BoldNode): string {
  const renderedNode = renderNode(ctx, boldNode.children);
  return renderedNode === ""
    ? renderedNode
    : `**${renderedNode}**`;
}
