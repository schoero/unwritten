import { Declaration, ObjectType as TSObjectType, Symbol, Type } from "typescript";

import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { createArrayByTypeReference } from "quickdoks:compiler:entities/array.js";
import { createClassByType } from "quickdoks:compiler:entities/class.js";
import { createConditionalType } from "quickdoks:compiler:entities/conditional-type.js";
import { createFunctionByType } from "quickdoks:compiler:entities/function.js";
import { createInterfaceByType } from "quickdoks:compiler:entities/interface.js";
import { createIntersectionTypeByType } from "quickdoks:compiler:entities/intersection-type.js";
import { createLiteralType } from "quickdoks:compiler:entities/literal-type.js";
import { createMappedTypeByType } from "quickdoks:compiler:entities/mapped-type.js";
import { createObjectLiteralByType } from "quickdoks:compiler:entities/object-literal.js";
import { createPrimitiveType } from "quickdoks:compiler:entities/primitive.js";
import { createThisByType } from "quickdoks:compiler:entities/this-type.js";
import { createTupleTypeByTypeReference } from "quickdoks:compiler:entities/tuple-type.js";
import { createTypeLiteralByType } from "quickdoks:compiler:entities/type-literal.js";
import { createTypeParameterByType } from "quickdoks:compiler:entities/type-parameter.js";
import { createUnionTypeByType } from "quickdoks:compiler:entities/union-type.js";
import { createUnresolvedBySymbol, createUnresolvedByType } from "quickdoks:compiler:entities/unresolved.js";
import {
  isArrayTypeReferenceType,
  isClassType,
  isConditionalType,
  isFunctionLikeType,
  isInterfaceType,
  isIntersectionType,
  isLiteralType,
  isMappedType,
  isObjectLiteralType,
  isObjectType,
  isPrimitiveType,
  isThisType,
  isTupleTypeReferenceType,
  isTypeLiteralType,
  isTypeParameterType,
  isTypeReferenceType,
  isUnionType
} from "quickdoks:compiler:typeguards/types.js";
import { error } from "quickdoks:logger:index.js";
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


  //-- Order is important! Sort by most specific to least specific

  if(isThisType(type)){
    return createThisByType(ctx, type);
  } else if(isConditionalType(type)){
    return createConditionalType(ctx, type);
  } else if(isLiteralType(type)){
    return createLiteralType(ctx, type);
  } else if(isPrimitiveType(type)){
    return createPrimitiveType(ctx, type);
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

  throw error("Unknown object type");

}
