import { Symbol, Type } from "typescript";

import { isFunctionLikeDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Function, TypeKind } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { functionOverloadDeclarationFilter } from "../utils/filter.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createFunction(ctx: CompilerContext, symbol: Symbol): Function {

  const declarations = symbol.declarations?.filter(isFunctionLikeDeclaration)
    .filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol)) ?? [];

  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Function;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createFunctionType(ctx: CompilerContext, type: Type): Function {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdByType(ctx, type);
  const kind = TypeKind.Function;

  return {
    id,
    kind,
    signatures
  };

}
