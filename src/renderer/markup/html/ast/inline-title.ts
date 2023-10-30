import { renderNode } from "unwritten:renderer/markup/html/index";
import { createTitleNode } from "unwritten:renderer/markup/utils/nodes";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { InlineTitleNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderInlineTitleNode(ctx: HTMLRenderContext, inlineTitleNode: InlineTitleNode): string {

  const anchor = { ids: inlineTitleNode.ids, name: inlineTitleNode.name };
  const title = createTitleNode(inlineTitleNode.title, anchor, ...inlineTitleNode.children);

  return renderNode(ctx, title);

}
