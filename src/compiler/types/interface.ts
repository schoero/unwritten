import { InterfaceDeclaration, Symbol, Type } from "typescript";
import { assert } from "vitest";

import { isInterfaceDeclaration } from "../../typeguards/ts.js";
import { EntityKind, Interface, MergedInterface } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
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
  const kind = EntityKind.Interface;

  if(fromDeclarations.length === 1){
    return <Interface>{
      ...fromDeclarations[0],
      id,
      kind,
      name: name,
      description
    };
  } else {
    const members = _mergeMembers(fromDeclarations);
    return <MergedInterface>{
      declarations: fromDeclarations,
      members,
      id,
      kind,
      name: name,
      description
    };
  }

}


export function createInterfaceByType(type: Type): Interface {
  return createInterfaceBySymbol(type.symbol);
}


function _mergeMembers(declarations: ReturnType<typeof _createInterfaceByDeclaration>[]): Interface["members"] {
  return declarations.reduce((acc, declaration) => [
    ...acc,
    ...declaration.members
  ], <Interface["members"]>[]);
}


function _createInterfaceByDeclaration(declaration: InterfaceDeclaration): Interface {

  const members = declaration.members.map(createMemberByDeclaration);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const id = getIdByDeclaration(declaration);
  const kind = EntityKind.Interface;

  return {
    id,
    kind,
    members,
    example,
    position
  };

}
