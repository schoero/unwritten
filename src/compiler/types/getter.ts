import { Symbol, Type } from "typescript";

import { isGetterDeclaration } from "../../typeguards/ts.js";
import { TypeKind, Getter } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createGetterBySymbol(symbol: Symbol): Getter {

  const declarations = symbol.declarations?.filter(isGetterDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = TypeKind.Getter;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createGetterByType(type: Type): Getter {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdByType(type);
  const kind = TypeKind.Getter;

  return {
    id,
    kind,
    signatures
  };

}

