import { renderNode } from "unwritten:renderer:markdown:index";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { SmallNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderSmallNode(ctx: MarkdownRenderContext, smallNode: SmallNode): string {
  return renderNode(ctx, smallNode.children);
}
