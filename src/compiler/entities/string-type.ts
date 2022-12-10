import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isStringType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, StringType } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


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
