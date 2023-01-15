import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isVoidType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { VoidType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createVoidType(ctx: CompilerContext, type: Type): VoidType {

  assert(isVoidType(type), "type is not a void type");

  const kind = TypeKind.Void;
  const name = "void";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
