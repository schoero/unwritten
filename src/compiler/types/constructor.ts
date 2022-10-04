import { Symbol, Type } from "typescript";

import { isConstructorDeclaration } from "../../typeguards/ts.js";
import { Constructor, TypeKind } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createConstructorBySymbol(symbol: Symbol): Constructor {

  const declarations = symbol.declarations?.filter(isConstructorDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = TypeKind.Constructor;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createConstructorByType(type: Type): Constructor {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdByType(type);
  const kind = TypeKind.Constructor;

  return {
    id,
    kind,
    signatures
  };

}

