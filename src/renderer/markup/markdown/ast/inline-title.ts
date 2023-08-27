import { renderMultilineArray } from "unwritten:renderer/markup/markdown/ast/multiline.js";
import { renderNode } from "unwritten:renderer/markup/markdown/index.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderEmptyLine } from "unwritten:renderer:markdown/utils/empty-line.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { InlineTitleNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderInlineTitleNode(ctx: MarkdownRenderContext, inlineTitleNode: InlineTitleNode): string {

  const renderedIndentation = renderIndentation(ctx);

  const title = `${renderedIndentation}${renderNode(ctx, inlineTitleNode.title)}`;

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedChildren = renderMultilineArray(ctx, inlineTitleNode.children);

  if(renderedChildren === ""){
    return "";
  }

  const childrenBeginsWithEmptyLine = renderedChildren.startsWith(renderedEmptyLine + renderedNewLine);
  const trailingEmptyLine = childrenBeginsWithEmptyLine ? "" : renderedEmptyLine;

  return [
    renderedEmptyLine,
    title,
    trailingEmptyLine,
    renderedChildren
  ]
    .filter(renderedNode => !!renderedNode)
    .join(renderedNewLine);

}
