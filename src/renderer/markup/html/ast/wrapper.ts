import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { WrapperNode } from "unwritten:renderer/markup/types-definitions/nodes.js";


export function renderWrapperNode(ctx: HTMLRenderContext, paragraphNode: WrapperNode): string {
  const content = paragraphNode.children;
  return Array.isArray(content)
    ? content.map(child => renderNode(ctx, child)).join("")
    : renderNode(ctx, content);
}
