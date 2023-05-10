import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SmallNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSmallNode(ctx: MarkdownRenderContext, smallNode: SmallNode): string {
  const renderedNode = renderNode(ctx, smallNode.children);
  return renderedNode === ""
    ? renderedNode
    : `<small>${renderNode(ctx, renderedNode)}</small>`;
}
