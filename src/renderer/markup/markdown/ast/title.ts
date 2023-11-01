import { renderMultilineArray } from "unwritten:renderer/markup/markdown/ast/multiline";
import { renderNode } from "unwritten:renderer/markup/markdown/index";
import { hasAnchor, unregisterAnchor } from "unwritten:renderer/markup/registry/registry";
import { withNesting } from "unwritten:renderer/markup/utils/context";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { renderEmptyLine } from "unwritten:renderer:markdown/utils/empty-line";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { TitleNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderTitleNode(ctx: MarkdownRenderContext, titleNode: TitleNode): string {

  const title = renderNode(ctx, titleNode.title);

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedTitle = `${"#".repeat(ctx.nesting)} ${title}`;

  const renderedChildren = withNesting(ctx, ctx => renderMultilineArray(ctx, titleNode.children));

  if(renderedChildren === ""){

    if(hasAnchor(titleNode)){
      void unregisterAnchor(ctx, titleNode.ids);
    }

    return "";
  }

  const childrenBeginsWithEmptyLine = renderedChildren.startsWith(renderedEmptyLine + renderedNewLine);
  const trailingEmptyLine = childrenBeginsWithEmptyLine ? "" : renderedEmptyLine;

  return [
    renderedEmptyLine,
    renderedTitle,
    trailingEmptyLine,
    renderedChildren
  ]
    .filter(renderedNode => !!renderedNode)
    .join(renderedNewLine);

}
