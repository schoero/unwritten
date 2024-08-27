import { renderNode } from "unwritten:renderer:html:index";
import { getAnchorId, hasAnchor } from "unwritten:renderer/markup/registry/registry";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { SpanNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderSpanNode(ctx: HTMLRenderContext, spanNode: SpanNode): string {

  const anchor = hasAnchor(spanNode)
    ? getAnchorId(ctx, spanNode.ids)
    : undefined;

  const idAttribute = anchor ? ` id="${anchor}"` : "";

  const renderedNode = renderNode(ctx, spanNode.children);

  return renderedNode === ""
    ? renderedNode
    : `<span${idAttribute}>${renderedNode}</span>`;

}
