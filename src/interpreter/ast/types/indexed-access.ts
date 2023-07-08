import { interpretType, interpretTypeNode } from "unwritten:interpreter/ast/index.js";
import { getTypeId } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { isIndexedAccessType } from "unwritten:interpreter/typeguards/types.js";

import type { IndexedAccessType as TSIndexedAccessType, IndexedAccessTypeNode } from "typescript";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createIndexedAccessType(ctx: InterpreterContext, type: TSIndexedAccessType): IndexedAccessType {
  const indexType = interpretType(ctx, type.indexType);
  const objectType = interpretType(ctx, type.objectType);

  const baseConstraint = ctx.checker.getBaseConstraintOfType(type);
  const interpretedType = baseConstraint && interpretType(ctx, baseConstraint);
  const typeId = getTypeId(ctx, type);

  const kind = TypeKind.IndexedAccess;

  return {
    indexType,
    kind,
    objectType,
    type: interpretedType,
    typeId
  };

}


export function createIndexedAccessTypeByTypeNode(ctx: InterpreterContext, typeNode: IndexedAccessTypeNode): IndexedAccessType {

  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);

  if(isIndexedAccessType(tsType)){
    return createIndexedAccessType(ctx, tsType);
  }

  const indexType = interpretTypeNode(ctx, typeNode.indexType);
  const objectType = interpretTypeNode(ctx, typeNode.objectType);

  const type = interpretType(ctx, tsType);
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
