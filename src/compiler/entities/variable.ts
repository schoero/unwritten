import { Symbol, Type, VariableDeclaration } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Kind, Variable } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getModifiersByDeclaration } from "../compositions/modifiers.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { parseType } from "../entry-points/type.js";
import { isVariableDeclaration } from "../typeguards/declarations.js";
import { lockedSymbol } from "../utils/ts.js";


export const createVariableBySymbol = (ctx: CompilerContext, symbol: Symbol): Variable => lockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isVariableDeclaration(declaration), "Variable declaration is not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = _parseVariableDeclaration(ctx, declaration);
  const kind = Kind.Variable;

  return {
    ...fromDeclaration,
    description,
    id,
    kind,
    name
  };

});


function _parseVariableDeclaration(ctx: CompilerContext, declaration: VariableDeclaration) {

  const tsType = ctx.checker.getTypeAtLocation(declaration);

  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const type = parseType(ctx, tsType);

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
