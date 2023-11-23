import { renderNode } from "unwritten:renderer:html:index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { LinkNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderLinkNode(ctx: HTMLRenderContext, linkNode: LinkNode): string {

  const link = linkNode.link;
  const title = linkNode.children;

  return `<a href="${link}">${renderNode(ctx, title)}</a>`;

}
