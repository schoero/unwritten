import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isMethodSignatureDeclaration
} from "unwritten:interpreter:typeguards/declarations.js";

import type {
  CallSignatureDeclaration,
  ConstructSignatureDeclaration,
  FunctionLikeDeclaration,
  MethodSignature,
  Symbol
} from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function functionOverloadDeclarationFilter(ctx: InterpreterContext, declaration: CallSignatureDeclaration | ConstructSignatureDeclaration | FunctionLikeDeclaration | MethodSignature, symbol: Symbol): boolean {

  if(isMethodSignatureDeclaration(declaration) || isCallSignatureDeclaration(declaration) || isConstructSignatureDeclaration(declaration)){
    return true;
  }

  if(declaration.body === undefined){
    return true;
  }

  const declarations = symbol.declarations?.filter(d => d.kind === declaration.kind);

  return declarations?.length === 1;

}