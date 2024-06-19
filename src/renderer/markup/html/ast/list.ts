import { withIndentation } from "unwritten:renderer/markup/utils/context";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import {
  isInlineTitleNode,
  isListNode,
  isMultilineNode,
  isParagraphNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer";
import { renderWithIndentation } from "unwritten:renderer:utils/indentation";

import { renderNode } from "../index";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode, ListNode } from "unwritten:renderer:markup/types-definitions/nodes";


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
  const renderedListItems = withIndentation(ctx, ctx => renderListItems(ctx, listNode.children));
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

function renderListItems(ctx: HTMLRenderContext, items: ASTNode[]): string[] {
  return items.map(item => renderListItem(ctx, item));
}

function renderListStart(ctx: HTMLRenderContext): string {
  const renderedListStart = renderWithIndentation(ctx, "<ul>");
  return renderedListStart;
}

function renderListItemStart(ctx: HTMLRenderContext): string {
  const renderedListStart = renderWithIndentation(ctx, "<li>");
  return renderedListStart;
}

function renderListItem(ctx: HTMLRenderContext, item: ASTNode): string {

  // Flatten deeply nested arrays
  item = Array.isArray(item) ? flattenNestedArrayItems(item) : item;

  // Render lists in an array on a new line
  if(Array.isArray(item) && item.some(isListNode)){

    const renderedStartTag = renderListItemStart(ctx);

    const renderedItem = withIndentation(ctx, (ctx, item) => {
      const renderedArrayItems = renderArrayItems(ctx, item);

      if(renderedArrayItems === ""){
        return "";
      }

      return renderWithIndentation(ctx, renderedArrayItems);

    }, item);

    const renderedEndTag = renderListItemEnd(ctx);

    const renderedListItem = [
      renderedStartTag,
      renderedItem,
      renderedEndTag
    ];

    return renderedListItem
      .join(renderNewLine(ctx));

  }

  // Render nodes with indentation on a new line
  if(isListNode(item) ||
    isMultilineNode(item) ||
    isTitleNode(item) ||
    isInlineTitleNode(item) ||
    isParagraphNode(item)){

    const renderedStartTag = renderListItemStart(ctx);
    const renderedItem = withIndentation(ctx, ctx => renderNode(ctx, item));
    const renderedEndTag = renderListItemEnd(ctx);

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
    : renderWithIndentation(ctx, `<li>${renderedItem}</li>`);

}

function renderListEnd(ctx: HTMLRenderContext): string {
  return renderWithIndentation(ctx, "</ul>");
}

function renderListItemEnd(ctx: HTMLRenderContext): string {
  return renderWithIndentation(ctx, "</li>");
}

function flattenNestedArrayItems(items: ASTNode[]): ASTNode[] {

  // Flatten deeply nested arrays
  if(items.some(Array.isArray) && !items.some(isListNode)){
    return flattenNestedArrayItems(items.flat());
  }

  return items;

}

function renderArrayItems(ctx: HTMLRenderContext, items: ASTNode[]): string {

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
