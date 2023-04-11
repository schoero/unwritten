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
import {
  convertAnyType,
  convertArrayType,
  convertBigIntLiteralType,
  convertBigIntType,
  convertBooleanLiteralType,
  convertBooleanType,
  convertClassType,
  convertFunctionType,
  convertInterfaceType,
  convertIntersectionType,
  convertMappedType,
  convertNeverType,
  convertNullType,
  convertNumberLiteralType,
  convertNumberType,
  convertObjectLiteralType,
  convertObjectType,
  convertStringLiteralType,
  convertStringType,
  convertSymbolType,
  convertTemplateLiteralType,
  convertTupleType,
  convertTypeLiteralType,
  convertUndefinedType,
  convertUnionType,
  convertUnknownType,
  convertVoidType
} from "unwritten:renderer:markup/ast-converter/types/index.js";
import { convertTypeReferenceType } from "unwritten:renderer:markup/ast-converter/types/type-reference.js";
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
import {
  isAnyType,
  isArrayType,
  isBigIntLiteralType,
  isBigIntType,
  isBooleanLiteralType,
  isBooleanType,
  isClassType,
  isFunctionType,
  isInterfaceType,
  isIntersectionType,
  isMappedType,
  isNeverType,
  isNullType,
  isNumberLiteralType,
  isNumberType,
  isObjectLiteralType,
  isObjectType,
  isStringLiteralType,
  isStringType,
  isSymbolType,
  isTemplateLiteralType,
  isTupleType,
  isTypeLiteralType,
  isTypeReferenceType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "unwritten:typeguards/types.js";

import type { ExportableEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { Types } from "unwritten:interpreter:type-definitions/types.js";
import type { TitleNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedCategoryForDocumentation,
  ConvertedCategoryForTableOfContents,
  ConvertedEntitiesForDocumentation,
  ConvertedEntitiesForTableOfContents,
  ConvertedTypes
} from "unwritten:renderer:markup/types-definitions/renderer.d.js";


export function convertType(ctx: MarkupRenderContexts, type: Types): ConvertedTypes {

  if(isAnyType(type)){
    return convertAnyType(ctx, type);
  } else if(isArrayType(type)){
    return convertArrayType(ctx, type);
  } else if(isBigIntLiteralType(type)){
    return convertBigIntLiteralType(ctx, type);
  } else if(isBigIntType(type)){
    return convertBigIntType(ctx, type);
  } else if(isBooleanLiteralType(type)){
    return convertBooleanLiteralType(ctx, type);
  } else if(isBooleanType(type)){
    return convertBooleanType(ctx, type);
  } else if(isNeverType(type)){
    return convertNeverType(ctx, type);
  } else if(isNullType(type)){
    return convertNullType(ctx, type);
  } else if(isNumberLiteralType(type)){
    return convertNumberLiteralType(ctx, type);
  } else if(isNumberType(type)){
    return convertNumberType(ctx, type);
  } else if(isStringLiteralType(type)){
    return convertStringLiteralType(ctx, type);
  } else if(isStringType(type)){
    return convertStringType(ctx, type);
  } else if(isSymbolType(type)){
    return convertSymbolType(ctx, type);
  } else if(isTemplateLiteralType(type)){
    return convertTemplateLiteralType(ctx, type);
  } else if(isTupleType(type)){
    return convertTupleType(ctx, type);
  } else if(isUndefinedType(type)){
    return convertUndefinedType(ctx, type);
  } else if(isUnionType(type)){
    return convertUnionType(ctx, type);
  } else if(isIntersectionType(type)){
    return convertIntersectionType(ctx, type);
  } else if(isUnknownType(type)){
    return convertUnknownType(ctx, type);
  } else if(isVoidType(type)){
    return convertVoidType(ctx, type);
  } else if(isFunctionType(type)){
    return convertFunctionType(ctx, type);
  } else if(isTypeReferenceType(type)){
    return convertTypeReferenceType(ctx, type);
  } else if(isInterfaceType(type)){
    return convertInterfaceType(ctx, type);
  } else if(isClassType(type)){
    return convertClassType(ctx, type);
  } else if(isTypeLiteralType(type)){
    return convertTypeLiteralType(ctx, type);
  } else if(isMappedType(type)){
    return convertMappedType(ctx, type);
  } else if(isObjectLiteralType(type)){
    return convertObjectLiteralType(ctx, type);
  } else if(isObjectType(type)){
    return convertObjectType(ctx, type);
  }

  throw new Error(`Type ${type.kind} is not yet implemented`);

}


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
    const translation = translate(categoryName, { count: entities.length });
    const existingCategory = tableOfContents.find(category => category.title === categoryName);

    if(existingCategory === undefined){
      tableOfContents.push(
        createTitleNode(
          translation,
          createListNode([])
        )
      );
    }

    const category = tableOfContents.find(category => category.title === categoryName)!;
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
    const translation = translate(categoryName, { count: entities.length });
    const existingCategory = documentation.find(category => category.title === categoryName);

    if(existingCategory === undefined){
      documentation.push(
        createTitleNode(translation)
      );
    }

    const category = documentation.find(category => category.title === categoryName)!;
    const convertedEntity = convertEntityForDocumentation(ctx, entity);

    category.children.push(convertedEntity);

  }

  return documentation;

}
