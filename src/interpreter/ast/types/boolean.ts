import { getIdByType } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isBooleanType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { BooleanType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createBooleanType(ctx: InterpreterContext, type: Type): BooleanType {

  assert(isBooleanType(type), "type is not a boolean type");

  const kind = TypeKind.Boolean;
  const name = "boolean";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
