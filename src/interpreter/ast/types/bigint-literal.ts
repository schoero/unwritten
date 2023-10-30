import { TypeKind } from "unwritten:interpreter/enums/type";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";

import type { BigIntLiteralType as TSBigIntLiteralType } from "typescript";

import type { BigIntLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


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
