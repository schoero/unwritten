import { getTypeByType } from "unwritten:interpreter/ast/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { isTypeReferenceType } from "unwritten:interpreter/typeguards/types.js";
import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByType } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByType } from "unwritten:interpreter:ast/shared/position.js";

import type { Type, TypeNode } from "typescript";

import type { UnresolvedType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createUnresolvedType(ctx: InterpreterContext, type: Type): UnresolvedType {

  const kind = TypeKind.Unresolved;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

}


export function createUnresolved(ctx: InterpreterContext, type: Type): UnresolvedType {
  return createUnresolvedType(ctx, type);
}

export function createUnresolvedByTypeNode(ctx: InterpreterContext, typeNode: TypeNode): UnresolvedType {
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createUnresolved(ctx, type);
}
