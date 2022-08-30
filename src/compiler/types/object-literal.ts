import { Symbol, Type } from "typescript";

import { assert } from "vitest";

import { EntityKind, ObjectLiteral, Property } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getTypeBySymbol } from "../compositions/type.js";


export function createObjectLiteralType(type: Type): ObjectLiteral {

  const properties = type.getProperties().map(createProperty);
  const id = getIdByType(type);
  const kind = EntityKind.Object;

  return {
    kind,
    id,
    properties
  };

}


export function createProperty(propertySymbol: Symbol): Property {

  const id = getIdBySymbol(propertySymbol);
  const name = getNameBySymbol(propertySymbol);
  const type = getTypeBySymbol(propertySymbol);
  const kind = EntityKind.Property;

  assert(name, "Property has no name");

  return {
    kind,
    id,
    name,
    type
  };

}