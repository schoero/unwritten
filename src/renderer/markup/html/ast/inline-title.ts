import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { InlineTitleNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderInlineTitleNode(ctx: HTMLRenderContext, inlineTitleNode: InlineTitleNode): string {

  const anchor = { id: inlineTitleNode.id, name: inlineTitleNode.name };
  const title = createTitleNode(inlineTitleNode.title, anchor, ...inlineTitleNode.children);

  return renderNode(ctx, title);

}
