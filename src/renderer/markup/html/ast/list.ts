import { isListNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";

import { renderNewLine } from "../../../utils/new-line.js";
import { renderNode } from "../index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes, ListNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderListNode(ctx: HTMLRenderContext, listNode: ListNode): string {

  if(listNode.children.length === 0){
    return "";
  }

  const listStart = renderListStart(ctx);

  const listItems: string[] = [];

  for(let i = 0; i < listNode.children.length; i++){
  // For semantically valid html we need to render nested lists inside the current list item
    const item = listNode.children[i];
    const nextItem = listNode.children[i + 1];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if(nextItem !== undefined && isListNode(nextItem)){

      listItems.push(
        renderListItem(ctx, [
          (() => {
            const renderedNode = renderNode(ctx, item);
            ctx.indentation++;
            return renderedNode;
          })(),
          (() => {
            const renderedNode = renderNode(ctx, nextItem);
            ctx.indentation--;
            return renderedNode;
          })(),
          renderIndentation(ctx)
        ].join(renderNewLine(ctx)))
      );

      i++; // Skip the next item
      continue;

    }

    listItems.push(renderListItem(ctx, renderNode(ctx, item)));

  }

  const listEnd = renderListEnd(ctx);

  const filteredListItems = listItems.filter(listItem => !!listItem);

  if(filteredListItems.length === 0){
    return "";
  }

  return [listStart, ...filteredListItems, listEnd]
    .join(renderNewLine(ctx));

}


function renderListStart(ctx: HTMLRenderContext): string {
  const renderedListStart = `${renderIndentation(ctx)}<ul>`;
  ctx.indentation++;
  return renderedListStart;
}

function renderListItem(ctx: HTMLRenderContext, content: ASTNodes): string {
  const renderedNode = renderNode(ctx, content);
  return renderedNode === ""
    ? renderedNode
    : `${renderIndentation(ctx)}<li>${renderNode(ctx, content)}</li>`;
}

function renderListEnd(ctx: HTMLRenderContext): string {
  ctx.indentation--;
  return `${renderIndentation(ctx)}</ul>`;
}
