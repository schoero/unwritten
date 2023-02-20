import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { LinkNode } from "unwritten:renderer/markup/types-definitions/nodes.js";


export function renderLinkNode(ctx: HTMLRenderContext, linkNode: LinkNode): string {

  const link = linkNode.link;
  const title = linkNode.children;

  return `<a href="${link}">${renderNode(ctx, title)}</a>`;

}
