import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";

import type { NumberLiteralType as TSNumberLiteralType } from "typescript";

import type { NumberLiteralType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createNumberLiteralType(ctx: CompilerContext, type: TSNumberLiteralType): NumberLiteralType {

  const id = getIdByType(ctx, type);
  const value = type.value;
  const name = "number";
  const kind = TypeKind.NumberLiteral;

  return {
    id,
    kind,
    name,
    value
  };

}
