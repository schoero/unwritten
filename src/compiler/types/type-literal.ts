import { Symbol, Type, TypeLiteralNode } from "typescript";

import { assert } from "vitest";

import { isTypeLiteralDeclaration } from "../../typeguards/ts.js";
import { ChainedDeclaration, ChainedSymbol, ChainedType, EntityKind, TypeLiteral } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getContext } from "../context/index.js";
import { createMemberBySymbol } from "./member.js";


export function createTypeLiteralBySymbol(symbol: Symbol): ChainedSymbol<TypeLiteral> {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeLiteralDeclaration(declaration), "TypeLiteral declaration is not found");

  const name = getNameBySymbol(symbol);
  const description = getDescriptionBySymbol(symbol);
  const fromDeclaration = createTypeLiteralByDeclaration(declaration);

  return {
    ...fromDeclaration,
    description,
    name
  };

}


export function createTypeLiteralByDeclaration(declaration: TypeLiteralNode): ChainedDeclaration<TypeLiteral> {

  const type = getContext().checker.getTypeAtLocation(declaration);

  const fromType = createTypeLiteralByType(type);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);

  return {
    ...fromType,
    example,
    position
  };

}


export function createTypeLiteralByType(type: Type): ChainedType<TypeLiteral> {

  const id = getIdByType(type);
  const members = type.getProperties().map(createMemberBySymbol);
  const kind = EntityKind.TypeLiteral;

  return {
    id,
    kind,
    members
  };

}