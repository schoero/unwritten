import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ItalicNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderItalicNode(ctx: MarkdownRenderContext, italicNode: ItalicNode): string {
  const renderedNode = renderNode(ctx, italicNode.children);
  return renderedNode === ""
    ? renderedNode
    : `*${renderedNode}*`;
}
