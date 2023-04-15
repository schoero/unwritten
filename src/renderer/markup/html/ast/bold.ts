import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { BoldNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderBoldNode(ctx: HTMLRenderContext, boldNode: BoldNode): string {
  const renderedNode = renderNode(ctx, boldNode.children);
  return renderedNode === ""
    ? renderedNode
    : `<b>${renderNode(ctx, renderedNode)}</b>`;
}
