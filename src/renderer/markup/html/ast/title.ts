import { getAnchorId, hasAnchor, unregisterAnchor } from "unwritten:renderer/markup/registry/registry";
import { withNesting } from "unwritten:renderer/markup/utils/context";
import { renderWithIndentation } from "unwritten:renderer/utils/indentation";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { renderNode } from "unwritten:renderer:html:index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { TitleNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderTitleNode(ctx: HTMLRenderContext, titleNode: TitleNode): string {

  const title = renderNode(ctx, titleNode.title);

  const id = hasAnchor(titleNode)
    ? getAnchorId(ctx, titleNode.ids)
    : undefined;

  const idAttribute = id ? ` id="${id}"` : "";

  const renderedTitle = renderWithIndentation(ctx, `<h${ctx.nesting}${idAttribute}>${title}</h${ctx.nesting}>`);
  const renderedChildren = withNesting(ctx, ctx => titleNode.children.map(child => renderNode(ctx, child)));

  if(renderedChildren.every(renderedChild => renderedChild === "")){

    if(hasAnchor(titleNode)){
      void unregisterAnchor(ctx, titleNode.ids);
    }

    return "";
  }

  return [
    renderedTitle,
    ...renderedChildren
  ]
    .filter(renderedNode => !!renderedNode)
    .join(renderNewLine(ctx));

}
