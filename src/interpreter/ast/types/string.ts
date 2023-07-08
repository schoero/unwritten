import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { isStringType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { StringType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createStringType(ctx: InterpreterContext, type: Type): StringType {

  assert(isStringType(type), "type is not a string type");

  const kind = TypeKind.String;
  const name = "string";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
