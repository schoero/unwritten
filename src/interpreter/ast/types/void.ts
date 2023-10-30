import { TypeKind } from "unwritten:interpreter/enums/type";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isVoidType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { VoidType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createVoidType(ctx: InterpreterContext, type: Type): VoidType {

  assert(isVoidType(ctx, type), "type is not a void type");

  const kind = TypeKind.Void;
  const name = "void";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
