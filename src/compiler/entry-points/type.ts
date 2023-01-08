import { createFunctionType } from "quickdoks:compiler:ast/types/function-type.js";
import {
  createAnyType,
  createArrayType,
  createBigIntLiteralType,
  createBigIntType,
  createBooleanLiteralType,
  createBooleanType,
  createClassType,
  createConditionalType,
  createInterfaceByType,
  createIntersectionTypeByType,
  createLinkToType,
  createMappedTypeByType,
  createNeverType,
  createNullType,
  createNumberLiteralType,
  createNumberType,
  createObjectLiteralByType,
  createStringLiteralType,
  createStringType,
  createSymbolType,
  createTupleTypeByTypeReference,
  createTypeLiteralType,
  createTypeParameterType,
  createUndefinedType,
  createUnionTypeByType,
  createUnknownType,
  createUnresolvedBySymbol,
  createUnresolvedByType,
  createVoidType
} from "quickdoks:compiler:ast/types/index.js";
import { createObjectLikeType } from "quickdoks:compiler:ast/types/object-type.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import {
  isAnyType,
  isArrayTypeReferenceType,
  isBigIntLiteralType,
  isBigIntType,
  isBooleanLiteralType,
  isBooleanType,
  isClassType,
  isConditionalType,
  isFunctionLikeType,
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
  isTupleTypeReferenceType,
  isTypeLiteralType,
  isTypeParameterType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "quickdoks:compiler:typeguards/types.js";
import { isTypeLocked } from "quickdoks:compiler:utils/ts.js";
import { isSymbolExcluded } from "quickdoks:utils:exclude.js";
import { assert } from "quickdoks:utils:general.js";

import type { Declaration, ObjectType as TSObjectType, Symbol, Type } from "typescript";

import type { Types } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:compiler:type-definitions:context.d.js";


/** Getting the type by symbol (using getTypeOfSymbolAtLocation()) resolves generics */
export function createTypeBySymbol(ctx: CompilerContext, symbol: Symbol): Types {

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration, `Symbol ${getNameBySymbol(ctx, symbol)} has no declaration`);

  const type = ctx.checker.getTypeOfSymbolAtLocation(symbol, declaration);
  return parseType(ctx, type);

}

export function createTypeByDeclaration(ctx: CompilerContext, declaration: Declaration): Types {
  const type = ctx.checker.getTypeAtLocation(declaration);
  return parseType(ctx, type);
}


export function parseType(ctx: CompilerContext, type: Type): Types {

  if(isTypeLocked(ctx, type)){
    return createLinkToType(ctx, type);
  }

  if(isObjectType(type)){
    return parseObjectType(ctx, type);
  }


  //-- Order is important! Parse most specific types first

  if(isConditionalType(type)){
    return createConditionalType(ctx, type);
  } else if(isStringLiteralType(type)){
    return createStringLiteralType(ctx, type);
  } else if(isNumberLiteralType(type)){
    return createNumberLiteralType(ctx, type);
  } else if(isBigIntLiteralType(type)){
    return createBigIntLiteralType(ctx, type);
  } else if(isBooleanLiteralType(type)){
    return createBooleanLiteralType(ctx, type);
  } else if(isStringType(type)){
    return createStringType(ctx, type);
  } else if(isNumberType(type)){
    return createNumberType(ctx, type);
  } else if(isBooleanType(type)){
    return createBooleanType(ctx, type);
  } else if(isBigIntType(type)){
    return createBigIntType(ctx, type);
  } else if(isVoidType(type)){
    return createVoidType(ctx, type);
  } else if(isUndefinedType(type)){
    return createUndefinedType(ctx, type);
  } else if(isNullType(type)){
    return createNullType(ctx, type);
  } else if(isAnyType(type)){
    return createAnyType(ctx, type);
  } else if(isUnknownType(type)){
    return createUnknownType(ctx, type);
  } else if(isNeverType(type)){
    return createNeverType(ctx, type);
  } else if(isSymbolType(type)){
    return createSymbolType(ctx, type);
  } else if(isUnionType(type)){
    return createUnionTypeByType(ctx, type);
  } else if(isIntersectionType(type)){
    return createIntersectionTypeByType(ctx, type);
  } else if(isTypeParameterType(type)){
    return createTypeParameterType(ctx, type);
  } else {
    return createUnresolvedByType(ctx, type);
  }

}


export function parseObjectType(ctx: CompilerContext, type: TSObjectType): Types {

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  } else if(isArrayTypeReferenceType(type)){
    return createArrayType(ctx, type);
  }

  if(isSymbolExcluded(ctx, type.symbol)){
    return createUnresolvedBySymbol(ctx, type.symbol);
  }

  if(isMappedType(type)){
    return createMappedTypeByType(ctx, type);
  } else if(isFunctionLikeType(type)){
    return createFunctionType(ctx, type);
  } else if(isTypeLiteralType(type)){
    return createTypeLiteralType(ctx, type);
  } else if(isObjectLiteralType(type)){
    return createObjectLiteralByType(ctx, type);
  } else if(isInterfaceType(type)){
    return createInterfaceByType(ctx, type);
  } else if(isClassType(type)){
    return createClassType(ctx, type);
  }

  return createObjectLikeType(ctx, type);

}
