import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { isNumberType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { NumberType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createNumberType(ctx: InterpreterContext, type: Type): NumberType {

  assert(isNumberType(ctx, type), "type is not a number type");

  const kind = TypeKind.Number;
  const name = "number";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
