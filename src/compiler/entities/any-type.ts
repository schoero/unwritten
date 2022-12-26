import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isAnyType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { AnyType, Kind } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createAnyType(ctx: CompilerContext, type: Type): AnyType {

  assert(isAnyType(type), "type is not a any type");

  const kind = Kind.Any;
  const name = "any";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
