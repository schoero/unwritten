import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isNullType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, NullType } from "quickdoks:type-definitions/types.d.js";


export function createNullType(ctx: CompilerContext, type: Type): NullType {

  assert(isNullType(type), "type is not a null type");

  const kind = Kind.Null;
  const name = "null";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
