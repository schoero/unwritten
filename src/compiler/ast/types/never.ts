import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isNeverType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { NeverType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createNeverType(ctx: CompilerContext, type: Type): NeverType {

  assert(isNeverType(type), "type is not a never type");

  const kind = TypeKind.Never;
  const name = "never";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
