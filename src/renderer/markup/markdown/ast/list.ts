import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { isListNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { renderIndentation as renderIndentationOriginal } from "unwritten:renderer:utils/indentation.js";

import { renderNode } from "../index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes, ListNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderListNode(ctx: MarkdownRenderContext, listNode: ListNode): string {

  // Do not render empty lists
  if(listNode.children.length === 0){
    return "";
  }

  // Collapse nested lists without siblings
  if(listNode.children.length === 1 && isListNode(listNode.children[0])){
    return renderListNode(ctx, listNode.children[0]);
  }

  ctx.indentation++;
  const renderedListItems = renderListItems(ctx, listNode.children);
  ctx.indentation--;

  return renderedListItems
    .filter(item => !!item)
    .join(renderNewLine(ctx));

}

function renderListItems(ctx: MarkdownRenderContext, items: ASTNodes[]): string[] {
  return items.map(item => renderListItem(ctx, item));
}

function renderListItem(ctx: MarkdownRenderContext, item: ASTNodes): string {

  // Flatten deeply nested arrays
  item = Array.isArray(item) ? flattenNestedArrayItems(item) : item;

  // Render lists in an array on a new line
  if(Array.isArray(item) && item.some(isListNode)){

    const renderedArrayItems = renderArrayItems(ctx, item);

    if(renderedArrayItems === ""){
      return "";
    }

    return `${renderIndentation(ctx)}- ${renderedArrayItems}`;

  }

  // Render lists without wrapping in a list element
  if(isListNode(item)){
    return renderListNode(ctx, item);
  }

  const renderedItem = renderNode(ctx, item);

  return renderedItem === ""
    ? renderedItem
    : `${renderIndentation(ctx)}- ${renderedItem}`;

}

function flattenNestedArrayItems(items: ASTNodes[]): ASTNodes[] {

  // Flatten deeply nested arrays
  if(items.some(Array.isArray) && !items.some(isListNode)){
    return flattenNestedArrayItems(items.flat());
  }

  return items;

}

function renderArrayItems(ctx: MarkdownRenderContext, items: ASTNodes[]): string {

  // Render normal array without a list
  if(!items.some(isListNode)){
    return renderNode(ctx, items);
  }

  const renderedArrayItems: string[] = [];

  // render lists in an array on a new line
  for(let index = 0; index < items.length; index++){

    const currentItem = items[index];
    const nextItem: ASTNodes | undefined = items[index + 1];

    const renderedItem = renderNode(ctx, currentItem);

    if(!isListNode(nextItem)){
      renderedArrayItems.push(renderedItem);
      continue;
    }

    const renderedNewLine = renderNewLine(ctx);

    const renderedNextItem = renderNode(ctx, nextItem);

    if(renderedNextItem === ""){
      return renderedItem;
    }

    renderedArrayItems.push(
      renderedItem,
      renderedNewLine,
      renderedNextItem
    );

    // Skip next item as it has already been rendered
    index++;

  }

  return renderedArrayItems
    .flat()
    .join("");

}

function renderIndentation(ctx: MarkdownRenderContext): string {
  ctx.indentation--;
  const indentation = renderIndentationOriginal(ctx);
  ctx.indentation++;
  return indentation;
}
