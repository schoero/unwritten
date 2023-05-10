import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { StrikethroughNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderStrikethroughNode(ctx: MarkdownRenderContext, strikethroughNode: StrikethroughNode): string {
  const renderedNode = renderNode(ctx, strikethroughNode.children);
  return renderedNode === ""
    ? renderedNode
    : `~~${renderedNode}~~`;

}
