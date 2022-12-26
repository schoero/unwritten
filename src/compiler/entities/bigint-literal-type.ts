import { BigIntLiteralType as TSBigIntLiteralType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { BigIntLiteralType, Kind } from "quickdoks:type-definitions/types.d.js";


export function createBigIntLiteralType(ctx: CompilerContext, type: TSBigIntLiteralType): BigIntLiteralType {

  const id = getIdByType(ctx, type);
  const sign = type.value.negative ? "-" : "";
  const value = BigInt(sign + type.value.base10Value);
  const kind = Kind.BigIntLiteral;

  return {
    id,
    kind,
    value
  };

}
