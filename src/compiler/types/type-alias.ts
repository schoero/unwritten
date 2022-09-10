import { Symbol, Type, TypeAliasDeclaration } from "typescript";

import { assert } from "vitest";

import { isTypeAliasDeclaration } from "../../typeguards/ts.js";
import { ChainedDeclaration, ChainedSymbol, ChainedType, EntityKind, TypeAlias } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByType } from "../compositions/type.js";
import { getContext } from "../context/index.js";


export function createTypeAliasBySymbol(symbol: Symbol): ChainedSymbol<TypeAlias> {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(symbol);
  const description = getDescriptionBySymbol(symbol);
  const fromDeclaration = createTypeAliasByDeclaration(declaration);

  return {
    ...fromDeclaration,
    description,
    name
  };

}


export function createTypeAliasByDeclaration(declaration: TypeAliasDeclaration): ChainedDeclaration<TypeAlias> {

  const type = getContext().checker.getTypeAtLocation(declaration);

  const fromType = createTypeAliasByType(type);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);

  return {
    ...fromType,
    example,
    position
  };

}


export function createTypeAliasByType(type: Type): ChainedType<TypeAlias> {

  const id = getIdByType(type);
  const tp = getTypeByType(type);
  const kind = EntityKind.TypeAlias;

  return {
    id,
    kind,
    type: tp
  };

}

