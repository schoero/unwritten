import { Symbol, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "../entities/signature.js";
import { isFunctionLikeDeclaration } from "../typeguards/declarations.js";
import { functionOverloadDeclarationFilter } from "../utils/filter.js";


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
