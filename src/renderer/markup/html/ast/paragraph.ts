import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ParagraphNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderParagraphNode(ctx: HTMLRenderContext, paragraphNode: ParagraphNode): string {

  const renderedIndentation = renderIndentation(ctx);
  const renderedNode = renderNode(ctx, paragraphNode.children);

  return renderedNode === ""
    ? renderedNode
    : `${renderedIndentation}<p>${renderedNode}</p>`;

}
