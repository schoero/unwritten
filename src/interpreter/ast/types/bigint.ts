import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isBigIntType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { BigIntType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createBigIntType = (ctx: InterpreterContext, type: Type): BigIntType => withCachedType(ctx, type, () => {

  assert(isBigIntType(ctx, type), "type is not a string type");

  const kind = TypeKind.BigInt;
  const name = "bigint";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

});
