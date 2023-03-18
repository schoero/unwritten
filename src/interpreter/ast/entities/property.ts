import { getIdByDeclaration, getIdBySymbol } from "unwritten:interpreter/ast/shared/id.js";
import { getInitializerByDeclaration } from "unwritten:interpreter/ast/shared/initializer.js";
import { getDescriptionByDeclaration, getJSDocTagsByDeclaration } from "unwritten:interpreter/ast/shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:interpreter/ast/shared/modifiers.js";
import { getNameByDeclaration, getNameBySymbol } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position.js";
import { parseType } from "unwritten:interpreter/ast/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import {
  isParameterDeclaration,
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertySignatureDeclaration
} from "unwritten:interpreter/typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type {
  ParameterDeclaration,
  PropertyAssignment,
  PropertyDeclaration,
  PropertySignature,
  Symbol
} from "typescript";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createPropertyEntity(ctx: CompilerContext, symbol: Symbol): PropertyEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration &&
    (
      isPropertySignatureDeclaration(declaration) ||
      isPropertyDeclaration(declaration) ||
      isPropertyAssignment(declaration) ||
      isParameterDeclaration(declaration)
    ),
  `Property signature not found ${declaration?.kind}`);

  const tsType = ctx.checker.getTypeOfSymbolAtLocation(symbol, declaration);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const fromDeclaration = parsePropertyDeclaration(ctx, declaration);

  const type = parseType(ctx, tsType);
  const kind = EntityKind.Property;

  return {
    ...fromDeclaration,
    id,
    kind,
    name,
    type
  };

}


function parsePropertyDeclaration(ctx: CompilerContext, declaration: ParameterDeclaration | PropertyAssignment | PropertyDeclaration | PropertySignature) { // ParameterDeclaration can also be a property when defined in a constructor

  const id = getIdByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const initializer = getInitializerByDeclaration(ctx, declaration);
  const optional = declaration.questionToken !== undefined;
  const kind = EntityKind.Property;

  assert(name, "Property name not found");

  return {
    description,
    id,
    initializer,
    kind,
    modifiers,
    name,
    optional,
    position,
    ...jsdocTags
  };

}
