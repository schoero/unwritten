import { PropertyAssignment, PropertyDeclaration, PropertySignature, Symbol } from "typescript";

import { assert } from "vitest";

import { isPropertyAssignment, isPropertyDeclaration, isPropertySignature } from "../../typeguards/ts.js";
import { EntityKind, FromDeclaration, FromSymbol, Property } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByDeclaration } from "../compositions/type.js";


export function createPropertyBySymbol(memberSymbol: Symbol): FromSymbol<FromDeclaration<Property>> {

  const declaration = memberSymbol.valueDeclaration ?? memberSymbol.getDeclarations()?.[0];

  assert(declaration && (isPropertySignature(declaration) || isPropertyAssignment(declaration) || isPropertyDeclaration(declaration)), "Property signature not found");

  const id = getIdBySymbol(memberSymbol);
  const name = getNameBySymbol(memberSymbol);
  const fromDeclaration = createPropertyByDeclaration(declaration);

  return {
    ...fromDeclaration,
    name: name,
    id

  };

}

export function createPropertyByDeclaration(declaration: PropertyAssignment | PropertyDeclaration | PropertySignature): FromDeclaration<Property> {

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