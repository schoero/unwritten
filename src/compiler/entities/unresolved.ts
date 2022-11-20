import { Symbol, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { TypeKind, Unresolved } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionBySymbol } from "../compositions/position.js";


export function createUnresolvedBySymbol(ctx: CompilerContext, symbol: Symbol): Unresolved {

  const id = getIdBySymbol(ctx, symbol);
  const position = getPositionBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Unresolved;

  return {
    id,
    kind,
    name,
    position
  };

}


export function createUnresolvedByType(ctx: CompilerContext, type: Type): Unresolved {
  return createUnresolvedBySymbol(ctx, type.symbol);
}