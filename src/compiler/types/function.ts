import { FunctionLikeDeclaration, Signature, Symbol, Type } from "typescript";

import { assert } from "vitest";

import { isFunctionLikeDeclaration } from "../../typeguards/ts.js";
import {
  ChainedDeclaration,
  ChainedSymbol,
  ChainedType,
  EntityKind,
  Function,
  FunctionSignature
} from "../../types/types.js";
import { getIdByDeclaration, getIdByType } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getParametersBySignatureDeclaration } from "../compositions/parameters.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getReturnTypeByCallSignature } from "../compositions/return-type.js";
import { getContext } from "../context/index.js";


export function createFunctionBySymbol(symbol: Symbol): ChainedSymbol<Function> {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isFunctionLikeDeclaration(declaration), "Function declaration is not found");

  const fromDeclaration = createFunctionByDeclaration(declaration);
  const name = getNameBySymbol(symbol);

  return {
    ...fromDeclaration,
    name
  };

}


export function createFunctionByDeclaration(declaration: FunctionLikeDeclaration): ChainedDeclaration<Function> {

  const type = getContext().checker.getTypeAtLocation(declaration);
  const position = getPositionByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const description = getDescriptionByDeclaration(declaration);
  const fromType = createFunctionByType(type);

  return {
    position,
    example,
    description,
    ...fromType
  };

}


export function createFunctionByType(type: Type): ChainedType<Function> {

  const callSignatures = type.getCallSignatures();
  const signatures = callSignatures.map(createFunctionSignature);

  const id = getIdByType(type);
  const kind = EntityKind.Function;

  return {
    id,
    kind,
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

  const kind = EntityKind.Signature;

  return {
    id,
    kind,
    example,
    description,
    position,
    parameters,
    returnType
  };

}
