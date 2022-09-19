import { Symbol, Type } from "typescript";

import { isGetterDeclaration } from "../../typeguards/ts.js";
import { EntityKind, FromSymbol, FromType, Getter } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createGetterBySymbol(symbol: Symbol): FromSymbol<Getter> {

  const declarations = symbol.declarations?.filter(isGetterDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = EntityKind.Getter;

  return {
    id,
    kind,
    name: name,
    signatures
  };

}


export function createGetterByType(type: Type): FromType<Getter> {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdByType(type);
  const kind = EntityKind.Getter;

  return {
    id,
    kind,
    signatures
  };

}

