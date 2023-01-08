/* eslint-disable @typescript-eslint/array-type */
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { getPositionByNode } from "quickdoks:compiler:mixins/position.js";
import { isTypeReferenceType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { ArrayTypeNode, TypeReference, TypeReferenceNode } from "typescript";

import type { ArrayType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
