import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "quickdoks:compiler:mixins/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:mixins/modifiers.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import { isVariableDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { assert } from "quickdoks:utils:general.js";

import type { Symbol, VariableDeclaration } from "typescript";

import type { VariableEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
