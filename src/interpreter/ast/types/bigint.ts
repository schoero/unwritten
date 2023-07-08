import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { isBigIntType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { BigIntType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createBigIntType(ctx: InterpreterContext, type: Type): BigIntType {

  assert(isBigIntType(type), "type is not a string type");

  const kind = TypeKind.BigInt;
  const name = "bigint";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
