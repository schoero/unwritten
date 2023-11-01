import { TypeKind } from "unwritten:interpreter/enums/type";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isUndefinedType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { UndefinedType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createUndefinedType(ctx: InterpreterContext, type: Type): UndefinedType {

  assert(isUndefinedType(ctx, type), "type is not a undefined type");

  const kind = TypeKind.Undefined;
  const name = "undefined";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
