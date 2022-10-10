/* eslint-disable @typescript-eslint/array-type */

import { ArrayTypeNode } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Array, TypeKind } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { createTypeByType } from "./type.js";


export function createArrayByArrayTypeNode(ctx: CompilerContext, typeNode: ArrayTypeNode): Array {

    const id = getIdByTypeNode(ctx, typeNode);
  const type = createTypeByType(ctx, ctx.checker.getTypeFromTypeNode(typeNode.elementType));
  const kind = TypeKind.Array;

  return {
    id,
    kind,
    type
  };

}