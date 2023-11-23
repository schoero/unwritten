import { renderWithIndentation } from "unwritten:renderer/utils/indentation";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { renderNode } from "unwritten:renderer:html:index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { MultilineNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderMultilineNode(ctx: HTMLRenderContext, multilineNode: MultilineNode): string {

  const renderedNewLine = renderNewLine(ctx);

  return multilineNode.children.map((subNode, index) => {
    const renderedSubNode = renderNode(ctx, subNode);
    return renderWithIndentation(ctx, renderedSubNode);
  }).filter(renderedChild => renderedChild !== "")
    .join(renderedNewLine);

}
