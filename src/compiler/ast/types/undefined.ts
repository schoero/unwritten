import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isUndefinedType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { UndefinedType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
