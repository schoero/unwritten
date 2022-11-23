import { PropertyAssignment, PropertyDeclaration, PropertySignature, Symbol } from "typescript";
import { assert } from "vitest";

import { isPropertyAssignment, isPropertyDeclaration, isPropertySignature } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Property, TypeKind } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getModifiersByDeclaration } from "../compositions/modifiers.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { lockedSymbol } from "../utils/ts.js";
import { createTypeByDeclaration } from "./type.js";


export const createPropertyBySymbol = (ctx: CompilerContext, symbol: Symbol): Property => lockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && (isPropertySignature(declaration) || isPropertyAssignment(declaration) || isPropertyDeclaration(declaration)), `Property signature not found ${declaration?.kind}`);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const fromDeclaration = _parsePropertyDeclaration(ctx, declaration);

  return {
    ...fromDeclaration,
    id,
    name

  };

});


function _parsePropertyDeclaration(ctx: CompilerContext, declaration: PropertyAssignment | PropertyDeclaration | PropertySignature) {

  const id = getIdByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const type = createTypeByDeclaration(ctx, declaration);
  const optional = declaration.questionToken !== undefined;
  const kind = TypeKind.Property;

  return {
    description,
    example,
    id,
    kind,
    modifiers,
    optional,
    position,
    type
  } as const;

}
