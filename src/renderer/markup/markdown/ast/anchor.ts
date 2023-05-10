import { getAnchorLink } from "unwritten:renderer/markup/utils/linker.js";
import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { AnchorNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderAnchorNode(ctx: MarkdownRenderContext, anchorNode: AnchorNode): string {
  const anchorLink = getAnchorLink(ctx, anchorNode);
  return `[${renderNode(ctx, anchorNode.name)}](#${anchorLink})`;
}
