import { Declaration, ObjectType as TSObjectType, Symbol, Type } from "typescript";

import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { createAnyType } from "quickdoks:compiler:entities/any-type.js";
import { createArrayByTypeReference } from "quickdoks:compiler:entities/array.js";
import { createBigIntLiteralType } from "quickdoks:compiler:entities/bigint-literal-type.js";
import { createBigIntType } from "quickdoks:compiler:entities/bigint-type.js";
import { createBooleanLiteralType } from "quickdoks:compiler:entities/boolean-literal-type.js";
import { createBooleanType } from "quickdoks:compiler:entities/boolean-type.js";
import { createClassByType } from "quickdoks:compiler:entities/class.js";
import { createConditionalType } from "quickdoks:compiler:entities/conditional-type.js";
import { createFunctionByType } from "quickdoks:compiler:entities/function.js";
import { createInterfaceByType } from "quickdoks:compiler:entities/interface.js";
import { createIntersectionTypeByType } from "quickdoks:compiler:entities/intersection-type.js";
import { createMappedTypeByType } from "quickdoks:compiler:entities/mapped-type.js";
import { createNeverType } from "quickdoks:compiler:entities/never-type.js";
import { createNullType } from "quickdoks:compiler:entities/null-type.js";
import { createNumberLiteralType } from "quickdoks:compiler:entities/number-literal-type.js";
import { createNumberType } from "quickdoks:compiler:entities/number-type.js";
import { createObjectLiteralByType } from "quickdoks:compiler:entities/object-literal.js";
import { createStringLiteralType } from "quickdoks:compiler:entities/string-literal-type.js";
import { createStringType } from "quickdoks:compiler:entities/string-type.js";
import { createSymbolType } from "quickdoks:compiler:entities/symbol-type.js";
import { createThisByType } from "quickdoks:compiler:entities/this-type.js";
import { createTupleTypeByTypeReference } from "quickdoks:compiler:entities/tuple-type.js";
import { createTypeLiteralByType } from "quickdoks:compiler:entities/type-literal.js";
import { createTypeParameterByType } from "quickdoks:compiler:entities/type-parameter.js";
import { createUndefinedType } from "quickdoks:compiler:entities/undefined-type.js";
import { createUnionTypeByType } from "quickdoks:compiler:entities/union-type.js";
import { createUnknownType } from "quickdoks:compiler:entities/unknown-type.js";
import { createUnresolvedBySymbol, createUnresolvedByType } from "quickdoks:compiler:entities/unresolved.js";
import { createVoidType } from "quickdoks:compiler:entities/void-type.js";
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
  isThisType,
  isTupleTypeReferenceType,
  isTypeLiteralType,
  isTypeParameterType,
  isTypeReferenceType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Types } from "quickdoks:types:types.js";
import { isSymbolExcluded } from "quickdoks:utils:exclude.js";
import { assert } from "quickdoks:utils:general.js";


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


  if(isObjectType(type)){
    return parseObjectType(ctx, type);
  }


  //-- Order is important! Parse most specific types first

  if(isThisType(type)){
    return createThisByType(ctx, type);
  } else if(isConditionalType(type)){
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
    return createTypeParameterByType(ctx, type);
  } else {
    return createUnresolvedByType(ctx, type);
  }

}


export function parseObjectType(ctx: CompilerContext, type: TSObjectType): Types {

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  } else if(isArrayTypeReferenceType(type)){
    return createArrayByTypeReference(ctx, type);
  }

  const symbol = type.symbol;

  if(isSymbolExcluded(ctx, symbol)){
    return createUnresolvedBySymbol(ctx, symbol);
  }

  if(isMappedType(type)){
    return createMappedTypeByType(ctx, type);
  } else if(isFunctionLikeType(type)){
    return createFunctionByType(ctx, type);
  } else if(isTypeLiteralType(type)){
    return createTypeLiteralByType(ctx, type);
  } else if(isObjectLiteralType(type)){
    return createObjectLiteralByType(ctx, type);
  } else if(isInterfaceType(type)){
    return createInterfaceByType(ctx, type);
  } else if(isClassType(type)){
    return createClassByType(ctx, type);
  } else if(isTypeReferenceType(type)){
    // return createTypeReferenceByType(ctx, type);
  }

  const name = getNameBySymbol(ctx, symbol);

  if(!name.startsWith("__")){
    // return parseSymbol(ctx, symbol);
  }

  throw new Error("Unknown object type");

}
