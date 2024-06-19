import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isUnknownType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { UnknownType } from "unwritten:interpreter/type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createUnknownType = (ctx: InterpreterContext, type: Type): UnknownType => withCachedType(ctx, type, () => {

  assert(isUnknownType(ctx, type), "type is not a unknown type");

  const kind = TypeKind.Unknown;
  const name = "unknown";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

});
