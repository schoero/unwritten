import { renderNode } from "unwritten:renderer:html/index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { SmallNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderSmallNode(ctx: HTMLRenderContext, smallNode: SmallNode): string {

  const renderedNode = renderNode(ctx, smallNode.children);

  return renderedNode === ""
    ? renderedNode
    : `<small>${renderedNode}</small>`;

}
