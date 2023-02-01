import { parseType } from "unwritten:compiler:entry-points/type.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { getIdByDeclaration, getIdBySymbol } from "unwritten:compiler:shared/id.js";
import { getDescriptionByDeclaration, getJSDocTagsByDeclaration } from "unwritten:compiler:shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:compiler:shared/modifiers.js";
import { getNameByDeclaration, getNameBySymbol } from "unwritten:compiler:shared/name.js";
import { getPositionByDeclaration } from "unwritten:compiler:shared/position.js";
import {
  isParameterDeclaration,
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertySignatureDeclaration
} from "unwritten:compiler:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type {
  ParameterDeclaration,
  PropertyAssignment,
  PropertyDeclaration,
  PropertySignature,
  Symbol
} from "typescript";

import type { PropertyEntity } from "unwritten:compiler:type-definitions/entities.d.js";
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
  const optional = declaration.questionToken !== undefined;
  const kind = EntityKind.Property;

  assert(name, "Property name not found");

  return {
    description,
    id,
    kind,
    modifiers,
    name,
    optional,
    position,
    ...jsdocTags
  };

}
