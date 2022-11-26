/* eslint-disable @typescript-eslint/array-type */
import { ArrayTypeNode, TypeReference, TypeReferenceNode } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { ArrayType, Kind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getPositionByNode } from "../compositions/position.js";
import { parseType } from "../entry-points/type.js";
import { isTypeReferenceType } from "../typeguards/types.js";


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
