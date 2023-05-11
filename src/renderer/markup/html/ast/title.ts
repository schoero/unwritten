import { getAnchorLink, hasAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNode } from "unwritten:renderer:html/index.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { TitleNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderTitleNode(ctx: HTMLRenderContext, titleNode: TitleNode): string {

  if(titleNode.children.length === 0){
    return "";
  }

  const renderedIndentation = renderIndentation(ctx);

  const title = renderNode(ctx, titleNode.title);
  const size = ctx.size;

  const id = hasAnchor(titleNode) ? getAnchorLink(ctx, titleNode) : undefined;
  const idAttribute = id ? ` id="${id}"` : "";

  const renderedTitle = `${renderedIndentation}<h${size}${idAttribute}>${title}</h${size}>`;

  ctx.size++;
  const renderedChildren = titleNode.children.map(child => renderNode(ctx, child));
  ctx.size--;

  return [
    renderedTitle,
    ...renderedChildren
  ]
    .filter(renderedNode => !!renderedNode)
    .join(renderNewLine(ctx));

}
