import { isRenderedList, isRenderedMultilineContent, isRenderedTitle } from "./typeguards/renderer.js";
import {
  isClassType,
  isEnumType,
  isFunctionType,
  isInterfaceType,
  isNamespaceType,
  isTypeAliasType,
  isVariableType
} from "../../typeguards/types.js";
import { RenderContext } from "../../types/context.js";
import { ExportableTypes } from "../../types/types.js";
import { renderClassForDocumentation, renderClassForTableOfContents } from "./entities/class.js";
import { renderEnumForDocumentation, renderEnumForTableOfContents } from "./entities/enum.js";
import { renderFunctionForDocumentation, renderFunctionForTableOfContents } from "./entities/function.js";
import { renderInterfaceForDocumentation, renderInterfaceForTableOfContents } from "./entities/interface.js";
import { renderNamespaceForDocumentation, renderNamespaceForTableOfContents } from "./entities/namespace.js";
import { renderTypeAliasForDocumentation, renderTypeAliasForTableOfContents } from "./entities/type-alias.js";
import { renderVariableForDocumentation, renderVariableForTableOfContents } from "./entities/variable.js";
import {
  MarkupRenderer,
  RenderedCategoryForDocumentation,
  RenderedCategoryForTableOfContents,
  RenderedEntitiesForDocumentation,
  RenderedEntitiesForTableOfContents,
  RenderObject
} from "./types/renderer.js";
import { getCategoryName } from "./utils/renderer.js";
import { sortExportableTypes } from "./utils/sort.js";


export function render(ctx: RenderContext<MarkupRenderer>, types: ExportableTypes[]): string {

  const sortedEntities = sortExportableTypes(ctx, types);

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


export function renderForTableOfContents(ctx: RenderContext<MarkupRenderer>, types: ExportableTypes[]): [RenderedCategoryForTableOfContents[]] {

  const tableOfContents: RenderedCategoryForTableOfContents[][] = [];


  //-- Render entities

  for(const type of types){

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


export function renderForDocumentation(ctx: RenderContext<MarkupRenderer>, types: ExportableTypes[]): RenderedCategoryForDocumentation {

  const documentation: RenderedCategoryForDocumentation = {};


  //-- Render entities

  for(const type of types){

    const title = getCategoryName(ctx, type.kind, true);

    if(documentation[title] === undefined){
      documentation[title] = [];
    }

    documentation[title]!.push(renderTypeForDocumentation(ctx, type));

  }

  return documentation;

}


export function renderTypeForTableOfContents(ctx: RenderContext<MarkupRenderer>, type: ExportableTypes): RenderedEntitiesForTableOfContents {

  if(isFunctionType(type)){
    return renderFunctionForTableOfContents(ctx, type);
  } else if(isClassType(type)){
    return renderClassForTableOfContents(ctx, type);
  } else if(isTypeAliasType(type)){
    return renderTypeAliasForTableOfContents(ctx, type);
  } else if(isInterfaceType(type)){
    return renderInterfaceForTableOfContents(ctx, type);
  } else if(isVariableType(type)){
    return renderVariableForTableOfContents(ctx, type);
  } else if(isEnumType(type)){
    return renderEnumForTableOfContents(ctx, type);
  } else if(isNamespaceType(type)){
    return renderNamespaceForTableOfContents(ctx, type);
  }

  throw new Error(`Unexpected entity kind: ${type.kind}`);

}


export function renderTypeForDocumentation(ctx: RenderContext<MarkupRenderer>, type: ExportableTypes): RenderedEntitiesForDocumentation {

  if(isFunctionType(type)){
    return renderFunctionForDocumentation(ctx, type);
  } else if(isClassType(type)){
    return renderClassForDocumentation(ctx, type);
  } else if(isTypeAliasType(type)){
    return renderTypeAliasForDocumentation(ctx, type);
  } else if(isInterfaceType(type)){
    return renderInterfaceForDocumentation(ctx, type);
  } else if(isVariableType(type)){
    return renderVariableForDocumentation(ctx, type);
  } else if(isEnumType(type)){
    return renderEnumForDocumentation(ctx, type);
  } else if(isNamespaceType(type)){
    return renderNamespaceForDocumentation(ctx, type);
  }

  throw new Error(`Unexpected entity kind: ${type.kind}`);

}


export function renderRenderObject(ctx: RenderContext<MarkupRenderer>, renderObject: RenderObject): string {


  //-- State

  let size = 1;

  const renderNestedElement = (element: RenderObject): string => {

    const currentOutput: string[] = [];

    if(typeof element === "string"){
      return element;
    }


    //-- List

    if(isRenderedList(element)){

      const listStart = ctx.renderer.renderListStart();
      if(listStart !== undefined){
        currentOutput.push(listStart);
      }

      for(let i = 0; i < element[0].length; i++){

        // For semantically valid html we need to render nested lists inside the current list item
        if(element[0][i + 1] !== undefined && isRenderedList(element[0][i + 1]!)){
          const renderedNestedElement = element[0][i + 1] !== undefined ? ctx.renderer.renderNewLine() + renderNestedElement(element[0][i + 1]!) : "";

          currentOutput.push(ctx.renderer.renderListItem(renderNestedElement(element[0][i]!) + renderedNestedElement));
          i++; // Skip next element
          continue;
        }

        currentOutput.push(ctx.renderer.renderListItem(renderNestedElement(element[0][i]!)));

      }

      const listEnd = ctx.renderer.renderListEnd();
      if(listEnd !== undefined){
        currentOutput.push(listEnd);
      }

    }


    //-- Multiline output

    if(isRenderedMultilineContent(element)){
      const renderedElements = element.filter(el => el !== undefined).map(el => renderNestedElement(el!));

      currentOutput.push(...renderedElements);
    }


    //-- Title

    if(isRenderedTitle(element)){

      for(const key in element){

        const title = ctx.renderer.renderTitle(key, size);

        currentOutput.push(title);
        size++;

        const content = renderNestedElement(element[key]!);

        currentOutput.push(content);
        size--;

      }

    }

    return currentOutput.join(ctx.renderer.renderNewLine());

  };

  return renderNestedElement(renderObject);

}
