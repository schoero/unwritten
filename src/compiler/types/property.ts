import { PropertyAssignment, PropertyDeclaration, PropertySignature, Symbol } from "typescript";
import { assert } from "vitest";

import { isPropertyAssignment, isPropertyDeclaration, isPropertySignature } from "../../typeguards/ts.js";
import { EntityKind, Property } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getModifiersByDeclaration } from "../compositions/modifiers.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByDeclaration } from "../compositions/type.js";


export function createPropertyBySymbol(memberSymbol: Symbol): Property {

  const declaration = memberSymbol.valueDeclaration ?? memberSymbol.getDeclarations()?.[0];

  assert(declaration && (isPropertySignature(declaration) || isPropertyAssignment(declaration) || isPropertyDeclaration(declaration)), "Property signature not found");

  const id = getIdBySymbol(memberSymbol);
  const name = getNameBySymbol(memberSymbol);
  const fromDeclaration = createPropertyByDeclaration(declaration);

  return {
    ...fromDeclaration,
    id,
    name

  };

}

export function createPropertyByDeclaration(declaration: PropertyAssignment | PropertyDeclaration | PropertySignature): Property {

  const id = getIdByDeclaration(declaration);
  const type = getTypeByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const description = getDescriptionByDeclaration(declaration);
  const modifiers = getModifiersByDeclaration(declaration);
  const optional = declaration.questionToken !== undefined;
  const kind = EntityKind.Property;

  return {
    description,
    example,
    id,
    kind,
    modifiers,
    optional,
    position,
    type
  };

}