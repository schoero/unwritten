/* eslint-disable @typescript-eslint/array-type */

import { ArrayTypeNode } from "typescript";

import { Array, EntityKind } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { getTypeByType } from "../compositions/type.js";
import { getContext } from "../context/index.js";


export function createArrayByArrayTypeNode(typeNode: ArrayTypeNode): Array {

  const id = getIdByTypeNode(typeNode);
  const type = getTypeByType(getContext().checker.getTypeFromTypeNode(typeNode.elementType));
  const kind = EntityKind.Array;

  return {
    id,
    kind,
    type
  };

}