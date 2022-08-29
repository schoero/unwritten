import { Declaration, Type } from "typescript";
import { assert } from "vitest";
import { isFunctionType, isLiteralType, isPrimitiveType } from "../../typeguards/ts.js";
import { Types } from "../../types/types.js";
import { getContext } from "../context/index.js";
import { createFunctionByType } from "../types/function.js";
import { createLiteralType } from "../types/literal.js";
import { createPrimitiveType } from "../types/primitive.js";


export function getTypeByDeclaration(declaration: Declaration): Types {
  const type = getContext().checker.getTypeAtLocation(declaration);
  return getTypeByType(type);
}


export function getTypeByType(type: Type): Types {


  //-- Order is important here. Check reference types first.

  if(isFunctionType(type)){
    return createFunctionByType(type);
  } else if(isLiteralType(type)){
    return createLiteralType(type);
  } else if(isPrimitiveType(type)){
    return createPrimitiveType(type);
  }

  assert(false, "Unsupported type.");

}