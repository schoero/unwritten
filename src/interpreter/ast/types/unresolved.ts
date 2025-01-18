import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { getNameByType } from "unwritten:interpreter:ast/shared/name";
import { getPositionByType } from "unwritten:interpreter:ast/shared/position";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { isTypeReferenceType } from "unwritten:interpreter/typeguards/types";
import { withCachedType } from "unwritten:interpreter/utils/ts";

import { getTypeByType } from "../type";

import type { Type, TypeNode } from "typescript";
import type { UnresolvedType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createUnresolvedType = (ctx: InterpreterContext, type: Type): UnresolvedType => withCachedType(ctx, type, () => {

  const kind = TypeKind.Unresolved;

  const symbolId = type.symbol ? getSymbolId(ctx, type.symbol) : undefined;
  const typeId = getTypeId(ctx, type);
  const position = getPositionByType(ctx, type);
  const name = getNameByType(ctx, type);

  const typeArguments = isTypeReferenceType(ctx, type)
    ? type.typeArguments?.map(typeArgument => getTypeByType(ctx, typeArgument))
    : undefined;

  return {
    kind,
    name,
    position,
    symbolId,
    typeArguments,
    typeId
  };

});


export function createUnresolved(ctx: InterpreterContext, type: Type): UnresolvedType {
  return createUnresolvedType(ctx, type);
}

export function createUnresolvedByTypeNode(ctx: InterpreterContext, typeNode: TypeNode): UnresolvedType {
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createUnresolved(ctx, type);
}
