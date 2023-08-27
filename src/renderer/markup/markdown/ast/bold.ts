import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { BoldNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderBoldNode(ctx: MarkdownRenderContext, boldNode: BoldNode): string {
  const renderedNode = renderNode(ctx, boldNode.children);
  return renderedNode === ""
    ? renderedNode
    : `**${renderedNode}**`;
}
