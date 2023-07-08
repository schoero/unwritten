import ts from "typescript";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { interpretType } from "unwritten:interpreter:ast/index.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getInitializerByDeclaration } from "unwritten:interpreter:ast/shared/initializer.js";
import { getDescriptionByDeclaration, getJSDocTagsByDeclaration } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers.js";
import { getNameByDeclaration, getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import {
  isParameterDeclaration,
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isShorthandPropertyAssignment
} from "unwritten:interpreter:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type {
  ParameterDeclaration,
  PropertyAssignment,
  PropertyDeclaration,
  PropertySignature,
  ShorthandPropertyAssignment,
  Symbol
} from "typescript";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createPropertyEntity(ctx: InterpreterContext, symbol: Symbol): PropertyEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(
    !declaration ||
    (
      isPropertySignatureDeclaration(declaration) ||
      isPropertyDeclaration(declaration) ||
      isPropertyAssignment(declaration) ||
      isShorthandPropertyAssignment(declaration) ||
      isParameterDeclaration(declaration)
    ),
    `Property signature not found ${declaration?.kind}`
  );

  const tsType = ctx.checker.getTypeOfSymbol(symbol);

  assert(tsType, "Property type not found");

  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const fromDeclaration = declaration ? parsePropertyDeclaration(ctx, declaration) : <Record<string, any>>{};

  // Partial<{ a: string }> modifiers or custom implementations of that will set the symbol.flags
  const optional = fromDeclaration.optional || isSymbolOptional(symbol);

  const type = interpretType(ctx, tsType);
  const kind = EntityKind.Property;

  return {
    ...fromDeclaration,
    kind,
    name,
    optional,
    symbolId,
    type
  };

}


function parsePropertyDeclaration(ctx: InterpreterContext, declaration: ParameterDeclaration | PropertyAssignment | PropertyDeclaration | PropertySignature | ShorthandPropertyAssignment) { // ParameterDeclaration can also be a property when defined in a constructor

  const declarationId = getDeclarationId(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const initializer = getInitializerByDeclaration(ctx, declaration);
  const optional = isPropertyAssignment(declaration) || isShorthandPropertyAssignment(declaration)
    ? undefined
    : !!declaration.questionToken;
  const kind = EntityKind.Property;

  assert(name, "Property name not found");

  return {
    ...jsdocTags,
    declarationId,
    description,
    initializer,
    kind,
    modifiers,
    name,
    optional,
    position
  };

}

function isSymbolOptional(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Optional) !== 0;
}
