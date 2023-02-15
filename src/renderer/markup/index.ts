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
import type {
  MarkupRenderContext,
  MarkupRenderContexts
} from "unwritten:renderer:markup/types-definitions/markup.d.js";
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
    createTitleNode("API Documentation"),
    ...tableOfContents,
    ...documentation
  );

  return renderNode({ indentation: 0, renderContext: ctx, size: 1 }, ast);

}


export function renderForTableOfContents(ctx: MarkupRenderContext, entities: ExportableEntities[]): RenderedCategoryForTableOfContents[] {

  const tableOfContents: RenderedCategoryForTableOfContents[] = [];


  //-- Render entities

  for(const type of entities){

    const categoryName = getCategoryName(ctx, type.kind, true);
    const existingCategory = tableOfContents.find(category => category.content[0].content === categoryName);

    if(existingCategory === undefined){
      tableOfContents.push(
        createContainerNode(
          createTitleNode(categoryName),
          createListNode([])
        )
      );
    }

    const category = tableOfContents.find(category => category.content[0].content === categoryName)!;
    const renderedEntity = renderEntityForTableOfContents(ctx, type);

    category.content[1].content.push(renderedEntity);


  }

  return tableOfContents;

}


export function renderForDocumentation(ctx: MarkupRenderContext, entities: ExportableEntities[]): RenderedCategoryForDocumentation[] {

  const documentation: RenderedCategoryForDocumentation[] = [];


  //-- Render entities

  for(const type of entities){

    const categoryName = getCategoryName(ctx, type.kind, true);
    const existingCategory = documentation.find(category => category.content[0].content === categoryName);

    if(existingCategory === undefined){
      documentation.push(
        createContainerNode(
          createTitleNode(categoryName),
          createContainerNode()
        )
      );
    }

    const category = documentation.find(category => category.content[0].content === categoryName)!;
    const renderedEntity = renderEntityForTableOfContents(ctx, type);

    (category.content[1].content as ASTNodes[]).push(renderedEntity);

  }

  return documentation;

}

interface RenderNodeContext {
  renderContext: MarkupRenderContexts;
  size: number;
}

export function renderNode(ctx: RenderNodeContext, node: ASTNodes): string {

  if(isContainerNode(node)){
    return renderContainerNode(ctx, node);
  } else if(isTitleNode(node)){
    return renderTitleNode(ctx, node);
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

export function renderContainerNode(ctx: RenderNodeContext, node: ContainerNode): string {
  if(typeof node.content === "string"){
    return node.content;
  } else if(Array.isArray(node.content)){
    return node.content.map(child =>
      renderNode(ctx, child)).join(ctx.renderContext.renderer.renderNewLine());
  } else {
    return renderNode(ctx, node.content);
  }
}

export function renderTitleNode(ctx: RenderNodeContext, node: TitleNode): string {
  const title = ctx.renderContext.renderer.renderTitle(node.content, ctx.size, node.id);
  ctx.size++;
  return title;
}

export function renderParagraphNode(ctx: RenderNodeContext, node: ParagraphNode): string {
  return ctx.renderContext.renderer.renderParagraph(node.content);
}

export function renderListNode(ctx: RenderNodeContext, node: ListNode): string {

  if(node.content.length === 0){
    return "";
  }

  const listStart = ctx.renderContext.renderer.renderListStart();

  const listItems = node.content.map(item =>
    ctx.renderContext.renderer.renderListItem(renderNode(ctx, item)));

  const listEnd = ctx.renderContext.renderer.renderListEnd();

  return listStart + listItems.join(ctx.renderContext.renderer.renderNewLine()) + listEnd;
}

export function renderLinkNode(ctx: RenderNodeContext, node: LinkNode): string {
  // TODO: Add support for external/source code links
  return ctx.renderContext.renderer.renderAnchorLink(node.content, node.link);
}

export function renderAnchorNode(ctx: RenderNodeContext, node: AnchorNode): string {
  return ctx.renderContext.renderer.renderAnchorTag(node.id);
}

export function renderSmallNode(ctx: RenderNodeContext, node: SmallNode): string {
  return ctx.renderContext.renderer.renderSmallText(node.content);
}
