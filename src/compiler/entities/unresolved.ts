import { Symbol, Type, TypeNode } from "typescript";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionBySymbol } from "quickdoks:compiler:compositions/position.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, Unresolved } from "quickdoks:type-definitions/types.d.js";


export function createUnresolvedBySymbol(ctx: CompilerContext, symbol: Symbol): Unresolved {

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

}


export function createUnresolvedByType(ctx: CompilerContext, type: Type): Unresolved {
  return createUnresolvedBySymbol(ctx, type.symbol);
}


export function createUnresolvedByTypeNode(ctx: CompilerContext, typeNode: TypeNode): Unresolved {
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createUnresolvedByType(ctx, type);
}
