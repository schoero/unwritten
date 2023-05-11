import { interpretType } from "unwritten:interpreter/ast/index.js";
import { getPositionByNode } from "unwritten:interpreter/ast/shared/position.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isMapType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { TypeReference } from "typescript";

import type { MapType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createMapType(ctx: InterpreterContext, typeReference: TypeReference): MapType {

  assert(isMapType(typeReference), "type is not a Map type");

  const node = typeReference.node;
  const typeId = getTypeId(ctx, typeReference);
  const position = node && getPositionByNode(ctx, node);
  const keyType = interpretType(ctx, typeReference.typeArguments![0]!);
  const valueType = interpretType(ctx, typeReference.typeArguments![1]!);
  const kind = TypeKind.Map;

  return {
    keyType,
    kind,
    position,
    typeId,
    valueType
  };

}
