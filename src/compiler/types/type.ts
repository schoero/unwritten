import ts, { Declaration, Symbol, Type, TypeNode } from "typescript";
import { assert } from "vitest";

import {
  isFunctionLikeType,
  isInstanceType,
  isInterfaceType,
  isIntersectionType,
  isLiteralType,
  isObjectLiteralType,
  isPrimitiveType,
  isThisType,
  isTupleTypeReferenceType,
  isTypeLiteralType,
  isTypeReferenceType,
  isUnionType
} from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { createFunctionByType } from "./function.js";
import { createInstanceByType } from "./instance.js";
import { createInterfaceByType } from "./interface.js";
import { createIntersectionTypeByType } from "./intersection-type.js";
import { createLiteralType } from "./literal.js";
import { createObjectLiteralByType } from "./object-literal.js";
import { createPrimitiveType } from "./primitive.js";
import { createTypeReferenceByType, createTypeReferenceByTypeNode } from "./reference.js";
import { createThisByType } from "./this.js";
import { createTupleTypeByTypeReference } from "./tuple.js";
import { createTypeLiteralByType } from "./type-literal.js";
import { createUnionTypeByType } from "./union.js";


export function createTypeBySymbol(ctx: CompilerContext, symbol: Symbol): Types {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration, "Symbol has no declaration");

  return createTypeByDeclaration(ctx, declaration);

}


export function createTypeByDeclaration(ctx: CompilerContext, declaration: Declaration): Types {
  const type = ctx.checker.getTypeAtLocation(declaration);
  return createTypeByType(ctx, type);
}


/**
 * Some types like generic types or arrays must be handled by the typeNode
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


  //-- Order is important here. Check reference types first.

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  } else if(isInstanceType(type)){
    return createInstanceByType(ctx, type);
  } else if(isTypeReferenceType(type)){
    return createTypeReferenceByType(ctx, type);
  } else if(isFunctionLikeType(type)){
    return createFunctionByType(ctx, type);
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
  }

  throw new Error("Unsupported type");

}