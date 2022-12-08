import { FunctionLikeDeclaration, Symbol, Type } from "typescript";

import { getIdBySymbol, getIdByType } from "quickdoks:compiler:compositions/id.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { createSignatureByDeclaration } from "quickdoks:compiler:entities/signature.js";
import { isFunctionLikeDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { functionOverloadDeclarationFilter } from "quickdoks:compiler:utils/filter.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { assert } from "quickdoks:utils:general.js";


export function createFunctionLikeBySymbol(ctx: CompilerContext, symbol: Symbol) {

  const declarations = symbol.declarations?.filter(isFunctionLikeDeclaration)
    .filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol)) ?? [];

  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return {
    id,
    name,
    signatures
  };

}

export function createFunctionLikeByDeclaration(ctx: CompilerContext, declaration: FunctionLikeDeclaration) {
  const symbol = ctx.checker.getSymbolAtLocation(declaration.name!);
  assert(symbol, "FunctionLikeDeclaration symbol not found");
  return createFunctionLikeBySymbol(ctx, symbol);
}

export function createFunctionLikeByType(ctx: CompilerContext, type: Type) {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));
  const id = getIdByType(ctx, type);

  return {
    id,
    signatures
  };

}
