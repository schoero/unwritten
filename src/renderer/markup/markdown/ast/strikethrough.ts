import { renderNode } from "unwritten:renderer:markdown/index";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { StrikethroughNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderStrikethroughNode(ctx: MarkdownRenderContext, strikethroughNode: StrikethroughNode): string {
  const renderedNode = renderNode(ctx, strikethroughNode.children);
  return renderedNode === ""
    ? renderedNode
    : `~~${renderedNode}~~`;

}
