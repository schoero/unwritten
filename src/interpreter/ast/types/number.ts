import { TypeKind } from "unwritten:interpreter/enums/type";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isNumberType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { NumberType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


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
