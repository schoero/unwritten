import { isObjectLiteralExpression, ObjectLiteralExpression, Symbol, Type } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { ObjectLiteral, TypeKind } from "../../types/types.js";
import { getIdBySymbol, getIdByType } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { createPropertyBySymbol } from "./property.js";


export function createObjectLiteralBySymbol(ctx: CompilerContext, symbol: Symbol): ObjectLiteral {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isObjectLiteralExpression(declaration), "Object literal declaration is not found");

  const id = getIdBySymbol(ctx, symbol);
  const fromDeclaration = createObjectLiteralByDeclaration(ctx, declaration);

  return {
    ...fromDeclaration,
    id
  };

}


export function createObjectLiteralByDeclaration(ctx: CompilerContext, declaration: ObjectLiteralExpression) {

  const type = ctx.checker.getTypeAtLocation(declaration);
  const fromType = createObjectLiteralByType(ctx, type);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);

  return {
    ...fromType,
    description,
    example,
    position
  };

}


export function createObjectLiteralByType(ctx: CompilerContext, type: Type) {

  const id = getIdByType(ctx, type);
  const properties = type.getProperties().map(symbol => createPropertyBySymbol(ctx, symbol));
  const kind = TypeKind.ObjectLiteral;

  return {
    id,
    kind,
    properties
  } as const;

}
