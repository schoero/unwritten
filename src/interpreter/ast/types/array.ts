/* eslint-disable @typescript-eslint/array-type */
import { TypeKind } from "unwritten:interpreter/enums/type";
import { getIdByTypeNode, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { getPositionByNode, getPositionByType } from "unwritten:interpreter:ast/shared/position";

import { getTypeByType, getTypeByTypeNode } from "../type";

import type { ArrayTypeNode, TypeReference } from "typescript";

import type { ArrayType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createArrayType(ctx: InterpreterContext, typeReference: TypeReference): ArrayType {

  const typeId = getTypeId(ctx, typeReference);
  const position = getPositionByType(ctx, typeReference);
  const type = getTypeByType(ctx, typeReference.typeArguments![0]!);
  const kind = TypeKind.Array;

  return {
    kind,
    position,
    type,
    typeId
  };

}


export function createArrayTypeByArrayTypeNode(ctx: InterpreterContext, arrayTypeNode: ArrayTypeNode): ArrayType {

  const type = getTypeByTypeNode(ctx, arrayTypeNode.elementType);
  const typeId = getIdByTypeNode(ctx, arrayTypeNode);

  const position = getPositionByNode(ctx, arrayTypeNode);
  const kind = TypeKind.Array;

  return {
    kind,
    position,
    type,
    typeId
  };

}
