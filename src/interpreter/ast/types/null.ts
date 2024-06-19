import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isNullType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { NullType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createNullType = (ctx: InterpreterContext, type: Type): NullType => withCachedType(ctx, type, () => {

  assert(isNullType(ctx, type), "type is not a null type");

  const kind = TypeKind.Null;
  const name = "null";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

});
