import { renderNode } from "unwritten:renderer:html:index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { StrikethroughNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderStrikethroughNode(ctx: HTMLRenderContext, strikethroughNode: StrikethroughNode): string {
  const renderedNode = renderNode(ctx, strikethroughNode.children);
  return renderedNode === ""
    ? renderedNode
    : `<del>${renderedNode}</del>`;

}
