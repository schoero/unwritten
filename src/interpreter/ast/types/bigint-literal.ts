import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";

import type { BigIntLiteralType as TSBigIntLiteralType } from "typescript";

import type { BigIntLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createBigIntLiteralType(ctx: InterpreterContext, type: TSBigIntLiteralType): BigIntLiteralType {

  const typeId = getTypeId(ctx, type);
  const sign = type.value.negative ? "-" : "";
  const name = "bigint";
  const value = BigInt(sign + type.value.base10Value);
  const kind = TypeKind.BigIntLiteral;

  return {
    kind,
    name,
    typeId,
    value
  };

}
