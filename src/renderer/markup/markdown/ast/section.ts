import { renderEmptyLine } from "unwritten:renderer/markup/markdown/utils/empty-line.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSectionNode(ctx: MarkdownRenderContext, sectionNode: SectionNode): string {

  const renderedNode = renderNode(ctx, sectionNode.children);
  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedNewLine = renderNewLine(ctx);

  return renderedNode === ""
    ? renderedNode
    : `${renderedEmptyLine}${renderedNewLine}${renderedNode}`;
}
