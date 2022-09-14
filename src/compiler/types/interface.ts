import { InterfaceDeclaration, Symbol, Type } from "typescript";

import { assert } from "vitest";

import { isInterfaceDeclaration } from "../../typeguards/ts.js";
import { Interface, MergedInterface } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { createMemberByDeclaration } from "./member.js";


export function createInterfaceBySymbol(symbol: Symbol): Interface | MergedInterface {

  const declarations = symbol.getDeclarations()?.filter(isInterfaceDeclaration);

  assert(declarations && declarations.length > 0, "Interface declarations not found");

  const name = getNameBySymbol(symbol);
  const id = getIdBySymbol(symbol);
  const description = getDescriptionBySymbol(symbol);
  const fromDeclarations = declarations.map(_createInterfaceByDeclaration);

  // TODO: support merging positions, descriptions and examples

  const mergedDeclarations = fromDeclarations.reduce((acc, declaration) => ({
    ...acc,
    ...declaration
  }), <Interface>{});

  return {
    ...mergedDeclarations,
    description,
    id,
    name
  };

}


export function createInterfaceByType(type: Type): Interface {
  return createInterfaceBySymbol(type.symbol);
}


function _createInterfaceByDeclaration(declaration: InterfaceDeclaration) {

  const members = declaration.members.map(createMemberByDeclaration);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);

  return {
    members,
    example,
    position
  };

}
