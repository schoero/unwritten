import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";
import { isVariableDeclaration } from "unwritten:interpreter:typeguards/declarations";
import { assert } from "unwritten:utils:general";

import { getTypeByDeclaration } from "../type";

import type { Symbol } from "typescript";

import type { VariableEntity } from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createVariableEntity(ctx: InterpreterContext, symbol: Symbol): VariableEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isVariableDeclaration(ctx, declaration), "Variable declaration is not found");

  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const declarationId = getDeclarationId(ctx, declaration);
  const type = getTypeByDeclaration(ctx, declaration);
  const kind = EntityKind.Variable;

  return {
    ...jsdocProperties,
    declarationId,
    kind,
    modifiers,
    name,
    position,
    symbolId,
    type
  };

}
