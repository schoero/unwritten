import { TypeKind } from "unwritten:interpreter/enums/type";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isNullType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { NullType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createNullType(ctx: InterpreterContext, type: Type): NullType {

  assert(isNullType(ctx, type), "type is not a null type");

  const kind = TypeKind.Null;
  const name = "null";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
