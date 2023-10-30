import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { withLockedSymbol } from "unwritten:interpreter/utils/ts";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { getInitializerByDeclaration } from "unwritten:interpreter:ast/shared/initializer";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers";
import { getNameByDeclaration, getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";
import {
  isParameterDeclaration,
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isShorthandPropertyAssignment
} from "unwritten:interpreter:typeguards/declarations";
import { assert } from "unwritten:utils:general";

import { getTypeByDeclaration, getTypeBySymbol } from "../type";

import type {
  ParameterDeclaration,
  PropertyAssignment,
  PropertyDeclaration,
  PropertySignature,
  ShorthandPropertyAssignment,
  Symbol
} from "typescript";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createPropertyEntity = (ctx: InterpreterContext, symbol: Symbol): PropertyEntity => withLockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(
    !declaration ||
    (
      isPropertySignatureDeclaration(ctx, declaration) ||
      isPropertyDeclaration(ctx, declaration) ||
      isPropertyAssignment(ctx, declaration) ||
      isShorthandPropertyAssignment(ctx, declaration) ||
      isParameterDeclaration(ctx, declaration)
    ),
    `Property signature not found ${declaration?.kind}`
  );

  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  const fromDeclaration = declaration && interpretPropertyDeclaration(ctx, declaration);
  const type = getTypeBySymbol(ctx, symbol, declaration);

  // Partial<{ a: string }> modifiers or custom implementations of that will set the symbol.flags
  const optional = !!fromDeclaration?.optional || isSymbolOptional(ctx, symbol);
  const kind = EntityKind.Property;

  return {
    ...fromDeclaration,
    kind,
    name,
    optional,
    symbolId,
    type
  };

});


function interpretPropertyDeclaration(ctx: InterpreterContext, declaration: ParameterDeclaration | PropertyAssignment | PropertyDeclaration | PropertySignature | ShorthandPropertyAssignment) { // ParameterDeclaration can also be a property when defined in a constructor

  const declarationId = getDeclarationId(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const initializer = getInitializerByDeclaration(ctx, declaration);
  const type = getTypeByDeclaration(ctx, declaration);

  const optional = isPropertyAssignment(ctx, declaration) || isShorthandPropertyAssignment(ctx, declaration)
    ? undefined
    : !!declaration.questionToken;
  const kind = EntityKind.Property;

  assert(name, "Property name not found");

  return {
    ...jsdocProperties,
    declarationId,
    initializer,
    kind,
    modifiers,
    name,
    optional,
    position,
    type
  };

}

function isSymbolOptional(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Optional) !== 0;
}
