import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionBySymbol } from "quickdoks:compiler:mixins/position.js";

import type { Symbol, Type, TypeNode } from "typescript";

import type { UnresolvedType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createUnresolvedType(ctx: CompilerContext, symbol: Symbol): UnresolvedType {

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


export function createUnresolvedByType(ctx: CompilerContext, type: Type): UnresolvedType {
  return createUnresolvedType(ctx, type.symbol);
}


export function createUnresolvedByTypeNode(ctx: CompilerContext, typeNode: TypeNode): UnresolvedType {
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createUnresolvedByType(ctx, type);
}
