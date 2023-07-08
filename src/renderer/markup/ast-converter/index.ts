import {
  convertClassEntityForDocumentation,
  convertClassEntityForTableOfContents,
  convertEnumEntityForDocumentation,
  convertEnumEntityForTableOfContents,
  convertExportAssignmentEntityForDocumentation,
  convertExportAssignmentEntityForTableOfContents,
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
import { createListNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getCategoryName } from "unwritten:renderer:markup/utils/renderer.js";
import { sortExportableEntities } from "unwritten:renderer:markup/utils/sort.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import {
  isClassEntity,
  isEnumEntity,
  isExportAssignmentEntity,
  isFunctionEntity,
  isInterfaceEntity,
  isModuleEntity,
  isNamespaceEntity,
  isTypeAliasEntity,
  isVariableEntity
} from "unwritten:typeguards/entities.js";

import type { Entity, ExportableEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ListNode, TitleNode } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type {
  ConvertedCategoryForDocumentation,
  ConvertedCategoryForTableOfContents,
  ConvertedEntitiesForDocumentation,
  ConvertedEntitiesForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertEntityForTableOfContents(ctx: MarkupRenderContexts, entity: ExportableEntity): ConvertedEntitiesForTableOfContents {

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
  } else if(isExportAssignmentEntity(entity)){
    return convertExportAssignmentEntityForTableOfContents(ctx, entity);
  } else if(isModuleEntity(entity)){
    return convertModuleEntityForTableOfContents(ctx, entity);
  }

  throw new RangeError(`Unknown entity kind: ${(<Entity>entity).kind}`);

}


export function convertEntityForDocumentation(ctx: MarkupRenderContexts, entity: ExportableEntity): ConvertedEntitiesForDocumentation {

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
  } else if(isExportAssignmentEntity(entity)){
    return convertExportAssignmentEntityForDocumentation(ctx, entity);
  } else if(isModuleEntity(entity)){
    return convertModuleEntityForDocumentation(ctx, entity);
  }

  throw new RangeError(`Unknown entity kind: ${(<Entity>entity).kind}`);

}


export function convertToMarkupAST(ctx: MarkupRenderContexts, entities: ExportableEntity[]): TitleNode {

  const sortedEntities = sortExportableEntities(ctx, entities);

  const tableOfContents = createTableOfContents(ctx, sortedEntities);
  const documentation = createDocumentation(ctx, sortedEntities);

  const ast = createTitleNode(
    "API Documentation",
    createSectionNode("table-of-contents", tableOfContents),
    createSectionNode("documentation", ...documentation)
  );

  return ast;

}


export function createTableOfContents(ctx: MarkupRenderContexts, entities: ExportableEntity[]): ListNode<ConvertedCategoryForTableOfContents[]> {

  const translate = getTranslator(ctx);

  const tableOfContents: ConvertedCategoryForTableOfContents[] = [];

  for(const entity of entities){

    const categoryName = getCategoryName(entity.kind);
    const categoryTitle = translate(categoryName, { capitalize: true, count: entities.length });
    const existingCategory = tableOfContents.find(category => category[0] === categoryTitle);

    if(existingCategory === undefined){
      tableOfContents.push(
        [
          categoryTitle,
          createListNode()
        ]
      );
    }

    const category = tableOfContents.find(category => category[0] === categoryTitle)!;
    const convertedEntity = convertEntityForTableOfContents(ctx, entity);

    category[1].children.push(convertedEntity);

  }

  return createListNode(...tableOfContents);

}


export function createDocumentation(ctx: MarkupRenderContexts, entities: ExportableEntity[]): ConvertedCategoryForDocumentation[] {

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
