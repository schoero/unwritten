import { isListNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";

import { renderNode } from "../index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes, ListNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderListNode(ctx: HTMLRenderContext, listNode: ListNode): string {

  // Do not render empty lists
  if(listNode.children.length === 0){
    return "";
  }

  // Collapse nested lists without siblings
  if(listNode.children.length === 1 && isListNode(listNode.children[0])){
    return renderListNode(ctx, listNode.children[0]);
  }

  const renderedListStart = renderListStart(ctx);
  const renderedListItems = renderListItems(ctx, listNode.children);
  const renderedListEnd = renderListEnd(ctx);

  const filteredListItems = renderedListItems.filter(item => !!item);

  // Do not render empty list items
  if(filteredListItems.length === 0){
    return "";
  }

  const renderedList = [
    renderedListStart,
    ...filteredListItems,
    renderedListEnd
  ];

  return renderedList
    .filter(item => !!item)
    .join(renderNewLine(ctx));

}

function renderListItems(ctx: HTMLRenderContext, items: ASTNodes[]): string[] {
  return items.map(item => renderListItem(ctx, item));
}

function renderListStart(ctx: HTMLRenderContext): string {
  const renderedListStart = `${renderIndentation(ctx)}<ul>`;
  ctx.indentation++;
  return renderedListStart;
}

function renderListItem(ctx: HTMLRenderContext, item: ASTNodes): string {

  // Flatten deeply nested arrays
  item = Array.isArray(item) ? flattenNestedArrayItems(item) : item;

  // Render lists in an array on a new line
  if(Array.isArray(item) && item.some(isListNode)){

    const renderedStartTag = `${renderIndentation(ctx)}<li>`;
    ctx.indentation++;

    const renderedArrayItems = renderArrayItems(ctx, item);

    if(renderedArrayItems === ""){
      return "";
    }

    const renderedItem = `${renderIndentation(ctx)}${renderedArrayItems}`;

    ctx.indentation--;
    const renderedEndTag = `${renderIndentation(ctx)}</li>`;

    const renderedListItem = [
      renderedStartTag,
      renderedItem,
      renderedEndTag
    ];

    return renderedListItem
      .join(renderNewLine(ctx));

  }

  // Render directly nested lists on a new line
  if(isListNode(item)){

    const renderedStartTag = `${renderIndentation(ctx)}<li>`;
    ctx.indentation++;
    const renderedItem = renderListNode(ctx, item);
    ctx.indentation--;
    const renderedEndTag = `${renderIndentation(ctx)}</li>`;

    if(renderedItem === ""){
      return "";
    }

    const renderedListItem = [
      renderedStartTag,
      renderedItem,
      renderedEndTag
    ];

    return renderedListItem
      .join(renderNewLine(ctx));

  }

  const renderedItem = renderNode(ctx, item);

  return renderedItem === ""
    ? renderedItem
    : `${renderIndentation(ctx)}<li>${renderedItem}</li>`;

}

function renderListEnd(ctx: HTMLRenderContext): string {
  ctx.indentation--;
  return `${renderIndentation(ctx)}</ul>`;
}

function flattenNestedArrayItems(items: ASTNodes[]): ASTNodes[] {

  // Flatten deeply nested arrays
  if(items.some(Array.isArray) && !items.some(isListNode)){
    return flattenNestedArrayItems(items.flat());
  }

  return items;

}

function renderArrayItems(ctx: HTMLRenderContext, items: ASTNodes[]): string {

  // Render normal array without a list
  if(!items.some(isListNode)){
    return renderNode(ctx, items);
  }

  const renderedArrayItems: string[] = [];

  // render lists in an array on a new line
  for(let index = 0; index < items.length; index++){

    const currentItem = items[index];
    const nextItem: ASTNodes | undefined = items[index + 1];

    const renderedCurrentItem = renderNode(ctx, currentItem);

    if(!isListNode(nextItem)){
      renderedArrayItems.push(renderedCurrentItem);
      continue;
    }

    const renderedNewLine = renderNewLine(ctx);

    const renderedNextItem = renderNode(ctx, nextItem);

    if(renderedNextItem === ""){
      renderedArrayItems.push(
        renderedCurrentItem
      );
    } else {
      renderedArrayItems.push(
        renderedCurrentItem,
        renderedNewLine,
        renderedNextItem
      );
    }

    // Skip next item as it has already been rendered
    index++;

  }

  return renderedArrayItems
    .flat()
    .join("");

}
