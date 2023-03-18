import { getIdByType } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isNeverType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { NeverType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createNeverType(ctx: InterpreterContext, type: Type): NeverType {

  assert(isNeverType(type), "type is not a never type");

  const kind = TypeKind.Never;
  const name = "never";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
