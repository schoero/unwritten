import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSectionNode(ctx: HTMLRenderContext, sectionNode: SectionNode): string {
  const classAttribute = sectionNode.type ? ` class="${sectionNode.type}"` : "";
  const renderedNode = renderNode(ctx, sectionNode.children);
  return renderedNode === ""
    ? renderedNode
    : `<section${classAttribute}>${renderNode(ctx, renderedNode)}</section>`;
}
