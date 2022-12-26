import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isStringType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, StringType } from "quickdoks:type-definitions/types.d.js";


export function createStringType(ctx: CompilerContext, type: Type): StringType {

  assert(isStringType(type), "type is not a string type");

  const kind = Kind.String;
  const name = "string";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
