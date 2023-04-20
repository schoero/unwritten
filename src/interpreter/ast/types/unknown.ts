import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isUnknownType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { UnknownType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createUnknownType(ctx: InterpreterContext, type: Type): UnknownType {

  assert(isUnknownType(type), "type is not a unknown type");

  const kind = TypeKind.Unknown;
  const name = "unknown";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
