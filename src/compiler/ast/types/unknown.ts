import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:shared/id.js";
import { isUnknownType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { UnknownType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
