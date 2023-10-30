import { TypeKind } from "unwritten:interpreter/enums/type";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isStringType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { StringType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createStringType(ctx: InterpreterContext, type: Type): StringType {

  assert(isStringType(ctx, type), "type is not a string type");

  const kind = TypeKind.String;
  const name = "string";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
