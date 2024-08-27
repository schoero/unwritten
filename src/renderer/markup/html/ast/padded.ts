import { renderNode } from "unwritten:renderer/markup/html/index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { PaddedNode } from "unwritten:renderer/markup/types-definitions/nodes";


export function renderPaddedNode(ctx: HTMLRenderContext, paddedNode: PaddedNode): string {
  return renderNode(ctx, paddedNode.children);
}
