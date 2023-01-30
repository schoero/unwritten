import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:mixins/id.js";
import { isAnyType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { AnyType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
