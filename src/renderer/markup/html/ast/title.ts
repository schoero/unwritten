import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:html/index.js";
import { getAnchorLink, hasAnchor } from "unwritten:renderer:markup/utils/linker.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { TitleNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderTitleNode(ctx: HTMLRenderContext, titleNode: TitleNode): string {

  const renderedIndentation = renderIndentation(ctx);
  const title = renderNode(ctx, titleNode.title);

  const id = hasAnchor(titleNode) ? getAnchorLink(ctx, titleNode) : undefined;
  const idAttribute = id ? ` id="${id}"` : "";

  const renderedTitle = `${renderedIndentation}<h${ctx.nesting}${idAttribute}>${title}</h${ctx.nesting}>`;

  ctx.nesting++;
  const renderedChildren = titleNode.children.map(child => renderNode(ctx, child));
  ctx.nesting--;

  if(renderedChildren.every(renderedChild => renderedChild === "")){
    return "";
  }

  return [
    renderedTitle,
    ...renderedChildren
  ]
    .filter(renderedNode => !!renderedNode)
    .join(renderNewLine(ctx));

}
