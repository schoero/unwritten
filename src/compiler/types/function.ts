import { FunctionLikeDeclaration, Signature, Symbol, Type } from "typescript";

import { assert } from "vitest";

import { isFunctionLikeDeclaration } from "../../typeguards/ts.js";
import { EntityKind, Function, FunctionSignature } from "../../types/types.js";
import { getIdByDeclaration, getIdByType } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameByType } from "../compositions/name.js";
import { getParametersBySignatureDeclaration } from "../compositions/parameters.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getReturnTypeByCallSignature } from "../compositions/return-type.js";
import { getContext } from "../context/index.js";


//-- Function

export function createFunctionBySymbol(symbol: Symbol): Function {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isFunctionLikeDeclaration(declaration), "Function declaration is not found");

  return createFunctionByDeclaration(declaration);

}


export function createFunctionByDeclaration(declaration: FunctionLikeDeclaration): Function {
  const type = getContext().checker.getTypeAtLocation(declaration);
  return createFunctionByType(type);
}


export function createFunctionByType(type: Type): Function {

  const callSignatures = type.getCallSignatures();
  const signatures = callSignatures.map(createFunctionSignature);

  const id = getIdByType(type);
  const name = getNameByType(type);
  const kind = EntityKind.Function;

  return {
    id,
    kind,
    name,
    signatures
  };

}


export function createFunctionSignature(signature: Signature): FunctionSignature {

  const declaration = signature.getDeclaration();

  assert(declaration, "Function signature declaration is missing.");

  const id = getIdByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const parameters = getParametersBySignatureDeclaration(declaration);
  const returnType = getReturnTypeByCallSignature(signature);
  const description = getDescriptionByDeclaration(declaration);

  return {
    id,
    position,
    description,
    example,
    parameters,
    returnType
  };

}
