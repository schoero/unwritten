import { FunctionLikeDeclaration, MethodSignature, Symbol, Type } from "typescript";

import { getIdBySymbol, getIdByType } from "quickdoks:compiler:compositions/id.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { createSignatureBySignature } from "quickdoks:compiler:entities";
import {
  isFunctionLikeDeclaration,
  isMethodSignatureDeclaration
} from "quickdoks:compiler:typeguards/declarations.js";
import { functionOverloadDeclarationFilter } from "quickdoks:compiler:utils/filter.js";
import { CompilerContext } from "quickdoks:types:context.js";


export function createFunctionLikeBySymbol(ctx: CompilerContext, symbol: Symbol) {

  const tsDeclarations = (symbol.declarations!
    .filter(declaration => isFunctionLikeDeclaration(declaration) || isMethodSignatureDeclaration(declaration))
    .filter(declaration => functionOverloadDeclarationFilter(ctx, declaration as FunctionLikeDeclaration | MethodSignature, symbol))
  ) as (FunctionLikeDeclaration | MethodSignature)[];

  const tsSignatures = tsDeclarations.map(declaration => ctx.checker.getSignatureFromDeclaration(declaration)!);

  const signatures = tsSignatures.map(signature => createSignatureBySignature(ctx, signature));
  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return {
    id,
    name,
    signatures
  };

}


export function createFunctionLikeByType(ctx: CompilerContext, type: Type) {

  const callSignatures = type.getCallSignatures(); // Types with constructSignatures are considered object types
  const signatures = callSignatures.map(signature => createSignatureBySignature(ctx, signature));
  const id = getIdByType(ctx, type);

  return {
    id,
    signatures
  };

}
