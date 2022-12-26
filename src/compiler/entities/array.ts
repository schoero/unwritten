/* eslint-disable @typescript-eslint/array-type */
import { ArrayTypeNode, TypeReference, TypeReferenceNode } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { getPositionByNode } from "quickdoks:compiler:compositions/position.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { isTypeReferenceType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { ArrayType, Kind } from "quickdoks:type-definitions/types.d.js";


export function createArrayByTypeReference(ctx: CompilerContext, typeReference: TypeReference): ArrayType {

  const node = typeReference.node;
  const id = getIdByType(ctx, typeReference);
  const position = node && getPositionByNode(ctx, node);
  const type = parseType(ctx, typeReference.typeArguments![0]!);
  const kind = Kind.Array;

  return {
    id,
    kind,
    position,
    type
  };

}


export function createArrayByArrayTypeNode(ctx: CompilerContext, arrayTypeNode: ArrayTypeNode | TypeReferenceNode): ArrayType {
  const type = ctx.checker.getTypeFromTypeNode(arrayTypeNode);
  assert(isTypeReferenceType(type), "Type is not a type reference");
  return createArrayByTypeReference(ctx, type);
}
