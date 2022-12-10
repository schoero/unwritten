import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isUndefinedType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, UndefinedType } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createUndefinedType(ctx: CompilerContext, type: Type): UndefinedType {

  assert(isUndefinedType(type), "type is not a undefined type");

  const kind = Kind.Undefined;
  const name = "undefined";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
