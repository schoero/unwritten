import { SignatureDeclaration } from "typescript";

import { createParameter } from "../types/parameter.js";


export function getParametersBySignatureDeclaration(declaration: SignatureDeclaration) {
  return declaration.parameters.map(createParameter);
}
