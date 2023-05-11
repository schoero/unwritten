import { interpretType } from "unwritten:interpreter/ast/index.js";
import { getPositionByNode } from "unwritten:interpreter/ast/shared/position.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isSetType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { TypeReference } from "typescript";

import type { SetType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createSetType(ctx: InterpreterContext, typeReference: TypeReference): SetType {

  assert(isSetType(typeReference), "type is not a set type");

  const node = typeReference.node;
  const typeId = getTypeId(ctx, typeReference);
  const position = node && getPositionByNode(ctx, node);
  const type = interpretType(ctx, typeReference.typeArguments![0]!);
  const kind = TypeKind.Set;

  return {
    kind,
    position,
    type,
    typeId
  };

}
