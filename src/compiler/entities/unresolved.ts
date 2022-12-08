import { Symbol, Type, TypeNode } from "typescript";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionBySymbol } from "quickdoks:compiler:compositions/position.js";
import { lockSymbol } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Unresolved } from "quickdoks:types:types.js";


export const createUnresolvedBySymbol = (ctx: CompilerContext, symbol: Symbol): Unresolved => lockSymbol(ctx, symbol, () => {

  const id = getIdBySymbol(ctx, symbol);
  const position = getPositionBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = Kind.Unresolved;

  return {
    id,
    kind,
    name,
    position
  };

});


export function createUnresolvedByType(ctx: CompilerContext, type: Type): Unresolved {
  return createUnresolvedBySymbol(ctx, type.symbol);
}


export function createUnresolvedByTypeNode(ctx: CompilerContext, typeNode: TypeNode): Unresolved {
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createUnresolvedByType(ctx, type);
}
