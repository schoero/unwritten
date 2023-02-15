import { renderEntityForTableOfContents } from "./ast/index.js";
import {
  isAnchorNode,
  isContainerNode,
  isLinkNode,
  isListNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "./typeguards/renderer.js";
import { createContainerNode, createListNode, createTitleNode } from "./utils/nodes.js";
import { getCategoryName } from "./utils/renderer.js";
import { sortExportableEntities } from "./utils/sort.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.d.js";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  AnchorNode,
  ASTNodes,
  ContainerNode,
  LinkNode,
  ListNode,
  ParagraphNode,
  SmallNode,
  TitleNode
} from "unwritten:renderer:markup/types-definitions/nodes.d.js";
import type {
  RenderedCategoryForDocumentation,
  RenderedCategoryForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.d.js";


export function render(ctx: MarkupRenderContext, entities: ExportableEntities[]): string {

  const sortedEntities = sortExportableEntities(ctx, entities);

  const tableOfContents = renderForTableOfContents(ctx, sortedEntities);
  const documentation = renderForDocumentation(ctx, sortedEntities);

  const ast = createContainerNode(
    createTitleNode(
      "API Documentation",
      undefined,
      ...tableOfContents,
      ...documentation
    )
  );

  return renderNode(ctx, ast);

}


export function renderForTableOfContents(ctx: MarkupRenderContext, entities: ExportableEntities[]): RenderedCategoryForTableOfContents[] {

  const tableOfContents: RenderedCategoryForTableOfContents[] = [];


  //-- Render entities

  for(const type of entities){

    const categoryName = getCategoryName(ctx, type.kind, true);
    const existingCategory = tableOfContents.find(category => category.children[0].title === categoryName);

    if(existingCategory === undefined){
      tableOfContents.push(
        createContainerNode(
          createTitleNode(categoryName),
          createListNode([])
        )
      );
    }

    const category = tableOfContents.find(category => category.children[0].title === categoryName)!;
    const renderedEntity = renderEntityForTableOfContents(ctx, type);

    category.children[1].children.push(renderedEntity);


  }

  return tableOfContents;

}


export function renderForDocumentation(ctx: MarkupRenderContext, entities: ExportableEntities[]): RenderedCategoryForDocumentation[] {

  const documentation: RenderedCategoryForDocumentation[] = [];


  //-- Render entities

  for(const type of entities){

    const categoryName = getCategoryName(ctx, type.kind, true);
    const existingCategory = documentation.find(category => category.children[0].title === categoryName);

    if(existingCategory === undefined){
      documentation.push(
        createContainerNode(
          createTitleNode(categoryName),
          createContainerNode()
        )
      );
    }

    const category = documentation.find(category => category.children[0].title === categoryName)!;
    const renderedEntity = renderEntityForTableOfContents(ctx, type);

    (category.children[1].children as ASTNodes[]).push(renderedEntity);

  }

  return documentation;

}

export function renderNode(ctx: MarkupRenderContext, node: ASTNodes): string {

  const size = 1;

  if(isContainerNode(node)){
    return renderContainerNode(ctx, node);
  } else if(isTitleNode(node)){
    return renderTitleNode(ctx, size, node);
  } else if(isParagraphNode(node)){
    return renderParagraphNode(ctx, node);
  } else if(isListNode(node)){
    return renderListNode(ctx, node);
  } else if(isLinkNode(node)){
    return renderLinkNode(ctx, node);
  } else if(isAnchorNode(node)){
    return renderAnchorNode(ctx, node);
  } else if(isSmallNode(node)){
    return renderSmallNode(ctx, node);
  } else {
    return node;
  }

}

export function renderContainerNode(ctx: MarkupRenderContext, node: ContainerNode): string {
  if(typeof node.children === "string"){
    return node.children;
  } else if(Array.isArray(node.children)){
    return node.children.map(child =>
      renderNode(ctx, child)).join(ctx.renderer.renderNewLine(ctx));
  } else {
    return renderNode(ctx, node.children);
  }
}

export function renderTitleNode(ctx: MarkupRenderContext, size: number, node: TitleNode): string {
  const title = ctx.renderer.renderTitle(ctx, node.title, size, node.id);
  return title;
}

export function renderParagraphNode(ctx: MarkupRenderContext, node: ParagraphNode): string {
  return ctx.renderer.renderParagraph(ctx, node.children);
}

export function renderListNode(ctx: MarkupRenderContext, node: ListNode): string {

  if(node.children.length === 0){
    return "";
  }

  const listStart = ctx.renderer.renderListStart(ctx);

  const listItems: string[] = [];

  for(let i = 0; i < node.children.length; i++){
    // For semantically valid html we need to render nested lists inside the current list item
    const item = node.children[i];
    const nextItem = node.children[i + 1];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if(nextItem !== undefined && isListNode(nextItem)){

      listItems.push(
        ctx.renderer.renderListItem(ctx, [
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
          ctx.renderer.renderIndentation(ctx)
        ].join(ctx.renderer.renderNewLine(ctx)))
      );

      i++; // Skip the next item
      continue;

    }

    listItems.push(ctx.renderer.renderListItem(ctx, renderNode(ctx, item)));

  }

  const listEnd = ctx.renderer.renderListEnd(ctx);

  return [listStart, ...listItems, listEnd].join(ctx.renderer.renderNewLine(ctx));

}

export function renderLinkNode(ctx: MarkupRenderContext, node: LinkNode): string {
  // TODO: Add support for external/source code links
  return ctx.renderer.renderAnchorLink(ctx, node.children, node.link);
}

export function renderAnchorNode(ctx: MarkupRenderContext, node: AnchorNode): string {
  return ctx.renderer.renderAnchorTag(ctx, node.id);
}

export function renderSmallNode(ctx: MarkupRenderContext, node: SmallNode): string {
  return ctx.renderer.renderSmallText(ctx, node.children);
}

function isRenderedList(arg0: any) {
  throw new Error("Function not implemented.");
}
