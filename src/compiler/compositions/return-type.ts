import { Signature } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { assert } from "../../utils/general.js";
import { parseType } from "../entry-points/type.js";
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
