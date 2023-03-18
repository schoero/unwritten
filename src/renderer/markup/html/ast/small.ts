import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SmallNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSmallNode(ctx: HTMLRenderContext, smallNode: SmallNode): string {
  const content = renderNode(ctx, smallNode.children);
  return content === "" ? content : `<small>${renderNode(ctx, content)}</small>`;
}
