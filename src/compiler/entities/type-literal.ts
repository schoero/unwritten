import { Symbol, Type, TypeLiteralNode } from "typescript";
import { assert } from "vitest";

import { isTypeLiteralDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { TypeKind, TypeLiteral } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { lockedSymbol } from "../utils/ts.js";
import { createMemberByDeclaration, createMemberBySymbol } from "./member.js";


export const createTypeLiteralBySymbol = (ctx: CompilerContext, symbol: Symbol): TypeLiteral => lockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeLiteralDeclaration(declaration), "TypeLiteral declaration is not found");

  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = _parseTypeLiteralDeclaration(ctx, declaration);
  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.TypeLiteral;

  return {
    id,
    kind,
    name,
    ...fromDeclaration,
    description
  };

});


function _parseTypeLiteralDeclaration(ctx: CompilerContext, declaration: TypeLiteralNode) {

  const members = declaration.members.map(member => createMemberByDeclaration(ctx, member));
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);

  return {
    example,
    members,
    position
  };

}


export function createTypeLiteralByType(ctx: CompilerContext, type: Type): TypeLiteral {

  const id = getIdByType(ctx, type);
  const members = type.getProperties().map(symbol => createMemberBySymbol(ctx, symbol));
  const kind = TypeKind.TypeLiteral;

  return {
    id,
    kind,
    members
  };

}
