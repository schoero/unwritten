import { renderEntityForDocumentation, renderEntityForTableOfContents } from "./ast/index.js";
import {
  isRenderedList,
  isRenderedMultilineContent,
  isRenderedParagraph,
  isRenderedTitle
} from "./typeguards/renderer.js";
import { getRenderConfig } from "./utils/config.js";
import { getAnchorLink, getAnchorText } from "./utils/linker.js";
import { getCategoryName } from "./utils/renderer.js";
import { sortExportableTypes } from "./utils/sort.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.js";

import type {
  MarkupRenderContext,
  RenderedCategoryForDocumentation,
  RenderedCategoryForTableOfContents,
  RenderedEntitiesForTableOfContents,
  RenderObject
} from "./types/renderer.js";
import type { AnchorIdentifier } from "./utils/linker.js";


export function render(ctx: MarkupRenderContext, entities: ExportableEntities[]): string {

  const sortedEntities = sortExportableTypes(ctx, entities);

  const tableOfContents = renderForTableOfContents(ctx, sortedEntities);
  const documentation = renderForDocumentation(ctx, sortedEntities);

  const renderObject: RenderObject = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "API Documentation": [
      tableOfContents,
      documentation
    ]
  };

  return renderRenderObject(ctx, renderObject);

}


export function renderForTableOfContents(ctx: MarkupRenderContext, entities: ExportableEntities[]): [RenderedCategoryForTableOfContents[]] {

  const tableOfContents: RenderedCategoryForTableOfContents[][] = [];


  //-- Render entities

  for(const type of entities){

    const categoryName = getCategoryName(ctx, type.kind, true);

    const existingCategory = tableOfContents.find(category => category[0]?.[0] === categoryName);

    if(existingCategory === undefined){
      tableOfContents.push([[categoryName, [<RenderedEntitiesForTableOfContents[]>[]]]]);
    }

    const category = tableOfContents.find(category => category[0]?.[0] === categoryName)!;
    const renderedType = renderEntityForTableOfContents(ctx, type);

    category[0]![1][0].push(renderedType);

  }

  return <[RenderedCategoryForTableOfContents[]]>tableOfContents;

}


export function renderForDocumentation(ctx: MarkupRenderContext, entities: ExportableEntities[]): RenderedCategoryForDocumentation {

  const documentation: RenderedCategoryForDocumentation = {};


  //-- Render entities

  for(const type of entities){

    const title = getCategoryName(ctx, type.kind, true);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if(documentation[title] === undefined){
      documentation[title] = [];
    }

    documentation[title]!.push(renderEntityForDocumentation(ctx, type));

  }

  return documentation;

}


export function renderRenderObject(ctx: MarkupRenderContext, renderObject: RenderObject): string {

  const renderConfig = getRenderConfig(ctx);


  //-- State

  let size = 1;
  let indentation = 0;

  const indentElement = (element: string): string => {
    const indentedElement = `${renderConfig.indentation.repeat(indentation)}${element}`;
    return indentedElement;
  };


  const renderNestedElement = (element: RenderObject): string => {

    const renderElement = (element: string[] | string): void => {
      const indentedElements = (
        Array.isArray(element)
          ? element
          : [element]
      ).map(indentElement);
      currentOutput.push(...indentedElements);
    };


    //-- Inline element

    if(typeof element === "string"){
      return element;
    }

    const currentOutput: string[] = [];


    //-- List

    if(isRenderedList(element)){

      if(element[0].length === 0){
        return "";
      }

      const listStart = ctx.renderer.renderListStart();
      if(listStart !== undefined){
        renderElement(listStart);
        indentation++;
      }

      for(let i = 0; i < element[0].length; i++){

        // For semantically valid html we need to render nested lists inside the current list item
        if(element[0][i + 1] !== undefined && isRenderedList(element[0][i + 1]!)){
          const renderedNestedElement = element[0][i + 1] !== undefined ? ctx.renderer.renderNewLine() + renderNestedElement(element[0][i + 1]!) : "";

          renderElement(ctx.renderer.renderListItem(renderNestedElement(element[0][i]!) + renderedNestedElement));
          i++; // Skip next element
          continue;
        }

        renderElement(ctx.renderer.renderListItem(renderNestedElement(element[0][i]!)));

      }

      const listEnd = ctx.renderer.renderListEnd();
      if(listEnd !== undefined){
        indentation--;
        renderElement(listEnd);
      }

    }


    //-- Paragraph

    if(isRenderedParagraph(element)){
      renderElement(ctx.renderer.renderParagraph(renderNestedElement(element[0])));
    }


    //-- Multiline output

    if(isRenderedMultilineContent(element)){
      const renderedElements = element
        .filter(el => el !== undefined)
        .map(el => renderNestedElement(el!));
      renderElement(renderedElements);
    }


    //-- Title

    if(isRenderedTitle(element)){

      for(const key in element){

        const name = getAnchorText(ctx, key as AnchorIdentifier);
        const anchor = getAnchorLink(ctx, key as AnchorIdentifier);

        const title = ctx.renderer.renderTitle(name ?? key, size, anchor);

        renderElement(title);
        size++;

        const content = renderNestedElement(name ?? key);

        renderElement(content);
        size--;

      }

    }

    return currentOutput.join(ctx.renderer.renderNewLine());

  };

  return renderNestedElement(renderObject);

}
