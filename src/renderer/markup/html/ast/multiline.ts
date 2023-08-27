import { isListNode, isParagraphNode, isTitleNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { MultilineNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderMultilineNode(ctx: HTMLRenderContext, multilineNode: MultilineNode): string {

  const renderedNewLine = renderNewLine(ctx);

  return multilineNode.children.map((subNode, index) => {

    const renderedNode = renderNode(ctx, subNode);

    if(renderedNode === ""){
      return "";
    }

    // Render a new line before nodes that require it
    return index > 0 && (isListNode(subNode) || isTitleNode(subNode) || isParagraphNode(subNode))
      ? `${renderNewLine(ctx)}${renderedNode}`
      : renderedNode;

  }).filter(renderedChild => renderedChild !== "")
    .join(renderedNewLine);

}
