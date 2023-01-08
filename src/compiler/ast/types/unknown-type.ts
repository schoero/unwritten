import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isUnknownType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { UnknownType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createUnknownType(ctx: CompilerContext, type: Type): UnknownType {

  assert(isUnknownType(type), "type is not a unknown type");

  const kind = TypeKind.Unknown;
  const name = "unknown";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
