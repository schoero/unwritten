import { FunctionLikeDeclaration, SignatureDeclaration, Symbol, Type } from "typescript";
import { assert } from "vitest";

import {
  isConstructorDeclaration,
  isFunctionLikeDeclaration,
  isGetterDeclaration,
  isMethodDeclaration,
  isSetterDeclaration
} from "../../typeguards/ts.js";
import { TypeKind, FunctionLikeTypeMap } from "../../types/types.js";
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

  return <FunctionLikeTypeMap[typeof kind]>{
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

  return <FunctionLikeTypeMap[typeof kind]>{
    id,
    kind,
    signatures
  };

}


function getFunctionLikeKindByDeclaration(declaration: FunctionLikeDeclaration | SignatureDeclaration) {

  if(isConstructorDeclaration(declaration)){
    return TypeKind.Constructor;
  } else if(isMethodDeclaration(declaration)){
    return TypeKind.Method;
  } else if(isSetterDeclaration(declaration)){
    return TypeKind.Setter;
  } else if(isGetterDeclaration(declaration)){
    return TypeKind.Getter;
  } else {
    return TypeKind.Function;
  }

}