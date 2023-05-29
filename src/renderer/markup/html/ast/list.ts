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

  const renderArrayItems = (arrayItems: ASTNodes[]): string[] => {

    const nestedListItems: string[] = [];

    for(let i = 0; i < arrayItems.length; i++){
      // For semantically valid html we need to render nested lists inside the current list item
      const item = arrayItems[i];
      const nextItem: ASTNodes | undefined = arrayItems[i + 1];

      if(Array.isArray(item) && item.flat().some(isListNode)){

        const renderedNestedItem = item
          .flat()
          .flatMap(nestedItem => {
            if(isListNode(nestedItem)){
              ctx.indentation++;
              const renderedListNode = renderListNode(ctx, nestedItem);
              const renderedNode = renderedListNode === ""
                ? ""
                : [
                  renderNewLine(ctx),
                  renderedListNode
                ];
              ctx.indentation--;
              return renderedNode;
            } else {
              return renderNode(ctx, nestedItem);
            }
          })
          .join("");

        nestedListItems.push(renderMultilineListItem(ctx, renderedNestedItem));
        continue;

      } else {

        if(isListNode(nextItem)){

          const renderedCurrentItem = renderNode(ctx, item);
          ctx.indentation++;
          const renderedNextItem = renderNode(ctx, nextItem);
          ctx.indentation--;

          const renderedItems = [
            renderedCurrentItem,
            renderedNextItem
          ].filter(item => !!item);

          const renderedListItem = renderedItems.length > 1
            ? renderMultilineListItem(ctx, renderedItems.join(renderNewLine(ctx)))
            : renderListItem(ctx, renderedItems);

          nestedListItems.push(renderedListItem);

          i++; // Skip the next item
          continue;

        }
      }

      nestedListItems.push(renderListItem(ctx, renderNode(ctx, item)));

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
  ].join(renderNewLine(ctx));

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
    : `${renderIndentation(ctx)}<li>${renderedNode}</li>`;
}

function renderMultilineListItem(ctx: HTMLRenderContext, content: ASTNodes): string {

  const renderedNode = renderNode(ctx, content);

  if(renderedNode === ""){
    return renderedNode;
  }

  const listStart = `${renderIndentation(ctx)}<li>`;
  ctx.indentation++;
  const listContent = `${renderIndentation(ctx)}${renderNode(ctx, content)}`;
  ctx.indentation--;
  const listEnd = `${renderIndentation(ctx)}</li>`;

  return [listStart, listContent, listEnd].join(renderNewLine(ctx));

}

function renderListEnd(ctx: HTMLRenderContext): string {
  ctx.indentation--;
  return `${renderIndentation(ctx)}</ul>`;
}
