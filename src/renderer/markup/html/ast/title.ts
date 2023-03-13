import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { TitleNode } from "unwritten:renderer/markup/types-definitions/nodes.js";


export function renderTitleNode(ctx: HTMLRenderContext, titleNode: TitleNode): string {

  if(titleNode.children.length === 0){
    return "";
  }

  const title = renderNode(ctx, titleNode.title);
  const size = ctx.size;

  const renderedTitle = `<h${size}>${title}</h${size}>`;

  ctx.size++;
  const renderedChildren = titleNode.children.map(child => renderNode(ctx, child));
  ctx.size--;

  return [
    renderedTitle,
    ...renderedChildren
  ].join(renderNewLine(ctx));

}
