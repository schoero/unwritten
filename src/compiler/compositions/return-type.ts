import { Signature } from "typescript";
import { assert } from "vitest";

import { getReturnTypeDescription } from "./jsdoc.js";
import { getTypeByType } from "./type.js";


export function getReturnTypeByCallSignature(callSignature: Signature) {

  const returnType = callSignature.getReturnType();
  const returnTypeDescription = getReturnTypeDescription(callSignature.getDeclaration());

  assert(returnType, "Function return type is missing.");

  return {
    description: returnTypeDescription,
    ...getTypeByType(returnType)
  };

}