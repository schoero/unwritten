import { getAnchorLink } from "unwritten:renderer/markup/utils/linker.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { AnchorNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderAnchorNode(ctx: HTMLRenderContext, anchorNode: AnchorNode): string {
  const anchorLink = getAnchorLink(ctx, anchorNode);
  return `<a href="#${anchorLink}">${renderNode(ctx, anchorNode.name)}</a>`;
}
