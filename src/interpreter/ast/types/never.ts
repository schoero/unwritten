import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { isNeverType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { NeverType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createNeverType(ctx: InterpreterContext, type: Type): NeverType {

  assert(isNeverType(ctx, type), "type is not a never type");

  const kind = TypeKind.Never;
  const name = "never";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
