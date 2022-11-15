import { SignatureDeclaration } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { createParameterByDeclaration } from "../entities/parameter.js";


export function getParametersBySignatureDeclaration(ctx: CompilerContext, declaration: SignatureDeclaration) {
  return declaration.parameters.map(declaration => createParameterByDeclaration(ctx, declaration));
}
