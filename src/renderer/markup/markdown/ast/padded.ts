import { renderNode } from "unwritten:renderer/markup/markdown/index";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { renderEmptyLine } from "unwritten:renderer:markdown:utils/empty-line";

import type { PaddedNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";


export function renderPaddedNode(ctx: MarkdownRenderContext, paddedNode: PaddedNode): string {

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = renderEmptyLine(ctx);

  const renderedChildren = renderNode(ctx, paddedNode.children);

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
