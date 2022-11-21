import { Symbol, Type } from "typescript";

import { isSetterDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Setter, TypeKind } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { functionOverloadDeclarationFilter } from "../utils/filter.js";
import { lockSymbol } from "../utils/ts.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createSetterBySymbol(ctx: CompilerContext, symbol: Symbol): Setter {

  lockSymbol(ctx, symbol);

  const declarations = symbol.declarations?.filter(isSetterDeclaration)
    .filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol)) ?? [];

  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Setter;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createSetterByType(ctx: CompilerContext, type: Type): Setter {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdByType(ctx, type);
  const kind = TypeKind.Setter;

  return {
    id,
    kind,
    signatures
  };

}
