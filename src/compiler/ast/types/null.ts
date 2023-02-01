import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:shared/id.js";
import { isNullType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { NullType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createNullType(ctx: CompilerContext, type: Type): NullType {

  assert(isNullType(type), "type is not a null type");

  const kind = TypeKind.Null;
  const name = "null";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
