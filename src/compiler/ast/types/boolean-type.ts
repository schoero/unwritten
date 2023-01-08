import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isBooleanType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { BooleanType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createBooleanType(ctx: CompilerContext, type: Type): BooleanType {

  assert(isBooleanType(type), "type is not a boolean type");

  const kind = TypeKind.Boolean;
  const name = "boolean";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
