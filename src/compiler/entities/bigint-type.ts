import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isBigIntType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { BigIntType, Kind } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


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
