import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:mixins/id.js";
import { isUndefinedType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { UndefinedType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createUndefinedType(ctx: CompilerContext, type: Type): UndefinedType {

  assert(isUndefinedType(type), "type is not a undefined type");

  const kind = TypeKind.Undefined;
  const name = "undefined";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
