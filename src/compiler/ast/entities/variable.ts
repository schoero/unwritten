import { getIdBySymbol } from "unwritten:compiler/ast/shared/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "unwritten:compiler/ast/shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:compiler/ast/shared/modifiers.js";
import { getNameBySymbol } from "unwritten:compiler/ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:compiler/ast/shared/position.js";
import { parseType } from "unwritten:compiler:ast/index.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { isVariableDeclaration } from "unwritten:compiler:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type { Symbol, VariableDeclaration } from "typescript";

import type { VariableEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createVariableEntity(ctx: CompilerContext, symbol: Symbol): VariableEntity {

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


function parseVariableDeclaration(ctx: CompilerContext, declaration: VariableDeclaration) {

  const position = getPositionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);

  return {
    modifiers,
    position,
    ...jsdocTags
  };

}
