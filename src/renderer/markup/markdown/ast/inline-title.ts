import { renderEmptyLine, startsWithEmptyLine } from "unwritten:renderer:markdown:utils/empty-line";
import { renderMultilineArray } from "unwritten:renderer/markup/markdown/ast/multiline";
import { renderNode } from "unwritten:renderer/markup/markdown/index";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { renderWithIndentation } from "unwritten:renderer/utils/indentation";
import { renderNewLine } from "unwritten:renderer/utils/new-line";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { InlineTitleNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderInlineTitleNode(ctx: MarkdownRenderContext, inlineTitleNode: InlineTitleNode): string {

  const renderConfig = getRenderConfig(ctx);

  const renderedTitle = renderNode(ctx, inlineTitleNode.title);
  const encapsulatedTitle = renderNode(
    ctx,
    encapsulate(`${renderedTitle}:`, renderConfig.inlineTitleEncapsulation)
  );
  const indentedTitle = renderWithIndentation(ctx, encapsulatedTitle);

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedChildren = renderMultilineArray(ctx, inlineTitleNode.children);

  if(renderedChildren === ""){
    return "";
  }

  const childrenBeginsWithEmptyLine = startsWithEmptyLine(ctx, renderedChildren);
  const trailingEmptyLine = childrenBeginsWithEmptyLine ? "" : renderedEmptyLine;

  return [
    renderedEmptyLine,
    indentedTitle,
    trailingEmptyLine,
    renderedChildren
  ]
    .filter(renderedNode => !!renderedNode)
    .join(renderedNewLine);

}
