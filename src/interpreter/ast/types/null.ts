import { getIdByType } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isNullType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { NullType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createNullType(ctx: InterpreterContext, type: Type): NullType {

  assert(isNullType(type), "type is not a null type");

  const kind = TypeKind.Null;
  const name = "null";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
