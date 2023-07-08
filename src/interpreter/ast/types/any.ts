import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { isAnyType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { AnyType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createAnyType(ctx: InterpreterContext, type: Type): AnyType {

  assert(isAnyType(type), "type is not a any type");

  const kind = TypeKind.Any;
  const name = "any";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
