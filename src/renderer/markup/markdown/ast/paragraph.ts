import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ParagraphNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderParagraphNode(ctx: MarkdownRenderContext, paragraphNode: ParagraphNode): string {

  const renderedIndentation = renderIndentation(ctx);

  const renderedNode = renderNode(ctx, paragraphNode.children);
  return renderedNode === ""
    ? renderedNode
    : `${renderedIndentation}${renderedNode}  `;
}
