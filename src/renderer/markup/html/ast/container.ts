import { renderNewLine } from "../../../utils/new-line.js";
import { renderNode } from "../index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ContainerNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderContainerNode(ctx: HTMLRenderContext, containerNode: ContainerNode): string {

  if(Array.isArray(containerNode.children)){
    const renderedChildren = containerNode.children.map(child => renderNode(ctx, child))
      .join(renderNewLine(ctx));
    return renderedChildren;
  } else {
    return renderNode(ctx, containerNode.children);
  }

}
