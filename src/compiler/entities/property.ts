import { PropertyAssignment, PropertyDeclaration, PropertySignature, Symbol } from "typescript";

import { getIdByDeclaration, getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "quickdoks:compiler:compositions/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:compositions/modifiers.js";
import { getNameByDeclaration, getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { createTypeByDeclaration, createTypeBySymbol } from "quickdoks:compiler:entry-points/type.js";
import {
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertySignatureDeclaration
} from "quickdoks:compiler:typeguards/declarations.js";
import { lockSymbol } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Property } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


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
