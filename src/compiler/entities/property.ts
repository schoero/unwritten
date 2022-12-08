import { PropertyAssignment, PropertyDeclaration, PropertySignature, Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, Property } from "../../types/types.js";
import { assert } from "../../utils/general.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getModifiersByDeclaration } from "../compositions/modifiers.js";
import { getNameByDeclaration, getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { createTypeByDeclaration, createTypeBySymbol } from "../entry-points/type.js";
import {
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertySignatureDeclaration
} from "../typeguards/declarations.js";
import { lockSymbol } from "../utils/ts.js";


export const createPropertyBySymbol = (ctx: CompilerContext, symbol: Symbol): Property => lockSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && (isPropertySignatureDeclaration(declaration) || isPropertyAssignment(declaration) || isPropertyDeclaration(declaration)), `Property signature not found ${declaration?.kind}`);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const fromDeclaration = createPropertyByDeclaration(ctx, declaration);
  const type = createTypeBySymbol(ctx, symbol);

  return {
    ...fromDeclaration,
    id,
    name,
    type
  };

});


export function createPropertyByDeclaration(ctx: CompilerContext, declaration: PropertyAssignment | PropertyDeclaration | PropertySignature): Property {

  const id = getIdByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const type = createTypeByDeclaration(ctx, declaration);
  const optional = declaration.questionToken !== undefined;
  const kind = Kind.Property;

  assert(name, "Property name not found");

  return {
    description,
    example,
    id,
    kind,
    modifiers,
    name,
    optional,
    position,
    type
  };

}
