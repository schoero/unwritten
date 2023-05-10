import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { LinkNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderLinkNode(ctx: MarkdownRenderContext, linkNode: LinkNode): string {

  const link = linkNode.link;
  const title = linkNode.children;

  return `[${renderNode(ctx, title)}](${link})`;

}
