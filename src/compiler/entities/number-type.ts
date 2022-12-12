import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isNumberType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, NumberType } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createNumberType(ctx: CompilerContext, type: Type): NumberType {

  assert(isNumberType(type), "type is not a number type");

  const kind = Kind.Number;
  const name = "number";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}