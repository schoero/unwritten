import {
  isClassEntity,
  isEnumEntity,
  isFunctionEntity,
  isInterfaceEntity,
  isNamespaceEntity,
  isTypeAliasEntity,
  isVariableEntity
} from "quickdoks:typeguards/entities.js";

import { renderClassForDocumentation, renderClassForTableOfContents } from "../ast/entities/class.js";
import { renderEnumForDocumentation, renderEnumForTableOfContents } from "../ast/entities/enum.js";
import { renderFunctionForDocumentation, renderFunctionForTableOfContents } from "../ast/entities/function.js";
import { renderInterfaceForDocumentation, renderInterfaceForTableOfContents } from "../ast/entities/interface.js";
import { renderNamespaceForDocumentation, renderNamespaceForTableOfContents } from "../ast/entities/namespace.js";
import { renderTypeAliasForDocumentation, renderTypeAliasForTableOfContents } from "../ast/entities/type-alias.js";
import { renderVariableForDocumentation, renderVariableForTableOfContents } from "../ast/entities/variable.js";
import { isRenderedList, isRenderedMultilineContent, isRenderedTitle } from "../typeguards/renderer.js";
import { getRenderConfig } from "../utils/config.js";
import { getCategoryName } from "../utils/renderer.js";
import { sortExportableTypes } from "../utils/sort.js";

import type {
  MarkupRenderer,
  RenderedCategoryForDocumentation,
  RenderedCategoryForTableOfContents,
  RenderedEntitiesForDocumentation,
  RenderedEntitiesForTableOfContents,
  RenderObject
} from "../types/renderer.js";

import type { ExportableEntities } from "quickdoks:compiler:type-definitions/entities.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function render<CustomRenderer extends MarkupRenderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]): string {

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


export function renderForTableOfContents(ctx: RenderContext<MarkupRenderer>, entities: ExportableEntities[]): [RenderedCategoryForTableOfContents[]] {

  const tableOfContents: RenderedCategoryForTableOfContents[][] = [];


  //-- Render entities

  for(const type of entities){

    const categoryName = getCategoryName(ctx, type.kind, true);

    const existingCategory = tableOfContents.find(category => category[0]?.[0] === categoryName);

    if(existingCategory === undefined){
      tableOfContents.push([[categoryName, [<RenderedEntitiesForTableOfContents[]>[]]]]);
    }

    const category = tableOfContents.find(category => category[0]?.[0] === categoryName)!;
    const renderedType = renderTypeForTableOfContents(ctx, type);

    category[0]![1][0].push(renderedType);

  }

  return <[RenderedCategoryForTableOfContents[]]>tableOfContents;

}


export function renderForDocumentation(ctx: RenderContext<MarkupRenderer>, entities: ExportableEntities[]): RenderedCategoryForDocumentation {

  const documentation: RenderedCategoryForDocumentation = {};


  //-- Render entities

  for(const type of entities){

    const title = getCategoryName(ctx, type.kind, true);

    if(documentation[title] === undefined){
      documentation[title] = [];
    }

    documentation[title]!.push(renderTypeForDocumentation(ctx, type));

  }

  return documentation;

}


export function renderTypeForTableOfContents(ctx: RenderContext<MarkupRenderer>, entities: ExportableEntities): RenderedEntitiesForTableOfContents {

  if(isFunctionEntity(entities)){
    return renderFunctionForTableOfContents(ctx, entities);
  } else if(isClassEntity(entities)){
    return renderClassForTableOfContents(ctx, entities);
  } else if(isTypeAliasEntity(entities)){
    return renderTypeAliasForTableOfContents(ctx, entities);
  } else if(isInterfaceEntity(entities)){
    return renderInterfaceForTableOfContents(ctx, entities);
  } else if(isVariableEntity(entities)){
    return renderVariableForTableOfContents(ctx, entities);
  } else if(isEnumEntity(entities)){
    return renderEnumForTableOfContents(ctx, entities);
  } else if(isNamespaceEntity(entities)){
    return renderNamespaceForTableOfContents(ctx, entities);
  }

  throw new Error(`Unexpected entity kind: ${entities.kind}`);

}


export function renderTypeForDocumentation(ctx: RenderContext<MarkupRenderer>, entities: ExportableEntities): RenderedEntitiesForDocumentation {

  if(isFunctionEntity(entities)){
    return renderFunctionForDocumentation(ctx, entities);
  } else if(isClassEntity(entities)){
    return renderClassForDocumentation(ctx, entities);
  } else if(isTypeAliasEntity(entities)){
    return renderTypeAliasForDocumentation(ctx, entities);
  } else if(isInterfaceEntity(entities)){
    return renderInterfaceForDocumentation(ctx, entities);
  } else if(isVariableEntity(entities)){
    return renderVariableForDocumentation(ctx, entities);
  } else if(isEnumEntity(entities)){
    return renderEnumForDocumentation(ctx, entities);
  } else if(isNamespaceEntity(entities)){
    return renderNamespaceForDocumentation(ctx, entities);
  }

  throw new Error(`Unexpected entity kind: ${entities.kind}`);

}


export function renderRenderObject(ctx: RenderContext<MarkupRenderer>, renderObject: RenderObject): string {

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
      return indentElement(element);
    }

    const currentOutput: string[] = [];


    //-- List

    if(isRenderedList(element)){

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
        renderElement(listEnd);
        indentation--;
      }

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

        const title = ctx.renderer.renderTitle(key, size);

        renderElement(title);
        size++;

        const content = renderNestedElement(element[key]!);

        renderElement(content);
        size--;

      }

    }

    return currentOutput.join(ctx.renderer.renderNewLine());

  };

  return renderNestedElement(renderObject);

}
