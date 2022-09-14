import { isObjectLiteralElement, ObjectLiteralElement, Symbol, Type } from "typescript";

import { assert } from "vitest";

import { ChainedDeclaration, ChainedSymbol, ChainedType, EntityKind, ObjectLiteral } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getContext } from "../context/index.js";
import { createPropertyBySymbol } from "./property.js";


export function createObjectLiteralBySymbol(symbol: Symbol): ChainedSymbol<ObjectLiteral> {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isObjectLiteralElement(declaration), "Object literal declaration is not found");

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const fromDeclaration = createObjectLiteralByDeclaration(declaration);

  return {
    ...fromDeclaration,
    id,
    name
  };

}


export function createObjectLiteralByDeclaration(declaration: ObjectLiteralElement): ChainedDeclaration<ObjectLiteral> {

  const type = getContext().checker.getTypeAtLocation(declaration);

  const fromType = createObjectLiteralByType(type);
  const description = getDescriptionByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);

  return {
    ...fromType,
    description,
    example,
    position
  };

}


export function createObjectLiteralByType(type: Type): ChainedType<ObjectLiteral> {

  const id = getIdByType(type);
  const properties = type.getProperties().map(createPropertyBySymbol);
  const kind = EntityKind.ObjectLiteral;

  return {
    id,
    kind,
    properties
  };

}

