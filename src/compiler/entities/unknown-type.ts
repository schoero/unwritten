import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isUnknownType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, UnknownType } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createUnknownType(ctx: CompilerContext, type: Type): UnknownType {

  assert(isUnknownType(type), "type is not a unknown type");

  const kind = Kind.Unknown;
  const name = "unknown";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
