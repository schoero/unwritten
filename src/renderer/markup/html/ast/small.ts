import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SmallNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSmallNode(ctx: HTMLRenderContext, smallNode: SmallNode): string {

  const renderedIndentation = renderIndentation(ctx);
  const renderedNode = renderNode(ctx, smallNode.children);

  return renderedNode === ""
    ? renderedNode
    : `${renderedIndentation}<small>${renderedNode}</small>`;

}
