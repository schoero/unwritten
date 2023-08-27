import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { isUndefinedType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { UndefinedType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createUndefinedType(ctx: InterpreterContext, type: Type): UndefinedType {

  assert(isUndefinedType(ctx, type), "type is not a undefined type");

  const kind = TypeKind.Undefined;
  const name = "undefined";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
