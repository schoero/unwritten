import { renderEmptyLine } from "unwritten:renderer/markup/markdown/utils/empty-line.js";
import { renderNode } from "unwritten:renderer:markdown/index.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { TitleNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderTitleNode(ctx: MarkdownRenderContext, titleNode: TitleNode): string {

  const title = renderNode(ctx, titleNode.title);

  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedTitle = `${"#".repeat(ctx.nesting)} ${title}`;

  ctx.nesting++;
  const renderedChildren = titleNode.children.map(child => renderNode(ctx, child));
  ctx.nesting--;

  if(renderedChildren.length === 0){
    return "";
  }

  const childrenBeginsWithEmptyLine = renderedChildren[0]?.startsWith(renderedEmptyLine);

  const beginningEmptyLine = childrenBeginsWithEmptyLine ? "" : renderedEmptyLine;

  const returnValue = [
    renderedEmptyLine,
    renderedTitle,
    beginningEmptyLine,
    ...renderedChildren
  ]
    .filter(renderedNode => !!renderedNode)
    .join(renderNewLine(ctx));

  return returnValue;

}
