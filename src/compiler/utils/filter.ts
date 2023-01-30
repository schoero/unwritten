import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isMethodSignatureDeclaration
} from "unwritten:compiler:typeguards/declarations.js";

import type {
  CallSignatureDeclaration,
  ConstructSignatureDeclaration,
  FunctionLikeDeclaration,
  MethodSignature,
  Symbol
} from "typescript";

import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function functionOverloadDeclarationFilter(ctx: CompilerContext, declaration: CallSignatureDeclaration | ConstructSignatureDeclaration | FunctionLikeDeclaration | MethodSignature, symbol: Symbol): boolean {

  if(isMethodSignatureDeclaration(declaration) || isCallSignatureDeclaration(declaration) || isConstructSignatureDeclaration(declaration)){
    return true;
  }

  if(declaration.body === undefined){
    return true;
  }
  const declarations = symbol.declarations?.filter(d => d.kind === declaration.kind);
  return declarations?.length === 1;
}

export function contentFilter(element: string | null | undefined): element is string {
  return element !== null && element !== undefined && element !== "";
}
