/* eslint-disable @typescript-eslint/array-type */
import { parseType } from "unwritten:interpreter/ast/index.js";
import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { getPositionByNode } from "unwritten:interpreter/ast/shared/position.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { isTypeReferenceType } from "unwritten:interpreter/typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { ArrayTypeNode, TypeReference, TypeReferenceNode } from "typescript";

import type { ArrayType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createArrayType(ctx: InterpreterContext, typeReference: TypeReference): ArrayType {

  const node = typeReference.node;
  const id = getIdByType(ctx, typeReference);
  const position = node && getPositionByNode(ctx, node);
  const type = parseType(ctx, typeReference.typeArguments![0]!);
  const kind = TypeKind.Array;

  return {
    id,
    kind,
    position,
    type
  };

}


export function createArrayTypeByArrayTypeNode(ctx: InterpreterContext, arrayTypeNode: ArrayTypeNode | TypeReferenceNode): ArrayType {
  const type = ctx.checker.getTypeFromTypeNode(arrayTypeNode);
  assert(isTypeReferenceType(type), "Type is not a type reference");
  return createArrayType(ctx, type);
}
