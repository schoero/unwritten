import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isStringType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { StringType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
