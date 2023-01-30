import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:mixins/id.js";
import { isStringType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { StringType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createStringType(ctx: CompilerContext, type: Type): StringType {

  assert(isStringType(type), "type is not a string type");

  const kind = TypeKind.String;
  const name = "string";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
