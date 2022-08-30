import { Declaration, Symbol, Type } from "typescript";

import { assert } from "vitest";

import { isFunctionType, isLiteralType, isObjectLiteralType, isPrimitiveType } from "../../typeguards/ts.js";
import { Entities } from "../../types/types.js";
import { getContext } from "../context/index.js";
import { createFunctionByType } from "../types/function.js";
import { createLiteralType } from "../types/literal.js";
import { createObjectLiteralType } from "../types/object-literal.js";
import { createPrimitiveType } from "../types/primitive.js";


export function getTypeBySymbol(symbol: Symbol): Entities {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration, "Symbol has no declaration");

  return getTypeByDeclaration(declaration);

}


export function getTypeByDeclaration(declaration: Declaration): Entities {
  const type = getContext().checker.getTypeAtLocation(declaration);
  return getTypeByType(type);
}


export function getTypeByType(type: Type): Entities {


  //-- Order is important here. Check reference types first.

  if(isFunctionType(type)){
    return createFunctionByType(type);
  } else if(isLiteralType(type)){
    return createLiteralType(type);
  } else if(isPrimitiveType(type)){
    return createPrimitiveType(type);
  } else if(isObjectLiteralType(type)){
    return createObjectLiteralType(type);
  }

  assert(false, "Unsupported type.");

}