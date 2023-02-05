import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { isNeverType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { NeverType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
