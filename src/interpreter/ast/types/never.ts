import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isNeverType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { NeverType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createNeverType = (ctx: InterpreterContext, type: Type): NeverType => withCachedType(ctx, type, () => {

  assert(isNeverType(ctx, type), "type is not a never type");

  const kind = TypeKind.Never;
  const name = "never";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

});
