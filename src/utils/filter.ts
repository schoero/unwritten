import { FunctionLikeDeclaration } from "typescript";

import { getContext } from "../compiler/context/index.js";

export function functionOverloadDeclarationFilter(declaration: FunctionLikeDeclaration) {
  if(declaration.body === undefined){
    return true;
  }
  const symbol = getContext().checker.getSymbolAtLocation(declaration.name!);
  const declarations = symbol?.declarations?.filter(d => d.kind === declaration.kind);
  return declarations?.length === 1;
}

export function contentFilter(element: string | null | undefined): element is string {
  return element !== null && element !== undefined && element !== "";
}