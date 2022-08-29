import { renderClassEntityForDocumentation, renderClassEntityForTableOfContents } from "renderer/entities/class.js";
import { renderEnumEntityForDocumentation, renderEnumEntityForTableOfContents } from "renderer/entities/enum.js";
import {
  renderFunctionEntityForDocumentation,
  renderFunctionEntityForTableOfContents
} from "renderer/entities/function.js";
import {
  renderInterfaceEntityForDocumentation,
  renderInterfaceEntityForTableOfContents
} from "renderer/entities/interface.js";
import {
  renderTypeAliasEntityForDocumentation,
  renderTypeAliasEntityForTableOfContents
} from "renderer/entities/type-alias.js";
import {
  renderVariableEntityForDocumentation,
  renderVariableEntityForTableOfContents
} from "renderer/entities/variable.js";
import {
  isClassEntity,
  isEnumEntity,
  isFunctionEntity,
  isInterfaceEntity,
  isNamespaceEntity,
  isTypeAliasEntity,
  isVariableEntity
} from "src/typeguards/entities.js";
import { isRenderedList, isRenderedMultilineContent, isRenderedTitle } from "src/typeguards/renderer.js";
import { getCategoryName } from "src/utils/renderer.js";
import { sortEntities } from "src/utils/sort.js";
import { ExportableEntities } from "types/entities.js";
import {
  RenderedEntitiesForDocumentation,
  RenderedEntitiesForTableOfContents,
  RenderedEntityCategoryForDocumentation,
  RenderedEntityCategoryForTableOfContents,
  RenderObject
} from "types/renderer.js";
import {
  renderNamespaceEntityForDocumentation,
  renderNamespaceEntityForTableOfContents
} from "./entities/namespace.js";
import { getRenderExtension } from "./extensions/index.js";


export function render(entities: ExportableEntities[]) {

  const sortedEntities = sortEntities(entities);

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


export function renderEntitiesForTableOfContents(entities: ExportableEntities[]): [RenderedEntityCategoryForTableOfContents[]] {

  const tableOfContents: RenderedEntityCategoryForTableOfContents[][] = [];


  //-- Render entities

  for(const entity of entities){

    const categoryName = getCategoryName(entity.kind, true);

    const existingCategory = tableOfContents.find(category => category[0]?.[0] === categoryName);

    if(existingCategory === undefined){
      tableOfContents.push([[categoryName, [(<RenderedEntitiesForTableOfContents[]>[])]]]);
    }

    const category = tableOfContents.find(category => category[0]?.[0] === categoryName)!;
    const renderedEntity = renderEntityForTableOfContents(entity);

    category[0]![1][0].push(renderedEntity);

  }

  return <[RenderedEntityCategoryForTableOfContents[]]>tableOfContents;

}


export function renderEntitiesForDocumentation(entities: ExportableEntities[]): RenderedEntityCategoryForDocumentation {

  const documentation: RenderedEntityCategoryForDocumentation = {};


  //-- Render entities

  for(const entity of entities){

    const title = getCategoryName(entity.kind, true);

    if(documentation[title] === undefined){
      documentation[title] = [];
    }

    documentation[title]!.push(renderEntityForDocumentation(entity));

  }

  return documentation;

}


export function renderEntityForTableOfContents(entity: ExportableEntities): RenderedEntitiesForTableOfContents {

  if(isFunctionEntity(entity)){
    return renderFunctionEntityForTableOfContents(entity);
  } else if(isClassEntity(entity)){
    return renderClassEntityForTableOfContents(entity);
  } else if(isTypeAliasEntity(entity)){
    return renderTypeAliasEntityForTableOfContents(entity);
  } else if(isInterfaceEntity(entity)){
    return renderInterfaceEntityForTableOfContents(entity);
  } else if(isVariableEntity(entity)){
    return renderVariableEntityForTableOfContents(entity);
  } else if(isEnumEntity(entity)){
    return renderEnumEntityForTableOfContents(entity);
  } else if(isNamespaceEntity(entity)){
    return renderNamespaceEntityForTableOfContents(entity);
  }

  throw new Error(`Unexpected entity kind: ${entity.kind}`);

}


export function renderEntityForDocumentation(entity: ExportableEntities): RenderedEntitiesForDocumentation {

  if(isFunctionEntity(entity)){
    return renderFunctionEntityForDocumentation(entity);
  } else if(isClassEntity(entity)){
    return renderClassEntityForDocumentation(entity);
  } else if(isTypeAliasEntity(entity)){
    return renderTypeAliasEntityForDocumentation(entity);
  } else if(isInterfaceEntity(entity)){
    return renderInterfaceEntityForDocumentation(entity);
  } else if(isVariableEntity(entity)){
    return renderVariableEntityForDocumentation(entity);
  } else if(isEnumEntity(entity)){
    return renderEnumEntityForDocumentation(entity);
  } else if(isNamespaceEntity(entity)){
    return renderNamespaceEntityForDocumentation(entity);
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
