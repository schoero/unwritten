import { Symbol, Type, VariableDeclaration } from "typescript";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "quickdoks:compiler:compositions/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:compositions/modifiers.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { createTypeByDeclaration, createTypeBySymbol } from "quickdoks:compiler:entry-points/type.js";
import { isVariableDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, Variable } from "quickdoks:type-definitions/types.d.js";


export function createVariableBySymbol(ctx: CompilerContext, symbol: Symbol): Variable {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isVariableDeclaration(declaration), "Variable declaration is not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = _parseVariableDeclaration(ctx, declaration);
  const type = createTypeBySymbol(ctx, symbol);
  const kind = Kind.Variable;

  return {
    ...fromDeclaration,
    description,
    id,
    kind,
    name,
    type
  };

}


function _parseVariableDeclaration(ctx: CompilerContext, declaration: VariableDeclaration) {

  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const type = createTypeByDeclaration(ctx, declaration);

  return {
    example,
    modifiers,
    position,
    type
  };

}


export function createVariableByType(ctx: CompilerContext, type: Type): Variable {

  return createVariableBySymbol(ctx, type.symbol);

  // const id = getIdByType(ctx, type);
  // const tp = createTypeByType(ctx, type);
  // const kind = TypeKind.Variable;

  // return {
  //   id,
  //   kind,
  //   type: tp
  // };

}
