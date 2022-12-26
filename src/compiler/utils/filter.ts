import { FunctionLikeDeclaration, MethodSignature, Symbol } from "typescript";

import { isMethodSignatureDeclaration } from "quickdoks:compiler/typeguards/declarations.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function functionOverloadDeclarationFilter(ctx: CompilerContext, declaration: FunctionLikeDeclaration | MethodSignature, symbol: Symbol): boolean {

  if(isMethodSignatureDeclaration(declaration)){
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
