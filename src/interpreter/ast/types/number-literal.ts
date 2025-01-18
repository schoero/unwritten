import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";

import type { NumberLiteralType as TSNumberLiteralType } from "typescript";
import type { NumberLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createNumberLiteralType = (ctx: InterpreterContext, type: TSNumberLiteralType): NumberLiteralType => withCachedType(ctx, type, () => {

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

});
