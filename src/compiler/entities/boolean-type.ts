import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isBooleanType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, BooleanType } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createBooleanType(ctx: CompilerContext, type: Type): BooleanType {

  assert(isBooleanType(type), "type is not a boolean type");

  const kind = Kind.Boolean;
  const name = "boolean";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
