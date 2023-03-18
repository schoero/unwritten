import { parseType } from "unwritten:interpreter/ast/index.js";
import { getIdBySymbol } from "unwritten:interpreter/ast/shared/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "unwritten:interpreter/ast/shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:interpreter/ast/shared/modifiers.js";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { isVariableDeclaration } from "unwritten:interpreter/typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type { Symbol, VariableDeclaration } from "typescript";

import type { VariableEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createVariableEntity(ctx: InterpreterContext, symbol: Symbol): VariableEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isVariableDeclaration(declaration), "Variable declaration is not found");

  const tsType = ctx.checker.getTypeOfSymbolAtLocation(symbol, declaration);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = parseVariableDeclaration(ctx, declaration);
  const type = parseType(ctx, tsType);
  const kind = EntityKind.Variable;

  return {
    ...fromDeclaration,
    description,
    id,
    kind,
    name,
    type
  };

}


function parseVariableDeclaration(ctx: InterpreterContext, declaration: VariableDeclaration) {

  const position = getPositionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);

  return {
    modifiers,
    position,
    ...jsdocTags
  };

}
