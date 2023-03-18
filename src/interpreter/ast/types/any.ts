import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { isAnyType } from "unwritten:interpreter/typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { AnyType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createAnyType(ctx: InterpreterContext, type: Type): AnyType {

  assert(isAnyType(type), "type is not a any type");

  const kind = TypeKind.Any;
  const name = "any";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
