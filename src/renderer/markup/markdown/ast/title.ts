import { renderEmptyLine, startsWithEmptyLine } from "unwritten:renderer:markdown:utils/empty-line";
import { renderMultilineArray } from "unwritten:renderer/markup/markdown/ast/multiline";
import { renderNode } from "unwritten:renderer/markup/markdown/index";
import { hasAnchor, unregisterAnchor } from "unwritten:renderer/markup/registry/registry";
import { withNesting } from "unwritten:renderer/markup/utils/context";
import { renderNewLine } from "unwritten:renderer/utils/new-line";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { TitleNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderTitleNode(ctx: MarkdownRenderContext, titleNode: TitleNode): string {

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedTitle = renderTitle(ctx, titleNode);

  const renderedChildren = renderTitleChildren(ctx, titleNode);

  if(renderedChildren === ""){
    return "";
  }

  const childrenBeginsWithEmptyLine = startsWithEmptyLine(ctx, renderedChildren);
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

export function renderTitle(ctx: MarkdownRenderContext, titleNode: TitleNode): string {
  const title = renderNode(ctx, titleNode.title);
  return `${"#".repeat(ctx.nesting)} ${title}`;
}

export function renderTitleChildren(ctx: MarkdownRenderContext, titleNode: TitleNode) {

  const renderedChildren = withNesting(ctx, ctx => renderMultilineArray(ctx, titleNode.children));

  if(renderedChildren === ""){

    if(hasAnchor(titleNode)){
      void unregisterAnchor(ctx, titleNode.ids);
    }

    return "";
  }

  return renderedChildren;

}
