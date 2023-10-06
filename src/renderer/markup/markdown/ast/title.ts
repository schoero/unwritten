import { renderMultilineArray } from "unwritten:renderer/markup/markdown/ast/multiline.js";
import { renderNode } from "unwritten:renderer/markup/markdown/index.js";
import { hasAnchor, unregisterAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderEmptyLine } from "unwritten:renderer:markdown/utils/empty-line.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { TitleNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderTitleNode(ctx: MarkdownRenderContext, titleNode: TitleNode): string {

  const title = renderNode(ctx, titleNode.title);

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedTitle = `${"#".repeat(ctx.nesting)} ${title}`;

  ctx.nesting++;
  const renderedChildren = renderMultilineArray(ctx, titleNode.children);
  ctx.nesting--;

  if(renderedChildren === ""){

    if(hasAnchor(titleNode)){
      void unregisterAnchor(ctx, titleNode.name, titleNode.id);
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
