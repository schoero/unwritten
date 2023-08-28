import { renderNode } from "unwritten:renderer/markup/html/index.js";

import type { PaddedNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";


export function renderPaddedNode(ctx: HTMLRenderContext, paddedNode: PaddedNode): string {
  return renderNode(ctx, paddedNode.children);
}
