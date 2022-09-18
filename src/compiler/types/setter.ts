import { Symbol, Type } from "typescript";


import { isSetterDeclaration } from "../../typeguards/ts.js";
import { EntityKind, FromSymbol, FromType, Setter } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createSetterBySymbol(symbol: Symbol): FromSymbol<Setter> {

  const declarations = symbol.declarations?.filter(isSetterDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = EntityKind.Setter;

  return {
    id,
    kind,
    name: name,
    signatures
  };

}


export function createSetterByType(type: Type): FromType<Setter> {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdByType(type);
  const kind = EntityKind.Setter;

  return {
    id,
    kind,
    signatures
  };

}

