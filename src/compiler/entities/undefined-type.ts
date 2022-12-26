import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isUndefinedType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, UndefinedType } from "quickdoks:type-definitions/types.d.js";


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
