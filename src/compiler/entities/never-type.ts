import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isNeverType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, NeverType } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createNeverType(ctx: CompilerContext, type: Type): NeverType {

  assert(isNeverType(type), "type is not a never type");

  const kind = Kind.Never;
  const name = "never";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
