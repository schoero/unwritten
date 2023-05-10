import { getAnchorLink, hasAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SpanNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSpanNode(ctx: MarkdownRenderContext, spanNode: SpanNode): string {

  const id = hasAnchor(spanNode) ? getAnchorLink(ctx, spanNode) : undefined;
  const idAttribute = id ? ` id="${id}"` : "";

  const renderedNode = renderNode(ctx, spanNode.children);

  return renderedNode === ""
    ? renderedNode
    : `<span${idAttribute}>${renderedNode}</span>`;

}
