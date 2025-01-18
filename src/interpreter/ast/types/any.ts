import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isAnyType } from "unwritten:interpreter:typeguards/types";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";
import type { AnyType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createAnyType = (ctx: InterpreterContext, type: Type): AnyType => withCachedType(ctx, type, () => {

  assert(isAnyType(ctx, type), "type is not an any type");

  const kind = TypeKind.Any;
  const name = "any";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

});
