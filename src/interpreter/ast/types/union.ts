import { getTypeByType, getTypeByTypeNode } from "unwritten:interpreter/ast/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";

import type { UnionType as TSUnionType, UnionTypeNode } from "typescript";

import type { UnionType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createUnionType(ctx: InterpreterContext, type: TSUnionType): UnionType {

  const typeId = getTypeId(ctx, type);
  const types = type.types.map(type => getTypeByType(ctx, type));
  const kind = TypeKind.Union;

  return {
    kind,
    typeId,
    types
  };

}

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
