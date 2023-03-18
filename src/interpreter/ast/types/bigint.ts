import { getIdByType } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isBigIntType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { BigIntType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createBigIntType(ctx: InterpreterContext, type: Type): BigIntType {

  assert(isBigIntType(type), "type is not a string type");

  const kind = TypeKind.BigInt;
  const name = "bigint";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
