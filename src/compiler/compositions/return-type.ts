import { Signature } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { createTypeByType } from "../types/type.js";
import { getReturnTypeDescription } from "./jsdoc.js";


export function getReturnTypeByCallSignature(ctx: CompilerContext, callSignature: Signature) {

  const returnType = callSignature.getReturnType();
  const returnTypeDescription = getReturnTypeDescription(ctx, callSignature.getDeclaration());

  assert(returnType, "Function return type is missing.");

  return {
    description: returnTypeDescription,
    ...createTypeByType(ctx, returnType)
  };

}