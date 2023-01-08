import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isNumberType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { NumberType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createNumberType(ctx: CompilerContext, type: Type): NumberType {

  assert(isNumberType(type), "type is not a number type");

  const kind = TypeKind.Number;
  const name = "number";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
