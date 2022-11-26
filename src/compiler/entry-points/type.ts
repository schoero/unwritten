import { Declaration, ObjectType as TSObjectType, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { isSymbolExcluded } from "../../utils/general.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createArrayByTypeReference } from "../entities/array.js";
import { createConditionalType } from "../entities/conditional-type.js";
import { createFunctionByType } from "../entities/function.js";
import { createInstanceByType } from "../entities/instance.js";
import { createInterfaceByType } from "../entities/interface.js";
import { createIntersectionTypeByType } from "../entities/intersection-type.js";
import { createLiteralType } from "../entities/literal-type.js";
import { createMappedTypeByType } from "../entities/mapped-type.js";
import { createObjectLiteralByType } from "../entities/object-literal.js";
import { createObjectTypeByType } from "../entities/object-type.js";
import { createPrimitiveType } from "../entities/primitive.js";
import { createThisByType } from "../entities/this-type.js";
import { createTupleTypeByTypeReference } from "../entities/tuple-type.js";
import { createTypeLiteralByType } from "../entities/type-literal.js";
import { createTypeParameterByType } from "../entities/type-parameter.js";
import { createUnionTypeByType } from "../entities/union-type.js";
import { createUnresolvedBySymbol, createUnresolvedByType } from "../entities/unresolved.js";
import {
  isArrayTypeReferenceType,
  isConditionalType,
  isFunctionLikeType,
  isInstanceType,
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
  isUnionType
} from "../typeguards/types.js";
import { parseSymbol } from "./symbol.js";


export function createTypeByDeclaration(ctx: CompilerContext, declaration: Declaration): Types {
  const type = ctx.checker.getTypeAtLocation(declaration);
  return parseType(ctx, type);
}


export function parseType(ctx: CompilerContext, type: Type): Types {

  if(isObjectType(type)){
    return createObjectTypeByType(ctx, type);
  }


  //-- Order is important! Sort by most specific to least specific

  if(isThisType(type)){
    return createThisByType(ctx, type);
  } else if(isInstanceType(type)){
    return createInstanceByType(ctx, type);
  } else if(isConditionalType(type)){
    return createConditionalType(ctx, type);
  } else if(isLiteralType(type)){
    return createLiteralType(ctx, type);
  } else if(isPrimitiveType(type)){
    return createPrimitiveType(ctx, type);
  } else if(isObjectLiteralType(type)){
    return createObjectLiteralByType(ctx, type);
  } else if(isUnionType(type)){
    return createUnionTypeByType(ctx, type);
  } else if(isIntersectionType(type)){
    return createIntersectionTypeByType(ctx, type);
  } else if(isInterfaceType(type)){
    return createInterfaceByType(ctx, type);
  } else if(isTypeParameterType(type)){
    return createTypeParameterByType(ctx, type);
  } else {
    return createUnresolvedByType(ctx, type);
  }

}


export function parseObjectType(ctx: CompilerContext, type: TSObjectType): Types {


  //-- Array

  if(isArrayTypeReferenceType(type)){
    return createArrayByTypeReference(ctx, type);
  }


  //-- Tuple

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  }


  const symbol = type.symbol;


  //-- Unresolved

  if(isSymbolExcluded(ctx, symbol)){
    return createUnresolvedBySymbol(ctx, symbol);
  }

  const name = getNameBySymbol(ctx, symbol);


  //-- Symbol

  if(!name.startsWith("__")){
    return parseSymbol(ctx, symbol);
  }


  //-- Mapped type

  if(isMappedType(type)){
    return createMappedTypeByType(ctx, type);
  }


  //-- Function

  if(isFunctionLikeType(type)){
    return createFunctionByType(ctx, type);
  }


  //-- Type literal

  if(isTypeLiteralType(type)){
    return createTypeLiteralByType(ctx, type);
  }

  return createObjectTypeByType(ctx, type);
}