import { Symbol, Type } from "typescript";

import { isConstructorDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Constructor, TypeKind } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { functionOverloadDeclarationFilter } from "../utils/filter.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createConstructorBySymbol(ctx: CompilerContext, symbol: Symbol): Constructor {

  const declarations = symbol.declarations?.filter(isConstructorDeclaration)
    .filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol)) ?? [];

  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Constructor;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createConstructorByType(ctx: CompilerContext, type: Type): Constructor {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdByType(ctx, type);
  const kind = TypeKind.Constructor;

  return {
    id,
    kind,
    signatures
  };

}