import { getAnchorLink, hasAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SpanNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSpanNode(ctx: HTMLRenderContext, spanNode: SpanNode): string {

  const anchor = hasAnchor(spanNode)
    ? getAnchorLink(ctx, spanNode.name, spanNode.id)
    : undefined;

  const idAttribute = anchor ? ` id="${anchor}"` : "";

  const renderedNode = renderNode(ctx, spanNode.children);

  return renderedNode === ""
    ? renderedNode
    : `<span${idAttribute}>${renderedNode}</span>`;

}
