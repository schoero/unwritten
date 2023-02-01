import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:shared/id.js";
import { isNumberType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { NumberType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
