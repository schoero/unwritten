import {
  convertAnyTypeInline,
  convertArrayTypeInline,
  convertArrayTypeMultiline,
  convertBigIntLiteralTypeInline,
  convertBigIntTypeInline,
  convertBooleanLiteralTypeInline,
  convertBooleanTypeInline,
  convertCircularTypeInline,
  convertClassTypeInline,
  convertClassTypeMultiline,
  convertConditionalTypeInline,
  convertConditionalTypeMultiline,
  convertFunctionTypeInline,
  convertFunctionTypeMultiline,
  convertIndexedAccessTypeInline,
  convertIndexedAccessTypeMultiline,
  convertInterfaceTypeInline,
  convertInterfaceTypeMultiline,
  convertIntersectionTypeInline,
  convertIntersectionTypeMultiline,
  convertMappedTypeMultiline,
  convertNeverTypeInline,
  convertNullTypeInline,
  convertNumberLiteralTypeInline,
  convertNumberTypeInline,
  convertObjectLiteralTypeInline,
  convertObjectLiteralTypeMultiline,
  convertObjectTypeInline,
  convertObjectTypeMultiline,
  convertStringLiteralTypeInline,
  convertStringTypeInline,
  convertSymbolTypeInline,
  convertTemplateLiteralTypeInline,
  convertTupleTypeInline,
  convertTupleTypeMultiline,
  convertTypeLiteralTypeInline,
  convertTypeLiteralTypeMultiline,
  convertTypeParameterTypeInline,
  convertTypeReferenceTypeInline,
  convertTypeReferenceTypeMultiline,
  convertUndefinedTypeInline,
  convertUnionTypeInline,
  convertUnionTypeMultiline,
  convertUnknownTypeInline,
  convertUnresolvedTypeInline,
  convertVoidTypeInline
} from "unwritten:renderer:markup/ast-converter/types/index";
import { createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import { isMultilineType, isMultilineUnionType } from "unwritten:renderer:markup/utils/types";
import { convertTypeQueryTypeInline } from "unwritten:renderer/markup/ast-converter/types/type-query";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import {
  isAnyType,
  isArrayType,
  isBigIntLiteralType,
  isBigIntType,
  isBooleanLiteralType,
  isBooleanType,
  isCircularType,
  isClassType,
  isConditionalType,
  isFunctionType,
  isIndexedAccessType,
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
  isTypeParameterType,
  isTypeQueryType,
  isTypeReferenceType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isUnresolvedType,
  isVoidType
} from "unwritten:typeguards/types";

import type { MultilineType, Type } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode, ConditionalNode, TitleNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type {
  ConvertedTypeInline,
  ConvertedTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTypeForDocumentation(ctx: MarkupRenderContext, type: Type): TitleNode<[ASTNode, ASTNode]> {

  const translate = getTranslator(ctx);

  const { inlineType, multilineType } = convertType(ctx, type);

  const typeTranslation = translate("type", { capitalize: true, count: 1 });
  const typeAnchor = registerAnonymousAnchor(ctx, typeTranslation);

  return createTitleNode(
    typeTranslation,
    typeAnchor,
    createParagraphNode(inlineType),
    multilineType
  );

}

export function convertType(ctx: MarkupRenderContext, type: Type | Type) {

  const inlineType = convertTypeForInlineType(ctx, type);
  const multilineType = isMultilineType(type)
    ? convertTypeForMultilineType(ctx, type)
    : undefined;

  return {
    inlineType,
    multilineType
  };

}

function convertTypeForInlineType(ctx: MarkupRenderContext, type: Type | Type): ConvertedTypeInline {

  if(isAnyType(type)){
    return convertAnyTypeInline(ctx, type);
  } else if(isArrayType(type)){
    return convertArrayTypeInline(ctx, type);
  } else if(isBigIntLiteralType(type)){
    return convertBigIntLiteralTypeInline(ctx, type);
  } else if(isBigIntType(type)){
    return convertBigIntTypeInline(ctx, type);
  } else if(isBooleanLiteralType(type)){
    return convertBooleanLiteralTypeInline(ctx, type);
  } else if(isBooleanType(type)){
    return convertBooleanTypeInline(ctx, type);
  } else if(isNeverType(type)){
    return convertNeverTypeInline(ctx, type);
  } else if(isNullType(type)){
    return convertNullTypeInline(ctx, type);
  } else if(isNumberLiteralType(type)){
    return convertNumberLiteralTypeInline(ctx, type);
  } else if(isNumberType(type)){
    return convertNumberTypeInline(ctx, type);
  } else if(isStringLiteralType(type)){
    return convertStringLiteralTypeInline(ctx, type);
  } else if(isStringType(type)){
    return convertStringTypeInline(ctx, type);
  } else if(isSymbolType(type)){
    return convertSymbolTypeInline(ctx, type);
  } else if(isTemplateLiteralType(type)){
    return convertTemplateLiteralTypeInline(ctx, type);
  } else if(isTupleType(type)){
    return convertTupleTypeInline(ctx, type);
  } else if(isUndefinedType(type)){
    return convertUndefinedTypeInline(ctx, type);
  } else if(isUnionType(type)){
    return convertUnionTypeInline(ctx, type);
  } else if(isIntersectionType(type)){
    return convertIntersectionTypeInline(ctx, type);
  } else if(isUnknownType(type)){
    return convertUnknownTypeInline(ctx, type);
  } else if(isVoidType(type)){
    return convertVoidTypeInline(ctx, type);
  } else if(isFunctionType(type)){
    return convertFunctionTypeInline(ctx, type);
  } else if(isTypeReferenceType(type)){
    return convertTypeReferenceTypeInline(ctx, type);
  } else if(isInterfaceType(type)){
    return convertInterfaceTypeInline(ctx, type);
  } else if(isClassType(type)){
    return convertClassTypeInline(ctx, type);
  } else if(isTypeLiteralType(type)){
    return convertTypeLiteralTypeInline(ctx, type);
  } else if(isMappedType(type)){
    return convertMappedTypeMultiline(ctx, type);
  } else if(isObjectLiteralType(type)){
    return convertObjectLiteralTypeInline(ctx, type);
  } else if(isObjectType(type)){
    return convertObjectTypeInline(ctx, type);
  } else if(isTypeParameterType(type)){
    return convertTypeParameterTypeInline(ctx, type);
  } else if(isUnresolvedType(type)){
    return convertUnresolvedTypeInline(ctx, type);
  } else if(isCircularType(type)){
    return convertCircularTypeInline(ctx, type);
  } else if(isConditionalType(type)){
    return convertConditionalTypeInline(ctx, type);
  } else if(isIndexedAccessType(type)){
    return convertIndexedAccessTypeInline(ctx, type);
  } else if(isTypeQueryType(type)){
    return convertTypeQueryTypeInline(ctx, type);
  }

  throw new Error(`Type ${type.kind} is not yet implemented`);

}

function convertTypeForMultilineType(ctx: MarkupRenderContext, type: MultilineType): ConditionalNode | ConvertedTypeMultiline | undefined {

  if(isObjectType(type)){
    return convertObjectTypeMultiline(ctx, type);
  } else if(isObjectLiteralType(type)){
    return convertObjectLiteralTypeMultiline(ctx, type);
  } else if(isTypeLiteralType(type)){
    return convertTypeLiteralTypeMultiline(ctx, type);
  } else if(isInterfaceType(type)){
    return convertInterfaceTypeMultiline(ctx, type);
  } else if(isClassType(type)){
    return convertClassTypeMultiline(ctx, type);
  } else if(isFunctionType(type)){
    return convertFunctionTypeMultiline(ctx, type);
  } else if(isTypeReferenceType(type)){
    return convertTypeReferenceTypeMultiline(ctx, type);
  } else if(isArrayType(type)){
    return convertArrayTypeMultiline(ctx, type);
  } else if(isTupleType(type)){
    return convertTupleTypeMultiline(ctx, type);
  } else if(isUnionType(type) && isMultilineUnionType(type)){
    return convertUnionTypeMultiline(ctx, type);
  } else if(isIntersectionType(type)){
    return convertIntersectionTypeMultiline(ctx, type);
  } else if(isMappedType(type)){
    return convertMappedTypeMultiline(ctx, type);
  } else if(isConditionalType(type)){
    return convertConditionalTypeMultiline(ctx, type);
  } else if(isIndexedAccessType(type)){
    return convertIndexedAccessTypeMultiline(ctx, type);
  }

  throw new Error(`Type ${type.kind} is not yet implemented`);

}
