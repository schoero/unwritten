import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isVoidType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { VoidType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createVoidType = (ctx: InterpreterContext, type: Type): VoidType => withCachedType(ctx, type, () => {

  assert(isVoidType(ctx, type), "type is not a void type");

  const kind = TypeKind.Void;
  const name = "void";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

});
