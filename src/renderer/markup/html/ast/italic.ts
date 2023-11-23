import { renderNode } from "unwritten:renderer:html:index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ItalicNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderItalicNode(ctx: HTMLRenderContext, italicNode: ItalicNode): string {
  const renderedNode = renderNode(ctx, italicNode.children);
  return renderedNode === ""
    ? renderedNode
    : `<i>${renderedNode}</i>`;
}
