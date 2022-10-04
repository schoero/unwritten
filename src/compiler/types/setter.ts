import { Symbol, Type } from "typescript";

import { isSetterDeclaration } from "../../typeguards/ts.js";
import { TypeKind, Setter } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createSetterBySymbol(symbol: Symbol): Setter {

  const declarations = symbol.declarations?.filter(isSetterDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = TypeKind.Setter;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createSetterByType(type: Type): Setter {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdByType(type);
  const kind = TypeKind.Setter;

  return {
    id,
    kind,
    signatures
  };

}

