import { Symbol, Type } from "typescript";

import { isMethodDeclaration } from "../../typeguards/ts.js";
import { EntityKind, Method } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createMethodBySymbol(symbol: Symbol): Method {

  const declarations = symbol.declarations?.filter(isMethodDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = EntityKind.Method;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createMethodByType(type: Type): Method {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdByType(type);
  const kind = EntityKind.Method;

  return {
    id,
    kind,
    signatures
  };

}

