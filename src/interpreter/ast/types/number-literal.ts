import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";

import type { NumberLiteralType as TSNumberLiteralType } from "typescript";

import type { NumberLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createNumberLiteralType(ctx: InterpreterContext, type: TSNumberLiteralType): NumberLiteralType {

  const typeId = getTypeId(ctx, type);
  const value = type.value;
  const name = "number";
  const kind = TypeKind.NumberLiteral;

  return {
    kind,
    name,
    typeId,
    value
  };

}
