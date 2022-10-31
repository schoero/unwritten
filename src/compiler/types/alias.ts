import { Symbol, TypeAliasDeclaration, TypeNode } from "typescript";
import { assert } from "vitest";

import { isTypeAliasDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { TypeAlias, TypeKind } from "../../types/types.js";
import { getIdBySymbol, getIdByTypeNode } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol, getNameByTypeNode } from "../compositions/name.js";
import { getPositionByDeclaration, getPositionByTypeNode } from "../compositions/position.js";
import { createTypeByTypeNode } from "./type.js";


export function createTypeAliasBySymbol(ctx: CompilerContext, symbol: Symbol): TypeAlias {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = createTypeAliasByDeclaration(ctx, declaration);

  return {
    ...fromDeclaration,
    description,
    id,
    name
  };

}


export function createTypeAliasByDeclaration(ctx: CompilerContext, declaration: TypeAliasDeclaration) {

  const typeNode = declaration.type;

  // TODO: check if typeNode is the correct way to go here
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const fromTypeNode = createTypeAliasByTypeNode(ctx, typeNode);

  return {
    ...fromTypeNode,
    example,
    position
  };

}


export function createTypeAliasByTypeNode(ctx: CompilerContext, typeNode: TypeNode) {

  const id = getIdByTypeNode(ctx, typeNode);
  const name = getNameByTypeNode(ctx, typeNode);
  const position = getPositionByTypeNode(ctx, typeNode);
  const type = createTypeByTypeNode(ctx, typeNode);
  const kind = TypeKind.TypeAlias;

  return {
    id,
    kind,
    name,
    position,
    type
  } as const;

}

