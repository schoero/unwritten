import { getIdByTypeNode, getTypeId } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { withLockedType } from "unwritten:interpreter/utils/ts.js";

import { getTypeByType, getTypeByTypeNode } from "../type";

import type { IndexedAccessType as TSIndexedAccessType, IndexedAccessTypeNode } from "typescript";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export const createIndexedAccessType = (ctx: InterpreterContext, indexedAccessType: TSIndexedAccessType): IndexedAccessType => withLockedType(ctx, indexedAccessType, () => {

  const indexType = getTypeByType(ctx, indexedAccessType.indexType);
  const objectType = getTypeByType(ctx, indexedAccessType.objectType);

  const typeId = getTypeId(ctx, indexedAccessType);
  const baseConstraint = ctx.checker.getBaseConstraintOfType(indexedAccessType);
  const type = baseConstraint && getTypeByType(ctx, baseConstraint);

  const kind = TypeKind.IndexedAccess;

  return {
    indexType,
    kind,
    objectType,
    type,
    typeId
  };

});

export function createIndexedAccessTypeByTypeNode(ctx: InterpreterContext, typeNode: IndexedAccessTypeNode): IndexedAccessType {

  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);

  const indexType = getTypeByTypeNode(ctx, typeNode.indexType);
  const objectType = getTypeByTypeNode(ctx, typeNode.objectType);
  const type = getTypeByType(ctx, tsType);
  const typeId = getIdByTypeNode(ctx, typeNode);

  const kind = TypeKind.IndexedAccess;

  return {
    indexType,
    kind,
    objectType,
    type,
    typeId
  };

}
