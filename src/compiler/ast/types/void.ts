import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:mixins/id.js";
import { isVoidType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { VoidType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
