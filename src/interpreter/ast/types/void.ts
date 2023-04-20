import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isVoidType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { VoidType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createVoidType(ctx: InterpreterContext, type: Type): VoidType {

  assert(isVoidType(type), "type is not a void type");

  const kind = TypeKind.Void;
  const name = "void";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
