import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createAnchorNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { InlineTitleNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderInlineTitleNode(ctx: HTMLRenderContext, inlineTitleNode: InlineTitleNode): string {
  const anchor = inlineTitleNode.id && inlineTitleNode.name
    ? createAnchorNode(inlineTitleNode.name, inlineTitleNode.id)
    : undefined;

  const title = anchor
    ? createTitleNode(inlineTitleNode.title, anchor, ...inlineTitleNode.children)
    : createTitleNode(inlineTitleNode.title, ...inlineTitleNode.children);

  return renderNode(ctx, title);
}
