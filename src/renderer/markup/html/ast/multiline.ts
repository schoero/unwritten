import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { MultilineNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderMultilineNode(ctx: HTMLRenderContext, multilineNode: MultilineNode): string {

  const renderedNewLine = renderNewLine(ctx);

  const renderedChildren = multilineNode.children.map(
    child => renderNode(ctx, child)
  ).filter(renderedChild => renderedChild !== "");

  return renderedChildren.join(renderedNewLine);

}
