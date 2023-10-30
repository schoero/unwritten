import { TypeKind } from "unwritten:interpreter/enums/type";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isAnyType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { AnyType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createAnyType(ctx: InterpreterContext, type: Type): AnyType {

  assert(isAnyType(ctx, type), "type is not a any type");

  const kind = TypeKind.Any;
  const name = "any";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
