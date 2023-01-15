import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isNullType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { NullType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
