import { getTypeByType, getTypeByTypeNode } from "unwritten:interpreter/ast/index.js";
import { getTypeId } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { isIndexedAccessType } from "unwritten:interpreter/typeguards/types.js";

import type { IndexedAccessType as TSIndexedAccessType, IndexedAccessTypeNode } from "typescript";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createIndexedAccessType(ctx: InterpreterContext, indexedAccessType: TSIndexedAccessType): IndexedAccessType {
  const indexType = getTypeByType(ctx, indexedAccessType.indexType);
  const objectType = getTypeByType(ctx, indexedAccessType.objectType);

  const baseConstraint = ctx.checker.getBaseConstraintOfType(indexedAccessType);
  const type = baseConstraint && getTypeByType(ctx, baseConstraint);
  const typeId = getTypeId(ctx, indexedAccessType);

  const kind = TypeKind.IndexedAccess;

  return {
    indexType,
    kind,
    objectType,
    type,
    typeId
  };

}


export function createIndexedAccessTypeByTypeNode(ctx: InterpreterContext, typeNode: IndexedAccessTypeNode): IndexedAccessType {

  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);

  if(isIndexedAccessType(ctx, tsType)){
    return createIndexedAccessType(ctx, tsType);
  }

  const indexType = getTypeByTypeNode(ctx, typeNode.indexType);
  const objectType = getTypeByTypeNode(ctx, typeNode.objectType);

  const type = getTypeByType(ctx, tsType);
  const typeId = getTypeId(ctx, tsType);

  const kind = TypeKind.IndexedAccess;

  return {
    indexType,
    kind,
    objectType,
    type,
    typeId
  };

}
