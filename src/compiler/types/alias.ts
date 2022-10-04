import { Symbol, TypeAliasDeclaration, TypeNode } from "typescript";
import { assert } from "vitest";

import { isTypeAliasDeclaration } from "../../typeguards/ts.js";
import { TypeKind, TypeAlias } from "../../types/types.js";
import { getIdBySymbol, getIdByTypeNode } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByTypeNode } from "../compositions/type.js";


export function createTypeAliasBySymbol(symbol: Symbol): TypeAlias {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(symbol);
  const id = getIdBySymbol(symbol);
  const description = getDescriptionBySymbol(symbol);
  const fromDeclaration = createTypeAliasByDeclaration(declaration);

  return {
    ...fromDeclaration,
    description,
    id,
    name
  };

}


export function createTypeAliasByDeclaration(declaration: TypeAliasDeclaration): TypeAlias {

  const typeNode = declaration.type;

  const fromTypeNode = createTypeAliasByTypeNode(typeNode);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);

  return {
    ...fromTypeNode,
    example,
    position
  };

}


export function createTypeAliasByTypeNode(typeNode: TypeNode): TypeAlias {

  const id = getIdByTypeNode(typeNode);
  const type = getTypeByTypeNode(typeNode);
  const kind = TypeKind.TypeAlias;

  return {
    id,
    kind,
    type
  };

}

