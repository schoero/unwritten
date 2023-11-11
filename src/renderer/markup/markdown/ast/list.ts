import { renderEmptyLine } from "unwritten:renderer/markup/markdown/utils/empty-line";
import { withIndentation } from "unwritten:renderer/markup/utils/context";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { isListNode } from "unwritten:renderer:markup/typeguards/renderer";
import {
  renderIndentation,
  renderWithIndentation as renderWithIndentationOriginal
} from "unwritten:renderer:utils/indentation";

import { renderNode } from "../index";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode, ListNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderListNode(ctx: MarkdownRenderContext, listNode: ListNode): string {

  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const renderedListItems = renderNestedListNode(ctx, listNode);

  if(renderedListItems === ""){
    return "";
  }

  const childrenEndsWithEmptyLine = renderedListItems.endsWith(renderedNewLine + renderedEmptyLine);
  const trailingEmptyLine = childrenEndsWithEmptyLine ? "" : renderedEmptyLine;

  return [
    renderedEmptyLine,
    renderedListItems,
    trailingEmptyLine
  ]
    .filter(item => !!item)
    .join(renderNewLine(ctx));

}

function renderNestedListNode(ctx: MarkdownRenderContext, listNode: ListNode): string {

  // Do not render empty lists
  if(listNode.children.length === 0){
    return "";
  }

  // Collapse nested lists without siblings
  if(listNode.children.length === 1 && isListNode(listNode.children[0])){
    return renderNestedListNode(ctx, listNode.children[0]);
  }

  const renderedListItems = withIndentation(ctx, ctx => renderListItems(ctx, listNode.children));

  if(renderedListItems.every(item => item === "")){
    return "";
  }

  return renderedListItems
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
    const renderedIndentation = renderIndentation(ctx);
    const renderedItemWithoutOriginalIndentation = renderedArrayItems.startsWith(renderedIndentation)
      ? renderedArrayItems.slice(renderedIndentation.length)
      : renderedArrayItems;

    // Collapse multiple new lines into one
    const collapsedRenderedItem = renderedItemWithoutOriginalIndentation.replace(
      new RegExp(`${renderedNewLine}+`, "g"),
      renderedNewLine
    );

    return renderWithIndentation(ctx, `- ${collapsedRenderedItem}`);

  }

  // Render lists without wrapping in a list element
  if(isListNode(item)){
    return renderNestedListNode(ctx, item);
  }

  const renderedItem = renderNode(ctx, item);

  if(renderedItem === ""){
    return "";
  }

  // Remove indentation from rendered item
  const renderedIndentation = renderIndentation(ctx);
  const renderedItemWithoutOriginalIndentation = renderedItem.startsWith(renderedIndentation)
    ? renderedItem.slice(renderedIndentation.length)
    : renderedItem;

  // Collapse multiple new lines into one
  const collapsedRenderedItem = renderedItemWithoutOriginalIndentation.replace(
    new RegExp(`${renderedNewLine}+`, "g"),
    renderedNewLine
  );

  return renderWithIndentation(ctx, `- ${collapsedRenderedItem}`);

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

function renderWithIndentation(ctx: MarkdownRenderContext, renderedNode: string): string {
  ctx.indentation--;
  const indentation = renderWithIndentationOriginal(ctx, renderedNode);
  ctx.indentation++;
  return indentation;
}
