import { getIdBySymbol } from "unwritten:interpreter/ast/shared/id.js";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionBySymbol } from "unwritten:interpreter/ast/shared/position.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";

import type { Symbol, Type, TypeNode } from "typescript";

import type { UnresolvedType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createUnresolvedType(ctx: InterpreterContext, symbol: Symbol): UnresolvedType {

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


export function createUnresolvedByType(ctx: InterpreterContext, type: Type): UnresolvedType {
  return createUnresolvedType(ctx, type.symbol);
}


export function createUnresolvedByTypeNode(ctx: InterpreterContext, typeNode: TypeNode): UnresolvedType {
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createUnresolvedByType(ctx, type);
}
