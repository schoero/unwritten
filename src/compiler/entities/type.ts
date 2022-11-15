import ts, { Declaration, Symbol, Type, TypeNode } from "typescript";

import { parseSymbol } from "../../parser/index.js";
import {
  isFunctionLikeType,
  isInstanceType,
  isInterfaceType,
  isIntersectionType,
  isLiteralType,
  isObjectLiteralType,
  isObjectType,
  isPrimitiveType,
  isThisType,
  isTupleTypeReferenceType,
  isTypeLiteralType,
  isTypeParameterType,
  isTypeReferenceType,
  isUnionType
} from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { createFunctionType } from "./function.js";
import { createInstanceByType } from "./instance.js";
import { createInterfaceByType } from "./interface.js";
import { createIntersectionTypeByType } from "./intersection.js";
import { createLiteralType } from "./literal.js";
import { createObjectTypeByType } from "./object.js";
import { createObjectLiteralByType } from "./object-literal.js";
import { createPrimitiveType } from "./primitive.js";
import { createTypeReferenceByType, createTypeReferenceByTypeNode } from "./reference.js";
import { createThisByType } from "./this.js";
import { createTupleTypeByTypeReference } from "./tuple.js";
import { createTypeLiteralByType } from "./type-literal.js";
import { createTypeParameterByType } from "./type-parameter.js";
import { createUnionTypeByType } from "./union.js";
import { createUnresolvedByType } from "./unresolved.js";


export function createTypeBySymbol(ctx: CompilerContext, symbol: Symbol): Types {
  return parseSymbol(ctx, symbol);
}


export function createTypeByDeclaration(ctx: CompilerContext, declaration: Declaration): Types {
  const type = ctx.checker.getTypeAtLocation(declaration);
  return createTypeByType(ctx, type);
}


/**
 * Type references must be handled by type node, otherwise we don't have access to the type arguments.
 */
export function createTypeByTypeNode(ctx: CompilerContext, typeNode: TypeNode): Types {

  const type = ctx.checker.getTypeFromTypeNode(typeNode);


  //-- Type references

  if(ts.isTypeReferenceNode(typeNode)){
    return createTypeReferenceByTypeNode(ctx, typeNode);
  }

  return createTypeByType(ctx, type);

}

export function createTypeByType(ctx: CompilerContext, type: Type): Types {


  if(isObjectType(type)){
    return createObjectTypeByType(ctx, type);
  }


  //-- Order is important! Sort by most specific to least specific

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  } else if(isInstanceType(type)){
    return createInstanceByType(ctx, type);
  } else if(isTypeReferenceType(type)){
    return createTypeReferenceByType(ctx, type);
  } else if(isFunctionLikeType(type)){
    return createFunctionType(ctx, type);
  } else if(isLiteralType(type)){
    return createLiteralType(ctx, type);
  } else if(isPrimitiveType(type)){
    return createPrimitiveType(ctx, type);
  } else if(isObjectLiteralType(type)){
    return createObjectLiteralByType(ctx, type);
  } else if(isTypeLiteralType(type)){
    return createTypeLiteralByType(ctx, type);
  } else if(isUnionType(type)){
    return createUnionTypeByType(ctx, type);
  } else if(isIntersectionType(type)){
    return createIntersectionTypeByType(ctx, type);
  } else if(isInterfaceType(type)){
    return createInterfaceByType(ctx, type);
  } else if(isThisType(type)){
    return createThisByType(ctx, type);
  } else if(isTypeParameterType(type)){
    return createTypeParameterByType(ctx, type);
  } else {
    return createUnresolvedByType(ctx, type);
  }

}
