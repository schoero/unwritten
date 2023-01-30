import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:mixins/id.js";
import { isBigIntType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { BigIntType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createBigIntType(ctx: CompilerContext, type: Type): BigIntType {

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
