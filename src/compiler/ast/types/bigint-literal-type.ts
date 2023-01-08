import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { BigIntLiteralType as TSBigIntLiteralType } from "typescript";

import type { BigIntLiteralType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createBigIntLiteralType(ctx: CompilerContext, type: TSBigIntLiteralType): BigIntLiteralType {

  const id = getIdByType(ctx, type);
  const sign = type.value.negative ? "-" : "";
  const value = BigInt(sign + type.value.base10Value);
  const kind = TypeKind.BigIntLiteral;

  return {
    id,
    kind,
    value
  };

}
