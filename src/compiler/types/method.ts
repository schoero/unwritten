import { Symbol, Type } from "typescript";

import { isMethodDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Method, TypeKind } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { functionOverloadDeclarationFilter } from "../utils/filter.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createMethodBySymbol(ctx: CompilerContext, symbol: Symbol): Method {

  const declarations = symbol.declarations?.filter(isMethodDeclaration)
    .filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol)) ?? [];

  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Method;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createMethodByType(ctx: CompilerContext, type: Type): Method {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(declaration => createSignatureByDeclaration(ctx, declaration));

  const id = getIdByType(ctx, type);
  const kind = TypeKind.Method;

  return {
    id,
    kind,
    signatures
  };

}

