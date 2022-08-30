import { Symbol, Type, VariableDeclaration } from "typescript";

import { assert } from "vitest";

import { isVariableDeclaration } from "../../typeguards/ts.js";
import { ChainedDeclaration, ChainedSymbol, ChainedType, EntityKind, Variable } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByType } from "../compositions/type.js";
import { getContext } from "../context/index.js";


export function createVariableBySymbol(symbol: Symbol): ChainedSymbol<Variable> {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isVariableDeclaration(declaration), "Variable declaration is not found");

  const name = getNameBySymbol(symbol);
  const description = getDescriptionBySymbol(symbol);
  const fromDeclaration = createVariableByDeclaration(declaration);

  return {
    ...fromDeclaration,
    description,
    name
  };

}


export function createVariableByDeclaration(declaration: VariableDeclaration): ChainedDeclaration<Variable> {

  const type = getContext().checker.getTypeAtLocation(declaration);

  const fromType = createVariableByType(type);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);

  return {
    ...fromType,
    example,
    position
  };

}


export function createVariableByType(type: Type): ChainedType<Variable> {

  const id = getIdByType(type);
  const tp = getTypeByType(type);
  const kind = EntityKind.Variable;

  return {
    id,
    kind,
    type: tp
  };

}

