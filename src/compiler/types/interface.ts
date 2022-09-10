import { InterfaceDeclaration, Symbol, Type } from "typescript";

import { assert } from "vitest";

import { isInterfaceDeclaration } from "../../typeguards/ts.js";
import {
  ChainedDeclaration,
  ChainedSymbol,
  ChainedType,
  EntityKind,
  Interface,
  MergedInterface
} from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getContext } from "../context/index.js";
import { createMemberBySymbol } from "./member.js";


export function createInterfaceBySymbol(symbol: Symbol): ChainedSymbol<Interface> | MergedInterface {

  const declarations = symbol.getDeclarations()?.filter(isInterfaceDeclaration);

  assert(declarations && declarations.length > 0, "Interface declarations not found");

  const name = getNameBySymbol(symbol);
  const description = getDescriptionBySymbol(symbol);
  const fromDeclarations = declarations.map(createInterfaceByDeclaration);

  const mergedDeclarations = fromDeclarations.reduce((acc, declaration) => ({
    ...acc,
    ...declaration
  }), <ChainedDeclaration<Interface>>{});

  return {
    ...mergedDeclarations,
    description,
    name
  };

}


export function createInterfaceByDeclaration(declaration: InterfaceDeclaration): ChainedDeclaration<Interface> {

  const type = getContext().checker.getTypeAtLocation(declaration);

  const fromType = createInterfaceByType(type);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);

  return {
    ...fromType,
    example,
    position
  };

}


export function createInterfaceByType(type: Type): ChainedType<Interface> {

  const id = getIdByType(type);
  const members = type.getProperties().map(createMemberBySymbol);
  const kind = EntityKind.Interface;

  return {
    id,
    kind,
    members
  };

}