import { SignatureDeclaration } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { createParameter } from "../entities/parameter.js";


export function getParametersBySignatureDeclaration(ctx: CompilerContext, declaration: SignatureDeclaration) {
  return declaration.parameters.map(declaration => createParameter(ctx, declaration));
}
