import { renderNode } from "unwritten:renderer/markup/markdown/index.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderEmptyLine } from "unwritten:renderer:markdown/utils/empty-line.js";

import type { PaddedNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";


export function renderPaddedNode(ctx: MarkdownRenderContext, paddedNode: PaddedNode): string {

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = renderEmptyLine(ctx);

  ctx.nesting++;
  const renderedChildren = renderNode(ctx, paddedNode.children);
  ctx.nesting--;

  if(renderedChildren === ""){
    return "";
  }

  return [
    renderedEmptyLine,
    renderedChildren
  ]
    .filter(renderedNode => !!renderedNode)
    .join(renderedNewLine);

}
