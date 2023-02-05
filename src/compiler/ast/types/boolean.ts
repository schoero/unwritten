import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { isBooleanType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { BooleanType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
