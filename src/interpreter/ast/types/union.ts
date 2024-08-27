import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType, withLockedType } from "unwritten:interpreter/utils/ts.js";

import { getTypeByType, getTypeByTypeNode } from "../type";

import type { UnionType as TSUnionType, UnionTypeNode } from "typescript";

import type { UnionType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createUnionType = (ctx: InterpreterContext, type: TSUnionType): UnionType => withCachedType(ctx, type, () => withLockedType(ctx, type, () => {

  const typeId = getTypeId(ctx, type);
  const types = type.types.map(type => getTypeByType(ctx, type));
  const kind = TypeKind.Union;

  return {
    kind,
    typeId,
    types
  };

}));

export function createUnionTypeByTypeNode(ctx: InterpreterContext, typeNode: UnionTypeNode): UnionType {

  const type = ctx.checker.getTypeFromTypeNode(typeNode) as TSUnionType;
  const typeId = getTypeId(ctx, type);
  const types = typeNode.types.map(typeNode => getTypeByTypeNode(ctx, typeNode));
  const kind = TypeKind.Union;

  return {
    kind,
    typeId,
    types
  };

}
