import { renderNode } from "unwritten:renderer:html:index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { BoldNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderBoldNode(ctx: HTMLRenderContext, boldNode: BoldNode): string {
  const renderedNode = renderNode(ctx, boldNode.children);
  return renderedNode === ""
    ? renderedNode
    : `<b>${renderedNode}</b>`;
}
