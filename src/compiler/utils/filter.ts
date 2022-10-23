import { FunctionLikeDeclaration, Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";


export function functionOverloadDeclarationFilter(ctx: CompilerContext, declaration: FunctionLikeDeclaration, symbol: Symbol): boolean {
  if(declaration.body === undefined){
    return true;
  }
  const declarations = symbol.declarations?.filter(d => d.kind === declaration.kind);
  return declarations?.length === 1;
}

export function contentFilter(element: string | null | undefined): element is string {
  return element !== null && element !== undefined && element !== "";
}