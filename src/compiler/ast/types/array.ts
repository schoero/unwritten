/* eslint-disable @typescript-eslint/array-type */
import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { getPositionByNode } from "unwritten:compiler/ast/shared/position.js";
import { parseType } from "unwritten:compiler:ast/index.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { isTypeReferenceType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { ArrayTypeNode, TypeReference, TypeReferenceNode } from "typescript";

import type { ArrayType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createArrayType(ctx: CompilerContext, typeReference: TypeReference): ArrayType {

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


export function createArrayTypeByArrayTypeNode(ctx: CompilerContext, arrayTypeNode: ArrayTypeNode | TypeReferenceNode): ArrayType {
  const type = ctx.checker.getTypeFromTypeNode(arrayTypeNode);
  assert(isTypeReferenceType(type), "Type is not a type reference");
  return createArrayType(ctx, type);
}
