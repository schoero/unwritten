import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isBigIntType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { BigIntType, Kind } from "quickdoks:type-definitions/types.d.js";


export function createBigIntType(ctx: CompilerContext, type: Type): BigIntType {

  assert(isBigIntType(type), "type is not a string type");

  const kind = Kind.BigInt;
  const name = "bigint";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
