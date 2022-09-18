import { Symbol, Type } from "typescript";

import { isConstructorDeclaration } from "../../typeguards/ts.js";
import { Constructor, EntityKind, FromSymbol, FromType } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createConstructorBySymbol(symbol: Symbol): FromSymbol<Constructor> {

  const declarations = symbol.declarations?.filter(isConstructorDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = EntityKind.Constructor;

  return {
    id,
    kind,
    name: name,
    signatures
  };

}


export function createConstructorByType(type: Type): FromType<Constructor> {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdByType(type);
  const kind = EntityKind.Constructor;

  return {
    id,
    kind,
    signatures
  };

}

