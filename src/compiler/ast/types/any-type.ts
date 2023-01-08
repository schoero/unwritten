import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isAnyType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { AnyType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createAnyType(ctx: CompilerContext, type: Type): AnyType {

  assert(isAnyType(type), "type is not a any type");

  const kind = TypeKind.Any;
  const name = "any";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
