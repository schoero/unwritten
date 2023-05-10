import { isListNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";

import { renderNewLine } from "../../../utils/new-line.js";
import { renderNode } from "../index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes, ListNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderListNode(ctx: MarkdownRenderContext, listNode: ListNode): string {

  if(listNode.children.length === 0){
    return "";
  }

  const renderArrayItems = (arrayItems: ASTNodes[]): string[] => {

    const nestedListItems: string[] = [];

    for(let i = 0; i < arrayItems.length; i++){
      const item = arrayItems[i];

      if(Array.isArray(item) && item.flat().some(isListNode)){

        const renderedNestedItem = item
          .flat()
          .reduce<[buffer: string[], items: string[]]>(([buffer, items], nestedItem) => {
          if(isListNode(nestedItem)){

            items.push(renderListItem(ctx, buffer));
            buffer = [];

            const renderedNode = renderNode(ctx, [
              renderNewLine(ctx),
              renderListNode(ctx, nestedItem)
            ]);

            items.push(renderedNode);
            return [buffer, items];

          } else {
            const renderedNode = renderNode(ctx, nestedItem);
            buffer.push(renderedNode);
            return [buffer, items];
          }
        }, [[], []]);

        const [remainingBuffer, result] = renderedNestedItem;
        const renderedItemsWithBuffer = [
          ...result,
          ...renderListItem(ctx, renderNode(ctx, remainingBuffer))
        ].join("");

        nestedListItems.push(renderedItemsWithBuffer);

      } else {
        if(isListNode(item)){
          nestedListItems.push(renderListNode(ctx, item));
        } else {
          nestedListItems.push(renderListItem(ctx, renderNode(ctx, item)));
        }
      }

    }

    return nestedListItems;

  };

  const listStart = renderListStart(ctx);
  const listItems = renderArrayItems(listNode.children);
  const listEnd = renderListEnd(ctx);

  const filteredListItems = listItems.filter(listItem => !!listItem);

  if(filteredListItems.length === 0){
    return "";
  }

  return [
    listStart,
    ...filteredListItems,
    listEnd
  ].filter(item => !!item)
    .join(renderNewLine(ctx));

}


function renderListStart(ctx: MarkdownRenderContext): string {
  ctx.indentation++;
  return "";
}

function renderListItem(ctx: MarkdownRenderContext, content: ASTNodes): string {

  const renderedNode = renderNode(ctx, content);

  ctx.indentation--;
  const renderedListItem = renderedNode === ""
    ? renderedNode
    : `${renderIndentation(ctx)}- ${renderNode(ctx, content)}`;
  ctx.indentation++;

  return renderedListItem;
}

function renderListEnd(ctx: MarkdownRenderContext): string {
  ctx.indentation--;
  return "";
}
