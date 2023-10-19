import { getAnchorId, hasAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SpanNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSpanNode(ctx: MarkdownRenderContext, spanNode: SpanNode): string {

  const renderConfig = getRenderConfig(ctx);

  if(renderConfig.allowedHTMLTags === false || !renderConfig.allowedHTMLTags.includes("span")){
    return renderNode(ctx, spanNode.children);
  }

  const id = hasAnchor(spanNode)
    ? getAnchorId(ctx, spanNode.ids)
    : undefined;

  const idAttribute = id ? ` id="${id}"` : "";

  const renderedNode = renderNode(ctx, spanNode.children);

  return renderedNode === ""
    ? renderedNode
    : `<span${idAttribute}>${renderedNode}</span>`;

}
