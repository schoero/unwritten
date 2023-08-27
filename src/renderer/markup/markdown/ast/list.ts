import { renderEmptyLine } from "unwritten:renderer/markup/markdown/utils/empty-line.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { isListNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { renderIndentation as renderIndentationOriginal } from "unwritten:renderer:utils/indentation.js";

import { renderNode } from "../index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode, ListNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderListNode(ctx: MarkdownRenderContext, listNode: ListNode): string {

  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedNewLine = renderNewLine(ctx);

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

  if(renderedListItems.every(item => item === "")){
    return "";
  }

  const childrenEndsWithEmptyLine = renderedListItems.at(-1)?.endsWith(renderedNewLine + renderedEmptyLine);
  const trailingEmptyLine = childrenEndsWithEmptyLine ? "" : renderedEmptyLine;

  return [
    renderedEmptyLine,
    ...renderedListItems,
    trailingEmptyLine
  ]
    .filter(item => !!item)
    .join(renderNewLine(ctx));

}

function renderListItems(ctx: MarkdownRenderContext, items: ASTNode[]): string[] {
  return items.map(item => renderListItem(ctx, item));
}

function renderListItem(ctx: MarkdownRenderContext, item: ASTNode): string {

  const renderedNewLine = renderNewLine(ctx);

  // Flatten deeply nested arrays
  item = Array.isArray(item) ? flattenNestedArrayItems(item) : item;

  // Render lists in an array on a new line
  if(Array.isArray(item) && item.some(isListNode)){

    const renderedArrayItems = renderArrayItems(ctx, item);

    if(renderedArrayItems === ""){
      return "";
    }


    // Remove indentation from rendered item
    const renderedOriginalIndentation = renderIndentationOriginal(ctx);
    const renderedItemWithoutOriginalIndentation = renderedArrayItems.startsWith(renderedOriginalIndentation)
      ? renderedArrayItems.slice(renderedOriginalIndentation.length)
      : renderedArrayItems;

    // Collapse multiple new lines into one
    const collapsedRenderedItem = renderedItemWithoutOriginalIndentation.replace(
      new RegExp(`${renderedNewLine}+`, "g"),
      renderedNewLine
    );

    return `${renderIndentation(ctx)}- ${collapsedRenderedItem}`;

  }

  // Render lists without wrapping in a list element
  if(isListNode(item)){
    return renderListNode(ctx, item);
  }

  const renderedItem = renderNode(ctx, item);

  if(renderedItem === ""){
    return "";
  }

  // Remove indentation from rendered item
  const renderedOriginalIndentation = renderIndentationOriginal(ctx);
  const renderedItemWithoutOriginalIndentation = renderedItem.startsWith(renderedOriginalIndentation)
    ? renderedItem.slice(renderedOriginalIndentation.length)
    : renderedItem;

  // Collapse multiple new lines into one
  const collapsedRenderedItem = renderedItemWithoutOriginalIndentation.replace(
    new RegExp(`${renderedNewLine}+`, "g"),
    renderedNewLine
  );

  return `${renderIndentation(ctx)}- ${collapsedRenderedItem}`;

}

function flattenNestedArrayItems(items: ASTNode[]): ASTNode[] {

  // Flatten deeply nested arrays
  if(items.some(Array.isArray) && !items.some(isListNode)){
    return flattenNestedArrayItems(items.flat());
  }

  return items;

}

function renderArrayItems(ctx: MarkdownRenderContext, items: ASTNode[]): string {

  // Render normal array without a list
  if(!items.some(isListNode)){
    return renderNode(ctx, items);
  }

  const renderedArrayItems: string[] = [];

  // render lists in an array on a new line
  for(let index = 0; index < items.length; index++){

    const currentItem = items[index];
    const nextItem: ASTNode | undefined = items[index + 1];

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
        renderedNewLine
      );
    }

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
