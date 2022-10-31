import { Symbol, Type, TypeLiteralNode } from "typescript";
import { assert } from "vitest";

import { isTypeLiteralDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { TypeKind, TypeLiteral } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { createMemberBySymbol } from "./member.js";


export function createTypeLiteralBySymbol(ctx: CompilerContext, symbol: Symbol): TypeLiteral {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeLiteralDeclaration(declaration), "TypeLiteral declaration is not found");

  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = createTypeLiteralByDeclaration(ctx, declaration);

  return {
    ...fromDeclaration,
    description
  };

}


export function createTypeLiteralByDeclaration(ctx: CompilerContext, declaration: TypeLiteralNode) {

  const type = ctx.checker.getTypeAtLocation(declaration);
  const fromType = createTypeLiteralByType(ctx, type);
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);

  return {
    ...fromType,
    example,
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
  } as const;

}