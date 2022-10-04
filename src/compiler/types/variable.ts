import { Symbol, Type, VariableDeclaration } from "typescript";
import { assert } from "vitest";

import { isVariableDeclaration } from "../../typeguards/ts.js";
import { TypeKind, Variable } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByType } from "../compositions/type.js";
import { getContext } from "../context/index.js";


export function createVariableBySymbol(symbol: Symbol): Variable {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isVariableDeclaration(declaration), "Variable declaration is not found");

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const description = getDescriptionBySymbol(symbol);
  const fromDeclaration = _createVariableByDeclaration(declaration);
  const kind = TypeKind.Variable;

  return {
    ...fromDeclaration,
    description,
    id,
    kind,
    name
  };

}


function _createVariableByDeclaration(declaration: VariableDeclaration) {

  const tsType = getContext().checker.getTypeAtLocation(declaration);

  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const type = getTypeByType(tsType);

  return {
    example,
    position,
    type
  };

}


export function createVariableByType(type: Type): Variable {

  const id = getIdByType(type);
  const tp = getTypeByType(type);
  const kind = TypeKind.Variable;

  return {
    id,
    kind,
    type: tp
  };

}

