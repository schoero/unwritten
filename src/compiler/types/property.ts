import { PropertyAssignment, PropertySignature, Symbol } from "typescript";

import { assert } from "vitest";

import { isPropertyAssignment, isPropertySignature } from "../../typeguards/ts.js";
import { EntityKind, FromDeclaration, FromSymbol, Property } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import {
  getDescriptionByDeclaration,
  getDescriptionBySymbol,
  getExampleByDeclaration,
  getExampleBySymbol
} from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByDeclaration, getTypeBySymbol } from "../compositions/type.js";


export function createPropertyBySymbol(memberSymbol: Symbol): FromSymbol<FromDeclaration<Property>> {

  const declaration = memberSymbol.valueDeclaration ?? memberSymbol.getDeclarations()?.[0];

  assert(declaration && (isPropertySignature(declaration) || isPropertyAssignment(declaration)), "Property signature not found");

  const id = getIdBySymbol(memberSymbol);
  const name = getNameBySymbol(memberSymbol);
  const type = getTypeBySymbol(memberSymbol);
  const example = getExampleBySymbol(memberSymbol);
  const position = getPositionByDeclaration(declaration);
  const description = getDescriptionBySymbol(memberSymbol);
  const kind = EntityKind.Property;

  return {
    id,
    name,
    example,
    position,
    description,
    kind,
    type
  };

}

export function createPropertyByDeclaration(declaration: PropertySignature | PropertyAssignment): FromDeclaration<Property> {

  const id = getIdByDeclaration(declaration);
  const type = getTypeByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const description = getDescriptionByDeclaration(declaration);
  const kind = EntityKind.Property;

  return {
    id,
    example,
    position,
    description,
    kind,
    type
  };

}