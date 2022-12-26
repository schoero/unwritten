import { PropertyDeclaration, PropertySignature, Symbol } from "typescript";

import { parseTypeNode } from "quickdoks:compiler/entry-points/type-node.js";
import { getIdByDeclaration, getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "quickdoks:compiler:compositions/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:compositions/modifiers.js";
import { getNameByDeclaration, getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { createTypeByDeclaration, createTypeBySymbol } from "quickdoks:compiler:entry-points/type.js";
import { isPropertyDeclaration, isPropertySignatureDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Property } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createPropertyBySymbol(ctx: CompilerContext, symbol: Symbol): Property {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && (isPropertySignatureDeclaration(declaration) || isPropertyDeclaration(declaration)), `Property signature not found ${declaration?.kind}`);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const fromDeclaration = _parsePropertyDeclaration(ctx, declaration);
  const type = createTypeBySymbol(ctx, symbol);

  return {
    ...fromDeclaration,
    id,
    name,
    type
  };

}


function _parsePropertyDeclaration(ctx: CompilerContext, declaration: PropertyDeclaration | PropertySignature): Property {

  const id = getIdByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const type = (declaration.type && parseTypeNode(ctx, declaration.type)) ?? createTypeByDeclaration(ctx, declaration);
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
