import { createParagraphNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
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
  convertTypeParameterType,
  convertTypeReferenceType,
  convertUndefinedType,
  convertUnionType,
  convertUnknownType,
  convertVoidType
} from "unwritten:renderer:markup/ast-converter/types/index.js";
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
  isTypeParameterType,
  isTypeReferenceType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "unwritten:typeguards/types.js";

import type { Types } from "unwritten:interpreter/type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedTypes } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertType(ctx: MarkupRenderContexts, type: Types): ConvertedTypes {

  const t = getTranslator(ctx);

  const convertedType = convertTypeInline(ctx, type);

  return convertedType
    ? createTitleNode(
      t("type", { capitalize: true, count: 1 }),
      createParagraphNode(convertedType)
    )
    : "";
}


export function convertTypeInline(ctx: MarkupRenderContexts, type: Types): ConvertedTypes {

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
  } else if(isTypeParameterType(type)){
    return convertTypeParameterType(ctx, type);
  }

  throw new Error(`Type ${type.kind} is not yet implemented`);

}
