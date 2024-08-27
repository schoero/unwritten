import { renderNode } from "unwritten:renderer:html:index";
import { renderWithIndentation } from "unwritten:renderer/utils/indentation";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ParagraphNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderParagraphNode(ctx: HTMLRenderContext, paragraphNode: ParagraphNode): string {

  const renderedNode = renderNode(ctx, paragraphNode.children);

  return renderedNode === ""
    ? renderedNode
    : renderWithIndentation(ctx, `<p>${renderedNode}</p>`);

}
