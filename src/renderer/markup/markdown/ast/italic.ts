import { renderNode } from "unwritten:renderer:markdown/index";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ItalicNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderItalicNode(ctx: MarkdownRenderContext, italicNode: ItalicNode): string {
  const renderedNode = renderNode(ctx, italicNode.children);
  return renderedNode === ""
    ? renderedNode
    : `*${renderedNode}*`;
}
