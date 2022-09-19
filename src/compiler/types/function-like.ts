import { FunctionLikeDeclaration, SignatureDeclaration, Symbol, Type } from "typescript";
import { assert } from "vitest";

import {
  isConstructorDeclaration,
  isFunctionLikeDeclaration,
  isGetterDeclaration,
  isMethodDeclaration,
  isSetterDeclaration
} from "../../typeguards/ts.js";
import { EntityKind, FunctionLikeEntityMap } from "../../types/types.js";
import { functionOverloadDeclarationFilter } from "../../utils/filter.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createSignatureByDeclaration } from "./signature.js";


export function createFunctionBySymbol(symbol: Symbol) {

  const declarations = symbol.declarations?.filter(isFunctionLikeDeclaration).filter(functionOverloadDeclarationFilter) ?? [];

  assert(declarations.length > 0, "Expected at least one declaration");

  const signatures = declarations.map(createSignatureByDeclaration);

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = getFunctionLikeKindByDeclaration(declarations[0]!);

  return <FunctionLikeEntityMap[typeof kind]>{
    id,
    kind,
    name,
    signatures
  };

}


export function createFunctionByType(type: Type) {

  const callSignatures = type.getCallSignatures();
  const declarations = callSignatures.map(s => s.getDeclaration());
  const signatures = declarations.map(createSignatureByDeclaration);

  assert(declarations.length > 0, "Expected at least one declaration");

  const id = getIdByType(type);
  const kind = getFunctionLikeKindByDeclaration(declarations[0]!);

  return <FunctionLikeEntityMap[typeof kind]>{
    id,
    kind,
    signatures
  };

}


function getFunctionLikeKindByDeclaration(declaration: FunctionLikeDeclaration | SignatureDeclaration) {

  if(isConstructorDeclaration(declaration)){
    return EntityKind.Constructor;
  } else if(isMethodDeclaration(declaration)){
    return EntityKind.Method;
  } else if(isSetterDeclaration(declaration)){
    return EntityKind.Setter;
  } else if(isGetterDeclaration(declaration)){
    return EntityKind.Getter;
  } else {
    return EntityKind.Function;
  }

}