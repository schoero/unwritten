/* eslint-disable @typescript-eslint/array-type */
import { ArrayTypeNode, TypeReference, TypeReferenceNode } from "typescript";
import { assert } from "vitest";

import { isTypeReferenceType } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { ArrayType, TypeKind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getPositionByNode } from "../compositions/position.js";
import { createTypeByType } from "./type.js";


export function createArrayByTypeReference(ctx: CompilerContext, typeReference: TypeReference): ArrayType {

  const node = typeReference.node;
  const id = getIdByType(ctx, typeReference);
  const position = node && getPositionByNode(ctx, node);
  const type = createTypeByType(ctx, typeReference.typeArguments![0]!);
  const kind = TypeKind.Array;

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
