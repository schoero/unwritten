import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";

import type { BigIntLiteralType as TSBigIntLiteralType } from "typescript";

import type { BigIntLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createBigIntLiteralType = (ctx: InterpreterContext, type: TSBigIntLiteralType): BigIntLiteralType => withCachedType(ctx, type, () => {

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

});
