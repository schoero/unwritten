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
  isTupleTypeReferenceType,
  isTypeLiteralType,
  isTypeReferenceType,
  isUnionType
} from "../../typeguards/ts.js";
import { Entities } from "../../types/types.js";
import { getContext } from "../context/index.js";
import { createArrayByArrayTypeNode, createArrayByTypeReferenceNode } from "../types/array.js";
import { createFunctionByType } from "../types/function.js";
import { createInstanceByType } from "../types/instance.js";
import { createInterfaceByType } from "../types/interface.js";
import { createIntersectionTypeByType } from "../types/intersection-type.js";
import { createLiteralType } from "../types/literal.js";
import { createObjectLiteralByType } from "../types/object-literal.js";
import { createPrimitiveType } from "../types/primitive.js";
import { createTypeReferenceByType, createTypeReferenceByTypeNode } from "../types/reference.js";
import { createTupleTypeByTypeReference } from "../types/tuple.js";
import { createTypeLiteralByType } from "../types/type-literal.js";
import { createUnionTypeByType } from "../types/union-type.js";


export function getTypeBySymbol(symbol: Symbol): Entities {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration, "Symbol has no declaration");

  return getTypeByDeclaration(declaration);

}


export function getTypeByDeclaration(declaration: Declaration): Entities {
  const type = getContext().checker.getTypeAtLocation(declaration);
  return getTypeByType(type);
}


/**
 * Some types like generic types or arrays must be handled by the typeNode
 */
export function getTypeByTypeNode(typeNode: TypeNode): Entities {

  const type = getContext().checker.getTypeFromTypeNode(typeNode);


  //-- Handle Array special cases: https://stackoverflow.com/a/60622707

  if(ts.isArrayTypeNode(typeNode)){
    return createArrayByArrayTypeNode(typeNode);
  } else if(ts.isTypeReferenceNode(typeNode)){
    if(typeNode.typeName.getText() === "Array" && typeNode.typeArguments && typeNode.typeArguments.length === 1){
      return createArrayByTypeReferenceNode(typeNode);
    }
  }


  //-- Type references

  if(ts.isTypeReferenceNode(typeNode)){
    return createTypeReferenceByTypeNode(typeNode);
  }

  return getTypeByType(type);

}


export function getTypeByType(type: Type): Entities {


  //-- Order is important here. Check reference types first.

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(type);
  } else if(isInstanceType(type)){
    return createInstanceByType(type);
  } else if(isTypeReferenceType(type)){
    return createTypeReferenceByType(type);
  } else if(isFunctionLikeType(type)){
    return createFunctionByType(type);
  } else if(isLiteralType(type)){
    return createLiteralType(type);
  } else if(isPrimitiveType(type)){
    return createPrimitiveType(type);
  } else if(isObjectLiteralType(type)){
    return createObjectLiteralByType(type);
  } else if(isTypeLiteralType(type)){
    return createTypeLiteralByType(type);
  } else if(isUnionType(type)){
    return createUnionTypeByType(type);
  } else if(isIntersectionType(type)){
    return createIntersectionTypeByType(type);
  } else if(isInterfaceType(type)){
    return createInterfaceByType(type);
  }

  throw new Error("Unsupported type");

}