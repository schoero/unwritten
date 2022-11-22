import { Declaration, Symbol, Type, TypeNode } from "typescript";

import { parseSymbol } from "../../parser/index.js";
import {
  isArrayTypeNode,
  isArrayTypeReferenceTypeNode,
  isInstanceType,
  isInterfaceType,
  isIntersectionType,
  isLiteralType,
  isObjectLiteralType,
  isObjectType,
  isPrimitiveType,
  isThisType,
  isTupleTypeNode,
  isTypeParameterType,
  isTypeReferenceNode,
  isUnionType
} from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { createArrayByArrayTypeNode } from "./array.js";
import { createInstanceByType } from "./instance.js";
import { createInterfaceByType } from "./interface.js";
import { createIntersectionTypeByType } from "./intersection-type.js";
import { createLiteralType } from "./literal-type.js";
import { createObjectTypeByType } from "./object.js";
import { createObjectLiteralByType } from "./object-literal.js";
import { createPrimitiveType } from "./primitive.js";
import { createThisByType } from "./this-type.js";
import { createTupleByTupleTypeNode } from "./tuple-type.js";
import { createTypeParameterByType } from "./type-parameter.js";
import { createTypeReferenceByTypeNode } from "./type-reference.js";
import { createUnionTypeByType } from "./union-type.js";
import { createUnresolvedByType } from "./unresolved.js";


export function createTypeBySymbol(ctx: CompilerContext, symbol: Symbol): Types {
  return parseSymbol(ctx, symbol);
}


export function createTypeByDeclaration(ctx: CompilerContext, declaration: Declaration): Types {
  const type = ctx.checker.getTypeAtLocation(declaration);
  return createTypeByType(ctx, type);
}


/**
 * Type references must be handled by type node because the type would be the referenced type.
 */
export function createTypeByTypeNode(ctx: CompilerContext, typeNode: TypeNode): Types {

  if(isArrayTypeNode(typeNode)){
    return createArrayByArrayTypeNode(ctx, typeNode);
  } else if(isArrayTypeReferenceTypeNode(typeNode)){
    return createArrayByArrayTypeNode(ctx, typeNode);
  } else if(isTupleTypeNode(typeNode)){
    return createTupleByTupleTypeNode(ctx, typeNode);
  } else if(isTypeReferenceNode(typeNode)){
    return createTypeReferenceByTypeNode(ctx, typeNode);
  }

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createTypeByType(ctx, type);

}


export function createTypeByType(ctx: CompilerContext, type: Type): Types {

  if(isObjectType(type)){
    return createObjectTypeByType(ctx, type);
  }


  //-- Order is important! Sort by most specific to least specific

  if(isThisType(type)){
    return createThisByType(ctx, type);
  } else if(isInstanceType(type)){
    return createInstanceByType(ctx, type);
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
