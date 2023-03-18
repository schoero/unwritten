import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { AnchorNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderAnchorNode(ctx: HTMLRenderContext, anchorNode: AnchorNode): string {

  const anchor = anchorNode.id;
  const content = anchorNode.children;

  return `<a href="#${anchor}">${renderNode(ctx, content)}</a>`;

}
