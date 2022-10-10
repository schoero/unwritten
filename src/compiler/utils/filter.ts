import { FunctionLikeDeclaration } from "typescript";

import { CompilerContext } from "../../types/context.js";


export function functionOverloadDeclarationFilter(ctx: CompilerContext, declaration: FunctionLikeDeclaration) {
  if(declaration.body === undefined){
    return true;
  }
  const symbol = ctx.checker.getSymbolAtLocation(declaration.name!);
  const declarations = symbol?.declarations?.filter(d => d.kind === declaration.kind);
  return declarations?.length === 1;
}

export function contentFilter(element: string | null | undefined): element is string {
  return element !== null && element !== undefined && element !== "";
}