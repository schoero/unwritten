import { Symbol, Type } from "typescript";

import { isGetterDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Getter, TypeKind } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { functionOverloadDeclarationFilter } from "../utils/filter.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createGetterBySymbol(ctx: CompilerContext, symbol: Symbol): Getter {

  const declarations = symbol.declarations?.filter(isGetterDeclaration)
    .filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol)) ?? [];

  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Getter;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createGetterByType(ctx: CompilerContext, type: Type): Getter {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdByType(ctx, type);
  const kind = TypeKind.Getter;

  return {
    id,
    kind,
    signatures
  };

}

