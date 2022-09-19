import { Symbol, Type } from "typescript";

import { isFunctionLikeDeclaration } from "../../typeguards/ts.js";
import { EntityKind, FromSymbol, FromType, Function } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createFunctionBySymbol(symbol: Symbol): FromSymbol<Function> {

  const declarations = symbol.declarations?.filter(isFunctionLikeDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = EntityKind.Function;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createFunctionByType(type: Type): FromType<Function> {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdByType(type);
  const kind = EntityKind.Function;

  return {
    id,
    kind,
    signatures
  };

}

