import { getIdByType } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isStringType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { StringType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createStringType(ctx: InterpreterContext, type: Type): StringType {

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
