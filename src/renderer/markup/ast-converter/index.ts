import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { getSectionType, pluralizeEntityKind } from "unwritten:renderer/markup/types-definitions/sections.js";
import {
  convertCircularEntityToAnchor,
  convertClassEntityForDocumentation,
  convertClassEntityForTableOfContents,
  convertClassEntityToAnchor,
  convertEnumEntityForDocumentation,
  convertEnumEntityForTableOfContents,
  convertEnumEntityToAnchor,
  convertExportAssignmentEntityForDocumentation,
  convertExportAssignmentEntityForTableOfContents,
  convertExportAssignmentEntityToAnchor,
  convertFunctionLikeEntityForDocumentation,
  convertFunctionLikeEntityForTableOfContents,
  convertInterfaceEntityForDocumentation,
  convertInterfaceEntityForTableOfContents,
  convertInterfaceEntityToAnchor,
  convertModuleEntityForDocumentation,
  convertModuleEntityForTableOfContents,
  convertModuleEntityToAnchor,
  convertNamespaceEntityForDocumentation,
  convertNamespaceEntityForTableOfContents,
  convertNamespaceEntityToAnchor,
  convertParameterEntityToAnchor,
  convertPropertyEntityToAnchor,
  convertSignatureEntityToAnchor,
  convertTypeAliasEntityForDocumentation,
  convertTypeAliasEntityForTableOfContents,
  convertTypeAliasEntityToAnchor,
  convertTypeParameterEntityToAnchor,
  convertVariableEntityForDocumentation,
  convertVariableEntityForTableOfContents,
  convertVariableEntityToAnchor
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { createListNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";
import { renderCategoryName } from "unwritten:renderer:markup/utils/renderer";
import { sortExportableEntities } from "unwritten:renderer:markup/utils/sort";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import {
  isCircularEntity,
  isClassEntity,
  isEnumEntity,
  isExplicitSignatureEntity,
  isExportAssignmentEntity,
  isFunctionEntity,
  isInterfaceEntity,
  isModuleEntity,
  isNamespaceEntity,
  isParameterEntity,
  isPropertyEntity,
  isTypeAliasEntity,
  isTypeParameterEntity,
  isVariableEntity
} from "unwritten:typeguards/entities";
import { assert } from "unwritten:utils/general.js";

import type { Entity, ExportableEntity, LinkableEntity } from "unwritten:interpreter/type-definitions/entities";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type { ListNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type {
  ConvertedCategoryForDocumentation,
  ConvertedCategoryForTableOfContents,
  ConvertedEntitiesForDocumentation,
  ConvertedEntitiesForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertEntityToAnchor(ctx: MarkupRenderContexts, entity: LinkableEntity, displayName?: string) {

  if(isExplicitSignatureEntity(entity)){
    return convertSignatureEntityToAnchor(ctx, entity, displayName);
  } else if(isInterfaceEntity(entity)){
    return convertInterfaceEntityToAnchor(ctx, entity, displayName);
  } else if(isVariableEntity(entity)){
    return convertVariableEntityToAnchor(ctx, entity, displayName);
  } else if(isNamespaceEntity(entity)){
    return convertNamespaceEntityToAnchor(ctx, entity, displayName);
  } else if(isTypeAliasEntity(entity)){
    return convertTypeAliasEntityToAnchor(ctx, entity, displayName);
  } else if(isEnumEntity(entity)){
    return convertEnumEntityToAnchor(ctx, entity, displayName);
  } else if(isClassEntity(entity)){
    return convertClassEntityToAnchor(ctx, entity, displayName);
  } else if(isExportAssignmentEntity(entity)){
    return convertExportAssignmentEntityToAnchor(ctx, entity, displayName);
  } else if(isModuleEntity(entity)){
    return convertModuleEntityToAnchor(ctx, entity, displayName);
  } else if(isParameterEntity(entity)){
    return convertParameterEntityToAnchor(ctx, entity, displayName);
  } else if(isTypeParameterEntity(entity)){
    return convertTypeParameterEntityToAnchor(ctx, entity, displayName);
  } else if(isCircularEntity(entity)){
    return convertCircularEntityToAnchor(ctx, entity, displayName);
  } else if(isPropertyEntity(entity)){
    return convertPropertyEntityToAnchor(ctx, entity, displayName);
  }

  throw new RangeError(`Entity is not linkable: ${(<Entity>entity).kind}`);

}

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


export function convertToMarkupAST(ctx: MarkupRenderContexts, entities: ExportableEntity[]) {

  const sortedEntities = sortExportableEntities(ctx, entities);

  const tableOfContents = createTableOfContents(ctx, sortedEntities);
  const documentation = createDocumentation(ctx, sortedEntities);

  return {
    documentation,
    tableOfContents
  };

}


export function createTableOfContents(ctx: MarkupRenderContexts, entities: ExportableEntity[]): ListNode<ConvertedCategoryForTableOfContents[]> {

  const translate = getTranslator(ctx);

  const tableOfContents: ConvertedCategoryForTableOfContents[] = [];

  for(const entity of entities){

    const categoryName = renderCategoryName(ctx, entities);
    const existingCategory = tableOfContents.find(category => category[0] === categoryName);

    if(existingCategory === undefined){
      tableOfContents.push(
        [
          categoryName,
          createListNode()
        ]
      );
    }

    const category = tableOfContents.find(category => category[0] === categoryName)!;
    const convertedEntity = convertEntityForTableOfContents(ctx, entity);

    category[1].children.push(convertedEntity);

  }

  return createListNode(...tableOfContents);

}


export function createDocumentation(ctx: MarkupRenderContexts, entities: ExportableEntity[]): ConvertedCategoryForDocumentation[] {

  const translate = getTranslator(ctx);

  const documentation: ConvertedCategoryForDocumentation[] = [];

  for(const entity of entities){

    const sectionName = getSectionType(pluralizeEntityKind(entity.kind));

    assert(sectionName, `No section name found for entity kind: ${entity.kind}`);

    const categoryName = renderCategoryName(ctx, entities);
    const categoryAnchor = registerAnonymousAnchor(ctx, categoryName);
    const existingCategory = documentation.find(section => section.type === sectionName);

    if(existingCategory === undefined){
      documentation.push(
        createSectionNode(
          sectionName,
          createTitleNode(categoryName, categoryAnchor)
        )
      );
    }

    const section = documentation.find(section => section.title!.title === categoryName)!;
    const convertedEntity = convertEntityForDocumentation(ctx, entity);

    section.title!.children.push(convertedEntity);

  }

  return documentation;

}
