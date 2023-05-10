import { getCategoryName } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import {
  convertClassEntityForDocumentation,
  convertClassEntityForTableOfContents,
  convertEnumEntityForDocumentation,
  convertEnumEntityForTableOfContents,
  convertFunctionLikeEntityForDocumentation,
  convertFunctionLikeEntityForTableOfContents,
  convertInterfaceEntityForDocumentation,
  convertInterfaceEntityForTableOfContents,
  convertModuleEntityForDocumentation,
  convertModuleEntityForTableOfContents,
  convertNamespaceEntityForDocumentation,
  convertNamespaceEntityForTableOfContents,
  convertTypeAliasEntityForDocumentation,
  convertTypeAliasEntityForTableOfContents,
  convertVariableEntityForDocumentation,
  convertVariableEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { createListNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { sortExportableEntities } from "unwritten:renderer:markup/utils/sort.js";
import {
  isClassEntity,
  isEnumEntity,
  isFunctionEntity,
  isInterfaceEntity,
  isNamespaceEntity,
  isTypeAliasEntity,
  isVariableEntity
} from "unwritten:typeguards/entities.js";

import type { ExportableEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { TitleNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedCategoryForDocumentation,
  ConvertedCategoryForTableOfContents,
  ConvertedEntitiesForDocumentation,
  ConvertedEntitiesForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.d.js";


export function convertEntityForTableOfContents(ctx: MarkupRenderContexts, entity: ExportableEntities): ConvertedEntitiesForTableOfContents {

  if(isFunctionEntity(entity)){
    return convertFunctionLikeEntityForTableOfContents(ctx, entity);
  } else if(isInterfaceEntity(entity)){
    return convertInterfaceEntityForTableOfContents(ctx, entity);
  } else if(isVariableEntity(entity)){
    return convertVariableEntityForTableOfContents(ctx, entity);
  } else if(isNamespaceEntity(entity)){
    return convertNamespaceEntityForTableOfContents(ctx, entity);
  } else if(isTypeAliasEntity(entity)){
    return convertTypeAliasEntityForTableOfContents(ctx, entity);
  } else if(isEnumEntity(entity)){
    return convertEnumEntityForTableOfContents(ctx, entity);
  } else if(isClassEntity(entity)){
    return convertClassEntityForTableOfContents(ctx, entity);
  } else {
    return convertModuleEntityForTableOfContents(ctx, entity);
  }

}


export function convertEntityForDocumentation(ctx: MarkupRenderContexts, entity: ExportableEntities): ConvertedEntitiesForDocumentation {

  if(isFunctionEntity(entity)){
    return convertFunctionLikeEntityForDocumentation(ctx, entity);
  } else if(isInterfaceEntity(entity)){
    return convertInterfaceEntityForDocumentation(ctx, entity);
  } else if(isVariableEntity(entity)){
    return convertVariableEntityForDocumentation(ctx, entity);
  } else if(isNamespaceEntity(entity)){
    return convertNamespaceEntityForDocumentation(ctx, entity);
  } else if(isTypeAliasEntity(entity)){
    return convertTypeAliasEntityForDocumentation(ctx, entity);
  } else if(isEnumEntity(entity)){
    return convertEnumEntityForDocumentation(ctx, entity);
  } else if(isClassEntity(entity)){
    return convertClassEntityForDocumentation(ctx, entity);
  } else {
    return convertModuleEntityForDocumentation(ctx, entity);
  }

}


export function convertToMarkupAST(ctx: MarkupRenderContexts, entities: ExportableEntities[]): TitleNode {

  const sortedEntities = sortExportableEntities(ctx, entities);

  const tableOfContents = createTableOfContents(ctx, sortedEntities);
  const documentation = createDocumentation(ctx, sortedEntities);

  const ast = createTitleNode(
    "API Documentation",
    ...tableOfContents,
    ...documentation
  );

  return ast;

}


export function createTableOfContents(ctx: MarkupRenderContexts, entities: ExportableEntities[]): ConvertedCategoryForTableOfContents[] {

  const translate = getTranslator(ctx);

  const tableOfContents: ConvertedCategoryForTableOfContents[] = [];

  for(const entity of entities){

    const categoryName = getCategoryName(entity.kind);
    const categoryTitle = translate(categoryName, { capitalize: true, count: entities.length });
    const existingCategory = tableOfContents.find(category => category.title === categoryTitle);

    if(existingCategory === undefined){
      tableOfContents.push(
        createTitleNode(
          categoryTitle,
          createListNode([])
        )
      );
    }

    const category = tableOfContents.find(category => category.title === categoryTitle)!;
    const convertedEntity = convertEntityForTableOfContents(ctx, entity);

    category.children[0].children.push(convertedEntity);

  }

  return tableOfContents;

}


export function createDocumentation(ctx: MarkupRenderContexts, entities: ExportableEntities[]): ConvertedCategoryForDocumentation[] {

  const translate = getTranslator(ctx);

  const documentation: ConvertedCategoryForDocumentation[] = [];

  for(const entity of entities){

    const categoryName = getCategoryName(entity.kind);
    const categoryTitle = translate(categoryName, { capitalize: true, count: entities.length });
    const existingCategory = documentation.find(category => category.title === categoryTitle);

    if(existingCategory === undefined){
      documentation.push(
        createTitleNode(categoryTitle)
      );
    }

    const category = documentation.find(category => category.title === categoryTitle)!;
    const convertedEntity = convertEntityForDocumentation(ctx, entity);

    category.children.push(convertedEntity);

  }

  return documentation;

}
