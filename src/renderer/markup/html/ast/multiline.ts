import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { MultilineNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderMultilineNode(ctx: HTMLRenderContext, multilineNode: MultilineNode): string {

  const renderedNewLine = renderNewLine(ctx);
  const renderedIndentation = renderIndentation(ctx);

  return multilineNode.children.map((subNode, index) => {

    const renderedNode = renderNode(ctx, subNode);

    if(renderedNode === ""){
      return "";
    }

    // Render indentation for all children
    const renderedNodeWithIndentation = renderedNode.startsWith(renderedIndentation)
      ? renderedNode
      : `${renderedIndentation}${renderedNode}`;

    return renderedNodeWithIndentation;

  }).filter(renderedChild => renderedChild !== "")
    .join(renderedNewLine);

}
