import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { isUndefinedType } from "unwritten:interpreter/typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { UndefinedType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createUndefinedType(ctx: InterpreterContext, type: Type): UndefinedType {

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
