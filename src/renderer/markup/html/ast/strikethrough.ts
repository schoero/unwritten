import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { StrikethroughNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderStrikethroughNode(ctx: HTMLRenderContext, strikethroughNode: StrikethroughNode): string {
  const content = renderNode(ctx, strikethroughNode.children);
  return content === "" ? content : `<del>${renderNode(ctx, content)}</del>`;

}
