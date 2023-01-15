import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isBigIntType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { BigIntType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
