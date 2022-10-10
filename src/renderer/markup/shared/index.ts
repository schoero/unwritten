import {
  isClassType,
  isFunctionType,
  isInterfaceType,
  isTypeAliasType,
  isVariableType
} from "../../../typeguards/types.js";
import { RenderContext } from "../../../types/context.js";
import { ExportableTypes } from "../../../types/types.js";
import {
  RenderedCategoryForDocumentation,
  RenderedCategoryForTableOfContents,
  RenderedEntitiesForDocumentation,
  RenderedEntitiesForTableOfContents,
  RenderObject
} from "../types/renderer.js";
import { getCategoryName } from "../utils/renderer.js";
import { sortExportableTypes } from "../utils/sort.js";


export function render(ctx: RenderContext, types: ExportableTypes[]): string {

  const sortedEntities = sortExportableTypes(ctx, types);

  const tableOfContents = renderEntitiesForTableOfContents(sortedEntities);
  const documentation = renderEntitiesForDocumentation(sortedEntities);

  const renderObject: RenderObject = {
    ["API Documentation"]: [
      tableOfContents,
      documentation
    ]
  };

  return renderRenderObject(renderObject);

}


export function renderEntitiesForTableOfContents(entities: ExportableTypes[]): [RenderedCategoryForTableOfContents[]] {

  const tableOfContents: RenderedCategoryForTableOfContents[][] = [];


  //-- Render entities

  for(const entity of entities){

    const categoryName = getCategoryName(entity.kind, true);

    const existingCategory = tableOfContents.find(category => category[0]?.[0] === categoryName);

    if(existingCategory === undefined){
      tableOfContents.push([[categoryName, [<RenderedEntitiesForTableOfContents[]>[]]]]);
    }

    const category = tableOfContents.find(category => category[0]?.[0] === categoryName)!;
    const renderedType = renderTypeForTableOfContents(entity);

    category[0]![1][0].push(renderedType);

  }

  return <[RenderedCategoryForTableOfContents[]]>tableOfContents;

}


export function renderEntitiesForDocumentation(entities: ExportableTypes[]): RenderedCategoryForDocumentation {

  const documentation: RenderedCategoryForDocumentation = {};


  //-- Render entities

  for(const entity of entities){

    const title = getCategoryName(entity.kind, true);

    if(documentation[title] === undefined){
      documentation[title] = [];
    }

    documentation[title]!.push(renderTypeForDocumentation(entity));

  }

  return documentation;

}


export function renderTypeForTableOfContents(entity: ExportableTypes): RenderedEntitiesForTableOfContents {

  if(isFunctionType(entity)){
    return renderFunctionTypeForTableOfContents(entity);
  } else if(isClassType(entity)){
    return renderClassTypeForTableOfContents(entity);
  } else if(isTypeAliasType(entity)){
    return renderTypeAliasTypeForTableOfContents(entity);
  } else if(isInterfaceType(entity)){
    return renderInterfaceTypeForTableOfContents(entity);
  } else if(isVariableType(entity)){
    return renderVariableTypeForTableOfContents(entity);
  } else if(isEnumType(entity)){
    return renderEnumTypeForTableOfContents(entity);
  } else if(isNamespaceType(entity)){
    return renderNamespaceTypeForTableOfContents(entity);
  }

  throw new Error(`Unexpected entity kind: ${entity.kind}`);

}


export function renderTypeForDocumentation(entity: ExportableTypes): RenderedEntitiesForDocumentation {

  if(isFunctionType(entity)){
    return renderFunctionTypeForDocumentation(entity);
  } else if(isClassType(entity)){
    return renderClassTypeForDocumentation(entity);
  } else if(isTypeAliasType(entity)){
    return renderTypeAliasTypeForDocumentation(entity);
  } else if(isInterfaceType(entity)){
    return renderInterfaceTypeForDocumentation(entity);
  } else if(isVariableType(entity)){
    return renderVariableTypeForDocumentation(entity);
  } else if(isEnumType(entity)){
    return renderEnumTypeForDocumentation(entity);
  } else if(isNamespaceType(entity)){
    return renderNamespaceTypeForDocumentation(entity);
  }

  throw new Error(`Unexpected entity kind: ${entity.kind}`);

}


export function renderRenderObject(renderObject: RenderObject): string {

  const renderExtension = getRenderExtension();


  //-- State

  let size = 1;

  const renderNestedElement = (element: RenderObject): string => {

    const currentOutput: string[] = [];

    if(typeof element === "string"){
      return element;
    }


    //-- List

    if(isRenderedList(element)){

      const listStart = renderExtension.renderListStart();
      if(listStart !== undefined){
        currentOutput.push(listStart);
      }

      for(let i = 0; i < element[0].length; i++){

        // For semantically valid html we need to render nested lists inside the current list item
        if(element[0][i + 1] !== undefined && isRenderedList(element[0][i + 1]!)){
          const renderedNestedElement = element[0][i + 1] !== undefined ? renderExtension.renderNewLine() + renderNestedElement(element[0][i + 1]!) : "";

          currentOutput.push(renderExtension.renderListItem(renderNestedElement(element[0][i]!) + renderedNestedElement));
          i++; // Skip next element
          continue;
        }

        currentOutput.push(renderExtension.renderListItem(renderNestedElement(element[0][i]!)));

      }

      const listEnd = renderExtension.renderListEnd();
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

        const title = renderExtension.renderTitle(key, size);

        currentOutput.push(title);
        size++;

        const content = renderNestedElement(element[key]!);

        currentOutput.push(content);
        size--;

      }

    }

    return currentOutput.join(renderExtension.renderNewLine());

  };

  return renderNestedElement(renderObject);

}
