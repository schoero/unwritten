import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { isBooleanType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { BooleanType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createBooleanType(ctx: InterpreterContext, type: Type): BooleanType {

  assert(isBooleanType(ctx, type), "type is not a boolean type");

  const kind = TypeKind.Boolean;
  const name = "boolean";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
