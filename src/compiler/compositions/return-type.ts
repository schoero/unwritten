import { Signature } from "typescript";

import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { assert } from "quickdoks:utils:general.js";

import { getReturnTypeDescription } from "./jsdoc.js";


export function getReturnTypeByCallSignature(ctx: CompilerContext, callSignature: Signature) {

  const returnType = callSignature.getReturnType();
  const returnTypeDescription = getReturnTypeDescription(ctx, callSignature.getDeclaration());

  assert(returnType, "Function return type is missing.");

  return {
    description: returnTypeDescription,
    ...parseType(ctx, returnType)
  };

}
