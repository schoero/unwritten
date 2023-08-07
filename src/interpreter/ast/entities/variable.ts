import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { getTypeByDeclaration } from "unwritten:interpreter:ast/index.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { isVariableDeclaration } from "unwritten:interpreter:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type { Symbol } from "typescript";

import type { VariableEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createVariableEntity(ctx: InterpreterContext, symbol: Symbol): VariableEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isVariableDeclaration(ctx, declaration), "Variable declaration is not found");

  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const declarationId = getDeclarationId(ctx, declaration);
  const type = getTypeByDeclaration(ctx, declaration);
  const kind = EntityKind.Variable;

  return {
    ...jsdocTags,
    declarationId,
    description,
    kind,
    modifiers,
    name,
    position,
    symbolId,
    type
  };

}
