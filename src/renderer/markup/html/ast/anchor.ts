import { getAnchorId } from "unwritten:renderer/markup/registry/registry.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { AnchorNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderAnchorNode(ctx: HTMLRenderContext, anchorNode: AnchorNode): string {
  const anchorId = getAnchorId(ctx, anchorNode.name, anchorNode.id);
  return `<a href="#${anchorId}">${renderNode(ctx, anchorNode.name)}</a>`;
}
